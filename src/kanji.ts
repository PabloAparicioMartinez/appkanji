import type { Kanji } from './types'
import { kanjiN5 } from './kanjiN5'
import { kanjiN4 } from './kanjiN4'
import { kanjiN3 } from './kanjiN3'
import { kanjiN2 } from './kanjiN2'
import { kanjiN1 } from './kanjiN1'

// Kanji count by JLPT level:
// N5: 103 | N4: 164 | N3: 355 | N2: 364 | N1: 50 (Total: 1036)

const RAW: Kanji[] = [
  ...kanjiN5,
  ...kanjiN4,
  ...kanjiN3,
  ...kanjiN2,
  ...kanjiN1,
]

// Deduplicate by kanji character
const seen = new Set<string>()
export const KANJI: Kanji[] = RAW.filter(k => {
  if (seen.has(k.k)) return false
  seen.add(k.k)
  return true
})
