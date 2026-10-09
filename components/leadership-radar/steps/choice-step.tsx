"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Check, FileDown, Loader2, Sprout } from "lucide-react"
import { Button } from "@/components/ui/button"
import { trackRadar } from "../analytics"
import { StepHeader } from "../step-nav"
import type { StepProps } from "../types"

type PdfStatus = "idle" | "loading" | "done" | "error"

const REFLECTION_POINTS = [
  "Preguntas de reflexión sobre cada una de tus relaciones",
  "Elegir las capacidades que querés desarrollar primero",
  "Definir el líder que querés ser y un próximo paso concreto",
]

const PDF_POINTS = [
  "Tu gráfico de radar con la situación actual y la deseada",
  "Tabla de capacidades con puntajes y brechas",
  "Fortalezas, mayores brechas y mis datos de contacto",
]

function PointList({ points }: { points: string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {points.map((point) => (
        <li key={point} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground">
          <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  )
}

export function ChoiceStep({ state, goTo }: StepProps) {
  const [status, setStatus] = useState<PdfStatus>("idle")

  const downloadPdf = async () => {
    setStatus("loading")
    try {
      const { exportRadarPdf } = await import("../pdf/export-radar-pdf")
      await exportRadarPdf(state.skills)
      trackRadar("leadership_radar_pdf_downloaded", { skills: state.skills.length })
      setStatus("done")
    } catch {
      setStatus("error")
    }
  }

  const continueReflection = () => {
    trackRadar("leadership_radar_reflection_continued")
    goTo("reflect")
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10">
      <StepHeader eyebrow="Qué sigue" title="Tu radar está listo. ¿Cómo querés seguir?">
        <p>
          Podés llevarte tu radar actual en PDF, seguir profundizando con preguntas y prioridades, o hacer las dos
          cosas: descargarlo ahora y continuar después.
        </p>
      </StepHeader>

      <div className="grid gap-6 md:grid-cols-2">
        <section
          aria-labelledby="choice-reflect-title"
          className="flex flex-col gap-6 rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8"
        >
          <div className="flex flex-col gap-4">
            <span className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Sprout className="size-5" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-2">
              <h3 id="choice-reflect-title" className="text-xl font-bold leading-tight text-foreground text-balance">
                Continuar con mi desarrollo
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
                Reflexioná sobre lo que muestra tu radar y elegí hacia dónde crecer para ser el líder que querés ser.
              </p>
            </div>
          </div>
          <PointList points={REFLECTION_POINTS} />
          <Button type="button" size="lg" className="mt-auto w-full sm:w-auto sm:self-start" onClick={continueReflection}>
            Reflexionar sobre mi radar
            <ArrowRight />
          </Button>
        </section>

        <section
          aria-labelledby="choice-pdf-title"
          className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 sm:p-8"
        >
          <div className="flex flex-col gap-4">
            <span className="flex size-11 items-center justify-center rounded-full bg-secondary text-foreground">
              <FileDown className="size-5" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-2">
              <h3 id="choice-pdf-title" className="text-xl font-bold leading-tight text-foreground text-balance">
                Descargar mi radar en PDF
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
                Un documento con el diseño de este sitio, listo para guardar o compartir con quien te acompañe.
              </p>
            </div>
          </div>
          <PointList points={PDF_POINTS} />
          <div className="mt-auto flex flex-col gap-3">
            <Button
              type="button"
              size="lg"
              variant="outline"
              className="w-full sm:w-auto sm:self-start"
              onClick={downloadPdf}
              disabled={status === "loading"}
            >
              {status === "loading" ? <Loader2 className="animate-spin" /> : <FileDown />}
              {status === "loading" ? "Preparando tu PDF..." : status === "done" ? "Descargar de nuevo" : "Descargar mi radar en PDF"}
            </Button>
            <p aria-live="polite" className="min-h-5 text-sm text-muted-foreground">
              {status === "done" && "Tu PDF se descargó. Podés seguir con la reflexión cuando quieras."}
              {status === "error" && (
                <span role="alert" className="text-destructive">
                  No pudimos generar el PDF. Probá de nuevo en unos segundos.
                </span>
              )}
            </p>
          </div>
        </section>
      </div>

      <div>
        <Button type="button" variant="outline" onClick={() => goTo("radar")}>
          <ArrowLeft />
          Volver a mi radar
        </Button>
      </div>
    </div>
  )
}
