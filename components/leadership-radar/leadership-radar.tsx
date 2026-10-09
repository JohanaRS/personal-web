"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { scrollToTop, trackRadar } from "./analytics"
import { stepIndexOf, STEPS } from "./content"
import { IntroView } from "./intro-view"
import { ProgressStepper } from "./progress-stepper"
import { clearState, createGuidedSkills, createInitialState, loadState, saveState } from "./state"
import { ActionStep } from "./steps/action-step"
import { AssessStep } from "./steps/assess-step"
import { ChoiceStep } from "./steps/choice-step"
import { DefineStep } from "./steps/define-step"
import { IntentionStep } from "./steps/intention-step"
import { PrioritizeStep } from "./steps/prioritize-step"
import { RadarStep } from "./steps/radar-step"
import { ReflectStep } from "./steps/reflect-step"
import { SummaryView } from "./summary-view"
import type { Mode, Phase, RadarState, StatePatch } from "./types"

export function LeadershipRadar() {
  const [state, setState] = useState<RadarState>(createInitialState)
  const [loaded, setLoaded] = useState(false)
  const shouldScroll = useRef(false)

  useEffect(() => {
    const saved = loadState()
    if (saved) setState(saved)
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded) saveState(state)
  }, [state, loaded])

  useEffect(() => {
    if (shouldScroll.current) {
      shouldScroll.current = false
      scrollToTop()
    }
  }, [state.phase, state.assessIndex])

  const update = useCallback((patch: StatePatch) => {
    setState((prev) => ({ ...prev, ...(typeof patch === "function" ? patch(prev) : patch) }))
  }, [])

  const goTo = useCallback((phase: Phase) => {
    shouldScroll.current = true
    setState((prev) => {
      const index = stepIndexOf(phase)
      return { ...prev, phase, maxStep: Math.max(prev.maxStep, index) }
    })
    if (phase === "summary") trackRadar("leadership_radar_completed")
  }, [])

  const selectMode = (mode: Mode) => {
    trackRadar("leadership_radar_mode_selected", { mode })
    shouldScroll.current = true
    setState((prev) => {
      const keepSkills = prev.mode === mode && prev.skills.length > 0
      return {
        ...prev,
        mode,
        phase: "define",
        maxStep: Math.max(prev.maxStep, 0),
        skills: keepSkills ? prev.skills : mode === "guided" ? createGuidedSkills() : [],
        assessIndex: keepSkills ? prev.assessIndex : 0,
      }
    })
  }

  const restart = () => {
    if (!window.confirm("Se borrarán tus respuestas de este navegador. ¿Querés empezar de nuevo?")) return
    clearState()
    shouldScroll.current = true
    setState(createInitialState())
  }

  const selectStep = (index: number) => {
    const target = STEPS[index].phase
    if (target === "assess") update({ assessIndex: 0 })
    goTo(target)
  }

  if (!loaded) {
    return <div className="min-h-screen" aria-busy="true" />
  }

  if (state.phase === "intro") {
    return <IntroView onStart={() => trackRadar("leadership_radar_started")} onSelectMode={selectMode} />
  }

  const props = { state, update, goTo }
  const currentIndex = stepIndexOf(state.phase)
  const subLabel =
    state.phase === "assess" ? `Capacidad ${Math.min(state.assessIndex, state.skills.length - 1) + 1} de ${state.skills.length}` : undefined

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-5xl print:hidden">
        <ProgressStepper
          currentIndex={currentIndex}
          maxIndex={state.maxStep}
          subLabel={subLabel}
          onSelect={selectStep}
        />
      </div>

      {state.phase === "define" && <DefineStep {...props} />}
      {state.phase === "assess" && <AssessStep {...props} />}
      {state.phase === "radar" && <RadarStep {...props} />}
      {state.phase === "choice" && <ChoiceStep {...props} />}
      {state.phase === "reflect" && <ReflectStep {...props} />}
      {state.phase === "prioritize" && <PrioritizeStep {...props} />}
      {state.phase === "intention" && <IntentionStep {...props} />}
      {state.phase === "action" && <ActionStep {...props} />}
      {state.phase === "summary" && <SummaryView {...props} onRestart={restart} />}
    </div>
  )
}
