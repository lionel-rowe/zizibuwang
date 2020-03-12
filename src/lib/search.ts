import config from '../config'

const { MAX_TIMEOUT } = config

const _basicSearch = async (
    query: string,
    data: any /* TODO */,
): Promise<{ results?: CedictEntry[]; error?: Error }> => {
    let error, results

    const searchWorker = new Worker(
        `${process.env.PUBLIC_URL}/basic-search-worker.js`,
    )

    searchWorker.postMessage({
        type: 'SEARCH',
        query,
        entries: data,
    })

    try {
        if (/^\s*$/.test(query)) {
            throw new RangeError('Please enter some search terms.')
        }

        results = await new Promise<CedictEntry[]>((resolve, reject) => {
            searchWorker.onmessage = ({ data }) => {
                if (data.type === 'ERROR') {
                    reject(data.error)
                }

                searchWorker.terminate()

                resolve(data.results)
            }

            setTimeout(() => {
                searchWorker.terminate()

                reject('Timeout exceeded')
            }, MAX_TIMEOUT)
        })
    } catch (e) {
        error = e
    }

    return { results, error }
}

const _advancedSearch = async (
    query: string,
    data: any /* TODO */,
): Promise<{ results?: CedictEntry[]; error?: Error }> => {
    let error, results

    try {
        let conditions: SearchCondition[]

        const lines = query
            .split(/\r?\n/)
            .map(el => el.trim())
            .filter(el => el && !el.startsWith('#'))

        if (lines.length === 1 && lines[0] === '*') {
            conditions = []
        } else if (lines.length === 0) {
            throw new RangeError('Must have at last one condition.')
        } else {
            conditions = lines.map(toCondition)
        }

        const searchWorker = new Worker(
            `${process.env.PUBLIC_URL}/advanced-search-worker.js`,
        )

        searchWorker.postMessage({
            type: 'SEARCH',
            conditions,
            entries: data,
        })

        results = await new Promise<CedictEntry[]>((resolve, reject) => {
            searchWorker.onmessage = ({ data }) => {
                if (data.type === 'ERROR') {
                    reject(data.error)
                }

                searchWorker.terminate()

                resolve(data.results)
            }

            setTimeout(() => {
                searchWorker.terminate()

                reject('Timeout exceeded')
            }, MAX_TIMEOUT)
        })
    } catch (e) {
        error = e
    }

    return { results, error }
}

function toCondition(clause: string): SearchCondition {
    const matcher = /^(?<prop>\S+)\s+(?<method>\S+)\s+(?<arg>.+)$/

    const matches = clause.match(matcher)

    if (!matches) {
        throw new SyntaxError(
            'Each condition must be formatted as "subject verb object".',
        )
    }

    return { ...((matches.groups as any) as SearchCondition) }
}

const withTimeLogging = (fn: (...args: any) => any) => {
    if (process.env.NODE_ENV !== 'development') {
        return fn
    }

    return async (...args: any) => {
        console.time(fn.name)

        const val = await fn(...args)

        console.timeEnd(fn.name)

        return val
    }
}

const [basicSearch, advancedSearch] = [_basicSearch, _advancedSearch].map(withTimeLogging)

export { basicSearch, advancedSearch }
