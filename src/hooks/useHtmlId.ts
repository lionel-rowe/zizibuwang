import { useState } from 'react'

let idx = 0

function useHtmlId(prefix = 'id') {
	const [htmlId /* , setHtmlId */] = useState(`${prefix}-${++idx}`)

	return htmlId
}

export { useHtmlId }
