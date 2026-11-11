"use client"

import { useCallback, useEffect, useState } from "react"
import { Toaster } from "sonner"
import { StepNav } from "@/components/leadership-radar/step-nav"
import { scrollToTop } from "@/components/leadership-radar/analytics"
import { DIMENSION_BY_ID, STAGES, type DimensionId } from "./content"
import { IntroView } from "./intro-view"
import { MobileProgress, StageSidebar, type SaveStatus } from "./stage-nav"
import { ClosingStage, CompassStage, DimensionStage, FrameStage, IntersectionsStage } from "./stages"
import { clearState, createInitialState, loadState, progressOf, saveState, type IkigaiState } from "./state"
import { SynthesisStage } from "./synthesis-stage"

const LAST = STAGES.length - 1

export function IkigaiTool() {
  const [state, setState] = useState<IkigaiState>(createInitialState)
  const [loaded, setLoaded] = useState(false)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle")

  useEffect(() => {
    const saved = loadState()
    if (saved) setState(saved)
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded || state.updatedAt === null) return
    setSaveStatus("saving")
    const timer = setTimeout(() => setSaveStatus(saveState(state) ? "saved" : "error"), 400)
    return () => clearTimeout(timer)
  }, [state, loaded])

  const setAnswer = useCallback((id: string, value: string) => {
    setState((prev) => ({ ...prev, answers: { ...prev.answers, [id]: value }, updatedAt: Date.now() }))
  }, [])

  const goTo = useCallback((stage: number) => {
    setState((prev) => ({ ...prev, started: true, stage: Math.min(Math.max(stage, 0), LAST), updatedAt: Date.now() }))
    scrollToTop()
  }, [])

  const reset = () => {
    if (!window.confirm("¿Querés borrar todas tus respuestas del Ikigai profesional? Esta acción no se puede deshacer.")) return
    clearState()
    setState(createInitialState())
    setSaveStatus("idle")
    scrollToTop()
  }

  if (!loaded) {
    return <div className="min-h-[60vh]" aria-busy="true" />
  }

  const hasProgress = progressOf(state.answers) > 0

  if (!state.started) {
    return <IntroView onStart={() => goTo(state.stage)} hasProgress={hasProgress} />
  }

  const stageId = STAGES[state.stage].id
  const props = { answers: state.answers, setAnswer }
  const progress = progressOf(state.answers)

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Toaster position="bottom-center" />
      <MobileProgress stage={state.stage} progress={progress} saveStatus={saveStatus} onSelect={goTo} />
      <div className="lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
        <StageSidebar
          stage={state.stage}
          answers={state.answers}
          progress={progress}
          saveStatus={saveStatus}
          onSelect={goTo}
          onReset={reset}
        />
        <div className="flex min-w-0 flex-col gap-10">
          {stageId === "frame" && <FrameStage {...props} />}
          {(["love", "good", "need", "paid"] as const).includes(stageId as DimensionId) && (
            <DimensionStage {...props} dimension={DIMENSION_BY_ID[stageId as DimensionId]} stageNumber={state.stage + 1} />
          )}
          {stageId === "intersections" && <IntersectionsStage {...props} />}
          {stageId === "compass" && <CompassStage {...props} />}
          {stageId === "closing" && <ClosingStage {...props} />}
          {stageId === "synthesis" && <SynthesisStage answers={state.answers} onEdit={goTo} />}

          <div className="print:hidden">
            {state.stage < LAST ? (
              <StepNav
                onBack={() => (state.stage === 0 ? setState((p) => ({ ...p, started: false })) : goTo(state.stage - 1))}
                onNext={() => goTo(state.stage + 1)}
                backLabel={state.stage === 0 ? "Volver a la introducción" : "Atrás"}
                nextLabel={state.stage === LAST - 1 ? "Ver mi Ikigai" : "Continuar"}
              />
            ) : (
              <StepNav onBack={() => goTo(state.stage - 1)} onNext={() => goTo(0)} nextLabel="Volver al inicio del recorrido" />
            )}
          </div>
          <button
            type="button"
            onClick={reset}
            className="self-start text-xs text-muted-foreground underline-offset-4 hover:text-destructive hover:underline lg:hidden"
          >
            Borrar respuestas y empezar de nuevo
          </button>
        </div>
      </div>
    </div>
  )
}
