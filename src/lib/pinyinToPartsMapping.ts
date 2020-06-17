// modified from http://pinyin.info/rules/initials_finals.html
import pinyinSyllablesUrl from '../assets/pinyin-syllables.tsv'

import { Parts } from './makeRegex'

export const pinyinToPartsMappingPromise = new Promise<Record<string, Parts>>(
    async resolve => {
        const res = await fetch(pinyinSyllablesUrl)
        const txt = await res.text()
        const syls = txt.split('\n').map(x => x.split('\t'))

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

        resolve(pinyinToPartsMapping)
    },
)
