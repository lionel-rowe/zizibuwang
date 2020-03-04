import React, { useContext } from 'react'
import { RouteComponentProps } from '@reach/router'
import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@material-ui/core'
import { AppContext } from '../state/Context'

const SettingsPage: React.FC<RouteComponentProps> = () => {
    const { state, dispatch } = useContext(AppContext)

    const { charSet } = state

    return (
        <form onSubmit={e => e.preventDefault()}>
            <FormControl component='fieldset'>
                <FormLabel component='legend'>Default character set</FormLabel>
                <RadioGroup
                    aria-label='Default character set'
                    name='character-set'
                    value={charSet}
                    onChange={e => {
                        const charSet = e.currentTarget.value as 'trad' | 'simp'

                        localStorage.setItem('charSet', charSet)

                        dispatch({ charSet })
                    }}
                >
                    <FormControlLabel
                        color='primary'
                        value='simp'
                        control={<Radio color='primary' />}
                        label='简 Simplified'
                    />
                    <FormControlLabel
                        color='primary'
                        value='trad'
                        control={<Radio color='primary' />}
                        label='繁 Traditional'
                    />
                </RadioGroup>
            </FormControl>
        </form>
    )
}

export default SettingsPage
