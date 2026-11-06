import { useEffect, useRef } from 'react'

// A grid of dots behind the hero. A slow wave passes over it, and dots near
// the cursor brighten toward the accent and lean away from it.
// With reduced motion it draws once and stays still.

function readRgb(name: string): [number, number, number] {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  const [r, g, b] = raw.split(/\s+/).map(Number)
  return [r || 0, g || 0, b || 0]
}

export function DotField({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const host = canvas?.parentElement
    const ctx = canvas?.getContext('2d')
    if (!canvas || !host || !ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const GAP = 26
    const RADIUS = 190

    let w = 0
    let h = 0
    let raf = 0
    let visible = true
    let fg = readRgb('--fg')
    let accent = readRgb('--accent')
    const pointer = { x: -1e4, y: -1e4, tx: -1e4, ty: -1e4, on: false }

    const draw = (t: number) => {
      pointer.x += (pointer.tx - pointer.x) * 0.14
      pointer.y += (pointer.ty - pointer.y) * 0.14
      ctx.clearRect(0, 0, w, h)

      const cols = Math.ceil(w / GAP) + 1
      const rows = Math.ceil(h / GAP) + 1
      const ox = (w - (cols - 1) * GAP) / 2
      const oy = (h - (rows - 1) * GAP) / 2

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = ox + i * GAP
          const y = oy + j * GAP
          const wave = reduce ? 0.5 : (Math.sin(x * 0.0045 + y * 0.007 - t * 0.0007) + 1) / 2

          const dx = x - pointer.x
          const dy = y - pointer.y
          const d = Math.hypot(dx, dy)
          const k = d < RADIUS ? 1 - d / RADIUS : 0
          const e = k * k * (3 - 2 * k)

          const px = d > 0 ? x + (dx / d) * e * 9 : x
          const py = d > 0 ? y + (dy / d) * e * 9 : y
          const r = 0.9 + e * 1.3
          const a = 0.09 + wave * 0.1 + e * 0.65

          const cr = Math.round(fg[0] + (accent[0] - fg[0]) * e)
          const cg = Math.round(fg[1] + (accent[1] - fg[1]) * e)
          const cb = Math.round(fg[2] + (accent[2] - fg[2]) * e)
          ctx.fillStyle = `rgba(${cr},${cg},${cb},${a})`
          ctx.beginPath()
          ctx.arc(px, py, r, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (reduce) draw(0)
    }

    const loop = (t: number) => {
      if (visible) draw(t)
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      const rect = canvas.getBoundingClientRect()
      pointer.tx = e.clientX - rect.left
      pointer.ty = e.clientY - rect.top
      if (!pointer.on) {
        pointer.x = pointer.tx
        pointer.y = pointer.ty
        pointer.on = true
      }
    }
    const onLeave = () => {
      pointer.tx = pointer.ty = -1e4
      pointer.on = false
    }

    const refreshColors = () => {
      fg = readRgb('--fg')
      accent = readRgb('--accent')
      if (reduce) draw(0)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
    io.observe(canvas)
    const mo = new MutationObserver(refreshColors)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    mq.addEventListener('change', refreshColors)

    if (!reduce) {
      host.addEventListener('pointermove', onMove)
      host.addEventListener('pointerleave', onLeave)
      raf = requestAnimationFrame(loop)
    }

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
      mq.removeEventListener('change', refreshColors)
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={className}
      style={{
        maskImage: 'radial-gradient(ellipse 70% 80% at 72% 38%, #000 25%, transparent 78%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 80% at 72% 38%, #000 25%, transparent 78%)',
      }}
    />
  )
}
