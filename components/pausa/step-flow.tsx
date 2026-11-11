"use client"

import { useEffect, useId, useRef, useState } from "react"
import { ArrowLeft, ArrowRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CLOSING, EXAMPLE, QUESTIONS, TASK_STEP, USE_MODES } from "./content"
import { ExamplePanel } from "./example-panel"
import { AnswerField, DraftToggle } from "./fields"
import { CLOSING_STEP_INDEX, filled, TASK_STEP_INDEX, type PausaAnswers, type PausaState } from "./state"
import { StepNav } from "./step-nav"

interface StepFlowProps {
  state: PausaState
  storageFailed: boolean
  onChange: (patch: Partial<PausaAnswers>) => void
  onGoTo: (step: number) => void
  onPersistChange: (value: boolean) => void
  onTryLater: () => void
  onFinish: () => void
}

export function StepFlow({ state, storageFailed, onChange, onGoTo, onPersistChange, onTryLater, onFinish }: StepFlowProps) {
  const { step, answers } = state
  const headingRef = useRef<HTMLHeadingElement>(null)
  const firstRender = useRef(true)
  const [error, setError] = useState<string | null>(null)
  const ids = { heading: useId(), help: useId(), error: useId(), extra: useId() }

  useEffect(() => {
    setError(null)
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    headingRef.current?.focus({ preventScroll: true })
  }, [step])

  const question = step > TASK_STEP_INDEX && step < CLOSING_STEP_INDEX ? QUESTIONS[step - 1] : null

  const next = () => {
    if (step === TASK_STEP_INDEX && !filled(answers.task)) {
      setError("Nombrá la tarea para poder seguir. Con una frase alcanza.")
      return
    }
    if (step === CLOSING_STEP_INDEX) {
      if (!filled(answers.nextStep)) {
        setError("Escribí un próximo paso concreto para ver tu reporte.")
        return
      }
      onFinish()
      return
    }
    onGoTo(step + 1)
  }

  const fieldProps = {
    "aria-labelledby": ids.heading,
    "aria-describedby": cn(ids.help, error && ids.error),
    "aria-invalid": error ? true : undefined,
  }

  let title: string
  let help: string
  let field: React.ReactNode
  let extra: React.ReactNode = null
  let example: React.ReactNode = null
  let eyebrow: string

  if (step === TASK_STEP_INDEX) {
    eyebrow = "Antes de empezar"
    title = TASK_STEP.title
    help = TASK_STEP.help
    field = (
      <AnswerField
        {...fieldProps}
        rows={3}
        className="min-h-24"
        value={answers.task}
        placeholder={TASK_STEP.placeholder}
        onChange={(e) => onChange({ task: e.target.value })}
      />
    )
    example = <ExamplePanel label="Tarea del ejemplo" text={EXAMPLE.task} />
  } else if (question) {
    eyebrow = `${question.letter} · ${question.name}`
    title = question.question
    help = question.help
    const id = question.id
    field = (
      <AnswerField
        {...fieldProps}
        value={answers[id]}
        placeholder={question.placeholder}
        onChange={(e) => onChange({ [id]: e.target.value })}
      />
    )
    example = <ExamplePanel label={`Respuesta de ejemplo para ${question.name}`} text={EXAMPLE.answers[id]} />

    if (id === "uso") {
      extra = (
        <fieldset className="flex flex-col gap-3">
          <legend className="mb-3 text-sm font-semibold text-foreground">¿Cómo vas a avanzar?</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {USE_MODES.map((mode) => (
              <label
                key={mode.id}
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/40",
                  answers.useMode === mode.id ? "border-olive bg-sage" : "border-border hover:border-olive",
                )}
              >
                <input
                  type="radio"
                  name="use-mode"
                  value={mode.id}
                  checked={answers.useMode === mode.id}
                  onChange={() => onChange({ useMode: mode.id })}
                  className="mt-1 size-4 shrink-0 accent-[var(--olive)]"
                />
                <span className="flex flex-col">
                  <span className="font-semibold text-foreground">{mode.label}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{mode.description}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )
    }

    if (id === "aprendizaje") {
      extra = (
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-foreground">
          <input
            type="checkbox"
            checked={answers.learningPending}
            onChange={(e) => onChange({ learningPending: e.target.checked })}
            className="mt-0.5 size-4 shrink-0 accent-[var(--olive)]"
          />
          <span>
            <span className="font-semibold">Dejar esta respuesta pendiente.</span>{" "}
            <span className="text-muted-foreground">
              Va a figurar en tu reporte como «Pendiente para retomar».
            </span>
          </span>
        </label>
      )
    }
  } else {
    eyebrow = "Cierre"
    title = CLOSING.title
    help = CLOSING.help
    field = (
      <AnswerField
        {...fieldProps}
        rows={3}
        className="min-h-24"
        value={answers.nextStep}
        placeholder={CLOSING.placeholder}
        onChange={(e) => onChange({ nextStep: e.target.value })}
      />
    )
    example = <ExamplePanel label="Próximo paso del ejemplo" text={EXAMPLE.nextStep} />
    extra = (
      <div className="flex flex-col gap-2">
        <label htmlFor={ids.extra} className="text-sm font-semibold leading-relaxed text-foreground">
          {CLOSING.optionalLabel}
        </label>
        <AnswerField
          id={ids.extra}
          rows={2}
          className="min-h-20"
          value={answers.nextStepDetail}
          placeholder={CLOSING.optionalPlaceholder}
          onChange={(e) => onChange({ nextStepDetail: e.target.value })}
        />
      </div>
    )
  }

  return (
    <section className="py-10 lg:py-16" aria-labelledby={ids.heading}>
      <div className="mx-auto flex max-w-3xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <StepNav step={step} answers={answers} onGoTo={onGoTo} />

        <div className="relative flex flex-col gap-6">
          {question && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-6 right-0 select-none font-display text-9xl font-semibold leading-none text-olive/15 sm:-top-10 sm:text-[11rem]"
            >
              {question.letter}
            </span>
          )}
          <div className="relative flex flex-col gap-3">
            <p className="text-sm font-semibold uppercase tracking-widest text-foreground">{eyebrow}</p>
            <h2
              id={ids.heading}
              ref={headingRef}
              tabIndex={-1}
              className="font-display text-3xl font-semibold leading-tight text-foreground text-balance outline-none sm:text-4xl"
            >
              {title}
            </h2>
            <p id={ids.help} className="max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty">
              {help}
            </p>
          </div>

          {question?.id === "uso" && extra}
          <div className="relative flex flex-col gap-2">
            {field}
            {error && (
              <p id={ids.error} role="alert" className="text-sm font-semibold text-foreground">
                <span className="mr-2 inline-block size-2 rounded-full bg-clay" aria-hidden="true" />
                {error}
              </p>
            )}
          </div>
          {question?.id !== "uso" && extra}
          {example}

          {question?.id === "uso" && (
            <div className="flex flex-col gap-3 rounded-2xl border border-dashed border-olive p-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-relaxed text-foreground">
                ¿Preferís probar lo que elegiste y volver para revisar? Tu pausa queda guardada en este navegador.
              </p>
              <Button variant="outline" onClick={onTryLater} className="h-11 shrink-0 bg-transparent">
                <Clock aria-hidden="true" />
                Probarlo y retomar después
              </Button>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6 border-t border-border pt-6">
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            {step > TASK_STEP_INDEX ? (
              <Button variant="ghost" onClick={() => onGoTo(step - 1)} className="h-12 text-base">
                <ArrowLeft aria-hidden="true" />
                Anterior
              </Button>
            ) : (
              <span className="hidden sm:block" />
            )}
            <Button size="lg" onClick={next} className="h-12 px-6 text-base">
              {step === CLOSING_STEP_INDEX ? "Ver mi reporte" : "Continuar"}
              <ArrowRight aria-hidden="true" />
            </Button>
          </div>
          <DraftToggle checked={state.persist} storageFailed={storageFailed} onChange={onPersistChange} />
        </div>
      </div>
    </section>
  )
}
