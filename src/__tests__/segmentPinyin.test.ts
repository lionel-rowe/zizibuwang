import { segmentPinyin, isPinyinish } from '../lib/segmentPinyin'

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

const segmentPinyinRmTones = segmentPinyin(true)

describe('segmentPinyin', () => {
    tests.forEach(({ word, segments }) => {
        it(`${word} segments correctly`, () => {
            expect(segmentPinyinRmTones(word)?.join('-')).toEqual(
                segments.join('-'),
            )
        })
    })
})

describe('isPinyinish', () => {
    tests.forEach(({ word }) => {
        it(`${word} is pinyinish`, () => {
            expect(isPinyinish(word)).toBe(true)
        })
    })
})
