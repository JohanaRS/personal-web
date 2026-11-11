"use client"

import { useId, useState } from "react"
import { ArrowLeft, Check, Download, Loader2, Pencil, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnswerField } from "../pausa/fields"
import { NEXT_STEP_FIELDS, REPORT_TITLE, SIGNATURE_NAME, SIGNATURE_ROLE } from "./content"
import { SaveForLater } from "./flow"
import { filled, longDate, momentById, priorityItem, type Answers, type FocusItem, type ToolState } from "./state"

function Editable({
  label,
  value,
  emptyText = "Sin completar",
  large = false,
  onSave,
}: {
  label: string
  value: string
  emptyText?: string
  large?: boolean
  onSave: (value: string) => void
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const id = useId()

  if (editing) {
    return (
      <div className="flex flex-col gap-3">
        <label htmlFor={id} className="sr-only">
          Editar: {label}
        </label>
        <AnswerField id={id} autoFocus rows={3} className="min-h-24" value={draft} onChange={(e) => setDraft(e.target.value)} />
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            onClick={() => {
              onSave(draft)
              setEditing(false)
            }}
          >
            <Check aria-hidden="true" />
            Guardar cambio
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>
            Cancelar
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <p
        className={
          filled(value)
            ? large
              ? "whitespace-pre-line font-display text-2xl leading-snug text-foreground sm:text-3xl"
              : "whitespace-pre-line text-base leading-relaxed text-foreground"
            : "text-base italic text-muted-foreground"
        }
      >
        {filled(value) ? value.trim() : emptyText}
      </p>
      <button
        type="button"
        onClick={() => {
          setDraft(value)
          setEditing(true)
        }}
        className="inline-flex min-h-8 items-center gap-1.5 rounded-md text-sm font-semibold text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
      >
        <Pencil className="size-3.5" aria-hidden="true" />
        {filled(value) ? "Editar" : "Completar"}
        <span className="sr-only">: {label}</span>
      </button>
    </div>
  )
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 border-t border-border pt-6">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{title}</h3>
      {children}
    </div>
  )
}

export function ReportPreview({
  state,
  storageFailed,
  setAnswers,
  setItem,
  onBack,
  onSave,
  onRestart,
}: {
  state: ToolState
  storageFailed: boolean
  setAnswers: (patch: Partial<Answers>) => void
  setItem: (id: string, patch: Partial<FocusItem>) => void
  onBack: () => void
  onSave: () => void
  onRestart: () => void
}) {
  const { answers } = state
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle")
  const [confirmRestart, setConfirmRestart] = useState(false)
  const today = new Date()
  const moment = momentById(answers.moment)
  const priority = priorityItem(answers)

  const download = async () => {
    setStatus("loading")
    try {
      const { downloadPausaEstrategicaPdf } = await import("./pdf")
      await downloadPausaEstrategicaPdf(answers, today)
      setStatus("idle")
    } catch (error) {
      console.error("[pausa-estrategica] PDF error", error)
      setStatus("error")
    }
  }

  return (
    <section className="py-10 lg:py-16" aria-labelledby="pe-reporte">
      <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-widest text-foreground">Vista previa del reporte</p>
          <p className="text-base leading-relaxed text-muted-foreground">
            Revisá lo que escribiste. Podés editar cualquier parte antes de descargar el PDF.
          </p>
        </div>

        <article className="flex flex-col gap-6 rounded-3xl border border-border p-6 sm:p-10">
          <header className="flex flex-col gap-1">
            <h2 id="pe-reporte" className="font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              {REPORT_TITLE}
            </h2>
            <p className="text-sm text-muted-foreground">
              {longDate(today)}
              {moment ? ` · ${moment.label}` : ""}
            </p>
          </header>

          <div className="flex flex-col gap-6 rounded-2xl bg-sage p-6 sm:p-8">
            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground">
                {NEXT_STEP_FIELDS.nextStep.label}
              </h3>
              <Editable
                label={NEXT_STEP_FIELDS.nextStep.label}
                value={answers.nextStep}
                large
                onSave={(nextStep) => setAnswers({ nextStep })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground">
                {NEXT_STEP_FIELDS.when.label}
              </h3>
              <Editable label={NEXT_STEP_FIELDS.when.label} value={answers.when} onSave={(when) => setAnswers({ when })} />
            </div>
          </div>

          <Block title="Mi prioridad">
            {priority ? (
              <Editable label="Mi prioridad" value={priority.text} onSave={(text) => filled(text) && setItem(priority.id, { text })} />
            ) : (
              <p className="text-base italic text-muted-foreground">Sin completar</p>
            )}
          </Block>
          <Block title={NEXT_STEP_FIELDS.why.label}>
            <Editable label={NEXT_STEP_FIELDS.why.label} value={answers.why} onSave={(why) => setAnswers({ why })} />
          </Block>
          {filled(answers.fitVersion) && (
            <Block title="La versión que cabe hoy">
              <Editable
                label="La versión que cabe hoy"
                value={answers.fitVersion}
                onSave={(fitVersion) => setAnswers({ fitVersion })}
              />
            </Block>
          )}
          <Block title={NEXT_STEP_FIELDS.later.label}>
            <Editable
              label={NEXT_STEP_FIELDS.later.label}
              value={answers.later}
              emptyText="Nada anotado. Es opcional."
              onSave={(later) => setAnswers({ later })}
            />
          </Block>

          <footer className="flex flex-col gap-1 border-t border-border pt-6">
            <p className="text-sm text-muted-foreground">Con foco y criterio propio,</p>
            <p className="font-display text-2xl font-semibold text-foreground">{SIGNATURE_NAME}</p>
            <p className="text-sm text-muted-foreground">{SIGNATURE_ROLE}</p>
          </footer>
        </article>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button variant="ghost" onClick={onBack} className="h-12 text-base">
              <ArrowLeft aria-hidden="true" />
              Volver a las preguntas
            </Button>
            <Button size="lg" onClick={download} disabled={status === "loading"} className="h-12 px-6 text-base">
              {status === "loading" ? (
                <Loader2 className="animate-spin" aria-hidden="true" />
              ) : (
                <Download aria-hidden="true" />
              )}
              {status === "loading" ? "Preparando el PDF…" : "Descargar mi reporte en PDF"}
            </Button>
          </div>
          <p role="status" className="text-sm text-foreground sm:text-right">
            {status === "error" ? "No pudimos generar el PDF. Probá de nuevo en unos segundos." : ""}
          </p>
          <div className="flex flex-col gap-6 border-t border-border pt-6">
            <SaveForLater state={state} storageFailed={storageFailed} onSave={onSave} />
            {confirmRestart ? (
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="text-foreground">¿Borrar estas respuestas y empezar de nuevo?</span>
                <Button size="sm" variant="outline" onClick={onRestart} className="bg-transparent">
                  Sí, empezar de nuevo
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setConfirmRestart(false)}>
                  Cancelar
                </Button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmRestart(true)}
                className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-foreground underline-offset-4 hover:underline"
              >
                <RotateCcw className="size-3.5" aria-hidden="true" />
                Hacer una nueva pausa
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
