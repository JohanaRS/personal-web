"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Check, ChevronDown, ChevronUp, Download } from "lucide-react"
import {
  AREAS,
  CATEGORY_COLORS,
  type AreaResponse,
  type DeepWorkData,
  type DeepWorkAreaData,
  emptyDeepWorkArea,
} from "./life-wheel-data"

/* ------------------------------------------------------------------ */
/*  Sub-step config for the deep check                                 */
/* ------------------------------------------------------------------ */

const AREA_SELECTION_QUESTIONS = [
  "¿Qué áreas tienen el puntaje más bajo?",
  "¿Cuál de ellas te genera más malestar hoy?",
  "¿Qué área, si la mejoraras, impactaría positivamente en otras?",
  "¿Cuál te genera más ganas de transformarla?",
]

function getCurrentStateQuestions(name: string) {
  return [
    `¿Qué está pasando hoy en ${name}?`,
    "¿Qué te llevó a ponerle ese puntaje?",
    "¿Qué cosas sí están funcionando?",
    "¿Qué te molesta o limita?",
  ]
}

function getDesiredStateQuestions(name: string) {
  return [
    `¿A qué puntaje te gustaría llegar en ${name}?`,
    "¿Qué sería distinto si estuvieras ahí?",
    "¿Cómo lo notarías?",
    "¿Qué verías, sentirías, oirías?",
  ]
}

function getBeliefsQuestions() {
  return [
    "¿Qué creencias tenés sobre esta área?",
    "¿Qué te está impidiendo avanzar?",
    "¿Qué sabés que podrías activar en vos para mejorarla?",
    "¿Qué personas o apoyos podrían ayudarte?",
  ]
}

function getActionQuestions() {
  return [
    "¿Qué microacción podrías tomar esta semana para mejorar esto?",
    "¿Qué hábito podrías sumar o modificar?",
    "¿Cómo vas a medir tu avance?",
    "¿Qué podrías hacer si te trabás?",
  ]
}

type DeepStep = "select" | "deep-check" | "closure" | "done"
type DeepSubStep = "current" | "desired" | "beliefs" | "action"
const DEEP_SUB_STEPS: DeepSubStep[] = ["current", "desired", "beliefs", "action"]
const DEEP_SUB_LABELS: Record<DeepSubStep, string> = {
  current: "Estado actual",
  desired: "Estado deseado",
  beliefs: "Creencias y recursos",
  action: "Acción",
}

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface DeepWorkProps {
  responses: AreaResponse[]
  deepWork: DeepWorkData
  onUpdate: (data: DeepWorkData) => void
  onComplete: () => void
  onBack: () => void
  onDownloadPdf: () => void
}

export function DeepWork({
  responses,
  deepWork,
  onUpdate,
  onComplete,
  onBack,
  onDownloadPdf,
}: DeepWorkProps) {
  const [step, setStep] = useState<DeepStep>(() => {
    if (deepWork.closure.takeaway) return "done"
    if (deepWork.selectedAreas.length > 0 && Object.keys(deepWork.areas).length > 0)
      return "deep-check"
    return "select"
  })
  const [currentAreaIdx, setCurrentAreaIdx] = useState(0)
  const [subStep, setSubStep] = useState<DeepSubStep>("current")

  const update = (partial: Partial<DeepWorkData>) => {
    onUpdate({ ...deepWork, ...partial })
  }

  const updateArea = (areaIdx: number, partial: Partial<DeepWorkAreaData>) => {
    const existing = deepWork.areas[areaIdx] || emptyDeepWorkArea()
    update({
      areas: {
        ...deepWork.areas,
        [areaIdx]: { ...existing, ...partial },
      },
    })
  }

  /* Sorted by lowest score */
  const sortedByLowest = [...responses]
    .map((r, i) => ({ score: r.score, originalIndex: i, name: AREAS[i].name }))
    .sort((a, b) => a.score - b.score)

  /* ----- STEP: Area Selection ----- */
  if (step === "select") {
    const toggleArea = (idx: number) => {
      const current = deepWork.selectedAreas
      if (current.includes(idx)) {
        update({ selectedAreas: current.filter((a) => a !== idx) })
      } else if (current.length < 2) {
        update({ selectedAreas: [...current, idx] })
      }
    }

    return (
      <div className="flex flex-col gap-8 max-w-3xl mx-auto">
        <StepHeader
          step={2}
          title="Elección del área a trabajar"
          description="Observá tu rueda y reflexioná sobre las siguientes preguntas antes de elegir:"
        />

        <div className="bg-card border border-border rounded-xl p-6">
          <ul className="flex flex-col gap-2 mb-6">
            {AREA_SELECTION_QUESTIONS.map((q, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed"
              >
                <span className="text-primary mt-0.5 shrink-0">{"\u2022"}</span>
                {q}
              </li>
            ))}
          </ul>

          <p className="text-sm font-medium text-foreground mb-4">
            Elegí una (máximo dos) área para trabajar hoy:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sortedByLowest.map((cat) => {
              const selected = deepWork.selectedAreas.includes(cat.originalIndex)
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
                    style={{
                      backgroundColor: CATEGORY_COLORS[cat.originalIndex],
                    }}
                  />
                  <span className="flex-1 text-sm font-medium text-foreground truncate">
                    {cat.name}
                  </span>
                  <span className="text-sm font-bold tabular-nums text-primary">
                    {cat.score}
                  </span>
                  {selected && <Check className="w-4 h-4 text-primary shrink-0" />}
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
            Volver a resultados
          </Button>
          <Button
            onClick={() => {
              const newAreas = { ...deepWork.areas }
              deepWork.selectedAreas.forEach((idx) => {
                if (!newAreas[idx]) newAreas[idx] = emptyDeepWorkArea()
              })
              update({ areas: newAreas })
              setCurrentAreaIdx(0)
              setSubStep("current")
              setStep("deep-check")
            }}
            disabled={deepWork.selectedAreas.length === 0}
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
    const areaIdx = deepWork.selectedAreas[currentAreaIdx]
    const area = AREAS[areaIdx]
    const areaData = deepWork.areas[areaIdx] || emptyDeepWorkArea()
    const areaScore = responses[areaIdx]?.score ?? 0

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
            ? getBeliefsQuestions()
            : getActionQuestions()

    const fieldKey: keyof DeepWorkAreaData =
      subStep === "current"
        ? "currentState"
        : subStep === "desired"
          ? "desiredState"
          : subStep === "beliefs"
            ? "beliefs"
            : "action"

    const currentValue = (areaData[fieldKey] as string) || ""

    const subStepIndex = DEEP_SUB_STEPS.indexOf(subStep)
    const totalSubSteps = DEEP_SUB_STEPS.length
    const isLastArea = currentAreaIdx >= deepWork.selectedAreas.length - 1
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
      window.scrollTo({ top: 0, behavior: "smooth" })
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
      window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const progressTotal = deepWork.selectedAreas.length * totalSubSteps
    const progressCurrent = currentAreaIdx * totalSubSteps + subStepIndex + 1

    return (
      <div className="flex flex-col gap-8 max-w-3xl mx-auto">
        <StepHeader
          step={3}
          title="Reflexión sobre mi rueda"
          description={`Trabajando en: ${area.name} (${areaScore}/10)`}
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
            style={{ backgroundColor: CATEGORY_COLORS[areaIdx] }}
          />
          <span className="text-sm font-semibold text-foreground">{area.name}</span>
          <span className="text-xs text-muted-foreground">
            Puntaje actual: {areaScore}/10
          </span>
        </div>

        {/* Questions */}
        <div className="bg-card border border-border rounded-xl p-6">
          <p className="text-sm font-medium text-foreground mb-3">
            {DEEP_SUB_LABELS[subStep]}
          </p>
          <ul className="flex flex-col gap-1.5 mb-5">
            {questions.map((q, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed"
              >
                <span className="text-primary mt-0.5 shrink-0">{"\u2022"}</span>
                {q}
              </li>
            ))}
          </ul>

          <textarea
            value={currentValue}
            onChange={(e) => updateArea(areaIdx, { [fieldKey]: e.target.value })}
            rows={5}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none leading-relaxed"
            placeholder="Escribí tu reflexión aquí..."
          />

          {/* Desired score selector in desired state sub-step */}
          {subStep === "desired" && (
            <div className="mt-4 flex items-center gap-3 flex-wrap">
              <span className="text-sm text-muted-foreground">Puntaje deseado:</span>
              <div className="flex gap-1.5 flex-wrap">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => updateArea(areaIdx, { desiredScore: n })}
                    className={`w-7 h-7 rounded-md text-xs font-semibold transition-colors ${
                      areaData.desiredScore === n
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
      { key: "takeaway" as const, label: "¿Qué te llevás de este ejercicio?" },
      {
        key: "emotion" as const,
        label: "¿Qué emoción o mensaje interno apareció?",
      },
      {
        key: "symbol" as const,
        label: "¿Con qué palabra, imagen o símbolo cerrarías este momento?",
      },
      {
        key: "reminder" as const,
        label:
          "¿Querés escribirte un recordatorio, frase o anclaje para sostener esto?",
      },
    ]

    const allFilled = closureQuestions.every(
      (q) => deepWork.closure[q.key].trim() !== ""
    )

    return (
      <div className="flex flex-col gap-8 max-w-3xl mx-auto">
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
                value={deepWork.closure[q.key]}
                onChange={(e) =>
                  update({
                    closure: { ...deepWork.closure, [q.key]: e.target.value },
                  })
                }
                rows={3}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none leading-relaxed"
                placeholder="Escribí tu reflexión aquí..."
              />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => {
              const lastAreaIdx = deepWork.selectedAreas.length - 1
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
  return (
    <DeepWorkSummary
      data={deepWork}
      responses={responses}
      onDownloadPdf={onDownloadPdf}
      onRestart={() => {
        update({
          selectedAreas: [],
          areas: {},
          closure: { takeaway: "", emotion: "", symbol: "", reminder: "" },
        })
        setStep("select")
      }}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function StepHeader({
  step,
  title,
  description,
}: {
  step: number
  title: string
  description: string
}) {
  return (
    <div className="text-center">
      <span className="inline-block text-xs font-semibold text-primary bg-primary/10 rounded-full px-3 py-1 mb-3">
        Paso {step}
      </span>
      <h2 className="text-2xl font-bold text-foreground text-balance">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed text-pretty">
        {description}
      </p>
    </div>
  )
}

function DeepWorkSummary({
  data,
  responses,
  onDownloadPdf,
  onRestart,
}: {
  data: DeepWorkData
  responses: AreaResponse[]
  onDownloadPdf: () => void
  onRestart: () => void
}) {
  const [expandedAreas, setExpandedAreas] = useState<Record<number, boolean>>({})

  const toggleExpand = (idx: number) => {
    setExpandedAreas((prev) => ({ ...prev, [idx]: !prev[idx] }))
  }

  return (
    <div className="flex flex-col gap-8 max-w-3xl mx-auto">
      <div className="text-center">
        <span className="inline-block text-xs font-semibold text-primary bg-primary/10 rounded-full px-3 py-1 mb-3">
          Proceso completado
        </span>
        <h2 className="text-2xl font-bold text-foreground text-balance">
          Resumen de tu reflexión
        </h2>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed text-pretty">
          Aquí tenés un resumen de toda tu reflexión. Podés volver a
          este material cuando lo necesites o descargarlo como PDF.
        </p>
      </div>

      {/* Area summaries */}
      {data.selectedAreas.map((areaIdx) => {
        const areaData = data.areas[areaIdx]
        if (!areaData) return null
        const score = responses[areaIdx]?.score ?? 0
        const expanded = expandedAreas[areaIdx] ?? true

        return (
          <div
            key={areaIdx}
            className="bg-card border border-border rounded-xl overflow-hidden"
          >
            <button
              type="button"
              onClick={() => toggleExpand(areaIdx)}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: CATEGORY_COLORS[areaIdx] }}
                />
                <span className="font-semibold text-foreground">
                  {AREAS[areaIdx].name}
                </span>
                <span className="text-sm text-muted-foreground">
                  {score}/10
                  {areaData.desiredScore > 0 &&
                    ` \u2192 Deseado: ${areaData.desiredScore}/10`}
                </span>
              </div>
              {expanded ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
              )}
            </button>
            {expanded && (
              <div className="px-6 pb-6 flex flex-col gap-4 border-t border-border pt-4">
                {[
                  { label: "Estado actual", text: areaData.currentState },
                  { label: "Estado deseado", text: areaData.desiredState },
                  { label: "Creencias y recursos", text: areaData.beliefs },
                  { label: "Acción", text: areaData.action },
                ]
                  .filter((s) => s.text?.trim())
                  .map((s) => (
                    <div key={s.label}>
                      <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
                        {s.label}
                      </p>
                      <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                        {s.text}
                      </p>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )
      })}

      {/* Closure */}
      {data.closure.takeaway && (
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">
            Cierre reflexivo
          </h3>
          <div className="flex flex-col gap-3">
            {[
              { label: "Lo que me llevo", text: data.closure.takeaway },
              { label: "Emoción o mensaje", text: data.closure.emotion },
              { label: "Palabra o símbolo", text: data.closure.symbol },
              { label: "Mi recordatorio", text: data.closure.reminder },
            ]
              .filter((s) => s.text?.trim())
              .map((s) => (
                <div key={s.label}>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
                    {s.label}
                  </p>
                  <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                    {s.text}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Closing phrase */}
      <div className="text-center py-2">
        <p className="text-sm italic text-muted-foreground">
          La claridad es el primer paso hacia el cambio.
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <Button variant="outline" onClick={onRestart}>
          Reiniciar reflexión
        </Button>
        <Button variant="secondary" onClick={onDownloadPdf}>
          <Download className="w-4 h-4" />
          Descargar PDF
        </Button>
        <Button asChild>
          <a
            href="https://calendly.com/johanapaolarios/coaching-con-joha"
            target="_blank"
            rel="noopener noreferrer"
          >
            Agendar sesión de coaching
          </a>
        </Button>
      </div>
    </div>
  )
}
