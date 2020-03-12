/* eslint-disable no-restricted-globals */

// handle messages
self.onmessage = ({ data }) => {
    try {
        switch (data.type) {
            case 'SEARCH':
                const { query, entries } = data

                let splitter

                try {
                    // can't use regexp literal due to SyntaxError in non-supporting browsers
                    splitter = new RegExp('(?:\\p{P}|\\s|\\d)+', 'u')
                } catch (e) {
                    // for browsers that don't support unicode property escapes
                    splitter = /(?:[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]|\s|\d)+/
                }

                const queryWords = query
                    .split(splitter)
                    .filter(Boolean)
                    .map(w => w.toLowerCase())

                const propNames = Object.keys(entries[0] || {})

                const results = entries.filter(entry => {
                    return queryWords.every(word => {
                        return propNames.some(prop => {
                            return entry[prop]
                                .toLowerCase()
                                .split(splitter)
                                .includes(word)
                        })
                    })
                })

                self.postMessage({ type: 'SEARCH_RESULTS', results })

                break
            default:
                break
        }
    } catch (e) {
        self.postMessage({ type: 'ERROR', error: e })
    }
}
