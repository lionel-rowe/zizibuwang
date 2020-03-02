import ZhiMangXing from '../assets/ZhiMangXing-Regular-subset.ttf'

const styles = document.createElement('style')

styles.innerHTML = `
    @font-face {
        font-family: 'ZhiMangXing';
        src: url(${ZhiMangXing});
    }
`

document.head.appendChild(styles)
