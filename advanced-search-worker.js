/* eslint-disable no-restricted-globals */

const methods = {
    is: ({ prop, arg }) => {
        return (entry) => entry[prop].toLowerCase() === arg.toLowerCase()
    },
    '!is': ({ prop, arg }) => {
        return (entry) => entry[prop].toLowerCase() !== arg.toLowerCase()
    },
    sis: ({ prop, arg }) => {
        return (entry) => entry[prop] === arg
    },
    '!sis': ({ prop, arg }) => {
        return (entry) => entry[prop] !== arg
    },
    contains: ({ prop, arg }) => {
        return (entry) => entry[prop].toLowerCase().includes(arg.toLowerCase())
    },
    '!contains': ({ prop, arg }) => {
        return (entry) => !entry[prop.toLowerCase()].includes(arg.toLowerCase())
    },
    scontains: ({ prop, arg }) => {
        return (entry) => entry[prop].includes(arg)
    },
    '!scontains': ({ prop, arg }) => {
        return (entry) => !entry[prop].includes(arg)
    },
    like: ({ prop, arg }) => {
        const regex = new RegExp(arg, 'iu')

        return (entry) => regex.test(entry[prop])
    },
    '!like': ({ prop, arg }) => {
        const regex = new RegExp(arg, 'iu')

        return (entry) => !regex.test(entry[prop])
    },
    slike: ({ prop, arg }) => {
        const regex = new RegExp(arg, 'u')

        return (entry) => regex.test(entry[prop])
    },
    '!slike': ({ prop, arg }) => {
        const regex = new RegExp(arg, 'u')

        return (entry) => !regex.test(entry[prop])
    },
    length: ({ prop, arg }) => {
        const len = +arg

        return (entry) => [...entry[prop]].length === len
    },
    minlength: ({ prop, arg }) => {
        const len = +arg

        return (entry) => [...entry[prop]].length >= len
    },
    maxlength: ({ prop, arg }) => {
        const len = +arg

        return (entry) => [...entry[prop]].length <= len
    },
    sameas: ({ prop: prop1, arg: prop2 }) => {
        return (entry) => entry[prop1] === entry[prop2]
    },
}

// aliases
methods['='] = methods['is']
methods['=='] = methods['is']
methods['==='] = methods['sis']
methods['!='] = methods['!is']
methods['<>'] = methods['!is']

methods['~'] = methods['like']
methods['=~'] = methods['like']
methods['!~'] = methods['!like']

methods['has'] = methods['contains']
methods['!has'] = methods['!contains']

// handle messages
self.onmessage = ({ data }) => {
    try {
        switch (data.type) {
            case 'SEARCH':
                const { conditions, entries } = data

                const propNames = Object.keys(entries[0] || {})
                const methodNames = Object.keys(methods)

                const tests = conditions.map(({ prop, method, arg }) => {
                    prop = prop.toLowerCase()
                    method = method.toLowerCase()

                    if (!propNames.includes(prop)) {
                        throw new Error(
                            `${prop} is not a valid subject. Allowed subjects: [${propNames.join(
                                ', ',
                            )}]`,
                        )
                    }

                    if (!methodNames.includes(method)) {
                        throw new Error(
                            `${method} is not a valid verb. Allowed verbs: [${methodNames.join(
                                ', ',
                            )}]`,
                        )
                    }

                    return methods[method]({ prop, arg })
                })

                const testSuite = (entry) => tests.every((test) => test(entry))

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
