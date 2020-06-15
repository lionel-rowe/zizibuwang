// @ts-nocheck

// GENERIC FUNCTIONS

// replicateM n act performs the action n times, gathering the results.
// replicateM :: (Applicative m) => Int -> m a -> m [a]
const replicateM = (n, f) => {
    const loop = x => (x <= 0 ? [[]] : liftA2(cons, f, loop(x - 1)))
    return loop(n)
}

// Lift a binary function to actions.
// liftA2 :: Applicative f => (a -> b -> c) -> f a -> f b -> f c
const liftA2 = (f, a, b) => listApply(a.map(curry(f)), b)

// <*>
// listApply :: [(a -> b)] -> [a] -> [b]
const listApply = (fs, xs) =>
    [].concat.apply(
        [],
        fs.map(f =>
            [].concat.apply(
                [],
                xs.map(x => [f(x)]),
            ),
        ),
    )

// curry :: ((a, b) -> c) -> a -> b -> c
const curry = f => a => b => f(a, b)

// cons :: a -> [a] -> [a]
const cons = (x, xs) => [x].concat(xs)

export const orderedPermute = <T>(arrArr: T[][]): T[][] => {
    const len = Math.min(...arrArr.map(x => x.length))

    const arrIdxs = new Array(arrArr.length).fill(null).map((_, idx) => idx)

    return replicateM(len, arrIdxs).map(currArrIdxs =>
        currArrIdxs.map((arrIdx, idx) => arrArr[arrIdx][idx]),
    )
}
