import { AREAS, CATEGORY_COLORS, type AreaResponse, type DeepWorkData } from "./life-wheel-data"

/* ------------------------------------------------------------------ */
/*  PDF generation using jsPDF + html2canvas                           */
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
  const [{ default: jsPDF }, html2canvas] = await Promise.all([
    import("jspdf"),
    import("html2canvas"),
  ])

  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" })
  const pageW = pdf.internal.pageSize.getWidth()
  const margin = 15
  const contentW = pageW - margin * 2
  let y = margin

  // Helper: add new page if needed
  const checkPage = (needed: number) => {
    if (y + needed > pdf.internal.pageSize.getHeight() - margin) {
      pdf.addPage()
      y = margin
    }
  }

  // ---- Title ----
  const now = new Date()
  const dateStr = now.toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  pdf.setFontSize(20)
  pdf.setFont("helvetica", "bold")
  pdf.text("Rueda de la Vida", margin, y)
  y += 8

  pdf.setFontSize(10)
  pdf.setFont("helvetica", "normal")
  pdf.setTextColor(120, 120, 120)
  pdf.text(dateStr, margin, y)
  y += 4
  pdf.text("Johana Rios - johanarios.com", margin, y)
  pdf.setTextColor(0, 0, 0)
  y += 10

  // ---- Chart image ----
  if (canvasElement) {
    try {
      const chartImg = canvasElement.toDataURL("image/png")
      const imgW = contentW * 0.6
      const imgH = imgW // square
      const imgX = margin + (contentW - imgW) / 2
      checkPage(imgH + 5)
      pdf.addImage(chartImg, "PNG", imgX, y, imgW, imgH)
      y += imgH + 8
    } catch {
      // if canvas fails, just skip
    }
  }

  // ---- Average ----
  const avg = (responses.reduce((s, r) => s + r.score, 0) / responses.length).toFixed(1)
  pdf.setFontSize(12)
  pdf.setFont("helvetica", "bold")
  checkPage(10)
  pdf.text(`Promedio general: ${avg} / 10`, margin, y)
  y += 10

  // ---- Scores per area ----
  pdf.setFontSize(14)
  pdf.setFont("helvetica", "bold")
  checkPage(10)
  pdf.text("Puntajes por area", margin, y)
  y += 7

  responses.forEach((resp, i) => {
    checkPage(7)
    pdf.setFontSize(10)
    pdf.setFont("helvetica", "bold")
    pdf.text(`${AREAS[i].name}: ${resp.score}/10`, margin + 2, y)
    y += 6
  })

  y += 4

  // ---- Highlights ----
  const scored = responses.map((r, i) => ({ index: i, score: r.score }))
  const sorted = [...scored].sort((a, b) => a.score - b.score)
  const low2 = sorted.slice(0, 2)
  const high2 = sorted.slice(-2).reverse()

  pdf.setFontSize(12)
  pdf.setFont("helvetica", "bold")
  checkPage(16)
  pdf.text("Areas con menor puntaje", margin, y)
  y += 6
  pdf.setFontSize(10)
  pdf.setFont("helvetica", "normal")
  low2.forEach((item) => {
    pdf.text(`- ${AREAS[item.index].name} (${item.score}/10)`, margin + 2, y)
    y += 5
  })
  y += 3

  pdf.setFontSize(12)
  pdf.setFont("helvetica", "bold")
  checkPage(16)
  pdf.text("Areas con mayor puntaje", margin, y)
  y += 6
  pdf.setFontSize(10)
  pdf.setFont("helvetica", "normal")
  high2.forEach((item) => {
    pdf.text(`- ${AREAS[item.index].name} (${item.score}/10)`, margin + 2, y)
    y += 5
  })
  y += 6

  // ---- Answers per area ----
  pdf.setFontSize(14)
  pdf.setFont("helvetica", "bold")
  checkPage(12)
  pdf.text("Respuestas por area", margin, y)
  y += 8

  responses.forEach((resp, i) => {
    checkPage(12)
    pdf.setFontSize(11)
    pdf.setFont("helvetica", "bold")
    pdf.text(`${AREAS[i].name} (${resp.score}/10)`, margin, y)
    y += 6

    AREAS[i].questions.forEach((q, qIdx) => {
      const answer = resp.answers[qIdx]
      if (!answer?.trim()) return

      checkPage(14)
      pdf.setFontSize(9)
      pdf.setFont("helvetica", "italic")
      pdf.setTextColor(100, 100, 100)
      const qLines = pdf.splitTextToSize(q, contentW - 4)
      pdf.text(qLines, margin + 2, y)
      y += qLines.length * 4

      pdf.setFont("helvetica", "normal")
      pdf.setTextColor(0, 0, 0)
      const aLines = pdf.splitTextToSize(answer, contentW - 4)
      pdf.text(aLines, margin + 2, y)
      y += aLines.length * 4 + 3
    })

    y += 4
  })

  // ---- Deep work summary ----
  if (deepWork && deepWork.selectedAreas.length > 0) {
    checkPage(12)
    pdf.setFontSize(14)
    pdf.setFont("helvetica", "bold")
    pdf.text("Reflexion sobre mi rueda", margin, y)
    y += 8

    deepWork.selectedAreas.forEach((areaIdx) => {
      const areaData = deepWork.areas[areaIdx]
      if (!areaData) return

      checkPage(10)
      pdf.setFontSize(11)
      pdf.setFont("helvetica", "bold")
      pdf.text(`Area foco: ${AREAS[areaIdx].name}`, margin, y)
      y += 6

      const sections: [string, string][] = [
        ["Estado actual", areaData.currentState],
        ["Estado deseado", areaData.desiredState],
        ["Creencias y recursos", areaData.beliefs],
        ["Accion / Microaccion", areaData.action],
      ]

      if (areaData.desiredScore > 0) {
        checkPage(8)
        pdf.setFontSize(10)
        pdf.setFont("helvetica", "normal")
        pdf.text(`Puntaje deseado: ${areaData.desiredScore}/10`, margin + 2, y)
        y += 5
      }

      sections.forEach(([label, text]) => {
        if (!text?.trim()) return
        checkPage(12)
        pdf.setFontSize(9)
        pdf.setFont("helvetica", "bold")
        pdf.text(label, margin + 2, y)
        y += 4
        pdf.setFont("helvetica", "normal")
        const lines = pdf.splitTextToSize(text, contentW - 4)
        pdf.text(lines, margin + 2, y)
        y += lines.length * 4 + 3
      })

      y += 4
    })

    // Closure
    if (deepWork.closure.takeaway) {
      checkPage(12)
      pdf.setFontSize(11)
      pdf.setFont("helvetica", "bold")
      pdf.text("Cierre reflexivo", margin, y)
      y += 6

      const closureItems: [string, string][] = [
        ["Lo que me llevo", deepWork.closure.takeaway],
        ["Emocion o mensaje", deepWork.closure.emotion],
        ["Palabra o simbolo", deepWork.closure.symbol],
        ["Mi recordatorio", deepWork.closure.reminder],
      ]

      closureItems.forEach(([label, text]) => {
        if (!text?.trim()) return
        checkPage(10)
        pdf.setFontSize(9)
        pdf.setFont("helvetica", "bold")
        pdf.text(label, margin + 2, y)
        y += 4
        pdf.setFont("helvetica", "normal")
        const lines = pdf.splitTextToSize(text, contentW - 4)
        pdf.text(lines, margin + 2, y)
        y += lines.length * 4 + 3
      })
    }
  }

  // ---- Save ----
  const fileName = `rueda-de-la-vida-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}.pdf`
  pdf.save(fileName)
}
