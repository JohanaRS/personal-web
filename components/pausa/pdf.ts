import type { jsPDF as JsPDF } from "jspdf"
import { loadLogo } from "../ikigai/export/assets"
import {
  DISCLAIMER,
  PENDING_LABEL,
  QUESTIONS,
  REPORT_SECTIONS,
  REPORT_TITLE,
  SIGNATURE_NAME,
  SIGNATURE_ROLE,
  SITE_LABEL,
  USE_MODES,
} from "./content"
import { filled, isPending, longDate, pdfFileName, type PausaAnswers } from "./state"

const C = {
  marfil: "#F5F1E8",
  carbon: "#303638",
  oliva: "#6B7C5A",
  salvia: "#D8D9C7",
  arcilla: "#B8715D",
}

const PAGE_W = 595.28
const PAGE_H = 841.89
const M = 56
const CONTENT_W = PAGE_W - M * 2
const BOTTOM = PAGE_H - 64

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
function clean(text: string) {
  return text
    .replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, "")
    .replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, "")
    .replace(/\r\n?/g, "\n")
    .trim()
}

class Writer {
  y = M
  constructor(private doc: JsPDF) {}

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

  font(family: "Fraunces" | "Manrope", style: "normal" | "bold", size: number, color: string) {
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
    opts: { size: number; lineHeight: number; x?: number; width?: number; fill?: string; padding?: number } & {
      family?: "Fraunces" | "Manrope"
      style?: "normal" | "bold"
      color?: string
    },
  ) {
    const padding = opts.fill ? (opts.padding ?? 16) : 0
    const x = (opts.x ?? M) + padding
    const width = (opts.width ?? CONTENT_W) - padding * 2
    this.font(opts.family ?? "Manrope", opts.style ?? "normal", opts.size, opts.color ?? C.carbon)
    const all = this.lines(text, width)
    let index = 0
    while (index < all.length) {
      const available = BOTTOM - this.y - padding * 2
      let count = Math.max(1, Math.floor(available / opts.lineHeight))
      if (available < opts.lineHeight) {
        this.newPage()
        this.font(opts.family ?? "Manrope", opts.style ?? "normal", opts.size, opts.color ?? C.carbon)
        continue
      }
      count = Math.min(count, all.length - index)
      const segment = all.slice(index, index + count)
      const height = segment.length * opts.lineHeight
      if (opts.fill) {
        this.doc.setFillColor(opts.fill)
        this.doc.roundedRect(x - padding, this.y, width + padding * 2, height + padding * 2, 8, 8, "F")
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
        this.font(opts.family ?? "Manrope", opts.style ?? "normal", opts.size, opts.color ?? C.carbon)
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

function useModeLabel(answers: PausaAnswers) {
  return USE_MODES.find((mode) => mode.id === answers.useMode)?.label ?? ""
}

export async function downloadPausaPdf(answers: PausaAnswers, date = new Date()) {
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
  doc.setProperties({
    title: REPORT_TITLE,
    subject: "PAUSA: una pausa estratégica para usar IA con criterio propio",
    author: SIGNATURE_NAME,
    creator: SITE_LABEL,
  })
  doc.setLanguage("es")

  const w = new Writer(doc)
  w.paintBackground()

  if (logo) {
    const h = 64
    doc.addImage(logo.dataUrl, "PNG", M, M - 8, h * logo.ratio, h)
    w.y = M - 8 + h + 28
  }

  w.font("Manrope", "bold", 9, C.oliva)
  doc.setCharSpace(1.4)
  doc.text("PAUSA · IA CON CRITERIO PROPIO", M, w.y)
  doc.setCharSpace(0)
  w.gap(14)
  w.text(REPORT_TITLE, { family: "Fraunces", size: 30, lineHeight: 36 })
  w.gap(4)
  w.text(longDate(date), { size: 10.5, lineHeight: 15 })
  w.gap(18)

  w.text("La tarea", { style: "bold", size: 9, lineHeight: 13, color: C.oliva })
  w.gap(4)
  w.text(clean(answers.task) || PENDING_LABEL, {
    family: "Fraunces",
    size: 15,
    lineHeight: 21,
    color: filled(answers.task) ? C.carbon : C.arcilla,
  })
  w.gap(20)

  w.text("MI PRÓXIMO PASO", { style: "bold", size: 9, lineHeight: 13, color: C.carbon })
  w.gap(6)
  const nextStep = clean(answers.nextStep) || PENDING_LABEL
  const detail = clean(answers.nextStepDetail)
  w.text(detail ? `${nextStep}\n\n${detail}` : nextStep, {
    family: "Fraunces",
    size: 15,
    lineHeight: 22,
    fill: C.salvia,
    padding: 20,
  })
  w.gap(28)

  for (const section of REPORT_SECTIONS) {
    w.ensure(90)
    w.rule()
    w.gap(22)
    w.text(section.title, { family: "Fraunces", size: 18, lineHeight: 24 })
    w.gap(10)
    for (const id of section.ids) {
      const step = QUESTIONS.find((q) => q.id === id)
      if (!step) continue
      w.ensure(70)
      w.text(`${step.letter} · ${step.name.toUpperCase()} · ${step.moment.toUpperCase()}`, {
        style: "bold",
        size: 8.5,
        lineHeight: 12,
        color: C.oliva,
      })
      w.gap(2)
      w.text(step.question, { style: "bold", size: 11, lineHeight: 16 })
      w.gap(4)
      if (id === "uso" && answers.useMode) {
        w.text(`Elegí avanzar: ${useModeLabel(answers).toLowerCase()}.`, { size: 10.5, lineHeight: 16 })
        w.gap(2)
      }
      const pending = isPending(answers, id)
      const pendingNote = pending && filled(answers[id]) ? `${PENDING_LABEL}\n\nNota previa: ${clean(answers[id])}` : null
      w.text(pending ? (pendingNote ?? PENDING_LABEL) : clean(answers[id]), {
        size: 10.5,
        lineHeight: 16,
        color: pending ? C.arcilla : C.carbon,
        style: pending && !pendingNote ? "bold" : "normal",
      })
      w.gap(16)
    }
  }

  w.ensure(140)
  w.gap(6)
  w.rule()
  w.gap(26)
  w.text("Con criterio propio,", { size: 10.5, lineHeight: 16 })
  w.gap(4)
  w.text(SIGNATURE_NAME, { family: "Fraunces", size: 20, lineHeight: 26 })
  w.text(SIGNATURE_ROLE, { size: 9.5, lineHeight: 14, color: C.carbon })
  w.gap(18)
  w.text(DISCLAIMER, { size: 8.5, lineHeight: 12.5 })

  const total = doc.getNumberOfPages()
  for (let page = 1; page <= total; page++) {
    doc.setPage(page)
    doc.setDrawColor(C.salvia)
    doc.setLineWidth(0.8)
    doc.line(M, PAGE_H - 44, PAGE_W - M, PAGE_H - 44)
    doc.setFont("Manrope", "normal")
    doc.setFontSize(8.5)
    doc.setTextColor(C.carbon)
    doc.text(`${SIGNATURE_NAME} · ${SITE_LABEL}`, M, PAGE_H - 28)
    doc.text(`${page} / ${total}`, PAGE_W - M, PAGE_H - 28, { align: "right" })
  }

  doc.save(pdfFileName(date))
}
