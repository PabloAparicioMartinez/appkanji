import { useEffect, useRef, useState } from 'react'

interface Props {
  scrollRef: React.RefObject<HTMLDivElement | null>
}

export default function FastScrollbar({ scrollRef }: Props) {
  const [thumbHeight, setThumbHeight] = useState(0)
  const [thumbTop, setThumbTop] = useState(0)
  const [active, setActive] = useState(false)
  const [dragging, setDragging] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const dragOffsetRef = useRef(0)
  const draggingRef = useRef(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    function update() {
      if (!el) return
      const { clientHeight, scrollHeight, scrollTop } = el
      if (scrollHeight <= clientHeight + 1) {
        setThumbHeight(0)
        return
      }
      const minThumb = 44
      const ratio = clientHeight / scrollHeight
      const h = Math.max(minThumb, clientHeight * ratio)
      const scrollable = scrollHeight - clientHeight
      const maxTop = clientHeight - h
      const top = scrollable > 0 ? (scrollTop / scrollable) * maxTop : 0
      setThumbHeight(h)
      setThumbTop(top)
    }

    function bump() {
      setActive(true)
      if (timerRef.current) window.clearTimeout(timerRef.current)
      timerRef.current = window.setTimeout(() => {
        if (!draggingRef.current) setActive(false)
      }, 900)
    }

    function onScroll() {
      update()
      if (!draggingRef.current) bump()
    }

    update()
    el.addEventListener('scroll', onScroll, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(el)
    const mo = new MutationObserver(update)
    mo.observe(el, { childList: true, subtree: true })
    return () => {
      el.removeEventListener('scroll', onScroll)
      ro.disconnect()
      mo.disconnect()
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [scrollRef])

  useEffect(() => {
    function move(e: PointerEvent) {
      if (!draggingRef.current) return
      const el = scrollRef.current
      const track = trackRef.current
      if (!el || !track) return
      const rect = track.getBoundingClientRect()
      const y = e.clientY - rect.top - dragOffsetRef.current
      const maxTop = rect.height - thumbHeight
      const clamped = Math.max(0, Math.min(y, maxTop))
      const scrollable = el.scrollHeight - el.clientHeight
      el.scrollTop = maxTop > 0 ? (clamped / maxTop) * scrollable : 0
    }
    function up() {
      if (!draggingRef.current) return
      draggingRef.current = false
      setDragging(false)
      if (timerRef.current) window.clearTimeout(timerRef.current)
      timerRef.current = window.setTimeout(() => setActive(false), 900)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
    }
  }, [scrollRef, thumbHeight])

  function onThumbDown(e: React.PointerEvent) {
    e.preventDefault()
    e.stopPropagation()
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
    draggingRef.current = true
    dragOffsetRef.current = e.clientY - rect.top
    setDragging(true)
    setActive(true)
    if (timerRef.current) window.clearTimeout(timerRef.current)
  }

  if (thumbHeight === 0) return null

  return (
    <div
      ref={trackRef}
      style={{
        position: 'absolute',
        top: 0, right: 2, bottom: 0,
        width: 10,
        zIndex: 10,
        pointerEvents: 'none',
      }}
    >
      <div
        onPointerDown={onThumbDown}
        style={{
          position: 'absolute',
          top: thumbTop,
          left: 2, right: 2,
          height: thumbHeight,
          borderRadius: 3,
          background: dragging ? 'rgba(28, 28, 30, 0.6)' : 'rgba(28, 28, 30, 0.35)',
          opacity: active || dragging ? 1 : 0.45,
          transition: 'opacity 0.25s ease, background 0.15s ease',
          cursor: 'grab',
          touchAction: 'none',
          pointerEvents: 'auto',
        }}
      />
    </div>
  )
}
