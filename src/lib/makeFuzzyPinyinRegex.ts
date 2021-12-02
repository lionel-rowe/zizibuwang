import { orderedPermute } from './permute'
import { segmentPinyin } from './segmentPinyin'

const __ = Symbol('__')
const $0 = Symbol('$0')

type ReplaceFn = (...args: string[]) => string

type Part = string | null
type Matcher = Part | RegExp | typeof __
type Replacer = Part | ReplaceFn | typeof $0

export type Parts = [Part, Part, Part]
type Matchers = [Matcher, Matcher, Matcher]
type Replacers = [Replacer, Replacer, Replacer]
type MatchReplace = [Matchers, Replacers]

// match first only
const contextMappings: MatchReplace[] = [
    // jun etc.
    [
        [/^[jqx]$/, 'v', 'en'],
        [$0, 'u', 'n'],
    ],

    // yun
    [
        [null, 'v', 'en'],
        [$0, 'yu', 'n'],
    ],

    // jue etc.
    [
        [/^[jqx]$/, 'v', __],
        [$0, 'u', $0],
    ],

    // wu etc.
    [
        [null, 'u', null],
        [$0, 'wu', $0],
    ],
    [
        [null, 'u', __],
        [$0, 'w', $0],
    ],

    // yi etc.
    [
        [null, 'i', null],
        [$0, 'yi', $0],
    ],
    [
        [null, 'i', /^e(ng?)$/],
        [$0, 'yi', '$1'],
    ],
    [
        [null, 'i', __],
        [$0, 'y', $0],
    ],

    // yu etc.
    [
        [null, 'v', __],
        [$0, 'yu', $0],
    ],

    // hui etc.
    [
        [__, 'u', 'ei'],
        [$0, $0, 'i'],
    ],

    // liu etc.
    [
        [__, 'i', 'ou'],
        [$0, $0, 'u'],
    ],

    // zero final
    [
        [/^[zcs]h?|r$/, null, null],
        [$0, 'i', $0],
    ],

    // lin, ling etc.
    [
        [__, /^[iuv]$/, /^e(ng?)$/],
        [$0, $0, '$1'],
    ],
]

const isMatch = (matchers: Matchers) => (parts: Parts) => {
    return matchers.every((matcher, idx) => {
        const part = parts[idx]

        return matcher === __
            ? true
            : matcher instanceof RegExp
            ? part && matcher.test(part)
            : part === matcher
    })
}

const transformParts = (parts: Parts, [matchers, replacers]: MatchReplace) =>
    parts.map((part, idx) => {
        return replacers[idx] === $0
            ? part
            : matchers[idx] instanceof RegExp
            ? part?.replace(matchers[idx] as RegExp, replacers[idx] as string)
            : replacers[idx]
    }) as Parts

export const spellPinyin = (parts: Parts) => {
    const m = contextMappings.find(([k, _v]) => isMatch(k)(parts))

    if (!m) {
        return parts.filter(Boolean).join('')
    }

    return transformParts(parts, m).filter(Boolean).join('')
}

const jToZ = (ch: string) => 'zcs'['jqx'.indexOf(ch)]
const zToJ = (ch: string) => 'jqx'['zcs'.indexOf(ch)]
const jToZh = (ch: string) => 'zcs'['jqx'.indexOf(ch)] + 'h'
const zhToJ = (str: string) => 'jqx'['zcs'.indexOf(str[0])]

export const fuzzyReplacements: {
    id: FuzzyReplacementId
    name: string
    alts: MatchReplace[]
}[] = [
    {
        id: 'zh-j',
        name: 'zh ⇄ j, ch ⇄ q, sh ⇄ x',
        alts: [
            [
                [/^[zcs]h$/, null, __],
                [zhToJ, 'i', $0],
            ],
            [
                [/^[jqx]$/, 'i', __],
                [jToZh, null, $0],
            ],
        ],
    },
    {
        id: 'z-j',
        name: 'z ⇄ j, c ⇄ q, s ⇄ x',
        alts: [
            [
                [/^[zcs]$/, null, __],
                [zToJ, 'i', $0],
            ],
            [
                [/^[jqx]$/, 'i', __],
                [jToZ, null, $0],
            ],
        ],
    },
    {
        id: 'z-zh',
        name: 'z ⇄ zh, c ⇄ ch, s ⇄ sh',
        alts: [
            [
                [/^[zcs]$/, __, __],
                ['$&h', $0, $0],
            ],
            [
                [/^[zcs]h$/, __, __],
                [(m) => m[0], $0, $0],
            ],
        ],
    },
    {
        id: 'n-l',
        name: 'n ⇄ l',
        alts: [
            [
                ['n', __, __],
                ['l', $0, $0],
            ],
            [
                ['l', __, __],
                ['n', $0, $0],
            ],
        ],
    },
    {
        id: 'f-hu',
        name: 'f ⇄ hu',
        alts: [
            [
                ['f', 'u', null],
                ['h', $0, $0],
            ],
            [
                ['h', 'u', null],
                ['f', $0, $0],
            ],
            [
                ['f', null, __],
                ['h', 'u', $0],
            ],
            [
                ['h', 'u', __],
                ['f', null, $0],
            ],
        ],
    },
    {
        id: 'n-ng',
        name: '-n ⇄ -ng',
        alts: [
            [
                [__, __, /^.+n$/],
                [$0, $0, '$&g'],
            ],
            [
                [__, __, /^.+ng$/],
                [$0, $0, (m) => m.slice(0, -1)],
            ],
        ],
    },
]

export type FuzzyReplacementId =
    | 'zh-j'
    | 'z-j'
    | 'z-zh'
    | 'n-l'
    | 'f-hu'
    | 'n-ng'

const makeAlts = (
    py: string,
    pinyinToPartsMapping: Record<string, Parts>,
    enabledFuzzyReplacementIds: FuzzyReplacementId[],
) => {
    const alts: Parts[] = []

    const parts = pinyinToPartsMapping[py]

    if (!parts) return null

    alts.push(parts)

    const enabledReplacements = fuzzyReplacements.filter((r) =>
        enabledFuzzyReplacementIds.includes(r.id),
    )

    enabledReplacements.forEach((r) => {
        r.alts.forEach((a) => {
            if (isMatch(a[0])(parts)) {
                alts.push(transformParts(parts, a))
            }
        })
    })

    return alts
}

const spellValidAltsWith =
    (
        pinyinToPartsMapping: Record<string, Parts>,
        enabledFuzzyReplacementIds: FuzzyReplacementId[],
    ) =>
    (py: string) => {
        const alts = makeAlts(
            py,
            pinyinToPartsMapping,
            enabledFuzzyReplacementIds,
        )

        if (!alts) return []

        return (orderedPermute(alts) as Parts[])
            .map(spellPinyin)
            .filter((py) => pinyinToPartsMapping[py])
            .filter((py, idx, arr) => arr.indexOf(py) === idx)
    }

export const makeRegexWith =
    (
        pinyinToPartsMapping: Record<string, Parts>,
        enabledFuzzyReplacementIds: FuzzyReplacementId[],
    ) =>
    (py: string) => {
        const spellValidAlts = spellValidAltsWith(
            pinyinToPartsMapping,
            enabledFuzzyReplacementIds,
        )

        const segments = (segmentPinyin(true)(py.toLowerCase()) || [])
            .filter(Boolean)
            .map((x) => {
                const alts = spellValidAlts(x)
                return alts.length ? `(?:${alts.join('|')})` : null
            })
            .filter(Boolean)

        const regex = segments.length
            ? new RegExp(
                  `^(?:[^a-z]|\\b)${segments.join('[^a-z]+')}(?:\\b|[^a-z])$`,
                  'i',
              )
            : null

        process.env.NODE_ENV === 'development' && console.info(regex)

        return regex
    }
