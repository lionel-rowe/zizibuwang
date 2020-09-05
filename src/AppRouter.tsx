import React, { useRef } from 'react'

import SearchPage from './pages/SearchPage'
import MainLayout from './layouts/MainLayout'

import {
    BrowserRouter as Router,
    Route,
    useHistory,
    Redirect,
} from 'react-router-dom'

import DocsPage from './pages/DocsPage'
import SettingsPage from './pages/SettingsPage'
import makeStyles from '@material-ui/core/styles/makeStyles'
import RouteAnalytics from './components/RouteAnalytics'

const useStyles = makeStyles(_theme => ({
    focusOnRouteChange: { outline: 'none' },
}))

let prevPathName: string | null = null

const FocusOnRouteChange: React.FC = ({ children }) => {
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
const RedirectPathname: React.FC<{ from: string; to: string }> = ({
    from,
    to,
}) => {
    return (
        <Route
            exact
            path={from}
            render={() => (
                <Redirect to={{ ...window.location, pathname: to }} />
            )}
        />
    )
}

const AppRouter: React.FC = () => {
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
