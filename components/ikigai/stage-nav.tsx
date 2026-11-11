"use client"

import { Check, CloudOff, Loader2, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { STAGE_FIELD_IDS, STAGES } from "./content"
import { filled, type Answers } from "./state"

export type SaveStatus = "idle" | "saving" | "saved" | "error"

interface StageNavProps {
  stage: number
  answers: Answers
  progress: number
  saveStatus: SaveStatus
  onSelect: (stage: number) => void
  onReset: () => void
}

function SaveIndicator({ status }: { status: SaveStatus }) {
  return (
    <p role="status" aria-live="polite" className="flex items-center gap-1.5 text-xs text-muted-foreground">
      {status === "saving" && (
        <>
          <Loader2 className="size-3.5 animate-spin" aria-hidden="true" /> Guardando…
        </>
      )}
      {status === "saved" && (
        <>
          <Check className="size-3.5 text-primary" aria-hidden="true" /> Guardado en este dispositivo
        </>
      )}
      {status === "error" && (
        <>
          <CloudOff className="size-3.5 text-destructive" aria-hidden="true" /> No se pudo guardar en este navegador
        </>
      )}
    </p>
  )
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progreso de respuestas"
      className="h-1.5 w-full overflow-hidden rounded-full bg-secondary"
    >
      <div className="h-full rounded-full bg-primary transition-[width] duration-500" style={{ width: `${progress}%` }} />
    </div>
  )
}

const stageHasAnswers = (answers: Answers, index: number) =>
  STAGE_FIELD_IDS[STAGES[index].id].some((id) => filled(answers[id]))

export function StageSidebar({ stage, answers, progress, saveStatus, onSelect, onReset }: StageNavProps) {
  return (
    <aside className="sticky top-28 hidden flex-col gap-6 self-start lg:flex print:hidden">
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between text-sm">
          <span className="font-semibold text-foreground">Tu progreso</span>
          <span className="text-muted-foreground">{progress}%</span>
        </div>
        <ProgressBar progress={progress} />
        <SaveIndicator status={saveStatus} />
      </div>
      <nav aria-label="Etapas del Ikigai profesional">
        <ol className="flex flex-col gap-1">
          {STAGES.map((s, i) => {
            const current = i === stage
            const done = stageHasAnswers(answers, i)
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => onSelect(i)}
                  aria-current={current ? "step" : undefined}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                    current ? "bg-primary/10 font-semibold text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-6 shrink-0 items-center justify-center rounded-full border text-xs",
                      current
                        ? "border-primary bg-primary text-primary-foreground"
                        : done
                          ? "border-primary/40 text-primary"
                          : "border-border",
                    )}
                    aria-hidden="true"
                  >
                    {done && !current ? <Check className="size-3.5" /> : i + 1}
                  </span>
                  <span className="leading-snug">{s.label}</span>
                  {done && <span className="sr-only">(con respuestas)</span>}
                </button>
              </li>
            )
          })}
        </ol>
      </nav>
      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-2 self-start text-xs text-muted-foreground underline-offset-4 hover:text-destructive hover:underline"
      >
        <RotateCcw className="size-3.5" aria-hidden="true" />
        Borrar respuestas y empezar de nuevo
      </button>
    </aside>
  )
}

export function MobileProgress({ stage, progress, saveStatus, onSelect }: Omit<StageNavProps, "answers" | "onReset">) {
  return (
    <div className="mb-8 flex flex-col gap-3 rounded-xl border border-border bg-card p-4 lg:hidden print:hidden">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-semibold text-foreground">
          Etapa {stage + 1} de {STAGES.length}
        </span>
        <span className="text-muted-foreground">{progress}% completado</span>
      </div>
      <ProgressBar progress={progress} />
      <div className="flex flex-col gap-1">
        <label htmlFor="ikigai-stage-select" className="sr-only">
          Ir a otra etapa
        </label>
        <select
          id="ikigai-stage-select"
          value={stage}
          onChange={(e) => onSelect(Number(e.target.value))}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          {STAGES.map((s, i) => (
            <option key={s.id} value={i}>
              {i + 1}. {s.label}
            </option>
          ))}
        </select>
      </div>
      <SaveIndicator status={saveStatus} />
    </div>
  )
}
