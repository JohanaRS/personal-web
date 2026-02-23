"use client"

import { useRef, useEffect } from "react"

const SAMPLE_DATA = [
  { name: "Salud", value: 7 },
  { name: "Desarrollo\nPersonal", value: 5 },
  { name: "Relaciones", value: 8 },
  { name: "Amor y\nVínculos", value: 6 },
  { name: "Carrera", value: 4 },
  { name: "Finanzas", value: 6 },
  { name: "Tiempo\nLibre", value: 9 },
  { name: "Entorno", value: 7 },
]

const COLORS = [
  "oklch(0.55 0.12 145)",
  "oklch(0.55 0.12 200)",
  "oklch(0.55 0.12 260)",
  "oklch(0.55 0.10 310)",
  "oklch(0.55 0.12 350)",
  "oklch(0.60 0.15 30)",
  "oklch(0.60 0.15 85)",
  "oklch(0.50 0.10 125)",
]

export function HeroWheel() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = window.devicePixelRatio || 1
    const size = Math.min(canvas.parentElement?.clientWidth || 320, 320)
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
    const maxRadius = size / 2 - 36
    const n = SAMPLE_DATA.length
    const angleStep = (2 * Math.PI) / n
    const startAngle = -Math.PI / 2

    // Concentric grid circles
    ctx.strokeStyle = "oklch(0.88 0.01 85)"
    ctx.lineWidth = 0.6
    for (let ring = 1; ring <= 10; ring++) {
      const r = (ring / 10) * maxRadius
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, 2 * Math.PI)
      ctx.stroke()
    }

    // Axis lines
    ctx.strokeStyle = "oklch(0.90 0.01 85)"
    ctx.lineWidth = 0.6
    for (let i = 0; i < n; i++) {
      const angle = startAngle + i * angleStep
      const x = cx + maxRadius * Math.cos(angle)
      const y = cy + maxRadius * Math.sin(angle)
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(x, y)
      ctx.stroke()
    }

    // Filled segments
    for (let i = 0; i < n; i++) {
      const angle1 = startAngle + i * angleStep
      const angle2 = startAngle + (i + 1) * angleStep
      const r = (SAMPLE_DATA[i].value / 10) * maxRadius

      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, r, angle1, angle2)
      ctx.closePath()

      ctx.fillStyle = COLORS[i]
      ctx.globalAlpha = 0.3
      ctx.fill()
      ctx.globalAlpha = 1

      ctx.strokeStyle = COLORS[i]
      ctx.lineWidth = 1.5
      ctx.stroke()
    }

    // Data polygon outline
    ctx.beginPath()
    for (let i = 0; i < n; i++) {
      const angle = startAngle + i * angleStep
      const r = (SAMPLE_DATA[i].value / 10) * maxRadius
      const x = cx + r * Math.cos(angle)
      const y = cy + r * Math.sin(angle)
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.strokeStyle = "oklch(0.45 0.08 125)"
    ctx.lineWidth = 2
    ctx.stroke()

    // Data points
    for (let i = 0; i < n; i++) {
      const angle = startAngle + i * angleStep
      const r = (SAMPLE_DATA[i].value / 10) * maxRadius
      const x = cx + r * Math.cos(angle)
      const y = cy + r * Math.sin(angle)

      ctx.beginPath()
      ctx.arc(x, y, 3, 0, 2 * Math.PI)
      ctx.fillStyle = COLORS[i]
      ctx.fill()
      ctx.strokeStyle = "white"
      ctx.lineWidth = 1.2
      ctx.stroke()
    }

    // Labels
    const labelOffset = 15
    ctx.fillStyle = "oklch(0.35 0.02 85)"
    const fontSize = Math.max(9, size * 0.028)
    ctx.font = `500 ${fontSize}px Inter, system-ui, sans-serif`
    ctx.textBaseline = "middle"

    for (let i = 0; i < n; i++) {
      const angle = startAngle + i * angleStep
      const lx = cx + (maxRadius + labelOffset) * Math.cos(angle)
      const ly = cy + (maxRadius + labelOffset) * Math.sin(angle)

      const normalizedAngle =
        ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)
      if (normalizedAngle < 0.1 || normalizedAngle > Math.PI * 2 - 0.1) {
        ctx.textAlign = "center"
      } else if (normalizedAngle < Math.PI) {
        ctx.textAlign = "left"
      } else {
        ctx.textAlign = "right"
      }
      if (i === 0) ctx.textAlign = "center"

      const name = SAMPLE_DATA[i].name
      const lines = name.split("\n")
      if (lines.length > 1) {
        ctx.fillText(lines[0], lx, ly - fontSize * 0.6)
        ctx.fillText(lines[1], lx, ly + fontSize * 0.6)
      } else {
        ctx.fillText(name, lx, ly)
      }
    }
  }, [])

  return (
    <div className="flex items-center justify-center w-full max-w-[320px] mx-auto">
      <canvas
        ref={canvasRef}
        className="max-w-full"
        role="img"
        aria-label="Ejemplo visual de la Rueda de la Vida"
      />
    </div>
  )
}
