import React, { useMemo, useReducer } from 'react'
import Cedict from '../repositories/cedict.ts'
import { advancedSearch, basicSearch } from '../lib/search.ts'
import { fireModal } from '../lib/fireModal.ts'
import { setQueryParam } from '../lib/queryParams.ts'

import { History } from 'history'

import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import { FuzzyReplacementId } from '../lib/makeFuzzyPinyinRegex.ts'

export type AppState = {
	charSet: 'trad' | 'simp'
	results: CedictEntry[] | null
	error: Error | null
	pendingSearchQuery: string
	searchQuery: string
	resultsLoading: boolean
	cedictDataLoading: boolean
	page: number | null
	searchType: 'basic' | 'advanced'
	enabledFuzzyReplacementIds: Record<FuzzyReplacementId, boolean>
}

type SearchActionType = Partial<AppState>

const initialState: AppState = {
	charSet: (localStorage.getItem('charSet') || 'simp') as 'trad' | 'simp',
	results: null,
	error: null,
	pendingSearchQuery: '',
	searchQuery: '',
	resultsLoading: false,
	cedictDataLoading: true,
	page: null,
	searchType: 'basic',
	enabledFuzzyReplacementIds: JSON.parse(
		localStorage.getItem('enabledFuzzyReplacementIds') ||
			'{"zh-j":true,"z-j":false,"n-l":false,"z-zh":true,"f-hu":false,"n-ng":true}',
	) as Record<FuzzyReplacementId, boolean>,
}

function reducer(
	state: AppState = initialState,
	action: SearchActionType,
): AppState {
	Object.entries(action).forEach(([k, v]) => {
		;(state as any)[k] = v
	})

	return { ...state }
}

type LoadResultsFromQueryOptions = {
	pushNewHistoryItem?: boolean
	searchType: 'advanced' | 'basic'
	history: History
}

let queryResultIncrementer = 0

async function loadResultsFromQuery(
	query: string,
	{
		dispatch,
		state,
	}: {
		dispatch: React.Dispatch<SearchActionType>
		state: AppState
	},
	{
		pushNewHistoryItem = false,
		searchType,
		history,
	}: LoadResultsFromQueryOptions,
) {
	const data = await Cedict.all

	const currentQueryResult = ++queryResultIncrementer

	dispatch({
		results: null,
		resultsLoading: true,
	})

	const searchFn = searchType === 'advanced' ? advancedSearch : basicSearch

	try {
		const { results } = await searchFn(
			query,
			data,
			Object.entries(state.enabledFuzzyReplacementIds)
				.filter(([_k, v]) => v)
				.map(([k, _v]) => k) as FuzzyReplacementId[],
		)

		if (queryResultIncrementer !== currentQueryResult) {
			// ignore stale results
			return
		}

		setQueryParam('q', query, pushNewHistoryItem, history)

		return dispatch({
			searchQuery: query,
			results,
			resultsLoading: false,
		})
	} catch (e) {
		if (queryResultIncrementer !== currentQueryResult) {
			// ignore stale results
			return
		}

		fireModal({
			text: (e as Error).message,
			// @ts-ignore TODO: fix types
			icon: ErrorOutlineIcon,
			confirmButtonText: 'OK',
		})

		return dispatch({ results: null, resultsLoading: false })
	}
}

const AppContext = React.createContext(
	initialState as any as {
		state: AppState
		dispatch: React.Dispatch<Partial<AppState>>
	},
)

function AppStateProvider({ children }: React.PropsWithChildren<{}>) {
	const [state, dispatch] = useReducer(reducer, initialState)

	const value = useMemo(() => ({ state, dispatch }), [state, dispatch])

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export { AppContext, AppStateProvider, initialState, loadResultsFromQuery, reducer }
