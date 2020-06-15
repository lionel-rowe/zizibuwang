import ZhiMangXing from '../assets/ZhiMangXing-Regular-subset.ttf'

const styles = document.createElement('style')

styles.innerHTML = `
    @font-face {
        font-family: 'ZhiMangXing';
        src: url(${ZhiMangXing});
	}

	a[href^="http"]:not([href^="${window.location.origin}"])::after {
		content: "";
		background-image: url("${process.env.PUBLIC_URL}/external-link-icon.svg");
		padding: 0 .34em;
		background-size: .7em;
		opacity: .7;
		margin: 0 .1em 0 .2em;
		background-repeat: no-repeat;
		background-position: 0 .25em;
	}
`

document.head.appendChild(styles)
