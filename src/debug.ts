import { deleteDB, openDB } from 'idb'
import { prettify } from './lib/pinyinize.ts'
import { Cedict, db, seedDb } from './repositories/cedict.ts'

export function exposeDebugVars() {
	const _window = window as any

	Cedict.all.then((x) => (_window.cedict = x))
	_window.prettify = prettify

	if (process.env.NODE_ENV === 'development') {
		_window.deleteDB = deleteDB
		_window.openDB = openDB
		_window.seedDb = seedDb
		_window.db = db
	}
}
