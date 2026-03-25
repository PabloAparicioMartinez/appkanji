import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import type { Kanji, JLPTLevel } from './types'

interface Props {
  kanji: Kanji
  unlocked: boolean
  onBack: () => void
  onUnlock: (k: string) => void
}

const LEVEL_COLORS: Record<JLPTLevel, { bg: string; text: string }> = {
  N5: { bg: 'var(--n5-bg)', text: 'var(--n5)' },
  N4: { bg: 'var(--n4-bg)', text: 'var(--n4)' },
  N3: { bg: 'var(--n3-bg)', text: 'var(--n3)' },
}

function Badge({ level, size = 'sm' }: { level: JLPTLevel; size?: 'sm' | 'md' }) {
  const c = LEVEL_COLORS[level]
  const cls = size === 'md'
    ? 'inline-block px-3 py-1 rounded-full text-[13px] font-medium'
    : 'inline-block px-2 py-0.5 rounded-full text-[11px] font-medium'
  return (
    <span className={cls} style={{ background: c.bg, color: c.text }}>
      {level}
    </span>
  )
}

export default function Detail({ kanji, unlocked, onBack, onUnlock }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Reset scroll on open
  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0)
  }, [kanji.k])

  const showAdd    = kanji.level === 'N3' && !unlocked
  const showAdded  = kanji.level === 'N3' && unlocked

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: 'var(--bg)' }}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 380, damping: 38 }}
    >
      {/* Nav bar */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-b"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)', paddingTop: 'calc(0.75rem + env(safe-area-inset-top))' }}
      >
        <button
          onClick={onBack}
          className="press flex items-center gap-1 text-[15px]"
          style={{ color: 'var(--n4)' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          Volver
        </button>
      </div>

      {/* Content */}
      <div ref={scrollRef} className="scroll flex-1 pb-10">

        {/* Hero */}
        <div
          className="text-center px-6 pt-8 pb-7 border-b"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
        >
          <Badge level={kanji.level} size="md" />
          <div
            className="font-jp-serif leading-none mt-4 mb-4"
            style={{ fontSize: 96, color: 'var(--text)' }}
          >
            {kanji.k}
          </div>
          <div style={{ fontSize: 20, color: 'var(--text)', fontWeight: 300 }}>
            {kanji.meanings.join(', ')}
          </div>
        </div>

        {/* Readings */}
        <div className="px-4 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="flex gap-3">
            <ReadingBox label="ON 音読み" value={kanji.on.join('、') || '—'} />
            <ReadingBox label="KUN 訓読み" value={kanji.kun.join('、') || '—'} />
          </div>
        </div>

        {/* Compound words */}
        <div className="px-4 pt-5 pb-2">
          <SectionTitle>Palabras compuestas</SectionTitle>
          {kanji.words.length === 0
            ? <p style={{ fontSize: 14, color: 'var(--text3)' }}>Sin palabras disponibles</p>
            : kanji.words.map((w, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3 py-3 border-b"
                style={{ borderColor: 'var(--border)' }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.04 }}
              >
                <div className="text-center" style={{ minWidth: 72 }}>
                  <div style={{ fontSize: 11, color: 'var(--text3)', lineHeight: 1.3 }}>{w.f}</div>
                  <div className="font-jp-serif" style={{ fontSize: 22, color: 'var(--text)' }}>{w.w}</div>
                </div>
                <div className="flex-1" style={{ fontSize: 14, color: 'var(--text2)' }}>{w.m}</div>
                <Badge level={w.l} />
              </motion.div>
            ))
          }
        </div>

        {/* Action */}
        <div className="px-4 pt-4 pb-8">
          {showAdd && (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onUnlock(kanji.k)}
              className="w-full py-4 rounded-xl text-white font-medium text-[16px]"
              style={{ background: 'var(--n3)' }}
            >
              ＋ Añadir a mi lista
            </motion.button>
          )}
          {showAdded && (
            <div
              className="w-full py-3 rounded-xl text-center text-[14px]"
              style={{ background: 'var(--n5-bg)', color: 'var(--n5)' }}
            >
              ✓ Ya está en tu lista
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function ReadingBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex-1 rounded-xl px-4 py-3" style={{ background: 'var(--surface2)' }}>
      <div style={{ fontSize: 11, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ fontSize: 17, color: 'var(--text)' }}>{value}</div>
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
      {children}
    </div>
  )
}
