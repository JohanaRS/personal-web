import { GUIDED_SKILLS, stepIndexOf } from "./content"
import type { ActionPlan, DimensionId, RadarState, Skill } from "./types"

const STORAGE_KEY = "joharios:leadership-radar:v1"

export function emptyActionPlan(): ActionPlan {
  return {
    weekAction: "",
    conversation: "",
    practice: "",
    stopDoing: "",
    obstacle: "",
    support: "",
    nextAction: "",
    when: "",
    progressSign: "",
    companion: "",
  }
}

export function createInitialState(): RadarState {
  return {
    version: 2,
    phase: "intro",
    mode: null,
    skills: [],
    assessIndex: 0,
    reflectIndex: 0,
    maxStep: 0,
    reflections: {},
    priorityIds: [],
    primaryId: null,
    leaderAnswers: {},
    intention: "",
    action: emptyActionPlan(),
  }
}

export function createGuidedSkills(): Skill[] {
  return GUIDED_SKILLS.map((template) => ({
    ...template,
    currentScore: null,
    desiredScore: null,
    reflection: "",
  }))
}

export function createCustomSkill(name = "", dimension: DimensionId | null = null): Skill {
  const random = Math.random().toString(36).slice(2, 7)
  return {
    id: `custom-${Date.now().toString(36)}-${random}`,
    name,
    description: "",
    dimension,
    guidingQuestions: [],
    currentScore: null,
    desiredScore: null,
    reflection: "",
    custom: true,
  }
}

export function loadState(): RadarState | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<RadarState>
    // Versions before 2 used a different model (up to 10 skills, no relations), so they are discarded.
    if (parsed?.version !== 2 || !Array.isArray(parsed.skills)) return null
    const base = createInitialState()
    const restored: RadarState = {
      ...base,
      ...parsed,
      action: { ...base.action, ...(parsed.action ?? {}) },
      reflections: parsed.reflections ?? {},
      leaderAnswers: parsed.leaderAnswers ?? {},
      priorityIds: parsed.priorityIds ?? [],
    }
    // Progress saved before a step was inserted must still reach the step the person is on.
    restored.maxStep = Math.max(restored.maxStep, stepIndexOf(restored.phase))
    return restored
  } catch {
    return null
  }
}

export function saveState(state: RadarState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Storage may be unavailable (private mode, quota): the tool keeps working in memory.
  }
}

export function clearState() {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Nothing to clear.
  }
}
