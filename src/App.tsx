import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import type { AppScreen } from './types'
import { KANJI } from './kanji'
import Lista from './Lista'
import Practice from './Practice'
import Splash from './Splash'

// ── Persistent state helpers ──────────────────────────────────────────────
function loadUnlocked(): Set<string> {
  try {
    const raw = localStorage.getItem('unlocked_n3')
    return new Set(raw ? JSON.parse(raw) : [])
  } catch { return new Set() }
}

function saveUnlocked(s: Set<string>) {
  localStorage.setItem('unlocked_n3', JSON.stringify([...s]))
}

// ── Icons ─────────────────────────────────────────────────────────────────
function GridIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24"
      fill={active ? 'currentColor' : 'none'}
      stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5"/>
      <rect x="14" y="3" width="7" height="7" rx="1.5"/>
      <rect x="3" y="14" width="7" height="7" rx="1.5"/>
      <rect x="14" y="14" width="7" height="7" rx="1.5"/>
    </svg>
  )
}

function StarIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24"
      fill={active ? 'currentColor' : 'none'}
      stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  )
}

// ── App ───────────────────────────────────────────────────────────────────
export default function App() {
  const [splashDone, setSplashDone] = useState(false)
  const [screen,     setScreen]     = useState<AppScreen>('lista')
  const [unlockedN3, setUnlockedN3] = useState<Set<string>>(loadUnlocked)

  const unlockKanji = useCallback((char: string) => {
    setUnlockedN3(prev => {
      const next = new Set(prev)
      next.add(char)
      saveUnlocked(next)
      return next
    })
  }, [])

  const isUnlocked = useCallback((k: { k: string; level: string }) =>
    k.level === 'N5' || k.level === 'N4' || unlockedN3.has(k.k)
  , [unlockedN3])

  const visible  = KANJI.filter(isUnlocked)
  const lockedN3 = KANJI.filter(k =>
    (k.level === 'N3' || k.level === 'N2' || k.level === 'N1') && !unlockedN3.has(k.k)
  )

  const tabs = [
    { id: 'lista'     as AppScreen, label: 'Lista',     Icon: GridIcon },
    { id: 'practicar' as AppScreen, label: 'Practicar', Icon: StarIcon },
  ]

  return (
    <div className="flex flex-col" style={{ height: '100dvh', background: 'var(--bg)', overflow: 'hidden' }}>
      <AnimatePresence>
        {!splashDone && <Splash onDone={() => setSplashDone(true)} />}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence initial={false}>
          <div key={screen} className="absolute inset-0 flex flex-col">
            {screen === 'lista'
              ? <Lista
                  visible={visible}
                  lockedN3={lockedN3}
                  isUnlocked={k => k.level === 'N5' || k.level === 'N4' || unlockedN3.has(k.k)}
                  onUnlock={unlockKanji}
                />
              : <Practice visible={visible} />
            }
          </div>
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <nav
        className="flex border-t"
        style={{
          background: 'var(--surface)',
          borderColor: 'var(--border)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        {tabs.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setScreen(id)}
            className="flex-1 flex flex-col items-center justify-center gap-1"
            style={{
              height: 70,
              color: screen === id ? 'var(--text)' : 'var(--text3)',
              background: 'none', border: 'none', fontFamily: 'inherit', cursor: 'pointer',
            }}
          >
            <Icon active={screen === id} />
            <span style={{ fontSize: 10, fontWeight: screen === id ? 600 : 400 }}>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
