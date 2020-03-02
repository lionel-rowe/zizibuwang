import React from 'react'
import ErrorBoundary from '../components/ErrorBoundary'
import { Container } from '@material-ui/core'
import Footer from '../components/Footer'

const MainSubLayout: React.FC = ({ children }) => {
    return (
        <>
            <Container maxWidth='sm'>
                <main>
                    <ErrorBoundary>{children}</ErrorBoundary>
                </main>
            </Container>
        </>
    )
}

export default MainSubLayout
