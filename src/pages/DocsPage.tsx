import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Link from '../components/Link'

import contentMdUrl from '../content/instructions.md'
import { snarkdownEnhanced } from '../lib/snarkdownEnhanced'
import { setTitle } from '../lib/setTitle'

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

const DocsPage: React.FC<{ title: string }> = ({ title }) => {
    setTitle(title)

    const [instructions, setInstructions] = useState('')
    const [samples, setSamples] = useState<Sample[]>([])

    const history = useHistory()

    useEffect(() => {
        ;(async () => {
            const { _samples, _instructions } = await contentPromise

            setSamples(_samples)

            setInstructions(snarkdownEnhanced(_instructions))

            if (instructions && window.location.hash) {
                document
                    .querySelector(window.location.hash)
                    ?.scrollIntoView(true)
            }
        })()
    }, [instructions])

    return (
        <>
            <div
                dangerouslySetInnerHTML={{ __html: instructions }}
                onClick={e => {
                    const target = e.target as HTMLAnchorElement
                    const href = target.getAttribute('href')

                    if (target.nodeName === 'A' && href) {
                        e.preventDefault()

                        if (
                            href.startsWith('http') &&
                            !href.startsWith(window.location.origin)
                        ) {
                            window.open(href, '_blank', 'noopener noreferrer')
                        } else {
                            history.push(href)
                        }
                    } else if (/^H[2-6]$/.test(target.nodeName)) {
                        window.location.hash = target.id
                        target.scrollIntoView(true)
                    }
                }}
            />
            <ul>
                {samples.map(({ title, query }) => {
                    const queryString = `?q=${encodeURIComponent(
                        `# ${title}\n\n${query}`,
                    )}`.replace(/%20/g, '+')

                    return (
                        <li key={title}>
                            <Link to={`/search/advanced/${queryString}`}>
                                {title}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default DocsPage
