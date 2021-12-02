import snarkdown from 'snarkdown'

const slugify = (str: string) =>
    str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, ' ')
        .trim()
        .replace(/\s+/g, '-')

export const snarkdownEnhanced = (md: string) => {
    const html = md
        .split(/((?<=^|\n)```\r?\n[\s\S]*\r?\n```)/)
        .map((m, i) =>
            i % 2
                ? `<pre><code>${m
                      .split(/\r?\n/)
                      .slice(1, -1)
                      .join('\n')}</pre></code>`
                : m
                      .split(/(?:\r?\n){2,}/)
                      .map((l) =>
                          [' ', '\t', '#', '-', '*', '`', '~'].some((ch) =>
                              l.startsWith(ch),
                          )
                              ? snarkdown(l)
                              : `<p>${snarkdown(l)}</p>`,
                      )
                      .join(''),
        )
        .join('')

    const template = document.createElement('template')

    template.innerHTML = html

    const headings = template.content.querySelectorAll('h2, h3, h4, h5, h6')

    headings.forEach((heading) => {
        if (heading.textContent) {
            heading.id = slugify(heading.textContent)
            heading.classList.add('anchored')
        }
    })

    return template.innerHTML
}
