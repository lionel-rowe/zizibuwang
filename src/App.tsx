import './lib/setup'

import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'

import './lib/load-fonts'

import { theme } from './lib/theme'

import PageBackground from './components/PageBackground'
import SearchPage from './pages/SearchPage'
import MainLayout from './layouts/MainLayout'

import { Router } from '@reach/router'
import DocsPage from './pages/DocsPage'
import { Container } from '@material-ui/core'
import Footer from './components/Footer'
import { AppStateProvider } from './state/Context'
import SettingsPage from './pages/SettingsPage'
import ModalContainer from 'react-modal-promise'

const App: React.FC = () => {
    return (
        <AppStateProvider>
            <ThemeProvider theme={theme}>
                <ModalContainer />
                <PageBackground />
                <div className='everything-container'>
                    <MainLayout className='content-container'>
                        <Router basepath={process.env.PUBLIC_URL}>
                            <SearchPage searchType='basic' path='/' />
                            <SearchPage searchType='advanced' path='/advanced' />
                            <DocsPage path='/instructions' />
                            <SettingsPage path='/settings' />
                        </Router>
                    </MainLayout>
                    <Container className='footer-container' maxWidth='sm'>
                        <Footer />
                    </Container>
                </div>
            </ThemeProvider>
        </AppStateProvider>
    )
}

export default App
