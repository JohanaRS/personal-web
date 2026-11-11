import type { jsPDF as JsPDF } from "jspdf"
import { COLORS, DIMENSION_STYLES } from "../brand"
import {
  BRAND_LINE,
  CLOSING_FIELDS,
  CLOSING_MESSAGE,
  COMPASS,
  DIMENSIONS,
  DISCLAIMER,
  INTERSECTIONS,
  intersectionFieldId,
  NEXT_STEP_FIELDS,
  PURPOSE_FIELD,
  SITE_LABEL,
  SITE_URL,
  type DimensionId,
} from "../content"
import { buildSquareExportSvg, diagramDataFrom } from "../diagram/svg"
import { exportFileName, longDate, parseKeywords, personName, sessionDate, type Answers } from "../state"
import { downloadBlob, loadBrandAssets, svgToCanvas } from "./assets"

const PAGE_W = 210
const PAGE_H = 297
const M = 18
const CONTENT_W = PAGE_W - M * 2
const CONTENT_BOTTOM = PAGE_H - 24
const BODY = 10
const LH = 5

/** The built-in PDF fonts cover Latin-1 (tildes, ñ, ¿, ¡). Normalise typographic characters and drop the rest (emoji). */
function clean(text: string) {
  return text
    .replace(/[\u2018\u2019\u201A]/g, "'")
    .replace(/[\u201C\u201D\u201E]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u2026/g, "...")
    .replace(/[\u2022\u25CF]/g, "·")
    .replace(/\r\n?/g, "\n")
    .replace(/\t/g, "  ")
    .replace(/[^\n\u0020-\u007E\u00A0-\u00FF]/g, "")
    .trim()
}

function formatDateField(raw: string) {
  const [y, m, d] = raw.split("-").map(Number)
  return y && m && d ? longDate(new Date(y, m - 1, d)) : raw
}

async function renderDiagramPng(answers: Answers) {
  const size = 2400
  const { svg, truncated } = buildSquareExportSvg(diagramDataFrom(answers), size)
  const canvas = await svgToCanvas(svg, size, size)
  return { dataUrl: canvas.toDataURL("image/png"), truncated }
}

export async function buildReportPdf(answers: Answers): Promise<Blob> {
  const [{ jsPDF, GState }, assets, diagram] = await Promise.all([
    import("jspdf"),
    loadBrandAssets(),
    renderDiagramPng(answers),
  ])

  const doc: JsPDF = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" })
  const name = personName(answers)
  const date = longDate(sessionDate(answers))
  doc.setProperties({
    title: name ? `Mi Ikigai profesional - ${clean(name)}` : "Mi Ikigai profesional",
    subject: "Ikigai profesional - Johana Ríos",
    author: "Johana Ríos",
    creator: SITE_LABEL,
  })

  let y = M
  const paint = () => {
    doc.setFillColor(COLORS.background)
    doc.rect(0, 0, PAGE_W, PAGE_H, "F")
  }
  const newPage = () => {
    doc.addPage()
    paint()
    y = M + 4
  }
  const ensure = (height: number) => {
    if (y + height > CONTENT_BOTTOM) newPage()
  }
  const font = (style: "normal" | "bold" | "italic", size: number, color: string) => {
    doc.setFont("helvetica", style)
    doc.setFontSize(size)
    doc.setTextColor(color)
  }
  const split = (text: string, width: number) => doc.splitTextToSize(clean(text), width) as string[]

  /** Writes line by line so long answers flow onto the next page instead of being cut. */
  const writeLines = (lines: string[], x: number, lh: number) => {
    for (const line of lines) {
      ensure(lh)
      doc.text(line, x, y + lh * 0.75)
      y += lh
    }
  }

  const eyebrow = (text: string, x: number, yy: number, align: "left" | "center" | "right" = "left") => {
    font("bold", 7.5, COLORS.primary)
    doc.setCharSpace(0.6)
    doc.text(clean(text).toUpperCase(), x, yy, { align })
    doc.setCharSpace(0)
  }

  const sectionTitle = (number: number, title: string, intro?: string) => {
    ensure(34)
    eyebrow(`Sección ${number}`, M, y + 4)
    y += 7
    font("bold", 18, COLORS.foreground)
    doc.text(clean(title), M, y + 6)
    y += 10
    if (intro) {
      font("normal", BODY, COLORS.muted)
      writeLines(split(intro, CONTENT_W), M, LH)
    }
    doc.setDrawColor(COLORS.border)
    doc.setLineWidth(0.3)
    doc.line(M, y + 2, PAGE_W - M, y + 2)
    y += 8
  }

  const qa = (label: string, value: string | undefined) => {
    font("bold", 9.5, COLORS.foreground)
    const labelLines = split(label, CONTENT_W)
    const answer = (value ?? "").trim()
    font("normal", BODY, COLORS.foreground)
    const answerLines = answer ? split(answer, CONTENT_W - 4) : ["Sin respuesta"]
    // Keep the question together with the start of its answer.
    ensure(labelLines.length * 4.6 + Math.min(answerLines.length, 3) * LH + 2)
    font("bold", 9.5, COLORS.foreground)
    writeLines(labelLines, M, 4.6)
    y += 1
    if (answer) font("normal", BODY, COLORS.foreground)
    else font("italic", BODY, COLORS.muted)
    const startPage = doc.getNumberOfPages()
    const startY = y
    writeLines(answerLines, M + 4, LH)
    if (doc.getNumberOfPages() === startPage) {
      doc.setDrawColor(COLORS.border)
      doc.setLineWidth(0.6)
      doc.line(M + 0.8, startY + 0.5, M + 0.8, y - 0.5)
    }
    y += 4
  }

  const marker = (id: DimensionId, x: number, cy: number, r = 2.4) => {
    const style = DIMENSION_STYLES[id]
    doc.saveGraphicsState()
    doc.setGState(new GState({ opacity: 0.15 }))
    doc.setFillColor(style.stroke)
    doc.circle(x, cy, r, "F")
    doc.restoreGraphicsState()
    doc.setDrawColor(style.stroke)
    doc.setLineWidth(0.45)
    const dash = style.dash ? style.dash.split(" ").map((n) => Number(n) / 14) : []
    doc.setLineDashPattern(dash, 0)
    doc.circle(x, cy, r, "S")
    doc.setLineDashPattern([], 0)
  }

  const highlight = (text: string, size: number) => {
    font("bold", size, COLORS.foreground)
    const lh = size * 0.5
    let lines = split(text, CONTENT_W - 16)
    while (lines.length) {
      const room = Math.floor((CONTENT_BOTTOM - y - 14) / lh)
      if (room < 2) {
        newPage()
        continue
      }
      const chunk = lines.slice(0, room)
      lines = lines.slice(room)
      const h = chunk.length * lh + 12
      doc.setFillColor(COLORS.primarySoft)
      doc.roundedRect(M, y, CONTENT_W, h, 3, 3, "F")
      doc.setFillColor(COLORS.primary)
      doc.rect(M, y, 1.4, h, "F")
      font("bold", size, COLORS.foreground)
      chunk.forEach((line, i) => doc.text(line, M + 8, y + 6 + lh * 0.75 + i * lh))
      y += h + 4
      if (lines.length) newPage()
    }
  }

  /* ------------------------------ Cover ------------------------------ */
  paint()
  if (assets.logo) {
    const h = 46
    const w = h * assets.logo.ratio
    doc.addImage(assets.logo.dataUrl, "PNG", (PAGE_W - w) / 2, 34, w, h)
  } else {
    font("bold", 22, COLORS.foreground)
    doc.text("Johana Ríos", PAGE_W / 2, 60, { align: "center" })
  }
  doc.setDrawColor(COLORS.border)
  doc.setLineWidth(0.3)
  doc.line(M + 30, 96, PAGE_W - M - 30, 96)
  eyebrow("Ikigai profesional", PAGE_W / 2, 114, "center")
  font("bold", 30, COLORS.foreground)
  doc.text("Mi Ikigai profesional", PAGE_W / 2, 128, { align: "center" })
  font("normal", 12, COLORS.muted)
  doc.text("Una exploración de identidad, propósito y dirección profesional", PAGE_W / 2, 138, { align: "center" })
  let coverY = 156
  if (name) {
    font("bold", 16, COLORS.foreground)
    const nameLines = split(name, CONTENT_W - 20)
    nameLines.forEach((line) => {
      doc.text(line, PAGE_W / 2, coverY, { align: "center" })
      coverY += 7
    })
  }
  font("normal", 11, COLORS.muted)
  doc.text(clean(date), PAGE_W / 2, coverY + 1, { align: "center" })

  // Small four-circle motif, drawn as vectors.
  const mx = PAGE_W / 2
  const my = 212
  const mr = 21
  const mo = 13
  const centers: Record<DimensionId, [number, number]> = {
    love: [mx, my - mo],
    good: [mx - mo, my],
    need: [mx + mo, my],
    paid: [mx, my + mo],
  }
  DIMENSIONS.forEach((d) => {
    const [cx, cy] = centers[d.id]
    marker(d.id, cx, cy, mr)
  })
  doc.setFillColor(COLORS.background)
  doc.setDrawColor(COLORS.primary)
  doc.setLineWidth(0.4)
  doc.circle(mx, my, 6.5, "FD")

  font("normal", 10, COLORS.primary)
  doc.textWithLink(SITE_LABEL, PAGE_W / 2 - doc.getTextWidth(SITE_LABEL) / 2, 256, { url: SITE_URL })
  font("italic", 8.5, COLORS.muted)
  doc.text(DISCLAIMER, PAGE_W / 2, 262, { align: "center" })

  /* ------------------------ 1. Cuatro dimensiones ------------------------ */
  newPage()
  sectionTitle(1, "Mis cuatro dimensiones", "Todo lo que respondiste en cada una de las cuatro dimensiones de tu Ikigai profesional.")
  DIMENSIONS.forEach((d) => {
    ensure(34)
    marker(d.id, M + 2.6, y + 3.4)
    font("bold", 13, COLORS.foreground)
    doc.text(clean(d.name), M + 8, y + 5)
    y += 9
    font("italic", 9.5, COLORS.muted)
    writeLines(split(d.intro, CONTENT_W), M, 4.8)
    y += 3
    d.questions.forEach((q) => qa(q.label, answers[q.id]))
    const kws = parseKeywords(answers[d.keywords.id])
    qa(d.keywords.label, kws.join(" · "))
    y += 4
  })

  /* ------------------------ 2. Intersecciones ------------------------ */
  newPage()
  sectionTitle(2, "Mis intersecciones", "Lo que aparece cuando dos dimensiones se cruzan.")
  INTERSECTIONS.forEach((i) => {
    ensure(26)
    font("bold", 12, COLORS.foreground)
    doc.text(clean(i.name), M, y + 4.5)
    const nameWidth = doc.getTextWidth(clean(i.name))
    font("normal", 9, COLORS.muted)
    doc.text(clean(i.formula), M + nameWidth + 3, y + 4.5)
    y += 8
    qa(i.question, answers[intersectionFieldId(i.id)])
  })

  /* ------------------------ 3. Propósito ------------------------ */
  y += 4
  sectionTitle(3, "Mi propósito profesional")
  const hypothesis = (answers[PURPOSE_FIELD.id] ?? "").trim()
  if (hypothesis) highlight(hypothesis, 13)
  else {
    font("italic", BODY, COLORS.muted)
    writeLines(["Todavía sin redactar."], M, LH)
  }
  font("italic", 9, COLORS.muted)
  writeLines(
    split("No es una promesa eterna ni un eslogan. Es una hipótesis que debe sentirse verdadera y útil hoy.", CONTENT_W),
    M,
    4.6,
  )

  /* ------------------------ 4. Diagrama ------------------------ */
  newPage()
  sectionTitle(4, "Mi diagrama de Ikigai", "Construido exclusivamente con tus palabras clave y tu hipótesis de propósito.")
  const side = Math.min(CONTENT_W, CONTENT_BOTTOM - y - 30)
  doc.addImage(diagram.dataUrl, "PNG", M + (CONTENT_W - side) / 2, y, side, side, undefined, "FAST")
  y += side + 6
  font("normal", 8.5, COLORS.muted)
  const legendW = CONTENT_W / 2
  DIMENSIONS.forEach((d, i) => {
    const col = i % 2
    const row = Math.floor(i / 2)
    const lx = M + col * legendW
    const ly = y + row * 6
    marker(d.id, lx + 2.4, ly + 1.6, 2)
    font("normal", 8.5, COLORS.foreground)
    doc.text(`${clean(d.name)} · ${DIMENSION_STYLES[d.id].pattern.toLowerCase()}`, lx + 7, ly + 2.8)
  })
  y += 14
  if (diagram.truncated) {
    font("italic", 8.5, COLORS.muted)
    writeLines(
      split("Algunas frases se muestran resumidas en el diagrama. Este reporte conserva todas tus respuestas completas.", CONTENT_W),
      M,
      4.4,
    )
  }

  /* ------------------------ 5. Brújula ------------------------ */
  newPage()
  sectionTitle(5, "Mi brújula profesional", "Criterios para elegir oportunidades y reconocer señales de alerta.")
  COMPASS.forEach((card) => {
    ensure(28)
    font("bold", 13, COLORS.primary)
    doc.text(clean(card.title), M, y + 5)
    y += 9
    card.fields.forEach((f) => qa(f.label, answers[f.id]))
    y += 2
  })

  /* ------------------------ 6. Reflexiones ------------------------ */
  y += 4
  sectionTitle(6, "Reflexiones y próximos pasos")
  CLOSING_FIELDS.forEach((f) => qa(f.label, answers[f.id]))
  const nextDate = (answers[NEXT_STEP_FIELDS.date.id] ?? "").trim()
  qa(
    NEXT_STEP_FIELDS.step.label,
    [answers[NEXT_STEP_FIELDS.step.id]?.trim(), nextDate ? `Fecha: ${formatDateField(nextDate)}` : ""]
      .filter(Boolean)
      .join("\n"),
  )

  y += 6
  highlight(CLOSING_MESSAGE, 11)

  /* ------------------------ Footer on every page ------------------------ */
  const total = doc.getNumberOfPages()
  for (let page = 1; page <= total; page++) {
    doc.setPage(page)
    const top = PAGE_H - 16
    doc.setDrawColor(COLORS.border)
    doc.setLineWidth(0.3)
    doc.line(M, top, PAGE_W - M, top)
    let tx = M
    if (assets.isotipo) {
      const h = 8
      doc.addImage(assets.isotipo.dataUrl, "PNG", M, top + 2.5, h * assets.isotipo.ratio, h)
      tx = M + h * assets.isotipo.ratio + 3
    }
    font("bold", 8, COLORS.foreground)
    doc.text(clean(BRAND_LINE), tx, top + 6)
    font("normal", 7.5, COLORS.primary)
    doc.textWithLink(SITE_LABEL, tx, top + 9.8, { url: SITE_URL })
    font("normal", 7.5, COLORS.muted)
    doc.text(` · ${DISCLAIMER}`, tx + doc.getTextWidth(SITE_LABEL), top + 9.8)
    doc.text(`Página ${page} de ${total}`, PAGE_W - M, top + 8, { align: "right" })
  }

  return doc.output("blob")
}

export async function downloadReportPdf(answers: Answers) {
  downloadBlob(await buildReportPdf(answers), exportFileName(answers, "report", "pdf"))
}

/** Opens the generated PDF in a new tab. The window is opened before generating so popup blockers allow it. */
export async function previewReportPdf(answers: Answers) {
  const win = window.open("", "_blank")
  if (!win) throw new Error("El navegador bloqueó la ventana de vista previa")
  try {
    win.document.title = "Generando tu reporte…"
    win.document.body.style.cssText = "font-family:system-ui,sans-serif;color:#5a5549;padding:2rem"
    win.document.body.textContent = "Generando tu reporte…"
    const blob = await buildReportPdf(answers)
    win.location.href = URL.createObjectURL(blob)
  } catch (error) {
    win.close()
    throw error
  }
}
