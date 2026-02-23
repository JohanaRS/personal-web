"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import {
  AREAS,
  CATEGORY_COLORS,
  type AreaResponse,
} from "./life-wheel-data"

/* ------------------------------------------------------------------ */
/*  Slider sub-component (reused pattern from category-controls)       */
/* ------------------------------------------------------------------ */

function ScoreSlider({
  value,
  color,
  onChange,
  id,
}: {
  value: number
  color: string
  onChange: (v: number) => void
  id: string
}) {
  const pct = value === 0 ? 0 : ((value - 1) / 9) * 100
  const trackBg =
    value === 0
      ? "oklch(0.92 0.01 85)"
      : `linear-gradient(to right, ${color} ${pct}%, oklch(0.92 0.01 85) ${pct}%)`

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            #${CSS.escape(id)}::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 20px;
              height: 20px;
              border-radius: 9999px;
              border: 2px solid white;
              box-shadow: 0 1px 4px rgba(0,0,0,0.25);
              cursor: pointer;
              background: ${value === 0 ? "oklch(0.7 0.01 85)" : color};
            }
            #${CSS.escape(id)}::-moz-range-thumb {
              width: 20px;
              height: 20px;
              border-radius: 9999px;
              border: 2px solid white;
              box-shadow: 0 1px 4px rgba(0,0,0,0.25);
              cursor: pointer;
              background: ${value === 0 ? "oklch(0.7 0.01 85)" : color};
            }
          `,
        }}
      />
      <input
        id={id}
        type="range"
        min={1}
        max={10}
        step={1}
        value={value || 1}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2.5 rounded-full appearance-none cursor-pointer"
        style={{ background: trackBg }}
        aria-label="Puntaje del area"
      />
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Assessment Wizard Component                                        */
/* ------------------------------------------------------------------ */

interface AssessmentWizardProps {
  responses: AreaResponse[]
  onUpdate: (responses: AreaResponse[]) => void
  onComplete: () => void
  onBack: () => void
}

export function AssessmentWizard({
  responses,
  onUpdate,
  onComplete,
  onBack,
}: AssessmentWizardProps) {
  const [currentArea, setCurrentArea] = useState(0)
  const [validationError, setValidationError] = useState("")

  const area = AREAS[currentArea]
  const color = CATEGORY_COLORS[currentArea]
  const resp = responses[currentArea]

  const updateAnswer = useCallback(
    (qIdx: number, text: string) => {
      const updated = [...responses]
      const newAnswers = [...updated[currentArea].answers]
      newAnswers[qIdx] = text
      updated[currentArea] = { ...updated[currentArea], answers: newAnswers }
      onUpdate(updated)
      setValidationError("")
    },
    [responses, currentArea, onUpdate]
  )

  const updateScore = useCallback(
    (score: number) => {
      const updated = [...responses]
      updated[currentArea] = { ...updated[currentArea], score }
      onUpdate(updated)
      setValidationError("")
    },
    [responses, currentArea, onUpdate]
  )

  const canAdvance = () => {
    if (resp.score === 0) return false
    const hasAtLeastOneAnswer = resp.answers.some((a) => a.trim().length > 0)
    return hasAtLeastOneAnswer
  }

  const handleNext = () => {
    if (!canAdvance()) {
      setValidationError(
        "Completa tu puntaje (1-10) y responde al menos una pregunta para continuar."
      )
      return
    }
    setValidationError("")
    if (currentArea < AREAS.length - 1) {
      setCurrentArea((prev) => prev + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      onComplete()
    }
  }

  const handlePrev = () => {
    setValidationError("")
    if (currentArea > 0) {
      setCurrentArea((prev) => prev - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      onBack()
    }
  }

  const progressPct = ((currentArea + 1) / AREAS.length) * 100

  return (
    <div className="flex flex-col gap-8 max-w-3xl mx-auto">
      {/* Progress bar */}
      <div>
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span className="font-medium">
            Area {currentArea + 1} de {AREAS.length}
          </span>
          <span>{Math.round(progressPct)}%</span>
        </div>
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPct}%`, backgroundColor: color }}
          />
        </div>
        {/* Step indicators */}
        <div className="flex items-center gap-1 mt-3">
          {AREAS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                if (i < currentArea || (i === currentArea)) {
                  setCurrentArea(i)
                  setValidationError("")
                }
              }}
              className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${
                i < currentArea
                  ? "bg-primary"
                  : i === currentArea
                    ? "bg-primary/60"
                    : "bg-secondary"
              }`}
              aria-label={`Ir a area ${i + 1}: ${AREAS[i].name}`}
              disabled={i > currentArea}
            />
          ))}
        </div>
      </div>

      {/* Area header */}
      <div className="flex items-center gap-3">
        <span
          className="w-4 h-4 rounded-full shrink-0"
          style={{ backgroundColor: color }}
          aria-hidden="true"
        />
        <h2 className="text-xl sm:text-2xl font-bold text-foreground text-balance">
          {area.name}
        </h2>
      </div>

      {/* Score selector */}
      <div className="bg-card border border-border rounded-xl p-6">
        <label className="block text-sm font-semibold text-foreground mb-2">
          Tu puntaje para esta area
        </label>
        <p className="text-xs text-muted-foreground mb-4">
          Del 1 (muy insatisfecho) al 10 (plenamente satisfecho)
        </p>

        <div className="flex items-center gap-4">
          <ScoreSlider
            value={resp.score}
            color={color}
            onChange={updateScore}
            id={`score-slider-${currentArea}`}
          />
          <span
            className="text-2xl font-bold tabular-nums min-w-[3ch] text-center"
            style={{ color: resp.score > 0 ? color : undefined }}
          >
            {resp.score > 0 ? resp.score : "—"}
          </span>
        </div>

        {/* Quick score buttons */}
        <div className="flex gap-1.5 mt-4">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => updateScore(n)}
              className={`flex-1 h-8 rounded-md text-xs font-semibold transition-all duration-200 ${
                resp.score === n
                  ? "text-primary-foreground shadow-sm"
                  : "bg-secondary text-muted-foreground hover:bg-primary/10"
              }`}
              style={
                resp.score === n
                  ? { backgroundColor: color, color: "white" }
                  : undefined
              }
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Questions */}
      <div className="flex flex-col gap-5">
        <p className="text-sm font-semibold text-foreground">
          Reflexiona sobre estas preguntas:
        </p>
        {area.questions.map((question, qIdx) => (
          <div key={qIdx} className="bg-card border border-border rounded-xl p-5">
            <label
              htmlFor={`q-${currentArea}-${qIdx}`}
              className="block text-sm text-foreground leading-relaxed mb-3"
            >
              {question}
            </label>
            <textarea
              id={`q-${currentArea}-${qIdx}`}
              value={resp.answers[qIdx] || ""}
              onChange={(e) => updateAnswer(qIdx, e.target.value)}
              rows={2}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none leading-relaxed"
              placeholder="Escribi tu reflexion aqui..."
            />
          </div>
        ))}
      </div>

      {/* Validation error */}
      {validationError && (
        <p className="text-sm text-destructive text-center bg-destructive/5 border border-destructive/20 rounded-lg px-4 py-3" role="alert">
          {validationError}
        </p>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={handlePrev}>
          <ArrowLeft className="w-4 h-4" />
          {currentArea === 0 ? "Volver al inicio" : "Anterior"}
        </Button>
        <Button onClick={handleNext}>
          {currentArea === AREAS.length - 1 ? "Ver resultados" : "Siguiente"}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
