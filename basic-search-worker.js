/* eslint-disable no-restricted-globals */

// handle messages
self.onmessage = ({ data }) => {
    try {
        switch (data.type) {
            case 'SEARCH':
                const { query, entries, pinyinRegex } = data

                let splitter

                try {
                    // can't use regexp literal due to SyntaxError in non-supporting browsers
                    splitter = new RegExp('(?:\\p{P}|\\s|\\d)+', 'u')
                } catch (e) {
                    // for browsers that don't support unicode property escapes
                    splitter = /(?:[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]|\s|\d)+/
                }

                const queryWords = query
                    .toLowerCase()
                    .split(splitter)
                    .filter(Boolean)

                const propNames = ['def', 'simp', 'trad', 'pinyin']

                const _results = []

                entries.forEach(entry => {
                    let relevance = 0

                    if (pinyinRegex && pinyinRegex.test(entry.pinyin)) {
                        relevance += 1
                    }

                    propNames.forEach(prop => {
                        const normalized = entry[prop]
                            .toLowerCase()
                            .split(splitter)
                            .filter(Boolean)

                        if (
                            queryWords.every(word => normalized.includes(word))
                        ) {
                            relevance += 2

                            if (
                                queryWords.every(
                                    (word, idx) => word === normalized[idx],
                                )
                            ) {
                                relevance += 1

                                if (queryWords.length === normalized.length) {
                                    relevance += 1
                                }
                            }
                        }
                    })

                    if (relevance) {
                        _results.push({ entry, relevance })
                    }
                })

                const results = _results
                    .sort((a, b) => b.relevance - a.relevance)
                    .map(x => x.entry)

                self.postMessage({ type: 'SEARCH_RESULTS', results })

                break
            default:
                break
        }
    } catch (e) {
        self.postMessage({ type: 'ERROR', error: e })
    }
}
