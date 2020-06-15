export const truncate = (len: number, overflowFiller = '…') => (str: string) =>
    str.length > len
        ? str.slice(0, len - overflowFiller.length) + overflowFiller
        : str
