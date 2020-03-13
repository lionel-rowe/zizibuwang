let idx = 0

const withTimeLogging = <T>(fn: T & Function): T => {
    if (process.env.NODE_ENV !== 'development') {
        return fn
    }

    return (((...args: any) => {
        const timerName = `[${idx++}] ${fn.name}`

        console.time(timerName)

        let val

        try {
            val = fn(...args)

            if (val instanceof Promise) {
                return val
                    .catch(e => {
                        console.timeEnd(timerName)

                        throw e
                    })
                    .then(val2 => {
                        console.timeEnd(timerName)

                        return val2
                    })
            } else {
                console.log(1)
                console.timeEnd(timerName)

                return val
            }
        } catch (e) {
            console.timeEnd(timerName)

            throw e
        }
    }) as any) as T
}

if (process.env.NODE_ENV === 'development') {
    ;(window as any).withTimeLogging = withTimeLogging
}

export { withTimeLogging }
