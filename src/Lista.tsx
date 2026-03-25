import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Kanji, JLPTLevel } from './types'
import Detail from './Detail'
import AddN3 from './AddN3'

interface Props {
  visible: Kanji[]
  lockedN3: Kanji[]
  isUnlocked: (k: Kanji) => boolean
  onUnlock: (char: string) => void
}

type FilterLevel = JLPTLevel | 'all'

export default function Lista({ visible, lockedN3, isUnlocked, onUnlock }: Props) {
  const [search, setSearch] = useState('')
  const [level, setLevel] = useState<FilterLevel>('all')
  const [selected, setSelected] = useState<Kanji | null>(null)
  const [showAddN3, setShowAddN3] = useState(false)

  const q = search.toLowerCase().trim()
  const items = visible.filter(k => {
    if (level !== 'all' && k.level !== level) return false
    if (!q) return true
    return (
      k.k.includes(q) ||
      k.meanings.some(m => m.toLowerCase().includes(q)) ||
      k.on.some(r => r.toLowerCase().includes(q)) ||
      k.kun.some(r => r.toLowerCase().includes(q))
    )
  })

  return (
    <div className="flex flex-col h-full">

      {/* Header */}
      <div
        className="px-4 border-b"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)', paddingTop: 'calc(1rem + env(safe-area-inset-top))', paddingBottom: '0.75rem' }}
      >
        <div className="flex items-center justify-between mb-3">
          <h1 style={{ fontSize: 22, fontWeight: 500, color: 'var(--text)' }}>Kanji</h1>

          {/* + button */}
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => setShowAddN3(true)}
            className="w-9 h-9 rounded-full flex items-center justify-center press"
            style={{ background: 'var(--n3-bg)' }}
            title="Añadir Kanji N3"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ color: 'var(--n3)' }}>
              <path d="M12 5v14M5 12h14"/>
            </svg>
          </motion.button>
        </div>

        {/* Search */}
        <div className="relative">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: 'var(--text3)' }}>
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar kanji, significado, lectura…"
            className="w-full rounded-lg text-[15px] outline-none"
            style={{
              paddingLeft: 36, paddingRight: 12, paddingTop: 10, paddingBottom: 10,
              background: 'var(--surface2)', border: '1px solid var(--border)',
              color: 'var(--text)', fontFamily: 'inherit',
            }}
          />
        </div>
      </div>

      {/* Level filters */}
      <div
        className="flex gap-2 px-4 py-2.5 border-b scroll"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
      >
        {(['all', 'N5', 'N4', 'N3'] as const).map(l => (
          <button
            key={l}
            onClick={() => setLevel(l)}
            className="px-4 py-1.5 rounded-full text-[13px] border whitespace-nowrap press"
            style={{
              background: level === l ? 'var(--text)' : 'var(--surface2)',
              color:      level === l ? '#fff' : 'var(--text2)',
              borderColor: level === l ? 'var(--text)' : 'var(--border)',
              fontFamily: 'inherit',
            }}
          >
            {l === 'all' ? 'Todos' : l}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="scroll flex-1">
        {items.length === 0 ? (
          <div className="text-center py-16" style={{ color: 'var(--text3)' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
            <p style={{ fontSize: 15 }}>No se encontraron kanji</p>
          </div>
        ) : (
          items.map((k, i) => (
            <KanjiRow key={k.k} kanji={k} index={i} onClick={() => setSelected(k)} />
          ))
        )}
      </div>

      {/* Detail screen */}
      <AnimatePresence>
        {selected && (
          <Detail
            kanji={selected}
            unlocked={isUnlocked(selected)}
            onBack={() => setSelected(null)}
            onUnlock={char => { onUnlock(char) }}
          />
        )}
      </AnimatePresence>

      {/* AddN3 screen */}
      <AnimatePresence>
        {showAddN3 && (
          <AddN3
            locked={lockedN3}
            onUnlock={char => { onUnlock(char) }}
            onClose={() => setShowAddN3(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// ── KanjiRow ──────────────────────────────────────────────────────────────
function KanjiRow({ kanji, index, onClick }: { kanji: Kanji; index: number; onClick: () => void }) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 border-b press cursor-pointer fade-up"
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border)',
        animationDelay: `${Math.min(index * 0.03, 0.28)}s`,
      }}
      onClick={onClick}
    >
      <div className="font-jp-serif text-center" style={{ fontSize: 38, lineHeight: 1, minWidth: 48, color: 'var(--text)' }}>
        {kanji.k}
      </div>
      <div className="flex-1 min-w-0">
        <div style={{ fontSize: 15, color: 'var(--text)' }} className="truncate">
          {kanji.meanings.join(', ')}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }} className="truncate">
          {kanji.on.length > 0 && `ON: ${kanji.on.join('・')}`}
          {kanji.on.length > 0 && kanji.kun.length > 0 && ' · '}
          {kanji.kun.length > 0 && `KUN: ${kanji.kun.join('・')}`}
        </div>
      </div>
      <LevelBadge level={kanji.level} />
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text3)', flexShrink: 0 }}>
        <path d="M9 18l6-6-6-6"/>
      </svg>
    </div>
  )
}

// ── LevelBadge ────────────────────────────────────────────────────────────
function LevelBadge({ level }: { level: JLPTLevel }) {
  const styles: Record<JLPTLevel, { bg: string; color: string }> = {
    N5: { bg: 'var(--n5-bg)', color: 'var(--n5)' },
    N4: { bg: 'var(--n4-bg)', color: 'var(--n4)' },
    N3: { bg: 'var(--n3-bg)', color: 'var(--n3)' },
  }
  const s = styles[level]
  return (
    <span style={{ background: s.bg, color: s.color, fontSize: 11, fontWeight: 500, padding: '2px 8px', borderRadius: 10, whiteSpace: 'nowrap' }}>
      {level}
    </span>
  )
}
