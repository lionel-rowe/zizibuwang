/* eslint-disable no-restricted-globals */

const methods = {
    is: ({ prop, arg }) => {
        return entry => entry[prop] === arg
    },
    '!is': ({ prop, arg }) => {
        return entry => entry[prop] !== arg
    },
    iis: ({ prop, arg }) => {
        const argLower = arg.toLowerCase()

        return entry => entry[prop].toLowerCase() === argLower
    },
    contains: ({ prop, arg }) => {
        return entry => entry[prop].includes(arg)
    },
    '!contains': ({ prop, arg }) => {
        return entry => !entry[prop].includes(arg)
    },
    icontains: ({ prop, arg }) => {
        const argLower = arg.toLowerCase()

        return entry => entry[prop].toLowerCase().includes(argLower)
    },
    match: ({ prop, arg }) => {
        const regex = new RegExp(arg, 'u')

        return entry => regex.test(entry[prop])
    },
    '!match': ({ prop, arg }) => {
        const regex = new RegExp(arg, 'u')

        return entry => !regex.test(entry[prop])
    },
    imatch: ({ prop, arg }) => {
        const regex = new RegExp(arg, 'iu')

        return entry => regex.test(entry[prop])
    },
    length: ({ prop, arg }) => {
        const len = +arg

        return entry => [...entry[prop]].length === len
    },
    minlength: ({ prop, arg }) => {
        const len = +arg

        return entry => [...entry[prop]].length >= len
    },
    maxlength: ({ prop, arg }) => {
        const len = +arg

        return entry => [...entry[prop]].length <= len
    },
    sameas: ({ prop: prop1, arg: prop2 }) => {
        return entry => entry[prop1] === entry[prop2]
    },
}

// aliases
methods['='] = methods['is']
methods['=='] = methods['is']
methods['i='] = methods['iis']
methods['!='] = methods['!is']

methods['~'] = methods['match']
methods['i~'] = methods['imatch']
methods['!~'] = methods['!match']

methods['has'] = methods['contains']
methods['ihas'] = methods['icontains']
methods['!has'] = methods['!contains']

// handle messages
self.onmessage = ({ data }) => {
    try {
        switch (data.type) {
            case 'SEARCH':
                const { conditions, entries, logicalOr = false } = data

                const propNames = Object.keys(entries[0] || {})
                const methodNames = Object.keys(methods)

                const tests = conditions.map(({ prop, method, arg }) => {
                    prop = prop.toLowerCase()
                    method = method.toLowerCase()

                    if (!propNames.includes(prop)) {
                        throw new Error(
                            `${prop} is not a subject. Allowed subjects: [${propNames.join(
                                ', ',
                            )}]`,
                        )
                    }

                    if (!methodNames.includes(method)) {
                        throw new Error(
                            `${method} is not a verb. Allowed verbs: [${methodNames.join(
                                ', ',
                            )}]`,
                        )
                    }

                    return methods[method]({ prop, arg })
                })

                const testSuite = entry => tests[logicalOr ? 'some' : 'every'](test => test(entry))

                const results = entries.filter(testSuite)

                self.postMessage({ type: 'SEARCH_RESULTS', results })

                break
            default:
                break
        }
    } catch (e) {
        self.postMessage({ type: 'ERROR', error: e })
    }
}
