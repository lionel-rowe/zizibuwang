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
import { AppProvider } from './state/Context'
import SettingsPage from './pages/SettingsPage'

const App: React.FC = () => {
    return (
        <AppProvider>
            <ThemeProvider theme={theme}>
                <PageBackground />
                <div className='everything-container'>
                    <MainLayout className='content-container'>
                        <Router basepath={process.env.PUBLIC_URL}>
                            <SearchPage path='/' />
                            <DocsPage path='/instructions' />
                            <SettingsPage path='/settings' />
                        </Router>
                    </MainLayout>
                    <Container className='footer-container' maxWidth='sm'>
                        <Footer />
                    </Container>
                </div>
            </ThemeProvider>
        </AppProvider>
    )
}

export default App
