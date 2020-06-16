import { History } from 'history'
import { decodeB64UrlSafe, encodeB64UrlSafe } from './b64'

const getQueryParam = (paramName: string) =>
    new URLSearchParams(window.location.search).get(paramName)

const _setAllQueryParams = (
    allQueryParams: URLSearchParams,
    pushNewHistoryItem: boolean,
    history: History,
) => {
    const newQueryString = Array.from(allQueryParams).length
        ? '?' + allQueryParams.toString()
        : ''

    const newPath = window.location.pathname + newQueryString

    history[pushNewHistoryItem ? 'push' : 'replace'](newPath)
}

const clearAllQueryParams = (pushNewHistoryItem: boolean, history: History) => {
    _setAllQueryParams(new URLSearchParams([]), pushNewHistoryItem, history)
}

const setQueryParam = (
    paramName: string,
    newVal: string,
    pushNewHistoryItem: boolean,
    history: History,
) => {
    const allQueryParams = new URLSearchParams(window.location.search)

    allQueryParams.set(paramName, newVal)

    _setAllQueryParams(allQueryParams, pushNewHistoryItem, history)
}

const deleteQueryParam = (
    paramName: string,
    pushNewHistoryItem: boolean,
    history: History,
) => {
    const allQueryParams = new URLSearchParams(window.location.search)

    allQueryParams.delete(paramName)

    _setAllQueryParams(allQueryParams, pushNewHistoryItem, history)
}

const getB64QueryParam = (paramName: string) => {
    const val = getQueryParam(paramName)

    return val && decodeB64UrlSafe(val)
}

const setB64QueryParam = (
    paramName: string,
    newVal: string,
    pushNewHistoryItem: boolean,
    history: History,
) => {
    const b64 = encodeB64UrlSafe(newVal)

    setQueryParam(paramName, b64, pushNewHistoryItem, history)
}

export {
    getQueryParam,
    setQueryParam,
    deleteQueryParam,
    getB64QueryParam,
    setB64QueryParam,
    clearAllQueryParams,
}
