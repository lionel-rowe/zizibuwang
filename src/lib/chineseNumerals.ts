const chars = {
    LING: '零',
    YI: '一',
    ER: '二',
    SAN: '三',
    SI: '四',
    WU: '五',
    LIU: '六',
    QI: '七',
    BA: '八',
    JIU: '九',

    SHI: '十',
    BAI: '百',
    QIAN: '千',
    WAN: '万',
    YII: '亿',

    LIANG: '两',
    DIAN: '点',
    WEI: '位',
}

export const { DIAN } = chars

const {
    LING,
    YI,
    ER,
    SAN,
    SI,
    WU,
    LIU,
    QI,
    BA,
    JIU,

    SHI,
    BAI,
    QIAN,
    WAN,
    YII,

    LIANG,
    WEI,
} = chars

const units = [LING, YI, ER, SAN, SI, WU, LIU, QI, BA, JIU]

const places = [
    ['', ''],
    [SHI, ''],
    [BAI, ''],
    [QIAN, ''],
    ['', WAN],
    [SHI, WAN],
    [BAI, WAN],
    [QIAN, WAN],
    ['', YII],
    [SHI, YII],
    [BAI, YII],
    [QIAN, YII],
]

export const toChineseInt = (intStr: string) =>
    intStr === '0'
        ? LING
        : intStr.split('').reduce(
              ({ leadingZeros, outStr }, digit, idx, digits) => {
                  const placeIdx = digits.length - idx - 1

                  const place = places[placeIdx]

                  if (!place) {
                      throw new RangeError(
                          `Maximum place is ${(
                              10 **
                              (3 + 4 + 4)
                          ).toLocaleString()} (${QIAN}${YII}${WEI})`,
                      )
                  }

                  const useLiang = ((p) => {
                      if (!p) return false

                      if ([SHI, BAI].some((ch) => p.startsWith(ch)))
                          return false

                      const ult = outStr.slice(-1)[0]

                      if (ult === SHI) return false

                      return true
                  })(place.join(''))

                  const digitNum = +digit

                  if (leadingZeros && digitNum !== 0) outStr += LING

                  if (digitNum !== 0) {
                      if (!(digitNum === 1 && idx === 0 && place[0] === SHI)) {
                          outStr +=
                              digitNum === 2 && useLiang
                                  ? LIANG
                                  : units[digitNum]
                      }

                      outStr += place[0]
                  }

                  if (
                      !places.map((p) => p[1]).includes(outStr.slice(-1)[0]) &&
                      place[1] !== (places[placeIdx - 1] || [null, null])[1]
                  ) {
                      outStr += place[1]
                  }

                  return { leadingZeros: digitNum === 0, outStr, digit }
              },
              { leadingZeros: false, outStr: '' },
          ).outStr

export const toChineseFractional = (fractional: string) =>
    fractional
        .split('')
        .map((d) => units[+d])
        .join('')
