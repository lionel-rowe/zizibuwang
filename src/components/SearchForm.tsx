import React from 'react';
import { FormControl, TextField, Button } from '@material-ui/core';

const SearchForm = ({
    submitForm,
}: {
    submitForm: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}) => {
    return (
        <form style={{ marginTop: '1em' }} onSubmit={submitForm}>
            <FormControl style={{ margin: '1em 0' }} fullWidth>
                <TextField
                    id='search-conditions'
                    InputProps={{
                        style: {
                            fontFamily: 'Consolas, monospace',
                        },
                    }}
                    label='Search query'
                    variant='filled'
                    multiline
                    autoComplete='off'
                    autoCorrect='off'
                    autoCapitalize='off'
                    spellCheck='false'
                    name='search-conditions'
                    placeholder='Syntax: subject verb object'
                ></TextField>
            </FormControl>
            <FormControl style={{ margin: '1em 0' }}>
                <Button type='submit' variant='contained' color='primary'>
                    Search
                </Button>
            </FormControl>
        </form>
    );
};

export default SearchForm;
