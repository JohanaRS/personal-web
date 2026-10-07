"use client"

import { ACTION_QUESTIONS } from "../content"
import { ReflectionQuestion } from "../reflection-question"
import { StepHeader, StepNav } from "../step-nav"
import type { ActionPlan, StepProps } from "../types"

const fieldClass =
  "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/30"

export function ActionStep({ state, update, goTo }: StepProps) {
  const primary = state.skills.find((s) => s.id === state.primaryId) ?? state.skills.find((s) => state.priorityIds.includes(s.id))

  const setField = (field: keyof ActionPlan, value: string) =>
    update((s) => ({ action: { ...s.action, [field]: value } }))

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8">
      <StepHeader eyebrow="Próximo paso" title="De la reflexión a una acción pequeña y concreta">
        <p>Un paso chico que sí vas a dar vale más que un gran plan que se queda en el papel.</p>
      </StepHeader>

      {primary && (
        <div className="rounded-xl border border-border bg-secondary/60 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Capacidad que quiero desarrollar
          </p>
          <p className="mt-1 text-lg font-semibold text-foreground">{primary.name}</p>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {ACTION_QUESTIONS.map((q) => (
          <ReflectionQuestion
            key={q.id}
            id={`action-${q.id}`}
            label={q.text}
            value={state.action[q.id]}
            onChange={(v) => setField(q.id, v)}
            rows={3}
          />
        ))}
      </div>

      <section aria-labelledby="plan-title" className="rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8">
        <h3 id="plan-title" className="mb-5 text-xl font-bold text-foreground">
          Mi siguiente acción
        </h3>
        <div className="flex flex-col gap-5">
          <div>
            <label htmlFor="plan-next" className="mb-2 block text-sm font-medium text-foreground">
              Mi siguiente acción es…
            </label>
            <textarea
              id="plan-next"
              rows={2}
              value={state.action.nextAction}
              onChange={(e) => setField("nextAction", e.target.value)}
              className={fieldClass}
            />
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="plan-when" className="mb-2 block text-sm font-medium text-foreground">
                Cuándo la voy a hacer
              </label>
              <input
                id="plan-when"
                type="date"
                value={state.action.when}
                onChange={(e) => setField("when", e.target.value)}
                className={`${fieldClass} h-11`}
              />
            </div>
            <div>
              <label htmlFor="plan-companion" className="mb-2 block text-sm font-medium text-foreground">
                Quién me puede acompañar o ayudar a sostenerla
              </label>
              <input
                id="plan-companion"
                type="text"
                value={state.action.companion}
                onChange={(e) => setField("companion", e.target.value)}
                className={`${fieldClass} h-11`}
              />
            </div>
          </div>
          <div>
            <label htmlFor="plan-sign" className="mb-2 block text-sm font-medium text-foreground">
              Cómo voy a saber que estoy avanzando
            </label>
            <textarea
              id="plan-sign"
              rows={2}
              value={state.action.progressSign}
              onChange={(e) => setField("progressSign", e.target.value)}
              className={fieldClass}
            />
          </div>
        </div>
      </section>

      <StepNav onBack={() => goTo("intention")} onNext={() => goTo("summary")} nextLabel="Ver mi Radar completo" />
    </div>
  )
}
