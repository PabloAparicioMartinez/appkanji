import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import type { Kanji, JLPTLevel } from './types'
import Detail from './Detail'
import AddKanji from './AddKanji'
import { readingMatchesQuery, hiraganaToKatakana, katakanaToHiragana } from './kanaToRomaji'
import { KunReadingList } from './KunReading'

interface Props {
  visible: Kanji[]
  lockedAll: Kanji[]
  isUnlocked: (k: Kanji) => boolean
  onUnlock: (char: string) => void
  onRemove: (char: string) => void
  onStar: (char: string) => void
  onStarWord: (w: string) => void
  onChangeLevel?: (char: string, newLevel: JLPTLevel) => void
  starredKanji: Set<string>
  starredWords: Set<string>
}

const LEVEL_COLORS: Record<JLPTLevel, { bg: string; color: string; stripe: string }> = {
  N5: { bg: 'var(--n5-bg)', color: 'var(--n5)', stripe: 'var(--n5)' },
  N4: { bg: 'var(--n4-bg)', color: 'var(--n4)', stripe: 'var(--n4)' },
  N3: { bg: 'var(--n3-bg)', color: 'var(--n3)', stripe: 'var(--n3)' },
  N2: { bg: 'var(--n2-bg)', color: 'var(--n2)', stripe: 'var(--n2)' },
  N1: { bg: 'var(--n1-bg)', color: 'var(--n1)', stripe: 'var(--n1)' },
}

export default function Lista({ visible, lockedAll, isUnlocked, onUnlock, onRemove, onStar, onStarWord, onChangeLevel, starredKanji, starredWords }: Props) {
  const [search, setSearch] = useState('')
  const [levels, setLevels] = useState<Set<JLPTLevel>>(new Set())
  const [onlyStarred, setOnlyStarred] = useState(false)
  const [selected, setSelected] = useState<Kanji | null>(null)
  const [showAddN3, setShowAddN3] = useState(false)

  const q = search.toLowerCase().trim()
  const items = visible.filter(k => {
    if (onlyStarred && !starredKanji.has(k.k)) return false
    if (levels.size > 0 && !levels.has(k.level)) return false
    if (!q) return true
    return (
      k.k.includes(q) ||
      k.meanings.some(m => m.toLowerCase().includes(q)) ||
      k.on.some(r => r.toLowerCase().includes(q)) ||
      k.kun.some(r => r.toLowerCase().includes(q)) ||
      k.on.some(r => r.includes(hiraganaToKatakana(q))) ||
      k.kun.some(r => r.includes(katakanaToHiragana(q))) ||
      k.on.some(r => readingMatchesQuery(r, q)) ||
      k.kun.some(r => readingMatchesQuery(r, q))
    )
  })

  function toggleLevel(l: JLPTLevel) {
    setLevels(prev => {
      const next = new Set(prev)
      if (next.has(l)) next.delete(l); else next.add(l)
      return next
    })
  }

  return (
    <div className="flex flex-col h-full">

      {/* Header */}
      <div
        className="px-4"
        style={{
          background: '#F4F4F1',
          paddingTop: 'calc(1rem + env(safe-area-inset-top))',
          paddingBottom: '0.5rem',
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <h1 style={{ fontSize: 30, fontWeight: 700, color: 'var(--text)', lineHeight: '36px' }}>Kanjis</h1>

          {/* + button */}
          <button
            onClick={() => setShowAddN3(true)}
            className="w-9 h-9 rounded-full flex items-center justify-center press"
            style={{ background: '#1c1c1e' }}
            // style={{ background: '#3a3a3c' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14"/>
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: 'var(--text2)' }}>
            <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z"/>
          </svg>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar kanji, significado o lectura…"
            className="w-full text-[14px] outline-none"
            autoCapitalize="none"
            autoCorrect="off"
            style={{
              paddingLeft: 36, paddingRight: 12, paddingTop: 9, paddingBottom: 9,
              background: '#e5e5e2',
              border: 'none',
              borderRadius: 10,
              color: 'var(--text)', fontFamily: 'inherit',
            }}
          />
        </div>
      </div>

      {/* Level filters */}
      <div
        className="px-4 py-3"
        style={{ background: '#F4F4F1', display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}
      >
        {/* Star filter */}
        <button
          onClick={() => setOnlyStarred(v => !v)}
          style={{
            padding: '7px 0',
            borderRadius: 20,
            fontSize: 13,
            fontWeight: 600,
            fontFamily: 'inherit',
            border: onlyStarred ? '1.5px solid transparent' : '1.5px solid #3a3a3c',
            background: onlyStarred ? '#3a3a3c' : '#F4F4F1',
            opacity: 0.8,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24"
            fill={onlyStarred ? 'white' : 'none'}
            stroke={onlyStarred ? 'none' : 'var(--text)'}
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </button>

        {(['N5', 'N4', 'N3', 'N2', 'N1'] as const).map(l => {
          const c = LEVEL_COLORS[l]
          const active = levels.has(l)
          return (
            <button
              key={l}
              onClick={() => toggleLevel(l)}
              style={{
                padding: '7px 0',
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.03em',
                fontFamily: 'inherit',
                border: active ? '1.5px solid transparent' : `1.5px solid ${c.color}`,
                background: active ? c.color : '#F4F4F1',
                color: active ? '#fff' : c.color,
                opacity: 0.8,
                cursor: 'pointer',
              }}
            >
              {l}
            </button>
          )
        })}
      </div>

      {/* List */}
      <div className="scroll flex-1" style={{ background: '#F4F4F1' }}>
        {items.length === 0 ? (
          <div className="flex flex-col items-center py-20" style={{ color: 'var(--text3)' }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16,
              background: '#e5e5e2',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 14,
            }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text3)' }}>
                <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z"/>
              </svg>
            </div>
            <p style={{ fontSize: 14, color: 'var(--text3)' }}>
              {onlyStarred && levels.size > 0
                ? `No hay kanjis importantes de ${levels.size === 1 ? 'este nivel' : 'estos niveles'}`
                : onlyStarred
                ? 'No hay kanjis marcados como importantes'
                : levels.size > 1
                ? 'No hay kanjis de estos niveles en tu lista'
                : 'No hay kanjis de este nivel en tu lista'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {items.map((k) => (
              <KanjiRow key={k.k} kanji={k} onClick={() => setSelected(k)} />
            ))}
          </div>
        )}
      </div>

      {/* Detail screen */}
      <AnimatePresence>
        {selected && (
          <Detail
            kanji={selected}
            unlocked={isUnlocked(selected)}
            onBack={() => setSelected(null)}
            onUnlock={onUnlock}
            onRemove={onRemove}
            onStar={onStar}
            onStarWord={onStarWord}
            onChangeLevel={onChangeLevel}
            isStarred={starredKanji.has(selected.k)}
            isStarredWord={(w: string) => starredWords.has(w)}
            isStarredKanji={(k: string) => starredKanji.has(k)}
          />
        )}
      </AnimatePresence>

      {/* AddN3 screen */}
      <AnimatePresence initial={false}>
        {showAddN3 && (
          <AddKanji
            locked={lockedAll}
            onUnlock={onUnlock}
            onRemove={onRemove}
            onClose={() => setShowAddN3(false)}
            onStarWord={onStarWord}
            onChangeLevel={onChangeLevel}
            isStarredWord={(w: string) => starredWords.has(w)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// ── KanjiRow ──────────────────────────────────────────────────────────────
function KanjiRow({ kanji, onClick }: { kanji: Kanji; onClick: () => void }) {
  const stripe = LEVEL_COLORS[kanji.level].stripe

  return (
    <div
      className="flex items-center row-press cursor-pointer relative"
      style={{ background: '#F4F4F1' }}
      onClick={onClick}
    >
      {/* Full-height level stripe flush to left edge */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0,
        width: 6, background: stripe, opacity: 0.8,
      }} />

      {/* Kanji */}
      <div className="font-jp-serif text-center flex-shrink-0"
        style={{ fontSize: 34, lineHeight: 1, width: 64, paddingLeft: 16, color: 'var(--text)' }}>
        {kanji.k}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 py-2 pr-3" style={{ paddingLeft: 10 }}>
        <div style={{ fontSize: 15, color: 'var(--text)' }} className="truncate">
          {kanji.meanings.join(', ')}
        </div>
        <div className="flex items-center flex-wrap gap-x-3 mt-1" style={{ fontSize: 12, color: 'var(--text3)' }}>
          {kanji.kun.length > 0 && (
            <span>
              <span style={{ textTransform: 'uppercase', fontSize: 10, letterSpacing: '0.05em', marginRight: 3 }}>kun</span>
              <span style={{ color: 'var(--text2)' }}>
                <KunReadingList readings={kanji.kun} limit={2} />
              </span>
            </span>
          )}
          {kanji.on.length > 0 && (
            <span>
              <span style={{ textTransform: 'uppercase', fontSize: 10, letterSpacing: '0.05em', marginRight: 3 }}>on</span>
              <span style={{ color: 'var(--text2)' }}>{kanji.on.slice(0, 2).join('・')}</span>
            </span>
          )}
        </div>
      </div>

      {/* Chevron */}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
        style={{ color: 'var(--text3)', flexShrink: 0, marginRight: 16 }}>
        <path d="M9 18l6-6-6-6"/>
      </svg>
    </div>
  )
}
