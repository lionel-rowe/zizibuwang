import React from 'react'
import ErrorBoundary from '../components/ErrorBoundary.tsx'
import { Container } from '@material-ui/core'

function MainSubLayout({ children }: React.PropsWithChildren<{}>) {
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
