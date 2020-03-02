const parseTsv = (tsv: string) => {
    const lines = tsv.trim().split(/\r?\n/)

    return lines.map(line => {
        const cells = line.split('\t').map(cell => cell.trim())

        return cells
    })
}

const rowHeadingsToProps = (rows: string[][]) => {
    const [headers, ...entries] = rows

    return entries.map(e => {
        const obj: { [key: string]: string } = {}

        headers.forEach((h, i) => (obj[h] = e[i]))

        return obj
    })
}

export { parseTsv, rowHeadingsToProps }
