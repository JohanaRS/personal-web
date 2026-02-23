"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Check, ChevronDown, ChevronUp } from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface CategoryData {
  name: string
  value: number
}

export interface DeepWorkData {
  selectedAreas: number[]
  // Step 2 answers per selected area index
  currentState: Record<number, string>
  desiredState: Record<number, string>
  beliefs: Record<number, string>
  action: Record<number, string>
  desiredScore: Record<number, number>
  // Step 3 closure
  closure: {
    takeaway: string
    emotion: string
    symbol: string
    reminder: string
  }
}

const DEEP_WORK_KEY = "rueda-deep-work-data"

function loadDeepWork(): DeepWorkData | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(DEEP_WORK_KEY)
    if (!raw) return null
    return JSON.parse(raw) as DeepWorkData
  } catch {
    return null
  }
}

function saveDeepWork(data: DeepWorkData) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(DEEP_WORK_KEY, JSON.stringify(data))
  } catch { /* ignore */ }
}

const EMPTY_DEEP_WORK: DeepWorkData = {
  selectedAreas: [],
  currentState: {},
  desiredState: {},
  beliefs: {},
  action: {},
  desiredScore: {},
  closure: { takeaway: "", emotion: "", symbol: "", reminder: "" },
}

/* ------------------------------------------------------------------ */
/*  Sub-step config                                                    */
/* ------------------------------------------------------------------ */

const AREA_SELECTION_QUESTIONS = [
  "Que areas tienen el puntaje mas bajo?",
  "Cual de ellas te genera mas malestar hoy?",
  "Que area, si la mejoraras, impactaria positivamente en otras?",
  "Cual te genera mas ganas de transformarla?",
]

function getCurrentStateQuestions(name: string) {
  return [
    `Que esta pasando hoy en ${name}?`,
    "Que te llevo a ponerle ese puntaje?",
    "Que cosas si estan funcionando?",
    "Que te molesta o limita?",
  ]
}

function getDesiredStateQuestions(name: string) {
  return [
    `A que puntaje te gustaria llegar en ${name}?`,
    "Que seria distinto si estuvieras ahi?",
    "Como lo notarias?",
    "Que verias, sentirias, oirias?",
  ]
}

function getBeliefsQuestions(_name: string) {
  return [
    `Que creencias tenes sobre esta area?`,
    "Que te esta impidiendo avanzar?",
    "Que sabes que podrias activar en vos para mejorarla?",
    "Que personas o apoyos podrian ayudarte?",
  ]
}

function getActionQuestions(_name: string) {
  return [
    "Que microaccion podrias tomar esta semana para mejorar esto?",
    "Que habito podrias sumar o modificar?",
    "Como vas a medir tu avance?",
    "Que podrias hacer si te trabas?",
  ]
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const CATEGORY_COLORS = [
  "oklch(0.55 0.12 145)",
  "oklch(0.55 0.12 200)",
  "oklch(0.55 0.12 260)",
  "oklch(0.55 0.10 310)",
  "oklch(0.55 0.12 350)",
  "oklch(0.60 0.15 30)",
  "oklch(0.60 0.15 85)",
  "oklch(0.50 0.10 125)",
]

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface DeepWorkProps {
  categories: CategoryData[]
  onComplete: () => void
  onBack: () => void
}

type DeepStep = "select" | "deep-check" | "closure" | "done"
type DeepSubStep = "current" | "desired" | "beliefs" | "action"
const DEEP_SUB_STEPS: DeepSubStep[] = ["current", "desired", "beliefs", "action"]
const DEEP_SUB_LABELS: Record<DeepSubStep, string> = {
  current: "Estado actual",
  desired: "Estado deseado",
  beliefs: "Creencias y recursos",
  action: "Accion",
}

export function DeepWork({ categories, onComplete, onBack }: DeepWorkProps) {
  const [data, setData] = useState<DeepWorkData>(EMPTY_DEEP_WORK)
  const [step, setStep] = useState<DeepStep>("select")
  const [currentAreaIdx, setCurrentAreaIdx] = useState(0)
  const [subStep, setSubStep] = useState<DeepSubStep>("current")
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const saved = loadDeepWork()
    if (saved) {
      setData(saved)
      // resume where they left off
      if (saved.closure.takeaway) {
        setStep("done")
      } else if (saved.selectedAreas.length > 0 && Object.keys(saved.currentState).length > 0) {
        setStep("deep-check")
      } else if (saved.selectedAreas.length > 0) {
        setStep("deep-check")
      }
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded) saveDeepWork(data)
  }, [data, loaded])

  const update = (partial: Partial<DeepWorkData>) => {
    setData((prev) => ({ ...prev, ...partial }))
  }

  /* Sorted by lowest score */
  const sortedByLowest = [...categories]
    .map((c, i) => ({ ...c, originalIndex: i }))
    .sort((a, b) => a.value - b.value)

  if (!loaded) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-pulse text-muted-foreground">Cargando...</div>
      </div>
    )
  }

  /* ----- STEP: Area Selection ----- */
  if (step === "select") {
    const toggleArea = (idx: number) => {
      const current = data.selectedAreas
      if (current.includes(idx)) {
        update({ selectedAreas: current.filter((a) => a !== idx) })
      } else if (current.length < 2) {
        update({ selectedAreas: [...current, idx] })
      }
    }

    return (
      <div className="flex flex-col gap-8">
        <StepHeader
          step={2}
          title="Eleccion del area a trabajar"
          description="Observa tu rueda y reflexiona sobre las siguientes preguntas antes de elegir:"
        />

        <div className="bg-card border border-border rounded-xl p-6">
          <ul className="flex flex-col gap-2 mb-6">
            {AREA_SELECTION_QUESTIONS.map((q, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                <span className="text-primary mt-0.5 shrink-0">&#8226;</span>
                {q}
              </li>
            ))}
          </ul>

          <p className="text-sm font-medium text-foreground mb-4">
            Elegi una (maximo dos) area para trabajar hoy:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sortedByLowest.map((cat) => {
              const selected = data.selectedAreas.includes(cat.originalIndex)
              return (
                <button
                  key={cat.originalIndex}
                  type="button"
                  onClick={() => toggleArea(cat.originalIndex)}
                  className={`flex items-center gap-3 rounded-lg border-2 px-4 py-3 text-left transition-all ${
                    selected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40 bg-background"
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: CATEGORY_COLORS[cat.originalIndex % CATEGORY_COLORS.length] }}
                  />
                  <span className="flex-1 text-sm font-medium text-foreground truncate">{cat.name}</span>
                  <span className="text-sm font-bold tabular-nums text-primary">{cat.value}</span>
                  {selected && <Check className="w-4 h-4 text-primary shrink-0" />}
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
            Volver a la rueda
          </Button>
          <Button
            onClick={() => {
              setCurrentAreaIdx(0)
              setSubStep("current")
              setStep("deep-check")
            }}
            disabled={data.selectedAreas.length === 0}
          >
            Continuar
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    )
  }

  /* ----- STEP: Deep Check ----- */
  if (step === "deep-check") {
    const areaIdx = data.selectedAreas[currentAreaIdx]
    const area = categories[areaIdx]
    if (!area) {
      setStep("select")
      return null
    }

    const questions =
      subStep === "current"
        ? getCurrentStateQuestions(area.name)
        : subStep === "desired"
          ? getDesiredStateQuestions(area.name)
          : subStep === "beliefs"
            ? getBeliefsQuestions(area.name)
            : getActionQuestions(area.name)

    const dataKey =
      subStep === "current"
        ? "currentState"
        : subStep === "desired"
          ? "desiredState"
          : subStep === "beliefs"
            ? "beliefs"
            : "action"

    const currentValue = data[dataKey][areaIdx] || ""

    const subStepIndex = DEEP_SUB_STEPS.indexOf(subStep)
    const totalSubSteps = DEEP_SUB_STEPS.length
    const isLastArea = currentAreaIdx >= data.selectedAreas.length - 1
    const isLastSubStep = subStepIndex === totalSubSteps - 1

    const handleNext = () => {
      if (!isLastSubStep) {
        setSubStep(DEEP_SUB_STEPS[subStepIndex + 1])
      } else if (!isLastArea) {
        setCurrentAreaIdx((prev) => prev + 1)
        setSubStep("current")
      } else {
        setStep("closure")
      }
    }

    const handlePrev = () => {
      if (subStepIndex > 0) {
        setSubStep(DEEP_SUB_STEPS[subStepIndex - 1])
      } else if (currentAreaIdx > 0) {
        setCurrentAreaIdx((prev) => prev - 1)
        setSubStep("action")
      } else {
        setStep("select")
      }
    }

    const progressTotal = data.selectedAreas.length * totalSubSteps
    const progressCurrent = currentAreaIdx * totalSubSteps + subStepIndex + 1

    return (
      <div className="flex flex-col gap-8">
        <StepHeader
          step={3}
          title="Checkeo profundo"
          description={`Trabajando en: ${area.name} (${area.value}/10)`}
        />

        {/* Progress */}
        <div className="w-full">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>{DEEP_SUB_LABELS[subStep]}</span>
            <span>
              {progressCurrent} / {progressTotal}
            </span>
          </div>
          <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${(progressCurrent / progressTotal) * 100}%` }}
            />
          </div>
        </div>

        {/* Sub-step tabs */}
        <div className="flex gap-1 flex-wrap">
          {DEEP_SUB_STEPS.map((ss, idx) => (
            <button
              key={ss}
              type="button"
              onClick={() => setSubStep(ss)}
              className={`px-3 py-1.5 text-xs rounded-md font-medium transition-colors ${
                ss === subStep
                  ? "bg-primary text-primary-foreground"
                  : idx <= subStepIndex
                    ? "bg-primary/10 text-primary"
                    : "bg-secondary text-muted-foreground"
              }`}
            >
              {DEEP_SUB_LABELS[ss]}
            </button>
          ))}
        </div>

        {/* Area tag */}
        <div className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full shrink-0"
            style={{ backgroundColor: CATEGORY_COLORS[areaIdx % CATEGORY_COLORS.length] }}
          />
          <span className="text-sm font-semibold text-foreground">{area.name}</span>
          <span className="text-xs text-muted-foreground">Puntaje actual: {area.value}/10</span>
        </div>

        {/* Questions */}
        <div className="bg-card border border-border rounded-xl p-6">
          <p className="text-sm font-medium text-foreground mb-3">{DEEP_SUB_LABELS[subStep]}</p>
          <ul className="flex flex-col gap-1.5 mb-5">
            {questions.map((q, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                <span className="text-primary mt-0.5 shrink-0">&#8226;</span>
                {q}
              </li>
            ))}
          </ul>

          <textarea
            value={currentValue}
            onChange={(e) =>
              update({ [dataKey]: { ...data[dataKey], [areaIdx]: e.target.value } })
            }
            rows={5}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none leading-relaxed"
            placeholder="Escribi tu reflexion aqui..."
          />

          {/* Desired score selector in desired state sub-step */}
          {subStep === "desired" && (
            <div className="mt-4 flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Puntaje deseado:</span>
              <div className="flex gap-1.5">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() =>
                      update({ desiredScore: { ...data.desiredScore, [areaIdx]: n } })
                    }
                    className={`w-7 h-7 rounded-md text-xs font-semibold transition-colors ${
                      (data.desiredScore[areaIdx] || 0) === n
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:bg-primary/10"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={handlePrev}>
            <ArrowLeft className="w-4 h-4" />
            Anterior
          </Button>
          <Button onClick={handleNext} disabled={!currentValue.trim()}>
            {isLastSubStep && isLastArea ? "Ir al cierre" : "Siguiente"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    )
  }

  /* ----- STEP: Closure ----- */
  if (step === "closure") {
    const closureQuestions = [
      { key: "takeaway" as const, label: "Que te llevas de este ejercicio?" },
      { key: "emotion" as const, label: "Que emocion o mensaje interno aparecio?" },
      { key: "symbol" as const, label: "Con que palabra, imagen o simbolo cerrarias este momento?" },
      { key: "reminder" as const, label: "Queres escribirte un recordatorio, frase o anclaje para sostener esto?" },
    ]

    const allFilled = closureQuestions.every((q) => data.closure[q.key].trim() !== "")

    return (
      <div className="flex flex-col gap-8">
        <StepHeader
          step={4}
          title="Cierre reflexivo"
          description="Tomate un momento para cerrar este proceso con presencia."
        />

        <div className="flex flex-col gap-6">
          {closureQuestions.map((q) => (
            <div key={q.key} className="bg-card border border-border rounded-xl p-6">
              <label className="block text-sm font-medium text-foreground mb-3">
                {q.label}
              </label>
              <textarea
                value={data.closure[q.key]}
                onChange={(e) =>
                  update({
                    closure: { ...data.closure, [q.key]: e.target.value },
                  })
                }
                rows={3}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none leading-relaxed"
                placeholder="Escribi tu reflexion aqui..."
              />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => {
              const lastAreaIdx = data.selectedAreas.length - 1
              setCurrentAreaIdx(lastAreaIdx)
              setSubStep("action")
              setStep("deep-check")
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            Anterior
          </Button>
          <Button
            onClick={() => {
              setStep("done")
              onComplete()
            }}
            disabled={!allFilled}
          >
            Finalizar proceso
            <Check className="w-4 h-4" />
          </Button>
        </div>
      </div>
    )
  }

  /* ----- STEP: Done (summary) ----- */
  return <DeepWorkSummary data={data} categories={categories} onRestart={() => {
    setData(EMPTY_DEEP_WORK)
    setStep("select")
    localStorage.removeItem(DEEP_WORK_KEY)
  }} />
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function StepHeader({ step, title, description }: { step: number; title: string; description: string }) {
  return (
    <div className="text-center">
      <span className="inline-block text-xs font-semibold text-primary bg-primary/10 rounded-full px-3 py-1 mb-3">
        Paso {step}
      </span>
      <h2 className="text-2xl font-bold text-foreground text-balance">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed text-pretty">{description}</p>
    </div>
  )
}

function DeepWorkSummary({
  data,
  categories,
  onRestart,
}: {
  data: DeepWorkData
  categories: CategoryData[]
  onRestart: () => void
}) {
  const [expandedAreas, setExpandedAreas] = useState<Record<number, boolean>>({})

  const toggleExpand = (idx: number) => {
    setExpandedAreas((prev) => ({ ...prev, [idx]: !prev[idx] }))
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <span className="inline-block text-xs font-semibold text-primary bg-primary/10 rounded-full px-3 py-1 mb-3">
          Proceso completado
        </span>
        <h2 className="text-2xl font-bold text-foreground text-balance">
          Resumen de tu trabajo profundo
        </h2>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed text-pretty">
          Aqui tenes un resumen de todo lo que reflexionaste. Podes volver a este material cuando lo necesites.
        </p>
      </div>

      {/* Area summaries */}
      {data.selectedAreas.map((areaIdx) => {
        const area = categories[areaIdx]
        if (!area) return null
        const expanded = expandedAreas[areaIdx] ?? true

        return (
          <div key={areaIdx} className="bg-card border border-border rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => toggleExpand(areaIdx)}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: CATEGORY_COLORS[areaIdx % CATEGORY_COLORS.length] }}
                />
                <span className="font-semibold text-foreground">{area.name}</span>
                <span className="text-sm text-muted-foreground">
                  {area.value}/10
                  {data.desiredScore[areaIdx] ? ` → ${data.desiredScore[areaIdx]}/10` : ""}
                </span>
              </div>
              {expanded ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            {expanded && (
              <div className="px-6 pb-6 flex flex-col gap-4">
                <SummaryBlock label="Estado actual" text={data.currentState[areaIdx]} />
                <SummaryBlock label="Estado deseado" text={data.desiredState[areaIdx]} />
                <SummaryBlock label="Creencias y recursos" text={data.beliefs[areaIdx]} />
                <SummaryBlock label="Accion" text={data.action[areaIdx]} />
              </div>
            )}
          </div>
        )
      })}

      {/* Closure */}
      {data.closure.takeaway && (
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-base font-semibold text-foreground mb-4">Cierre reflexivo</h3>
          <div className="flex flex-col gap-4">
            <SummaryBlock label="Lo que me llevo" text={data.closure.takeaway} />
            <SummaryBlock label="Emocion o mensaje" text={data.closure.emotion} />
            <SummaryBlock label="Palabra o simbolo" text={data.closure.symbol} />
            {data.closure.reminder && (
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <p className="text-xs font-medium text-primary mb-1">Mi recordatorio</p>
                <p className="text-sm text-foreground leading-relaxed italic">
                  {`"${data.closure.reminder}"`}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <Button variant="outline" onClick={onRestart}>
          Reiniciar trabajo profundo
        </Button>
        <Button asChild>
          <a
            href="https://calendly.com/johanapaolarios/coaching-con-joha"
            target="_blank"
            rel="noopener noreferrer"
          >
            Agendar sesion de coaching
          </a>
        </Button>
      </div>
    </div>
  )
}

function SummaryBlock({ label, text }: { label: string; text?: string }) {
  if (!text) return null
  return (
    <div>
      <p className="text-xs font-medium text-muted-foreground mb-1">{label}</p>
      <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{text}</p>
    </div>
  )
}
