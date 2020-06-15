const PAGE_TITLE = 'Zi Zi Bu Wang'
const DELIMITER = ' - '

const setTitle = (newTitle: string[] | null) => {
    const title = newTitle ? [...newTitle, PAGE_TITLE].join(DELIMITER) : null

    if (title) document.title = title
}

export { setTitle }
