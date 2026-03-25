import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Kanji } from './types'
import Detail from './Detail'

interface Props {
  locked: Kanji[]
  onUnlock: (char: string) => void
  onClose: () => void
}

export default function AddN3({ locked, onUnlock, onClose }: Props) {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Kanji | null>(null)
  const [justUnlocked, setJustUnlocked] = useState<Set<string>>(new Set())

  const q = search.toLowerCase().trim()
  const items = locked.filter(k => {
    if (justUnlocked.has(k.k)) return false
    if (!q) return true
    return (
      k.k.includes(q) ||
      k.meanings.some(m => m.toLowerCase().includes(q)) ||
      k.on.some(r => r.toLowerCase().includes(q)) ||
      k.kun.some(r => r.toLowerCase().includes(q))
    )
  })

  function handleUnlock(char: string) {
    onUnlock(char)
    setJustUnlocked(prev => new Set([...prev, char]))
    setSelected(null)
  }

  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col"
      style={{ background: 'var(--bg)' }}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 380, damping: 38 }}
    >
      {/* Nav */}
      <div
        className="flex items-center gap-3 px-4 py-3 border-b"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)', paddingTop: 'calc(0.75rem + env(safe-area-inset-top))' }}
      >
        <button onClick={onClose} className="press flex items-center gap-1 text-[15px]" style={{ color: 'var(--n4)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          Lista
        </button>
        <span style={{ fontSize: 17, fontWeight: 500, color: 'var(--text)' }}>Añadir Kanji N3</span>
      </div>

      {/* Search */}
      <div className="px-4 py-3 border-b" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
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
            placeholder="Buscar kanji N3…"
            className="w-full rounded-lg text-[15px] outline-none"
            style={{
              paddingLeft: 36, paddingRight: 12, paddingTop: 10, paddingBottom: 10,
              background: 'var(--surface2)', border: '1px solid var(--border)',
              color: 'var(--text)', fontFamily: 'inherit',
            }}
          />
        </div>
      </div>

      {/* List */}
      <div className="scroll flex-1">
        {items.length === 0 ? (
          <div className="text-center py-16" style={{ color: 'var(--text3)' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>✓</div>
            <p style={{ fontSize: 15 }}>¡Has añadido todos los kanji N3 disponibles!</p>
          </div>
        ) : (
          items.map((k, i) => (
            <KanjiRow key={k.k} kanji={k} index={i} onClick={() => setSelected(k)} />
          ))
        )}
      </div>

      {/* Detail */}
      <AnimatePresence>
        {selected && (
          <Detail
            kanji={selected}
            unlocked={false}
            onBack={() => setSelected(null)}
            onUnlock={handleUnlock}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

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
        <div style={{ fontSize: 15, color: 'var(--text)' }} className="truncate">{kanji.meanings.join(', ')}</div>
        <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }} className="truncate">
          {kanji.on.length > 0 && `ON: ${kanji.on.join('・')}`}
          {kanji.on.length > 0 && kanji.kun.length > 0 && ' · '}
          {kanji.kun.length > 0 && `KUN: ${kanji.kun.join('・')}`}
        </div>
      </div>
      <span style={{ background: 'var(--n3-bg)', color: 'var(--n3)', fontSize: 11, fontWeight: 500, padding: '2px 8px', borderRadius: 10 }}>N3</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text3)', flexShrink: 0 }}>
        <path d="M9 18l6-6-6-6"/>
      </svg>
    </div>
  )
}
