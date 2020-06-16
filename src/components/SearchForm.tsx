import React, { useContext } from 'react'
import { Tabs, Tab } from '@material-ui/core'
import { AppContext, loadResultsFromQuery } from '../state/Context'
import { deleteQueryParam } from '../lib/queryParams'
import { useHtmlId } from '../hooks/useHtmlId'
import BasicSearch from './BasicSearch'
import AdvancedSearch from './AdvancedSearch'
import { useHistory } from 'react-router-dom'

const TabPanel: React.FC<{
    id: string
    active: boolean
    labelledBy: string
}> = ({ children, id, active, labelledBy }) => {
    return (
        <div id={id} hidden={!active} aria-labelledby={labelledBy}>
            {children}
        </div>
    )
}

const SearchForm: React.FC = () => {
    const { dispatch, state } = useContext(AppContext)

    const history = useHistory()

    const { pendingSearchQuery, searchType } = state

    const searchFormId = useHtmlId('search-form')

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        loadResultsFromQuery(
            pendingSearchQuery,
            { dispatch, state },
            {
                pushNewHistoryItem: true,
                searchType,
                history,
            },
        )

        deleteQueryParam('page', false, history)

        dispatch({ page: null })
    }

    const basicSearchTabId = useHtmlId('basic-search-tab')
    const advancedSearchTabId = useHtmlId('advanced-search-tab')
    const basicSearchPanelId = useHtmlId('basic-search-panel')
    const advancedSearchPanelId = useHtmlId('advanced-search-panel')

    return (
        <form
            id={searchFormId}
            style={{ marginTop: '1em' }}
            onSubmit={submitForm}
        >
            <Tabs
                indicatorColor='primary'
                value={searchType}
                onChange={(_e, newVal) => {
                    if (newVal !== state.searchType) {
                        dispatch({ searchType: newVal })

                        history.push(
                            process.env.PUBLIC_URL +
                                (newVal === 'advanced' ? '/advanced' : '/'),
                        )
                    }
                }}
                aria-label='Search type'
            >
                <Tab
                    id={basicSearchTabId}
                    label='Basic'
                    value='basic'
                    aria-controls={basicSearchPanelId}
                />
                <Tab
                    id={advancedSearchTabId}
                    label='Advanced'
                    value='advanced'
                    aria-controls={advancedSearchPanelId}
                />
            </Tabs>
            <TabPanel
                id={basicSearchPanelId}
                active={searchType === 'basic'}
                labelledBy={basicSearchTabId}
            >
                <BasicSearch />
            </TabPanel>
            <TabPanel
                id={advancedSearchPanelId}
                active={searchType === 'advanced'}
                labelledBy={advancedSearchTabId}
            >
                <AdvancedSearch />
            </TabPanel>
        </form>
    )
}

export default SearchForm
