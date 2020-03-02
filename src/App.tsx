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

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <PageBackground />
            <div className='everything-container'>
                <MainLayout className='content-container'>
                    <Router basepath={process.env.PUBLIC_URL}>
                        <SearchPage path='/' />
                        <DocsPage path='/instructions' />
                    </Router>
                </MainLayout>
                <Container className='footer-container' maxWidth='sm'>
                    <Footer />
                </Container>
            </div>
        </ThemeProvider>
    )
}

export default App
