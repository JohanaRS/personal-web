"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { WheelChart } from "./wheel-chart"
import {
  ArrowRight,
  RotateCcw,
  Download,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import {
  AREAS,
  CATEGORY_COLORS,
  type AreaResponse,
} from "./life-wheel-data"

/* ------------------------------------------------------------------ */
/*  Results View                                                       */
/* ------------------------------------------------------------------ */

interface ResultsViewProps {
  responses: AreaResponse[]
  onContinueWorking: () => void
  onRestart: () => void
  onDownloadPdf: () => void
}

export function ResultsView({
  responses,
  onContinueWorking,
  onRestart,
  onDownloadPdf,
}: ResultsViewProps) {
  const [expandedAreas, setExpandedAreas] = useState<Record<number, boolean>>({})

  const toggleExpand = (idx: number) => {
    setExpandedAreas((prev) => ({ ...prev, [idx]: !prev[idx] }))
  }

  /* Build sorted scores */
  const scored = responses.map((r, i) => ({ index: i, score: r.score, name: AREAS[i].name }))
  const sortedAsc = [...scored].sort((a, b) => a.score - b.score)
  const lowest2 = sortedAsc.slice(0, 2)
  const highest2 = sortedAsc.slice(-2).reverse()
  const average = (scored.reduce((s, c) => s + c.score, 0) / scored.length).toFixed(1)

  /* Wheel chart data */
  const chartCategories = responses.map((r, i) => ({
    name: AREAS[i].name,
    value: r.score,
  }))

  return (
    <div className="flex flex-col gap-10" id="results-container">
      {/* Header */}
      <div className="text-center">
        <span className="inline-block text-xs font-semibold text-primary bg-primary/10 rounded-full px-3 py-1 mb-3">
          Resultados
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-balance">
          Tu Rueda de la Vida
        </h2>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed text-pretty max-w-xl mx-auto">
          Este es el reflejo de cómo te sentís hoy en cada área. Observá tu rueda con curiosidad y sin juicio.
        </p>
      </div>

      {/* Average */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-5 py-3">
          <span className="text-sm text-muted-foreground">Promedio general</span>
          <span className="text-2xl font-bold text-primary">{average}</span>
          <span className="text-sm text-muted-foreground">/ 10</span>
        </div>
      </div>

      {/* Chart */}
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <WheelChart categories={chartCategories} />
        </div>
      </div>

      {/* Highlights: lowest 2, highest 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto w-full">
        {/* Lowest 2 */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <TrendingDown className="w-4 h-4 text-destructive" />
            <h3 className="text-sm font-semibold text-foreground">
              Áreas con menor puntaje
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            {lowest2.map((item) => (
              <div key={item.index} className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: CATEGORY_COLORS[item.index] }}
                />
                <span className="text-sm text-foreground flex-1 truncate">
                  {item.name}
                </span>
                <span className="text-sm font-bold tabular-nums text-destructive">
                  {item.score}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Highest 2 */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">
              Áreas con mayor puntaje
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            {highest2.map((item) => (
              <div key={item.index} className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: CATEGORY_COLORS[item.index] }}
                />
                <span className="text-sm text-foreground flex-1 truncate">
                  {item.name}
                </span>
                <span className="text-sm font-bold tabular-nums text-primary">
                  {item.score}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Per-area summary with expandable answers */}
      <div className="flex flex-col gap-3 max-w-3xl mx-auto w-full">
        <h3 className="text-lg font-semibold text-foreground mb-1">
          Resumen por área
        </h3>
        {responses.map((resp, i) => {
          const expanded = expandedAreas[i] ?? false
          const area = AREAS[i]
          const answeredQuestions = area.questions
            .map((q, qIdx) => ({ question: q, answer: resp.answers[qIdx] }))
            .filter((qa) => qa.answer?.trim())

          // Conditional answers (Amor y Vínculos)
          const hasConditional = !!area.conditionalBlock
          const showConditional = hasConditional && resp.conditionalAnswer === "Sí"
          const conditionalAnswered = showConditional
            ? area.conditionalBlock!.questions
                .map((q, qIdx) => ({
                  question: q,
                  answer: resp.conditionalAnswers?.[qIdx] || "",
                }))
                .filter((qa) => qa.answer?.trim())
            : []

          return (
            <div
              key={i}
              className="bg-card border border-border rounded-xl overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggleExpand(i)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: CATEGORY_COLORS[i] }}
                  />
                  <span className="font-medium text-foreground text-sm truncate">
                    {area.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-bold tabular-nums text-primary">
                    {resp.score}/10
                  </span>
                  {expanded ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </button>
              {expanded && (answeredQuestions.length > 0 || conditionalAnswered.length > 0) && (
                <div className="px-5 pb-5 flex flex-col gap-3 border-t border-border pt-4">
                  {/* Conditional block answers first */}
                  {conditionalAnswered.length > 0 && (
                    <>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Vínculos amorosos / pareja
                      </p>
                      {conditionalAnswered.map((qa, idx) => (
                        <div key={`c-${idx}`}>
                          <p className="text-xs text-muted-foreground mb-1 leading-relaxed">
                            {qa.question}
                          </p>
                          <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                            {qa.answer}
                          </p>
                        </div>
                      ))}
                    </>
                  )}
                  {/* Main answers */}
                  {hasConditional && answeredQuestions.length > 0 && (
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mt-2">
                      Amor propio y autovalor
                    </p>
                  )}
                  {answeredQuestions.map((qa, idx) => (
                    <div key={idx}>
                      <p className="text-xs text-muted-foreground mb-1 leading-relaxed">
                        {qa.question}
                      </p>
                      <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                        {qa.answer}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Closing phrase */}
      <div className="text-center py-2">
        <p className="text-sm italic text-muted-foreground">
          La claridad es el primer paso hacia el cambio.
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <Button variant="outline" onClick={onRestart}>
          <RotateCcw className="w-4 h-4" />
          Empezar de nuevo
        </Button>
        <Button variant="secondary" onClick={onDownloadPdf}>
          <Download className="w-4 h-4" />
          Descargar PDF
        </Button>
        <Button onClick={onContinueWorking}>
          Reflexión sobre mi rueda
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
