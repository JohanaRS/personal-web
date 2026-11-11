"use client"

import { useState } from "react"
import { Copy, Download, Eye, FileText, Image as ImageIcon, Loader2, Printer, ShieldCheck } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { PRIVACY_NOTE } from "./content"
import type { Answers } from "./state"

type Action = "png" | "svg" | "diagramPdf" | "print" | "report" | "preview" | "copy" | "md"

const SUCCESS: Record<Action, string> = {
  png: "Tu diagrama se descargó en alta resolución.",
  svg: "Tu diagrama vectorial se descargó.",
  diagramPdf: "Tu diagrama en PDF se descargó.",
  print: "Se abrió el cuadro de impresión.",
  report: "Tu reporte completo se descargó.",
  preview: "La vista previa se abrió en una nueva pestaña.",
  copy: "Copiaste todas tus respuestas.",
  md: "Tus respuestas se descargaron en texto.",
}

async function run(action: Action, answers: Answers) {
  switch (action) {
    case "png":
      return (await import("./export/diagram-export")).downloadDiagramPng(answers)
    case "svg":
      return (await import("./export/diagram-export")).downloadDiagramSvg(answers)
    case "diagramPdf":
      return (await import("./export/diagram-export")).downloadDiagramPdf(answers)
    case "print":
      return (await import("./export/diagram-export")).printDiagram(answers)
    case "report":
      return (await import("./export/report-pdf")).downloadReportPdf(answers)
    case "preview":
      return (await import("./export/report-pdf")).previewReportPdf(answers)
    case "copy":
      return (await import("./export/text-export")).copyAllAnswers(answers)
    case "md":
      return (await import("./export/text-export")).downloadMarkdown(answers)
  }
}

export function ExportPanel({ answers }: { answers: Answers }) {
  const [busy, setBusy] = useState<Action | null>(null)

  const handle = async (action: Action) => {
    if (busy) return
    setBusy(action)
    try {
      await run(action, answers)
      toast.success(SUCCESS[action])
    } catch (error) {
      console.error(error)
      toast.error(
        action === "preview" && error instanceof Error && error.message.includes("bloqueó")
          ? "Tu navegador bloqueó la nueva pestaña. Permití ventanas emergentes o descargá el reporte."
          : "No pudimos completar la acción. Intentá de nuevo en unos segundos.",
      )
    } finally {
      setBusy(null)
    }
  }

  const icon = (action: Action, Fallback: typeof Download) =>
    busy === action ? <Loader2 className="animate-spin" aria-hidden="true" /> : <Fallback aria-hidden="true" />

  return (
    <section aria-labelledby="ikigai-export-title" className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 sm:p-8 print:hidden">
      <div className="flex flex-col gap-2">
        <h3 id="ikigai-export-title" className="text-xl font-bold text-foreground">
          Llevate tu Ikigai
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Descargá tu diagrama para tenerlo a la vista y tu reporte completo para seguir trabajando.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-foreground">Diagrama (A4, listo para imprimir)</p>
          <Button size="lg" onClick={() => handle("png")} disabled={busy !== null} aria-busy={busy === "png"}>
            {icon("png", ImageIcon)}
            Descargar mi diagrama de Ikigai
          </Button>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => handle("diagramPdf")} disabled={busy !== null}>
              {icon("diagramPdf", Download)}
              PDF de 1 página
            </Button>
            <Button variant="outline" size="sm" onClick={() => handle("svg")} disabled={busy !== null}>
              {icon("svg", Download)}
              SVG editable
            </Button>
            <Button variant="outline" size="sm" onClick={() => handle("print")} disabled={busy !== null}>
              {icon("print", Printer)}
              Imprimir
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-foreground">Reporte completo (PDF)</p>
          <Button size="lg" variant="outline" onClick={() => handle("report")} disabled={busy !== null} aria-busy={busy === "report"}>
            {icon("report", FileText)}
            Descargar mi reporte completo
          </Button>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => handle("preview")} disabled={busy !== null}>
              {icon("preview", Eye)}
              Vista previa
            </Button>
            <Button variant="outline" size="sm" onClick={() => handle("copy")} disabled={busy !== null}>
              {icon("copy", Copy)}
              Copiar respuestas
            </Button>
            <Button variant="outline" size="sm" onClick={() => handle("md")} disabled={busy !== null}>
              {icon("md", Download)}
              Descargar en texto
            </Button>
          </div>
        </div>
      </div>

      {busy && (
        <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
          Preparando tu archivo…
        </p>
      )}

      <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
        {PRIVACY_NOTE} Los archivos se generan directamente en tu navegador.
      </p>
    </section>
  )
}
