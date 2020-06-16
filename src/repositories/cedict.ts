import { parseTsv, rowHeadingsToProps } from '../lib/parse-tsv'
import { DB_NAME, CEDICT_TABLE_NAME, DB_VERSION } from '../config'
import { openDB, deleteDB, IDBPDatabase } from 'idb'

import cedictUrl from '../assets/cc-cedict.tsv'
import { NoDataError } from '../lib/errors'
import fireModal from '../lib/fireModal'

import HelpOutlineIcon from '@material-ui/icons/HelpOutline'

const DB_REQUIRES_SEEDING = 'dbRequiresSeeding'
const CEDICT_TSV_ETAG = 'cedictTsvEtag'

const seedDb = async (db: IDBPDatabase) => {
    const connection = (navigator as any).connection || {}

    if (
        process.env.NODE_ENV === 'development' || // debug
        connection.saveData ||
        connection.type === 'cellular'
    ) {
        const head = await fetch(cedictUrl, {
            method: 'HEAD',
        })

        const contentLength = head.headers.get('content-length')

        const title = contentLength
            ? `Download ${(+contentLength / 1000 / 1000).toFixed(1)}\xa0MB?`
            : 'Download data?'

        const userConfirmed = await fireModal({
            showCancelButton: true,
            confirmButtonText: 'Download',
            title,
            text:
                'This is required the first time you run this app. Consider switching to a Wi-Fi connection.',
            icon: HelpOutlineIcon,
        })

        if (!userConfirmed) {
            // TODO - show app load fail state

            throw new NoDataError('User declined to download data.')
        }
    }

    const res = await fetch(cedictUrl)
    const text = await res.text()

    const rows = parseTsv(text)
    const entries = rowHeadingsToProps(rows)

    const tx = db.transaction(CEDICT_TABLE_NAME, 'readwrite')
    const store = tx.objectStore(CEDICT_TABLE_NAME)

    store.put(entries, 'entries')

    localStorage.removeItem(DB_REQUIRES_SEEDING)
    localStorage.setItem(CEDICT_TSV_ETAG, res.headers.get('etag') || 'unknown')

    return
}

const db = new Promise<IDBPDatabase>(async (resolve, reject) => {
    const _db = await openDB(DB_NAME, DB_VERSION, {
        upgrade(db, oldVersion, _newVersion, transaction) {
            if (!oldVersion) {
                db.createObjectStore(CEDICT_TABLE_NAME)
            }

            if (oldVersion < 1582933903995) {
                localStorage.clear()

                const store = transaction.objectStore(CEDICT_TABLE_NAME)

                store.clear()

                localStorage.setItem(DB_REQUIRES_SEEDING, 'yes')
            }
        },
    })

    const tx = _db.transaction(CEDICT_TABLE_NAME)
    const store = tx.objectStore(CEDICT_TABLE_NAME)

    const entriesExist = await store.getKey('entries')

    if (!entriesExist || localStorage.getItem(DB_REQUIRES_SEEDING)) {
        try {
            await seedDb(_db)
        } catch (e) {
            console.error(e)

            reject(e)
        }
    }

    resolve(_db)
})

const Cedict = {
    all: new Promise<CedictEntry[]>(async (resolve, reject) => {
        try {
            const _db = await db

            const tx = _db.transaction(CEDICT_TABLE_NAME)
            const store = tx.objectStore(CEDICT_TABLE_NAME)

            const entries = await store.get('entries')

            resolve(entries)
        } catch (e) {
            console.error(e)

            reject(e)
        }
    }),
}

if (process.env.NODE_ENV === 'development') {
    // debug

    const _window = window as any

    _window.deleteDB = deleteDB
    _window.openDB = openDB
    _window.seedDb = seedDb
    _window.Cedict = Cedict
    _window.db = db
}

export default Cedict
