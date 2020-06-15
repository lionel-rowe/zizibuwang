import './lib/setup'
import './lib/injectDynamicStyles'

import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'

import { theme } from './lib/theme'

import PageBackground from './components/PageBackground'

import { Container } from '@material-ui/core'
import Footer from './components/Footer'
import { AppStateProvider } from './state/Context'
import ModalContainer from 'react-modal-promise'
import AppRouter from './AppRouter'

const App: React.FC = () => {
    return (
        <AppStateProvider>
            <ThemeProvider theme={theme}>
                <ModalContainer />
                <PageBackground />
                <div className='everything-container'>
                    <AppRouter />
                    <Container className='footer-container' maxWidth='sm'>
                        <Footer />
                    </Container>
                </div>
            </ThemeProvider>
        </AppStateProvider>
    )
}

export default App
