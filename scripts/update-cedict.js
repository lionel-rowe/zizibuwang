const fs = require('fs')
const path = require('path')
const zlib = require('zlib')
const https = require('https')
const { execFileSync } = require('child_process')

const CEDICT_URL = 'https://www.mdbg.net/chinese/export/cedict/cedict_1_0_ts_utf-8_mdbg.txt.gz'
const outPath = path.join(__dirname, '../data/cedict_ts.u8')

const download = (url) =>
	new Promise((resolve, reject) => {
		https
			.get(url, { headers: { 'User-Agent': 'zizibuwang-cedict-updater' } }, (res) => {
				if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
					resolve(download(res.headers.location))
					return
				}

				if (res.statusCode !== 200) {
					reject(new Error(`Request failed with status ${res.statusCode}`))
					return
				}

				const chunks = []
				res.on('data', (chunk) => chunks.push(chunk))
				res.on('end', () => resolve(Buffer.concat(chunks)))
				res.on('error', reject)
			})
			.on('error', reject)
	})

const main = async () => {
	console.info('Downloading', CEDICT_URL)
	const gzipped = await download(CEDICT_URL)

	console.info('Decompressing')
	const txt = zlib.gunzipSync(gzipped)

	fs.writeFileSync(outPath, txt)
	console.info('Wrote', outPath, `(${txt.length} bytes)`)

	console.info('Parsing CC-CEDICT')
	execFileSync('node', [path.join(__dirname, 'parse-cc-cedict.js')], { stdio: 'inherit' })

	console.info('Bumping db version')
	execFileSync('node', [path.join(__dirname, 'db-bump.js')], { stdio: 'inherit' })
}

main().catch((err) => {
	console.error(err)
	process.exit(1)
})
