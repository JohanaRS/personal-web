"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { QUESTIONS } from "./content"
import { IntroView } from "./intro-view"
import { PausedView } from "./paused-view"
import { ReportPreview } from "./report-preview"
import {
  clearDraft,
  createInitialState,
  LAST_STEP_INDEX,
  loadDraft,
  saveDraft,
  type PausaAnswers,
  type PausaState,
} from "./state"
import { StepFlow } from "./step-flow"

const SUPERVISION_STEP = QUESTIONS.findIndex((q) => q.id === "supervision") + 1

export function PausaTool() {
  const [state, setState] = useState<PausaState>(createInitialState)
  const [savedDraft, setSavedDraft] = useState<PausaState | null>(null)
  const [storageFailed, setStorageFailed] = useState(false)
  const topRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSavedDraft(loadDraft())
  }, [])

  useEffect(() => {
    if (!state.persist || state.view === "intro") return
    const timer = window.setTimeout(() => {
      const ok = saveDraft({ ...state, updatedAt: Date.now() })
      setStorageFailed(!ok)
    }, 400)
    return () => window.clearTimeout(timer)
  }, [state])

  const scrollToTop = useCallback(() => {
    requestAnimationFrame(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      topRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" })
    })
  }, [])

  const update = useCallback((patch: Partial<PausaAnswers>) => {
    setState((s) => ({ ...s, answers: { ...s.answers, ...patch } }))
  }, [])

  const goTo = useCallback(
    (step: number) => {
      setState((s) => ({ ...s, view: "flow", step: Math.min(Math.max(step, 0), LAST_STEP_INDEX) }))
      scrollToTop()
    },
    [scrollToTop],
  )

  const setView = useCallback(
    (view: PausaState["view"]) => {
      setState((s) => ({ ...s, view }))
      scrollToTop()
    },
    [scrollToTop],
  )

  const setPersist = useCallback((persist: boolean) => {
    if (!persist) {
      clearDraft()
      setSavedDraft(null)
      setStorageFailed(false)
    }
    setState((s) => ({ ...s, persist }))
  }, [])

  const startFresh = useCallback(() => {
    clearDraft()
    setSavedDraft(null)
    setState({ ...createInitialState(), view: "flow" })
    scrollToTop()
  }, [scrollToTop])

  const resume = useCallback(() => {
    if (!savedDraft) return
    setState(savedDraft)
    scrollToTop()
  }, [savedDraft, scrollToTop])

  const discardDraft = useCallback(() => {
    clearDraft()
    setSavedDraft(null)
  }, [])

  const tryLater = useCallback(() => {
    setState((s) => ({ ...s, persist: true, view: "paused", step: SUPERVISION_STEP }))
    scrollToTop()
  }, [scrollToTop])

  return (
    <div ref={topRef} className="scroll-mt-24">
      {state.view === "intro" && (
        <IntroView savedDraft={savedDraft} onStart={startFresh} onResume={resume} onDiscard={discardDraft} />
      )}
      {state.view === "flow" && (
        <StepFlow
          state={state}
          storageFailed={storageFailed}
          onChange={update}
          onGoTo={goTo}
          onPersistChange={setPersist}
          onTryLater={tryLater}
          onFinish={() => setView("preview")}
        />
      )}
      {state.view === "paused" && (
        <PausedView
          answers={state.answers}
          storageFailed={storageFailed}
          onResume={() => goTo(SUPERVISION_STEP)}
          onPreview={() => setView("preview")}
        />
      )}
      {state.view === "preview" && (
        <ReportPreview
          answers={state.answers}
          persist={state.persist}
          onChange={update}
          onBack={() => goTo(LAST_STEP_INDEX)}
          onRestart={startFresh}
        />
      )}
    </div>
  )
}
