import React, { useEffect, useContext } from 'react'
import { RouteComponentProps } from '@reach/router'
import { Typography } from '@material-ui/core'
import { getB64QueryParam, deleteQueryParam, getQueryParam } from '../lib/query-param-helper'
import Cedict from '../repositories/cedict'
import { NoDataError } from '../lib/errors'
import ResultsDisplay from '../components/ResultsDisplay'
import SearchForm from '../components/SearchForm'
import { AppContext, loadResultsFromQuery } from '../state/Context'

const SearchPage: React.FC<RouteComponentProps> = () => {
    const { state, dispatch } = useContext(AppContext)

    const { error } = state

    const handleQueryParams = () => {
        try {
            const text = getB64QueryParam('q')
            const page = getQueryParam('page') || '1'

            if (text) {
                dispatch({ searchQuery: text, page: +page })

                loadResultsFromQuery(text, dispatch)
            } else {
                deleteQueryParam('page')

                dispatch({
                    page: null,
                    searchQuery: '',
                    results: null,
                    resultsLoading: false,
                })
            }
        } catch (e) {
            deleteQueryParam('q')
            deleteQueryParam('page')

            console.error(e)
        }
    }

    useEffect(() => {
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
    }, [dispatch])

    return error && error instanceof NoDataError ? (
        <>
            <Typography variant='h4' paragraph component='h2'>
                No dictionary data loaded
            </Typography>
            <div>
                <Typography variant='body1' paragraph component='p'>
                    Dictionary data is required to run this app. Please{' '}
                    <a href={JSON.parse('""') /* current page */}>
                        reload the page
                    </a>{' '}
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
