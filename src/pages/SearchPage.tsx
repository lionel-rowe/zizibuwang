import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import { deleteQueryParam, getQueryParam } from '../lib/queryParams'
import Cedict from '../repositories/cedict'
import { NoDataError } from '../lib/errors'
import ResultsDisplay from '../components/ResultsDisplay'
import SearchForm from '../components/SearchForm'
import { AppContext, loadResultsFromQuery } from '../state/Context'
import { setTitle } from '../lib/setTitle'

const SearchPage: React.FC<{
    searchType: 'basic' | 'advanced'
    title: string
}> = ({ searchType, title }) => {
    setTitle(title)

    const { state, dispatch } = useContext(AppContext)

    const history = useHistory()

    const { error } = state

    const handleQueryParams = () => {
        try {
            if (
                // XOR - return early if mismatch
                Number(searchType === 'advanced') +
                    Number(
                        window.location.pathname
                            .split('/')
                            .includes('advanced'),
                    ) ===
                1
            ) {
                return
            }

            const text = getQueryParam('q')
            const page = getQueryParam('page') || '1'

            if (text) {
                dispatch({
                    pendingSearchQuery: text,
                    page: +page,
                })

                loadResultsFromQuery(
                    text,
                    { state, dispatch },
                    { searchType, history },
                )
            } else {
                deleteQueryParam('page', false, history)

                dispatch({
                    page: null,
                    pendingSearchQuery: '',
                    searchQuery: '',
                    results: null,
                    resultsLoading: false,
                })
            }
        } catch (e) {
            deleteQueryParam('q', false, history)
            deleteQueryParam('page', false, history)

            console.error(e)
        }
    }

    useEffect(() => {
        dispatch({ searchType })

        handleQueryParams()

        window.addEventListener('popstate', handleQueryParams)
        ;(async () => {
            try {
                await Cedict.all
            } catch (e) {
                if (e instanceof NoDataError) {
                    dispatch({ error: e })
                }
            }

            dispatch({ cedictDataLoading: false })
        })()

        return () => window.removeEventListener('popstate', handleQueryParams)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, searchType])

    return error && error instanceof NoDataError ? (
        <>
            <Typography variant='h4' paragraph component='h2'>
                No dictionary data loaded
            </Typography>
            <div>
                <Typography variant='body1' paragraph component='p'>
                    Dictionary data is required to run this app. Please{' '}
                    <a href={String('') /* current page */}>reload the page</a>{' '}
                    and try again.
                </Typography>
            </div>
        </>
    ) : (
        <>
            <SearchForm />
            <ResultsDisplay />
        </>
    )
}

export default SearchPage
