import type { jsPDF as JsPDF } from "jspdf"
import { loadLogo } from "../ikigai/export/assets"

export const C = {
  marfil: "#F5F1E8",
  carbon: "#303638",
  oliva: "#6B7C5A",
  salvia: "#D8D9C7",
  arcilla: "#B8715D",
}

export const PAGE_W = 595.28
export const PAGE_H = 841.89
export const M = 56
export const CONTENT_W = PAGE_W - M * 2
export const BOTTOM = PAGE_H - 64

const FONTS = [
  { file: "Fraunces-SemiBold.ttf", family: "Fraunces", style: "normal" },
  { file: "Manrope-Regular.ttf", family: "Manrope", style: "normal" },
  { file: "Manrope-Bold.ttf", family: "Manrope", style: "bold" },
] as const

function toBase64(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer)
  let binary = ""
  const chunk = 0x8000
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk))
  }
  return btoa(binary)
}

let fontCache: Promise<{ file: string; family: string; style: string; data: string }[]> | null = null

function loadFonts() {
  fontCache ??= Promise.all(
    FONTS.map(async (font) => {
      const res = await fetch(`/fonts/pausa/${font.file}`)
      if (!res.ok) throw new Error(`No se pudo cargar ${font.file}`)
      return { ...font, data: toBase64(await res.arrayBuffer()) }
    }),
  ).catch((error) => {
    fontCache = null
    throw error
  })
  return fontCache
}

/** The embedded fonts cover Latin text; drop emoji and control characters that would render as boxes. */
export function clean(text: string) {
  return text
    .replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, "")
    .replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, "")
    .replace(/\r\n?/g, "\n")
    .trim()
}

type Family = "Fraunces" | "Manrope"
type Style = "normal" | "bold"

export class Writer {
  y = M
  constructor(public doc: JsPDF) {}

  paintBackground() {
    this.doc.setFillColor(C.marfil)
    this.doc.rect(0, 0, PAGE_W, PAGE_H, "F")
  }

  newPage() {
    this.doc.addPage()
    this.paintBackground()
    this.y = M
  }

  ensure(height: number) {
    if (this.y + height > BOTTOM) this.newPage()
  }

  font(family: Family, style: Style, size: number, color: string) {
    this.doc.setFont(family, style)
    this.doc.setFontSize(size)
    this.doc.setTextColor(color)
  }

  lines(text: string, width: number) {
    return this.doc.splitTextToSize(text, width) as string[]
  }

  /** Writes wrapped text, breaking across pages line by line. Optional fill draws a panel behind each page segment. */
  text(
    text: string,
    opts: {
      size: number
      lineHeight: number
      x?: number
      width?: number
      fill?: string
      padding?: number
      family?: Family
      style?: Style
      color?: string
    },
  ) {
    const padding = opts.fill ? (opts.padding ?? 16) : 0
    const x = (opts.x ?? M) + padding
    const width = (opts.width ?? CONTENT_W) - padding * 2
    const setFont = () => this.font(opts.family ?? "Manrope", opts.style ?? "normal", opts.size, opts.color ?? C.carbon)
    setFont()
    const all = this.lines(text, width)
    let index = 0
    while (index < all.length) {
      const available = BOTTOM - this.y - padding * 2
      if (available < opts.lineHeight) {
        this.newPage()
        setFont()
        continue
      }
      const count = Math.min(Math.max(1, Math.floor(available / opts.lineHeight)), all.length - index)
      const segment = all.slice(index, index + count)
      const height = segment.length * opts.lineHeight
      if (opts.fill) {
        this.doc.setFillColor(opts.fill)
        this.doc.roundedRect(x - padding, this.y, width + padding * 2, height + padding * 2, 8, 8, "F")
        setFont()
      }
      let lineY = this.y + padding + opts.size * 0.85
      for (const line of segment) {
        this.doc.text(line, x, lineY)
        lineY += opts.lineHeight
      }
      this.y += height + padding * 2
      index += count
      if (index < all.length) {
        this.newPage()
        setFont()
      }
    }
  }

  gap(size: number) {
    this.y += size
  }

  rule(color = C.salvia) {
    this.doc.setDrawColor(color)
    this.doc.setLineWidth(0.8)
    this.doc.line(M, this.y, PAGE_W - M, this.y)
  }
}

/** Creates an A4 document with the brand fonts embedded, the marfil background and the official logo on top. */
export async function createBrandDocument(meta: { title: string; subject: string; author: string; creator: string }) {
  const [{ jsPDF }, fonts, logo] = await Promise.all([
    import("jspdf"),
    loadFonts(),
    loadLogo("/images/logo-principal.png", C.marfil),
  ])

  const doc = new jsPDF({ unit: "pt", format: "a4", compress: true })
  for (const font of fonts) {
    doc.addFileToVFS(font.file, font.data)
    doc.addFont(font.file, font.family, font.style)
  }
  doc.setProperties(meta)
  doc.setLanguage("es")

  const w = new Writer(doc)
  w.paintBackground()

  if (logo) {
    const h = 64
    doc.addImage(logo.dataUrl, "PNG", M, M - 8, h * logo.ratio, h)
    w.y = M - 8 + h + 28
  }
  return w
}

export function eyebrow(w: Writer, label: string) {
  w.font("Manrope", "bold", 9, C.oliva)
  w.doc.setCharSpace(1.4)
  w.doc.text(label, M, w.y)
  w.doc.setCharSpace(0)
}

export function addPageFooters(doc: JsPDF, label: string) {
  const total = doc.getNumberOfPages()
  for (let page = 1; page <= total; page++) {
    doc.setPage(page)
    doc.setDrawColor(C.salvia)
    doc.setLineWidth(0.8)
    doc.line(M, PAGE_H - 44, PAGE_W - M, PAGE_H - 44)
    doc.setFont("Manrope", "normal")
    doc.setFontSize(8.5)
    doc.setTextColor(C.carbon)
    doc.text(label, M, PAGE_H - 28)
    doc.text(`${page} / ${total}`, PAGE_W - M, PAGE_H - 28, { align: "right" })
  }
}
