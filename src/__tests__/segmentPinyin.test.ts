import { isPinyinish, segmentPinyin } from '../lib/segmentPinyin.ts'
import { assert, assertEquals } from '@std/assert'

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

for (const { word, segments } of tests) {
	Deno.test(`segmentPinyin: ${word} segments correctly`, () => {
		assertEquals(segmentPinyinRmTones(word)?.join('-'), segments.join('-'))
	})

	Deno.test(`isPinyinish: ${word} is pinyinish`, () => {
		assert(isPinyinish(word))
	})
}
