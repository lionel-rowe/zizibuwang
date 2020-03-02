import React from 'react'
import {
    FormControl,
    TextField,
    Button,
    InputLabel,
    Input,
    InputAdornment,
    IconButton,
    FilledInput,
    Tooltip,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

const SearchForm: React.FC<{
    submitForm: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
}> = ({ submitForm }) => {
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
                    // variant='filled'
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
                                    // onClick={handleClickShowPassword}
                                    // onMouseDown={handleMouseDownPassword}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </Tooltip>
                        </InputAdornment>
                    }
                />

                {/* <TextField
                    id='search-conditions'
                    InputProps={{
                        style: {
                            fontFamily:
                                'monospace, "Noto Sans CJK SC", "Noto Sans CJK TC", "Microsoft YaHei"',
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
                /> */}
            </FormControl>
            {/* <FormControl style={{ margin: '1em 0' }}>
                <Button type='submit' variant='contained' color='primary'>
                    Search
                </Button>
            </FormControl> */}
        </form>
    )
}

export default SearchForm
