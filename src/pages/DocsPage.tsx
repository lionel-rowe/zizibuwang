import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { setB64QueryParam } from '../lib/query-param-helper'
import Link from '../components/Link'

import content from '../content/instructions'

const { samples, instructions } = content

const DocsPage: React.FC<RouteComponentProps> = () => {
    return (
        <>
            <div dangerouslySetInnerHTML={{ __html: instructions }} />
            <ul>
                {samples.map(({ title, query }) => {
                    const url = new URL(
                        process.env.PUBLIC_URL,
                        window.location.origin,
                    )

                    setB64QueryParam('q', `# ${title}\n\n${query}`, url)

                    const queryString = url.search

                    return (
                        <li key={title}>
                            <Link to={`/${queryString}`}>{title}</Link>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default DocsPage
