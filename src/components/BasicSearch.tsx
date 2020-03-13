import React, { useContext } from 'react'
import SearchIcon from '@material-ui/icons/Search'

import {
    FormControl,
    InputLabel,
    FilledInput,
    InputAdornment,
    Tooltip,
    IconButton,
} from '@material-ui/core'

import useHtmlId from '../hooks/useHtmlId'
import { AppContext } from '../state/Context'

const BasicSearch: React.FC = () => {
    const { dispatch, state } = useContext(AppContext)

    const { searchQuery } = state

    const searchConditionsId = useHtmlId('search-conditions')

    return (
        <FormControl style={{ margin: '1em 0' }} fullWidth variant='filled'>
            <InputLabel htmlFor={searchConditionsId}>Search terms</InputLabel>
            <FilledInput
                id={searchConditionsId}
                value={searchQuery}
                onChange={e => {
                    dispatch({
                        searchQuery: e.currentTarget.value,
                    })
                }}
                style={{
                    paddingRight: '3em',
                }}
                autoComplete='off'
                autoCorrect='off'
                autoCapitalize='off'
                spellCheck='false'
                name='search-conditions'
                placeholder='Enter search terms'
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
    )
}

export default BasicSearch
