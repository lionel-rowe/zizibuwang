import { MAX_TIMEOUT } from '../config'
import { withTimeLogging } from './logging'

import { pinyinToPartsMappingPromise } from './pinyinToPartsMapping'
import { makeRegexWith, FuzzyReplacementId } from './makeRegex'
import { isPinyinish, segmentPinyin } from './segmentPinyin'
import { normalizeQuery } from './formatters'

const _basicSearch = async (
    query: string,
    data: any /* TODO */,
    enabledFuzzyReplacementIds: FuzzyReplacementId[],
): Promise<{ results?: CedictEntry[] }> => {
    query = normalizeQuery(query)

    let results

    const pinyinToPartsMapping = await pinyinToPartsMappingPromise

    const pinyinRegex = makeRegexWith(
        pinyinToPartsMapping,
        enabledFuzzyReplacementIds,
    )(query)

    const searchWorker = new Worker(
        `${process.env.PUBLIC_URL}/basic-search-worker.js`,
    )

    const pinyinSyls = isPinyinish(query) ? segmentPinyin(true)(query) : []

    searchWorker.postMessage({
        type: 'SEARCH',
        query,
        pinyinRegex,
        entries: data,
        pinyinSyls,
    })

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

            reject(new RangeError('Timeout exceeded.'))
        }, MAX_TIMEOUT)
    })

    return { results }
}

const _advancedSearch = async (
    query: string,
    data: any /* TODO */,
): Promise<{ results?: CedictEntry[] }> => {
    query = normalizeQuery(query)

    let results

    let conditions: SearchCondition[]

    const lines = query
        .split(/\r?\n/)
        .map(el => el.trim())
        .filter(el => el && !el.startsWith('#'))

    if (lines.length === 0) {
        throw new RangeError('Must have at least one condition.')
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

            reject(new RangeError('Timeout exceeded.'))
        }, MAX_TIMEOUT)
    })

    return { results }
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

const [basicSearch, advancedSearch] = [_basicSearch, _advancedSearch].map(
    withTimeLogging,
)

export { basicSearch, advancedSearch }
