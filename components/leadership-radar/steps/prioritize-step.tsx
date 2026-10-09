"use client"

import { useState } from "react"
import { trackRadar } from "../analytics"
import { MAX_PRIORITIES } from "../content"
import { SkillCard } from "../skill-card"
import { StepHeader, StepNav } from "../step-nav"
import type { StepProps } from "../types"

export function PrioritizeStep({ state, update, goTo }: StepProps) {
  const [error, setError] = useState("")
  const selected = state.skills.filter((s) => state.priorityIds.includes(s.id))
  const atMax = state.priorityIds.length >= MAX_PRIORITIES

  const toggle = (id: string) => {
    setError("")
    update((s) => {
      const isOn = s.priorityIds.includes(id)
      if (!isOn && s.priorityIds.length >= MAX_PRIORITIES) return {}
      const priorityIds = isOn ? s.priorityIds.filter((p) => p !== id) : [...s.priorityIds, id]
      let primaryId = s.primaryId
      if (!primaryId || !priorityIds.includes(primaryId)) primaryId = priorityIds.length === 1 ? priorityIds[0] : null
      return { priorityIds, primaryId }
    })
  }

  const next = () => {
    if (selected.length === 0) {
      setError("Elegí al menos una capacidad para seguir.")
      return
    }
    if (!state.primaryId) {
      setError("Elegí cuál tendría mayor impacto si solo pudieras empezar por una.")
      return
    }
    trackRadar("leadership_radar_priority_selected", { count: selected.length })
    goTo("intention")
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8">
      <StepHeader eyebrow="Prioridades" title="¿Qué querés desarrollar primero?">
        <p>
          Elegí hasta {MAX_PRIORITIES} capacidades. Guiate por el impacto que tienen en tu momento actual y en las
          personas con las que trabajás, no solo por el tamaño de la brecha.
        </p>
      </StepHeader>

      <p className="text-sm font-semibold text-foreground" aria-live="polite">
        {selected.length} de {MAX_PRIORITIES} elegidas
      </p>

      <ul className="grid gap-3 md:grid-cols-2">
        {state.skills.map((skill, i) => {
          const isSelected = state.priorityIds.includes(skill.id)
          return (
            <li key={skill.id}>
              <SkillCard
                index={i}
                skill={skill}
                showDefinition
                selected={isSelected}
                disabled={atMax}
                onToggle={() => toggle(skill.id)}
              />
            </li>
          )
        })}
      </ul>

      {selected.length > 1 && (
        <fieldset className="rounded-xl border border-border bg-card p-5 sm:p-6">
          <legend className="px-2 text-base font-semibold text-foreground">
            Si solo pudieras empezar por una, ¿cuál tendría mayor impacto?
          </legend>
          <div className="mt-2 flex flex-col gap-2">
            {selected.map((skill) => (
              <label
                key={skill.id}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-border px-4 py-3 text-sm text-foreground transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
              >
                <input
                  type="radio"
                  name="primary-skill"
                  value={skill.id}
                  checked={state.primaryId === skill.id}
                  onChange={() => {
                    setError("")
                    update({ primaryId: skill.id })
                  }}
                  className="size-4 accent-primary"
                />
                {skill.name}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <StepNav onBack={() => goTo("reflect")} onNext={next} nextLabel="Definir mi intención" error={error} />
    </div>
  )
}
