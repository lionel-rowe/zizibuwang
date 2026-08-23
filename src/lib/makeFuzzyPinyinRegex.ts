import { orderedPermute } from './permute.ts'
import { PinyinSegmenter } from './segmentPinyin.ts'

const __ = Symbol('__')
const $0 = Symbol('$0')

type ReplaceFn = (...args: string[]) => string

type Part = string | null
type MatcherType = Part | RegExp | typeof __
type Replacer = Part | ReplaceFn | typeof $0

export type Parts = [Part, Part, Part]
type Matchers = [MatcherType, MatcherType, MatcherType]
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

class Matcher {
	constructor(private matchers: Matchers) {}

	matches(parts: Parts) {
		return this.matchers.every((matcher, idx) => {
			const part = parts[idx]

			return matcher === __ ? true : matcher instanceof RegExp ? part && matcher.test(part) : part === matcher
		})
	}
}

function transformParts(parts: Parts, [matchers, replacers]: MatchReplace) {
	return parts.map((part, idx) => {
		return replacers[idx] === $0
			? part
			: matchers[idx] instanceof RegExp
			? part?.replace(matchers[idx] as RegExp, replacers[idx] as string)
			: replacers[idx]
	}) as Parts
}

export function spellPinyin(parts: Parts) {
	const m = contextMappings.find(([k, _v]) => new Matcher(k).matches(parts))

	if (!m) {
		return parts.filter(Boolean).join('')
	}

	return transformParts(parts, m).filter(Boolean).join('')
}

function jToZ(ch: string) {
	return 'zcs'['jqx'.indexOf(ch)]
}

function zToJ(ch: string) {
	return 'jqx'['zcs'.indexOf(ch)]
}

function jToZh(ch: string) {
	return 'zcs'['jqx'.indexOf(ch)] + 'h'
}

function zhToJ(str: string) {
	return 'jqx'['zcs'.indexOf(str[0])]
}

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

export type FuzzyReplacementId = 'zh-j' | 'z-j' | 'z-zh' | 'n-l' | 'f-hu' | 'n-ng'

function makeAlts(
	py: string,
	pinyinToPartsMapping: Record<string, Parts>,
	enabledFuzzyReplacementIds: FuzzyReplacementId[],
) {
	const alts: Parts[] = []

	const parts = pinyinToPartsMapping[py]

	if (!parts) return null

	alts.push(parts)

	const enabledReplacements = fuzzyReplacements.filter((r) => enabledFuzzyReplacementIds.includes(r.id))

	enabledReplacements.forEach((r) => {
		r.alts.forEach((a) => {
			if (new Matcher(a[0]).matches(parts)) {
				alts.push(transformParts(parts, a))
			}
		})
	})

	return alts
}

class ValidAltsSpeller {
	constructor(
		private pinyinToPartsMapping: Record<string, Parts>,
		private enabledFuzzyReplacementIds: FuzzyReplacementId[],
	) {}

	spell(py: string) {
		const alts = makeAlts(py, this.pinyinToPartsMapping, this.enabledFuzzyReplacementIds)

		if (!alts) return []

		return (orderedPermute(alts) as Parts[])
			.map(spellPinyin)
			.filter((py) => this.pinyinToPartsMapping[py])
			.filter((py, idx, arr) => arr.indexOf(py) === idx)
	}
}

export class RegexMaker {
	constructor(
		private pinyinToPartsMapping: Record<string, Parts>,
		private enabledFuzzyReplacementIds: FuzzyReplacementId[],
	) {}

	make(py: string) {
		const speller = new ValidAltsSpeller(this.pinyinToPartsMapping, this.enabledFuzzyReplacementIds)

		console.log(new PinyinSegmenter(true).segment(py.toLowerCase()))

		const segments = (new PinyinSegmenter(true).segment(py.toLowerCase()) || [])
			.filter(Boolean)
			.map((x) => {
				const alts = speller.spell(x)
				return alts.length ? `(?:${alts.join('|')})` : `(?:${RegExp.escape(x)})`
			})
			.filter(Boolean)

		console.log(segments)

		const regex = segments.length
			? new RegExp(
				`^(?:[^a-z]|\\b)${segments.join('[^a-z]+')}(?:\\b|[^a-z])$`,
				'i',
			)
			: null

		// deno-lint-ignore no-console
		process.env.NODE_ENV === 'development' && console.info(regex)

		return regex
	}
}
