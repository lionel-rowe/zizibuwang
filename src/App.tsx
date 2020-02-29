import React from 'react';
import { Container, Typography, Link } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import './lib/load-fonts';

import { theme } from './lib/theme';

import Header from './components/Header';
import PageBackground from './components/PageBackground';
import SearchAndResults from './components/SearchAndResults';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <PageBackground />
            <Header />
            <main>
                <Container maxWidth='sm'>
                    <ErrorBoundary>
                        <SearchAndResults />
                    </ErrorBoundary>
                </Container>
            </main>
            <footer>
                <Container maxWidth='sm' style={{ margin: '2em auto' }}>
                    <hr style={{ opacity: 0.3 }} />
                    <Typography variant='body1' component='p'>
                        Data from{' '}
                        <Link
                            target='_blank'
                            rel='noopener noreferrer'
                            href='https://cc-cedict.org/wiki/'
                        >
                            CC-CEDICT
                        </Link>{' '}
                        (
                        <Link
                            target='_blank'
                            rel='noopener noreferrer'
                            href='https://creativecommons.org/licenses/by-sa/3.0/'
                        >
                            CC BY-SA 3.0
                        </Link>
                        ).
                    </Typography>
                </Container>
            </footer>
        </ThemeProvider>
    );
};

export default App;
