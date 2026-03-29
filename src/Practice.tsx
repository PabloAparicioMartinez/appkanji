import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Kanji, JLPTLevel, SessionItem, PracticeMode, ItemResult } from './types'
import PracticeSession from './PracticeSession'

interface Props {
  visible: Kanji[]
  starredKanji: Set<string>
  starredWords: Set<string>
  weakKanji: Set<string>
  weakWords: Set<string>
  onSessionResult: (results: ItemResult[]) => void
}

type Mode = PracticeMode
type FilterType = 'all' | 'important' | 'weak'

const MODES = [
  { id: 'A' as Mode, title: 'Kanjis solos', subtitle: 'Ve un kanji y escribe su lectura y significado', icon: '漢' },
  { id: 'B' as Mode, title: 'Palabras compuestas', subtitle: 'Ve una palabra y escribe su furigana y significado', icon: '熟語' },
]

const ALL_LEVELS: JLPTLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1']

const LEVEL_COLORS: Record<JLPTLevel, string> = {
  N5: 'var(--n5)', N4: 'var(--n4)', N3: 'var(--n3)', N2: 'var(--n2)', N1: 'var(--n1)',
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function Practice({ visible, starredKanji, starredWords, weakKanji, weakWords, onSessionResult }: Props) {
  const [mode,        setMode]        = useState<Mode>('A')
  const [levels,      setLevels]      = useState<Set<JLPTLevel>>(new Set())
  const [count,       setCount]       = useState(20)
  const [countPreset, setCountPreset] = useState<'all' | '5' | '10' | '20' | 'custom' | null>(null)
  const [customInput, setCustomInput] = useState('')
  const [filter,      setFilter]      = useState<FilterType>('all')
  const [session,     setSession]     = useState<SessionItem[]>([])
  const [showSession, setShowSession] = useState(false)

  const basePool = levels.size > 0
    ? visible.filter(k => levels.has(k.level))
    : filter === 'all' ? [] : visible
  const pool = filter === 'important' ? basePool.filter(k => starredKanji.has(k.k))
             : filter === 'weak'      ? basePool.filter(k => weakKanji.has(k.k))
             : basePool

  // For mode B + weak: words in weakWords from any level-filtered kanji
  const weakWordItems: SessionItem[] = filter === 'weak' && mode === 'B'
    ? basePool.flatMap(k => k.words
        .filter(w => weakWords.has(w.w))
        .map(w => ({ type: 'B' as const, word: w, kanji: k })))
    : []

  const maxPool = filter === 'weak' && mode === 'B'
    ? weakWordItems.length
    : pool.length

  useEffect(() => {
    if (countPreset === 'all')      setCount(maxPool)
    else if (countPreset === '5')   setCount(Math.min(5,  maxPool))
    else if (countPreset === '10')  setCount(Math.min(10, maxPool))
    else if (countPreset === '20')  setCount(Math.min(20, maxPool))
    else if (count > maxPool)       setCount(maxPool)
  }, [maxPool, countPreset])

  function handleFilterChange(f: FilterType) {
    setFilter(f)
    setCountPreset(null)
  }

  function toggleLevel(l: JLPTLevel) {
    setLevels(prev => {
      const next = new Set(prev)
      if (next.has(l)) next.delete(l); else next.add(l)
      return next
    })
  }

  function startSession() {
    let items: SessionItem[]
    if (mode === 'A') {
      items = shuffle(pool).slice(0, count).map(k => ({ type: 'A', kanji: k }))
    } else {
      const words: SessionItem[] = filter === 'weak'
        ? weakWordItems
        : basePool.flatMap(k => k.words
            .filter(w => filter === 'important' ? starredWords.has(w.w) : true)
            .map(w => ({ type: 'B' as const, word: w, kanji: k })))
      items = shuffle(words).slice(0, count)
    }
    setSession(items)
    setShowSession(true)
  }

  const canStart = countPreset !== null && (filter === 'all'
    ? levels.size > 0 && pool.length > 0
    : filter === 'weak' && mode === 'B'
    ? weakWordItems.length > 0
    : pool.length > 0)

  return (
    <>
      {/* ── SETUP ── */}
      <div className="flex flex-col h-full" style={{ background: '#F4F4F1' }}>
        <div
          className="px-4"
          style={{
            background: '#F4F4F1',
            paddingTop: 'calc(1rem + env(safe-area-inset-top))',
            paddingBottom: '0.5rem',
          }}
        >
          <h1 style={{ fontSize: 30, fontWeight: 700, color: 'var(--text)', lineHeight: '36px' }}>Practicar</h1>
        </div>

        <div className="scroll flex-1 px-4 py-6" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

          {/* Mode */}
          <div>
            <SectionLabel>Modo</SectionLabel>
            <div style={{ display: 'flex', background: '#e5e5e2', borderRadius: 12, padding: 3 }}>
              {MODES.map(m => {
                const active = mode === m.id
                return (
                  <button
                    key={m.id}
                    onClick={() => setMode(m.id)}
                    style={{
                      flex: 1,
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      gap: 8, padding: '14px 12px',
                      borderRadius: 9,
                      background: active ? '#F4F4F1' : 'transparent',
                      boxShadow: active ? '0 1px 4px rgba(0,0,0,0.10)' : 'none',
                      border: 'none', fontFamily: 'inherit', cursor: 'pointer',
                      transition: 'background 0.15s ease',
                    }}
                  >
                    <div
                      className="font-jp-serif flex items-center justify-center"
                      style={{
                        width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                        background: active ? '#e5e5e2' : 'var(--surface2)',
                        color: active ? 'var(--text)' : 'var(--text2)',
                        fontSize: m.icon.length === 1 ? 22 : 15,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {m.icon}
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', textAlign: 'center', lineHeight: 1.3 }}>
                      {m.title}
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--text3)', textAlign: 'center', lineHeight: 1.3 }}>
                      {m.subtitle}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Level */}
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 10, fontWeight: 400, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Nivel</span>
              <span style={{ fontSize: 11, color: 'var(--text3)', fontWeight: 500, visibility: filter !== 'all' ? 'visible' : 'hidden' }}>
                Todos incluidos
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
              {ALL_LEVELS.map(l => {
                const color = LEVEL_COLORS[l]
                return (
                  <button
                    key={l}
                    onClick={() => filter === 'all' && toggleLevel(l)}
                    style={{
                      padding: '7px 0',
                      borderRadius: 20,
                      fontSize: 13,
                      fontWeight: 600,
                      letterSpacing: '0.03em',
                      fontFamily: 'inherit',
                      border: (filter !== 'all' || levels.has(l)) ? '1.5px solid transparent' : `1.5px solid ${color}`,
                      background: (filter !== 'all' || levels.has(l)) ? color : '#F4F4F1',
                      color: (filter !== 'all' || levels.has(l)) ? '#fff' : color,
                      cursor: filter === 'all' ? 'pointer' : 'default',
                      opacity: 0.55,
                      transition: 'background 0.18s ease, color 0.15s ease, opacity 0.18s ease',
                    }}
                  >
                    {l}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Filtro */}
          <div>
            <SectionLabel>Filtro</SectionLabel>
            <div style={{ display: 'flex', background: '#e5e5e2', borderRadius: 12, padding: 3 }}>
              {([
                { id: 'all'       as FilterType, title: 'Todos',      icon: '全' },
                { id: 'important' as FilterType, title: 'Importantes', icon: '★' },
                { id: 'weak'      as FilterType, title: 'Débiles',    icon: '弱' },
              ]).map(f => {
                const active = filter === f.id
                return (
                  <button
                    key={f.id}
                    onClick={() => handleFilterChange(f.id)}
                    style={{
                      flex: 1,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                      padding: '9px 8px',
                      borderRadius: 9,
                      background: active ? '#F4F4F1' : 'transparent',
                      boxShadow: active ? '0 1px 4px rgba(0,0,0,0.10)' : 'none',
                      border: 'none', fontFamily: 'inherit', cursor: 'pointer',
                      transition: 'background 0.15s ease',
                    }}
                  >
                    <span className="font-jp-serif" style={{ fontSize: 16, color: active ? 'var(--text)' : 'var(--text2)', lineHeight: 1 }}>{f.icon}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: active ? 'var(--text)' : 'var(--text2)' }}>{f.title}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Count */}
          <div>
            <SectionLabel>Tarjetas por sesión</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${filter === 'all' ? 4 : 2}, 1fr)`, gap: 8 }}>
              {(filter === 'all'
                ? (['5', '10', '20', 'custom'] as const)
                : (['all', 'custom'] as const)
              ).map(p => {
                const active = countPreset === p
                const label = p === 'all' ? 'Todos' : p === 'custom' ? '···' : p
                return (
                  <button
                    key={p}
                    onClick={() => {
                      setCountPreset(p)
                      if (p === 'custom') setCustomInput(String(count))
                    }}
                    style={{
                      padding: '10px 0',
                      borderRadius: 12,
                      fontSize: p === 'custom' ? 16 : 14,
                      fontWeight: 600,
                      fontFamily: 'inherit',
                      border: 'none',
                      background: active ? '#3a3a3c' : '#e5e5e2',
                      color: active ? '#fff' : 'var(--text)',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease, color 0.15s ease',
                    }}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
            {countPreset === 'custom' && (
              <input
                type="text"
                inputMode="numeric"
                value={customInput}
                autoFocus
                onFocus={e => e.target.select()}
                onKeyDown={e => {
                  if (!/^\d$/.test(e.key) && !['Backspace','Delete','ArrowLeft','ArrowRight','Tab'].includes(e.key))
                    e.preventDefault()
                }}
                onChange={e => {
                  setCustomInput(e.target.value)
                  const v = parseInt(e.target.value)
                  if (!isNaN(v) && v >= 1) setCount(Math.min(v, maxPool))
                }}
                placeholder="Número de tarjetas"
                className="text-center outline-none"
                style={{
                  width: '100%', marginTop: 8, padding: '11px 14px',
                  borderRadius: 12, border: 'none',
                  background: '#e5e5e2',
                  fontSize: 16, fontWeight: 600, color: 'var(--text)',
                  fontFamily: 'inherit', boxSizing: 'border-box',
                }}
              />
            )}
            <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 8, textAlign: 'center' }}>
              {countPreset !== 'all' && <>{count} de </>}
              {maxPool} {filter === 'weak' && mode === 'B' ? 'palabras' : 'kanji'} seleccionados
            </div>
          </div>

          <motion.button
            whileTap={{ backgroundColor: '#2a2a2c' }}
            onClick={startSession}
            disabled={!canStart}
            className="w-full py-4 rounded-2xl text-white text-[16px] font-semibold"
            style={{ background: '#3a3a3c', fontFamily: 'inherit', opacity: canStart ? 1 : 0.4, border: 'none', cursor: 'pointer' }}
          >
            Empezar
          </motion.button>
        </div>
      </div>

      {/* ── SESSION screen ── */}
      <AnimatePresence>
        {showSession && (
          <PracticeSession
            session={session}
            mode={mode}
            onClose={() => setShowSession(false)}
            onRestart={startSession}
            onSessionResult={onSessionResult}
          />
        )}
      </AnimatePresence>
    </>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 10, fontWeight: 400, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>
      {children}
    </div>
  )
}
