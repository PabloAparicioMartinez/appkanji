import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FastScrollbar from './FastScrollbar'
import { ANIME_DATA, type AnimeCategory, type AnimeEntry, type AnimeExample } from './animeData'

const CATEGORY_LABELS: Record<AnimeCategory, string> = {
  'partícula':   'Partícula',
  'vocabulario': 'Vocabulario',
  'gramática':   'Gramática',
}

// One color per category — used for stripe, filter chip, and detail badge
const CATEGORY_COLOR: Record<AnimeCategory, string> = {
  'partícula':   '#1c1c1e',
  'vocabulario': '#636366',
  'gramática':   '#8e8e93',
}

// Text color for active chips/badges — dark text on the lightest category
function chipText(_bg: string) { return '#fff' }

const IOS = { type: 'tween' as const, duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }

// All searchable forms of an expression: each variant (split by ' / '),
// without the ～ marker and without parentheticals, longest first.
function variantsOf(jp: string): string[] {
  return jp.split(' / ')
    .map(s => s.replace(/（[^）]*）/g, '').replace(/～/g, '').trim())
    .filter(Boolean)
    .sort((a, b) => b.length - a.length)
}

// Finds the example (and the slice within it) that contains the expression so
// it can be shown in bold. Falls back to a stem match for conjugated forms
// (e.g. ～てしまう → 言ってしまった, ～そうだ → やばそう).
function pickHighlight(examples: AnimeExample[], jp: string): { sentence: string; start: number; len: number } {
  const vars = variantsOf(jp)
  // 1) exact variant in any example (earliest example, longest variant wins)
  for (const ex of examples) {
    for (const v of vars) {
      const i = ex.jp.indexOf(v)
      if (i >= 0) return { sentence: ex.jp, start: i, len: v.length }
    }
  }
  // 2) stem fallback: trim the conjugating tail down to a 2-char minimum
  for (const ex of examples) {
    for (const v of vars) {
      for (let L = v.length - 1; L >= 2; L--) {
        const i = ex.jp.indexOf(v.slice(0, L))
        if (i >= 0) return { sentence: ex.jp, start: i, len: L }
      }
    }
  }
  return { sentence: examples[0]?.jp ?? '', start: -1, len: 0 }
}

// Converts "[漢字|reading]" markup to plain hiragana reading
function toHiragana(furigana: string): string {
  return furigana.replace(/\[([^|]+)\|([^\]]+)\]/g, (_, _k, r) => r)
}

function BoldSentence({ sentence, start, len }: { sentence: string; start: number; len: number }) {
  if (start < 0) return <span style={{ color: 'var(--text2)' }}>{sentence}</span>
  return (
    <>
      <span style={{ color: 'var(--text2)' }}>{sentence.slice(0, start)}</span>
      <strong style={{ color: 'var(--text)', fontWeight: 700 }}>{sentence.slice(start, start + len)}</strong>
      <span style={{ color: 'var(--text2)' }}>{sentence.slice(start + len)}</span>
    </>
  )
}

// ── Anime ─────────────────────────────────────────────────────────────────
export default function Anime() {
  const [search,    setSearch]    = useState('')
  const [catFilter, setCatFilter] = useState<AnimeCategory | null>(null)
  const [selected,  setSelected]  = useState<AnimeEntry | null>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const q = search.toLowerCase().trim()
  // Display order follows ANIME_DATA's array order (most frequent in anime first).
  const items = ANIME_DATA
    .filter(e => {
      if (catFilter && e.category !== catFilter) return false
      if (!q) return true
      return (
        e.jp.includes(q) ||
        (e.reading?.toLowerCase().includes(q) ?? false) ||
        e.meaning.toLowerCase().includes(q) ||
        e.examples.some(ex => ex.jp.includes(q) || ex.es.toLowerCase().includes(q))
      )
    })

  const CATS: Array<{ id: AnimeCategory | null; label: string }> = [
    { id: null,          label: 'Todos' },
    { id: 'partícula',   label: 'Partícula' },
    { id: 'vocabulario', label: 'Vocabulario' },
    { id: 'gramática',   label: 'Gramática' },
  ]

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
            placeholder="Buscar partícula, vocabulario o gramática..."
            className="w-full text-[14px] outline-none"
            autoCapitalize="none"
            autoCorrect="off"
            style={{
              paddingLeft: 36, paddingRight: 12, paddingTop: 9, paddingBottom: 9,
              background: '#e5e5e2', border: 'none', borderRadius: 10,
              color: 'var(--text)', fontFamily: 'inherit',
            }}
          />
        </div>
      </div>

      {/* Category filters — same pill style as Lista's level filters */}
      <div
        className="px-4 py-3"
        style={{
          background: '#F4F4F1',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 8,
        }}
      >
        {CATS.map(c => {
          const active = catFilter === c.id
          const color = c.id ? CATEGORY_COLOR[c.id] : '#3a3a3c'
          return (
            <button
              key={c.label}
              onClick={() => setCatFilter(c.id)}
              style={{
                padding: '7px 0',
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.02em',
                fontFamily: 'inherit',
                border: active ? '1.5px solid transparent' : `1.5px solid ${color}`,
                background: active ? color : '#F4F4F1',
                color: active ? chipText(color) : color,
                opacity: 0.85,
                cursor: 'pointer',
              }}
            >
              {c.label}
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

      {/* Detail */}
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
  const hl = pickHighlight(entry.examples, entry.jp)

  const stripped = entry.jp.replace(/^～/, '')
  // Use only the first variant (before ' / ') and strip parentheticals for sizing/display
  const displayJp = stripped.split(' / ')[0].replace(/（[^）]*）/g, '').trim()
  const n = displayJp.length
  const jpFontSize =
    n <= 1 ? 34 :
    n <= 2 ? 30 :
    n <= 3 ? 24 :
    n <= 4 ? 19 :
    n <= 5 ? 15 :
    n <= 6 ? 13 :
    n <= 7 ? 11 :
    10

  return (
    <div
      className="flex items-center row-press cursor-pointer relative"
      style={{ background: '#F4F4F1' }}
      onClick={onClick}
    >
      {/* Category stripe */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0,
        width: 6, background: CATEGORY_COLOR[entry.category], opacity: 0.8,
      }} />

      {/* JP expression */}
      <div
        className="font-jp-serif text-center flex-shrink-0"
        style={{
          fontSize: jpFontSize,
          lineHeight: 1,
          width: 90,
          paddingLeft: 12,
          color: 'var(--text)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
      >
        {displayJp}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 py-2 pr-3" style={{ paddingLeft: 10 }}>
        <div style={{ fontSize: 15, color: 'var(--text)' }} className="truncate">
          <BoldSentence sentence={hl.sentence} start={hl.start} len={hl.len} />
        </div>
        <div className="flex items-center flex-wrap gap-x-3 mt-1" style={{ fontSize: 12, color: 'var(--text3)' }}>
          <span style={{ textTransform: 'uppercase', fontSize: 10, letterSpacing: '0.05em' }}>
            {CATEGORY_LABELS[entry.category]}
          </span>
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

// ── ExampleItem ───────────────────────────────────────────────────────────
function ExampleItem({ ex, isLast }: { ex: AnimeExample; isLast: boolean }) {
  const [open,    setOpen]    = useState(false)
  const [pressed, setPressed] = useState(false)

  const hiragana = ex.furigana ? toHiragana(ex.furigana) : null

  return (
    <div
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      onClick={() => setOpen(v => !v)}
      style={{
        padding: '12px 14px',
        borderRadius: 10,
        background: pressed ? '#d4d4d1' : '#e5e5e2',
        marginBottom: isLast ? 0 : 6,
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'background 0.1s',
      }}
    >
      {/* Sentence row + arrow */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
        <div className="font-jp-serif" style={{ fontSize: 17, color: 'var(--text)', lineHeight: 1.5, flex: 1 }}>
          {ex.jp}
        </div>
        <svg
          width="15" height="15" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{
            color: 'var(--text3)',
            flexShrink: 0,
            marginTop: 5,
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s',
          }}
        >
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </div>

      {/* Expanded: furigana + translation */}
      {open && (
        <>
          {hiragana && (
            <div className="font-jp-serif" style={{ fontSize: 14, color: 'var(--text2)', marginTop: 6, lineHeight: 1.5 }}>
              {hiragana}
            </div>
          )}
          <div style={{ fontSize: 13, color: 'var(--text2)', marginTop: 4, lineHeight: 1.5 }}>
            {ex.es}
          </div>
        </>
      )}
    </div>
  )
}

// ── AnimeDetail ───────────────────────────────────────────────────────────
function AnimeDetail({ entry, onBack }: { entry: AnimeEntry; onBack: () => void }) {
  const [animating, setAnimating] = useState(true)

  // Particles like ぜ、ぞ、の etc. attach to something but lack ～ in data;
  // grammar patterns already carry ～; vocabulary is standalone
  const heroJp =
    entry.category === 'partícula' && !entry.jp.startsWith('～')
      ? '～' + entry.jp
      : entry.jp

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
        <div className="text-center px-6 pt-4 pb-6">
          <div
            className="font-jp-serif leading-none mb-3"
            style={{ fontSize: 64, color: 'var(--text)', wordBreak: 'break-all' }}
          >
            {heroJp}
          </div>
          {entry.reading && (
            <div style={{ fontSize: 18, color: 'var(--text2)', marginBottom: 10 }}>
              {entry.reading}
            </div>
          )}
          <span style={{
            display: 'inline-block',
            background: CATEGORY_COLOR[entry.category],
            color: chipText(CATEGORY_COLOR[entry.category]),
            borderRadius: 20,
            padding: '5px 16px',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.04em',
            opacity: 0.8,
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
          {(() => {
            const nl = entry.meaning.indexOf('\n')
            const rawTitle = nl >= 0 ? entry.meaning.slice(0, nl) : entry.meaning
            const body     = nl >= 0 ? entry.meaning.slice(nl + 1) : ''
            const title    = rawTitle.replace(/^«/, '').replace(/»$/, '')
              .split(' / ').map(p => `"${p.trim()}"`).join(', ')
            return (
              <>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', lineHeight: 1.4, marginBottom: body ? 8 : 0 }}>
                  {title}
                </p>
                {body && (
                  <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.65 }}>
                    {body}
                  </p>
                )}
              </>
            )
          })()}
        </div>

        {/* Examples */}
        {entry.examples.length > 0 && (
          <div style={{ padding: '0 16px 40px' }}>
            <div style={{
              fontSize: 10, fontWeight: 400, color: 'var(--text3)',
              textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8,
            }}>
              Ejemplos
            </div>
            {entry.examples.map((ex, i) => (
              <ExampleItem
                key={i}
                ex={ex}
                isLast={i === entry.examples.length - 1}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
