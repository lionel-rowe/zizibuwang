import React from 'react'
import ZhiMangXing from '../assets/ZhiMangXing-Regular-subset.ttf'
import { makeStyles } from '@material-ui/core'

const _globalStyles = makeStyles(theme => ({
    '@global': {
        '@font-face': {
            fontFamily: 'ZhiMangXing',
            src: `url(${ZhiMangXing})`,
        },

        /**
         * Scrollbars
         */

        // chrome, safari, chromium-edge
        '::-webkit-scrollbar': { background: '#000' },
        '::-webkit-scrollbar-thumb': {
            background: 'rgba(255, 255, 255, 0.5)',
            borderColor: 'black',
            borderStyle: 'solid',
            borderRadius: 5,
        },

        // firefox
        '*': { scrollbarColor: '#808080 black', scrollbarWidth: 'thin' },

        /**
         * General
         */

        body: {
            background: '#111',
            color: '#eee',
            margin: '0',
            fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Noto Sans CJK SC", "Noto Sans CJK TC","Microsoft YaHei", sans-serif',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            overflowY: 'scroll !important',
        },

        '.everything-container': {
            minHeight: 'calc(var(--vh, 1vh) * 100)',
            display: 'flex',
            flexDirection: 'column',
            marginRight: '2em',
        },
        '.content-container': { flex: '1 0 auto' },
        '.footer-container': { flexShrink: '0' },

        hr: { opacity: '0.3' },

        [theme.breakpoints.down('xs')]: {
            header: {
                paddingBottom: '1em !important',
                '& h1': {
                    fontSize: '3.5em !important',
                },
            },
        },

        /**
         * Code
         */

        pre: {
            padding: 5,
            whiteSpace: 'pre-wrap',
            backgroundColor: 'rgba(151, 96, 128, 0.1)',
        },

        ':not(pre) > code': {
            padding: '1px 3px',
            color: theme.palette.secondary.main,
            backgroundColor: 'rgba(151, 96, 128, 0.1)',
            borderRadius: 4,
        },

        kbd: {
            color: '#fff',
            backgroundColor: '#333',
            borderRadius: 3,
            border: '1px solid #222',
            boxShadow:
                '0 1px 1px rgba(0, 0, 0, 0.2), 1px 1px 0 0 rgba(70, 70, 70, 0.7) inset',
            display: 'inline-block',
            lineHeight: '1',
            padding: '4px 6px',
            whiteSpace: 'nowrap',
        },

        /**
         * Links
         */

        'a[href]': {
            color: theme.palette.primary.main,
            textDecoration: 'none',
        },

        'a[href]:hover': { textDecoration: 'underline' },

        '.unstyled': {
            textDecoration: 'none !important',
            color: 'inherit !important',
        },

        [`a[href^="http"]:not([href^="${window.location.origin}"])::after`]: {
            content: '""',
            backgroundImage: `url("${process.env.PUBLIC_URL}/external-link-icon.svg")`,
            padding: '0 .34em',
            backgroundSize: '.7em',
            opacity: 0.7,
            margin: '0 .1em 0 .2em',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '0 .25em',
        },

        '.anchored': {
            position: 'relative',
            paddingTop: '0.8em',
            marginTop: '-0.4em',
        },

        [theme.breakpoints.up('md')]: {
            '.anchored:hover::before': {
                content: '"§"',
                position: 'absolute',
                left: '-1em',
                opacity: 0.7,
                fontWeight: 'normal',
            },
        },

        /**
         * MUI overrides
         */

        '@media (hover: none)': {
            // MUI default degrades usability on touch devices
            '.MuiPaginationItem-page.Mui-selected:hover, .MuiPaginationItem-page.Mui-selected.Mui-focusVisible': {
                backgroundColor: theme.palette.action.selected,
            },
        },
    },
}))

const GlobalStyles: React.FC = ({ children }) => {
    _globalStyles()

    return <>{children}</>
}

export default GlobalStyles
