import React from 'react'
import { Typography } from '@material-ui/core'
import Link from './Link'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: { margin: '2em auto' },
}))

const Footer: React.FC = () => {
    const classes = useStyles()

    return (
        <>
            <footer className={classes.root}>
                <div>
                    <hr />
                    <Typography
                        style={{ margin: '1.5em auto' }}
                        variant='body1'
                        component='p'
                    >
                        Data from{' '}
                        <Link external to='https://cc-cedict.org/wiki/'>
                            CC-CEDICT
                        </Link>{' '}
                        (
                        <Link
                            external
                            to='https://creativecommons.org/licenses/by-sa/3.0/'
                        >
                            CC BY-SA 3.0
                        </Link>
                        ).
                    </Typography>
                </div>
            </footer>
        </>
    )
}

export default Footer
