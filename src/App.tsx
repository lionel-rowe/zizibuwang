import './lib/viewportHeightAdjuster.ts'

import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'

import { theme } from './lib/theme.ts'

import PageBackground from './components/PageBackground.tsx'

import { Container } from '@material-ui/core'
import Footer from './components/Footer.tsx'
import { AppStateProvider } from './state/Context.tsx'
import ModalContainer from 'react-modal-promise'
import AppRouter from './AppRouter.tsx'
import GlobalStyles from './layouts/GlobalStyles.tsx'

function App() {
	return (
		// TODO - re-enable StrictMode (dependant on MUI https://github.com/mui-org/material-ui/issues/13394)
		// <React.StrictMode>
		<AppStateProvider>
			<ThemeProvider theme={theme}>
				<GlobalStyles />
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
		// </React.StrictMode>
	)
}

export default App
