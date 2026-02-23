import { AREAS, CATEGORY_COLORS, type AreaResponse, type DeepWorkData } from "./life-wheel-data"

/* ------------------------------------------------------------------ */
/*  Brand constants for PDF styling                                    */
/* ------------------------------------------------------------------ */

const BRAND = {
  cream: [245, 240, 232] as [number, number, number],
  sand: [232, 224, 213] as [number, number, number],
  charcoal: [50, 46, 42] as [number, number, number],
  olive: [97, 117, 68] as [number, number, number],
  muted: [140, 130, 118] as [number, number, number],
  divider: [210, 200, 188] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
}

const CLOSING_PHRASE = "La claridad es el primer paso hacia el cambio."

/* ------------------------------------------------------------------ */
/*  Load logo as base64                                                */
/* ------------------------------------------------------------------ */

async function loadLogoBase64(): Promise<string | null> {
  try {
    const resp = await fetch("/images/logo-joha.png")
    const blob = await resp.blob()
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = () => resolve(null)
      reader.readAsDataURL(blob)
    })
  } catch {
    return null
  }
}

/* ------------------------------------------------------------------ */
/*  PDF generation using jsPDF                                         */
/* ------------------------------------------------------------------ */

export async function generatePdf({
  responses,
  deepWork,
  canvasElement,
}: {
  responses: AreaResponse[]
  deepWork: DeepWorkData | null
  canvasElement: HTMLCanvasElement | null
}) {
  const { default: jsPDF } = await import("jspdf")
  const logoBase64 = await loadLogoBase64()

  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" })
  const pageW = pdf.internal.pageSize.getWidth()
  const pageH = pdf.internal.pageSize.getHeight()
  const margin = 20
  const contentW = pageW - margin * 2
  let y = 0

  const now = new Date()
  const dateStr = now.toLocaleDateString("es-AR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const formattedDate = dateStr.charAt(0).toUpperCase() + dateStr.slice(1)

  /* ---- Helpers ---- */

  function setColor(c: [number, number, number]) {
    pdf.setTextColor(c[0], c[1], c[2])
  }

  function drawDivider(atY: number, width?: number) {
    const w = width ?? contentW
    const x = margin + (contentW - w) / 2
    pdf.setDrawColor(BRAND.divider[0], BRAND.divider[1], BRAND.divider[2])
    pdf.setLineWidth(0.3)
    pdf.line(x, atY, x + w, atY)
  }

  function drawBrandHeader() {
    const headerY = margin - 4
    const logoSize = 8

    if (logoBase64) {
      try {
        pdf.addImage(logoBase64, "PNG", margin, headerY - 3, logoSize, logoSize)
      } catch {
        // skip
      }
    }

    const textX = logoBase64 ? margin + logoSize + 3 : margin
    pdf.setFontSize(8)
    pdf.setFont("helvetica", "normal")
    setColor(BRAND.muted)
    pdf.text("Johana Rios \u2013 Coaching con PNL", textX, headerY + 1)
    pdf.text("@joharios.coach", textX, headerY + 5)
  }

  function addFooter() {
    const footerY = pageH - 10
    drawDivider(footerY - 4, contentW)
    pdf.setFontSize(7)
    pdf.setFont("helvetica", "normal")
    setColor(BRAND.muted)
    pdf.text("Johana Rios \u2013 Coaching con PNL \u2013 @joharios.coach", pageW / 2, footerY, {
      align: "center",
    })
  }

  function checkPage(needed: number) {
    if (y + needed > pageH - 20) {
      addFooter()
      pdf.addPage()
      y = margin
    }
  }

  function wrapText(text: string, maxWidth: number, fontSize: number): string[] {
    pdf.setFontSize(fontSize)
    return pdf.splitTextToSize(text, maxWidth)
  }

  function drawSectionTitle(title: string) {
    checkPage(16)
    pdf.setFontSize(13)
    pdf.setFont("helvetica", "bold")
    setColor(BRAND.olive)
    pdf.text(title.toUpperCase(), margin, y)
    y += 2
    drawDivider(y, 40)
    y += 6
  }

  function drawLabel(label: string) {
    pdf.setFontSize(8)
    pdf.setFont("helvetica", "bold")
    setColor(BRAND.olive)
    pdf.text(label.toUpperCase(), margin + 2, y)
    y += 4
  }

  function drawBodyText(text: string, indent = 0) {
    pdf.setFontSize(9)
    pdf.setFont("helvetica", "normal")
    setColor(BRAND.charcoal)
    const lines = wrapText(text, contentW - 4 - indent, 9)
    lines.forEach((line) => {
      checkPage(5)
      pdf.text(line, margin + 2 + indent, y)
      y += 4.2
    })
  }

  function drawQuestionAnswer(question: string, answer: string) {
    if (!answer?.trim()) return
    checkPage(14)

    pdf.setFontSize(8)
    pdf.setFont("helvetica", "italic")
    setColor(BRAND.muted)
    const qLines = wrapText(question, contentW - 6, 8)
    qLines.forEach((line) => {
      checkPage(4)
      pdf.text(line, margin + 4, y)
      y += 3.6
    })

    pdf.setFontSize(9)
    pdf.setFont("helvetica", "normal")
    setColor(BRAND.charcoal)
    const aLines = wrapText(answer, contentW - 6, 9)
    aLines.forEach((line) => {
      checkPage(4.5)
      pdf.text(line, margin + 4, y)
      y += 4.2
    })
    y += 2
  }

  function drawClosingPhrase() {
    checkPage(20)
    y += 6
    drawDivider(y, 60)
    y += 8
    pdf.setFontSize(10)
    pdf.setFont("helvetica", "italic")
    setColor(BRAND.olive)
    pdf.text(CLOSING_PHRASE, pageW / 2, y, { align: "center" })
    y += 8
  }

  /* ================================================================ */
  /*  PAGE 1 - Cover / Header + Chart                                 */
  /* ================================================================ */

  drawBrandHeader()
  y = margin + 14

  // Main title
  pdf.setFontSize(24)
  pdf.setFont("helvetica", "bold")
  setColor(BRAND.charcoal)
  pdf.text("Mi Rueda de la Vida", margin, y)
  y += 8

  // Subtitle
  pdf.setFontSize(10)
  pdf.setFont("helvetica", "italic")
  setColor(BRAND.muted)
  pdf.text("Una fotograf\u00eda de tu momento actual", margin, y)
  y += 6

  // Date
  pdf.setFontSize(8)
  pdf.setFont("helvetica", "normal")
  setColor(BRAND.muted)
  pdf.text(formattedDate, margin, y)
  y += 3

  drawDivider(y)
  y += 10

  // ---- Chart image ----
  if (canvasElement) {
    try {
      const chartImg = canvasElement.toDataURL("image/png", 1.0)
      const imgW = contentW * 0.55
      const imgH = imgW
      const imgX = margin + (contentW - imgW) / 2
      checkPage(imgH + 8)
      pdf.addImage(chartImg, "PNG", imgX, y, imgW, imgH)
      y += imgH + 6
    } catch {
      // skip
    }
  }

  // ---- Average ----
  const avg = (responses.reduce((s, r) => s + r.score, 0) / responses.length).toFixed(1)
  checkPage(14)
  pdf.setFontSize(9)
  pdf.setFont("helvetica", "normal")
  setColor(BRAND.muted)
  pdf.text("Promedio general", pageW / 2, y, { align: "center" })
  y += 6
  pdf.setFontSize(18)
  pdf.setFont("helvetica", "bold")
  setColor(BRAND.olive)
  pdf.text(`${avg} / 10`, pageW / 2, y, { align: "center" })
  y += 10

  drawDivider(y)
  y += 8

  /* ================================================================ */
  /*  Scores per area                                                  */
  /* ================================================================ */

  drawSectionTitle("Puntajes por \u00e1rea")

  const colW = contentW / 2
  let col = 0
  let rowStartY = y

  responses.forEach((resp, i) => {
    const x = margin + col * colW
    checkPage(12)

    const color = hexFromOklch(CATEGORY_COLORS[i])
    pdf.setFillColor(color[0], color[1], color[2])
    pdf.circle(x + 3, y - 1.5, 1.5, "F")

    pdf.setFontSize(9)
    pdf.setFont("helvetica", "normal")
    setColor(BRAND.charcoal)
    pdf.text(AREAS[i].name, x + 7, y)

    pdf.setFontSize(9)
    pdf.setFont("helvetica", "bold")
    setColor(BRAND.olive)
    pdf.text(`${resp.score}/10`, x + colW - 8, y, { align: "right" })

    if (col === 0) {
      rowStartY = y
      col = 1
    } else {
      col = 0
      y = rowStartY + 7
    }
  })

  if (col === 1) y = rowStartY + 7
  y += 4

  /* ---- Highlights ---- */
  const scored = responses.map((r, i) => ({ index: i, score: r.score }))
  const sorted = [...scored].sort((a, b) => a.score - b.score)
  const low2 = sorted.slice(0, 2)
  const high2 = sorted.slice(-2).reverse()

  checkPage(26)
  const boxW = (contentW - 6) / 2

  // Strength box
  const boxX1 = margin
  pdf.setFillColor(BRAND.sand[0], BRAND.sand[1], BRAND.sand[2])
  pdf.roundedRect(boxX1, y, boxW, 22, 2, 2, "F")
  pdf.setFontSize(8)
  pdf.setFont("helvetica", "bold")
  setColor(BRAND.olive)
  pdf.text("MAYOR FORTALEZA", boxX1 + 4, y + 6)
  pdf.setFontSize(8.5)
  pdf.setFont("helvetica", "normal")
  setColor(BRAND.charcoal)
  high2.forEach((item, idx) => {
    pdf.text(
      `${AREAS[item.index].name} (${item.score}/10)`,
      boxX1 + 4,
      y + 12 + idx * 5
    )
  })

  // Opportunity box
  const boxX2 = margin + boxW + 6
  pdf.setFillColor(BRAND.sand[0], BRAND.sand[1], BRAND.sand[2])
  pdf.roundedRect(boxX2, y, boxW, 22, 2, 2, "F")
  pdf.setFontSize(8)
  pdf.setFont("helvetica", "bold")
  setColor(BRAND.olive)
  pdf.text("OPORTUNIDAD DE MEJORA", boxX2 + 4, y + 6)
  pdf.setFontSize(8.5)
  pdf.setFont("helvetica", "normal")
  setColor(BRAND.charcoal)
  low2.forEach((item, idx) => {
    pdf.text(
      `${AREAS[item.index].name} (${item.score}/10)`,
      boxX2 + 4,
      y + 12 + idx * 5
    )
  })

  y += 28

  addFooter()

  /* ================================================================ */
  /*  PAGE 2+ - Detailed responses per area                            */
  /* ================================================================ */

  pdf.addPage()
  y = margin

  drawSectionTitle("Respuestas por \u00e1rea")

  responses.forEach((resp, i) => {
    const area = AREAS[i]
    checkPage(18)

    // Area header with colored accent bar
    const color = hexFromOklch(CATEGORY_COLORS[i])
    pdf.setFillColor(color[0], color[1], color[2])
    pdf.roundedRect(margin, y, 2, 10, 1, 1, "F")

    pdf.setFontSize(11)
    pdf.setFont("helvetica", "bold")
    setColor(BRAND.charcoal)
    pdf.text(area.name, margin + 6, y + 4)

    pdf.setFontSize(10)
    pdf.setFont("helvetica", "bold")
    setColor(BRAND.olive)
    pdf.text(`${resp.score}/10`, margin + contentW, y + 4, { align: "right" })

    y += 12

    // Conditional block answers (Amor y V\u00ednculos)
    const hasConditional = !!area.conditionalBlock
    const showConditional = hasConditional && resp.conditionalAnswer === "S\u00ed"

    if (showConditional) {
      checkPage(8)
      pdf.setFontSize(8)
      pdf.setFont("helvetica", "bold")
      setColor(BRAND.olive)
      pdf.text("V\u00cdNCULOS AMOROSOS / PAREJA", margin + 4, y)
      y += 4

      area.conditionalBlock!.questions.forEach((q, qIdx) => {
        const answer = resp.conditionalAnswers?.[qIdx] || ""
        drawQuestionAnswer(q, answer)
      })
      y += 2
    }

    if (hasConditional) {
      checkPage(8)
      pdf.setFontSize(8)
      pdf.setFont("helvetica", "bold")
      setColor(BRAND.olive)
      pdf.text("AMOR PROPIO Y AUTOVALOR", margin + 4, y)
      y += 4
    }

    // Main questions & answers
    area.questions.forEach((q, qIdx) => {
      const answer = resp.answers[qIdx]
      drawQuestionAnswer(q, answer)
    })

    y += 4
    drawDivider(y, contentW * 0.4)
    y += 6
  })

  drawClosingPhrase()
  addFooter()

  /* ================================================================ */
  /*  Reflexi\u00f3n section                                               */
  /* ================================================================ */

  if (deepWork && deepWork.selectedAreas.length > 0) {
    pdf.addPage()

    drawBrandHeader()
    y = margin + 14

    pdf.setFontSize(20)
    pdf.setFont("helvetica", "bold")
    setColor(BRAND.charcoal)
    pdf.text("Reflexi\u00f3n sobre mi Rueda", margin, y)
    y += 7

    pdf.setFontSize(9)
    pdf.setFont("helvetica", "italic")
    setColor(BRAND.muted)
    pdf.text("Profundizaci\u00f3n y Plan de Acci\u00f3n", margin, y)
    y += 5

    pdf.setFontSize(8)
    pdf.setFont("helvetica", "normal")
    setColor(BRAND.muted)
    pdf.text(formattedDate, margin, y)
    y += 3
    drawDivider(y)
    y += 10

    /* Per-area deep work */
    deepWork.selectedAreas.forEach((areaIdx) => {
      const areaData = deepWork.areas[areaIdx]
      if (!areaData) return
      const areaScore = responses[areaIdx]?.score ?? 0

      checkPage(16)
      const color = hexFromOklch(CATEGORY_COLORS[areaIdx])
      pdf.setFillColor(color[0], color[1], color[2])
      pdf.roundedRect(margin, y, 2, 10, 1, 1, "F")

      pdf.setFontSize(12)
      pdf.setFont("helvetica", "bold")
      setColor(BRAND.charcoal)
      pdf.text(AREAS[areaIdx].name, margin + 6, y + 4)

      pdf.setFontSize(9)
      pdf.setFont("helvetica", "normal")
      setColor(BRAND.muted)
      const scoreText =
        areaData.desiredScore > 0
          ? `Puntaje: ${areaScore}/10  \u2192  Deseado: ${areaData.desiredScore}/10`
          : `Puntaje: ${areaScore}/10`
      pdf.text(scoreText, margin + 6, y + 9)
      y += 15

      const sections: { label: string; text: string }[] = [
        { label: "Estado actual", text: areaData.currentState },
        { label: "Estado deseado", text: areaData.desiredState },
        { label: "Creencias y recursos", text: areaData.beliefs },
        { label: "Acci\u00f3n / Microacci\u00f3n", text: areaData.action },
      ]

      sections.forEach(({ label, text }) => {
        if (!text?.trim()) return
        checkPage(12)
        drawLabel(label)
        drawBodyText(text, 2)
        y += 3
      })

      y += 2
      drawDivider(y, contentW * 0.3)
      y += 6
    })

    /* Closure */
    if (deepWork.closure.takeaway) {
      checkPage(20)
      drawSectionTitle("Cierre reflexivo")

      const closureItems: { label: string; text: string }[] = [
        { label: "Lo que me llevo", text: deepWork.closure.takeaway },
        { label: "Emoci\u00f3n o mensaje", text: deepWork.closure.emotion },
        { label: "Palabra o s\u00edmbolo", text: deepWork.closure.symbol },
        { label: "Mi recordatorio", text: deepWork.closure.reminder },
      ]

      closureItems.forEach(({ label, text }) => {
        if (!text?.trim()) return
        checkPage(10)
        drawLabel(label)
        drawBodyText(text, 2)
        y += 2
      })

      // Highlight the reminder
      if (deepWork.closure.reminder?.trim()) {
        checkPage(16)
        y += 4
        pdf.setFillColor(BRAND.sand[0], BRAND.sand[1], BRAND.sand[2])
        const reminderLines = wrapText(
          `"${deepWork.closure.reminder}"`,
          contentW - 16,
          10
        )
        const boxH = reminderLines.length * 5 + 10
        pdf.roundedRect(margin + 4, y, contentW - 8, boxH, 2, 2, "F")
        pdf.setFontSize(10)
        pdf.setFont("helvetica", "italic")
        setColor(BRAND.olive)
        let textY = y + 7
        reminderLines.forEach((line) => {
          pdf.text(line, pageW / 2, textY, { align: "center" })
          textY += 5
        })
        y += boxH + 4
      }
    }

    drawClosingPhrase()
    addFooter()
  }

  /* ---- Save ---- */
  const fileName = `rueda-de-la-vida-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}.pdf`
  pdf.save(fileName)
}

/* ------------------------------------------------------------------ */
/*  Oklch to RGB helper (approximate)                                  */
/* ------------------------------------------------------------------ */

function hexFromOklch(oklchStr: string): [number, number, number] {
  const match = oklchStr.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/)
  if (!match) return [97, 117, 68]

  const L = parseFloat(match[1])
  const C = parseFloat(match[2])
  const H = parseFloat(match[3])
  const hRad = (H * Math.PI) / 180
  const a = C * Math.cos(hRad)
  const b = C * Math.sin(hRad)

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b
  const s_ = L - 0.0894841775 * a - 1.291485548 * b

  const l3 = l_ * l_ * l_
  const m3 = m_ * m_ * m_
  const s3 = s_ * s_ * s_

  const r = +4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3
  const g = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3
  const bv = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3

  const toSrgb = (x: number) => {
    const clamped = Math.max(0, Math.min(1, x))
    return clamped <= 0.0031308
      ? clamped * 12.92
      : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055
  }

  return [
    Math.round(toSrgb(r) * 255),
    Math.round(toSrgb(g) * 255),
    Math.round(toSrgb(bv) * 255),
  ]
}
