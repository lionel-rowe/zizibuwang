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

const AdvancedSearch: React.FC = () => {
    const { dispatch, state } = useContext(AppContext)

    const { searchQuery } = state

    const searchConditionsId = useHtmlId('search-conditions')

    return (
        <FormControl style={{ margin: '1em 0' }} fullWidth variant='filled'>
            <InputLabel
                style={{
                    fontFamily:
                        'monospace, "Noto Sans CJK SC", "Noto Sans CJK TC", "Microsoft YaHei"',
                }}
                htmlFor={searchConditionsId}
            >
                Enter query conditions
            </InputLabel>
            <FilledInput
                id={searchConditionsId}
                style={{
                    fontFamily:
                        'monospace, "Noto Sans CJK SC", "Noto Sans CJK TC", "Microsoft YaHei"',
                    paddingRight: '3em',
                }}
                value={searchQuery}
                onChange={e => {
                    dispatch({
                        searchQuery: e.currentTarget.value,
                    })
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
    )
}

export default AdvancedSearch
