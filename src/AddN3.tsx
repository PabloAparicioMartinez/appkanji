import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Kanji, JLPTLevel } from './types'
import Detail from './Detail'
import { readingMatchesQuery } from './kanaToRomaji'

const LEVEL_COLORS: Record<JLPTLevel, { color: string; stripe: string }> = {
  N5: { color: 'var(--n5)', stripe: 'var(--n5)' },
  N4: { color: 'var(--n4)', stripe: 'var(--n4)' },
  N3: { color: 'var(--n3)', stripe: 'var(--n3)' },
  N2: { color: 'var(--n2)', stripe: 'var(--n2)' },
  N1: { color: 'var(--n1)', stripe: 'var(--n1)' },
}

interface Props {
  locked: Kanji[]
  onUnlock: (char: string) => void
  onRemove?: (char: string) => void
  onClose: () => void
  onStarWord?: (w: string) => void
  isStarredWord?: (w: string) => boolean
}

export default function AddN3({ locked, onUnlock, onRemove, onClose, onStarWord, isStarredWord }: Props) {
  const [search, setSearch] = useState('')
  const [level, setLevel] = useState<JLPTLevel | null>(null)
  const [selected, setSelected] = useState<Kanji | null>(null)
  const [justUnlocked, setJustUnlocked] = useState<Set<string>>(new Set())
  const [animating, setAnimating] = useState(true)

  const q = search.toLowerCase().trim()
  const items = locked.filter(k => {
    if (justUnlocked.has(k.k)) return false
    if (level !== null && k.level !== level) return false
    if (!q) return true
    return (
      k.k.includes(q) ||
      k.meanings.some(m => m.toLowerCase().includes(q)) ||
      k.on.some(r => r.toLowerCase().includes(q)) ||
      k.kun.some(r => r.toLowerCase().includes(q)) ||
      k.on.some(r => readingMatchesQuery(r, q)) ||
      k.kun.some(r => readingMatchesQuery(r, q))
    )
  })

  function handleUnlock(char: string) {
    onUnlock(char)
    setJustUnlocked(prev => new Set([...prev, char]))
    // Don't close — Detail stays open, button changes to ×
  }

  function handleRemove(char: string) {
    onRemove?.(char)
    setJustUnlocked(prev => {
      const next = new Set(prev)
      next.delete(char)
      return next
    })
  }

  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col"
      style={{ background: '#F4F4F1', pointerEvents: animating ? 'none' : 'auto' }}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'tween', duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
      onAnimationComplete={() => setAnimating(false)}
      drag={animating ? false : 'x'}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={{ left: 0, right: 0.4 }}
      dragDirectionLock
      onDragEnd={(_, info) => {
        if (info.offset.x > 80 || info.velocity.x > 500) onClose()
      }}
    >
      {/* Nav */}
      <div
        className="px-4"
        style={{
          background: '#F4F4F1',
          paddingTop: 'calc(1rem + env(safe-area-inset-top))',
          paddingBottom: '0.5rem',
        }}
      >
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={onClose}
          className="w-9 h-9 rounded-full flex items-center justify-center press"
          style={{ background: '#e5e5e2' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ color: 'var(--text)' }}>
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </motion.button>
        <h1 style={{ fontSize: 30, fontWeight: 700, color: 'var(--text)', lineHeight: '36px', marginTop: 6 }}>Añadir Kanji</h1>
      </div>

      {/* Search */}
      <div className="px-4 pb-0" style={{ background: '#F4F4F1' }}>
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
        style={{ background: '#F4F4F1', borderBottom: '1px solid var(--border)', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}
      >
        {(['N5', 'N4', 'N3', 'N2', 'N1'] as const).map(l => {
          const c = LEVEL_COLORS[l]
          const active = level === l
          return (
            <button
              key={l}
              onClick={() => setLevel(active ? null : l)}
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
                opacity: 0.55,
                cursor: 'pointer',
                transition: 'background 0.18s ease, color 0.15s ease, opacity 0.18s ease',
              }}
            >
              {l}
            </button>
          )
        })}
      </div>

      {/* List */}
      <div
        className="scroll flex-1"
        style={{ background: '#F4F4F1', touchAction: 'pan-y' }}
      >
        {items.length === 0 ? (
          <div className="flex flex-col items-center py-20" style={{ color: 'var(--text3)' }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16,
              background: '#e5e5e2',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 14,
            }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text3)' }}>
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            <p style={{ fontSize: 14, color: 'var(--text3)' }}>Todos los kanji están en tu lista</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {items.map((k) => (
              <AddKanjiRow key={k.k} kanji={k} onClick={() => setSelected(k)} />
            ))}
          </div>
        )}
      </div>

      {/* Detail */}
      <AnimatePresence>
        {selected && (
          <Detail
            kanji={selected}
            unlocked={justUnlocked.has(selected.k)}
            onBack={() => setSelected(null)}
            onUnlock={handleUnlock}
            onRemove={onRemove ? handleRemove : undefined}
            onStarWord={onStarWord}
            isStarredWord={isStarredWord}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── AddKanjiRow ────────────────────────────────────────────────────────────
function AddKanjiRow({ kanji, onClick }: { kanji: Kanji; onClick: () => void }) {
  return (
    <div
      className="flex items-center row-press cursor-pointer relative"
      style={{ background: '#F4F4F1' }}
      onClick={onClick}
    >
      {/* Level stripe */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0,
        width: 6, background: LEVEL_COLORS[kanji.level]?.stripe ?? 'var(--n3)',
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
              <span style={{ color: 'var(--text2)' }}>{kanji.kun.slice(0, 2).join('・')}</span>
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
