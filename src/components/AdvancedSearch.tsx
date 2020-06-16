import React, { useContext } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import HelpIcon from '@material-ui/icons/Help'

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
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(_theme => ({
    root: { margin: '1em 0' },
    label: {
        fontFamily:
            'monospace, "Noto Sans CJK SC", "Noto Sans CJK TC", "Microsoft YaHei"',
    },
    inputField: {
        fontFamily:
            'monospace, "Noto Sans CJK SC", "Noto Sans CJK TC", "Microsoft YaHei"',
        paddingRight: '5.5em',
    },
    searchButton: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        right: '2em',
        marginRight: 6,
    },
    helpButton: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        right: 0,
        marginRight: 6,
    },
}))

const AdvancedSearch: React.FC = () => {
    const { dispatch, state } = useContext(AppContext)

    const { root, label, inputField, searchButton, helpButton } = useStyles()

    const { pendingSearchQuery } = state

    const history = useHistory()

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
                        <InputAdornment position='end'>
                            <Tooltip placement='left' title='Help' arrow>
                                <IconButton
                                    role='link'
                                    color='secondary'
                                    onClick={_e =>
                                        history.push(
                                            process.env.PUBLIC_URL +
                                                '/instructions#advanced-search',
                                        )
                                    }
                                    aria-label='Help'
                                    className={helpButton}
                                >
                                    <HelpIcon />
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
