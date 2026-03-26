import { useEffect } from 'react'

export default function Splash({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1800)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: '#F4F4F1' }}
    >
      <span className="font-jp-serif" style={{ fontSize: 28, color: 'var(--text)', lineHeight: 1 }}>日本語学習</span>
    </div>
  )
}
