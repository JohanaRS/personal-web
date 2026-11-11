"use client"

import { ClipboardList, Flag } from "lucide-react"
import { cn } from "@/lib/utils"
import { QUESTIONS, type Moment } from "./content"
import { CLOSING_STEP_INDEX, filled, isPending, TASK_STEP_INDEX, type PausaAnswers } from "./state"

const MOMENTS: Moment[] = ["Antes", "Durante", "Después"]

export function stepLabel(step: number) {
  if (step === TASK_STEP_INDEX) return "Tu tarea"
  if (step === CLOSING_STEP_INDEX) return "Próximo paso"
  return QUESTIONS[step - 1].name
}

export function stepMoment(step: number): Moment | null {
  if (step === TASK_STEP_INDEX || step === CLOSING_STEP_INDEX) return null
  return QUESTIONS[step - 1].moment
}

function isDone(answers: PausaAnswers, step: number) {
  if (step === TASK_STEP_INDEX) return filled(answers.task)
  if (step === CLOSING_STEP_INDEX) return filled(answers.nextStep)
  return !isPending(answers, QUESTIONS[step - 1].id)
}

export function StepNav({
  step,
  answers,
  onGoTo,
}: {
  step: number
  answers: PausaAnswers
  onGoTo: (step: number) => void
}) {
  const moment = stepMoment(step)
  const taskNamed = filled(answers.task)
  const total = CLOSING_STEP_INDEX + 1

  return (
    <div className="flex flex-col gap-4">
      <nav aria-label="Pasos de la pausa">
        <ol className="flex items-center gap-1.5 sm:gap-2">
          {Array.from({ length: total }, (_, i) => {
            const current = i === step
            const done = isDone(answers, i)
            const locked = i !== TASK_STEP_INDEX && !taskNamed
            const q = i > TASK_STEP_INDEX && i < CLOSING_STEP_INDEX ? QUESTIONS[i - 1] : null
            return (
              <li key={i} className="flex-1 sm:flex-none">
                <button
                  type="button"
                  onClick={() => onGoTo(i)}
                  disabled={locked}
                  aria-current={current ? "step" : undefined}
                  aria-label={`Paso ${i + 1} de ${total}: ${stepLabel(i)}${q ? ` (${q.moment})` : ""}${done ? ", respondido" : ""}`}
                  className={cn(
                    "flex h-11 w-full items-center justify-center rounded-xl border font-display text-xl font-semibold transition-colors sm:size-12",
                    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40",
                    "disabled:cursor-not-allowed disabled:opacity-40",
                    current
                      ? "border-foreground bg-foreground text-background"
                      : done
                        ? "border-sage bg-sage text-foreground hover:border-olive"
                        : "border-border text-foreground hover:border-olive",
                  )}
                >
                  {i === TASK_STEP_INDEX ? (
                    <ClipboardList className="size-5" aria-hidden="true" />
                  ) : i === CLOSING_STEP_INDEX ? (
                    <Flag className="size-5" aria-hidden="true" />
                  ) : (
                    <span aria-hidden="true">{q?.letter}</span>
                  )}
                </button>
              </li>
            )
          })}
        </ol>
      </nav>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        <p className="text-muted-foreground">
          Paso {step + 1} de {total}
        </p>
        <p className="flex items-center gap-1.5" aria-label={moment ? `Momento: ${moment}` : undefined}>
          {MOMENTS.map((m) => (
            <span
              key={m}
              aria-hidden={moment ? "true" : undefined}
              className={cn(
                "rounded-full px-3 py-1 font-semibold",
                m === moment ? "bg-olive/20 text-foreground ring-1 ring-olive" : "text-muted-foreground",
              )}
            >
              {m}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}
