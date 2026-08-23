import { History } from 'history'
import { decodeB64UrlSafe, encodeB64UrlSafe } from './b64.ts'

function getQueryParam(paramName: string) {
	return new URLSearchParams(window.location.search).get(paramName)
}

function _setAllQueryParams(
	allQueryParams: URLSearchParams,
	pushNewHistoryItem: boolean,
	history: History,
) {
	const newQueryString = Array.from(allQueryParams).length ? '?' + allQueryParams.toString() : ''

	const newPath = window.location.pathname + newQueryString

	history[pushNewHistoryItem ? 'push' : 'replace'](newPath)
}

function clearAllQueryParams(pushNewHistoryItem: boolean, history: History) {
	_setAllQueryParams(new URLSearchParams([]), pushNewHistoryItem, history)
}

function setQueryParam(
	paramName: string,
	newVal: string,
	pushNewHistoryItem: boolean,
	history: History,
) {
	const allQueryParams = new URLSearchParams(window.location.search)

	allQueryParams.set(paramName, newVal)

	_setAllQueryParams(allQueryParams, pushNewHistoryItem, history)
}

function deleteQueryParam(
	paramName: string,
	pushNewHistoryItem: boolean,
	history: History,
) {
	const allQueryParams = new URLSearchParams(window.location.search)

	allQueryParams.delete(paramName)

	_setAllQueryParams(allQueryParams, pushNewHistoryItem, history)
}

function getB64QueryParam(paramName: string) {
	const val = getQueryParam(paramName)

	return val && decodeB64UrlSafe(val)
}

function setB64QueryParam(
	paramName: string,
	newVal: string,
	pushNewHistoryItem: boolean,
	history: History,
) {
	const b64 = encodeB64UrlSafe(newVal)

	setQueryParam(paramName, b64, pushNewHistoryItem, history)
}

export { clearAllQueryParams, deleteQueryParam, getB64QueryParam, getQueryParam, setB64QueryParam, setQueryParam }
