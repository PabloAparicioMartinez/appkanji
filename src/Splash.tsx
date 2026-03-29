import { useEffect, useState } from 'react'

export default function Splash({ onDone }: { onDone: () => void }) {
  const [bgVisible,  setBgVisible]  = useState(false)
  const [textVisible, setTextVisible] = useState(false)
  const [fadeOut,     setFadeOut]     = useState(false)

  useEffect(() => {
    const showBg   = setTimeout(() => setBgVisible(true),   50)
    const showText = setTimeout(() => setTextVisible(true), 700)
    const startOut = setTimeout(() => setFadeOut(true),     2000)
    const done     = setTimeout(onDone,                     2550)
    return () => {
      clearTimeout(showBg)
      clearTimeout(showText)
      clearTimeout(startOut)
      clearTimeout(done)
    }
  }, [onDone])

  const containerOpacity = fadeOut ? 0 : bgVisible ? 1 : 0

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        background: '#F4F4F1',
        opacity: containerOpacity,
        transition: fadeOut ? 'opacity 0.5s ease' : 'opacity 0.6s ease',
      }}
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
