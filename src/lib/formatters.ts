// import { toChineseInt, toChineseFractional, DIAN } from './chineseNumerals'

const makeDecimalFormatter =
    (
        intPartFormatter: NumberPartFormatter,
        fractionalPartFormatter: NumberPartFormatter,
        delimiter: string,
    ) =>
    (numStr: number | string) => {
        const [int, fractional] = numStr.toString().split('.')

        if ([int, fractional].some((n) => n && !/^\d+$/.test(n))) {
            return 'NaN'
        }

        try {
            return (
                intPartFormatter(int) +
                (fractional
                    ? delimiter + fractionalPartFormatter(fractional)
                    : '')
            )
        } catch (_e) {
            return 'NaN'
        }
    }

// export const toChineseNum = makeDecimalFormatter(
//     toChineseInt,
//     toChineseFractional,
//     DIAN,
// )

type NumberPartFormatter = (digitString: string) => string

export const normalizeQuery = (query: string) =>
    query.normalize('NFC').replace(/ü/g, 'v')

export const truncate =
    (len: number, overflowFiller = '…') =>
    (str: string) =>
        str.length > len
            ? str.slice(0, len - overflowFiller.length) + overflowFiller
            : str

// WeChat compat
export const toLocaleString = (locale: Locale) => (n: number | string) =>
    localizeFns[locale](n)

const chunkWithDelimiter =
    (chunkLength: number, delimiter: string) => (n: number | string) =>
        n
            .toString()
            .split('')
            .reduceRight(
                (str, digit, idx, arr) =>
                    (idx && !((arr.length - idx) % chunkLength)
                        ? delimiter
                        : '') +
                    digit +
                    str,
                '',
            )

export type Locale = 'en-US' | 'zh-Hans' | 'zh-Hant'
// | 'zh-Hans-u-nu-hanidec' // TODO
// | 'zh-Hant-u-nu-hanidec' // TODO

const stringify = (x: string | number) => x.toString()

const localizeFns: Record<Locale, (n: number | string) => string> = {
    'en-US': makeDecimalFormatter(chunkWithDelimiter(3, ','), stringify, '.'),
    'zh-Hans': stringify,
    'zh-Hant': stringify,
    // 'zh-Hans-u-nu-hanidec': toChineseNum, // TODO
    // 'zh-Hant-u-nu-hanidec': toChineseNum, // TODO
}
