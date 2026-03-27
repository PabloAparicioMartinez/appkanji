import { useEffect, useState } from 'react'

export default function Splash({ onDone }: { onDone: () => void }) {
  const [textVisible, setTextVisible] = useState(false)

  useEffect(() => {
    const showText = setTimeout(() => setTextVisible(true), 300)
    const done = setTimeout(onDone, 2500)
    return () => {
      clearTimeout(showText)
      clearTimeout(done)
    }
  }, [onDone])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: '#F4F4F1' }}
    >
      <span
        className="font-jp-serif"
        style={{
          fontSize: 28,
          color: 'var(--text)',
          lineHeight: 1,
          opacity: textVisible ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
      >
        日本語学習
      </span>
    </div>
  )
}
