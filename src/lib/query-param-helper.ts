import { decodeB64UrlSafe, encodeB64UrlSafe } from './b64'

const getQueryParam = (paramName: string) =>
    new URLSearchParams(window.location.search).get(paramName)

const _setAllQueryParams = (
    allQueryParams: URLSearchParams,
    pushNewHistoryItem: boolean,
) => {
    const newQueryString = Array.from(allQueryParams).length
        ? '?' + allQueryParams.toString()
        : ''

    const newPath = window.location.pathname + newQueryString

    window.history[pushNewHistoryItem ? 'pushState' : 'replaceState'](
        { path: newPath },
        '',
        newPath,
    )
}

const clearAllQueryParams = (pushNewHistoryItem = false) => {
    _setAllQueryParams(new URLSearchParams([]), pushNewHistoryItem)
}

const setQueryParam = (
    paramName: string,
    newVal: string,
    pushNewHistoryItem = false,
) => {
    const allQueryParams = new URLSearchParams(window.location.search)

    allQueryParams.set(paramName, newVal)

    _setAllQueryParams(allQueryParams, pushNewHistoryItem)
}

const deleteQueryParam = (paramName: string, pushNewHistoryItem = false) => {
    const allQueryParams = new URLSearchParams(window.location.search)

    allQueryParams.delete(paramName)

    _setAllQueryParams(allQueryParams, pushNewHistoryItem)
}

const getB64QueryParam = (paramName: string) => {
    const val = getQueryParam(paramName)

    return val && decodeB64UrlSafe(val)
}

const setB64QueryParam = (
    paramName: string,
    newVal: string,
    pushNewHistoryItem = false,
) => {
    const b64 = encodeB64UrlSafe(newVal)

    setQueryParam(paramName, b64, pushNewHistoryItem)
}

export {
    getQueryParam,
    setQueryParam,
    deleteQueryParam,
    getB64QueryParam,
    setB64QueryParam,
    clearAllQueryParams,
}
