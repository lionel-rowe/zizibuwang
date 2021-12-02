import React from 'react'
import { makeStyles, darken } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        background: `linear-gradient(180deg, #080808, ${darken(
            theme.palette.primary.main,
            0.8,
        )})`,
        zIndex: -1,
    },
}))

export default () => {
    const { root } = useStyles()

    return <div className={root} />
}
