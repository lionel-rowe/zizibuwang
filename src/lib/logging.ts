let _idx = 0

const getTimeNowMs = () => new Date().valueOf()

const getTimeElapsedMs = (prevTimeMs: number) => getTimeNowMs() - prevTimeMs

enum Result {
    Error,
    Success,
}

enum Synchronicity {
    Sync,
    Async,
}

const withTimeLogging = <T>(fn: T & Function): T => {
    if (process.env.NODE_ENV !== 'development') {
        return fn
    }

    return (((...args: any) => {
        const idx = _idx++
        const name = fn.name || '[anonymous]'
        const startTime = getTimeNowMs()

        const logTimeElapsed = (
            synchronicity: Synchronicity,
            result: Result,
        ) => {
            const isSuccess = result === Result.Success
            const isAsync = synchronicity === Synchronicity.Async
            const method = isSuccess ? 'info' : 'error'

            console[method](
                `[${idx}] ${isAsync ? 'Async function' : 'Function'} ${name} ${
                    isSuccess ? 'completed' : 'errored'
                } in ${getTimeElapsedMs(startTime)}\xa0ms`,
            )
        }

        try {
            const val = fn(...args)

            if (val instanceof Promise) {
                return val
                    .catch(e => {
                        logTimeElapsed(Synchronicity.Async, Result.Error)

                        throw e
                    })
                    .then(val2 => {
                        logTimeElapsed(Synchronicity.Async, Result.Success)

                        return val2
                    })
            } else {
                logTimeElapsed(Synchronicity.Sync, Result.Success)

                return val
            }
        } catch (e) {
            logTimeElapsed(Synchronicity.Sync, Result.Error)

            throw e
        }
    }) as any) as T
}

if (process.env.NODE_ENV === 'development') {
    ;(window as any).withTimeLogging = withTimeLogging
}

export { withTimeLogging }
