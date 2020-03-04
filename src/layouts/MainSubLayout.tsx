import React from 'react'
import ErrorBoundary from '../components/ErrorBoundary'
import { Container } from '@material-ui/core'

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
