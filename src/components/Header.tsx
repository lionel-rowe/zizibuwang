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
    text: {
        fontFamily: 'ZhiMangXing, Roboto',
    },
}))

export default () => {
    const classes = useStyles()

    const { dispatch } = useContext(AppContext)

    const clearQuery = () =>
        dispatch({
            searchQuery: '',
            results: null,
            resultsLoading: false,
        })

    return (
        <header className={classes.root}>
            <Typography variant='h1' component='h1' className={classes.text}>
                <Link tabIndex={-1} to='/' onClick={clearQuery} className='unstyled'>
                    字字不忘
                </Link>
            </Typography>
        </header>
    )
}
