"use client"

import { useState } from "react"
import { MAX_SKILLS, MIN_SKILLS } from "../content"
import { SkillSelector } from "../skill-selector"
import { StepHeader, StepNav } from "../step-nav"
import type { Skill, StepProps } from "../types"

export function DefineStep({ state, update, goTo }: StepProps) {
  const [error, setError] = useState("")
  const isGuided = state.mode === "guided"

  const validate = (skills: Skill[]) => {
    if (skills.length < MIN_SKILLS) {
      return `Definí al menos ${MIN_SKILLS} capacidades para que tu radar tenga forma.`
    }
    if (skills.length > MAX_SKILLS) return `Podés usar hasta ${MAX_SKILLS} capacidades.`
    const names = skills.map((s) => s.name.trim().toLowerCase())
    if (names.some((n) => !n)) return "Todas las capacidades necesitan un nombre."
    if (new Set(names).size !== names.length) return "Hay capacidades con el mismo nombre. Diferenciálas para poder leerlas en el radar."
    return ""
  }

  const next = () => {
    const message = validate(state.skills)
    if (message) {
      setError(message)
      return
    }
    setError("")
    const firstPending = state.skills.findIndex((s) => s.currentScore === null || s.desiredScore === null)
    update({ assessIndex: firstPending === -1 ? 0 : firstPending })
    goTo("assess")
  }

  return (
    <div className="mx-auto max-w-3xl">
      {isGuided ? (
        <StepHeader eyebrow="Radar guiado" title="Estas son tus 8 capacidades de partida">
          <p>
            Son una propuesta basada en un liderazgo humano, efectivo y sostenible. No son “las características del buen
            líder”: renombralas, adaptá su definición, quitá las que no te representen o sumá otras.
          </p>
        </StepHeader>
      ) : (
        <StepHeader eyebrow="Radar personalizado" title="¿Qué capacidades necesita el líder que querés ser?">
          <p>
            Elegí entre {MIN_SKILLS} y {MAX_SKILLS} capacidades que para vos son importantes. Pueden ser habilidades,
            actitudes o formas de relacionarte. No hay respuestas correctas.
          </p>
        </StepHeader>
      )}

      <SkillSelector
        skills={state.skills}
        onChange={(skills) => {
          update({ skills })
          setError("")
        }}
      />

      <div className="mt-10">
        <StepNav
          onBack={() => goTo("intro")}
          backLabel="Cambiar modalidad"
          onNext={next}
          nextLabel="Empezar autoevaluación"
          error={error}
        />
      </div>
    </div>
  )
}
