import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import Link from '../components/Link'

import contentMdUrl from '../content/instructions.md'
import { encodeB64UrlSafe } from '../lib/b64'
import snarkdownPlus from '../lib/snarkdownPlus'

interface Sample {
    title: string
    query: string
}

const contentPromise = (async () => {
    const res = await fetch(contentMdUrl, { cache: 'force-cache' })
    const text = await res.text()

    const [_instructions, _sampleBlock] = text.split('## Samples')

    const _samples = _sampleBlock
        .replace(/^```.*/gm, '')
        .trim()
        .split(/\r?\n---\r?\n/)
        .map(el => el.trim())
        .map(el => {
            const lines = el.split('\n')
            const title = lines
                .filter(l => l.startsWith('#'))
                .map(l => l.replace(/^#\s*/, ''))
                .join('\n')

            const query = lines
                .filter(l => !l.startsWith('#') && !/^\s*$/.test(l))
                .join('\n')

            return { title, query }
        })

    return { _samples, _instructions }
})()

const DocsPage: React.FC<RouteComponentProps> = () => {
    const [instructions, setInstructions] = useState('')
    const [samples, setSamples] = useState<Sample[]>([])

    useEffect(() => {
        ;(async () => {
            const { _samples, _instructions } = await contentPromise

            setSamples(_samples)

            setInstructions(snarkdownPlus(_instructions))
        })()
    }, [])

    return (
        <>
            <div dangerouslySetInnerHTML={{ __html: instructions }} />
            <ul>
                {samples.map(({ title, query }) => {
                    const queryString = `?q=${encodeB64UrlSafe(
                        `# ${title}\n\n${query}`,
                    )}`

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
