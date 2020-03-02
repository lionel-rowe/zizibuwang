import React from 'react'
import { prettify } from '../lib/pinyinize'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: { marginBottom: '2em' },
    charGloss: { display: 'flex', flexWrap: 'wrap' },
    rubyRoot: { fontSize: '2.5em', paddingRight: '0.2em' },
    defList: { paddingLeft: '1.2em', margin: '0.5em 0' },
    headwordNoRuby: { fontSize: '2.5em' },
}))

const charTypeSelected: 'simp' | 'trad' = 'simp'

const Result: React.FC<{
    entry: CedictEntry
    index: number
    isLast: boolean
}> = ({ entry, index, isLast }) => {
    const classes = useStyles()

    const { pinyin, def } = entry

const currentCharVersion = entry[charTypeSelected]

    const chars = Array.from(currentCharVersion)
    const oppCharTypeName = charTypeSelected === 'simp' ? 'trad' : 'simp'
    const oppCharVersion = entry[oppCharTypeName]

    const pinyinSyls: (string | null)[] = pinyin
        .split(' ')
        .map(py => prettify(py))

    let renderRuby = false

    if (chars.length !== pinyinSyls.length) {
        process.env.NODE_ENV === 'development' && console.log(entry)
    } else {
        chars.forEach((char, idx) => {
            const py = pinyinSyls[idx]
            if (py === 'xx') {
                pinyinSyls[idx] = null
            } else if (py === char) {
               // noop
            } else {
                renderRuby = true
            }
        })
    }

    return (
        <div className={classes.root} style={isLast ? { marginBottom: 0 } : {}}>
            <div className={classes.charGloss}>
                {chars.map((char, idx) => {
                    if (!renderRuby) {
                        return (
                            <span className={classes.headwordNoRuby}>
                                {char}
                            </span>
                        )
                    }

                    return (
                        <ruby key={idx} className={classes.rubyRoot}>
                            {char}
                            <rp>(</rp>
                            <rt>{pinyinSyls[idx] || '\xa0'}</rt>
                            <rp>)</rp>
                        </ruby>
                    )
                })}
            </div>
            {oppCharVersion !== currentCharVersion && (
                <div>
                    {oppCharTypeName[0].toUpperCase() +
                        oppCharTypeName.slice(1)}
                    : {oppCharVersion}
                </div>
            )}
            <div>
                <ul className={classes.defList}>
                    {def.split(/\s*[/;]\s*/).map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Result

// {
//     ;`${index}. ${chars} [${prettify(pinyin)}]\n${
// }
