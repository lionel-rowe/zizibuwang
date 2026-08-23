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

export function stripTones(py: string) {
	return py.replace(/[1-5]$/, '')
}

export class PinyinSegmenter {
	constructor(private removeTones: boolean) {}

	segment(py: string) {
		const m = py.match(pySylRegex)

		return m ? [...m].map((py) => (this.removeTones ? stripTones(py) : py)) : null
	}
}

export function isPinyinish(str: string) {
	return str
		.split(/[^a-z0-9]+/i)
		.filter(Boolean)
		.every((s) => new PinyinSegmenter(false).segment(s))
}
