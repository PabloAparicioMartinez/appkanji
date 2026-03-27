import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Kanji, JLPTLevel, SessionItem, PracticeMode } from './types'
import PracticeSession from './PracticeSession'

interface Props {
  visible: Kanji[]
  starredKanji: Set<string>
  starredWords: Set<string>
}

type Mode = PracticeMode

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

export default function Practice({ visible, starredKanji, starredWords }: Props) {
  const [mode,        setMode]        = useState<Mode>('A')
  const [levels,      setLevels]      = useState<Set<JLPTLevel>>(new Set())
  const [count,       setCount]       = useState(20)
  const [onlySpecial, setOnlySpecial] = useState(false)
  const [session,     setSession]     = useState<SessionItem[]>([])
  const [showSession, setShowSession] = useState(false)

  const basePool = levels.size > 0 ? visible.filter(k => levels.has(k.level)) : visible
  const pool = onlySpecial ? basePool.filter(k => starredKanji.has(k.k)) : basePool

  useEffect(() => {
    if (pool.length > 0 && count > pool.length) setCount(pool.length)
  }, [pool.length])

  function handleFilterChange(special: boolean) {
    setOnlySpecial(special)
    const base = levels.size > 0 ? visible.filter(k => levels.has(k.level)) : visible
    if (!special) {
      setCount(Math.max(1, Math.ceil(base.length / 4)))
    } else {
      const importantPool = base.filter(k => starredKanji.has(k.k))
      setCount(Math.max(1, importantPool.length))
    }
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
      const words: SessionItem[] = []
      pool.forEach(k => k.words
        .filter(w => !onlySpecial || starredWords.has(w.w))
        .forEach(w => words.push({ type: 'B', word: w, kanji: k })))
      items = shuffle(words).slice(0, count)
    }
    setSession(items)
    setShowSession(true)
  }

  const canStart = onlySpecial ? pool.length > 0 : levels.size > 0 && pool.length > 0

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
            <SectionLabel>Nivel</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
              {ALL_LEVELS.map(l => {
                const active = levels.has(l)
                const color = LEVEL_COLORS[l]
                return (
                  <button
                    key={l}
                    onClick={() => toggleLevel(l)}
                    style={{
                      padding: '8px 0',
                      borderRadius: 20,
                      fontSize: 13,
                      fontWeight: 600,
                      letterSpacing: '0.03em',
                      fontFamily: 'inherit',
                      border: `1.5px solid ${color}`,
                      background: active ? color : '#F4F4F1',
                      color: active ? '#fff' : color,
                      cursor: 'pointer',
                      transition: 'background 0.18s ease, color 0.15s ease',
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
                { id: false as boolean, title: 'Todos', icon: '全' },
                { id: true  as boolean, title: 'Importantes', icon: '★' },
              ]).map(f => {
                const active = onlySpecial === f.id
                return (
                  <button
                    key={String(f.id)}
                    onClick={() => handleFilterChange(f.id)}
                    style={{
                      flex: 1,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                      padding: '9px 12px',
                      borderRadius: 9,
                      background: active ? '#F4F4F1' : 'transparent',
                      boxShadow: active ? '0 1px 4px rgba(0,0,0,0.10)' : 'none',
                      border: 'none', fontFamily: 'inherit', cursor: 'pointer',
                      transition: 'background 0.15s ease',
                    }}
                  >
                    <span className="font-jp-serif" style={{ fontSize: 16, color: active ? 'var(--text)' : 'var(--text2)', lineHeight: 1 }}>{f.icon}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: active ? 'var(--text)' : 'var(--text2)' }}>{f.title}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Count */}
          <div>
            <SectionLabel>Tarjetas por sesión</SectionLabel>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCount(c => Math.max(1, c - 1))}
                className="press flex items-center justify-center"
                style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: '#e5e5e2', border: 'none', cursor: 'pointer',
                  fontSize: 20, color: 'var(--text)', fontFamily: 'inherit', flexShrink: 0,
                }}
              >
                −
              </button>
              <input
                type="text"
                inputMode="numeric"
                value={count}
                onFocus={e => e.target.select()}
                onKeyDown={e => {
                  if (!/^\d$/.test(e.key) && !['Backspace','Delete','ArrowLeft','ArrowRight','Tab'].includes(e.key)) {
                    e.preventDefault()
                  }
                }}
                onChange={e => {
                  const v = parseInt(e.target.value)
                  if (!isNaN(v) && v >= 1) setCount(Math.min(v, Math.max(1, pool.length)))
                }}
                className="text-center outline-none"
                style={{
                  flex: 1, minWidth: 90, height: 44, borderRadius: 12,
                  background: '#e5e5e2', border: 'none',
                  fontSize: 17, fontWeight: 600, color: 'var(--text)',
                  fontFamily: 'inherit',
                }}
              />
              <button
                onClick={() => setCount(c => Math.min(c + 1, Math.max(1, pool.length)))}
                className="press flex items-center justify-center"
                style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: '#e5e5e2', border: 'none', cursor: 'pointer',
                  fontSize: 20, color: 'var(--text)', fontFamily: 'inherit', flexShrink: 0,
                }}
              >
                +
              </button>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 6, textAlign: 'center' }}>
              {pool.length} kanji disponibles
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
          />
        )}
      </AnimatePresence>
    </>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
      {children}
    </div>
  )
}
