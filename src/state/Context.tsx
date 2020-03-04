import React, { useReducer, useMemo } from 'react'
import Cedict from '../repositories/cedict'
import { search } from '../lib/search'
import Swal from 'sweetalert2'
import { setB64QueryParam } from '../lib/query-param-helper'

export interface AppState {
    charSet: 'trad' | 'simp'
    results: CedictEntry[] | null
    error: Error | null
    searchQuery: string
    resultsLoading: boolean
    cedictDataLoading: boolean
    page: number | null
}

type SearchActionType = Partial<AppState>

const initialState: AppState = {
    charSet: (localStorage.getItem('charSet') as 'trad' | 'simp') || 'simp',
    results: null,
    error: null,
    searchQuery: '',
    resultsLoading: false,
    cedictDataLoading: true,
    page: null,
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

const loadResultsFromQuery = async (
    query: string,
    dispatch: React.Dispatch<SearchActionType>,
    pushNewHistoryItem = false,
) => {
    dispatch({ results: null, resultsLoading: true })

    const data = await Cedict.all

    const { results, error } = await search(query, data)

    if (error) {
        Swal.fire({ text: error.message, icon: 'error' })

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

const AppProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const value = useMemo(() => ({ state, dispatch }), [state, dispatch])

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export { reducer, initialState, loadResultsFromQuery, AppContext, AppProvider }
