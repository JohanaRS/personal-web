import type { Skill } from "./types"
import type { RadarDatum } from "./radar-chart"

export function skillLabel(skill: Skill): string {
  return skill.shortName?.trim() || skill.name.trim()
}

export function skillDefinition(skill: Skill): string {
  return skill.userDescription?.trim() || skill.description
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
