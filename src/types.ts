export type JLPTLevel = 'N5' | 'N4' | 'N3'

export interface CompoundWord {
  w: string      // kanji word
  f: string      // furigana
  m: string      // meaning in Spanish
  l: JLPTLevel
}

export interface Kanji {
  k: string      // the kanji character
  level: JLPTLevel
  meanings: string[]
  on: string[]   // on readings (katakana)
  kun: string[]  // kun readings (hiragana)
  words: CompoundWord[]
}

export type AppScreen = 'lista' | 'practicar'
export type PracticeMode = 'A' | 'B'

export interface SessionItem {
  type: 'A' | 'B'
  kanji?: Kanji
  word?: CompoundWord
}
