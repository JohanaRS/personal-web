"use client"

import { useEffect, useId, useRef, useState } from "react"
import { ArrowLeft, ArrowRight, Bookmark, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { DRAFT_NOTE } from "./content"
import { Progress } from "./progress"
import { buildScreen } from "./screens"
import { savedTime, screensFor, stageOf, type Answers, type FocusItem, type ToolState } from "./state"

interface FlowProps {
  state: ToolState
  storageFailed: boolean
  setAnswers: (patch: Partial<Answers>) => void
  setItem: (id: string, patch: Partial<FocusItem>) => void
  goTo: (screen: string) => void
  onSave: () => void
  onFinish: () => void
}

export function Flow({ state, storageFailed, setAnswers, setItem, goTo, onSave, onFinish }: FlowProps) {
  const { screen, answers } = state
  const headingRef = useRef<HTMLHeadingElement>(null)
  const firstRender = useRef(true)
  const [error, setError] = useState<string | null>(null)
  const ids = { heading: useId(), help: useId(), error: useId() }

  useEffect(() => {
    setError(null)
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    headingRef.current?.focus({ preventScroll: true })
    headingRef.current?.scrollIntoView({ block: "start", behavior: "smooth" })
  }, [screen])

  const screens = screensFor(answers)
  const index = Math.max(0, screens.indexOf(screen))
  const isLast = index === screens.length - 1
  const stage = stageOf(screen)

  const config = buildScreen(screen, {
    answers,
    labelledBy: ids.heading,
    describedBy: cn(ids.help, error && ids.error),
    invalid: Boolean(error),
    setAnswers: (patch) => {
      setError(null)
      setAnswers(patch)
    },
    setItem: (id, patch) => {
      setError(null)
      setItem(id, patch)
    },
    goTo,
  })

  const next = () => {
    const message = config.validate?.() ?? null
    if (message) {
      setError(message)
      return
    }
    if (isLast) onFinish()
    else goTo(screens[index + 1])
  }

  const goToStage = (target: number) => {
    const first = screens.find((s) => stageOf(s) === target)
    if (first) goTo(first)
  }

  return (
    <section className="py-10 lg:py-16" aria-labelledby={ids.heading}>
      <div className="mx-auto flex max-w-3xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <Progress stage={stage} furthest={stage} onGoToStage={goToStage} />

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold uppercase tracking-widest text-foreground">{config.eyebrow}</p>
            <h2
              id={ids.heading}
              ref={headingRef}
              tabIndex={-1}
              className="scroll-mt-28 font-display text-3xl font-semibold leading-tight text-foreground text-balance outline-none sm:text-4xl"
            >
              {config.title}
            </h2>
            <p id={ids.help} className="max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty">
              {config.help}
            </p>
          </div>

          {config.body}

          {error && (
            <p id={ids.error} role="alert" className="text-sm font-semibold text-foreground">
              <span className="mr-2 inline-block size-2 rounded-full bg-clay" aria-hidden="true" />
              {error}
            </p>
          )}

          {config.secondary && (
            <Button
              variant="outline"
              onClick={config.secondary.onClick}
              className="h-11 w-full bg-transparent sm:w-fit"
            >
              {config.secondary.label}
            </Button>
          )}
        </div>

        <div className="flex flex-col gap-6 border-t border-border pt-6">
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            {index > 0 ? (
              <Button variant="ghost" onClick={() => goTo(screens[index - 1])} className="h-12 text-base">
                <ArrowLeft aria-hidden="true" />
                Anterior
              </Button>
            ) : (
              <span className="hidden sm:block" />
            )}
            <Button size="lg" onClick={next} className="h-12 px-6 text-base">
              {isLast ? "Ver mi reporte" : "Continuar"}
              <ArrowRight aria-hidden="true" />
            </Button>
          </div>
          <SaveForLater state={state} storageFailed={storageFailed} onSave={onSave} />
        </div>
      </div>
    </section>
  )
}

export function SaveForLater({
  state,
  storageFailed,
  onSave,
}: {
  state: ToolState
  storageFailed: boolean
  onSave: () => void
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <p className="text-sm leading-relaxed text-muted-foreground">{DRAFT_NOTE}</p>
      <div className="flex shrink-0 flex-col items-start gap-1 sm:items-end">
        <Button variant="outline" size="sm" onClick={onSave} className="h-10 bg-transparent">
          {state.persist && !storageFailed ? <Check aria-hidden="true" /> : <Bookmark aria-hidden="true" />}
          Guardar para retomar
        </Button>
        <p role="status" className="text-xs text-foreground">
          {storageFailed
            ? "Este navegador no permite guardar. Descargá el PDF al terminar."
            : state.persist && state.updatedAt
              ? `Guardado ${savedTime(state.updatedAt)}`
              : ""}
        </p>
      </div>
    </div>
  )
}
