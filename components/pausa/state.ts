import { QUESTIONS, type QuestionId, type UseMode } from "./content"

const STORAGE_KEY = "joharios:pausa:v1"

/** 0 = task, 1-5 = questions, 6 = closing. */
export const TASK_STEP_INDEX = 0
export const CLOSING_STEP_INDEX = QUESTIONS.length + 1
export const LAST_STEP_INDEX = CLOSING_STEP_INDEX

export type View = "intro" | "flow" | "paused" | "preview"

export interface PausaAnswers {
  task: string
  proposito: string
  autonomia: string
  uso: string
  supervision: string
  aprendizaje: string
  useMode: UseMode | ""
  learningPending: boolean
  nextStep: string
  nextStepDetail: string
}

export interface PausaState {
  version: 1
  view: View
  step: number
  answers: PausaAnswers
  persist: boolean
  startedAt: string
  updatedAt: number | null
}

export const EMPTY_ANSWERS: PausaAnswers = {
  task: "",
  proposito: "",
  autonomia: "",
  uso: "",
  supervision: "",
  aprendizaje: "",
  useMode: "",
  learningPending: false,
  nextStep: "",
  nextStepDetail: "",
}

export function createInitialState(): PausaState {
  return {
    version: 1,
    view: "intro",
    step: TASK_STEP_INDEX,
    answers: { ...EMPTY_ANSWERS },
    persist: false,
    startedAt: new Date().toISOString(),
    updatedAt: null,
  }
}

const STRING_KEYS = [
  "task",
  "proposito",
  "autonomia",
  "uso",
  "supervision",
  "aprendizaje",
  "nextStep",
  "nextStepDetail",
] as const

export function loadDraft(): PausaState | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<PausaState>
    if (parsed?.version !== 1 || typeof parsed.answers !== "object" || parsed.answers === null) return null
    const source = parsed.answers as Partial<PausaAnswers>
    const answers: PausaAnswers = { ...EMPTY_ANSWERS }
    for (const key of STRING_KEYS) {
      if (typeof source[key] === "string") answers[key] = source[key] as string
    }
    answers.useMode = source.useMode === "ia" || source.useMode === "propia" ? source.useMode : ""
    answers.learningPending = Boolean(source.learningPending)
    const step = Number.isInteger(parsed.step) ? Math.min(Math.max(parsed.step as number, 0), LAST_STEP_INDEX) : 0
    const view: View = parsed.view === "paused" || parsed.view === "preview" ? parsed.view : "flow"
    return {
      version: 1,
      view,
      step,
      answers,
      persist: true,
      startedAt: typeof parsed.startedAt === "string" ? parsed.startedAt : new Date().toISOString(),
      updatedAt: typeof parsed.updatedAt === "number" ? parsed.updatedAt : null,
    }
  } catch {
    return null
  }
}

/** Returns false when storage is unavailable (private mode, quota) so the UI can say so. */
export function saveDraft(state: PausaState): boolean {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    return true
  } catch {
    return false
  }
}

export function clearDraft() {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Nothing to clear.
  }
}

export const filled = (value: string | undefined) => Boolean(value && value.trim())

export function isPending(answers: PausaAnswers, id: QuestionId) {
  if (id === "aprendizaje" && answers.learningPending) return true
  return !filled(answers[id])
}

export function longDate(date: Date) {
  return date.toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })
}

export function savedTime(timestamp: number) {
  return new Date(timestamp).toLocaleString("es-AR", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function pad(n: number) {
  return String(n).padStart(2, "0")
}

export function pdfFileName(date = new Date()) {
  return `mi-pausa-estrategica-${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}.pdf`
}
