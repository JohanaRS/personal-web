import { CUSTOM_GUIDING_QUESTIONS, DIMENSIONS, INITIAL_QUESTIONS, getDimension, type Dimension } from "./content"
import type { Skill } from "./types"
import type { RadarDatum } from "./radar-chart"

export function skillLabel(skill: Skill): string {
  return skill.shortName?.trim() || skill.name.trim()
}

export function skillDefinition(skill: Skill): string {
  return skill.userDescription?.trim() || skill.description
}

export function skillDimension(skill: Skill): Dimension | null {
  return getDimension(skill.dimension)
}

/**
 * Preguntas de reflexión de una capacidad, separadas entre las que se ven
 * siempre y las que aparecen con “Quiero profundizar”.
 */
export function skillQuestions(skill: Skill): { initial: string[]; deeper: string[] } {
  if (!skill.custom) {
    return {
      initial: skill.guidingQuestions.slice(0, INITIAL_QUESTIONS),
      deeper: skill.guidingQuestions.slice(INITIAL_QUESTIONS),
    }
  }
  return {
    initial: CUSTOM_GUIDING_QUESTIONS,
    deeper: skillDimension(skill)?.questions ?? [],
  }
}

export function isScored(skill: Skill): boolean {
  return skill.currentScore !== null && skill.desiredScore !== null
}

export function gapOf(skill: Skill): number {
  return (skill.desiredScore ?? 0) - (skill.currentScore ?? 0)
}

export function gapLabel(gap: number): string {
  if (gap > 0) return `+${gap}`
  if (gap === 0) return "Sin brecha"
  return `${gap}`
}

export function getStrengths(skills: Skill[], count = 3): Skill[] {
  return skills
    .map((skill, index) => ({ skill, index }))
    .filter(({ skill }) => skill.currentScore !== null)
    .sort(
      (a, b) =>
        (b.skill.currentScore ?? 0) - (a.skill.currentScore ?? 0) ||
        a.index - b.index
    )
    .slice(0, count)
    .map(({ skill }) => skill)
}

export function getGaps(skills: Skill[], count = 3): Skill[] {
  return skills
    .map((skill, index) => ({ skill, index }))
    .filter(({ skill }) => isScored(skill) && gapOf(skill) > 0)
    .sort((a, b) => gapOf(b.skill) - gapOf(a.skill) || a.index - b.index)
    .slice(0, count)
    .map(({ skill }) => skill)
}

export function toRadarData(skills: Skill[]): RadarDatum[] {
  return skills.map((skill) => ({
    id: skill.id,
    label: skillLabel(skill),
    current: skill.currentScore,
    desired: skill.desiredScore,
  }))
}

export interface SkillGroup {
  dimension: Dimension | null
  items: { skill: Skill; index: number }[]
}

/** Agrupa las capacidades por relación, conservando el índice global usado en el gráfico. */
export function groupByDimension(skills: Skill[]): SkillGroup[] {
  const groups: SkillGroup[] = DIMENSIONS.map((dimension) => ({
    dimension,
    items: skills
      .map((skill, index) => ({ skill, index }))
      .filter(({ skill }) => skill.dimension === dimension.id),
  }))
  const unassigned = skills
    .map((skill, index) => ({ skill, index }))
    .filter(({ skill }) => !getDimension(skill.dimension))
  if (unassigned.length > 0) groups.push({ dimension: null, items: unassigned })
  return groups.filter((g) => g.items.length > 0)
}

/** True cuando hay varias capacidades y todas pertenecen a una única relación. */
export function isConcentrated(skills: Skill[]): boolean {
  if (skills.length < 4) return false
  const first = skills[0].dimension
  return first !== null && skills.every((s) => s.dimension === first)
}
