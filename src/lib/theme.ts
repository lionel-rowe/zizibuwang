import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
    overrides: {
        MuiTooltip: {
            tooltip: {
                color: '#000',
                backgroundColor: 'ivory',
            },
            arrow: {
                color: 'ivory',
            },
        },
    },
    palette: {
        common: { black: '#000', white: '#fff' },
        type: 'dark',
        primary: {
            main: '#26c6dd',
            light: 'rgb(81,209,227)',
            dark: 'rgb(26,138,154)',
            contrastText: 'rgba(0,0,0,0.87)',
        },
        secondary: {
            main: '#f13a64',
            light: 'rgb(91,119,146)',
            dark: 'rgb(35,59,83)',
            contrastText: '#fff',
        },
        error: {
            light: '#e57373',
            main: '#f44336',
            dark: '#d32f2f',
            contrastText: '#fff',
        },
        warning: {
            light: '#ffb74d',
            main: '#ff9800',
            dark: '#f57c00',
            contrastText: 'rgba(0,0,0,0.87)',
        },
        info: {
            light: '#64b5f6',
            main: '#2196f3',
            dark: '#1976d2',
            contrastText: '#fff',
        },
        success: {
            light: '#81c784',
            main: '#4caf50',
            dark: '#388e3c',
            contrastText: 'rgba(0,0,0,0.87)',
        },
        grey: {
            '50': '#fafafa',
            '100': '#f5f5f5',
            '200': '#eeeeee',
            '300': '#e0e0e0',
            '400': '#bdbdbd',
            '500': '#9e9e9e',
            '600': '#757575',
            '700': '#616161',
            '800': '#424242',
            '900': '#212121',
            A100: '#d5d5d5',
            A200: '#aaaaaa',
            A400: '#303030',
            A700: '#616161',
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
        text: {
            primary: '#fff',
            secondary: 'rgba(255,255,255,0.7)',
            disabled: 'rgba(255,255,255,0.5)',
            hint: 'rgba(255,255,255,0.5)',
        },
        divider: 'rgba(255,255,255,0.12)',
        background: {
            paper: '#424242',
            default: '#121212',
        },
        action: {
            active: '#fff',
            hover: 'rgba(255,255,255,0.08)',
            hoverOpacity: 0.08,
            selected: 'rgba(255,255,255,0.16)',
            disabled: 'rgba(255,255,255,0.3)',
            disabledBackground: 'rgba(255,255,255,0.12)',
        },
    },
})
