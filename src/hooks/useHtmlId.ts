import { useState } from 'react'

let idx = 0

const useHtmlId = (prefix = 'id') => {
    const [htmlId /* , setHtmlId */] = useState(`${prefix}-${++idx}`)

    return htmlId
}

export { useHtmlId }
