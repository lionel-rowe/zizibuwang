import { decodeB64UrlSafe, encodeB64UrlSafe } from './b64'
import { NavigateFn } from '@reach/router'

const getQueryParam = (paramName: string) =>
    new URLSearchParams(window.location.search).get(paramName)

const _setAllQueryParams = (
    allQueryParams: URLSearchParams,
    pushNewHistoryItem: boolean,
    navigate: NavigateFn,
) => {
    const newQueryString = Array.from(allQueryParams).length
        ? '?' + allQueryParams.toString()
        : ''

    const newPath = window.location.pathname + newQueryString

    navigate(newPath, { replace: !pushNewHistoryItem })
}

const clearAllQueryParams = (
    pushNewHistoryItem: boolean,
    navigate: NavigateFn,
) => {
    _setAllQueryParams(new URLSearchParams([]), pushNewHistoryItem, navigate)
}

const setQueryParam = (
    paramName: string,
    newVal: string,
    pushNewHistoryItem: boolean,
    navigate: NavigateFn,
) => {
    const allQueryParams = new URLSearchParams(window.location.search)

    allQueryParams.set(paramName, newVal)

    _setAllQueryParams(allQueryParams, pushNewHistoryItem, navigate)
}

const deleteQueryParam = (
    paramName: string,
    pushNewHistoryItem: boolean,
    navigate: NavigateFn,
) => {
    const allQueryParams = new URLSearchParams(window.location.search)

    allQueryParams.delete(paramName)

    _setAllQueryParams(allQueryParams, pushNewHistoryItem, navigate)
}

const getB64QueryParam = (paramName: string) => {
    const val = getQueryParam(paramName)

    return val && decodeB64UrlSafe(val)
}

const setB64QueryParam = (
    paramName: string,
    newVal: string,
    pushNewHistoryItem: boolean,
    navigate: NavigateFn,
) => {
    const b64 = encodeB64UrlSafe(newVal)

    setQueryParam(paramName, b64, pushNewHistoryItem, navigate)
}

export {
    getQueryParam,
    setQueryParam,
    deleteQueryParam,
    getB64QueryParam,
    setB64QueryParam,
    clearAllQueryParams,
}
