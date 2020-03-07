import { useState } from "react"

let idx = 0

const useHtmlId = (prefix = 'id') => {
    idx++

    return useState(`${prefix}-${idx}`)[0]
}

export default useHtmlId
