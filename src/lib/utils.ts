export function xor(...args: boolean[]) {
	return args.reduce((acc, cur) => acc + Number(cur), 0) === 1
}
