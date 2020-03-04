import React, { useContext } from 'react'
import { makeStyles, IconButton } from '@material-ui/core'

import Tooltip from '@material-ui/core/Tooltip'
import HomeIcon from '@material-ui/icons/Home'
import InfoIcon from '@material-ui/icons/Info'
import SettingsIcon from '@material-ui/icons/Settings'
import { navigate } from '@reach/router'
import { AppContext } from '../state/Context'

const useStyles = makeStyles(theme => ({
    root: {
        zIndex: 1,
        position: 'fixed',
        right: 0,
        top: 0,
        textAlign: 'right',
    },
    listRoot: {
        listStyleType: 'none',
        padding: 0,
    },
}))

const links = [
    { to: '/', text: 'Home', Icon: HomeIcon },
    { to: '/instructions', text: 'Instructions', Icon: InfoIcon },
    { to: '/settings', text: 'Settings', Icon: SettingsIcon },
]

const MainNav: React.FC = () => {
    const classes = useStyles()

    const { dispatch } = useContext(AppContext)

    const clearQuery = () =>
        dispatch({
            searchQuery: '',
            results: null,
            resultsLoading: false,
        })

    return (
        <nav className={classes.root}>
            <ul className={classes.listRoot}>
                {links.map(({ to, text, Icon }, idx) => {
                    return (
                        <li key={idx}>
                            <Tooltip placement='left' title={text} arrow>
                                <IconButton
                                    role='link'
                                    onClick={() => {
                                        if (to === '/') {
                                            clearQuery()
                                        }

                                        navigate(`${process.env.PUBLIC_URL}${to}`)
                                    }}
                                    aria-label={text}
                                >
                                    <Icon />
                                </IconButton>
                            </Tooltip>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default MainNav
