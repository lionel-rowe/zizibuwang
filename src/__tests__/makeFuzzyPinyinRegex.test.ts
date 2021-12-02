import { parsePinyinTsv } from '../lib/pinyinToPartsMapping'

import { spellPinyin, Parts } from '../lib/makeFuzzyPinyinRegex'

import fs from 'fs'
import path from 'path'

const pinyinSyllables = fs.readFileSync(
    path.join(__dirname, '../assets/pinyin-syllables.tsv'),
    'utf8',
)

let pinyinToPartsMapping: Record<string, Parts>

describe('parsePinyinTsv', () => {
    it('works', () => {
        pinyinToPartsMapping = parsePinyinTsv(pinyinSyllables)
        expect(Object.keys(pinyinToPartsMapping).length).toBeGreaterThan(400)
    })
})

describe('pinyinToPartsMapping', () => {
    it('has no discrepencies', () => {
        const discrepencies = Object.entries(pinyinToPartsMapping)
            .map(([k, v]) => [k, spellPinyin(v)])
            .filter((a) => a[0] !== a[1])

        expect(discrepencies.length).toBe(0)
    })
})
