import type { CompoundWord, JLPTLevel } from './types'

const LEVEL_ORDER: Record<JLPTLevel, number> = { N5: 0, N4: 1, N3: 2, N2: 3, N1: 4 }

export function sortByLevelAndRank(words: CompoundWord[]): CompoundWord[] {
  return [...words].sort((a, b) => LEVEL_ORDER[a.l] - LEVEL_ORDER[b.l])
}
