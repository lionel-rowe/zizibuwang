import React from 'react'
import ZhiMangXing from '../assets/ZhiMangXing-Regular-subset.ttf'
import { makeStyles } from '@material-ui/core'

const useGlobalStyles = makeStyles((theme) => ({
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
            backgroundImage: ((color) =>
                `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="100px" width="100px" fill="${color}" viewBox="0 0 82 81" version="1.1" x="0px" y="0px"><title>Group</title><desc>Created with Sketch.</desc><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(0.000000, -17.000000)"><path d="M65.0787075,33.0882353 L33.4558824,64.3382354" stroke="${color}" stroke-width="15" stroke-linecap="square"></path><polygon fill="${color}" transform="translate(72.134903, 29.456845) rotate(53.000000) translate(-72.134903, -29.456845) " points="68.5556866 14.7245467 97.9172862 36.850099 46.3525203 44.1891435"></polygon><polygon fill="${color}" points="48.5294118 28.6764706 0 28.6764706 0 97.7941176 69.1176471 97.7941176 69.1176471 50 58.0882353 61.0294118 58.0882353 86.7647059 11.0294118 86.7647059 11.0294118 39.7058824 37.5 39.7058824"></polygon></g></g></svg>')`)(
                encodeURIComponent(theme.palette.primary.main),
            ),
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
            '.MuiPaginationItem-page.Mui-selected:hover, .MuiPaginationItem-page.Mui-selected.Mui-focusVisible':
                {
                    backgroundColor: theme.palette.action.selected,
                },
        },
    },
}))

const GlobalStyles: React.FC = () => {
    useGlobalStyles()

    return null
}

export default GlobalStyles
