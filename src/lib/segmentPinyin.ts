/**
 * Segment pinyin into syllables
 *
 * http://pinyin.info/romanization/hanyu/syllable_boundaries.html
 *
 * > Hanyu Pinyin's syllables are presumed to begin with a consonant (including y and w, for the purpose of simplicity) or consonant cluster (ch, sh, or zh) unless something -- the beginning of a word, a hyphen, or an apostrophe -- indicates otherwise.
 */

// consonants: iex> ?a..?z |> Enum.reject(&(Enum.member?('aeiouv', &1)))
const vowel = 'aeiouv'
const consonant = 'bcdfghjklmnpqrstwxyz'

const pySylRegexFragment = `(?:^|\\b|[${consonant}]h?)(?:[${vowel}]+(?:(?:ng?)?)r?)[1-5]?(?=$|\\b|[${consonant}]h?)`

// const pyWordRegex = new RegExp(`^(?:${pySylRegexFragment})+$`, 'gi')
const pySylRegex = new RegExp(`${pySylRegexFragment}`, 'gi')

export const stripTones = (py: string) => py.replace(/[1-5]$/, '')

export const segmentPinyin = (removeTones: boolean) => (py: string) => {
    const m = py.match(pySylRegex)

    return m ? [...m].map(py => (removeTones ? stripTones(py) : py)) : null
}

export const isPinyinish = (str: string) =>
    str
        .split(/[^a-z0-9]+/i)
        .filter(Boolean)
        .every(segmentPinyin(false))

// tests - TODO

const tests = [
    { word: '\t\tbeifang\t', segments: ['bei', 'fang'] },
    { word: 'beifang', segments: ['bei', 'fang'] },
    { word: 'bei4fang1', segments: ['bei', 'fang'] },
    { word: 'bei-fang', segments: ['bei', 'fang'] },
    { word: 'bei fang', segments: ['bei', 'fang'] },
    { word: 'tamen', segments: ['ta', 'men'] },
    { word: 'maoyi', segments: ['mao', 'yi'] },
    { word: 'danan', segments: ['da', 'nan'] },
    { word: 'fenbi', segments: ['fen', 'bi'] },
    { word: 'manyi', segments: ['man', 'yi'] },
    { word: 'langan', segments: ['lan', 'gan'] },
    { word: 'dongwu', segments: ['dong', 'wu'] },
    { word: 'baofengyu', segments: ['bao', 'feng', 'yu'] },
    { word: 'bancheng', segments: ['ban', 'cheng'] },
    { word: 'zhenshi', segments: ['zhen', 'shi'] },
    { word: "ping'an", segments: ['ping', 'an'] },
    { word: "lian'ou", segments: ['lian', 'ou'] },
    { word: 'wangzhan', segments: ['wang', 'zhan'] },
    { word: 'tangrshi', segments: ['tangr', 'shi'] },
    { word: 'shuicongrshide', segments: ['shui', 'congr', 'shi', 'de'] },
    { word: 'haowanr', segments: ['hao', 'wanr'] },
    { word: "Ha'erbin", segments: ['Ha', 'er', 'bin'] },
    { word: 'wanrming', segments: ['wanr', 'ming'] },
]

const _segmentPinyin = segmentPinyin(true)

tests.forEach(({ word, segments }) => {
    console.assert(
        _segmentPinyin(word)?.join('-') === segments.join('-'),
        `${word}: ${_segmentPinyin(word)?.join('-')} != ${segments.join('-')}`,
    )
})

tests.forEach(({ word }) => {
    console.assert(isPinyinish(word), `${word} !pinyinish`)
})
