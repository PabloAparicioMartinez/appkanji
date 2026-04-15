import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { AppScreen, ItemResult, JLPTLevel, KanjiEdit } from './types'
import { KANJI } from './kanji'
import Lista from './Lista'
import Practice from './Practice'
import Splash from './Splash'

// ── Persistent state helpers ──────────────────────────────────────────────
function loadSet(key: string): Set<string> {
  try {
    const raw = localStorage.getItem(key)
    return new Set(raw ? JSON.parse(raw) : [])
  } catch { return new Set() }
}

function saveSet(key: string, s: Set<string>) {
  localStorage.setItem(key, JSON.stringify([...s]))
}

function loadMap(key: string): Map<string, number> {
  try {
    const raw = localStorage.getItem(key)
    return new Map(raw ? JSON.parse(raw) : [])
  } catch { return new Map() }
}

function saveMap(key: string, m: Map<string, number>) {
  localStorage.setItem(key, JSON.stringify([...m]))
}

function loadLevelOverrides(key: string): Map<string, JLPTLevel> {
  try {
    const raw = localStorage.getItem(key)
    return new Map(raw ? JSON.parse(raw) : [])
  } catch { return new Map() }
}

function saveLevelOverrides(key: string, m: Map<string, JLPTLevel>) {
  localStorage.setItem(key, JSON.stringify([...m]))
}

function loadKanjiEdits(key: string): Map<string, KanjiEdit> {
  try {
    const raw = localStorage.getItem(key)
    return new Map(raw ? JSON.parse(raw) : [])
  } catch { return new Map() }
}

function saveKanjiEdits(key: string, m: Map<string, KanjiEdit>) {
  localStorage.setItem(key, JSON.stringify([...m]))
}

// ── Icons ─────────────────────────────────────────────────────────────────
function ListIcon({ active: _ }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="3" rx="0.75"/>
      <rect x="3" y="10.5" width="18" height="3" rx="0.75"/>
      <rect x="3" y="18" width="18" height="3" rx="0.75"/>
    </svg>
  )
}

function GridIcon({ active: _ }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5"/>
      <rect x="14" y="3" width="7" height="7" rx="1.5"/>
      <rect x="3" y="14" width="7" height="7" rx="1.5"/>
      <rect x="14" y="14" width="7" height="7" rx="1.5"/>
    </svg>
  )
}


// ── App ───────────────────────────────────────────────────────────────────
export default function App() {
  const [splashDone,    setSplashDone]    = useState(false)
  const [screen,        setScreen]        = useState<AppScreen>('lista')
  // N3/N2/N1 explicitly added
  const [unlockedN3,    setUnlockedN3]    = useState<Set<string>>(() => loadSet('unlocked_n3'))
  // N5/N4 explicitly removed
  const [removedBasic,  setRemovedBasic]  = useState<Set<string>>(() => loadSet('removed_basic'))
  // Starred kanjis and words
  const [starredKanji,  setStarredKanji]  = useState<Set<string>>(() => loadSet('starred_kanji'))
  const [starredWords,  setStarredWords]  = useState<Set<string>>(() => loadSet('starred_words'))
  // Weak kanjis and words (failed during practice)
  const [weakKanji,     setWeakKanji]     = useState<Set<string>>(() => loadSet('weak_kanji'))
  const [weakWords,     setWeakWords]     = useState<Set<string>>(() => loadSet('weak_words'))
  const [weakKanjiMastery, setWeakKanjiMastery] = useState<Map<string, number>>(() => loadMap('weak_kanji_mastery'))
  const [weakWordsMastery, setWeakWordsMastery] = useState<Map<string, number>>(() => loadMap('weak_words_mastery'))
  // Custom level overrides
  const [levelOverrides, setLevelOverrides] = useState<Map<string, JLPTLevel>>(() => loadLevelOverrides('level_overrides'))
  // Custom kanji edits (meanings, kun, on)
  const [kanjiEdits, setKanjiEdits] = useState<Map<string, KanjiEdit>>(() => loadKanjiEdits('kanji_edits'))

  const isUnlocked = useCallback((k: { k: string; level: string }) => {
    if (k.level === 'N3' || k.level === 'N2' || k.level === 'N1') return unlockedN3.has(k.k)
    return !removedBasic.has(k.k) // N5/N4 start in list
  }, [unlockedN3, removedBasic])

  const unlockKanji = useCallback((char: string) => {
    const k = KANJI.find(x => x.k === char)
    if (!k) return
    if (k.level === 'N3' || k.level === 'N2' || k.level === 'N1') {
      setUnlockedN3(prev => { const next = new Set(prev); next.add(char); saveSet('unlocked_n3', next); return next })
    } else {
      setRemovedBasic(prev => { const next = new Set(prev); next.delete(char); saveSet('removed_basic', next); return next })
    }
  }, [])

  const removeKanji = useCallback((char: string) => {
    const k = KANJI.find(x => x.k === char)
    if (!k) return
    if (k.level === 'N3' || k.level === 'N2' || k.level === 'N1') {
      setUnlockedN3(prev => { const next = new Set(prev); next.delete(char); saveSet('unlocked_n3', next); return next })
    } else {
      setRemovedBasic(prev => { const next = new Set(prev); next.add(char); saveSet('removed_basic', next); return next })
    }
  }, [])

  const starKanji = useCallback((char: string) => {
    setStarredKanji(prev => {
      const next = new Set(prev)
      if (next.has(char)) next.delete(char); else next.add(char)
      saveSet('starred_kanji', next)
      return next
    })
  }, [])

  const starWord = useCallback((word: string) => {
    setStarredWords(prev => {
      const next = new Set(prev)
      if (next.has(word)) next.delete(word); else next.add(word)
      saveSet('starred_words', next)
      return next
    })
  }, [])

  const editKanji = useCallback((char: string, edit: KanjiEdit) => {
    setKanjiEdits(prev => {
      const next = new Map(prev)
      next.set(char, { ...prev.get(char), ...edit })
      saveKanjiEdits('kanji_edits', next)
      return next
    })
  }, [])

  const changeLevelKanji = useCallback((char: string, newLevel: JLPTLevel) => {
    const k = KANJI.find(x => x.k === char)
    if (!k) return

    // Determinar si el kanji está desbloqueado actualmente
    const isCurrentlyUnlocked = k.level === 'N3' || k.level === 'N2' || k.level === 'N1'
      ? unlockedN3.has(char)
      : !removedBasic.has(char)

    // Si está desbloqueado y se mueve a N3/N2/N1, añadirlo a unlockedN3
    if (isCurrentlyUnlocked && (newLevel === 'N3' || newLevel === 'N2' || newLevel === 'N1')) {
      setUnlockedN3(prev => { const next = new Set(prev); next.add(char); saveSet('unlocked_n3', next); return next })
    }
    // Si está desbloqueado, se mueve a N5/N4, y estaba en N3/N2/N1, removerlo de unlockedN3
    else if (isCurrentlyUnlocked && (newLevel === 'N5' || newLevel === 'N4') && (k.level === 'N3' || k.level === 'N2' || k.level === 'N1')) {
      setUnlockedN3(prev => { const next = new Set(prev); next.delete(char); saveSet('unlocked_n3', next); return next })
    }

    setLevelOverrides(prev => {
      const next = new Map(prev)
      next.set(char, newLevel)
      saveLevelOverrides('level_overrides', next)
      return next
    })
  }, [unlockedN3, removedBasic])

  const handleSessionResult = useCallback((results: ItemResult[]) => {
    const newWeakKanji = new Set(weakKanji)
    const newMasteryKanji = new Map(weakKanjiMastery)
    results.filter(r => r.type === 'A').forEach(r => {
      if (!r.correct) {
        newWeakKanji.add(r.key)
        newMasteryKanji.set(r.key, 0)
      } else if (newWeakKanji.has(r.key)) {
        const count = (newMasteryKanji.get(r.key) ?? 0) + 1
        if (count >= 2) { newWeakKanji.delete(r.key); newMasteryKanji.delete(r.key) }
        else newMasteryKanji.set(r.key, count)
      }
    })
    saveSet('weak_kanji', newWeakKanji)
    saveMap('weak_kanji_mastery', newMasteryKanji)
    setWeakKanji(newWeakKanji)
    setWeakKanjiMastery(newMasteryKanji)

    const newWeakWords = new Set(weakWords)
    const newMasteryWords = new Map(weakWordsMastery)
    results.filter(r => r.type === 'B').forEach(r => {
      if (!r.correct) {
        newWeakWords.add(r.key)
        newMasteryWords.set(r.key, 0)
      } else if (newWeakWords.has(r.key)) {
        const count = (newMasteryWords.get(r.key) ?? 0) + 1
        if (count >= 2) { newWeakWords.delete(r.key); newMasteryWords.delete(r.key) }
        else newMasteryWords.set(r.key, count)
      }
    })
    saveSet('weak_words', newWeakWords)
    saveMap('weak_words_mastery', newMasteryWords)
    setWeakWords(newWeakWords)
    setWeakWordsMastery(newMasteryWords)
  }, [weakKanji, weakWords, weakKanjiMastery, weakWordsMastery])

  const LEVEL_ORDER: Record<JLPTLevel, number> = { N5: 0, N4: 1, N3: 2, N2: 3, N1: 4 }

  const kanjiWithOverrides = KANJI.map(k => {
    let result = levelOverrides.has(k.k) ? { ...k, level: levelOverrides.get(k.k)! } : k
    const edit = kanjiEdits.get(k.k)
    if (edit) result = { ...result, ...edit }
    return result
  })
  const visible = kanjiWithOverrides
    .filter(isUnlocked)
    .sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level] || a.rank - b.rank)
  const lockedAll = kanjiWithOverrides.filter(k => !isUnlocked(k))

  const tabs = [
    { id: 'lista'     as AppScreen, label: 'Mi lista',  Icon: ListIcon },
    { id: 'practicar' as AppScreen, label: 'Practicar', Icon: GridIcon },
  ]

  return (
    <div className="flex flex-col" style={{ height: '100%', background: 'var(--bg)', overflow: 'hidden' }}>
      <AnimatePresence>
        {!splashDone && <Splash onDone={() => setSplashDone(true)} />}
      </AnimatePresence>
      {/* Main content */}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence initial={false}>
          <motion.div 
            key={screen} 
            className="absolute inset-0 flex flex-col"
          >
            {screen === 'lista'
              ? <Lista
                  visible={visible}
                  lockedAll={lockedAll}
                  isUnlocked={isUnlocked}
                  onUnlock={unlockKanji}
                  onRemove={removeKanji}
                  onStar={starKanji}
                  onStarWord={starWord}
                  onChangeLevel={changeLevelKanji}
                  onEditKanji={editKanji}
                  starredKanji={starredKanji}
                  starredWords={starredWords}
                />
              : <Practice
                  visible={visible}
                  starredKanji={starredKanji}
                  starredWords={starredWords}
                  weakKanji={weakKanji}
                  weakWords={weakWords}
                  onSessionResult={handleSessionResult}
                  onStar={starKanji}
                  onStarWord={starWord}
                  onRemove={removeKanji}
                  onChangeLevel={changeLevelKanji}
                  onEditKanji={editKanji}
                />
            }
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <nav
        className="flex border-t"
        style={{
          background: 'var(--surface)',
          borderColor: 'var(--border)',
          paddingBottom: '8px',
          // paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        {tabs.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setScreen(id)}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 py-3"
            style={{
              color: screen === id ? 'var(--text)' : 'var(--text3)',
              background: 'none', border: 'none', fontFamily: 'inherit', cursor: 'pointer',
            }}
          >
            <Icon active={screen === id} />
            <span style={{ fontSize: 11 }}>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
