import { gapLabel, gapOf, getGaps, getStrengths, groupByDimension, skillLabel } from "../derived"
import type { Skill } from "../types"

const SITE_URL = "https://johanarios.com"
const SITE_LABEL = "johanarios.com"
const EMAIL = "johanapaolarios@gmail.com"
const INSTAGRAM_LABEL = "@joharios.coach"
const INSTAGRAM_URL = "https://www.instagram.com/joharios.coach"
const BOOKING_URL = "https://calendly.com/johanapaolarios/coaching-con-joha"

/** Hex equivalents of the site's oklch design tokens (globals.css). */
const COLORS = {
  background: "#faf8f5",
  foreground: "#262117",
  card: "#f4f1ec",
  primary: "#4b5d28",
  secondary: "#e9e4da",
  muted: "#5a5549",
  border: "#e3ddd3",
  grid: "#d6cfc2",
  clay: "#a04f27",
}

const PAGE_W = 210
const PAGE_H = 297
const MARGIN = 16
const CONTENT_W = PAGE_W - MARGIN * 2
const FOOTER_TOP = PAGE_H - 20
const MAX_LOGO_PX = 640

interface Logo {
  dataUrl: string
  ratio: number
}

function hexToRgb(hex: string) {
  const value = Number.parseInt(hex.slice(1), 16)
  return { r: (value >> 16) & 255, g: (value >> 8) & 255, b: value & 255 }
}

/**
 * The brand PNGs have a large empty margin and a baked-in light checkerboard.
 * Crop to the artwork and flatten the near-white pixels onto the page background.
 */
async function loadLogo(src: string): Promise<Logo | null> {
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image()
      el.crossOrigin = "anonymous"
      el.onload = () => resolve(el)
      el.onerror = reject
      el.src = src
    })
    const width = img.naturalWidth
    const height = img.naturalHeight
    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (!ctx) return null
    ctx.drawImage(img, 0, 0)

    const image = ctx.getImageData(0, 0, width, height)
    const px = image.data
    const bg = hexToRgb(COLORS.background)
    let minX = width
    let minY = height
    let maxX = -1
    let maxY = -1

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4
        const lum = 0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2]
        if (lum < 200) {
          if (x < minX) minX = x
          if (x > maxX) maxX = x
          if (y < minY) minY = y
          if (y > maxY) maxY = y
        }
        const t = Math.min(1, Math.max(0, (238 - lum) / 20))
        px[i] = bg.r * (1 - t) + px[i] * t
        px[i + 1] = bg.g * (1 - t) + px[i + 1] * t
        px[i + 2] = bg.b * (1 - t) + px[i + 2] * t
        px[i + 3] = 255
      }
    }
    if (maxX < minX || maxY < minY) return null
    ctx.putImageData(image, 0, 0)

    const pad = 14
    const sx = Math.max(0, minX - pad)
    const sy = Math.max(0, minY - pad)
    const cw = Math.min(width, maxX + pad) - sx
    const ch = Math.min(height, maxY + pad) - sy
    const scale = Math.min(1, MAX_LOGO_PX / Math.max(cw, ch))
    const out = document.createElement("canvas")
    out.width = Math.round(cw * scale)
    out.height = Math.round(ch * scale)
    const outCtx = out.getContext("2d")
    if (!outCtx) return null
    outCtx.imageSmoothingQuality = "high"
    outCtx.drawImage(canvas, sx, sy, cw, ch, 0, 0, out.width, out.height)
    return { dataUrl: out.toDataURL("image/jpeg", 0.92), ratio: cw / ch }
  } catch {
    return null
  }
}

function longDate(date = new Date()) {
  return date.toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })
}

function isoDate(date = new Date()) {
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export async function exportRadarPdf(skills: Skill[]) {
  const [{ jsPDF, GState }, logo, isotipo] = await Promise.all([
    import("jspdf"),
    loadLogo("/images/logo-principal.png"),
    loadLogo("/images/logo-isotipo.png"),
  ])

  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" })
  doc.setProperties({
    title: "Mi Radar de Liderazgo",
    subject: "Radar de Liderazgo - Johana Ríos",
    author: "Johana Ríos",
    creator: SITE_LABEL,
  })

  const paintPage = () => {
    doc.setFillColor(COLORS.background)
    doc.rect(0, 0, PAGE_W, PAGE_H, "F")
  }

  const withOpacity = (opacity: number, draw: () => void) => {
    doc.saveGraphicsState()
    doc.setGState(new GState({ opacity }))
    draw()
    doc.restoreGraphicsState()
  }

  const polygon = (points: [number, number][], style: "S" | "F" | "FD") => {
    const [x0, y0] = points[0]
    const relative = points.slice(1).map(([x, y], i) => [x - points[i][0], y - points[i][1]])
    doc.lines(relative, x0, y0, [1, 1], style, true)
  }

  const eyebrow = (text: string, x: number, y: number, align: "left" | "right" = "left") => {
    doc.setFont("helvetica", "bold")
    doc.setFontSize(7.5)
    doc.setTextColor(COLORS.primary)
    doc.setCharSpace(0.5)
    doc.text(text.toUpperCase(), x, y, { align })
    doc.setCharSpace(0)
  }

  const today = longDate()
  paintPage()

  /* ------------------------------ Page 1 ------------------------------ */
  let y = MARGIN
  const logoHeight = 24
  if (logo) {
    doc.addImage(logo.dataUrl, "JPEG", MARGIN, y, logoHeight * logo.ratio, logoHeight)
  } else {
    doc.setFont("helvetica", "bold")
    doc.setFontSize(16)
    doc.setTextColor(COLORS.foreground)
    doc.text("Johana Ríos", MARGIN, y + 10)
  }

  eyebrow("Radar de Liderazgo", PAGE_W - MARGIN, y + 8, "right")
  doc.setFont("helvetica", "normal")
  doc.setFontSize(9)
  doc.setTextColor(COLORS.muted)
  doc.text(today, PAGE_W - MARGIN, y + 13.5, { align: "right" })
  doc.setTextColor(COLORS.primary)
  doc.textWithLink(SITE_LABEL, PAGE_W - MARGIN - doc.getTextWidth(SITE_LABEL), y + 18.5, { url: SITE_URL })

  y += logoHeight + 6
  doc.setDrawColor(COLORS.border)
  doc.setLineWidth(0.3)
  doc.line(MARGIN, y, PAGE_W - MARGIN, y)

  y += 11
  eyebrow("Tu fotografía de liderazgo", MARGIN, y)
  y += 9
  doc.setFont("helvetica", "bold")
  doc.setFontSize(26)
  doc.setTextColor(COLORS.foreground)
  doc.text("Mi Radar de Liderazgo", MARGIN, y)
  y += 7
  doc.setFont("helvetica", "normal")
  doc.setFontSize(10)
  doc.setTextColor(COLORS.muted)
  const intro = doc.splitTextToSize(
    "No es una nota sobre tu capacidad como líder. Es una fotografía de cómo te percibís hoy y hacia dónde querés moverte.",
    140,
  ) as string[]
  intro.forEach((line, i) => doc.text(line, MARGIN, y + i * 4.8))
  y += intro.length * 4.8 + 6

  // Chart card
  const radius = 52
  const labelSpace = 30
  const cardHeight = radius * 2 + labelSpace * 2 + 8
  doc.setFillColor(COLORS.card)
  doc.setDrawColor(COLORS.border)
  doc.setLineWidth(0.3)
  doc.roundedRect(MARGIN, y, CONTENT_W, cardHeight, 3, 3, "FD")

  const cx = PAGE_W / 2
  const cy = y + labelSpace + radius - 2
  const total = skills.length
  const angleFor = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / total
  const pointAt = (i: number, value: number, r = radius): [number, number] => {
    const angle = angleFor(i)
    const dist = (value / 10) * r
    return [cx + dist * Math.cos(angle), cy + dist * Math.sin(angle)]
  }

  // Grid
  doc.setDrawColor(COLORS.grid)
  ;[2, 4, 6, 8, 10].forEach((ring) => {
    doc.setLineWidth(ring === 10 ? 0.4 : 0.2)
    polygon(
      skills.map((_, i) => pointAt(i, ring)),
      "S",
    )
  })
  doc.setLineWidth(0.2)
  skills.forEach((_, i) => {
    const [x, yy] = pointAt(i, 10)
    doc.line(cx, cy, x, yy)
  })
  doc.setFont("helvetica", "normal")
  doc.setFontSize(6.5)
  doc.setTextColor(COLORS.muted)
  ;[2, 4, 6, 8, 10].forEach((ring) => doc.text(String(ring), cx + 1.2, cy - (ring / 10) * radius - 0.8))

  // Desired
  const desiredPoints = skills.map((s, i) => pointAt(i, s.desiredScore ?? 0))
  withOpacity(0.1, () => {
    doc.setFillColor(COLORS.clay)
    polygon(desiredPoints, "F")
  })
  doc.setDrawColor(COLORS.clay)
  doc.setLineWidth(0.6)
  doc.setLineDashPattern([2.2, 1.6], 0)
  polygon(desiredPoints, "S")
  doc.setLineDashPattern([], 0)
  skills.forEach((s, i) => {
    if (s.desiredScore === null) return
    const [px, py] = pointAt(i, s.desiredScore)
    const d = 1.8
    doc.setFillColor(COLORS.clay)
    doc.setDrawColor(COLORS.card)
    doc.setLineWidth(0.4)
    polygon(
      [
        [px, py - d],
        [px + d, py],
        [px, py + d],
        [px - d, py],
      ],
      "FD",
    )
  })

  // Current
  const currentPoints = skills.map((s, i) => pointAt(i, s.currentScore ?? 0))
  withOpacity(0.2, () => {
    doc.setFillColor(COLORS.primary)
    polygon(currentPoints, "F")
  })
  doc.setDrawColor(COLORS.primary)
  doc.setLineWidth(0.8)
  polygon(currentPoints, "S")
  skills.forEach((s, i) => {
    if (s.currentScore === null) return
    const [px, py] = pointAt(i, s.currentScore)
    doc.setFillColor(COLORS.primary)
    doc.setDrawColor(COLORS.card)
    doc.setLineWidth(0.5)
    doc.circle(px, py, 1.5, "FD")
  })

  // Names around the chart
  doc.setFont("helvetica", "bold")
  doc.setFontSize(8.5)
  doc.setTextColor(COLORS.foreground)
  const lineHeight = 3.8
  skills.forEach((skill, i) => {
    const angle = angleFor(i)
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    const lx = cx + (radius + 6) * cos
    const ly = cy + (radius + 6) * sin
    const align = cos > 0.3 ? "left" : cos < -0.3 ? "right" : "center"
    let lines = doc.splitTextToSize(skillLabel(skill), 36) as string[]
    if (lines.length > 3) {
      lines = lines.slice(0, 3)
      lines[2] = `${lines[2].slice(0, Math.max(0, lines[2].length - 3))}...`
    }
    const startY =
      sin < -0.5 ? ly - (lines.length - 1) * lineHeight - 1 : sin > 0.5 ? ly + 3.5 : ly - ((lines.length - 1) * lineHeight) / 2 + 1.2
    lines.forEach((line, k) => doc.text(line, lx, startY + k * lineHeight, { align }))
  })

  // Legend
  const legendY = y + cardHeight - 7
  doc.setFont("helvetica", "normal")
  doc.setFontSize(8.5)
  doc.setTextColor(COLORS.foreground)
  const currentLabel = "Situación actual"
  const desiredLabel = "Situación deseada"
  const sampleW = 9
  const gap = 2.5
  const itemGap = 10
  const totalW =
    sampleW + gap + doc.getTextWidth(currentLabel) + itemGap + sampleW + gap + doc.getTextWidth(desiredLabel)
  let lx = cx - totalW / 2
  doc.setDrawColor(COLORS.primary)
  doc.setLineWidth(0.8)
  doc.line(lx, legendY - 1, lx + sampleW, legendY - 1)
  doc.setFillColor(COLORS.primary)
  doc.circle(lx + sampleW / 2, legendY - 1, 1.4, "F")
  doc.text(currentLabel, lx + sampleW + gap, legendY)
  lx += sampleW + gap + doc.getTextWidth(currentLabel) + itemGap
  doc.setDrawColor(COLORS.clay)
  doc.setLineDashPattern([1.6, 1.2], 0)
  doc.line(lx, legendY - 1, lx + sampleW, legendY - 1)
  doc.setLineDashPattern([], 0)
  doc.setFillColor(COLORS.clay)
  polygon(
    [
      [lx + sampleW / 2, legendY - 2.6],
      [lx + sampleW / 2 + 1.6, legendY - 1],
      [lx + sampleW / 2, legendY + 0.6],
      [lx + sampleW / 2 - 1.6, legendY - 1],
    ],
    "F",
  )
  doc.text(desiredLabel, lx + sampleW + gap, legendY)

  /* ------------------------------ Page 2 ------------------------------ */
  doc.addPage()
  paintPage()
  y = MARGIN + 4

  const ensureSpace = (height: number) => {
    if (y + height <= FOOTER_TOP) return
    doc.addPage()
    paintPage()
    y = MARGIN + 4
  }

  doc.setFont("helvetica", "bold")
  doc.setFontSize(14)
  doc.setTextColor(COLORS.foreground)
  doc.text("Capacidades", MARGIN, y + 4)
  y += 9

  const colHoy = MARGIN + CONTENT_W - 58
  const colDeseado = MARGIN + CONTENT_W - 37
  const colBrecha = MARGIN + CONTENT_W - 15
  const nameWidth = colHoy - MARGIN - 12
  const tableStartY = y
  const tableStartPage = doc.getNumberOfPages()

  doc.setFillColor(COLORS.secondary)
  doc.rect(MARGIN, y, CONTENT_W, 8, "F")
  doc.setFont("helvetica", "bold")
  doc.setFontSize(7.5)
  doc.setTextColor(COLORS.muted)
  doc.setCharSpace(0.4)
  doc.text("CAPACIDAD", MARGIN + 4, y + 5.2)
  doc.text("HOY", colHoy, y + 5.2, { align: "center" })
  doc.text("DESEADO", colDeseado, y + 5.2, { align: "center" })
  doc.text("BRECHA", colBrecha, y + 5.2, { align: "center" })
  doc.setCharSpace(0)
  y += 8

  groupByDimension(skills).forEach(({ dimension, items }) => {
    ensureSpace(8 + 10)
    doc.setFillColor("#efebe3")
    doc.rect(MARGIN, y, CONTENT_W, 7, "F")
    doc.setFont("helvetica", "bold")
    doc.setFontSize(8)
    doc.setTextColor(COLORS.primary)
    doc.text(dimension ? `${dimension.modelLabel} · ${dimension.name}` : "Otras capacidades", MARGIN + 4, y + 4.7)
    y += 7

    items.forEach(({ skill }) => {
      doc.setFont("helvetica", "bold")
      doc.setFontSize(9)
      const lines = doc.splitTextToSize(skill.name, nameWidth) as string[]
      const rowHeight = lines.length * 4.2 + 5
      ensureSpace(rowHeight)
      doc.setFillColor(COLORS.card)
      doc.rect(MARGIN, y, CONTENT_W, rowHeight, "F")
      doc.setDrawColor(COLORS.border)
      doc.setLineWidth(0.2)
      doc.line(MARGIN, y + rowHeight, MARGIN + CONTENT_W, y + rowHeight)
      doc.setTextColor(COLORS.foreground)
      lines.forEach((line, k) => doc.text(line, MARGIN + 4, y + 5 + k * 4.2))
      const midY = y + rowHeight / 2 + 1.2
      doc.setFont("helvetica", "normal")
      doc.text(String(skill.currentScore ?? "-"), colHoy, midY, { align: "center" })
      doc.text(String(skill.desiredScore ?? "-"), colDeseado, midY, { align: "center" })
      doc.text(
        skill.currentScore !== null && skill.desiredScore !== null ? gapLabel(gapOf(skill)) : "-",
        colBrecha,
        midY,
        { align: "center" },
      )
      y += rowHeight
    })
  })

  if (doc.getNumberOfPages() === tableStartPage) {
    doc.setDrawColor(COLORS.border)
    doc.setLineWidth(0.3)
    doc.roundedRect(MARGIN, tableStartY, CONTENT_W, y - tableStartY, 2, 2, "S")
  }
  y += 9

  // Strengths and gaps
  const strengths = getStrengths(skills)
  const gaps = getGaps(skills)
  const boxW = (CONTENT_W - 6) / 2
  const measure = (items: { name: string }[]) =>
    items.reduce((sum, item) => {
      doc.setFont("helvetica", "bold")
      doc.setFontSize(9)
      return sum + (doc.splitTextToSize(item.name, boxW - 10) as string[]).length * 4.2 + 5
    }, 0)
  const strengthItems = strengths.map((s) => ({ name: s.name, detail: `Hoy ${s.currentScore}` }))
  const gapItems = gaps.map((s) => ({
    name: s.name,
    detail: `Hoy ${s.currentScore} · Deseado ${s.desiredScore} · ${gapLabel(gapOf(s))}`,
  }))
  const emptyGaps = gapItems.length === 0
  const boxHeight = Math.max(measure(strengthItems), emptyGaps ? 10 : measure(gapItems), 10) + 14
  ensureSpace(boxHeight)

  const drawList = (
    title: string,
    items: { name: string; detail: string }[],
    x: number,
    empty: string,
  ) => {
    doc.setFillColor(COLORS.card)
    doc.setDrawColor(COLORS.border)
    doc.setLineWidth(0.3)
    doc.roundedRect(x, y, boxW, boxHeight, 2.5, 2.5, "FD")
    doc.setFont("helvetica", "bold")
    doc.setFontSize(9.5)
    doc.setTextColor(COLORS.foreground)
    doc.text(title, x + 5, y + 7)
    let ly = y + 13.5
    if (items.length === 0) {
      doc.setFont("helvetica", "normal")
      doc.setFontSize(8.5)
      doc.setTextColor(COLORS.muted)
      ;(doc.splitTextToSize(empty, boxW - 10) as string[]).forEach((line, k) => doc.text(line, x + 5, ly + k * 4))
      return
    }
    items.forEach((item) => {
      doc.setFont("helvetica", "bold")
      doc.setFontSize(9)
      doc.setTextColor(COLORS.foreground)
      const lines = doc.splitTextToSize(item.name, boxW - 10) as string[]
      lines.forEach((line, k) => doc.text(line, x + 5, ly + k * 4.2))
      ly += lines.length * 4.2 - 0.4
      doc.setFont("helvetica", "normal")
      doc.setFontSize(7.5)
      doc.setTextColor(COLORS.muted)
      doc.text(item.detail, x + 5, ly + 0.6)
      ly += 5
    })
  }
  drawList("Fortalezas actuales", strengthItems, MARGIN, "Todavía no hay puntajes para mostrar.")
  drawList("Mayores brechas", gapItems, MARGIN + boxW + 6, "Sin brechas entre tu situación actual y la deseada.")
  y += boxHeight + 6

  doc.setFont("helvetica", "normal")
  doc.setFontSize(8.5)
  doc.setTextColor(COLORS.muted)
  const note = doc.splitTextToSize(
    "Los números cuentan solo una parte de la historia. Una brecha pequeña puede ser clave para tu momento, y una grande puede no ser prioridad hoy.",
    CONTENT_W,
  ) as string[]
  ensureSpace(note.length * 4 + 6)
  note.forEach((line, k) => doc.text(line, MARGIN, y + k * 4))
  y += note.length * 4 + 8

  // Closing call to action
  const ctaHeight = 44
  ensureSpace(ctaHeight)
  doc.setFillColor(COLORS.primary)
  doc.roundedRect(MARGIN, y, CONTENT_W, ctaHeight, 3, 3, "F")
  doc.setFont("helvetica", "bold")
  doc.setFontSize(13)
  doc.setTextColor(COLORS.background)
  doc.text("¿Querés trabajar sobre lo que descubriste?", MARGIN + 8, y + 11)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(9)
  const cta = doc.splitTextToSize(
    "Si te interesa profundizar en tu liderazgo con acompañamiento personalizado, podemos conversar sobre cómo trabajarlo juntos desde un proceso de coaching ejecutivo.",
    CONTENT_W - 16,
  ) as string[]
  cta.forEach((line, k) => doc.text(line, MARGIN + 8, y + 17.5 + k * 4.2))
  const linksY = y + 17.5 + cta.length * 4.2 + 5
  const links: [string, string][] = [
    [SITE_LABEL, SITE_URL],
    [EMAIL, `mailto:${EMAIL}`],
    [INSTAGRAM_LABEL, INSTAGRAM_URL],
  ]
  let linkX = MARGIN + 8
  doc.setFont("helvetica", "bold")
  doc.setFontSize(9)
  links.forEach(([label, url]) => {
    doc.textWithLink(label, linkX, linksY, { url })
    linkX += doc.getTextWidth(label) + 9
  })
  doc.setFont("helvetica", "normal")
  doc.setFontSize(8)
  doc.textWithLink("Agendar una conversación", MARGIN + 8, linksY + 5.5, { url: BOOKING_URL })

  /* ------------------------------ Footers ------------------------------ */
  const pages = doc.getNumberOfPages()
  for (let page = 1; page <= pages; page++) {
    doc.setPage(page)
    doc.setDrawColor(COLORS.border)
    doc.setLineWidth(0.3)
    doc.line(MARGIN, PAGE_H - 17, PAGE_W - MARGIN, PAGE_H - 17)
    let textX = MARGIN
    if (isotipo) {
      doc.addImage(isotipo.dataUrl, "JPEG", MARGIN, PAGE_H - 14.5, 8 * isotipo.ratio, 8)
      textX += 8 * isotipo.ratio + 3
    }
    doc.setFont("helvetica", "bold")
    doc.setFontSize(8)
    doc.setTextColor(COLORS.foreground)
    doc.text("Johana Ríos · Liderazgo, Coaching, Calidad", textX, PAGE_H - 10.5)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(COLORS.primary)
    doc.textWithLink(SITE_LABEL, textX, PAGE_H - 6.5, { url: SITE_URL })
    doc.setTextColor(COLORS.muted)
    doc.text(`Página ${page} de ${pages}`, PAGE_W - MARGIN, PAGE_H - 8.5, { align: "right" })
  }

  doc.save(`radar-de-liderazgo-${isoDate()}.pdf`)
}
