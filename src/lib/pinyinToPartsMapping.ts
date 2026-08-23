// modified from http://pinyin.info/rules/initials_finals.html
import { Parts } from './makeFuzzyPinyinRegex.ts'

const pinyinSyllablesUrl = new URL('../assets/pinyin-syllables.tsv', import.meta.url)

export const parsePinyinTsv = (txt: string) => {
	const syls = txt.split('\n').map((x) => x.split('\t'))

	const [initials, ...rows] = syls

	const pinyinToPartsMapping: Record<string, Parts> = Object.create(null)

	rows.forEach((row, _rowIdx) => {
		const [medial, final] = row.slice(0, 2)

		row.forEach((cell, cellIdx) => {
			if (cellIdx < 2 || !cell.trim()) return

			pinyinToPartsMapping[cell] = [
				initials[cellIdx] || null,
				medial || null,
				final || null,
			]
		})
	})

	return pinyinToPartsMapping
}

export const pinyinToPartsMappingPromise = (async () => {
	const deno = (globalThis as {
		Deno?: { readTextFile(path: URL): Promise<string> }
	}).Deno
	const txt = deno ? await deno.readTextFile(pinyinSyllablesUrl) : await (await fetch(pinyinSyllablesUrl.href)).text()

	return parsePinyinTsv(txt)
})()
