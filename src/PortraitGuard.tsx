import { useState, useEffect } from 'react'

export default function PortraitGuard() {
  const [isLandscape, setIsLandscape] = useState(
    () => window.matchMedia('(orientation: landscape)').matches
  )

  useEffect(() => {
    const mq = window.matchMedia('(orientation: landscape)')
    const handler = (e: MediaQueryListEvent) => setIsLandscape(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  if (!isLandscape) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#F4F4F1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
      }}
    >
      <svg
        width="48" height="48" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round"
        style={{ color: 'var(--text3)' }}
      >
        <rect x="4" y="2" width="10" height="16" rx="2" />
        <path d="M17 8l3 3-3 3" />
        <path d="M20 11H14" />
      </svg>
      <p style={{ fontSize: 15, color: 'var(--text3)', fontFamily: 'inherit' }}>
        Gira el dispositivo
      </p>
    </div>
  )
}
