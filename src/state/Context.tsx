import React, { useReducer, useMemo } from 'react'
import Cedict from '../repositories/cedict'
import { search } from '../lib/search'
import fireModal from '../lib/fireModal'
import { setB64QueryParam } from '../lib/query-param-helper'

import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import convertBasicToAdvanced from '../lib/convertBasicToAdvanced'

export interface AppState {
    charSet: 'trad' | 'simp'
    results: CedictEntry[] | null
    error: Error | null
    searchQuery: string
    resultsLoading: boolean
    cedictDataLoading: boolean
    page: number | null
    searchType: 'basic' | 'advanced'
}

type SearchActionType = Partial<AppState>

const initialState: AppState = {
    charSet: localStorage.getItem('charSet') === 'trad' ? 'trad' : 'simp',
    results: null,
    error: null,
    searchQuery: '',
    resultsLoading: false,
    cedictDataLoading: true,
    page: null,
    searchType: 'basic',
}

const reducer = (
    state: AppState = initialState,
    action: SearchActionType,
): AppState => {
    Object.entries(action).forEach(([k, v]) => {
        ;(state as any)[k] = v
    })

    return { ...state }
}

interface LoadResultsFromQueryOptions {
    pushNewHistoryItem?: boolean
    searchType: 'advanced' | 'basic'
}

const loadResultsFromQuery = async (
    query: string,
    dispatch: React.Dispatch<SearchActionType>,
    { pushNewHistoryItem = false, searchType }: LoadResultsFromQueryOptions,
) => {
    const searchQuery =
        searchType === 'advanced'
            ? query
            : convertBasicToAdvanced(query)

    dispatch({ results: null, resultsLoading: true })

    const data = await Cedict.all

    const { results, error } = await search(searchQuery, data, searchType === 'basic')

    if (error) {
        fireModal({ text: error.message, icon: ErrorOutlineIcon })

        return dispatch({ results: null, resultsLoading: false })
    } else {
        setB64QueryParam('q', query, pushNewHistoryItem)

        return dispatch({ results, resultsLoading: false })
    }
}

const AppContext = React.createContext(
    (initialState as any) as {
        state: AppState
        dispatch: React.Dispatch<Partial<AppState>>
    },
)

const AppStateProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const value = useMemo(() => ({ state, dispatch }), [state, dispatch])

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export {
    reducer,
    initialState,
    loadResultsFromQuery,
    AppContext,
    AppStateProvider,
}
