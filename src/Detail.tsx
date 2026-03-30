import { createPortal } from 'react-dom'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Kanji, JLPTLevel, CompoundWord } from './types'
import { KANJI } from './kanji'

interface Props {
  kanji: Kanji
  unlocked: boolean
  onBack: () => void
  onUnlock: (k: string) => void
  onRemove?: (k: string) => void
  onStar?: (k: string) => void
  onStarWord?: (w: string) => void
  isStarred?: boolean
  isStarredWord?: (w: string) => boolean
  isStarredKanji?: (k: string) => boolean
}

const LEVEL_COLORS: Record<JLPTLevel, { main: string; bg: string }> = {
  N5: { main: 'var(--n5)', bg: 'var(--n5-bg)' },
  N4: { main: 'var(--n4)', bg: 'var(--n4-bg)' },
  N3: { main: 'var(--n3)', bg: 'var(--n3-bg)' },
  N2: { main: 'var(--n2)', bg: 'var(--n2-bg)' },
  N1: { main: 'var(--n1)', bg: 'var(--n1-bg)' },
}

const IOS = { type: 'tween' as const, duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }
const SHEET = { type: 'tween' as const, duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }

function Badge({ level }: { level: JLPTLevel }) {
  const c = LEVEL_COLORS[level]
  return (
    <span style={{
      background: c.main, color: '#fff',
      borderRadius: 20, padding: '6px 16px',
      fontSize: 13, fontWeight: 600, letterSpacing: '0.04em',
      flexShrink: 0, opacity: 0.8,
    }}>
      {level}
    </span>
  )
}

// ── WordRow (compound word row) ─────────────────────────────────────────────
function WordRow({ word, onClick, onStar, starred }: {
  word: CompoundWord; onClick: () => void; onStar?: (w: string) => void; starred?: boolean
}) {
  const lc = LEVEL_COLORS[word.l]
  return (
    <div
      className="flex items-center row-press cursor-pointer relative"
      style={{ background: '#F4F4F1' }}
      onClick={onClick}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 6, background: lc.main }} />
      <div className="font-jp-serif flex-shrink-0"
        style={{ fontSize: 22, lineHeight: 1, paddingLeft: 16, paddingRight: 10, color: 'var(--text)', whiteSpace: 'nowrap' }}>
        {word.w}
      </div>
      <div className="flex-1 min-w-0 py-3 pr-1">
        <div style={{ fontSize: 15, color: 'var(--text)' }} className="truncate">{word.m}</div>
        <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 3 }}>{word.f}</div>
      </div>
      {onStar ? (
        <button
          onClick={e => { e.stopPropagation(); onStar(word.w) }}
          className="flex items-center justify-center flex-shrink-0 press"
          style={{ width: 44, height: '100%', minHeight: 44, background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginRight: 10 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24"
            fill={starred ? 'currentColor' : 'none'}
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ color: starred ? 'var(--text)' : 'var(--text3)' }}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </button>
      ) : (
        <div style={{ width: 14 }} />
      )}
    </div>
  )
}

// ── WordSheet (bottom sheet, portal) ─────────────────────────────────────────
function WordSheet({ word, onClose, isStarredWord, isStarredKanji, onStarWord, onStarKanji }: {
  word: CompoundWord
  onClose: () => void
  isStarredWord?: (w: string) => boolean
  isStarredKanji?: (k: string) => boolean
  onStarWord?: (w: string) => void
  onStarKanji?: (k: string) => void
}) {
  const chars = [...word.w]
  const found = chars.map(c => KANJI.find(k => k.k === c)).filter((k): k is Kanji => Boolean(k))

  return createPortal(
    <>
      {/* Backdrop */}
      <motion.div
        style={{ position: 'fixed', inset: 0, zIndex: 55, background: 'rgba(0,0,0,0.32)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        onClick={onClose}
      />

      {/* Sheet panel */}
      <motion.div
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 60,
          background: '#F4F4F1',
          borderRadius: '20px 20px 0 0',
          maxHeight: '75%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={SHEET}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--border)' }} />
        </div>

        {/* Word header */}
        <div className="flex items-center relative" style={{ background: '#F4F4F1' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 6, background: LEVEL_COLORS[word.l].main }} />
          <div className="font-jp-serif flex-shrink-0"
            style={{ fontSize: 38, lineHeight: 1, paddingLeft: 16, paddingRight: 10, paddingTop: 16, paddingBottom: 16, color: 'var(--text)', whiteSpace: 'nowrap' }}>
            {word.w}
          </div>
          <div className="flex-1 min-w-0 py-3 pr-2">
            <div style={{ fontSize: 15, color: 'var(--text)', fontWeight: 500, fontFamily: 'inherit' }}>{word.m}</div>
            <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 3 }}>{word.f}</div>
          </div>
          {onStarWord ? (
            <button
              onClick={e => { e.stopPropagation(); onStarWord(word.w) }}
              className="flex items-center justify-center flex-shrink-0 press"
              style={{ width: 44, height: '100%', minHeight: 44, background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginRight: 10 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24"
                fill={isStarredWord?.(word.w) ? 'currentColor' : 'none'}
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ color: isStarredWord?.(word.w) ? 'var(--text)' : 'var(--text3)' }}>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </button>
          ) : (
            <div style={{ width: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginRight: 10 }}>
              <svg width="20" height="20" viewBox="0 0 24 24"
                fill={isStarredWord?.(word.w) ? 'currentColor' : 'none'}
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ color: isStarredWord?.(word.w) ? 'var(--text)' : 'var(--text3)', opacity: isStarredWord?.(word.w) ? 1 : 0.35 }}>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
          )}
        </div>

        {/* Kanji breakdown */}
        {found.length > 0 && (
          <div className="scroll flex-1" style={{ paddingBottom: '24px' }}>
            <div style={{
              fontSize: 10, fontWeight: 400, color: 'var(--text3)',
              textTransform: 'uppercase', letterSpacing: '0.05em',
              padding: '14px 16px 6px',
            }}>
              KANJIS que lo forman
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {found.map(k => {
                const lc = LEVEL_COLORS[k.level]
                const kStarred = isStarredKanji?.(k.k)
                return (
                  <div key={k.k} className="flex items-center relative" style={{ background: '#F4F4F1' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 6, background: lc.main }} />
                    <div className="font-jp-serif text-center flex-shrink-0"
                      style={{ fontSize: 34, lineHeight: 1, width: 64, paddingLeft: 16, color: 'var(--text)' }}>
                      {k.k}
                    </div>
                    <div className="flex-1 min-w-0 py-2 pr-3" style={{ paddingLeft: 10 }}>
                      <div style={{ fontSize: 15, color: 'var(--text)' }} className="truncate">
                        {k.meanings.join(', ')}
                      </div>
                      <div className="flex items-center flex-wrap gap-x-3 mt-1"
                        style={{ fontSize: 12, color: 'var(--text3)' }}>
                        {k.kun.length > 0 && (
                          <span>
                            <span style={{ textTransform: 'uppercase', fontSize: 10, letterSpacing: '0.05em', marginRight: 3 }}>kun</span>
                            <span style={{ color: 'var(--text2)' }}>{k.kun.slice(0, 2).join('・')}</span>
                          </span>
                        )}
                        {k.on.length > 0 && (
                          <span>
                            <span style={{ textTransform: 'uppercase', fontSize: 10, letterSpacing: '0.05em', marginRight: 3 }}>on</span>
                            <span style={{ color: 'var(--text2)' }}>{k.on.slice(0, 2).join('・')}</span>
                          </span>
                        )}
                      </div>
                    </div>
                    {onStarKanji ? (
                      <button
                        onClick={e => { e.stopPropagation(); onStarKanji(k.k) }}
                        className="flex items-center justify-center flex-shrink-0 press"
                        style={{ width: 44, height: '100%', minHeight: 44, background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginRight: 10 }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24"
                          fill={kStarred ? 'currentColor' : 'none'}
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          style={{ color: kStarred ? 'var(--text)' : 'var(--text3)' }}>
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </button>
                    ) : (
                      <div style={{ width: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginRight: 10 }}>
                        <svg width="20" height="20" viewBox="0 0 24 24"
                          fill={kStarred ? 'currentColor' : 'none'}
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          style={{ color: kStarred ? 'var(--text)' : 'var(--text3)', opacity: kStarred ? 1 : 0.35 }}>
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </motion.div>
    </>,
    document.body
  )
}

// ── Detail ──────────────────────────────────────────────────────────────────
export default function Detail({
  kanji, unlocked, onBack, onUnlock, onRemove, onStar, onStarWord,
  isStarred, isStarredWord, isStarredKanji,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [selectedWord, setSelectedWord] = useState<CompoundWord | null>(null)
  const [snackbar, setSnackbar] = useState('')
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false)
  const [animating, setAnimating] = useState(true)

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0)
    setSelectedWord(null)
    setShowRemoveConfirm(false)
  }, [kanji.k])

  function showSnack(msg: string) {
    setSnackbar(msg)
    setTimeout(() => setSnackbar(''), 2400)
  }

  function handleStarWord(w: string) {
    const alreadyStarred = isStarredWord?.(w) ?? false
    onStarWord?.(w)
    showSnack(alreadyStarred ? `${w} quitado de "Importantes"` : `${w} añadido a "Importantes"`)
  }

  function handleStarKanji(k: string) {
    const alreadyStarred = isStarredKanji?.(k) ?? false
    onStar?.(k)
    showSnack(alreadyStarred ? `${k} quitado de "Importantes"` : `${k} añadido a "Importantes"`)
  }

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
        className="flex items-center justify-between px-4"
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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ color: 'var(--text)' }}>
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </motion.button>

        {/* Right side buttons */}
        {!unlocked ? (
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => { onUnlock(kanji.k); showSnack(`${kanji.k} añadido a "Mi lista"`) }}
            className="w-9 h-9 rounded-full flex items-center justify-center press"
            style={{ background: '#e5e5e2' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
              style={{ color: 'var(--text)' }}>
              <path d="M12 5v14M5 12h14"/>
            </svg>
          </motion.button>
        ) : (onRemove || onStar) && (
          <div className="flex items-center gap-3">
            {onRemove && (
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={() => setShowRemoveConfirm(true)}
                className="w-9 h-9 rounded-full flex items-center justify-center press"
                style={{ background: '#e5e5e2' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                  style={{ color: 'var(--text)' }}>
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </motion.button>
            )}
            {onStar && (
              <button
                onClick={() => { onStar(kanji.k); showSnack(isStarred ? `${kanji.k} quitado de "Importantes"` : `${kanji.k} añadido a "Importantes"`) }}
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: '#e5e5e2', border: 'none', cursor: 'pointer' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24"
                  fill={isStarred ? 'var(--text)' : 'none'}
                  stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Scrollable content */}
      <div ref={scrollRef} className="scroll flex-1" style={{ touchAction: 'pan-y' }}>

        {/* Hero */}
        <div className="text-center px-6 pt-7 pb-6">
          <div
            className="font-jp-serif leading-none mb-5"
            style={{ fontSize: 100, color: 'var(--text)' }}
          >
            {kanji.k}
          </div>
          <span style={{ fontSize: 18, color: 'var(--text)', fontWeight: 300, fontFamily: 'inherit' }}>
            {kanji.meanings.join(' · ')}
          </span>
          <div className="flex justify-center mt-3">
            <Badge level={kanji.level} />
          </div>
        </div>

        {/* Readings */}
        <div style={{ padding: '18px 16px' }}>
          <div className="flex flex-col gap-4">
            <div className="flex items-baseline gap-3">
              <span style={{
                fontSize: 10, fontWeight: 400, color: 'var(--text3)',
                textTransform: 'uppercase', letterSpacing: '0.05em',
                minWidth: 68, flexShrink: 0,
              }}>
                KUN
              </span>
              <span style={{ fontSize: 18, color: 'var(--text)', letterSpacing: '0.04em' }}>
                {kanji.kun.length === 0 ? <span style={{ color: 'var(--text3)' }}>—</span> : kanji.kun.join('・')}
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <span style={{
                fontSize: 10, fontWeight: 400, color: 'var(--text3)',
                textTransform: 'uppercase', letterSpacing: '0.05em',
                minWidth: 68, flexShrink: 0,
              }}>
                ON
              </span>
              <span style={{ fontSize: 18, color: 'var(--text)', letterSpacing: '0.04em' }}>
                {kanji.on.length === 0 ? <span style={{ color: 'var(--text3)' }}>—</span> : kanji.on.join('・')}
              </span>
            </div>
          </div>
        </div>

        {/* Compound words */}
        <div style={{ paddingTop: 16 }}>
          <div style={{
            fontSize: 10, fontWeight: 400, color: 'var(--text3)',
            textTransform: 'uppercase', letterSpacing: '0.05em',
            paddingLeft: 16, paddingBottom: 8,
          }}>
            Palabras compuestas
          </div>
          {kanji.words.length === 0
            ? <p style={{ fontSize: 14, color: 'var(--text3)', padding: '8px 16px' }}>Sin palabras disponibles</p>
            : <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {kanji.words.map((w, i) => (
                  <WordRow key={i} word={w} onClick={() => setSelectedWord(w)}
                    onStar={onStarWord ? handleStarWord : undefined}
                    starred={isStarredWord?.(w.w)} />
                ))}
              </div>
          }
        </div>

        <div style={{ height: 36 }} />
      </div>

      {/* Remove confirm sheet */}
      <AnimatePresence>
        {showRemoveConfirm && (
          <>
            <motion.div
              className="absolute inset-0 z-[80]"
              style={{ background: 'rgba(0,0,0,0.4)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setShowRemoveConfirm(false)}
            />
            <motion.div
              className="absolute z-[81] left-0 right-0 bottom-0"
              style={{
                background: '#F4F4F1',
                borderRadius: '20px 20px 0 0',
                overflow: 'hidden',
              }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={SHEET}
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--border)' }} />
              </div>
              <div style={{ padding: '14px 20px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: 17, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>
                  ¿Quitar de mi lista?
                </div>
                <div style={{ fontSize: 14, color: 'var(--text3)', lineHeight: 1.4 }}>
                  {kanji.k} volverá a la pantalla "Añadir kanji".
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', padding: '8px 14px 20px', gap: 8 }}>
                <motion.button
                  whileTap={{ backgroundColor: '#2a2a2c' }}
                  onClick={() => { setShowRemoveConfirm(false); onRemove?.(kanji.k); showSnack(`${kanji.k} quitado de "Mi lista"`) }}
                  style={{
                    width: '100%', padding: '14px', borderRadius: 12,
                    background: '#3a3a3c', color: '#fff',
                    fontSize: 16, fontWeight: 600, fontFamily: 'inherit',
                    border: 'none', cursor: 'pointer',
                  }}
                >
                  Quitar de mi lista
                </motion.button>
                <motion.button
                  whileTap={{ backgroundColor: '#d0d0cd' }}
                  onClick={() => setShowRemoveConfirm(false)}
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

      {/* Snackbar */}
      <AnimatePresence>
        {snackbar && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ type: 'spring', damping: 30, stiffness: 380 }}
            style={{
              position: 'absolute', bottom: 'calc(20px + env(safe-area-inset-bottom))',
              left: 16, right: 16, zIndex: 62,
              background: '#1c1c1e', color: '#fff', borderRadius: 12,
              padding: '16px 16px', fontSize: 14, textAlign: 'left',
              pointerEvents: 'none',
            }}
          >
            {snackbar}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom sheet */}
      <AnimatePresence>
        {selectedWord && (
          <WordSheet
            word={selectedWord}
            onClose={() => setSelectedWord(null)}
            isStarredWord={isStarredWord}
            isStarredKanji={isStarredKanji}
            onStarWord={onStarWord ? handleStarWord : undefined}
            onStarKanji={onStar ? handleStarKanji : undefined}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
