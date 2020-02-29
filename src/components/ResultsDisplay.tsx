import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { prettify } from '../lib/pinyinize';

const ResultsDisplay = ({
    results,
    resultsLoading,
}: {
    results: CedictEntry[];
    resultsLoading: boolean;
}) => {
    return (
        <pre style={{ whiteSpace: 'pre-wrap' }}>
            <output className='output'>
                {resultsLoading ? (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <CircularProgress
                            style={{ zoom: 1.2 }}
                            color='secondary'
                        />
                    </div>
                ) : (
                    results.length > 0 && <>
                        <div><strong>{results.length}</strong>{' results\n\n\n'}</div>
                        {results
                            .slice(0, 100)
                            .map(({ trad, simp, pinyin, def }) => {
                                return (
                                    <React.Fragment
                                        key={`${trad} ${simp} [${pinyin}]`}
                                    >
                                        {`${trad} | ${simp} [${prettify(
                                            pinyin,
                                        )}]\n${def
                                            .split(/\s*[/;]\s*/)
                                            .map(e => `• ${e}`)
                                            .join('\n')}\n\n\n`}
                                    </React.Fragment>
                                );
                            })}
                    </>
                )}
            </output>
        </pre>
    );
};

export default ResultsDisplay;
