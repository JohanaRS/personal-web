"use client"

import { useMemo } from "react"
import Image from "next/image"
import { Calendar, PencilLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StepHeader } from "@/components/leadership-radar/step-nav"
import {
  BOOKING_URL,
  BRAND_LINE,
  CLOSING_MESSAGE,
  COMPASS,
  DIMENSIONS,
  NEXT_STEP_FIELDS,
  SITE_LABEL,
  STAGES,
} from "./content"
import { diagramDataFrom } from "./diagram/svg"
import { ExportPanel } from "./export-panel"
import { DimensionMarker, KeywordChips } from "./fields"
import { IkigaiDiagram, useTruncation } from "./ikigai-diagram"
import { longDate, personName, sessionDate, type Answers } from "./state"

function formatDate(raw: string) {
  const [y, m, d] = raw.split("-").map(Number)
  return y && m && d ? longDate(new Date(y, m - 1, d)) : raw
}

export function SynthesisStage({ answers, onEdit }: { answers: Answers; onEdit: (stage: number) => void }) {
  const data = useMemo(() => diagramDataFrom(answers), [answers])
  const truncated = useTruncation(data)
  const name = personName(answers)
  const nextStep = (answers[NEXT_STEP_FIELDS.step.id] ?? "").trim()
  const nextDate = (answers[NEXT_STEP_FIELDS.date.id] ?? "").trim()

  return (
    <div className="flex flex-col gap-10">
      <StepHeader eyebrow="Etapa 9 · Síntesis" title={name ? `El Ikigai profesional de ${name}` : "Mi Ikigai profesional"}>
        <p>{longDate(sessionDate(answers))}. Todo lo que ves está construido únicamente con tus palabras.</p>
      </StepHeader>

      <section aria-label="Diagrama de Ikigai" className="flex flex-col gap-5 rounded-3xl border border-border bg-card p-4 sm:p-8">
        <IkigaiDiagram data={data} variant="full" label="Mi diagrama de Ikigai profesional" className="mx-auto hidden max-w-2xl sm:block" />
        <IkigaiDiagram data={data} variant="compact" label="Mi diagrama de Ikigai profesional" className="sm:hidden" />

        <div className="flex flex-col gap-4 sm:hidden">
          {DIMENSIONS.map((d) => (
            <div key={d.id} className="flex flex-col gap-2">
              <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <DimensionMarker id={d.id} />
                {d.name}
              </p>
              {data.keywords[d.id].length ? (
                <KeywordChips dimension={d.id} keywords={data.keywords[d.id]} />
              ) : (
                <p className="text-sm italic text-muted-foreground">Sin palabras clave.</p>
              )}
            </div>
          ))}
        </div>

        <div className="rounded-xl bg-primary/5 p-5 sm:hidden">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Mi propósito profesional</p>
          <p className="mt-2 text-base font-medium leading-relaxed text-foreground">
            {data.hypothesis || <span className="italic text-muted-foreground">Todavía sin redactar.</span>}
          </p>
        </div>

        {truncated && (
          <p className="text-center text-xs text-muted-foreground">
            Algunas frases se muestran resumidas en el diagrama. Tu reporte completo conserva todas tus respuestas.
          </p>
        )}

        <div className="flex items-center justify-center gap-3 border-t border-border pt-4">
          <Image src="/images/logo-isotipo.png" alt="" width={32} height={32} className="size-8 object-contain" />
          <div className="text-xs leading-snug">
            <p className="font-semibold text-foreground">{BRAND_LINE}</p>
            <p className="text-muted-foreground">{SITE_LABEL}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="ikigai-compass-summary" className="flex flex-col gap-4">
        <h3 id="ikigai-compass-summary" className="text-xl font-bold text-foreground">
          Mi brújula profesional
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {COMPASS.map((card) => {
            const values = card.fields.map((f) => ({ label: f.label, value: (answers[f.id] ?? "").trim() }))
            return (
              <div key={card.id} className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5">
                <p className="text-base font-semibold text-foreground">{card.title}</p>
                {values.some((v) => v.value) ? (
                  values
                    .filter((v) => v.value)
                    .map((v) => (
                      <div key={v.label}>
                        <p className="text-xs text-muted-foreground">{v.label}</p>
                        <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-foreground">{v.value}</p>
                      </div>
                    ))
                ) : (
                  <p className="text-sm italic text-muted-foreground">Sin completar.</p>
                )}
              </div>
            )
          })}
        </div>
        <div className="flex flex-col gap-2 rounded-xl border border-primary/40 bg-primary/5 p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Mi próximo paso</p>
            {nextDate && <p className="text-xs font-semibold text-primary">{formatDate(nextDate)}</p>}
          </div>
          <p className="whitespace-pre-line text-base leading-relaxed text-foreground">
            {nextStep || <span className="italic text-muted-foreground">Todavía sin definir.</span>}
          </p>
        </div>
      </section>

      <section aria-labelledby="ikigai-edit-title" className="flex flex-col gap-3 print:hidden">
        <h3 id="ikigai-edit-title" className="text-base font-semibold text-foreground">
          Revisar o editar mis respuestas
        </h3>
        <ul className="flex flex-wrap gap-2">
          {STAGES.slice(1, -1).map((s, i) => (
            <li key={s.id}>
              <Button variant="outline" size="sm" onClick={() => onEdit(i + 1)}>
                <PencilLine aria-hidden="true" />
                {s.label}
              </Button>
            </li>
          ))}
        </ul>
      </section>

      <ExportPanel answers={answers} />

      <p className="border-l-2 border-primary pl-5 text-base italic leading-relaxed text-foreground text-pretty">{CLOSING_MESSAGE}</p>

      <section
        aria-labelledby="ikigai-cta-title"
        className="flex flex-col gap-4 rounded-3xl bg-primary p-6 text-primary-foreground sm:p-10 print:hidden"
      >
        <h3 id="ikigai-cta-title" className="text-2xl font-bold leading-tight text-balance">
          Más que una reflexión profesional
        </h3>
        <p className="max-w-2xl text-base leading-relaxed text-pretty opacity-90">
          Si querés transformar estos descubrimientos en decisiones concretas, podemos trabajar juntos para clarificar tu
          próximo paso profesional, fortalecer tu liderazgo y diseñar una transición coherente con tu propósito.
        </p>
        <div>
          <Button asChild size="lg" variant="secondary">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <Calendar aria-hidden="true" />
              Agendar una conversación
              <span className="sr-only"> (se abre en una pestaña nueva)</span>
            </a>
          </Button>
        </div>
      </section>
    </div>
  )
}
