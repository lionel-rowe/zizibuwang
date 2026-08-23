let _idx = 0

function getTimeNowMs() {
	return new Date().valueOf()
}

function getTimeElapsedMs(prevTimeMs: number) {
	return getTimeNowMs() - prevTimeMs
}

enum Result {
	Error,
	Success,
}

enum Synchronicity {
	Sync,
	Async,
}

class TimeLogger<T extends Function> {
	constructor(private fn: T) {}

	run = (...args: any) => {
		const idx = _idx++
		const name = this.fn.name || '[anonymous]'
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
			const val = this.fn(...args)

			if (val instanceof Promise) {
				return val
					.catch((e) => {
						logTimeElapsed(Synchronicity.Async, Result.Error)

						throw e
					})
					.then((val2) => {
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
	}
}

function withTimeLogging<T>(fn: T & Function): T {
	if (process.env.NODE_ENV !== 'development') {
		return fn
	}

	return new TimeLogger(fn).run as any as T
}

if (process.env.NODE_ENV === 'development') {
	;(window as any).withTimeLogging = withTimeLogging
}

export { withTimeLogging }
