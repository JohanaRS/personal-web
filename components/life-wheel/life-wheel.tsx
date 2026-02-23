"use client"

import { useState, useEffect, useCallback } from "react"
import { AssessmentWizard } from "./assessment-wizard"
import { ResultsView } from "./results-view"
import { DeepWork } from "./deep-work"
import { generatePdf } from "./pdf-download"
import {
  loadAssessment,
  saveAssessment,
  clearAssessment,
  emptyResponses,
  emptyDeepWork,
  type AssessmentState,
  type AreaResponse,
  type DeepWorkData,
} from "./life-wheel-data"

/* ------------------------------------------------------------------ */
/*  Phase management                                                   */
/* ------------------------------------------------------------------ */

type Phase = "intro" | "assessment" | "results" | "deep-work"

function resolvePhase(state: AssessmentState): Phase {
  if (state.completedAt) return "results"
  if (state.responses.some((r) => r.score > 0)) return "assessment"
  return "intro"
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function LifeWheel() {
  const [responses, setResponses] = useState<AreaResponse[]>(emptyResponses())
  const [deepWork, setDeepWork] = useState<DeepWorkData>(emptyDeepWork())
  const [phase, setPhase] = useState<Phase>("intro")
  const [loaded, setLoaded] = useState(false)

  // Load from localStorage
  useEffect(() => {
    const saved = loadAssessment()
    if (saved) {
      setResponses(saved.responses)
      if (saved.deepWork) setDeepWork(saved.deepWork)
      setPhase(resolvePhase(saved))
    }
    setLoaded(true)
  }, [])

  // Persist
  const persist = useCallback(
    (r: AreaResponse[], dw: DeepWorkData, completedAt: string | null) => {
      saveAssessment({ responses: r, deepWork: dw, completedAt })
    },
    []
  )

  useEffect(() => {
    if (!loaded) return
    const completedAt =
      phase === "results" || phase === "deep-work"
        ? new Date().toISOString()
        : null
    persist(responses, deepWork, completedAt)
  }, [responses, deepWork, phase, loaded, persist])

  const handleUpdateResponses = useCallback((newResponses: AreaResponse[]) => {
    setResponses(newResponses)
  }, [])

  const handleUpdateDeepWork = useCallback((newDW: DeepWorkData) => {
    setDeepWork(newDW)
  }, [])

  const handleReset = useCallback(() => {
    setResponses(emptyResponses())
    setDeepWork(emptyDeepWork())
    setPhase("intro")
    clearAssessment()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const handleDownloadPdf = useCallback(async () => {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement | null
    await generatePdf({
      responses,
      deepWork: deepWork.selectedAreas.length > 0 ? deepWork : null,
      canvasElement: canvas,
    })
  }, [responses, deepWork])

  if (!loaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-muted-foreground">Cargando...</div>
      </div>
    )
  }

  /* ----- INTRO ----- */
  if (phase === "intro") {
    return <IntroView onStart={() => setPhase("assessment")} />
  }

  /* ----- ASSESSMENT WIZARD ----- */
  if (phase === "assessment") {
    return (
      <AssessmentWizard
        responses={responses}
        onUpdate={handleUpdateResponses}
        onComplete={() => {
          setPhase("results")
          window.scrollTo({ top: 0, behavior: "smooth" })
        }}
        onBack={() => setPhase("intro")}
      />
    )
  }

  /* ----- RESULTS ----- */
  if (phase === "results") {
    return (
      <ResultsView
        responses={responses}
        onContinueWorking={() => {
          setPhase("deep-work")
          window.scrollTo({ top: 0, behavior: "smooth" })
        }}
        onRestart={handleReset}
        onDownloadPdf={handleDownloadPdf}
      />
    )
  }

  /* ----- DEEP WORK ----- */
  return (
    <DeepWork
      responses={responses}
      deepWork={deepWork}
      onUpdate={handleUpdateDeepWork}
      onComplete={() => {}}
      onBack={() => {
        setPhase("results")
        window.scrollTo({ top: 0, behavior: "smooth" })
      }}
      onDownloadPdf={handleDownloadPdf}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Intro View                                                         */
/* ------------------------------------------------------------------ */

function IntroView({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto text-center">
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-balance">
          {"\u00bfC\u00f3mo funciona?"}
        </h2>
        <p className="text-muted-foreground leading-relaxed text-pretty">
          La Rueda de la Vida es una herramienta de coaching que te invita a evaluar
          8 \u00e1reas fundamentales de tu vida. Para cada \u00e1rea vas a reflexionar
          con preguntas gu\u00eda y asignar un puntaje del 1 al 10.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-left">
        {[
          {
            step: "1",
            title: "Reflexion\u00e1",
            desc: "Responder\u00e1s preguntas gu\u00eda para cada una de las 8 \u00e1reas de tu vida.",
          },
          {
            step: "2",
            title: "Evalu\u00e1",
            desc: "Asignar\u00e1s un puntaje del 1 al 10 seg\u00fan c\u00f3mo te sent\u00eds hoy en cada \u00e1rea.",
          },
          {
            step: "3",
            title: "Visualiz\u00e1",
            desc: "Ver\u00e1s tu rueda completa con las \u00e1reas m\u00e1s fuertes y las que necesitan atenci\u00f3n.",
          },
          {
            step: "4",
            title: "Reflexion\u00e1",
            desc: "Podr\u00e1s elegir \u00e1reas para reflexionar en profundidad y dise\u00f1ar acciones concretas.",
          },
        ].map((item) => (
          <div
            key={item.step}
            className="flex gap-3 bg-card border border-border rounded-xl p-4"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
              {item.step}
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        Tiempo estimado: 15 - 25 minutos. Tu progreso se guarda autom\u00e1ticamente.
      </p>

      <button
        type="button"
        onClick={onStart}
        className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all duration-500 ease-out h-12 px-8 bg-gradient-to-br from-primary via-primary to-[oklch(0.35_0.06_125)] text-primary-foreground hover:from-[oklch(0.35_0.06_125)] hover:via-primary hover:to-[oklch(0.55_0.10_125)] hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(85,107,47,0.4)] active:scale-[0.98] cursor-pointer"
      >
        Hacer mi Rueda de la Vida
      </button>
    </div>
  )
}
