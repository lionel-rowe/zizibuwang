import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import { deleteQueryParam, getQueryParam } from '../lib/queryParams.ts'
import Cedict from '../repositories/cedict.ts'
import { NoDataError } from '../lib/errors.ts'
import ResultsDisplay from '../components/ResultsDisplay.tsx'
import SearchForm from '../components/SearchForm.tsx'
import { AppContext, loadResultsFromQuery } from '../state/Context.tsx'
import { setTitle } from '../lib/setTitle.ts'
import { xor } from '../lib/utils.ts'

function SearchPage({ searchType, title }: {
	searchType: 'basic' | 'advanced'
	title: string
}) {
	setTitle(title)

	const { state, dispatch } = useContext(AppContext)

	const history = useHistory()

	const { error } = state

	function handleQueryParams() {
		try {
			if (
				xor(
					searchType === 'advanced',
					window.location.pathname.split('/').includes('advanced'),
				)
			) {
				// return early if mismatch between search type
				// and current tab

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

	return error && error instanceof NoDataError
		? (
			<>
				<Typography variant='h4' paragraph component='h2'>
					No dictionary data loaded
				</Typography>
				<div>
					<Typography variant='body1' paragraph component='p'>
						Dictionary data is required to run this app. Please{' '}
						<a href={String('') /* current page */}>reload the page</a> and try again.
					</Typography>
				</div>
			</>
		)
		: (
			<>
				<SearchForm />
				<ResultsDisplay />
			</>
		)
}

export default SearchPage
