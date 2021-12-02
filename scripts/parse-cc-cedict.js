const fs = require('fs')
const path = require('path')

const matcher = /^(?<trad>.+) (?<simp>.+) \[(?<pinyin>.+)\] \/(?<def>.*)\/$/

const txt = fs.readFileSync(
    path.join(__dirname, '../data/cedict_ts.u8'),
    'utf-8',
)

const parseCcCedict = () => {
    const lines = txt
        .split(/\r?\n/)
        .filter((line) => line && line.trim() && !line.trim().startsWith('#'))
        .map((line) => line.trim())

    const words = []

    lines.forEach((line) => {
        const matches = line.match(matcher)

        if (!matches) {
            console.error(line)
        } else {
            const entry = { ...matches.groups }

            if (entry.pinyin.includes('u:')) {
                entry.pinyin = entry.pinyin.replace(/u:/g, 'v')
            }

            if (entry.def.includes('[')) {
                entry.def = entry.def.replace(/\[[^\]]*u:[^\]]*\]/g, (m) =>
                    m.replace(/u:/g, 'v'),
                )
            }

            words.push(entry)
        }
    })

    return words
        .sort((a, b) => {
            return a.pinyin.localeCompare(b.pinyin)
        })
        .map(
            (entry) =>
                `${entry.trad}\t${entry.simp}\t${entry.pinyin}\t${entry.def}`,
        )
        .join('\n')
}

const header = ['trad', 'simp', 'pinyin', 'def'].join('\t')

const out = [header, parseCcCedict()].join('\n')

console.info('lines', out.split('\n').length)
console.info('cells', out.split(/[\n\t]/).length)
console.info('Bytes in', Buffer.byteLength(txt, 'utf8'))
console.info('Bytes out', Buffer.byteLength(out, 'utf8'))

fs.writeFileSync(path.join(__dirname, '../src/assets/cc-cedict.tsv'), out)
