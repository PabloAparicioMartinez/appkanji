import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Kanji, JLPTLevel, CompoundWord } from './types'
import { KANJI } from './kanji'

interface Props {
  kanji: Kanji
  unlocked: boolean
  onBack: () => void
  onUnlock: (k: string) => void
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
      borderRadius: 20, padding: '5px 14px',
      fontSize: 12, fontWeight: 600, letterSpacing: '0.04em',
      flexShrink: 0,
    }}>
      {level}
    </span>
  )
}

// ── WordRow (compound word row, like KanjiRow in Lista) ────────────────────
function WordRow({ word, onClick }: { word: CompoundWord; onClick: () => void }) {
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
      <div className="flex-1 min-w-0 py-3 pr-2">
        <div style={{ fontSize: 15, color: 'var(--text)' }} className="truncate">{word.m}</div>
        <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 3 }}>{word.f}</div>
      </div>
      <div style={{ width: 14 }} />
    </div>
  )
}

// ── WordSheet (bottom sheet) ───────────────────────────────────────────────
function WordSheet({ word, onClose }: { word: CompoundWord; onClose: () => void }) {
  const chars = [...word.w]
  const found = chars.map(c => KANJI.find(k => k.k === c)).filter((k): k is Kanji => Boolean(k))

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{ background: 'rgba(0,0,0,0.32)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        onClick={onClose}
      />

      {/* Sheet panel */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-20 flex flex-col"
        style={{
          background: '#F4F4F1',
          borderRadius: '20px 20px 0 0',
          maxHeight: '75%',
          paddingBottom: 'env(safe-area-inset-bottom)',
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

        {/* Word header — Lista row style */}
        <div className="flex items-center relative" style={{ background: '#F4F4F1' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 6, background: LEVEL_COLORS[word.l].main }} />
          <div className="font-jp-serif flex-shrink-0"
            style={{ fontSize: 38, lineHeight: 1, paddingLeft: 16, paddingRight: 10, paddingTop: 16, paddingBottom: 16, color: 'var(--text)', whiteSpace: 'nowrap' }}>
            {word.w}
          </div>
          <div className="flex-1 min-w-0 py-3 pr-3">
            <div style={{ fontSize: 15, color: 'var(--text)', fontWeight: 500, fontFamily: 'inherit' }}>{word.m}</div>
            <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 3 }}>{word.f}</div>
          </div>
          <Badge level={word.l} />
          <div style={{ width: 14 }} />
        </div>

        {/* Kanji breakdown */}
        {found.length > 0 && (
          <div className="scroll flex-1" style={{ paddingBottom: 'calc(24px + env(safe-area-inset-bottom))' }}>
            <div style={{
              fontSize: 10, fontWeight: 600, color: 'var(--text3)',
              textTransform: 'uppercase', letterSpacing: '0.07em',
              padding: '14px 16px 6px',
            }}>
              KANJIS que lo forman
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {found.map(k => {
              const lc = LEVEL_COLORS[k.level]
              return (
                <div key={k.k} className="flex items-center relative"
                  style={{ background: '#F4F4F1' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 6, background: lc.main }} />
                  <div className="font-jp-serif text-center flex-shrink-0"
                    style={{ fontSize: 34, lineHeight: 1, width: 64, paddingLeft: 16, color: 'var(--text)' }}>
                    {k.k}
                  </div>
                  <div className="flex-1 min-w-0 py-2 pr-3">
                    <div style={{ fontSize: 15, color: 'var(--text)' }} className="truncate">
                      {k.meanings.join(', ')}
                    </div>
                    <div className="flex items-center flex-wrap gap-x-3 mt-1"
                      style={{ fontSize: 12, color: 'var(--text3)' }}>
                      {k.kun.length > 0 && (
                        <span>
                          <span style={{ textTransform: 'uppercase', fontSize: 10, letterSpacing: '0.05em', marginRight: 3 }}>kun</span>
                          <span style={{ color: 'var(--text2)' }}>{k.kun.slice(0, 2).join(', ')}</span>
                        </span>
                      )}
                      {k.on.length > 0 && (
                        <span>
                          <span style={{ textTransform: 'uppercase', fontSize: 10, letterSpacing: '0.05em', marginRight: 3 }}>on</span>
                          <span style={{ color: 'var(--text2)' }}>{k.on.slice(0, 2).join(', ')}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
            </div>
          </div>
        )}
      </motion.div>
    </>
  )
}

// ── Detail ─────────────────────────────────────────────────────────────────
export default function Detail({ kanji, unlocked, onBack, onUnlock }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [selectedWord, setSelectedWord] = useState<CompoundWord | null>(null)
  const lc = LEVEL_COLORS[kanji.level]

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0)
    setSelectedWord(null)
  }, [kanji.k])

  const showAdd   = (kanji.level === 'N3' || kanji.level === 'N2' || kanji.level === 'N1') && !unlocked
  const showAdded = (kanji.level === 'N3' || kanji.level === 'N2' || kanji.level === 'N1') && unlocked

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: '#F4F4F1' }}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={IOS}
      drag="x"
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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ color: 'var(--text)' }}>
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </motion.button>
      </div>

      {/* Scrollable content */}
      <div ref={scrollRef} className="scroll flex-1" style={{ touchAction: 'pan-y' }}>

        {/* Hero */}
        <div className="text-center px-6 pt-4 pb-6">
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

        {/* Readings — clean label + value rows */}
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
                {kanji.kun.length === 0 ? <span style={{ color: 'var(--text3)' }}>—</span> : kanji.kun.join(', ')}
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
                {kanji.on.length === 0 ? <span style={{ color: 'var(--text3)' }}>—</span> : kanji.on.join(', ')}
              </span>
            </div>
          </div>
        </div>

        {/* Compound words — Lista style */}
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
                  <WordRow key={i} word={w} onClick={() => setSelectedWord(w)} />
                ))}
              </div>
          }
        </div>

        {/* Action */}
        <div style={{ padding: '16px 16px 36px' }}>
          {showAdd && (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => onUnlock(kanji.k)}
              className="w-full py-4 rounded-2xl text-white font-semibold text-[16px]"
              style={{ background: lc.main }}
            >
              ＋ Añadir a mi lista
            </motion.button>
          )}
          {showAdded && (
            <div
              className="w-full py-3 rounded-2xl text-center font-medium text-[14px]"
              style={{ background: lc.bg, color: lc.main }}
            >
              ✓ Ya está en tu lista
            </div>
          )}
        </div>
      </div>

      {/* Bottom sheet */}
      <AnimatePresence>
        {selectedWord && (
          <WordSheet word={selectedWord} onClose={() => setSelectedWord(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
