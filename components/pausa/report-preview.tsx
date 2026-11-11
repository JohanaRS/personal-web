"use client"

import { useId, useState } from "react"
import { ArrowLeft, Check, Download, Loader2, Pencil, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DISCLAIMER,
  QUESTIONS,
  REPORT_SECTIONS,
  REPORT_TITLE,
  SIGNATURE_NAME,
  SIGNATURE_ROLE,
  USE_MODES,
  type QuestionId,
} from "./content"
import { AnswerField, PendingBadge } from "./fields"
import { filled, isPending, longDate, type PausaAnswers } from "./state"

type EditableKey = QuestionId | "task" | "nextStep" | "nextStepDetail"

function EditableAnswer({
  label,
  value,
  pending,
  display = "body",
  onSave,
}: {
  label: string
  value: string
  pending: boolean
  display?: "body" | "display"
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
        <AnswerField id={id} autoFocus value={draft} onChange={(e) => setDraft(e.target.value)} />
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
    <div className="flex flex-col items-start gap-3">
      {pending ? (
        <>
          <PendingBadge />
          {filled(value) && (
            <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
              Nota previa: {value.trim()}
            </p>
          )}
        </>
      ) : (
        <p
          className={
            display === "display"
              ? "whitespace-pre-line font-display text-xl leading-snug text-foreground sm:text-2xl"
              : "whitespace-pre-line text-base leading-relaxed text-foreground"
          }
        >
          {value.trim()}
        </p>
      )}
      <button
        type="button"
        onClick={() => {
          setDraft(value)
          setEditing(true)
        }}
        className="inline-flex items-center gap-1.5 rounded-md text-sm font-semibold text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
      >
        <Pencil className="size-3.5" aria-hidden="true" />
        {pending ? "Completar" : "Editar"}
        <span className="sr-only">: {label}</span>
      </button>
    </div>
  )
}

export function ReportPreview({
  answers,
  persist,
  onChange,
  onBack,
  onRestart,
}: {
  answers: PausaAnswers
  persist: boolean
  onChange: (patch: Partial<PausaAnswers>) => void
  onBack: () => void
  onRestart: () => void
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle")
  const [confirmRestart, setConfirmRestart] = useState(false)
  const today = new Date()
  const mode = USE_MODES.find((m) => m.id === answers.useMode)

  const save = (key: EditableKey) => (value: string) => {
    if (key === "aprendizaje") onChange({ aprendizaje: value, learningPending: !filled(value) })
    else onChange({ [key]: value })
  }

  const download = async () => {
    setStatus("loading")
    try {
      const { downloadPausaPdf } = await import("./pdf")
      await downloadPausaPdf(answers, today)
      setStatus("idle")
    } catch (error) {
      console.error("[pausa] PDF error", error)
      setStatus("error")
    }
  }

  return (
    <section className="py-10 lg:py-16" aria-labelledby="reporte-titulo">
      <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-widest text-foreground">Vista previa del reporte</p>
          <p className="text-base leading-relaxed text-muted-foreground">
            Revisá tus respuestas. Podés editar cualquiera antes de descargar el PDF.
          </p>
        </div>

        <article className="flex flex-col gap-10 rounded-3xl border border-border p-6 sm:p-10">
          <header className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h2
                id="reporte-titulo"
                className="font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl"
              >
                {REPORT_TITLE}
              </h2>
              <p className="text-sm text-muted-foreground">{longDate(today)}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground">La tarea</h3>
              <EditableAnswer
                label="La tarea"
                value={answers.task}
                pending={!filled(answers.task)}
                display="display"
                onSave={save("task")}
              />
            </div>
            <div className="flex flex-col gap-4 rounded-2xl bg-sage p-6 sm:p-8">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground">Mi próximo paso</h3>
              <EditableAnswer
                label="Mi próximo paso"
                value={answers.nextStep}
                pending={!filled(answers.nextStep)}
                display="display"
                onSave={save("nextStep")}
              />
              {filled(answers.nextStepDetail) && (
                <EditableAnswer
                  label="Cuándo o qué comprobar"
                  value={answers.nextStepDetail}
                  pending={false}
                  onSave={save("nextStepDetail")}
                />
              )}
            </div>
          </header>

          {REPORT_SECTIONS.map((section) => (
            <section key={section.title} className="flex flex-col gap-6 border-t border-border pt-8">
              <h3 className="font-display text-2xl font-semibold text-foreground">{section.title}</h3>
              {section.ids.map((id) => {
                const q = QUESTIONS.find((item) => item.id === id)
                if (!q) return null
                return (
                  <div key={id} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="w-8 shrink-0 font-display text-3xl font-semibold leading-none text-olive"
                    >
                      {q.letter}
                    </span>
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        {q.name} · {q.moment}
                      </p>
                      <h4 className="font-semibold text-foreground">{q.question}</h4>
                      {id === "uso" && mode && (
                        <p className="text-sm text-muted-foreground">Elegí avanzar: {mode.label.toLowerCase()}.</p>
                      )}
                      <EditableAnswer
                        label={q.name}
                        value={answers[id]}
                        pending={isPending(answers, id)}
                        onSave={save(id)}
                      />
                    </div>
                  </div>
                )
              })}
            </section>
          ))}

          <footer className="flex flex-col gap-4 border-t border-border pt-8">
            <div>
              <p className="text-sm text-muted-foreground">Con criterio propio,</p>
              <p className="font-display text-2xl font-semibold text-foreground">{SIGNATURE_NAME}</p>
              <p className="text-sm text-muted-foreground">{SIGNATURE_ROLE}</p>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">{DISCLAIMER}</p>
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
          <div className="flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>{persist ? "Tu borrador sigue guardado en este navegador." : "Tus respuestas no se guardan al cerrar la página."}</p>
            {confirmRestart ? (
              <div className="flex flex-wrap items-center gap-2">
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
                className="inline-flex items-center gap-1.5 font-semibold text-foreground underline-offset-4 hover:underline"
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
