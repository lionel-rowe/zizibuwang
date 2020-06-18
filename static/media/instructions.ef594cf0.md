# Instructions

## Basic Search

Just type in your search terms, press <kbd>Enter</kbd>, and you’re good to go!

When searching for pinyin:

-   Use “v” to represent ü.
-   Leave a space between each syllable.
-   Tones are ignored in basic search mode.
-   Fuzzy pinyin settings (such as zh ⇄ j) can be changed on the [Settings](./settings) page.

## Advanced Search

Create custom queries in the form `subject verb object`, with one condition per line. Conditions are `AND`ed together (results must meet all the conditions).

Available values for `subject` are:

-   `simp` - simplified
-   `trad` - traditional
-   `pinyin` - pinyin
-   `def` - definition

The available verbs are as follows:

-   `is` - full text match
-   `contains` - partial text match
-   `like` - [regular expression](https://www.regular-expressions.info/quickstart.html) match
-   `length` - length in characters
-   `minlength` - minimum length in characters
-   `maxlength` - maximum length in characters
-   `sameas` - two properties are identical (such as `simp sameas trad`)

By default, matching is case-insensitive. Case-sensitive versions of verbs are formed by prepending `s`. Negated versions are formed by prepending `!`. For example:

-   `simp !contains 儿` - simplified does not contain “儿”
-   `pinyin scontains Zhao` - pinyin contains “Zhao” (not “zhao”)

Here are some example queries to get you started:

## Samples

```ruby
# XX不Y pattern

simp like ^(.)\1不.$
---
# all four tones in order

pinyin like ^\w+1 \w+2 \w+3 \w+4$
---
# words consisting only of top 100 most common characters

simp !like [^的一是不了人我在有他这为之大来以个中上们到说国和地也子时道出而要于就下得可你年生自会那后能对着事其里所去行过家十用发天如然作方成者多日都三小军二无同么经法当起与好看学进种将还分此心前面又定见只主没公从]
---
# traditional identical to simplified

trad sameas simp
trad minlength 2
trad !like \P{Script=Han}
---
# 不...不 pattern with syllable li3 or li4

simp like 不.不
simp length 4
pinyin like \bli[34]
---
# fuzzy match on xian2 xiao4

pinyin like ^(?:sh?[ea]|xia)ng?[12] xiao4$
---
# fuzzy match on xiao4 er2 bu4 yu3

pinyin like ^(?:xi|sh)ao4 er2 bu4 y[ui][23]$
---
# 班门弄斧

pinyin contains ban1
simp contains 斧
simp length 4
---
# triplicate characters

simp like (.)\1\1
---
# 说曹操……

simp like (..)，\1
---
# everything

*
---
# no Chinese characters

trad like ^\P{Script=Han}+$
---
# Chinese characters only

trad like ^\p{Script=Han}+$
```
