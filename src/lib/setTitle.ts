import { PAGE_TITLE, TITLE_DELIMITER } from '../config'

const setTitle = (newTitle: string | string[]) => {
    const titleSegments = typeof newTitle === 'string' ? [newTitle] : newTitle

    const title = [...titleSegments, PAGE_TITLE].join(TITLE_DELIMITER)

    document.title = title
}

export { setTitle }
