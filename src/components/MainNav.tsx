import React, { useContext } from 'react'
import { makeStyles, IconButton } from '@material-ui/core'

import Tooltip from '@material-ui/core/Tooltip'
import HomeIcon from '@material-ui/icons/Home'
import InfoIcon from '@material-ui/icons/Info'
import SettingsIcon from '@material-ui/icons/Settings'
import { navigate, useLocation } from '@reach/router'

import { AppContext } from '../state/Context'
import { fade } from '@material-ui/core/styles/colorManipulator'

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
    [theme.breakpoints.up('sm')]: {
        navItem: {
            borderRadius: `50% 0 0 50%`,
        },
        activeNavItem: {
            background: fade(theme.palette.primary.main, 0.25),
            '&:hover': {
                background: fade(theme.palette.primary.main, 0.35),
            },
        },
        touchRippleChild: {
            // borderRadius: 0,
        },
    },
    [theme.breakpoints.down('xs')]: {
        activeNavItem: {
            color: theme.palette.primary.dark,
            '&:hover': {
                background: fade(theme.palette.primary.dark, 0.15),
            },
        },
    },
}))

const links = [
    { to: '/', text: 'Home', Icon: HomeIcon, match: '(/advanced)?' },
    {
        to: '/instructions',
        text: 'Instructions',
        Icon: InfoIcon,
        match: '/instructions',
    },
    {
        to: '/settings',
        text: 'Settings',
        Icon: SettingsIcon,
        match: '/settings',
    },
]

const MainNav: React.FC = () => {
    const classes = useStyles()

    const { dispatch } = useContext(AppContext)

    const location = useLocation()

    const clearQuery = () =>
        dispatch({
            searchQuery: '',
            results: null,
            resultsLoading: false,
        })

    return (
        <nav className={classes.root}>
            <ul className={classes.listRoot}>
                {links.map(({ to, text, Icon, match }, idx) => {
                    const path = `${process.env.PUBLIC_URL}${to}`

                    const matcher = new RegExp(
                        `^${process.env.PUBLIC_URL}${match}/?([?#]|$)`,
                    )

                    const isMatch = matcher.test(location.pathname)

                    return (
                        <li key={idx}>
                            <Tooltip placement='left' title={text} arrow>
                                <IconButton
                                    className={
                                        isMatch
                                            ? [
                                                  classes.navItem,
                                                  classes.activeNavItem,
                                              ].join(' ')
                                            : classes.navItem
                                    }
                                    TouchRippleProps={{
                                        classes: {
                                            child: classes.touchRippleChild,
                                        },
                                    }}
                                    role='link'
                                    onClick={() => {
                                        clearQuery()

                                        navigate(path)
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
