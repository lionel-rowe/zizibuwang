import { toLocaleString } from '../lib/formatters'

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

describe('toLocaleString', () => {
    it('works for en-US', () => {
        testData.every(
            d => d.toLocaleString('en-US') === toLocaleString('en-US')(d),
        )
    })
})
