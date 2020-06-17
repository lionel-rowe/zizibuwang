import './lib/viewportHeightAdjuster'

import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'

import { theme } from './lib/theme'

import PageBackground from './components/PageBackground'

import { Container } from '@material-ui/core'
import Footer from './components/Footer'
import { AppStateProvider } from './state/Context'
import ModalContainer from 'react-modal-promise'
import AppRouter from './AppRouter'
import GlobalStyles from './layouts/GlobalStyles'

// TODO
import './lib/segmentPinyin'
// TODO

const App: React.FC = () => {
    return (
        <AppStateProvider>
            <ThemeProvider theme={theme}>
                <GlobalStyles>
                    <ModalContainer />
                    <PageBackground />
                    <div className='everything-container'>
                        <AppRouter />
                        <Container className='footer-container' maxWidth='sm'>
                            <Footer />
                        </Container>
                    </div>
                </GlobalStyles>
            </ThemeProvider>
        </AppStateProvider>
    )
}

export default App
