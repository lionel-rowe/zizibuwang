import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

interface StaticAnalyticsProps {
    _version: '1'
    correlationId: string
}

type EventType = 'route' | 'load' | 'unload'

type Analytics = StaticAnalyticsProps & {
    event: EventType
}

const analyticsUrl = `${process.env.REACT_APP__API_URL}/analytics`

const correlationId = sessionStorage.getItem('correlationId') ?? uuidv4()
sessionStorage.setItem('correlationId', correlationId)

const _version = '1'

const staticProps: StaticAnalyticsProps = {
    _version,
    correlationId,
}

const createLog = (event: EventType) => {
    const msg: Analytics = { ...staticProps, event }

    return JSON.stringify(msg)
}

const onUnload = (_e: Event) => {
    if (process.env.NODE_ENV !== 'production') return

    navigator.sendBeacon(analyticsUrl, createLog('unload'))
}

let prevPathAndQuery: string | null = null

const RouteAnalytics: React.FC = () => {
    const history = useHistory()

    useEffect(() => {
        if (process.env.NODE_ENV !== 'production') return

        fetch(analyticsUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: createLog('load'),
        })

        window.onbeforeunload = onUnload

        return () => {
            window.removeEventListener('beforeunload', onUnload)
        }
    }, [])

    history.listen(({ pathname, search }) => {
        if (process.env.NODE_ENV !== 'production') return

        const thisPathAndQuery = pathname + search

        if (thisPathAndQuery === prevPathAndQuery) return

        prevPathAndQuery = thisPathAndQuery

        fetch(analyticsUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: createLog('route'),
        })
    })

    return null
}

export default RouteAnalytics
