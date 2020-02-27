const SAMPLES = [
  `# traditional identical to simplified

trad sameas simp
trad minlength 2
trad !match \\P{Script=Han}`,

  `# 不...不 pattern with syllable li3 or li4

simp match 不.不
simp length 4
pinyin imatch \\bli[34]`,

  `# fuzzy match on xian2 xiao4

pinyin imatch ^(?:sh?[ea]|xia)ng?[12] xiao4$`,

  `# fuzzy match on xiao4 er2 bu4 yu3

pinyin imatch ^(?:xi|sh)ao4 er2 bu4 y[ui][23]$`,

  `# 班门弄斧

pinyin icontains ban1
simp contains 斧
simp length 4`,

  `# triplicate characters

simp match (.)\\1\\1`,

  `# 说曹操……

simp match (..)，\\1`,
];

const handleQueryParams = () => {
  const num = new URLSearchParams(window.location.search).get('preset') | 0;

  const preset = num && SAMPLES[num - 1];

  if (preset) {
    document.querySelector('#search-conditions').textContent = preset;
  }
};

export { handleQueryParams };
