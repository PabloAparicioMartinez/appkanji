import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Kanji, JLPTLevel, SessionItem } from './types'

interface Props { visible: Kanji[] }

type Phase = 'setup' | 'session' | 'results'
type FilterLevel = JLPTLevel | 'all'
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

export default function Practice({ visible }: Props) {
  const [phase, setPhase] = useState<Phase>('setup')

  // Setup state
  const [mode,  setMode]  = useState<Mode>('A')
  const [level, setLevel] = useState<FilterLevel>('all')
  const [count, setCount] = useState(20)

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

  const pool = visible.filter(k => level === 'all' || k.level === level)

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
    <div className="flex flex-col h-full">
      <div
        className="px-4 py-4 border-b"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)', paddingTop: 'calc(1rem + env(safe-area-inset-top))' }}
      >
        <h1 style={{ fontSize: 22, fontWeight: 500, color: 'var(--text)' }}>Practicar</h1>
      </div>
      <div className="scroll flex-1 px-4 py-5" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Mode */}
        <div>
          <SectionLabel>Modo</SectionLabel>
          {([
            { id: 'A' as Mode, title: 'Flashcard de Kanji', desc: 'Ve un kanji y escribe su lectura y significado' },
            { id: 'B' as Mode, title: 'Palabras compuestas', desc: 'Ve una palabra y escribe su furigana y significado' },
          ]).map(m => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className="w-full text-left px-4 py-4 rounded-xl border mb-2 press"
              style={{
                background: mode === m.id ? '#f8f8f8' : 'var(--surface)',
                borderColor: mode === m.id ? 'var(--text)' : 'var(--border)',
                fontFamily: 'inherit',
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--text)' }}>{m.title}</div>
              <div style={{ fontSize: 13, color: 'var(--text3)', marginTop: 2 }}>{m.desc}</div>
            </button>
          ))}
        </div>

        {/* Level */}
        <div>
          <SectionLabel>Nivel</SectionLabel>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {(['all', 'N5', 'N4', 'N3'] as const).map(l => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className="px-4 py-2 rounded-full border text-[14px] press"
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
        </div>

        {/* Count */}
        <div>
          <SectionLabel>Tarjetas por sesión</SectionLabel>
          <div style={{ display: 'flex', gap: 8 }}>
            {[10, 20, 30].map(c => (
              <button
                key={c}
                onClick={() => setCount(c)}
                className="px-5 py-2 rounded-full border text-[14px] press"
                style={{
                  background: count === c ? 'var(--text)' : 'var(--surface2)',
                  color:      count === c ? '#fff' : 'var(--text2)',
                  borderColor: count === c ? 'var(--text)' : 'var(--border)',
                  fontFamily: 'inherit',
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {pool.length === 0 && (
          <p style={{ fontSize: 14, color: 'var(--text3)', textAlign: 'center' }}>
            No hay kanji para este nivel. Añade kanji N3 primero.
          </p>
        )}

        <button
          onClick={startSession}
          disabled={pool.length === 0}
          className="w-full py-4 rounded-xl text-white text-[16px] font-medium press"
          style={{ background: 'var(--text)', fontFamily: 'inherit', opacity: pool.length === 0 ? 0.4 : 1 }}
        >
          Empezar sesión
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
        style={{ gap: 16 }}
      >
        <div style={{ fontSize: 64 }}>{emoji}</div>
        <div style={{ fontSize: 28, fontWeight: 500, color: 'var(--text)' }}>
          {pct >= 80 ? '¡Excelente!' : pct >= 50 ? '¡Buen trabajo!' : '¡Sigue practicando!'}
        </div>
        <div style={{ fontSize: 18, color: 'var(--text2)' }}>
          {correct} de {session.length} correctas ({pct}%)
        </div>
        <button
          onClick={startSession}
          className="w-full py-4 rounded-xl text-white text-[16px] font-medium press"
          style={{ background: 'var(--text)', fontFamily: 'inherit', marginTop: 16 }}
        >
          Otra sesión
        </button>
        <button
          onClick={() => setPhase('setup')}
          className="w-full py-4 rounded-xl text-[16px] press"
          style={{ background: 'var(--surface2)', color: 'var(--text)', border: '1px solid var(--border)', fontFamily: 'inherit' }}
        >
          Volver
        </button>
      </motion.div>
    )
  }

  // ── SESSION ──────────────────────────────────────────────────────────────
  const item = session[idx]
  const pct  = (idx / session.length) * 100
  const isA  = item?.type === 'A'
  const allCorrect = results.length > 0 && results.every(r => r.correct)

  const fields = isA
    ? [
        { ref: onRef,   label: 'Lectura ON (katakana)', placeholder: 'ej: ニチ',    result: results[0] },
        { ref: kunRef,  label: 'Lectura KUN (hiragana)', placeholder: 'ej: ひ',     result: results[1] },
        { ref: meanRef, label: 'Significado en español', placeholder: 'ej: sol, día', result: results[2] },
      ]
    : [
        { ref: furiRef, label: 'Furigana (lectura)',    placeholder: 'ej: にほんご', result: results[0] },
        { ref: meanRef, label: 'Significado en español', placeholder: 'ej: japonés', result: results[1] },
      ]

  return (
    <div className="flex flex-col h-full">
      {/* Progress header */}
      <div
        className="flex items-center gap-3 px-4 py-3 border-b"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)', paddingTop: 'calc(0.75rem + env(safe-area-inset-top))' }}
      >
        <button onClick={() => setPhase('setup')} className="press" style={{ color: 'var(--n4)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <div className="flex-1 rounded-full overflow-hidden" style={{ height: 4, background: 'var(--border)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'var(--text)' }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div style={{ fontSize: 13, color: 'var(--text3)', whiteSpace: 'nowrap' }}>{idx + 1}/{session.length}</div>
      </div>

      {/* Body */}
      <div className="scroll flex-1 px-4 py-6" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Kanji / Word card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18 }}
          >
            {isA && item?.kanji ? (
              <div
                className="text-center py-8 px-4 rounded-2xl border"
                style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
              >
                <LevelBadge level={item.kanji.level} />
                <div className="font-jp-serif" style={{ fontSize: 100, lineHeight: 1, color: 'var(--text)', marginTop: 8 }}>
                  {item.kanji.k}
                </div>
              </div>
            ) : item?.word ? (
              <div
                className="text-center py-8 px-4 rounded-2xl border"
                style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
              >
                <div className="font-jp-serif" style={{ fontSize: 52, lineHeight: 1, color: 'var(--text)' }}>
                  {item.word.w}
                </div>
                <div style={{ marginTop: 12 }}>
                  <LevelBadge level={item.word.l} />
                </div>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>

        {/* Input fields */}
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

      {/* Footer button */}
      <div
        className="px-4 py-4 border-t"
        style={{
          background: 'var(--surface)',
          borderColor: 'var(--border)',
          paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))',
        }}
      >
        {!answered ? (
          <button
            onClick={checkAnswer}
            className="w-full py-4 rounded-xl text-white text-[16px] font-medium press"
            style={{ background: 'var(--text)', fontFamily: 'inherit' }}
          >
            Comprobar
          </button>
        ) : (
          <motion.button
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={nextCard}
            className="w-full py-4 rounded-xl text-white text-[16px] font-medium press"
            style={{
              background: allCorrect ? 'var(--green)' : '#444',
              fontFamily: 'inherit',
            }}
          >
            {idx + 1 < session.length ? 'Siguiente →' : 'Ver resultados'}
          </motion.button>
        )}
      </div>
    </div>
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
    ? 'var(--surface)'
    : result?.correct ? '#f0fdf4' : '#fef2f2'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text2)' }}>{label}</label>
      <input
        ref={fieldRef as React.RefObject<HTMLInputElement>}
        type="text"
        placeholder={placeholder}
        readOnly={answered}
        onKeyDown={e => e.key === 'Enter' && onEnter()}
        className={answered && result && !result.correct ? 'shake' : ''}
        style={{
          width: '100%', padding: '12px 14px',
          borderRadius: 12, border: `1px solid ${borderColor}`,
          background: bg, color: 'var(--text)',
          fontSize: 15, fontFamily: 'inherit', outline: 'none',
          animationDelay: `${shakeDelay}s`,
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
    <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
      {children}
    </div>
  )
}

function LevelBadge({ level }: { level: JLPTLevel }) {
  const styles: Record<JLPTLevel, { bg: string; color: string }> = {
    N5: { bg: 'var(--n5-bg)', color: 'var(--n5)' },
    N4: { bg: 'var(--n4-bg)', color: 'var(--n4)' },
    N3: { bg: 'var(--n3-bg)', color: 'var(--n3)' },
  }
  const s = styles[level]
  return (
    <span style={{ background: s.bg, color: s.color, fontSize: 11, fontWeight: 500, padding: '2px 8px', borderRadius: 10 }}>
      {level}
    </span>
  )
}
