import React, { useContext } from 'react'
import { CircularProgress, makeStyles } from '@material-ui/core'

import Pagination from '@material-ui/lab/Pagination'

import Result from '../components/Result'
import { AppContext } from '../state/Context'
import { setQueryParam } from '../lib/queryParams'
import { useHtmlId } from '../hooks/useHtmlId'
import { useHistory } from 'react-router-dom'
import { setTitle } from '../lib/setTitle'
import { truncate } from '../lib/formatters'
import { RESULTS_PER_PAGE, TITLE_SEGMENT_TRUNCATE_LENGTH } from '../config'

const ResultsList: React.FC<{ page: number; results: CedictEntry[] }> = ({
    results,
    page,
}) => {
    return (
        <>
            {results
                .slice((page - 1) * RESULTS_PER_PAGE, page * RESULTS_PER_PAGE)
                .map((result, idx) => {
                    return (
                        <Result
                            key={idx}
                            entry={result}
                            isLast={idx === results.length - 1}
                        />
                    )
                })}
        </>
    )
}

const useStyles = makeStyles(_theme => ({
    loaderOuter: {
        marginTop: '2em',
        display: 'flex',
        justifyContent: 'center',
    },
    loaderInner: {
        zoom: 1.2,
    },
    resultsOuter: {
        margin: '1.5em 0',
        display: 'flex',
    },
    resultsTotalDisplay: {
        padding: '0 20px',
    },
    halfWidthHr: {
        flexGrow: 1,
        height: 0,
    },
}))

const ResultsDisplay: React.FC = () => {
    const { state, dispatch } = useContext(AppContext)

    const {
        loaderOuter,
        loaderInner,
        resultsOuter,
        resultsTotalDisplay,
        halfWidthHr,
    } = useStyles()

    const history = useHistory()

    const outputId = useHtmlId('output')

    const {
        results,
        resultsLoading,
        page: _page,
        searchQuery,
        searchType,
    } = state

    const page = _page || 1

    if (results && !resultsLoading) {
        setTitle(
            [
                truncate(TITLE_SEGMENT_TRUNCATE_LENGTH)(searchQuery),
                page > 1 ? `page ${page}` : '',
                searchType === 'advanced' ? 'Advanced Search' : 'Search',
            ].filter(Boolean),
        )
    }

    return (
        <output id={outputId} className='output'>
            {resultsLoading ? (
                <div className={loaderOuter}>
                    <CircularProgress className={loaderInner} color='primary' />
                </div>
            ) : (
                results && (
                    <>
                        <div className={resultsOuter}>
                            <hr className={halfWidthHr} />
                            <div className={resultsTotalDisplay}>
                                <strong>
                                    {results.length.toLocaleString('en-US')}
                                </strong>{' '}
                                <span>
                                    {results.length === 1
                                        ? 'result'
                                        : 'results'}
                                </span>
                            </div>
                            <hr className={halfWidthHr} />
                        </div>
                        {results.length > 0 && (
                            <ResultsList page={page} results={results} />
                        )}

                        <Pagination
                            page={page}
                            onChange={(_e: any, n: number) => {
                                dispatch({ page: n })

                                setQueryParam(
                                    'page',
                                    n.toString(),
                                    true,
                                    history,
                                )

                                window.scrollTo(0, 0)
                            }}
                            count={Math.floor(
                                results.length / RESULTS_PER_PAGE,
                            )}
                        />
                    </>
                )
            )}
        </output>
    )
}

export default ResultsDisplay
