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
    label: {
        fontFamily:
            'monospace, "Noto Sans CJK SC", "Noto Sans CJK TC", "Microsoft YaHei"',
    },
    inputField: {
        fontFamily:
            'monospace, "Noto Sans CJK SC", "Noto Sans CJK TC", "Microsoft YaHei"',
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

const AdvancedSearch: React.FC = () => {
    const { dispatch, state } = useContext(AppContext)

    const { root, label, inputField, searchButton } = useStyles()

    const { pendingSearchQuery } = state

    const searchConditionsId = useHtmlId('search-conditions')

    return (
        <FormControl className={root} fullWidth variant='filled'>
            <InputLabel className={label} htmlFor={searchConditionsId}>
                Search query
            </InputLabel>
            <FilledInput
                id={searchConditionsId}
                className={inputField}
                value={pendingSearchQuery}
                onChange={e => {
                    dispatch({
                        pendingSearchQuery: e.currentTarget.value,
                    })
                }}
                multiline
                autoComplete='off'
                autoCorrect='off'
                autoCapitalize='off'
                spellCheck='false'
                name='search-conditions'
                placeholder='Enter query'
                endAdornment={
                    <>
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
                    </>
                }
            />
        </FormControl>
    )
}

export default AdvancedSearch
