"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { USE_MODES } from "./content"
import { filled, type PausaAnswers } from "./state"

export function PausedView({
  answers,
  storageFailed,
  onResume,
  onPreview,
}: {
  answers: PausaAnswers
  storageFailed: boolean
  onResume: () => void
  onPreview: () => void
}) {
  const mode = USE_MODES.find((m) => m.id === answers.useMode)

  return (
    <section className="py-12 lg:py-20" aria-labelledby="pausa-en-espera">
      <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-foreground">Tu pausa queda en espera</p>
        <h2
          id="pausa-en-espera"
          className="font-display text-3xl font-semibold leading-tight text-foreground text-balance sm:text-4xl"
        >
          Probá lo que elegiste y volvé cuando tengas algo para revisar.
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground text-pretty">
          Te esperan dos preguntas: qué comprobar o cuestionar del resultado, y qué comprendiste y te llevás.
        </p>

        {(mode || filled(answers.uso)) && (
          <div className="flex flex-col gap-2 rounded-2xl bg-sage p-5 text-foreground">
            <p className="text-sm font-semibold">Lo que elegiste{mode ? `: ${mode.label.toLowerCase()}` : ""}</p>
            {filled(answers.uso) && <p className="whitespace-pre-line leading-relaxed">{answers.uso.trim()}</p>}
          </div>
        )}

        <p role="status" className="text-sm leading-relaxed text-muted-foreground">
          {storageFailed
            ? "Este navegador no permite guardar el borrador. Mantené esta pestaña abierta para no perder tus respuestas."
            : "Tu borrador quedó guardado solo en este navegador. Cuando vuelvas a esta página, vas a poder retomarlo."}
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button size="lg" onClick={onResume} className="h-12 px-6 text-base">
            Retomar ahora
            <ArrowRight aria-hidden="true" />
          </Button>
          <Button variant="ghost" onClick={onPreview} className="h-12 text-base">
            Ver mi reporte parcial
          </Button>
        </div>
      </div>
    </section>
  )
}
