import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { SessionItem, JLPTLevel, PracticeMode } from './types'

const IOS   = { type: 'tween' as const, duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }
const SHEET = { type: 'tween' as const, duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }

interface FieldResult { autoCorrect: boolean; expected: string }

interface Props {
  session: SessionItem[]
  mode: PracticeMode
  onClose: () => void
  onRestart: () => void
}

function norm(s: string) {
  return s.toLowerCase().replace(/\s/g, '')
}

export default function PracticeSession({ session, mode, onClose, onRestart }: Props) {
  const [phase,    setPhase]    = useState<'session' | 'results'>('session')
  const [idx,      setIdx]      = useState(0)
  const [correct,  setCorrect]  = useState(0)
  const [answered, setAnswered] = useState(false)
  const [results,  setResults]  = useState<FieldResult[]>([])
  const [userEvals, setUserEvals] = useState<(boolean | undefined)[]>([])
  const [animating,       setAnimating]       = useState(true)
  const [showStopConfirm, setShowStopConfirm] = useState(false)

  const onRef   = useRef<HTMLInputElement>(null)
  const kunRef  = useRef<HTMLInputElement>(null)
  const meanRef = useRef<HTMLInputElement>(null)
  const furiRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setIdx(0)
    setCorrect(0)
    setAnswered(false)
    setResults([])
    setUserEvals([])
    setPhase('session')
    if (onRef.current)   onRef.current.value   = ''
    if (kunRef.current)  kunRef.current.value  = ''
    if (meanRef.current) meanRef.current.value = ''
    if (furiRef.current) furiRef.current.value = ''
    setTimeout(() => (mode === 'A' ? meanRef : furiRef).current?.focus(), 100)
  }, [session])

  function checkAnswer() {
    if (answered) return
    const item = session[idx]
    const fieldResults: FieldResult[] = []

    if (item.type === 'A' && item.kanji) {
      const k = item.kanji
      const onVal   = onRef.current?.value   ?? ''
      const kunVal  = kunRef.current?.value  ?? ''
      const meanVal = meanRef.current?.value ?? ''

      const meanOk = norm(meanVal).length > 0 && k.meanings.some(m =>
        norm(m).includes(norm(meanVal)) || norm(meanVal).includes(norm(m))
      )
      const kunOk  = k.kun.length === 0 || k.kun.some(r => norm(r) === norm(kunVal))
      const onOk   = k.on.length  === 0 || k.on.some(r  => norm(r) === norm(onVal))

      fieldResults.push({ autoCorrect: meanOk, expected: k.meanings.join(', ') })
      fieldResults.push({ autoCorrect: kunOk,  expected: k.kun.join('、')      || '—' })
      fieldResults.push({ autoCorrect: onOk,   expected: k.on.join('、')       || '—' })

    } else if (item.type === 'B' && item.word) {
      const w = item.word
      const furiVal = furiRef.current?.value ?? ''
      const meanVal = meanRef.current?.value ?? ''

      const furiOk = norm(w.f) === norm(furiVal)
      const meanOk = norm(meanVal).length > 0 && (norm(w.m).includes(norm(meanVal)) || norm(meanVal).includes(norm(w.m)))

      fieldResults.push({ autoCorrect: furiOk, expected: w.f })
      fieldResults.push({ autoCorrect: meanOk, expected: w.m })
    }

    setResults(fieldResults)
    setUserEvals(new Array(fieldResults.length).fill(undefined))
    setAnswered(true)
  }

  function setUserEval(i: number, val: boolean) {
    setUserEvals(prev => prev.map((v, j) => j === i ? val : v))
  }

  function nextCard() {
    const cardCorrect = results.every((r, i) => r.autoCorrect || userEvals[i] === true)
    if (cardCorrect) setCorrect(c => c + 1)

    if (idx + 1 >= session.length) {
      setPhase('results')
    } else {
      setIdx(i => i + 1)
      setAnswered(false)
      setResults([])
      setUserEvals([])
      if (onRef.current)   onRef.current.value   = ''
      if (kunRef.current)  kunRef.current.value  = ''
      if (meanRef.current) meanRef.current.value = ''
      if (furiRef.current) furiRef.current.value = ''
      setTimeout(() => (mode === 'A' ? meanRef : furiRef).current?.focus(), 80)
    }
  }

  const item        = session[idx]
  const progressPct = session.length > 0 ? (idx / session.length) * 100 : 0
  const isA         = item?.type === 'A'

  const canProceed = answered && results.length > 0 &&
    results.every((r, i) => r.autoCorrect || userEvals[i] !== undefined)
  const allCorrect = canProceed &&
    results.every((r, i) => r.autoCorrect || userEvals[i] === true)

  const fields = isA
    ? [
        { ref: meanRef, label: 'Significado', result: results[0], userEval: userEvals[0], onSelfEval: (v: boolean) => setUserEval(0, v) },
        { ref: kunRef,  label: 'Lectura KUN', result: results[1], userEval: userEvals[1], onSelfEval: (v: boolean) => setUserEval(1, v) },
        { ref: onRef,   label: 'Lectura ON',  result: results[2], userEval: userEvals[2], onSelfEval: (v: boolean) => setUserEval(2, v) },
      ]
    : [
        { ref: furiRef, label: 'Furigana',    result: results[0], userEval: userEvals[0], onSelfEval: (v: boolean) => setUserEval(0, v) },
        { ref: meanRef, label: 'Significado', result: results[1], userEval: userEvals[1], onSelfEval: (v: boolean) => setUserEval(1, v) },
      ]

  const pct   = session.length > 0 ? Math.round((correct / session.length) * 100) : 0
  const emoji = pct >= 80 ? '🎉' : pct >= 50 ? '💪' : '📚'

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: '#F4F4F1', pointerEvents: animating ? 'none' : 'auto' }}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={IOS}
      onAnimationComplete={() => setAnimating(false)}
    >
      {phase === 'results' ? (
        /* ── RESULTS ── */
        <motion.div
          key="results"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center h-full px-8 text-center"
          style={{ gap: 16 }}
        >
          <div style={{ fontSize: 64 }}>{emoji}</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--text)' }}>
            {pct >= 80 ? '¡Excelente!' : pct >= 50 ? '¡Buen trabajo!' : '¡Sigue practicando!'}
          </div>
          <div style={{ fontSize: 18, color: 'var(--text2)' }}>
            {correct} de {session.length} correctas ({pct}%)
          </div>
          <button
            onClick={onRestart}
            className="w-full py-4 rounded-2xl text-white text-[16px] font-semibold press"
            style={{ background: '#3a3a3c', fontFamily: 'inherit', marginTop: 16 }}
          >
            Otra sesión
          </button>
          <button
            onClick={onClose}
            className="w-full py-4 rounded-2xl text-[16px] press"
            style={{ background: '#e5e5e2', color: 'var(--text)', border: 'none', fontFamily: 'inherit' }}
          >
            Volver
          </button>
        </motion.div>
      ) : (
        /* ── SESSION ── */
        <>
          {/* Thin progress bar */}
          <div style={{ height: 3, background: 'var(--border)', flexShrink: 0 }}>
            <motion.div
              style={{ height: '100%', background: '#3a3a3c' }}
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
              onClick={() => setShowStopConfirm(true)}
              className="w-9 h-9 rounded-full flex items-center justify-center press"
              style={{ background: '#e5e5e2' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ color: 'var(--text)' }}>
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </motion.button>
            <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text3)' }}>
              {idx + 1} / {session.length}
            </span>
          </div>

          {/* Body */}
          <div className="scroll flex-1 px-4" style={{ display: 'flex', flexDirection: 'column' }}>
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
                    <div style={{ marginTop: 24 }}>
                      <LevelBadge level={item.kanji.level} />
                    </div>
                  </>
                ) : item?.word ? (
                  <>
                    <div className="font-jp-serif" style={{ fontSize: 58, lineHeight: 1, color: 'var(--text)' }}>
                      {item.word.w}
                    </div>
                    <div style={{ marginTop: 24 }}>
                      <LevelBadge level={item.word.l} />
                    </div>
                  </>
                ) : null}
              </motion.div>
            </AnimatePresence>

            <div style={{ height: 24, flexShrink: 0 }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {fields.map((f, i) => (
                <FieldInput
                  key={f.label}
                  fieldRef={f.ref}
                  label={f.label}
                  result={f.result}
                  userEval={f.userEval}
                  onSelfEval={f.onSelfEval}
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
              <motion.button
                whileTap={{ backgroundColor: '#2a2a2c' }}
                onClick={checkAnswer}
                className="w-full py-4 rounded-2xl text-white text-[16px] font-semibold press"
                style={{ background: '#3a3a3c', fontFamily: 'inherit' }}
              >
                Comprobar
              </motion.button>
            ) : (
              <motion.button
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: canProceed ? 1 : 0.35, y: 0 }}
                whileTap={canProceed ? { backgroundColor: '#2a2a2c' } : undefined}
                onClick={canProceed ? nextCard : undefined}
                className="w-full py-4 rounded-2xl text-white text-[16px] font-semibold press"
                style={{
                  background: allCorrect ? 'var(--green)' : '#3a3a3c',
                  fontFamily: 'inherit',
                  cursor: canProceed ? 'pointer' : 'default',
                }}
              >
                {idx + 1 < session.length ? 'Siguiente' : 'Ver resultados'}
              </motion.button>
            )}
          </div>
        </>
      )}

      {/* Stop confirm sheet */}
      <AnimatePresence>
        {showStopConfirm && (
          <>
            <motion.div
              className="absolute inset-0 z-[80]"
              style={{ background: 'rgba(0,0,0,0.4)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setShowStopConfirm(false)}
            />
            <motion.div
              className="absolute z-[81] left-0 right-0 bottom-0"
              style={{
                background: '#F4F4F1',
                borderRadius: '20px 20px 0 0',
                paddingBottom: 'env(safe-area-inset-bottom)',
                overflow: 'hidden',
              }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={SHEET}
            >
              <div className="flex justify-center pt-3 pb-1">
                <div style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--border)' }} />
              </div>
              <div style={{ padding: '14px 20px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: 17, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>
                  ¿Abandonar la sesión?
                </div>
                <div style={{ fontSize: 14, color: 'var(--text3)', lineHeight: 1.4 }}>
                  Perderás el progreso de esta sesión
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', padding: '8px 14px 20px', gap: 8 }}>
                <motion.button
                  whileTap={{ backgroundColor: '#2a2a2c' }}
                  onClick={() => { setShowStopConfirm(false); onClose() }}
                  style={{
                    width: '100%', padding: '14px', borderRadius: 12,
                    background: '#3a3a3c', color: '#fff',
                    fontSize: 16, fontWeight: 600, fontFamily: 'inherit',
                    border: 'none', cursor: 'pointer',
                  }}
                >
                  Abandonar
                </motion.button>
                <motion.button
                  whileTap={{ backgroundColor: '#d0d0cd' }}
                  onClick={() => setShowStopConfirm(false)}
                  style={{
                    width: '100%', padding: '14px', borderRadius: 12,
                    background: '#e5e5e2', color: 'var(--text)',
                    fontSize: 16, fontWeight: 500, fontFamily: 'inherit',
                    border: 'none', cursor: 'pointer',
                  }}
                >
                  Cancelar
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Sub-components ─────────────────────────────────────────────────────────

function FieldInput({
  fieldRef, label, result, userEval, onSelfEval, answered, onEnter, shakeDelay
}: {
  fieldRef: React.RefObject<HTMLInputElement | null>
  label: string
  result?: FieldResult
  userEval?: boolean
  onSelfEval?: (v: boolean) => void
  answered: boolean
  onEnter: () => void
  shakeDelay: number
}) {
  const needsSelfEval = answered && result && !result.autoCorrect
  const isResolved    = needsSelfEval && userEval !== undefined

  const borderColor = !answered
    ? 'var(--border)'
    : (result?.autoCorrect || userEval === true) ? '#4ade80'
    : userEval === false ? '#f87171'
    : '#f87171'

  const bg = !answered
    ? '#F4F4F1'
    : (result?.autoCorrect || userEval === true) ? '#f0fdf4'
    : userEval === false ? '#fef2f2'
    : '#fef2f2'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {label}
      </label>
      <input
        ref={fieldRef as React.RefObject<HTMLInputElement>}
        type="text"
        readOnly={answered}
        onKeyDown={e => e.key === 'Enter' && onEnter()}
        className={answered && result && !result.autoCorrect && userEval !== true ? 'shake' : ''}
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
          style={{ display: 'flex', flexDirection: 'column', gap: 6 }}
        >
          {result.autoCorrect ? (
            <span style={{ fontSize: 13, color: 'var(--green)' }}>✓ Correcto</span>
          ) : (
            <>
              <span style={{ fontSize: 13, color: 'var(--text3)' }}>
                Respuesta: <span style={{ color: 'var(--text)', fontWeight: 600 }}>{result.expected}</span>
              </span>
              {!isResolved ? (
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => onSelfEval?.(true)}
                    style={{
                      flex: 1, padding: '8px 0', borderRadius: 10,
                      background: '#f0fdf4', border: '1.5px solid #4ade80',
                      color: '#16a34a', fontSize: 13, fontWeight: 600,
                      fontFamily: 'inherit', cursor: 'pointer',
                    }}
                  >
                    ✓ Lo sabía
                  </button>
                  <button
                    onClick={() => onSelfEval?.(false)}
                    style={{
                      flex: 1, padding: '8px 0', borderRadius: 10,
                      background: '#fef2f2', border: '1.5px solid #f87171',
                      color: '#dc2626', fontSize: 13, fontWeight: 600,
                      fontFamily: 'inherit', cursor: 'pointer',
                    }}
                  >
                    ✗ No lo sabía
                  </button>
                </div>
              ) : (
                <span style={{ fontSize: 13, color: userEval ? 'var(--green)' : 'var(--red)' }}>
                  {userEval ? '✓ Marcado como correcto' : '✗ Marcado como incorrecto'}
                </span>
              )}
            </>
          )}
        </motion.div>
      )}
    </div>
  )
}

function LevelBadge({ level }: { level: JLPTLevel }) {
  const colors: Record<JLPTLevel, string> = {
    N5: 'var(--n5)', N4: 'var(--n4)', N3: 'var(--n3)', N2: 'var(--n2)', N1: 'var(--n1)',
  }
  return (
    <span style={{ background: colors[level], color: '#fff', fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 20 }}>
      {level}
    </span>
  )
}
