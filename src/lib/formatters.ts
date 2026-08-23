// import { toChineseInt, toChineseFractional, DIAN } from './chineseNumerals'

class DecimalFormatter {
	constructor(
		private intPartFormatter: NumberPartFormatter,
		private fractionalPartFormatter: NumberPartFormatter,
		private delimiter: string,
	) {}

	format(numStr: number | string) {
		const [int, fractional] = numStr.toString().split('.')

		if ([int, fractional].some((n) => n && !/^\d+$/.test(n))) {
			return 'NaN'
		}

		try {
			return (
				this.intPartFormatter(int) +
				(fractional ? this.delimiter + this.fractionalPartFormatter(fractional) : '')
			)
		} catch (_e) {
			return 'NaN'
		}
	}
}

// export const toChineseNum = new DecimalFormatter(
//     toChineseInt,
//     toChineseFractional,
//     DIAN,
// )

type NumberPartFormatter = (digitString: string) => string

export function normalizeQuery(query: string) {
	return query.normalize('NFC').replace(/ü/g, 'v')
}

export class Truncator {
	constructor(private len: number, private overflowFiller = '…') {}

	truncate(str: string) {
		return str.length > this.len ? str.slice(0, this.len - this.overflowFiller.length) + this.overflowFiller : str
	}
}

// WeChat compat
export class LocaleStringifier {
	constructor(private locale: Locale) {}

	stringify(n: number | string) {
		return localizeFns[this.locale](n)
	}
}

class DelimiterChunker {
	constructor(private chunkLength: number, private delimiter: string) {}

	chunk(n: number | string) {
		return n
			.toString()
			.split('')
			.reduceRight(
				(str, digit, idx, arr) =>
					(idx && !((arr.length - idx) % this.chunkLength) ? this.delimiter : '') +
					digit +
					str,
				'',
			)
	}
}

export type Locale = 'en-US' | 'zh-Hans' | 'zh-Hant'
// | 'zh-Hans-u-nu-hanidec' // TODO
// | 'zh-Hant-u-nu-hanidec' // TODO

function stringify(x: string | number) {
	return x.toString()
}

const delimiterChunker = new DelimiterChunker(3, ',')

const localizeFns: Record<Locale, (n: number | string) => string> = {
	'en-US': (n) => new DecimalFormatter(delimiterChunker.chunk.bind(delimiterChunker), stringify, '.').format(n),
	'zh-Hans': stringify,
	'zh-Hant': stringify,
	// 'zh-Hans-u-nu-hanidec': toChineseNum, // TODO
	// 'zh-Hant-u-nu-hanidec': toChineseNum, // TODO
}
