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

  /* ----- DEEP WORK (Reflexión sobre mi rueda) ----- */
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
          Punto de partida
        </h2>
        <p className="text-lg text-muted-foreground font-medium">Empezá por acá</p>
      </div>

      <div className="text-muted-foreground text-sm sm:text-base leading-relaxed text-left space-y-3 max-w-xl">
        <p className="font-medium text-foreground text-pretty">
          La Rueda de la Vida es una herramienta simple, pero muy potente.
        </p>
        <p className="text-pretty">
          Te permite visualizar cómo estás hoy en las áreas que sostienen tu vida: salud, vínculos, trabajo, finanzas, crecimiento, propósito y más.
        </p>
        <p className="text-pretty">
          Cuando ponemos algo en forma visual, el cerebro lo procesa distinto. Deja de ser una sensación difusa y se convierte en información concreta.
        </p>
        <p className="text-pretty">
          {'Muchas veces decimos "estoy bien" o "no estoy tan bien", pero no sabemos exactamente en qué. La rueda ordena eso.'}
        </p>
        <p className="text-pretty">
          Desde la neurociencia, sabemos que el cerebro necesita claridad para tomar decisiones. Cuando identificás qué áreas están fuertes y cuáles están más bajas, activás algo clave: conciencia.
        </p>
        <p className="font-medium text-foreground text-pretty">
          Y la conciencia es el primer paso para el cambio.
        </p>
        <p className="text-pretty">
          No es un examen. No es un juicio. Es una fotografía honesta de tu momento actual.
        </p>
        <p className="text-pretty">
          Y cuando sabés dónde estás, podés elegir con más intención hacia dónde querés ir.
        </p>
        <p className="font-medium text-foreground text-pretty">
          Si querés empezar a ordenar tu presente, esta es una muy buena manera.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-left">
        {[
          {
            step: "1",
            title: "Reflexioná",
            desc: "Responderás preguntas guía para cada una de las 8 áreas de tu vida.",
          },
          {
            step: "2",
            title: "Evaluá",
            desc: "Asignarás un puntaje del 1 al 10 según cómo te sentís hoy en cada área.",
          },
          {
            step: "3",
            title: "Visualizá",
            desc: "Verás tu rueda completa con las áreas más fuertes y las que necesitan atención.",
          },
          {
            step: "4",
            title: "Profundizá",
            desc: "Podrás elegir áreas para reflexionar en profundidad y diseñar acciones concretas.",
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
        Tiempo estimado: 15 - 25 minutos. Tu progreso se guarda automáticamente.
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
