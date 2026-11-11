import { buildPrintSvg } from "../diagram/svg"
import { exportFileName, type Answers } from "../state"
import { canvasToBlob, downloadBlob, loadBrandAssets, svgToCanvas } from "./assets"

/** A4 at 300 DPI. */
const PRINT_W = 2480

export async function printableSvg(answers: Answers) {
  const assets = await loadBrandAssets()
  return buildPrintSvg(answers, assets, PRINT_W)
}

export async function downloadDiagramPng(answers: Answers) {
  const { svg, width, height } = await printableSvg(answers)
  const canvas = await svgToCanvas(svg, width, height)
  downloadBlob(await canvasToBlob(canvas), exportFileName(answers, "diagram", "png"))
}

export async function downloadDiagramSvg(answers: Answers) {
  const { svg } = await printableSvg(answers)
  // Editable/scalable version: millimetre size instead of 300 DPI pixels.
  const scalable = svg.replace(/width="\d+" height="\d+"/, 'width="210mm" height="297mm"')
  downloadBlob(new Blob([scalable], { type: "image/svg+xml;charset=utf-8" }), exportFileName(answers, "diagram", "svg"))
}

export async function downloadDiagramPdf(answers: Answers) {
  const [{ jsPDF }, { svg, width, height }] = await Promise.all([import("jspdf"), printableSvg(answers)])
  const canvas = await svgToCanvas(svg, width, height)
  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" })
  doc.setProperties({ title: "Mi Ikigai profesional", author: "Johana Ríos", subject: "Ikigai profesional" })
  doc.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 210, 297, undefined, "FAST")
  downloadBlob(doc.output("blob"), exportFileName(answers, "diagram", "pdf"))
}

/** Prints only the A4 diagram from a hidden frame, without the site's interface. */
export async function printDiagram(answers: Answers) {
  const { svg } = await printableSvg(answers)
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }))
  const frame = document.createElement("iframe")
  frame.setAttribute("aria-hidden", "true")
  frame.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden"
  document.body.appendChild(frame)
  const win = frame.contentWindow
  const doc = frame.contentDocument
  if (!win || !doc) {
    frame.remove()
    URL.revokeObjectURL(url)
    throw new Error("No se pudo preparar la impresión")
  }
  doc.open()
  doc.write(
    `<!doctype html><html><head><title>Mi Ikigai profesional</title><style>@page{size:A4;margin:0}html,body{margin:0;padding:0}img{display:block;width:210mm;height:297mm}</style></head><body><img alt="Mi Ikigai profesional" src="${url}"></body></html>`,
  )
  doc.close()
  const img = doc.querySelector("img")
  await new Promise<void>((resolve) => {
    if (!img || img.complete) resolve()
    else {
      img.onload = () => resolve()
      img.onerror = () => resolve()
    }
  })
  win.focus()
  win.print()
  setTimeout(() => {
    frame.remove()
    URL.revokeObjectURL(url)
  }, 60_000)
}
