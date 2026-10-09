export type Mode = "guided" | "custom"

export type Phase =
  | "intro"
  | "define"
  | "assess"
  | "radar"
  | "reflect"
  | "prioritize"
  | "intention"
  | "action"
  | "summary"

export type DimensionId = "self" | "others" | "context" | "results"

export interface Skill {
  id: string
  name: string
  shortName?: string
  description: string
  note?: string
  dimension: DimensionId | null
  guidingQuestions: string[]
  currentScore: number | null
  desiredScore: number | null
  reflection: string
  custom?: boolean
  userDescription?: string
}

export interface ActionPlan {
  weekAction: string
  conversation: string
  practice: string
  stopDoing: string
  obstacle: string
  support: string
  nextAction: string
  when: string
  progressSign: string
  companion: string
}

export interface RadarState {
  version: 2
  phase: Phase
  mode: Mode | null
  skills: Skill[]
  assessIndex: number
  maxStep: number
  reflections: Record<string, string>
  priorityIds: string[]
  primaryId: string | null
  leaderAnswers: Record<string, string>
  intention: string
  action: ActionPlan
}

export type StatePatch =
  | Partial<RadarState>
  | ((state: RadarState) => Partial<RadarState>)

export interface StepProps {
  state: RadarState
  update: (patch: StatePatch) => void
  goTo: (phase: Phase) => void
}
