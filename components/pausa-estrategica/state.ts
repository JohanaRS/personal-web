import {
  ENERGY_OPTIONS,
  MOMENTS,
  SOON_RESPONSES,
  TIME_OPTIONS,
  type EnergyId,
  type Level,
  type MomentId,
  type SoonResponse,
  type TimeId,
} from "./content"

const STORAGE_KEY = "joharios:pausa-estrategica:v1"
export const MAX_ITEMS = 3

export interface FocusItem {
  id: string
  text: string
  importance: string
  urgency: string
  /** The person's own reading after seeing both answers together. */
  soon: boolean | null
  matters: boolean | null
  soonResponse: SoonResponse | ""
  placeWhen: string
  impact: Level | ""
  effort: Level | ""
}

export interface Answers {
  moment: MomentId | ""
  items: FocusItem[]
  time: TimeId | ""
  energy: EnergyId | ""
  priorityId: string
  useMatrix: boolean
  fitVersion: string
  nextStep: string
  why: string
  when: string
  later: string
}

export type View = "intro" | "flow" | "preview"

export interface ToolState {
  version: 1
  view: View
  screen: string
  answers: Answers
  persist: boolean
  updatedAt: number | null
}

export const ITEM_IDS = ["a", "b", "c"] as const

export function emptyItem(id: string): FocusItem {
  return {
    id,
    text: "",
    importance: "",
    urgency: "",
    soon: null,
    matters: null,
    soonResponse: "",
    placeWhen: "",
    impact: "",
    effort: "",
  }
}

export function emptyAnswers(): Answers {
  return {
    moment: "",
    items: ITEM_IDS.map(emptyItem),
    time: "",
    energy: "",
    priorityId: "",
    useMatrix: false,
    fitVersion: "",
    nextStep: "",
    why: "",
    when: "",
    later: "",
  }
}

export function createInitialState(): ToolState {
  return { version: 1, view: "intro", screen: "momento", answers: emptyAnswers(), persist: false, updatedAt: null }
}

export const filled = (value: string | undefined | null) => Boolean(value && value.trim())

export function activeItems(answers: Answers) {
  return answers.items.filter((item) => filled(item.text))
}

export function priorityItem(answers: Answers) {
  const items = activeItems(answers)
  if (items.length === 1) return items[0]
  return items.find((item) => item.id === answers.priorityId) ?? null
}

/** The ordered list of screens for the current answers. Item screens and the matrix appear only when they apply. */
export function screensFor(answers: Answers): string[] {
  const items = activeItems(answers)
  const list = ["momento", "mesa", ...items.map((item) => `item-${item.id}`), "juntas"]
  if (items.length > 1) list.push("prioridad")
  if (items.length > 1 && answers.useMatrix) list.push("matriz")
  list.push("alcance", "paso")
  return list
}

export const STAGES = ["Momento", "Sobre la mesa", "Importante y urgente", "Elegir y ajustar", "Próximo paso"] as const

export function stageOf(screen: string) {
  if (screen === "momento") return 0
  if (screen === "mesa") return 1
  if (screen.startsWith("item-") || screen === "juntas") return 2
  if (screen === "prioridad" || screen === "matriz" || screen === "alcance") return 3
  return 4
}

export function momentById(id: Answers["moment"]) {
  return MOMENTS.find((m) => m.id === id) ?? null
}

export function timeLabel(id: Answers["time"]) {
  return TIME_OPTIONS.find((o) => o.id === id)?.label ?? ""
}

export function energyLabel(id: Answers["energy"]) {
  return ENERGY_OPTIONS.find((o) => o.id === id)?.label ?? ""
}

export function soonResponseLabel(id: FocusItem["soonResponse"]) {
  return SOON_RESPONSES.find((o) => o.id === id)?.label ?? ""
}

/** A suggestion for sizing the final step, based on the time and energy the person reported. */
export function scopeHint(answers: Answers) {
  const { time, energy } = answers
  if (!time && !energy) return null
  if (time === "poco" || energy === "baja") {
    return "Con poco margen, buscá la versión mínima: un primer movimiento de 15 minutos, un mensaje para pedir apoyo o un bloque reservado para más adelante."
  }
  if (time === "mucho" && energy === "alta") {
    return "Tenés margen para avanzar en algo sustantivo. Igual, definí dónde termina este bloque para no tomar más de lo que podés sostener."
  }
  return "Elegí una versión que puedas terminar en el tiempo que tenés, y dejá anotado qué parte queda para después."
}

const STRING_KEYS = ["fitVersion", "nextStep", "why", "when", "later", "priorityId"] as const
const ITEM_STRING_KEYS = ["text", "importance", "urgency", "placeWhen"] as const

function oneOf<T extends string>(value: unknown, options: readonly { id: T }[]): T | "" {
  return options.some((o) => o.id === value) ? (value as T) : ""
}

function sanitizeItem(raw: unknown, id: string): FocusItem {
  const item = emptyItem(id)
  if (!raw || typeof raw !== "object") return item
  const source = raw as Record<string, unknown>
  for (const key of ITEM_STRING_KEYS) if (typeof source[key] === "string") item[key] = source[key] as string
  item.soon = typeof source.soon === "boolean" ? source.soon : null
  item.matters = typeof source.matters === "boolean" ? source.matters : null
  item.soonResponse = oneOf(source.soonResponse, SOON_RESPONSES)
  item.impact = source.impact === "alto" || source.impact === "bajo" ? source.impact : ""
  item.effort = source.effort === "alto" || source.effort === "bajo" ? source.effort : ""
  return item
}

export function loadDraft(): ToolState | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<ToolState>
    if (parsed?.version !== 1 || !parsed.answers || typeof parsed.answers !== "object") return null
    const source = parsed.answers as Partial<Answers>
    const answers = emptyAnswers()
    for (const key of STRING_KEYS) if (typeof source[key] === "string") answers[key] = source[key] as string
    answers.moment = oneOf(source.moment, MOMENTS)
    answers.time = oneOf(source.time, TIME_OPTIONS)
    answers.energy = oneOf(source.energy, ENERGY_OPTIONS)
    answers.useMatrix = Boolean(source.useMatrix)
    const rawItems = Array.isArray(source.items) ? source.items : []
    answers.items = ITEM_IDS.map((id, i) => sanitizeItem(rawItems[i], id))
    const screens = screensFor(answers)
    const screen = typeof parsed.screen === "string" && screens.includes(parsed.screen) ? parsed.screen : "momento"
    return {
      version: 1,
      view: parsed.view === "preview" ? "preview" : "flow",
      screen,
      answers,
      persist: true,
      updatedAt: typeof parsed.updatedAt === "number" ? parsed.updatedAt : null,
    }
  } catch {
    return null
  }
}

/** Returns false when storage is unavailable (private mode, quota) so the UI can say so. */
export function saveDraft(state: ToolState): boolean {
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

export function longDate(date: Date) {
  return date.toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
}

export function savedTime(timestamp: number) {
  return new Date(timestamp).toLocaleString("es-AR", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })
}

const pad = (n: number) => String(n).padStart(2, "0")

export function pdfFileName(date = new Date()) {
  return `pausa-estrategica-${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}.pdf`
}
