"use client"

import { Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"
import { ReflectionQuestion } from "@/components/leadership-radar/reflection-question"
import { StepHeader } from "@/components/leadership-radar/step-nav"
import {
  CLOSING_FIELDS,
  COMPASS,
  COMPASS_TIP,
  DIMENSION_BY_ID,
  DIMENSIONS,
  FRAME_FIELDS,
  INTERSECTIONS,
  intersectionFieldId,
  NEXT_STEP_FIELDS,
  PRIVACY_NOTE,
  PURPOSE_FIELD,
  PURPOSE_TEMPLATES,
  type Dimension,
} from "./content"
import { DimensionMarker, KeywordChips, KeywordField, TextInput } from "./fields"
import { parseKeywords, type Answers } from "./state"

export interface StageProps {
  answers: Answers
  setAnswer: (id: string, value: string) => void
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <aside className="flex gap-3 rounded-xl border border-border bg-secondary/50 p-5 text-sm leading-relaxed text-foreground">
      <Lightbulb className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
      <p className="text-pretty">{children}</p>
    </aside>
  )
}

export function FrameStage({ answers, setAnswer }: StageProps) {
  return (
    <div className="flex flex-col gap-8">
      <StepHeader eyebrow="Etapa 1 · Encuadre" title="Antes de empezar">
        <p>
          El Ikigai profesional no busca una respuesta perfecta ni una vocación única. Es una forma de mirar tu
          experiencia para encontrar patrones, reconocer lo que te da energía y elegir con más claridad tu próxima etapa.
        </p>
      </StepHeader>
      <ul className="flex flex-col gap-3 text-sm leading-relaxed text-foreground">
        {[
          "Respondé con honestidad: nadie más va a leer esto, salvo que vos lo compartas.",
          "No hace falta completar todo de una vez. Tus respuestas se guardan solas y podés volver cuando quieras.",
          "Podés moverte libremente entre etapas, en el orden que te resulte natural.",
          "Si una pregunta no te dice nada, dejala en blanco y seguí. Lo importante son los patrones.",
        ].map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="grid gap-5 rounded-xl border border-border bg-card p-5 sm:grid-cols-2">
        <TextInput
          id={FRAME_FIELDS.name.id}
          label={`${FRAME_FIELDS.name.label} (opcional)`}
          value={answers[FRAME_FIELDS.name.id] ?? ""}
          onChange={(v) => setAnswer(FRAME_FIELDS.name.id, v)}
          autoComplete="name"
          hint="Aparece en tu diagrama y en tu reporte."
        />
        <TextInput
          id={FRAME_FIELDS.date.id}
          label={`${FRAME_FIELDS.date.label} (opcional)`}
          type="date"
          value={answers[FRAME_FIELDS.date.id] ?? ""}
          onChange={(v) => setAnswer(FRAME_FIELDS.date.id, v)}
          hint="Si la dejás vacía, se usa la fecha de hoy."
        />
      </div>
      <p className="text-sm text-muted-foreground">{PRIVACY_NOTE}</p>
    </div>
  )
}

export function DimensionStage({ dimension, stageNumber, answers, setAnswer }: StageProps & { dimension: Dimension; stageNumber: number }) {
  return (
    <div className="flex flex-col gap-6">
      <StepHeader eyebrow={`Etapa ${stageNumber} · Dimensión`} title={dimension.name}>
        <p>{dimension.intro}</p>
      </StepHeader>
      {dimension.questions.map((q) => (
        <ReflectionQuestion key={q.id} id={q.id} label={q.label} value={answers[q.id] ?? ""} onChange={(v) => setAnswer(q.id, v)} />
      ))}
      {dimension.note && <Note>{dimension.note}</Note>}
      <KeywordField
        id={dimension.keywords.id}
        label={dimension.keywords.label}
        dimension={dimension.id}
        value={answers[dimension.keywords.id] ?? ""}
        onChange={(v) => setAnswer(dimension.keywords.id, v)}
      />
    </div>
  )
}

export function IntersectionsStage({ answers, setAnswer }: StageProps) {
  const hypothesis = answers[PURPOSE_FIELD.id] ?? ""
  const applyTemplate = (template: string) => {
    if (hypothesis.trim() && !window.confirm("¿Reemplazar lo que escribiste por esta estructura?")) return
    setAnswer(PURPOSE_FIELD.id, template)
    requestAnimationFrame(() => document.getElementById(PURPOSE_FIELD.id)?.focus())
  }

  return (
    <div className="flex flex-col gap-8">
      <StepHeader eyebrow="Etapa 6 · Intersecciones" title="Dónde se cruzan tus dimensiones">
        <p>Mirá tus palabras clave juntas. Buscá repeticiones, tensiones y combinaciones que antes no veías.</p>
      </StepHeader>

      <section aria-labelledby="ikigai-keywords-overview" className="grid gap-4 sm:grid-cols-2">
        <h3 id="ikigai-keywords-overview" className="sr-only">
          Tus palabras clave
        </h3>
        {DIMENSIONS.map((d) => {
          const words = parseKeywords(answers[d.keywords.id])
          return (
            <div key={d.id} className="flex min-w-0 flex-col gap-3 rounded-xl border border-border bg-card p-5">
              <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <DimensionMarker id={d.id} />
                {d.name}
              </p>
              {words.length ? (
                <KeywordChips dimension={d.id} keywords={words} />
              ) : (
                <p className="text-sm italic text-muted-foreground">Todavía sin palabras clave.</p>
              )}
            </div>
          )
        })}
      </section>

      <div className="flex flex-col gap-4">
        {INTERSECTIONS.map((i) => (
          <ReflectionQuestion
            key={i.id}
            id={intersectionFieldId(i.id)}
            eyebrow={
              <span className="flex items-center gap-2">
                <span className="flex" aria-hidden="true">
                  <DimensionMarker id={i.dimensions[0]} className="size-4" />
                  <DimensionMarker id={i.dimensions[1]} className="-ml-1.5 size-4" />
                </span>
                {i.name} · {DIMENSION_BY_ID[i.dimensions[0]].name} + {DIMENSION_BY_ID[i.dimensions[1]].name}
              </span>
            }
            label={i.question}
            value={answers[intersectionFieldId(i.id)] ?? ""}
            onChange={(v) => setAnswer(intersectionFieldId(i.id), v)}
          />
        ))}
      </div>

      <section aria-labelledby="ikigai-purpose-title" className="flex flex-col gap-5 rounded-2xl border border-primary/40 bg-primary/5 p-6 sm:p-8">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Centro del Ikigai</p>
          <h3 id="ikigai-purpose-title" className="text-xl font-bold text-foreground">
            Mi hipótesis de propósito profesional
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            No es una promesa eterna ni un eslogan. Es una hipótesis que debe sentirse verdadera y útil hoy.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-foreground">Si te sirve, partí de una estructura:</p>
          <ul className="flex flex-col gap-2">
            {PURPOSE_TEMPLATES.map((t) => (
              <li key={t}>
                <button
                  type="button"
                  onClick={() => applyTemplate(t)}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-left text-sm leading-relaxed text-foreground transition-colors hover:border-primary/50 hover:bg-card"
                >
                  {t}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <ReflectionQuestion
          id={PURPOSE_FIELD.id}
          label={PURPOSE_FIELD.label}
          value={hypothesis}
          onChange={(v) => setAnswer(PURPOSE_FIELD.id, v)}
          rows={4}
          placeholder="Escribila con tus palabras. Podés reescribirla todas las veces que quieras."
        />
        <p className="text-xs text-muted-foreground">
          En el diagrama se muestra una versión breve si el texto es largo. El reporte conserva la frase completa.
        </p>
      </section>
    </div>
  )
}

export function CompassStage({ answers, setAnswer }: StageProps) {
  return (
    <div className="flex flex-col gap-8">
      <StepHeader eyebrow="Etapa 7 · Brújula" title="Mi brújula profesional">
        <p>Criterios concretos para elegir oportunidades, cuidar tu energía y reconocer a tiempo lo que no te hace bien.</p>
      </StepHeader>
      <div className="grid gap-5 md:grid-cols-2">
        {COMPASS.map((card) => (
          <section key={card.id} aria-labelledby={`${card.id}-title`} className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5">
            <h3 id={`${card.id}-title`} className="text-lg font-bold text-foreground">
              {card.title}
            </h3>
            {card.fields.map((f) => (
              <div key={f.id} className="flex flex-col gap-2">
                <label htmlFor={f.id} className="text-sm font-medium leading-relaxed text-foreground">
                  {f.label}
                </label>
                <textarea
                  id={f.id}
                  rows={3}
                  value={answers[f.id] ?? ""}
                  onChange={(e) => setAnswer(f.id, e.target.value)}
                  placeholder="Describilo de forma observable."
                  className="w-full resize-y rounded-lg border border-border bg-background px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            ))}
          </section>
        ))}
      </div>
      <details className="group rounded-xl border border-border bg-secondary/50 p-5">
        <summary className="flex cursor-pointer list-none items-center gap-3 text-sm font-semibold text-foreground">
          <Lightbulb className="size-5 shrink-0 text-primary" aria-hidden="true" />
          Un consejo para esta etapa
          <span className="ml-auto text-xs font-normal text-muted-foreground group-open:hidden">Ver</span>
          <span className="ml-auto hidden text-xs font-normal text-muted-foreground group-open:inline">Ocultar</span>
        </summary>
        <p className="mt-3 text-sm leading-relaxed text-foreground">{COMPASS_TIP}</p>
      </details>
    </div>
  )
}

export function ClosingStage({ answers, setAnswer }: StageProps) {
  return (
    <div className="flex flex-col gap-6">
      <StepHeader eyebrow="Etapa 8 · Cierre" title="Cierre y próximos pasos">
        <p>Una exploración se vuelve útil cuando se transforma en una conversación, un experimento o una decisión pequeña.</p>
      </StepHeader>
      {CLOSING_FIELDS.map((f) => (
        <ReflectionQuestion key={f.id} id={f.id} label={f.label} value={answers[f.id] ?? ""} onChange={(v) => setAnswer(f.id, v)} />
      ))}
      <div className={cn("flex flex-col gap-4 rounded-2xl border border-primary/40 bg-primary/5 p-5 sm:p-6")}>
        <ReflectionQuestion
          id={NEXT_STEP_FIELDS.step.id}
          label={NEXT_STEP_FIELDS.step.label}
          value={answers[NEXT_STEP_FIELDS.step.id] ?? ""}
          onChange={(v) => setAnswer(NEXT_STEP_FIELDS.step.id, v)}
          placeholder="Por ejemplo: conversar con dos personas que trabajan en el rol que me interesa."
          className="bg-background"
        />
        <div className="sm:max-w-xs">
          <TextInput
            id={NEXT_STEP_FIELDS.date.id}
            label={NEXT_STEP_FIELDS.date.label}
            type="date"
            value={answers[NEXT_STEP_FIELDS.date.id] ?? ""}
            onChange={(v) => setAnswer(NEXT_STEP_FIELDS.date.id, v)}
          />
        </div>
      </div>
    </div>
  )
}
