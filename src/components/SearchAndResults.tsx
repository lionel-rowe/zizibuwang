import React, { useState, useEffect } from 'react';
import { Typography, Link } from '@material-ui/core';
import { handleQueryParams } from '../lib/handle-query-params';
import Cedict from '../repos/cedict';
import { search } from '../lib/search';
import Swal from 'sweetalert2';
import { NoDataError } from '../lib/errors';
import ResultsDisplay from './ResultsDisplay';
import SearchForm from './SearchForm';

const SearchAndResults = () => {
    const [results, setResults] = useState([] as CedictEntry[]);
    const [resultsLoading, setResultsLoading] = useState(false);
    const [, setCedictDataLoading] = useState(true);
    const [cedictDataError, setCedictDataError] = useState(
        null as NoDataError | null,
    );

    useEffect(() => {
        handleQueryParams();

        (async () => {
            try {
                await Cedict.all;
            } catch (e) {
                if (e instanceof NoDataError) {
                    setCedictDataError(e);
                }
            }

            setCedictDataLoading(false);
        })();
    }, []);

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setResults([]);
        setResultsLoading(true);

        const query = new FormData(e.currentTarget).get(
            'search-conditions',
        ) as string;

        const data = await Cedict.all;

        const { results, error } = await search(query, data);

        if (error) {
            Swal.fire({ text: error.message, icon: 'error' });

            setResultsLoading(false);
            setResults([]);
        } else {
            setResultsLoading(false);
            setResults(results as CedictEntry[]);
        }
    };

    return cedictDataError ? (
        <>
            <Typography variant='h4' paragraph component='h2'>
                No dictionary data loaded
            </Typography>
            <div>
                <Typography variant='body1' paragraph component='p'>
                    Dictionary data is required to run this app. Please{' '}
                    <Link href='' onClick={() => window.location.reload()}>
                        reload the page
                    </Link>{' '}
                    and try again.
                </Typography>
            </div>
        </>
    ) : (
        <>
            <SearchForm submitForm={submitForm} />
            <ResultsDisplay results={results} resultsLoading={resultsLoading} />
        </>
    );
};

export default SearchAndResults;
