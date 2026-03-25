// Multi-char combinations must be listed before their single-char components
const MAP: [string, string][] = [
  // Hiragana combinations
  ['きゃ','kya'],['きゅ','kyu'],['きょ','kyo'],
  ['しゃ','sha'],['しゅ','shu'],['しょ','sho'],['し','shi'],
  ['ちゃ','cha'],['ちゅ','chu'],['ちょ','cho'],['ち','chi'],
  ['にゃ','nya'],['にゅ','nyu'],['にょ','nyo'],
  ['ひゃ','hya'],['ひゅ','hyu'],['ひょ','hyo'],
  ['みゃ','mya'],['みゅ','myu'],['みょ','myo'],
  ['りゃ','rya'],['りゅ','ryu'],['りょ','ryo'],
  ['ぎゃ','gya'],['ぎゅ','gyu'],['ぎょ','gyo'],
  ['じゃ','ja'],['じゅ','ju'],['じょ','jo'],['じ','ji'],
  ['ぢゃ','ja'],['ぢゅ','ju'],['ぢょ','jo'],
  ['びゃ','bya'],['びゅ','byu'],['びょ','byo'],
  ['ぴゃ','pya'],['ぴゅ','pyu'],['ぴょ','pyo'],
  ['つ','tsu'],['ふ','fu'],
  // Hiragana basic
  ['あ','a'],['い','i'],['う','u'],['え','e'],['お','o'],
  ['か','ka'],['き','ki'],['く','ku'],['け','ke'],['こ','ko'],
  ['さ','sa'],['す','su'],['せ','se'],['そ','so'],
  ['た','ta'],['て','te'],['と','to'],
  ['な','na'],['に','ni'],['ぬ','nu'],['ね','ne'],['の','no'],
  ['は','ha'],['ひ','hi'],['へ','he'],['ほ','ho'],
  ['ま','ma'],['み','mi'],['む','mu'],['め','me'],['も','mo'],
  ['や','ya'],['ゆ','yu'],['よ','yo'],
  ['ら','ra'],['り','ri'],['る','ru'],['れ','re'],['ろ','ro'],
  ['わ','wa'],['を','wo'],['ん','n'],
  ['が','ga'],['ぎ','gi'],['ぐ','gu'],['げ','ge'],['ご','go'],
  ['ざ','za'],['ず','zu'],['ぜ','ze'],['ぞ','zo'],
  ['だ','da'],['ぢ','di'],['づ','du'],['で','de'],['ど','do'],
  ['ば','ba'],['び','bi'],['ぶ','bu'],['べ','be'],['ぼ','bo'],
  ['ぱ','pa'],['ぴ','pi'],['ぷ','pu'],['ぺ','pe'],['ぽ','po'],
  ['っ',''],
  // Katakana combinations
  ['キャ','kya'],['キュ','kyu'],['キョ','kyo'],
  ['シャ','sha'],['シュ','shu'],['ショ','sho'],['シ','shi'],
  ['チャ','cha'],['チュ','chu'],['チョ','cho'],['チ','chi'],
  ['ニャ','nya'],['ニュ','nyu'],['ニョ','nyo'],
  ['ヒャ','hya'],['ヒュ','hyu'],['ヒョ','hyo'],
  ['ミャ','mya'],['ミュ','myu'],['ミョ','myo'],
  ['リャ','rya'],['リュ','ryu'],['リョ','ryo'],
  ['ギャ','gya'],['ギュ','gyu'],['ギョ','gyo'],
  ['ジャ','ja'],['ジュ','ju'],['ジョ','jo'],['ジ','ji'],
  ['ビャ','bya'],['ビュ','byu'],['ビョ','byo'],
  ['ピャ','pya'],['ピュ','pyu'],['ピョ','pyo'],
  ['ツ','tsu'],['フ','fu'],
  // Katakana basic
  ['ア','a'],['イ','i'],['ウ','u'],['エ','e'],['オ','o'],
  ['カ','ka'],['キ','ki'],['ク','ku'],['ケ','ke'],['コ','ko'],
  ['サ','sa'],['ス','su'],['セ','se'],['ソ','so'],
  ['タ','ta'],['テ','te'],['ト','to'],
  ['ナ','na'],['ニ','ni'],['ヌ','nu'],['ネ','ne'],['ノ','no'],
  ['ハ','ha'],['ヒ','hi'],['ヘ','he'],['ホ','ho'],
  ['マ','ma'],['ミ','mi'],['ム','mu'],['メ','me'],['モ','mo'],
  ['ヤ','ya'],['ユ','yu'],['ヨ','yo'],
  ['ラ','ra'],['リ','ri'],['ル','ru'],['レ','re'],['ロ','ro'],
  ['ワ','wa'],['ヲ','wo'],['ン','n'],
  ['ガ','ga'],['ギ','gi'],['グ','gu'],['ゲ','ge'],['ゴ','go'],
  ['ザ','za'],['ズ','zu'],['ゼ','ze'],['ゾ','zo'],
  ['ダ','da'],['ヂ','di'],['ヅ','du'],['デ','de'],['ド','do'],
  ['バ','ba'],['ビ','bi'],['ブ','bu'],['ベ','be'],['ボ','bo'],
  ['パ','pa'],['ピ','pi'],['プ','pu'],['ペ','pe'],['ポ','po'],
  ['ッ',''],
]

export function kanaToRomaji(str: string): string {
  let result = ''
  let i = 0
  while (i < str.length) {
    let matched = false
    for (const [kana, romaji] of MAP) {
      if (str.startsWith(kana, i)) {
        result += romaji
        i += kana.length
        matched = true
        break
      }
    }
    if (!matched) {
      result += str[i]
      i++
    }
  }
  return result
}

export function readingMatchesQuery(reading: string, query: string): boolean {
  const romaji = kanaToRomaji(reading.replace(/[.\-・]/g, ''))
  return romaji.includes(query)
}
