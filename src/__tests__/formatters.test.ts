import { LocaleStringifier } from '../lib/formatters.ts'
import { assertEquals } from '@std/assert'

const testData = [
	Number.MAX_SAFE_INTEGER,
	Math.round(Number.MAX_SAFE_INTEGER / 10_000),
	2_222_222_222.222,
	20_000,
	1_234_567_890,
	1_234_567_898,
	234_567_890,
	2,
	10,
	100_000,
	20,
	200_000,
	1_000_000,
	1.5,
	105.105,
	222.222,
	0,
	100,
	2_001,
	222,
	22_222,
	1_000_001,
	100_000_000_000,
	100_001_010_001,
	0.333,
	2_002.2002,
	1.9999999999999999999999999999999999999999999999,
	'1.9999999999999999999999999999999999999999999999',
	'a',
	...new Array(20).fill(null).map((_, i) => parseInt('9'.repeat(i + 1))),
]

Deno.test('toLocaleString works for en-US', () => {
	for (
		const value of testData.filter(
			(value): value is number => typeof value === 'number' && Number.isInteger(value),
		)
	) {
		assertEquals(new LocaleStringifier('en-US').stringify(value), value.toLocaleString('en-US'))
	}
})

Deno.test('toLocaleString preserves fractional input digits', () => {
	assertEquals(new LocaleStringifier('en-US').stringify(2_002.2002), '2,002.2002')
})
