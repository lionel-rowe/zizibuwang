import React, { useState, useEffect } from 'react'
import { CircularProgress } from '@material-ui/core'

import {
    List,
    WindowScroller,
    CellMeasurerCache,
    CellMeasurer,
} from 'react-virtualized'

import { MeasuredCellParent } from 'react-virtualized/dist/es/CellMeasurer'
import Result from '../components/Result'

const rowRenderer = (results: CedictEntry[], cache: CellMeasurerCache) => ({
    index,
    key,
    style,
    parent,
}: {
    index: number
    key: any
    style: object
    parent: MeasuredCellParent
}) => {
    return (
        <CellMeasurer
            key={key}
            cache={cache}
            parent={parent}
            columnIndex={0}
            rowIndex={index}
        >
            <div key={key} style={style}>
                <Result index={index} entry={results[index]} isLast={index === results.length - 1} />
            </div>
        </CellMeasurer>
    )
}

const initCellMeasurerCache = () =>
    new CellMeasurerCache({
        defaultHeight: 100,
        minHeight: 75,
        fixedWidth: true,
    })

const ResultsList: React.FC<{ results: CedictEntry[] }> = ({ results }) => {
    const [width, setWidth] = useState(500)

    const [cellMeasurerCache, setCellMeasurerCache] = useState(
        initCellMeasurerCache(),
    )

    const calcAndSetDimensions = () => {
        setWidth(
            document.querySelector('#output')?.getBoundingClientRect().width ||
                500,
        )

        setCellMeasurerCache(initCellMeasurerCache())
    }

    useEffect(() => {
        calcAndSetDimensions()

        window.addEventListener('resize', calcAndSetDimensions)

        return () => window.removeEventListener('resize', calcAndSetDimensions)
    }, [])

    return (
        <WindowScroller>
            {({ height, isScrolling, onChildScroll, scrollTop }) => (
                <List
                    tabIndex={-1}
                    style={{ outline: 'none' }}
                    onRowsRendered={({ startIndex, stopIndex }) => {
                        // TODO
                        // console.log({ startIndex, stopIndex })
                    }}
                    width={width}
                    height={height}
                    autoHeight
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    scrollTop={scrollTop}
                    rowHeight={cellMeasurerCache.rowHeight}
                    rowCount={results.length}
                    rowRenderer={rowRenderer(results, cellMeasurerCache)}
                />
            )}
        </WindowScroller>
    )
}

const ResultsDisplay: React.FC<{
    results: CedictEntry[] | null
    resultsLoading: boolean
}> = ({ results, resultsLoading }) => {
    return (
        <output id='output' className='output'>
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
                                <strong>{results.length}</strong>{' '}
                                <span>
                                    {results.length === 1
                                        ? 'result'
                                        : 'results'}
                                </span>
                            </div>
                            <hr style={{ flexGrow: 1, height: 0 }} />
                        </div>
                        {results.length > 0 && (
                            <ResultsList results={results} />
                        )}
                    </>
                )
            )}
        </output>
    )
}

export default ResultsDisplay
