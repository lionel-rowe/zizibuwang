import React, { useContext } from 'react'
import {
    FormControl,
    InputLabel,
    InputAdornment,
    IconButton,
    FilledInput,
    Tooltip,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { AppContext, loadResultsFromQuery } from '../state/Context'
import { deleteQueryParam } from '../lib/query-param-helper'

const SearchForm: React.FC = () => {
    const { dispatch, state } = useContext(AppContext)

    const { searchQuery } = state

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        loadResultsFromQuery(searchQuery, dispatch, true)

        deleteQueryParam('page', false)

        dispatch({ page: null })
    }

    return (
        <form
            id='search-form'
            style={{ marginTop: '1em' }}
            onSubmit={submitForm}
        >
            <FormControl style={{ margin: '1em 0' }} fullWidth variant='filled'>
                <InputLabel htmlFor='search-conditions'>
                    Search query
                </InputLabel>
                <FilledInput
                    id='search-conditions'
                    style={{
                        fontFamily:
                            'monospace, "Noto Sans CJK SC", "Noto Sans CJK TC", "Microsoft YaHei"',
                    }}
                    value={searchQuery}
                    onChange={e => {
                        dispatch({ searchQuery: e.currentTarget.value })
                    }}
                    multiline
                    autoComplete='off'
                    autoCorrect='off'
                    autoCapitalize='off'
                    spellCheck='false'
                    name='search-conditions'
                    placeholder='Syntax: subject verb object'
                    endAdornment={
                        <InputAdornment position='end'>
                            <Tooltip placement='left' title='Search' arrow>
                                <IconButton
                                    type='submit'
                                    aria-label='Search'
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        right: 0,
                                        marginRight: 6,
                                    }}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </Tooltip>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </form>
    )
}

export default SearchForm
