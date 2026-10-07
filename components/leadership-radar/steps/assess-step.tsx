"use client"

import { useState } from "react"
import { scrollToTop } from "../analytics"
import { CURRENT_ANCHORS, DESIRED_ANCHORS } from "../content"
import { skillDefinition } from "../derived"
import { ReflectionQuestion } from "../reflection-question"
import { ScoreSlider } from "../score-slider"
import { StepNav } from "../step-nav"
import type { Skill, StepProps } from "../types"

export function AssessStep({ state, update, goTo }: StepProps) {
  const [error, setError] = useState("")
  const total = state.skills.length
  const index = Math.min(state.assessIndex, total - 1)
  const skill = state.skills[index]

  if (!skill) return null

  const patchSkill = (patch: Partial<Skill>) => {
    update((s) => ({ skills: s.skills.map((k) => (k.id === skill.id ? { ...k, ...patch } : k)) }))
    setError("")
  }

  const next = () => {
    if (skill.currentScore === null || skill.desiredScore === null) {
      setError("Elegí tanto dónde estás hoy como dónde te gustaría estar para continuar.")
      return
    }
    if (index === total - 1) goTo("radar")
    else {
      update({ assessIndex: index + 1 })
      scrollToTop()
    }
  }

  const back = () => {
    setError("")
    if (index === 0) goTo("define")
    else {
      update({ assessIndex: index - 1 })
      scrollToTop()
    }
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <header className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          Capacidad {index + 1} de {total}
        </p>
        <h2 className="text-2xl font-bold leading-tight text-foreground text-balance sm:text-3xl">{skill.name}</h2>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty">{skillDefinition(skill)}</p>
        {skill.note && (
          <p className="max-w-2xl rounded-lg bg-secondary px-4 py-3 text-sm leading-relaxed text-foreground">
            {skill.note}
          </p>
        )}
      </header>

      <section aria-label="Situación actual" className="rounded-2xl border border-border bg-card p-5 sm:p-7">
        <ScoreSlider
          id={`current-${skill.id}`}
          label="¿Dónde estás hoy?"
          helper="Sin compararte con nadie: pensá en cómo la expresás en las últimas semanas."
          tone="current"
          value={skill.currentScore}
          onChange={(v) => patchSkill({ currentScore: v })}
          anchors={CURRENT_ANCHORS}
        />
      </section>

      <section aria-labelledby="guiding-title" className="flex flex-col gap-3">
        <h3 id="guiding-title" className="text-sm font-semibold text-foreground">
          Preguntas para pensar
        </h3>
        <ul className="flex flex-col gap-2">
          {skill.guidingQuestions.map((q) => (
            <li key={q} className="rounded-lg bg-secondary/60 px-4 py-3 text-sm leading-relaxed text-foreground">
              {q}
            </li>
          ))}
        </ul>
      </section>

      <ReflectionQuestion
        id={`reflection-${skill.id}`}
        label="¿Qué observás cuando pensás en esta habilidad? (opcional)"
        value={skill.reflection}
        onChange={(v) => patchSkill({ reflection: v })}
      />

      <section aria-label="Situación deseada" className="rounded-2xl border border-border bg-card p-5 sm:p-7">
        <ScoreSlider
          id={`desired-${skill.id}`}
          label="¿Dónde te gustaría estar?"
          helper="Pensá qué nivel sería suficientemente bueno y sostenible para el momento que estás viviendo. No siempre es un 10."
          tone="desired"
          value={skill.desiredScore}
          onChange={(v) => patchSkill({ desiredScore: v })}
          anchors={DESIRED_ANCHORS}
        />
      </section>

      <StepNav
        onBack={back}
        onNext={next}
        nextLabel={index === total - 1 ? "Ver mi radar" : "Guardar y continuar"}
        error={error}
      />
    </div>
  )
}
