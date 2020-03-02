import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import { Typography } from '@material-ui/core'
import {
    getB64QueryParam,
    deleteQueryParam,
    setB64QueryParam,
} from '../lib/query-param-helper'
import Cedict from '../repos/cedict'
import { search } from '../lib/search'
import Swal from 'sweetalert2'
import { NoDataError } from '../lib/errors'
import ResultsDisplay from '../components/ResultsDisplay'
import SearchForm from '../components/SearchForm'

const SearchPage: React.FC<RouteComponentProps> = () => {
    const [results, setResults] = useState(null as CedictEntry[] | null)
    const [resultsLoading, setResultsLoading] = useState(false)
    const [cedictDataLoading, setCedictDataLoading] = useState(true)
    const [cedictDataError, setCedictDataError] = useState(
        null as NoDataError | null,
    )

    const handleQueryParams = () => {
        try {
            const text = getB64QueryParam('q')

            if (text) {
                ;(document.querySelector(
                    '#search-conditions',
                ) as HTMLTextAreaElement).value = text

                submitForm(null)
            } else {
                ;(document.querySelector(
                    '#search-conditions',
                ) as HTMLTextAreaElement).value = ''

                setResults(null)
            }
        } catch (e) {
            deleteQueryParam('q')

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
                    console.log(1)
                    setCedictDataError(e)
                    console.log(2)
                }
            }

            setCedictDataLoading(false)
        })()

        return () => window.removeEventListener('popstate', handleQueryParams)
    }, [])

    const submitForm = async (e: React.FormEvent<HTMLFormElement> | null) => {
        if (e) {
            e.preventDefault()
        }

        setResults(null)
        setResultsLoading(true)

        const query = new FormData(
            document.querySelector('#search-form') as HTMLFormElement,
        ).get('search-conditions') as string

        const data = await Cedict.all

        const { results, error } = await search(query, data)

        if (error) {
            Swal.fire({ text: error.message, icon: 'error' })

            setResultsLoading(false)
            setResults(null)
        } else {
            setResultsLoading(false)
            setResults(results as CedictEntry[])

            setB64QueryParam('q', query)
        }
    }

    return cedictDataError ? (
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
            <SearchForm submitForm={submitForm} />
            <ResultsDisplay results={results} resultsLoading={resultsLoading} />
        </>
    )
}

export default SearchPage
