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
} from '@material-ui/core'

import { useHtmlId } from '../hooks/useHtmlId'
import { AppContext } from '../state/Context'
import { useNavigate } from '@reach/router'

const AdvancedSearch: React.FC = () => {
    const { dispatch, state } = useContext(AppContext)

    const { searchQuery } = state

    const navigate = useNavigate()

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
                Search query
            </InputLabel>
            <FilledInput
                id={searchConditionsId}
                style={{
                    fontFamily:
                        'monospace, "Noto Sans CJK SC", "Noto Sans CJK TC", "Microsoft YaHei"',
                    paddingRight: '5.5em',
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
                placeholder='Enter query'
                endAdornment={
                    <>
                        <InputAdornment position='end'>
                            <Tooltip placement='left' title='Search' arrow>
                                <IconButton
                                    type='submit'
                                    aria-label='Search'
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        right: '2em',
                                        marginRight: 6,
                                    }}
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
                                    onClick={e =>
                                        navigate(
                                            process.env.PUBLIC_URL +
                                                '/instructions#advanced-search',
                                        )
                                    }
                                    aria-label='Help'
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        right: 0,
                                        marginRight: 6,
                                    }}
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
