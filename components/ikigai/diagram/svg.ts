import { COLORS, DIMENSION_STYLES } from "../brand"
import {
  BRAND_LINE,
  COMPASS,
  DIMENSIONS,
  DISCLAIMER,
  INTERSECTIONS,
  NEXT_STEP_FIELDS,
  PURPOSE_FIELD,
  SITE_LABEL,
  type DimensionId,
  type IntersectionId,
} from "../content"
import { keywordsByDimension, longDate, personName, sessionDate, type Answers } from "../state"
import { fitKeywords, fitParagraph, type FittedText, type Slot, type TextStyle } from "./text-fit"

export interface Logo {
  dataUrl: string
  ratio: number
}

export interface DiagramData {
  keywords: Record<DimensionId, string[]>
  hypothesis: string
}

export interface CoreOptions {
  variant: "full" | "compact"
  widthFactor?: number
  fontFamily?: string
}

export const EXPORT_FONT = "Helvetica, Arial, sans-serif"

const R = 270
const CIRCLES: Record<DimensionId, { cx: number; cy: number }> = {
  love: { cx: 500, cy: 330 },
  good: { cx: 330, cy: 500 },
  need: { cx: 670, cy: 500 },
  paid: { cx: 500, cy: 670 },
}

type Align = "start" | "end" | "center"

interface Region {
  cx: number
  title: Slot[]
  titleAlign: Align
  keywords: Slot[]
  keywordsAlign: Align
  compact: Slot[]
}

/** Text slots hand-placed inside the area that belongs only to each circle. */
const side = (cx: number): Region => ({
  cx,
  title: [
    { y: 424, w: 150 },
    { y: 445, w: 150 },
  ],
  titleAlign: "end",
  keywords: [478, 504, 530, 556, 582].map((y) => ({ y, w: 150 })),
  keywordsAlign: "start",
  compact: [
    { y: 450, w: 165 },
    { y: 486, w: 172 },
    { y: 522, w: 172 },
    { y: 558, w: 165 },
  ],
})

const REGIONS: Record<DimensionId, Region> = {
  love: {
    cx: 500,
    title: [{ y: 122, w: 320 }],
    titleAlign: "end",
    keywords: [
      { y: 158, w: 300 },
      { y: 184, w: 280 },
      { y: 210, w: 230 },
      { y: 236, w: 160 },
    ],
    keywordsAlign: "start",
    compact: [
      { y: 172, w: 320 },
      { y: 210, w: 260 },
    ],
  },
  good: side(162),
  need: side(838),
  paid: {
    cx: 500,
    title: [{ y: 892, w: 320 }],
    titleAlign: "start",
    keywords: [
      { y: 772, w: 160 },
      { y: 798, w: 230 },
      { y: 824, w: 280 },
      { y: 850, w: 300 },
    ],
    keywordsAlign: "end",
    compact: [
      { y: 812, w: 260 },
      { y: 852, w: 320 },
    ],
  },
}

const INTERSECTION_POS: Record<IntersectionId, { x: number; y: number }> = {
  passion: { x: 335, y: 330 },
  mission: { x: 665, y: 330 },
  profession: { x: 335, y: 662 },
  vocation: { x: 665, y: 662 },
}

const CENTER_R = 112
const PURPOSE_SLOTS: Slot[] = [
  { y: 470, w: 192 },
  { y: 492, w: 204 },
  { y: 514, w: 204 },
  { y: 536, w: 190 },
  { y: 558, w: 166 },
]

export function escapeXml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function fit(
  kind: "paragraph" | "keywords",
  content: string | string[],
  slots: Slot[],
  sizes: number[],
  style: TextStyle,
  align: Align,
): FittedText {
  if (align === "center") {
    // Try the middle slots first so short content sits in the visual centre of the area.
    const total = slots.length
    for (const size of sizes) {
      for (let count = 1; count <= total; count++) {
        const start = Math.floor((total - count) / 2)
        const chosen = slots.slice(start, start + count)
        const result =
          kind === "paragraph"
            ? fitParagraph(content as string, chosen, [size], style)
            : fitKeywords(content as string[], chosen, [size], style)
        if (!result.truncated) return result
      }
    }
    return kind === "paragraph"
      ? fitParagraph(content as string, slots, sizes.slice(-1), style)
      : fitKeywords(content as string[], slots, sizes.slice(-1), style)
  }
  return kind === "paragraph"
    ? fitParagraph(content as string, slots, sizes, style, align)
    : fitKeywords(content as string[], slots, sizes, style, align)
}

interface TextAttrs {
  x: number
  size: number
  fill: string
  weight?: number
  letterSpacing?: number
  italic?: boolean
  anchor?: "start" | "middle" | "end"
}

function textLines(fitted: FittedText, attrs: Omit<TextAttrs, "size">) {
  return fitted.lines.map((line) => textEl(line.text, line.y, { ...attrs, size: fitted.size })).join("")
}

function textEl(text: string, y: number, a: TextAttrs) {
  const attrs = [
    `x="${a.x}"`,
    `y="${y}"`,
    `font-size="${a.size}"`,
    `fill="${a.fill}"`,
    `text-anchor="${a.anchor ?? "middle"}"`,
    a.weight ? `font-weight="${a.weight}"` : "",
    a.letterSpacing ? `letter-spacing="${a.letterSpacing}"` : "",
    a.italic ? `font-style="italic"` : "",
  ]
    .filter(Boolean)
    .join(" ")
  return `<text ${attrs}>${escapeXml(text)}</text>`
}

export function diagramDataFrom(answers: Answers): DiagramData {
  return { keywords: keywordsByDimension(answers), hypothesis: (answers[PURPOSE_FIELD.id] ?? "").trim() }
}

/** The four-circle diagram in a 1000×1000 coordinate space. Returns inner SVG markup. */
export function buildCoreMarkup(data: DiagramData, options: CoreOptions) {
  const wf = options.widthFactor ?? 1
  const full = options.variant === "full"
  let truncated = false
  const parts: string[] = []

  for (const d of DIMENSIONS) {
    const { cx, cy } = CIRCLES[d.id]
    parts.push(`<circle cx="${cx}" cy="${cy}" r="${R}" fill="${DIMENSION_STYLES[d.id].stroke}" fill-opacity="0.11"/>`)
  }
  for (const d of DIMENSIONS) {
    const { cx, cy } = CIRCLES[d.id]
    const s = DIMENSION_STYLES[d.id]
    parts.push(
      `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${s.stroke}" stroke-width="3"${
        s.dash ? ` stroke-dasharray="${s.dash}" stroke-linecap="round"` : ""
      }/>`,
    )
  }

  for (const d of DIMENSIONS) {
    const region = REGIONS[d.id]
    const s = DIMENSION_STYLES[d.id]
    if (full) {
      const titleStyle: TextStyle = { weight: 700, letterSpacing: 1.2, widthFactor: wf }
      const title = fit("paragraph", d.diagramTitle.toUpperCase(), region.title, [14, 13, 12], titleStyle, region.titleAlign)
      parts.push(textLines(title, { x: region.cx, fill: s.text, weight: 700, letterSpacing: 1.2 }))

      const words = data.keywords[d.id]
      if (words.length) {
        const kw = fit("keywords", words, region.keywords, [18, 17, 16, 15, 14], { widthFactor: wf }, region.keywordsAlign)
        truncated ||= kw.truncated
        parts.push(textLines(kw, { x: region.cx, fill: COLORS.foreground }))
      } else {
        const slot = region.keywordsAlign === "end" ? region.keywords[region.keywords.length - 1] : region.keywords[0]
        const empty = fitParagraph("Sin palabras clave", [slot], [14], { widthFactor: wf })
        parts.push(textLines(empty, { x: region.cx, fill: COLORS.muted, italic: true }))
      }
    } else {
      const title = fit("paragraph", d.diagramTitle, region.compact, [30, 28, 26, 24, 22], { weight: 700, widthFactor: wf }, "center")
      parts.push(textLines(title, { x: region.cx, fill: s.text, weight: 700 }))
    }
  }

  for (const i of INTERSECTIONS) {
    const p = INTERSECTION_POS[i.id]
    if (full) {
      parts.push(textEl(i.name.toUpperCase(), p.y, { x: p.x, size: 14, fill: COLORS.foreground, weight: 700, letterSpacing: 1.4 }))
      parts.push(textEl(i.formula, p.y + 20, { x: p.x, size: 12, fill: COLORS.muted }))
    } else {
      parts.push(textEl(i.name, p.y + 8, { x: p.x, size: 24, fill: COLORS.foreground, weight: 700 }))
    }
  }

  parts.push(
    `<circle cx="500" cy="500" r="${CENTER_R}" fill="${COLORS.background}" fill-opacity="0.94" stroke="${COLORS.primary}" stroke-width="2"/>`,
  )
  if (full) {
    parts.push(textEl("MI PROPÓSITO", 422, { x: 500, size: 12, fill: COLORS.primary, weight: 700, letterSpacing: 1.6 }))
    parts.push(textEl("PROFESIONAL", 439, { x: 500, size: 12, fill: COLORS.primary, weight: 700, letterSpacing: 1.6 }))
    if (data.hypothesis) {
      const purpose = fit("paragraph", data.hypothesis, PURPOSE_SLOTS, [16, 15, 14, 13, 12, 11], { widthFactor: wf }, "center")
      truncated ||= purpose.truncated
      parts.push(textLines(purpose, { x: 500, fill: COLORS.foreground }))
    } else {
      const empty = fit("paragraph", "Tu hipótesis aparecerá acá", PURPOSE_SLOTS, [14], { widthFactor: wf }, "center")
      parts.push(textLines(empty, { x: 500, fill: COLORS.muted, italic: true }))
    }
  } else {
    parts.push(textEl("Mi propósito", 494, { x: 500, size: 24, fill: COLORS.primary, weight: 700 }))
    parts.push(textEl("profesional", 524, { x: 500, size: 24, fill: COLORS.primary, weight: 700 }))
  }

  return { markup: parts.join(""), truncated }
}

export function buildScreenSvg(data: DiagramData, variant: CoreOptions["variant"]) {
  const { markup, truncated } = buildCoreMarkup(data, { variant, widthFactor: 1.1 })
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="40 40 920 920" width="100%" height="100%" style="font-family:inherit;display:block" aria-hidden="true" focusable="false">${markup}</svg>`
  return { svg, truncated }
}

/** Square diagram used inside the PDF report. */
export function buildSquareExportSvg(data: DiagramData, size: number) {
  const { markup, truncated } = buildCoreMarkup(data, { variant: "full" })
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="40 40 920 920" font-family="${EXPORT_FONT}"><rect x="40" y="40" width="920" height="920" fill="${COLORS.background}"/>${markup}</svg>`
  return { svg, truncated }
}

export interface PrintAssets {
  logo: Logo | null
  isotipo: Logo | null
}

const A4_W = 2100
const A4_H = 2970
const M = 150

/**
 * One A4 page in 0.1 mm units: header, diagram, compass summary, next step and brand footer.
 * Width/height are the output pixel size (2480×3508 = A4 at 300 DPI).
 */
export function buildPrintSvg(answers: Answers, assets: PrintAssets, pixelWidth = 2480) {
  const data = diagramDataFrom(answers)
  const core = buildCoreMarkup(data, { variant: "full" })
  let truncated = core.truncated
  const name = personName(answers)
  const date = longDate(sessionDate(answers))
  const parts: string[] = []
  const pixelHeight = Math.round((pixelWidth * A4_H) / A4_W)

  parts.push(`<rect width="${A4_W}" height="${A4_H}" fill="${COLORS.background}"/>`)

  // Header
  parts.push(textEl("IKIGAI PROFESIONAL", 200, { x: M, size: 30, fill: COLORS.primary, weight: 700, letterSpacing: 5, anchor: "start" }))
  const titleText = name ? `El Ikigai profesional de ${name}` : "Mi Ikigai profesional"
  const title = fitParagraph(titleText, [{ y: 282, w: 1260 }], [64, 58, 52, 46, 40], { weight: 700 })
  truncated ||= title.truncated
  parts.push(textLines(title, { x: M, fill: COLORS.foreground, weight: 700, anchor: "start" }))
  parts.push(textEl(date, 340, { x: M, size: 30, fill: COLORS.muted, anchor: "start" }))
  if (assets.logo) {
    const h = 190
    const w = h * assets.logo.ratio
    parts.push(`<image href="${assets.logo.dataUrl}" x="${A4_W - M - w}" y="140" width="${w}" height="${h}" preserveAspectRatio="xMidYMid meet"/>`)
  } else {
    parts.push(textEl("Johana Ríos", 230, { x: A4_W - M, size: 44, fill: COLORS.foreground, weight: 700, anchor: "end" }))
  }
  parts.push(`<line x1="${M}" y1="380" x2="${A4_W - M}" y2="380" stroke="${COLORS.border}" stroke-width="3"/>`)

  // Diagram: core viewBox 40..960 (920 units) scaled to 1800 units wide.
  const scale = 1800 / 920
  parts.push(`<g transform="translate(${M - 40 * scale} ${400 - 40 * scale}) scale(${scale})">${core.markup}</g>`)

  // Compass summary
  const compassTop = 2250
  parts.push(textEl("MI BRÚJULA PROFESIONAL", compassTop, { x: M, size: 26, fill: COLORS.primary, weight: 700, letterSpacing: 4, anchor: "start" }))
  const gap = 36
  const colW = (A4_W - 2 * M - 3 * gap) / 4
  COMPASS.forEach((card, i) => {
    const x = M + i * (colW + gap)
    parts.push(`<rect x="${x}" y="${compassTop + 28}" width="${colW}" height="300" rx="20" fill="${COLORS.card}" stroke="${COLORS.border}" stroke-width="2"/>`)
    parts.push(textEl(card.title, compassTop + 86, { x: x + 28, size: 30, fill: COLORS.foreground, weight: 700, anchor: "start" }))
    const text = card.fields
      .map((f) => (answers[f.id] ?? "").trim())
      .filter(Boolean)
      .join(" — ")
    const slots = [0, 1, 2, 3, 4, 5].map((k) => ({ y: compassTop + 132 + k * 32, w: colW - 56 }))
    if (text) {
      const body = fitParagraph(text, slots, [24, 22, 20], {})
      truncated ||= body.truncated
      parts.push(textLines(body, { x: x + 28, fill: COLORS.foreground, anchor: "start" }))
    } else {
      parts.push(textEl("Sin completar", slots[0].y, { x: x + 28, size: 22, fill: COLORS.muted, italic: true, anchor: "start" }))
    }
  })

  // Next step
  const stepTop = 2610
  const nextStep = (answers[NEXT_STEP_FIELDS.step.id] ?? "").trim()
  const nextDate = (answers[NEXT_STEP_FIELDS.date.id] ?? "").trim()
  parts.push(`<rect x="${M}" y="${stepTop}" width="${A4_W - 2 * M}" height="120" rx="20" fill="${COLORS.primarySoft}"/>`)
  parts.push(textEl("MI PRÓXIMO PASO", stepTop + 46, { x: M + 32, size: 22, fill: COLORS.primary, weight: 700, letterSpacing: 3, anchor: "start" }))
  if (nextDate) {
    const [y, m, d] = nextDate.split("-").map(Number)
    const label = Number.isFinite(y) && m && d ? longDate(new Date(y, m - 1, d)) : nextDate
    parts.push(textEl(label, stepTop + 46, { x: A4_W - M - 32, size: 22, fill: COLORS.primary, weight: 700, anchor: "end" }))
  }
  if (nextStep) {
    const step = fitParagraph(nextStep, [{ y: stepTop + 92, w: A4_W - 2 * M - 64 }], [28, 26, 24, 22], {})
    truncated ||= step.truncated
    parts.push(textLines(step, { x: M + 32, fill: COLORS.foreground, anchor: "start" }))
  } else {
    parts.push(textEl("Sin completar", stepTop + 92, { x: M + 32, size: 24, fill: COLORS.muted, italic: true, anchor: "start" }))
  }

  if (truncated) {
    parts.push(
      textEl("Versión resumida para el diagrama. El reporte completo conserva tus respuestas íntegras.", 2775, {
        x: A4_W / 2,
        size: 20,
        fill: COLORS.muted,
        italic: true,
      }),
    )
  }

  // Footer
  const footerTop = 2810
  parts.push(`<line x1="${M}" y1="${footerTop}" x2="${A4_W - M}" y2="${footerTop}" stroke="${COLORS.border}" stroke-width="3"/>`)
  let textX = M
  if (assets.isotipo) {
    const h = 64
    parts.push(`<image href="${assets.isotipo.dataUrl}" x="${M}" y="${footerTop + 18}" width="${h * assets.isotipo.ratio}" height="${h}"/>`)
    textX = M + h * assets.isotipo.ratio + 20
  }
  parts.push(textEl(BRAND_LINE, footerTop + 46, { x: textX, size: 24, fill: COLORS.foreground, weight: 700, anchor: "start" }))
  parts.push(textEl(`${SITE_LABEL} · ${DISCLAIMER}`, footerTop + 76, { x: textX, size: 20, fill: COLORS.muted, anchor: "start" }))
  parts.push(textEl(`Creado el ${date}`, footerTop + 61, { x: A4_W - M, size: 20, fill: COLORS.muted, anchor: "end" }))

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${pixelWidth}" height="${pixelHeight}" viewBox="0 0 ${A4_W} ${A4_H}" font-family="${EXPORT_FONT}">${parts.join("")}</svg>`
  return { svg, truncated, width: pixelWidth, height: pixelHeight }
}
