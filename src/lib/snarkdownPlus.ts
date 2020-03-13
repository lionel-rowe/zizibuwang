import snarkdown from 'snarkdown'

const snarkdownPlus = (md: string) => {
    const paras = md
        .split(/(?:\r?\n){2,}/)
        .map(l =>
            l.startsWith('#') || /^\s+$/.test(l)
                ? snarkdown(l)
                : `<p>${snarkdown(l)}</p>`,
        )

    return paras.join('\n\n')
}

export default snarkdownPlus
