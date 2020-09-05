export const xor = (...args: boolean[]) =>
    args.reduce((acc, cur) => acc + Number(cur), 0) === 1
