// @ts-nocheck

// GENERIC FUNCTIONS

// replicateM n act performs the action n times, gathering the results.
// replicateM :: (Applicative m) => Int -> m a -> m [a]
function replicateM(n, f) {
	const loop = (x) => (x <= 0 ? [[]] : liftA2(cons, f, loop(x - 1)))

	return loop(n)
}

// Lift a binary function to actions.
// liftA2 :: Applicative f => (a -> b -> c) -> f a -> f b -> f c
function liftA2(f, a, b) {
	return listApply(a.map((x) => new Curry(f).apply(x)), b)
}

// <*>
// listApply :: [(a -> b)] -> [a] -> [b]
function listApply(fs, xs) {
	return [].concat.apply(
		[],
		fs.map((f) =>
			[].concat.apply(
				[],
				xs.map((x) => [f(x)]),
			)
		),
	)
}

// Curry :: ((a, b) -> c) -> a -> b -> c
class Curry {
	constructor(private f) {}

	apply(a) {
		return (b) => this.f(a, b)
	}
}

// cons :: a -> [a] -> [a]
function cons(x, xs) {
	return [x].concat(xs)
}

export function orderedPermute<T>(arrArr: T[][]): T[][] {
	const len = Math.min(...arrArr.map((x) => x.length))

	const arrIdxs = new Array(arrArr.length).fill(null).map((_, idx) => idx)

	return replicateM(len, arrIdxs).map((currArrIdxs) => currArrIdxs.map((arrIdx, idx) => arrArr[arrIdx][idx]))
}
