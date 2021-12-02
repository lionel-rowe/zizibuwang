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

    return m ? [...m].map((py) => (removeTones ? stripTones(py) : py)) : null
}

export const isPinyinish = (str: string) =>
    str
        .split(/[^a-z0-9]+/i)
        .filter(Boolean)
        .every(segmentPinyin(false))
