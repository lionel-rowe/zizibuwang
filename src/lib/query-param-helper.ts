import { decodeB64UrlSafe, encodeB64UrlSafe } from './b64'

const getQueryParam = (
    paramName: string,
    locationOrUrl: Location | URL = window.location,
) => new URLSearchParams(locationOrUrl.search).get(paramName)

const _setAllQueryParams = (
    allQueryParams: URLSearchParams,
    locationOrUrl: Location | URL,
) => {
    const newQueryString = Array.from(allQueryParams).length
        ? '?' + allQueryParams.toString()
        : ''

    if (locationOrUrl === window.location) {
        const newPath = window.location.pathname + newQueryString
        window.history.pushState({ path: newPath }, '', newPath)
    } else {
        locationOrUrl.search = newQueryString
    }
}

const setQueryParam = (
    paramName: string,
    newVal: string,
    locationOrUrl: Location | URL = window.location,
) => {
    const allQueryParams = new URLSearchParams(locationOrUrl.search)

    allQueryParams.set(paramName, newVal)

    _setAllQueryParams(allQueryParams, locationOrUrl)
}

const deleteQueryParam = (
    paramName: string,
    locationOrUrl: Location | URL = window.location,
) => {
    const allQueryParams = new URLSearchParams(locationOrUrl.search)

    allQueryParams.delete(paramName)

    _setAllQueryParams(allQueryParams, locationOrUrl)
}

const getB64QueryParam = (
    paramName: string,
    locationOrUrl: Location | URL = window.location,
) => {
    const val = getQueryParam(paramName, locationOrUrl)

    return val && decodeB64UrlSafe(val)
}

const setB64QueryParam = (
    paramName: string,
    newVal: string,
    locationOrUrl: Location | URL = window.location,
) => {
    const b64 = encodeB64UrlSafe(newVal)

    setQueryParam(paramName, b64, locationOrUrl)
}

export {
    getQueryParam,
    setQueryParam,
    deleteQueryParam,
    getB64QueryParam,
    setB64QueryParam,
}
