export const normalizeQuery = (query: string) =>
    query.normalize('NFC').replace(/ü/g, 'v')

export const truncate = (len: number, overflowFiller = '…') => (str: string) =>
    str.length > len
        ? str.slice(0, len - overflowFiller.length) + overflowFiller
        : str

// WeChat compat
export const toLocaleString = (locale: Locale) => (n: number) =>
    localizeFns[locale](n)

type FormattableInt = number & {
    readonly int: unique symbol
}

const isFormattableInt = (n: number): n is FormattableInt => {
    return !/\D/.test(n.toString())
}

const chunkWithDelimiter = (chunkLength: number, delimiter: string) => (
    n: FormattableInt,
) =>
    n
        .toString()
        .split('')
        .reduceRight(
            (str, digit, idx, arr) =>
                (idx && !((arr.length - idx) % chunkLength) ? delimiter : '') +
                digit +
                str,
            '',
        )

const localizeFns: Record<string, (n: number) => string> = {
    'en-US': (n: number) =>
        isFormattableInt(n) ? chunkWithDelimiter(3, ',')(n) : n.toString(),
    'zh-CN': (n: number) => n.toString(),
}

type Locale = keyof typeof localizeFns
