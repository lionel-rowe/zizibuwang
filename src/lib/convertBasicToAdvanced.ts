const convertBasicToAdvanced = (query: string) => {
    // TODO

    const converted = ['simp', 'trad', 'pinyin', 'def']
        .map(p => `${p} has ${query}`)
        .join('\n')

    console.log(converted)

    return converted
}

export default convertBasicToAdvanced
