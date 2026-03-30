import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Splash({ onDone }: { onDone: () => void }) {
  const [shouldExit, setShouldExit] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShouldExit(true), 2000)
    const done = setTimeout(onDone, 2500)
    return () => {
      clearTimeout(timer)
      clearTimeout(done)
    }
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: '#F4F4F1' }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <motion.span
        className="font-jp-serif"
        style={{
          fontSize: 28,
          color: 'var(--text)',
          lineHeight: 1,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        日本語学習
      </motion.span>
    </motion.div>
  )
}
