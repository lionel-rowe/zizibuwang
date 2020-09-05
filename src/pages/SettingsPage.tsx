import React, { useContext } from 'react'
import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormGroup,
    Checkbox,
    makeStyles,
} from '@material-ui/core'
import { AppContext } from '../state/Context'
import { fuzzyReplacements } from '../lib/makeFuzzyPinyinRegex'
import { setTitle } from '../lib/setTitle'

const useStyles = makeStyles(_theme => ({
    formGroup: { padding: '1em 0' },
}))

const SettingsPage: React.FC<{ title: string }> = ({ title }) => {
    setTitle(title)

    const classes = useStyles()

    const { state, dispatch } = useContext(AppContext)

    const { charSet, enabledFuzzyReplacementIds } = state

    return (
        <>
            <h1>Settings</h1>
            <form onSubmit={e => e.preventDefault()}>
                <FormGroup className={classes.formGroup}>
                    <FormControl component='fieldset'>
                        <FormLabel component='legend'>
                            Default character set
                        </FormLabel>
                        <RadioGroup
                            aria-label='Default character set'
                            name='character-set'
                            value={charSet}
                            onChange={e => {
                                const charSet = e.currentTarget.value as
                                    | 'trad'
                                    | 'simp'

                                localStorage.setItem('charSet', charSet)

                                dispatch({ charSet })
                            }}
                        >
                            <FormControlLabel
                                value='simp'
                                control={<Radio />}
                                label='简 Simplified'
                            />
                            <FormControlLabel
                                value='trad'
                                control={<Radio />}
                                label='繁 Traditional'
                            />
                        </RadioGroup>
                    </FormControl>
                </FormGroup>

                <FormGroup className={classes.formGroup}>
                    <FormControl component='fieldset'>
                        <FormLabel component='legend'>Fuzzy pinyin</FormLabel>
                        <FormGroup>
                            {fuzzyReplacements.map(({ name, id }) => {
                                return (
                                    <FormControlLabel
                                        key={id}
                                        control={
                                            <Checkbox
                                                checked={
                                                    enabledFuzzyReplacementIds[
                                                        id
                                                    ] || false
                                                }
                                                onChange={e => {
                                                    enabledFuzzyReplacementIds[
                                                        id
                                                    ] = e.currentTarget.checked

                                                    dispatch({
                                                        enabledFuzzyReplacementIds,
                                                    })

                                                    localStorage.setItem(
                                                        'enabledFuzzyReplacementIds',
                                                        JSON.stringify(
                                                            enabledFuzzyReplacementIds,
                                                        ),
                                                    )
                                                }}
                                                name={id}
                                            />
                                        }
                                        label={name}
                                    />
                                )
                            })}
                        </FormGroup>
                    </FormControl>
                </FormGroup>
            </form>
        </>
    )
}

export default SettingsPage
