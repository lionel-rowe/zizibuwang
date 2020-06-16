import snarkdown from 'snarkdown'

const slugify = (str: string) =>
    str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, ' ')
        .trim()
        .replace(/\s+/g, '-')

export const snarkdownEnhanced = (md: string) => {
    const htmls = md
        .split(/(?:\r?\n){2,}/)
        .map(l =>
            [' ', '\t', '#', '-', '*'].some(ch => l.startsWith(ch))
                ? snarkdown(l)
                : `<p>${snarkdown(l)}</p>`,
        )

    const template = document.createElement('template')

    template.innerHTML = htmls.join('\n\n')

    const headings = template.content.querySelectorAll('h1, h2, h3, h4, h5, h6')

    headings.forEach(heading => {
        if (heading.textContent) {
            heading.id = slugify(heading.textContent)
        }
    })

    return template.innerHTML
}
