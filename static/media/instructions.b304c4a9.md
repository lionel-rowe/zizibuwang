## Basic Search

Just type your search terms and you’re good to go!

## Advanced Search

Create custom queries in the form `subject verb object`. Conditions are `AND`ed together (results must meet all the conditions).

Try out these example advanced search queries:

## Samples

```ruby
# all four tones in order

pinyin match ^\w+1 \w+2 \w+3 \w+4$
---
# words consisting of top 100 most common characters

simp match ^[的一是不了人我在有他这为之大来以个中上们到说国和地也子时道出而要于就下得可你年生自会那后能对着事其里所去行过家十用发天如然作方成者多日都三小军二无同么经法当起与好看学进种将还分此心前面又定见只主没公从]+$
---
# traditional identical to simplified

trad sameas simp
trad minlength 2
trad !match \P{Script=Han}
---
# 不...不 pattern with syllable li3 or li4

simp match 不.不
simp length 4
pinyin imatch \bli[34]
---
# fuzzy match on xian2 xiao4

pinyin imatch ^(?:sh?[ea]|xia)ng?[12] xiao4$
---
# fuzzy match on xiao4 er2 bu4 yu3

pinyin imatch ^(?:xi|sh)ao4 er2 bu4 y[ui][23]$
---
# 班门弄斧

pinyin icontains ban1
simp contains 斧
simp length 4
---
# triplicate characters

simp match .\1\1
---
# 说曹操……

simp match (..)，\1
---
# everything

*
---
# no Chinese characters

trad match ^\P{Script=Han}+$
---
# Chinese characters only

trad match ^\p{Script=Han}+$
```
