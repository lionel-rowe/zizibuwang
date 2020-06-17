const _encodeUtf8 = (e => e.encode.bind(e))(new TextEncoder())
const _decodeUtf8 = (d => d.decode.bind(d))(new TextDecoder())

export const decodeB64 = (b64: string) => {
    const binStr = atob(b64)

    const binArr = binStr.split('').map(char => char.charCodeAt(0))

    const bin = new Uint8Array(binArr)

    return _decodeUtf8(bin)
}

export const encodeB64 = (str: string) => {
    const bin = _encodeUtf8(str)

    const binStr = Array.from(bin)
        .map(n => String.fromCharCode(n))
        .join('')

    return btoa(binStr)
}

const _urlSafe = (b64: string) =>
    b64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')

const _urlUnsafe = (b64UrlSafe: string) => {
    const noPadding = b64UrlSafe.replace(/-/g, '+').replace(/_/g, '/')

    const padLength = 4 - (noPadding.length % 4 || 4)

    return noPadding + '='.repeat(padLength)
}

export const encodeB64UrlSafe = (str: string) => _urlSafe(encodeB64(str))

export const decodeB64UrlSafe = (b64UrlSafe: string) =>
    decodeB64(_urlUnsafe(b64UrlSafe))
