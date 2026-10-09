"use client"

import { useState } from "react"
import { SKILLS_COUNT } from "../content"
import { SkillSelector } from "../skill-selector"
import { StepHeader, StepNav } from "../step-nav"
import type { Skill, StepProps } from "../types"

export function DefineStep({ state, update, goTo }: StepProps) {
  const [error, setError] = useState("")
  const isGuided = state.mode === "guided"

  const validate = (skills: Skill[]) => {
    if (skills.length < SKILLS_COUNT) {
      const missing = SKILLS_COUNT - skills.length
      return `Te ${missing === 1 ? "falta 1 capacidad" : `faltan ${missing} capacidades`} para completar tu Radar de ${SKILLS_COUNT}.`
    }
    if (skills.length > SKILLS_COUNT) return `Tu Radar usa exactamente ${SKILLS_COUNT} capacidades.`
    const names = skills.map((s) => s.name.trim().toLowerCase())
    if (names.some((n) => !n)) return "Todas las capacidades necesitan un nombre."
    if (new Set(names).size !== names.length) {
      return "Hay capacidades con el mismo nombre. Diferencialas para poder leerlas en el radar."
    }
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
            Son una propuesta para observar un liderazgo humano, efectivo y sostenible, repartida en las cuatro
            relaciones del liderazgo. No son “las características del buen líder”: renombralas, adaptá su definición,
            reemplazá las que no te representen o sumá otras.
          </p>
        </StepHeader>
      ) : (
        <StepHeader eyebrow="Radar personalizado" title="¿Qué capacidades necesita el líder que querés ser?">
          <p>
            Elegí {SKILLS_COUNT} capacidades que para vos son importantes. Pueden ser habilidades, actitudes o formas de
            relacionarte. Si querés inspiración, mirá tu liderazgo desde las cuatro relaciones. No hay respuestas
            correctas.
          </p>
        </StepHeader>
      )}

      <SkillSelector
        skills={state.skills}
        showTriggers={!isGuided}
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
