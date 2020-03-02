import snarkdown from 'snarkdown'

const _instructions = `## Fuzzy Search for Chinese

Try out these example queries:`;

const instructions = snarkdown(_instructions)

const samples = [
    {
        title: 'traditional identical to simplified',
        query:
            'trad sameas simp\ntrad minlength 2\ntrad !match \\P{Script=Han}',
    },
    {
        title: '不...不 pattern with syllable li3 or li4',
        query: 'simp match 不.不\nsimp length 4\npinyin imatch \\bli[34]',
    },
    {
        title: 'fuzzy match on xian2 xiao4',
        query: 'pinyin imatch ^(?:sh?[ea]|xia)ng?[12] xiao4$',
    },
    {
        title: 'fuzzy match on xiao4 er2 bu4 yu3',
        query: 'pinyin imatch ^(?:xi|sh)ao4 er2 bu4 y[ui][23]$',
    },
    {
        title: '班门弄斧',
        query: 'pinyin icontains ban1\nsimp contains 斧\nsimp length 4',
    },
    { title: 'triplicate characters', query: 'simp match (.)\\1\\1' },
    { title: '说曹操……', query: 'simp match (..)，\\1' },
    { title: 'everything', query: '*' },
    {
        title: 'no Chinese characters',
        query: 'trad match ^\\P{Script=Han}+$',
    },
    {
        title: 'Chinese characters only',
        query: 'trad match ^\\p{Script=Han}+$',
    },
]

export default {
  instructions,
  samples
};
