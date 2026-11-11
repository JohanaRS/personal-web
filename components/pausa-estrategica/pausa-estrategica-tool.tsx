"use client"

import { useCallback, useEffect, useState } from "react"
import { Flow } from "./flow"
import { IntroView } from "./intro-view"
import { ReportPreview } from "./report-preview"
import {
  clearDraft,
  createInitialState,
  loadDraft,
  saveDraft,
  screensFor,
  type Answers,
  type FocusItem,
  type ToolState,
} from "./state"

export function PausaEstrategicaTool() {
  const [state, setState] = useState<ToolState>(createInitialState)
  /** undefined = no draft; null = draft without timestamp. */
  const [draft, setDraft] = useState<ToolState | null>(null)
  const [storageFailed, setStorageFailed] = useState(false)

  useEffect(() => {
    setDraft(loadDraft())
  }, [])

  useEffect(() => {
    if (!state.persist || state.view === "intro") return
    setStorageFailed(!saveDraft(state))
  }, [state])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  const touch = (s: ToolState): ToolState => ({ ...s, updatedAt: s.persist ? Date.now() : s.updatedAt })

  const setAnswers = useCallback((patch: Partial<Answers>) => {
    setState((s) => touch({ ...s, answers: { ...s.answers, ...patch } }))
  }, [])

  const setItem = useCallback((id: string, patch: Partial<FocusItem>) => {
    setState((s) =>
      touch({
        ...s,
        answers: { ...s.answers, items: s.answers.items.map((item) => (item.id === id ? { ...item, ...patch } : item)) },
      }),
    )
  }, [])

  const goTo = useCallback((screen: string) => {
    setState((s) => {
      const screens = screensFor(s.answers)
      return touch({ ...s, view: "flow", screen: screens.includes(screen) ? screen : screens[0] })
    })
  }, [])

  const save = () => setState((s) => ({ ...s, persist: true, updatedAt: Date.now() }))

  const restart = () => {
    clearDraft()
    setDraft(null)
    setStorageFailed(false)
    setState({ ...createInitialState(), view: "flow" })
    scrollTop()
  }

  if (state.view === "intro") {
    return (
      <IntroView
        draftSavedAt={draft ? draft.updatedAt : undefined}
        onStart={() => {
          setState((s) => ({ ...s, view: "flow" }))
          scrollTop()
        }}
        onResume={() => {
          if (draft) setState(draft)
          scrollTop()
        }}
        onDiscard={restart}
      />
    )
  }

  if (state.view === "preview") {
    return (
      <ReportPreview
        state={state}
        storageFailed={storageFailed}
        setAnswers={setAnswers}
        setItem={setItem}
        onBack={() => {
          goTo("paso")
          scrollTop()
        }}
        onSave={save}
        onRestart={restart}
      />
    )
  }

  return (
    <Flow
      state={state}
      storageFailed={storageFailed}
      setAnswers={setAnswers}
      setItem={setItem}
      goTo={goTo}
      onSave={save}
      onFinish={() => {
        setState((s) => touch({ ...s, view: "preview" }))
        scrollTop()
      }}
    />
  )
}
