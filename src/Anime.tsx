import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FastScrollbar from './FastScrollbar'
import { ANIME_DATA, type AnimeCategory, type AnimeEntry } from './animeData'

const CATEGORY_COLORS: Record<AnimeCategory, { color: string; bg: string }> = {
  'partícula':   { color: '#9333ea', bg: 'rgba(147, 51, 234, 0.12)' },
  'vocabulario': { color: '#0284c7', bg: 'rgba(2, 132, 199, 0.12)'  },
  'gramática':   { color: '#d97706', bg: 'rgba(217, 119, 6, 0.12)'  },
}

const CATEGORY_LABELS: Record<AnimeCategory, string> = {
  'partícula':   'Partícula',
  'vocabulario': 'Vocab',
  'gramática':   'Gramática',
}

const ALL_CATEGORIES: AnimeCategory[] = ['partícula', 'vocabulario', 'gramática']

const IOS = { type: 'tween' as const, duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }

// ── Anime (list) ──────────────────────────────────────────────────────────
export default function Anime() {
  const [search,   setSearch]   = useState('')
  const [filter,   setFilter]   = useState<AnimeCategory | null>(null)
  const [selected, setSelected] = useState<AnimeEntry | null>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const q = search.toLowerCase().trim()
  const items = ANIME_DATA.filter(e => {
    if (filter && e.category !== filter) return false
    if (!q) return true
    return (
      e.jp.includes(q) ||
      (e.reading?.toLowerCase().includes(q) ?? false) ||
      e.meaning.toLowerCase().includes(q)
    )
  })

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
        <h1 style={{ fontSize: 30, fontWeight: 700, color: 'var(--text)', lineHeight: '36px', marginBottom: 12 }}>
          Anime
        </h1>

        {/* Search */}
        <div className="relative">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: 'var(--text2)' }}>
            <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z"/>
          </svg>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar expresión, vocabulario…"
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

      {/* Category filters */}
      <div
        className="px-4 py-3"
        style={{ background: '#F4F4F1', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}
      >
        <button
          onClick={() => setFilter(null)}
          style={{
            padding: '7px 0', borderRadius: 20, fontSize: 12, fontWeight: 600, fontFamily: 'inherit',
            border: filter === null ? '1.5px solid transparent' : '1.5px solid #3a3a3c',
            background: filter === null ? '#3a3a3c' : '#F4F4F1',
            color: filter === null ? '#fff' : 'var(--text)',
            opacity: 0.85, cursor: 'pointer',
          }}
        >
          Todos
        </button>

        {ALL_CATEGORIES.map(cat => {
          const { color } = CATEGORY_COLORS[cat]
          const active = filter === cat
          return (
            <button
              key={cat}
              onClick={() => setFilter(f => f === cat ? null : cat)}
              style={{
                padding: '7px 0', borderRadius: 20, fontSize: 12, fontWeight: 600, fontFamily: 'inherit',
                border: active ? '1.5px solid transparent' : `1.5px solid ${color}`,
                background: active ? color : '#F4F4F1',
                color: active ? '#fff' : color,
                opacity: 0.85, cursor: 'pointer',
              }}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          )
        })}
      </div>

      {/* List */}
      <div style={{ position: 'relative', flex: 1, minHeight: 0, display: 'flex' }}>
        <div ref={listRef} className="scroll" style={{ flex: 1, background: '#F4F4F1' }}>
          {items.length === 0 ? (
            <div className="flex flex-col items-center py-20" style={{ color: 'var(--text3)' }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16, background: '#e5e5e2',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14,
              }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z"/>
                </svg>
              </div>
              <p style={{ fontSize: 14 }}>Sin resultados</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {items.map(entry => (
                <AnimeRow key={entry.jp} entry={entry} onClick={() => setSelected(entry)} />
              ))}
            </div>
          )}
        </div>
        <FastScrollbar scrollRef={listRef} />
      </div>

      {/* Detail screen */}
      <AnimatePresence>
        {selected && (
          <AnimeDetail entry={selected} onBack={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}

// ── AnimeRow ──────────────────────────────────────────────────────────────
function AnimeRow({ entry, onClick }: { entry: AnimeEntry; onClick: () => void }) {
  const { color } = CATEGORY_COLORS[entry.category]

  return (
    <div
      className="flex items-center row-press cursor-pointer relative"
      style={{ background: '#F4F4F1' }}
      onClick={onClick}
    >
      {/* Category stripe */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0,
        width: 6, background: color, opacity: 0.8,
      }} />

      {/* Content */}
      <div className="flex-1 min-w-0 py-3" style={{ paddingLeft: 22, paddingRight: 8 }}>
        <div className="flex items-baseline gap-2">
          <span className="font-jp-serif" style={{ fontSize: 24, lineHeight: 1.2, color: 'var(--text)' }}>
            {entry.jp}
          </span>
          {entry.reading && (
            <span style={{ fontSize: 13, color: 'var(--text3)' }}>{entry.reading}</span>
          )}
        </div>
        <div className="truncate" style={{ fontSize: 13, color: 'var(--text2)', marginTop: 2 }}>
          {entry.meaning}
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

// ── AnimeDetail ───────────────────────────────────────────────────────────
function AnimeDetail({ entry, onBack }: { entry: AnimeEntry; onBack: () => void }) {
  const { color, bg } = CATEGORY_COLORS[entry.category]
  const [animating, setAnimating] = useState(true)

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: '#F4F4F1', pointerEvents: animating ? 'none' : 'auto' }}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={IOS}
      onAnimationComplete={() => setAnimating(false)}
      drag={animating ? false : 'x'}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={{ left: 0, right: 0.4 }}
      dragDirectionLock
      onDragEnd={(_, info) => {
        if (info.offset.x > 80 || info.velocity.x > 500) onBack()
      }}
    >
      {/* Nav bar */}
      <div
        className="flex items-center px-4"
        style={{
          background: '#F4F4F1',
          paddingTop: 'calc(0.9rem + env(safe-area-inset-top))',
          paddingBottom: '0.75rem',
          flexShrink: 0,
        }}
      >
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={onBack}
          className="w-9 h-9 rounded-full flex items-center justify-center press"
          style={{ background: '#e5e5e2' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.5" strokeLinecap="round" style={{ color: 'var(--text)' }}>
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </motion.button>
      </div>

      {/* Scrollable content */}
      <div className="scroll flex-1" style={{ touchAction: 'pan-y' }}>

        {/* Hero */}
        <div className="text-center px-6 pt-6 pb-6">
          <div
            className="font-jp-serif leading-none mb-4"
            style={{ fontSize: 64, color: 'var(--text)', wordBreak: 'break-all' }}
          >
            {entry.jp}
          </div>
          {entry.reading && (
            <div style={{ fontSize: 18, color: 'var(--text2)', marginBottom: 12 }}>
              {entry.reading}
            </div>
          )}
          <span style={{
            display: 'inline-block',
            background: color, color: '#fff',
            borderRadius: 20, padding: '6px 18px',
            fontSize: 13, fontWeight: 600, letterSpacing: '0.04em', opacity: 0.85,
          }}>
            {CATEGORY_LABELS[entry.category]}
          </span>
        </div>

        {/* Meaning */}
        <div style={{ padding: '0 16px 24px' }}>
          <div style={{
            fontSize: 10, fontWeight: 400, color: 'var(--text3)',
            textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10,
          }}>
            Significado
          </div>
          <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.55 }}>
            {entry.meaning}
          </p>
        </div>

        {/* Example */}
        {entry.example && (
          <div style={{ padding: '0 16px 32px' }}>
            <div style={{
              fontSize: 10, fontWeight: 400, color: 'var(--text3)',
              textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10,
            }}>
              Ejemplo
            </div>
            <div style={{
              background: bg,
              borderRadius: 12, padding: '14px 16px',
              borderLeft: `3px solid ${color}`,
            }}>
              <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.5 }}>
                {entry.example}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
