import { parsePinyinTsv } from '../lib/pinyinToPartsMapping.ts'

import { Parts, spellPinyin } from '../lib/makeFuzzyPinyinRegex.ts'
import { assertEquals, assertGreater } from '@std/assert'

const pinyinSyllables = await Deno.readTextFile(
	new URL('../assets/pinyin-syllables.tsv', import.meta.url),
)

let pinyinToPartsMapping: Record<string, Parts>

Deno.test('parsePinyinTsv works', () => {
	pinyinToPartsMapping = parsePinyinTsv(pinyinSyllables)
	assertGreater(Object.keys(pinyinToPartsMapping).length, 400)
})

Deno.test('pinyinToPartsMapping has no discrepancies', () => {
	const discrepancies = Object.entries(pinyinToPartsMapping)
		.map(([key, value]) => [key, spellPinyin(value)])
		.filter(([key, spelling]) => key !== spelling)

	assertEquals(discrepancies.length, 0)
})
