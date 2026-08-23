type vowel = 'a' | 'e' | 'i' | 'o' | 'u' | 'v' | 'A' | 'E' | 'I' | 'O' | 'U' | 'V'

const toneMarks: { [key in vowel]: string } = {
	a: 'aāáǎà',
	e: 'eēéěè',
	i: 'iīíǐì',
	o: 'oōóǒò',
	u: 'uūúǔù',
	v: 'üǖǘǚǜ',
	A: 'AĀÁǍÀ',
	E: 'EĒÉĚÈ',
	I: 'IĪÍǏÌ',
	O: 'OŌÓǑÒ',
	U: 'UŪÚǓÙ',
	V: 'ÜǕǗǙǛ',
}

function normalize(syl: string) {
	return syl.replace(/u:|v/g, 'ü')
}

function addToneMark(char: vowel | 'ü', tone: number) {
	if (tone === 5) tone = 0

	if (char === 'ü') char = 'v'

	return toneMarks[char][tone]
}

function isPinyin(syl: string) {
	return /^[a-hj-tw-z][a-zü:]*\d?$/i.test(syl)
}

function withToneMark(syl: string) {
	const lastChar = syl.slice(-1)[0]

	if (!/\d/.test(lastChar)) {
		syl += '5'
	}

	const tone = +syl.slice(-1)[0]

	return syl
		.slice(0, -1)
		.replace(/(?:a|e|o(?=u)|[iouüv](?![aeiouüv]))/i, (m) => addToneMark(m as vowel | 'ü', tone))
}

function prettifySyl(syl: string) {
	return isPinyin(syl) ? withToneMark(normalize(syl)) : syl
}

function prettify(word: string) {
	return word.replace(/[a-zü:]+\d?/gi, (s) => prettifySyl(s))
}

export { prettify }

// success
// prettify('Ni3 you3 nu:3 peng2 you3 ma?');
// prettify('Ma3 ma3, hu1 hu5 nv5');
// prettify('mao4 mei4');
// prettify('xiong1 shi4 ji1 dan4');
// prettify('lu:e4');
// prettify('lve4');
// prettify('lüe4');

// // known issues
// prettify('high5');
// prettify('GangOf4');

// "Nǐ yǒu nǚ péng yǒu ma?"
