import React from 'react'

import './lib/injectDynamicStyles'

import SearchPage from './pages/SearchPage'
import MainLayout from './layouts/MainLayout'

import { Router } from '@reach/router'
import DocsPage from './pages/DocsPage'
import SettingsPage from './pages/SettingsPage'

const AppRouter: React.FC = () => {
    return (
        <Router basepath={process.env.PUBLIC_URL}>
            <MainLayout path='/' className='content-container'>
                <SearchPage title='Search' path='/' searchType='basic' />
                <SearchPage
                    title='Advanced Search'
                    path='/advanced'
                    searchType='advanced'
                />
                <DocsPage title='Instructions' path='/instructions' />
                <SettingsPage title='Settings' path='/settings' />
            </MainLayout>
        </Router>
    )
}

export default AppRouter
