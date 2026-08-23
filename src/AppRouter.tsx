import React, { useRef } from 'react'

import SearchPage from './pages/SearchPage.tsx'
import MainLayout from './layouts/MainLayout.tsx'

import { BrowserRouter as Router, Redirect, Route, useHistory } from 'react-router-dom'

import DocsPage from './pages/DocsPage.tsx'
import SettingsPage from './pages/SettingsPage.tsx'
import makeStyles from '@material-ui/core/styles/makeStyles'
import RouteAnalytics from './components/RouteAnalytics.tsx'

// @ts-ignore TODO: types
const useStyles = makeStyles((_theme) => ({
	focusOnRouteChange: { outline: 'none' },
}))

let prevPathName: string | null = null

function FocusOnRouteChange({ children }: React.PropsWithChildren<{}>) {
	const history = useHistory()

	const { focusOnRouteChange } = useStyles()

	const ref = useRef<HTMLDivElement>(null)

	history.listen(({ pathname }) => {
		// don't refocus if only the query params/hash have changed
		if (pathname !== prevPathName) {
			ref.current?.focus()

			// prevent jank when focusing causes page to scroll
			window.scrollTo(0, 0)

			prevPathName = pathname
		}
	})

	return (
		<div ref={ref} tabIndex={-1} className={focusOnRouteChange}>
			{children}
		</div>
	)
}
/**
 * Redirects preserving query string, hash, etc.
 */
function RedirectPathname({
	from,
	to,
}: {
	from: string
	to: string
}) {
	return (
		<Route
			exact
			path={from}
			render={() => <Redirect to={{ ...window.location, pathname: to }} />}
		/>
	)
}

function AppRouter() {
	return (
		<Router basename={process.env.PUBLIC_URL}>
			<Route path='/'>
				<MainLayout className='content-container'>
					<RouteAnalytics />
					<RedirectPathname from='/' to='/search/basic' />
					<RedirectPathname from='/advanced' to='/search/advanced' />
					<FocusOnRouteChange>
						<Route exact path='/search/basic'>
							<SearchPage title='Search' searchType='basic' />
						</Route>
						<Route exact path='/search/advanced'>
							<SearchPage
								title='Advanced Search'
								searchType='advanced'
							/>
						</Route>
						<Route exact path='/instructions'>
							<DocsPage title='Instructions' />
						</Route>
						<Route exact path='/settings'>
							<SettingsPage title='Settings' />
						</Route>
					</FocusOnRouteChange>
				</MainLayout>
			</Route>
		</Router>
	)
}

export default AppRouter
