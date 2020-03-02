import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Link from '../components/Link'

const useStyles = makeStyles(theme => ({
    root: {
        color: 'antiquewhite',
        textAlign: 'center',
        paddingTop: '3.5em',
        paddingBottom: '2em',
    },
    text: {
        fontFamily: "ZhiMangXing, Roboto",
    },
}))

export default () => {
    const classes = useStyles()

    return (
        <header className={classes.root}>
            <Typography variant='h1' component='h1' className={classes.text}>
                <Link tabIndex={-1} to='/' className='unstyled'>
                    字字不忘
                </Link>
            </Typography>
        </header>
    )
}
