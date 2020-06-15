import React, { useContext } from 'react'
import { CircularProgress } from '@material-ui/core'

import Pagination from '@material-ui/lab/Pagination'

import Result from '../components/Result'
import { AppContext } from '../state/Context'
import { setQueryParam } from '../lib/queryParams'
import { useHtmlId } from '../hooks/useHtmlId'
import { useNavigate } from '@reach/router'
import { setTitle } from '../lib/setTitle'
import { truncate } from '../lib/formatters'

const PER_PAGE = 50

const ResultsList: React.FC<{ page: number; results: CedictEntry[] }> = ({
    results,
    page,
}) => {
    return (
        <>
            {results
                .slice((page - 1) * PER_PAGE, page * PER_PAGE)
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

const ResultsDisplay: React.FC = () => {
    const { state, dispatch } = useContext(AppContext)

    const navigate = useNavigate()

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
                truncate(50)(searchQuery),
                page > 1 ? `page ${page}` : '',
                searchType === 'advanced' ? 'Advanced Search' : 'Search',
            ].filter(Boolean),
        )
    }

    return (
        <output id={outputId} className='output'>
            {resultsLoading ? (
                <div
                    style={{
                        marginTop: '2em',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <CircularProgress style={{ zoom: 1.2 }} color='primary' />
                </div>
            ) : (
                results && (
                    <>
                        <div style={{ margin: '1.5em 0', display: 'flex' }}>
                            <hr style={{ flexGrow: 1, height: 0 }} />
                            <div style={{ padding: '0 20px' }}>
                                <strong>
                                    {results.length.toLocaleString('en-US')}
                                </strong>{' '}
                                <span>
                                    {results.length === 1
                                        ? 'result'
                                        : 'results'}
                                </span>
                            </div>
                            <hr style={{ flexGrow: 1, height: 0 }} />
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
                                    navigate,
                                )

                                window.scrollTo(0, 0)
                            }}
                            count={Math.floor(results.length / PER_PAGE)}
                        />
                    </>
                )
            )}
        </output>
    )
}

export default ResultsDisplay
