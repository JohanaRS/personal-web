"use client"

import { useRef, useEffect } from "react"

interface WheelChartProps {
  categories: { name: string; value: number }[]
}

const CATEGORY_COLORS = [
  "oklch(0.55 0.12 145)",   // green
  "oklch(0.55 0.12 200)",   // teal
  "oklch(0.55 0.12 260)",   // blue
  "oklch(0.55 0.10 310)",   // purple
  "oklch(0.55 0.12 350)",   // rose
  "oklch(0.60 0.15 30)",    // orange
  "oklch(0.60 0.15 85)",    // amber
  "oklch(0.50 0.10 125)",   // olive
]

export function WheelChart({ categories }: WheelChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = window.devicePixelRatio || 1
    const size = Math.min(canvas.parentElement?.clientWidth || 500, 500)
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, size, size)

    const cx = size / 2
    const cy = size / 2
    const maxRadius = size / 2 - 40
    const n = categories.length
    const angleStep = (2 * Math.PI) / n
    const startAngle = -Math.PI / 2

    // Draw concentric grid circles + value labels
    ctx.strokeStyle = "oklch(0.85 0.01 85)"
    ctx.lineWidth = 0.8
    for (let ring = 1; ring <= 10; ring++) {
      const r = (ring / 10) * maxRadius
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, 2 * Math.PI)
      ctx.stroke()

      // Value label on top axis
      if (ring % 2 === 0) {
        ctx.fillStyle = "oklch(0.55 0.02 85)"
        ctx.font = `${Math.max(9, size * 0.022)}px Inter, system-ui, sans-serif`
        ctx.textAlign = "center"
        ctx.textBaseline = "bottom"
        ctx.fillText(ring.toString(), cx, cy - r - 2)
      }
    }

    // Draw axis lines
    ctx.strokeStyle = "oklch(0.88 0.01 85)"
    ctx.lineWidth = 0.8
    for (let i = 0; i < n; i++) {
      const angle = startAngle + i * angleStep
      const x = cx + maxRadius * Math.cos(angle)
      const y = cy + maxRadius * Math.sin(angle)
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(x, y)
      ctx.stroke()
    }

    // Draw filled segments
    for (let i = 0; i < n; i++) {
      const angle1 = startAngle + i * angleStep
      const angle2 = startAngle + (i + 1) * angleStep
      const r = (categories[i].value / 10) * maxRadius

      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, r, angle1, angle2)
      ctx.closePath()

      ctx.fillStyle = CATEGORY_COLORS[i % CATEGORY_COLORS.length]
      ctx.globalAlpha = 0.35
      ctx.fill()
      ctx.globalAlpha = 1

      ctx.strokeStyle = CATEGORY_COLORS[i % CATEGORY_COLORS.length]
      ctx.lineWidth = 2
      ctx.stroke()
    }

    // Draw data polygon outline
    ctx.beginPath()
    for (let i = 0; i < n; i++) {
      const angle = startAngle + i * angleStep
      const r = (categories[i].value / 10) * maxRadius
      const x = cx + r * Math.cos(angle)
      const y = cy + r * Math.sin(angle)
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.strokeStyle = "oklch(0.45 0.08 125)"
    ctx.lineWidth = 2.5
    ctx.stroke()

    // Draw data points
    for (let i = 0; i < n; i++) {
      const angle = startAngle + i * angleStep
      const r = (categories[i].value / 10) * maxRadius
      const x = cx + r * Math.cos(angle)
      const y = cy + r * Math.sin(angle)

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, 2 * Math.PI)
      ctx.fillStyle = CATEGORY_COLORS[i % CATEGORY_COLORS.length]
      ctx.fill()
      ctx.strokeStyle = "white"
      ctx.lineWidth = 1.5
      ctx.stroke()
    }

    // Draw category labels
    const labelOffset = 18
    ctx.fillStyle = "oklch(0.30 0.02 85)"
    const fontSize = Math.max(10, size * 0.025)
    ctx.font = `500 ${fontSize}px Inter, system-ui, sans-serif`
    ctx.textBaseline = "middle"

    for (let i = 0; i < n; i++) {
      const angle = startAngle + i * angleStep
      const lx = cx + (maxRadius + labelOffset) * Math.cos(angle)
      const ly = cy + (maxRadius + labelOffset) * Math.sin(angle)

      // Text alignment based on position
      const normalizedAngle = ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)
      if (normalizedAngle < 0.1 || normalizedAngle > Math.PI * 2 - 0.1) {
        ctx.textAlign = "center"
      } else if (normalizedAngle < Math.PI) {
        ctx.textAlign = "left"
      } else {
        ctx.textAlign = "right"
      }

      // For the top label
      if (Math.abs(normalizedAngle - Math.PI * 1.5) < 0.1 || Math.abs(normalizedAngle) < 0.01 && i === 0) {
        ctx.textAlign = "center"
      }

      // Wrap long names
      const name = categories[i].name
      const words = name.split(" ")
      if (words.length > 1 && ctx.measureText(name).width > maxRadius * 0.7) {
        const mid = Math.ceil(words.length / 2)
        const line1 = words.slice(0, mid).join(" ")
        const line2 = words.slice(mid).join(" ")
        ctx.fillText(line1, lx, ly - fontSize * 0.6)
        ctx.fillText(line2, lx, ly + fontSize * 0.6)
      } else {
        ctx.fillText(name, lx, ly)
      }
    }
  }, [categories])

  return (
    <div className="flex items-center justify-center w-full">
      <canvas
        ref={canvasRef}
        className="max-w-full"
        role="img"
        aria-label="Rueda de la Vida mostrando valores de cada categoría"
      />
    </div>
  )
}
