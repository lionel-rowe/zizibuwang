import React from 'react'
import { RouteComponentProps } from '@reach/router'
import Link from '../components/Link'

import content from '../content/instructions'
import { encodeB64UrlSafe } from '../lib/b64'

const { samples, instructions } = content

const DocsPage: React.FC<RouteComponentProps> = () => {
    return (
        <>
            <div dangerouslySetInnerHTML={{ __html: instructions }} />
            <ul>
                {samples.map(({ title, query }) => {
                    const queryString = `?q=${encodeB64UrlSafe(`# ${title}\n\n${query}`)}`

                    return (
                        <li key={title}>
                            <Link to={`/advanced/${queryString}`}>{title}</Link>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default DocsPage
