import React, { useContext } from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Link from '../components/Link'
import { AppContext } from '../state/Context'

const useStyles = makeStyles(theme => ({
    root: {
        color: 'antiquewhite',
        textAlign: 'center',
        paddingTop: '3.5em',
        paddingBottom: '2em',
    },
    heading: {
        fontFamily: 'ZhiMangXing, Roboto',
    },
    subtitle: {
        padding: '0 2em',
    },
}))

const Header = () => {
    const { root, heading, subtitle } = useStyles()

    const { dispatch } = useContext(AppContext)

    const clearQuery = () =>
        dispatch({
            searchQuery: '',
            results: null,
            resultsLoading: false,
        })

    return (
        <header className={root}>
            <Typography variant='h1' component='h1' className={heading}>
                <Link
                    tabIndex={-1}
                    to='/'
                    onClick={clearQuery}
                    className='unstyled'
                >
                    字字不忘
                </Link>
            </Typography>
            <Typography
                className={subtitle}
                variant='subtitle2'
                component='div'
            >
                Zi Zi Bu Wang · Chinese Dictionary Lookup
            </Typography>
        </header>
    )
}

export default Header
