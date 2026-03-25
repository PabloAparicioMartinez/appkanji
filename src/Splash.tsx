import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Splash({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1600)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: '#F4F4F1' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div style={{
        width: 90, height: 90, borderRadius: 24,
        background: 'var(--primary)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 12px 40px rgba(61,155,110,0.28)',
        marginBottom: 24,
      }}>
        <span className="font-jp-serif" style={{ fontSize: 52, color: 'white', lineHeight: 1 }}>漢</span>
      </div>

      <p style={{ fontSize: 32, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>
        Kanji
      </p>

      <p style={{ fontSize: 14, color: 'var(--text3)', marginTop: 8 }}>
        Estudia japonés en español
      </p>
    </motion.div>
  )
}
