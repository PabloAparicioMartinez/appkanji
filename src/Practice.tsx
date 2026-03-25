import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Kanji, JLPTLevel, SessionItem } from './types'

interface Props { visible: Kanji[] }

type Phase = 'setup' | 'session' | 'results'
type Mode = 'A' | 'B'

interface FieldResult { correct: boolean; expected: string }

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function norm(s: string) {
  return s.toLowerCase().replace(/\s/g, '')
}

const MODES = [
  { id: 'A' as Mode, title: 'Flashcard', subtitle: 'Ve un kanji y escribe su lectura y significado', icon: '漢' },
  { id: 'B' as Mode, title: 'Palabras compuestas', subtitle: 'Ve una palabra y escribe su furigana y significado', icon: '熟語' },
]

const ALL_LEVELS: JLPTLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1']

const LEVEL_COLORS: Record<JLPTLevel, string> = {
  N5: 'var(--n5)',
  N4: 'var(--n4)',
  N3: 'var(--n3)',
  N2: 'var(--n2)',
  N1: 'var(--n1)',
}

export default function Practice({ visible }: Props) {
  const [phase, setPhase] = useState<Phase>('setup')

  // Setup state
  const [mode,   setMode]   = useState<Mode>('A')
  const [levels, setLevels] = useState<Set<JLPTLevel>>(new Set())
  const [count,  setCount]  = useState(20)

  // Session state
  const [session,   setSession]   = useState<SessionItem[]>([])
  const [idx,       setIdx]       = useState(0)
  const [correct,   setCorrect]   = useState(0)
  const [answered,  setAnswered]  = useState(false)
  const [results,   setResults]   = useState<FieldResult[]>([])

  // Input refs
  const onRef   = useRef<HTMLInputElement>(null)
  const kunRef  = useRef<HTMLInputElement>(null)
  const meanRef = useRef<HTMLInputElement>(null)
  const furiRef = useRef<HTMLInputElement>(null)

  const pool = visible.filter(k => levels.has(k.level))

  function toggleLevel(l: JLPTLevel) {
    setLevels(prev => {
      const next = new Set(prev)
      if (next.has(l)) next.delete(l)
      else next.add(l)
      return next
    })
  }

  function startSession() {
    let items: SessionItem[]
    if (mode === 'A') {
      items = shuffle(pool).slice(0, count).map(k => ({ type: 'A', kanji: k }))
    } else {
      const words: SessionItem[] = []
      pool.forEach(k => k.words.forEach(w => words.push({ type: 'B', word: w, kanji: k })))
      items = shuffle(words).slice(0, count)
    }
    setSession(items)
    setIdx(0)
    setCorrect(0)
    setAnswered(false)
    setResults([])
    setPhase('session')
    setTimeout(() => (mode === 'A' ? onRef : furiRef).current?.focus(), 100)
  }

  function checkAnswer() {
    if (answered) return
    const item = session[idx]
    const fieldResults: FieldResult[] = []
    let allOk = true

    if (item.type === 'A' && item.kanji) {
      const k = item.kanji
      const onVal   = onRef.current?.value   ?? ''
      const kunVal  = kunRef.current?.value  ?? ''
      const meanVal = meanRef.current?.value ?? ''

      const onOk   = k.on.length  === 0 || k.on.some(r  => norm(r)  === norm(onVal))
      const kunOk  = k.kun.length === 0 || k.kun.some(r => norm(r)  === norm(kunVal))
      const meanOk = k.meanings.some(m =>
        norm(m).includes(norm(meanVal)) || norm(meanVal).includes(norm(m))
      )

      fieldResults.push({ correct: onOk,   expected: k.on.join('、')       || '—' })
      fieldResults.push({ correct: kunOk,  expected: k.kun.join('、')      || '—' })
      fieldResults.push({ correct: meanOk, expected: k.meanings.join(', ') })
      allOk = onOk && kunOk && meanOk

    } else if (item.type === 'B' && item.word) {
      const w = item.word
      const furiVal = furiRef.current?.value  ?? ''
      const meanVal = meanRef.current?.value  ?? ''

      const furiOk = norm(w.f) === norm(furiVal)
      const meanOk = norm(w.m).includes(norm(meanVal)) || norm(meanVal).includes(norm(w.m))

      fieldResults.push({ correct: furiOk, expected: w.f })
      fieldResults.push({ correct: meanOk, expected: w.m })
      allOk = furiOk && meanOk
    }

    if (allOk) setCorrect(c => c + 1)
    setResults(fieldResults)
    setAnswered(true)
  }

  function nextCard() {
    if (idx + 1 >= session.length) {
      setPhase('results')
    } else {
      setIdx(i => i + 1)
      setAnswered(false)
      setResults([])
      if (onRef.current)   onRef.current.value   = ''
      if (kunRef.current)  kunRef.current.value  = ''
      if (meanRef.current) meanRef.current.value = ''
      if (furiRef.current) furiRef.current.value = ''
      setTimeout(() => (mode === 'A' ? onRef : furiRef).current?.focus(), 80)
    }
  }

  // ── SETUP ────────────────────────────────────────────────────────────────
  if (phase === 'setup') return (
    <div className="flex flex-col h-full" style={{ background: '#F4F4F1' }}>
      {/* Header */}
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
          <div className="flex gap-3">
            {MODES.map(m => {
              const active = mode === m.id
              return (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className="flex-1 press"
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    gap: 8, padding: '16px 12px',
                    borderRadius: 16,
                    background: active ? '#e5e5e2' : 'var(--surface)',
                    border: '1px solid var(--border)',
                    fontFamily: 'inherit', cursor: 'pointer',
                  }}
                >
                  <div
                    className="font-jp-serif flex items-center justify-center"
                    style={{
                      width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                      background: active ? '#c8c8c4' : 'var(--surface2)',
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

        {/* Level — toggleable chips full width */}
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
                  className="press"
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

        {/* Count — stepper */}
        <div>
          <SectionLabel>Tarjetas por sesión</SectionLabel>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCount(c => Math.max(1, c - 1))}
              className="press flex items-center justify-center"
              style={{
                width: 40, height: 40, borderRadius: 12,
                background: '#e5e5e2', border: 'none', cursor: 'pointer',
                fontSize: 20, color: 'var(--text)', fontFamily: 'inherit', flexShrink: 0,
              }}
            >
              −
            </button>
            <input
              type="number"
              value={count}
              min={1}
              onChange={e => {
                const v = parseInt(e.target.value)
                if (!isNaN(v) && v >= 1) setCount(v)
              }}
              className="text-center outline-none"
              style={{
                flex: 1, height: 40, borderRadius: 12,
                background: '#e5e5e2', border: 'none',
                fontSize: 17, fontWeight: 600, color: 'var(--text)',
                fontFamily: 'inherit',
              }}
            />
            <button
              onClick={() => setCount(c => c + 1)}
              className="press flex items-center justify-center"
              style={{
                width: 40, height: 40, borderRadius: 12,
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

        <button
          onClick={startSession}
          disabled={pool.length === 0}
          className="w-full py-4 rounded-2xl text-white text-[16px] font-semibold press"
          style={{ background: '#3a3a3c', fontFamily: 'inherit', opacity: pool.length === 0 ? 0.4 : 1 }}
        >
          Empezar
        </button>
      </div>
    </div>
  )

  // ── RESULTS ──────────────────────────────────────────────────────────────
  if (phase === 'results') {
    const pct = Math.round((correct / session.length) * 100)
    const emoji = pct >= 80 ? '🎉' : pct >= 50 ? '💪' : '📚'
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center h-full px-8 text-center"
        style={{ gap: 16, background: '#F4F4F1' }}
      >
        <div style={{ fontSize: 64 }}>{emoji}</div>
        <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--text)' }}>
          {pct >= 80 ? '¡Excelente!' : pct >= 50 ? '¡Buen trabajo!' : '¡Sigue practicando!'}
        </div>
        <div style={{ fontSize: 18, color: 'var(--text2)' }}>
          {correct} de {session.length} correctas ({pct}%)
        </div>
        <button
          onClick={startSession}
          className="w-full py-4 rounded-2xl text-white text-[16px] font-semibold press"
          style={{ background: '#3a3a3c', fontFamily: 'inherit', marginTop: 16 }}
        >
          Otra sesión
        </button>
        <button
          onClick={() => setPhase('setup')}
          className="w-full py-4 rounded-2xl text-[16px] press"
          style={{ background: '#e5e5e2', color: 'var(--text)', border: 'none', fontFamily: 'inherit' }}
        >
          Volver
        </button>
      </motion.div>
    )
  }

  // ── SESSION ──────────────────────────────────────────────────────────────
  const item = session[idx]
  const progressPct = (idx / session.length) * 100
  const isA  = item?.type === 'A'
  const allCorrect = results.length > 0 && results.every(r => r.correct)

  const fields = isA
    ? [
        { ref: onRef,   label: 'Lectura ON',   placeholder: 'ej: ニチ',      result: results[0] },
        { ref: kunRef,  label: 'Lectura KUN',  placeholder: 'ej: ひ',        result: results[1] },
        { ref: meanRef, label: 'Significado',  placeholder: 'ej: sol, día',  result: results[2] },
      ]
    : [
        { ref: furiRef, label: 'Furigana',    placeholder: 'ej: にほんご',   result: results[0] },
        { ref: meanRef, label: 'Significado', placeholder: 'ej: japonés',    result: results[1] },
      ]

  return (
    <motion.div
      className="flex flex-col h-full"
      style={{ background: '#F4F4F1' }}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      transition={{ type: 'tween', duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
    >

      {/* Thin progress bar */}
      <div style={{ height: 3, background: 'var(--border)', flexShrink: 0 }}>
        <motion.div
          style={{ height: '100%', background: 'var(--primary)' }}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Nav */}
      <div
        className="flex items-center justify-between px-4"
        style={{
          paddingTop: 'calc(0.75rem + env(safe-area-inset-top))',
          paddingBottom: '0.5rem',
          flexShrink: 0,
        }}
      >
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => setPhase('setup')}
          className="w-9 h-9 rounded-full flex items-center justify-center press"
          style={{ background: '#e5e5e2' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ color: 'var(--text)' }}>
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </motion.button>
        <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text3)' }}>
          {idx + 1} / {session.length}
        </span>
      </div>

      {/* Body */}
      <div className="scroll flex-1 px-4" style={{ display: 'flex', flexDirection: 'column' }}>

        {/* Character */}
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.16 }}
            className="flex flex-col items-center"
            style={{ paddingTop: 28, paddingBottom: 28 }}
          >
            {isA && item?.kanji ? (
              <>
                <div className="font-jp-serif" style={{ fontSize: 112, lineHeight: 1, color: 'var(--text)' }}>
                  {item.kanji.k}
                </div>
                <div style={{ marginTop: 14 }}>
                  <LevelBadge level={item.kanji.level} />
                </div>
              </>
            ) : item?.word ? (
              <>
                <div className="font-jp-serif" style={{ fontSize: 58, lineHeight: 1, color: 'var(--text)' }}>
                  {item.word.w}
                </div>
                <div style={{ marginTop: 14 }}>
                  <LevelBadge level={item.word.l} />
                </div>
              </>
            ) : null}
          </motion.div>
        </AnimatePresence>

        {/* Spacing */}
        <div style={{ height: 24, flexShrink: 0 }} />

        {/* Input fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {fields.map((f, i) => (
            <FieldInput
              key={f.label}
              fieldRef={f.ref}
              label={f.label}
              placeholder={f.placeholder}
              result={f.result}
              answered={answered}
              onEnter={() => !answered && checkAnswer()}
              shakeDelay={i * 0.05}
            />
          ))}
        </div>

        <div style={{ flex: 1, minHeight: 24 }} />
      </div>

      {/* Footer */}
      <div
        className="px-4 py-4"
        style={{
          paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))',
          flexShrink: 0,
        }}
      >
        {!answered ? (
          <button
            onClick={checkAnswer}
            className="w-full py-4 rounded-2xl text-white text-[16px] font-semibold press"
            style={{ background: '#3a3a3c', fontFamily: 'inherit' }}
          >
            Comprobar
          </button>
        ) : (
          <motion.button
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={nextCard}
            className="w-full py-4 rounded-2xl text-white text-[16px] font-semibold press"
            style={{
              background: allCorrect ? 'var(--green)' : '#3a3a3c',
              fontFamily: 'inherit',
            }}
          >
            {idx + 1 < session.length ? 'Siguiente' : 'Ver resultados'}
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────

function FieldInput({
  fieldRef, label, placeholder, result, answered, onEnter, shakeDelay
}: {
  fieldRef: React.RefObject<HTMLInputElement | null>
  label: string
  placeholder: string
  result?: FieldResult
  answered: boolean
  onEnter: () => void
  shakeDelay: number
}) {
  const borderColor = !answered
    ? 'var(--border)'
    : result?.correct ? '#4ade80' : '#f87171'
  const bg = !answered
    ? '#F4F4F1'
    : result?.correct ? '#f0fdf4' : '#fef2f2'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {label}
      </label>
      <input
        ref={fieldRef as React.RefObject<HTMLInputElement>}
        type="text"
        placeholder={placeholder}
        readOnly={answered}
        onKeyDown={e => e.key === 'Enter' && onEnter()}
        className={answered && result && !result.correct ? 'shake' : ''}
        style={{
          width: '100%', padding: '12px 14px',
          borderRadius: 12, border: `1.5px solid ${borderColor}`,
          background: bg, color: 'var(--text)',
          fontSize: 16, fontFamily: 'inherit', outline: 'none',
          animationDelay: `${shakeDelay}s`,
          transition: 'border-color 0.18s ease, background 0.18s ease',
        }}
      />
      {answered && result && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          style={{ fontSize: 13, color: result.correct ? 'var(--green)' : 'var(--red)' }}
        >
          {result.correct ? '✓ Correcto' : `✗ Correcto: ${result.expected}`}
        </motion.div>
      )}
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
      {children}
    </div>
  )
}

function LevelBadge({ level }: { level: JLPTLevel }) {
  const colors: Record<JLPTLevel, string> = {
    N5: 'var(--n5)',
    N4: 'var(--n4)',
    N3: 'var(--n3)',
    N2: 'var(--n2)',
    N1: 'var(--n1)',
  }
  return (
    <span style={{ background: colors[level], color: '#fff', fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 20 }}>
      {level}
    </span>
  )
}
