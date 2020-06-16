import React, { useContext } from 'react'
import SearchIcon from '@material-ui/icons/Search'

import {
    FormControl,
    InputLabel,
    FilledInput,
    InputAdornment,
    Tooltip,
    IconButton,
    makeStyles,
} from '@material-ui/core'

import { useHtmlId } from '../hooks/useHtmlId'
import { AppContext } from '../state/Context'

const useStyles = makeStyles(_theme => ({
    root: { margin: '1em 0' },
    inputField: {
        paddingRight: '3em',
    },
    searchButton: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        right: 0,
        marginRight: 6,
    },
}))

const BasicSearch: React.FC = () => {
    const { dispatch, state } = useContext(AppContext)

    const { root, inputField, searchButton } = useStyles()

    const { pendingSearchQuery } = state

    const searchConditionsId = useHtmlId('search-conditions')

    return (
        <FormControl className={root} fullWidth variant='filled'>
            <InputLabel htmlFor={searchConditionsId}>Search terms</InputLabel>
            <FilledInput
                id={searchConditionsId}
                value={pendingSearchQuery}
                onChange={e => {
                    dispatch({
                        pendingSearchQuery: e.currentTarget.value,
                    })
                }}
                className={inputField}
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
                                className={searchButton}
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
