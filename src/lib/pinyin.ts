export /* parsePinyin */ {}

const _initials = `
j|z|zh     # ji-, zero-final
q|c|ch     # qi-, zero-final
x|s|sh     # xi-, zero-final
l|n
f|h
r|l
k|g
`

const _medials = `
u|ü        # w-, y-, zero-final
ü|i        # w-, y-, zero-final
`

const _finals = `
üe|ui      # w-, y-
an|ang
en|eng
in|ing     # y-
ian|iang   # y-*
uan|uang   # w-*
`

// const parsePinyin = (py: string) => {
//     const match = py.match(
//         /^(b|p|m|f|d|t|n|l|g|k|h|z|c|s|zh|ch|sh|r|j|q|x|)((?:i|u|ü)(?=[aeo]))?([aeiouü]+(?:ng?)?)$/
//         // /^(b|p|m|f|d|t|n|l|g|k|h|zh?|ch?|sh?|r|j|q|x)?((?:y?i|[wy]?u|ü)(?=[aeo]))?((?:y?i|[wy]?u|ü|[eou])+(?:ng?)?)$/,
//     )

//     if (!match) {
//         throw new TypeError('Invalid pinyin syllable')
//     }

//     const [ /* wholeMatch */, initial, medial, final] = match

//     return { initial, medial, final }
// }

// type initialCategory =
//     | 'zero'
//     | 'labial'
//     | 'dental'
//     | 'velar'
//     | 'fricative'
//     | 'retroflex'
//     | 'palatal'

// type medialCategory = 'zero' | 'palatal' | 'labial' | 'palatolabial'

// type initialVariant =
//     | 'aspirated'
//     | 'unaspirated'
//     | 'fricative'
//     | 'retroflex'
//     | 'palatal'

// type medialVariant =
//     medialCategory

// interface Initial {
//     canonical: string
//     category: initialCategory
// }

// interface Medial {
//     canonical: string
//     category: medialCategory
//     contexts: initialCategory[]
// }

// interface Final {
//     canonical: string
//     contexts: medialCategory[]
// }

// const medials: Medial[] = [
//     { canonical: '', category: 'zero' },
//     { canonical: 'i', category: 'palatal' },
//     { canonical: 'u', category: 'labial' },
//     { canonical: 'ü', category: 'palatolabial' },
// ]

// const initials: Initial[] = [
//     { canonical: '', category: 'zero' },

//     { canonical: 'b', category: 'labial' },
//     { canonical: 'p', category: 'labial' },
//     { canonical: 'm', category: 'labial' },
//     { canonical: 'f', category: 'labial' },

//     { canonical: 'd', category: 'dental' },
//     { canonical: 't', category: 'dental' },
//     { canonical: 'n', category: 'dental' },
//     { canonical: 'l', category: 'dental' },

//     { canonical: 'g', category: 'velar' },
//     { canonical: 'k', category: 'velar' },
//     { canonical: 'h', category: 'velar' },

//     { canonical: 'z', category: 'fricative' },
//     { canonical: 'c', category: 'fricative' },
//     { canonical: 's', category: 'fricative' },

//     { canonical: 'zh', category: 'retroflex' },
//     { canonical: 'ch', category: 'retroflex' },
//     { canonical: 'sh', category: 'retroflex' },
//     { canonical: 'r', category: 'retroflex' },

//     { canonical: 'j', category: 'palatal' },
//     { canonical: 'q', category: 'palatal' },
//     { canonical: 'x', category: 'palatal' },
// ]

// const finals: Final[] = [
//     { canonical: '' },
//     { canonical: 'a' },
//     { canonical: 'o' },
//     { canonical: 'e' },
//     { canonical: 'er' },
//     { canonical: 'ai' },
//     { canonical: 'ei' },
//     { canonical: 'ao' },
//     { canonical: 'ou' },
//     { canonical: 'an' },
//     { canonical: 'en' },
//     { canonical: 'ang' },
//     { canonical: 'eng' },
//     { canonical: 'ong' },
//     { canonical: 'i' },
//     { canonical: 'iao' },
//     { canonical: 'ie' },
//     { canonical: 'iu' },
//     { canonical: 'ian' },
//     { canonical: 'in' },
//     { canonical: 'iang' },
//     { canonical: 'ing' },
//     { canonical: 'iong' },
//     { canonical: 'u' },
//     { canonical: 'ua' },
//     { canonical: 'uo' },
//     { canonical: 'uai' },
//     { canonical: 'ui' },
//     { canonical: 'uan' },
//     { canonical: 'un' },
//     { canonical: 'uang' },
//     { canonical: 'ueng' },
//     { canonical: 'ü' },
//     { canonical: 'üe' },
//     { canonical: 'üan' },
//     { canonical: 'ün' },
// ]

// const syllables = `a o e er ai ao ou an en ang eng yi ya yao ye you yan yin
// yang ying yong wu wa wo wai wei wan wen wang weng yu yue yuan yun ba bo bai
// bei bao ban ben bang beng bi biao bie bian bin bing bu pa po pai pei pao pou
// pan pen pang peng pi piao pie pian pin ping pu ma mo me mai mei mao mou man
// men mang meng mi miao mie miu mian min ming mu fa fo fei fou fan fen fang feng
// fu da de dai dei dao dou dan den dang deng dong di diao die diu dian ding du
// duo dui duan dun ta te tai tei tao tou tan tang teng tong ti tiao tie tian
// ting tu tuo tui tuan tun na ne nai nei nao nou nan nen nang neng nong ni niao
// nie niu nian nin niang ning nu nuo nuan nü nüe la le lai lei lao lou lan lang
// leng long li lia liao lie liu lian lin liang ling lu luo luan lun lü lüe ga ge
// gai gei gao gou gan gen gang geng gong gu gua guo guai gui guan gun guang ka
// ke kai kei kao kou kan ken kang keng kong ku kua kuo kuai kui kuan kun kuang
// ha he hai hei hao hou han hen hang heng hong hu hua huo huai hui huan hun
// huang za ze zi zai zei zao zou zan zen zang zeng zong zu zuo zui zuan zun ca
// ce ci cai cao cou can cen cang ceng cong cu cuo cui cuan cun sa se si sai sao
// sou san sen sang seng song su suo sui suan sun zha zhe zhi zhai zhei zhao zhou
// zhan zhen zhang zheng zhong zhu zhua zhuo zhuai zhui zhuan zhun zhuang cha che
// chi chai chao chou chan chen chang cheng chong chu chua chuo chuai chui chuan
// chun chuang sha she shi shai shei shao shou shan shen shang sheng shu shua
// shuo shuai shui shuan shun shuang re ri rao rou ran ren rang reng rong ru rua
// ruo rui ruan run ji jia jiao jie jiu jian jin jiang jing jiong ju jue juan jun
// qi qia qiao qie qiu qian qin qiang qing qiong qu que quan qun xi xia xiao xie
// xiu xian xin xiang xing xiong xu xue xuan xun`.split(/\s+/)

// export { initials, finals, syllables }
