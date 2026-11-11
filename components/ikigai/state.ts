import { DIMENSIONS, FRAME_FIELDS, PROGRESS_FIELD_IDS, STAGES, type DimensionId } from "./content"

const STORAGE_KEY = "joharios:ikigai-profesional:v1"

export type Answers = Record<string, string>

export interface IkigaiState {
  version: 1
  started: boolean
  stage: number
  answers: Answers
  updatedAt: number | null
}

export function createInitialState(): IkigaiState {
  return { version: 1, started: false, stage: 0, answers: {}, updatedAt: null }
}

export function loadState(): IkigaiState | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<IkigaiState>
    if (parsed?.version !== 1 || typeof parsed.answers !== "object" || parsed.answers === null) return null
    const answers: Answers = {}
    for (const [key, value] of Object.entries(parsed.answers)) {
      if (typeof value === "string") answers[key] = value
    }
    const stage = Number.isInteger(parsed.stage) ? Math.min(Math.max(parsed.stage as number, 0), STAGES.length - 1) : 0
    return { version: 1, started: Boolean(parsed.started), stage, answers, updatedAt: parsed.updatedAt ?? null }
  } catch {
    return null
  }
}

/** Returns false when storage is unavailable (private mode, quota) so the UI can say so. */
export function saveState(state: IkigaiState): boolean {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    return true
  } catch {
    return false
  }
}

/** Removes only this tool's key; other resources keep their own data. */
export function clearState() {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Nothing to clear.
  }
}

export function parseKeywords(raw: string | undefined): string[] {
  if (!raw) return []
  const seen = new Set<string>()
  return raw
    .split(/[,;\n]/)
    .map((k) => k.trim().replace(/\s+/g, " "))
    .filter((k) => {
      const key = k.toLocaleLowerCase("es")
      if (!k || seen.has(key)) return false
      seen.add(key)
      return true
    })
}

export function keywordsByDimension(answers: Answers): Record<DimensionId, string[]> {
  return Object.fromEntries(DIMENSIONS.map((d) => [d.id, parseKeywords(answers[d.keywords.id])])) as Record<
    DimensionId,
    string[]
  >
}

export const filled = (value: string | undefined) => Boolean(value && value.trim())

export function progressOf(answers: Answers) {
  const done = PROGRESS_FIELD_IDS.filter((id) => filled(answers[id])).length
  return Math.round((done / PROGRESS_FIELD_IDS.length) * 100)
}

function pad(n: number) {
  return String(n).padStart(2, "0")
}

export function isoDate(date = new Date()) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

/** The date the person chose in the framing stage, or today. */
export function sessionDate(answers: Answers): Date {
  const raw = answers[FRAME_FIELDS.date.id]
  if (raw && /^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    const [y, m, d] = raw.split("-").map(Number)
    return new Date(y, m - 1, d)
  }
  return new Date()
}

export function longDate(date: Date) {
  return date.toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })
}

export function personName(answers: Answers) {
  return (answers[FRAME_FIELDS.name.id] ?? "").trim()
}

export function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40)
}

export function exportFileName(answers: Answers, kind: "diagram" | "report", ext: string) {
  const date = isoDate(sessionDate(answers))
  const name = slugify(personName(answers))
  if (kind === "report") return `reporte-ikigai-profesional-${name ? `${name}-` : ""}${date}.${ext}`
  return name ? `ikigai-profesional-${name}-${date}.${ext}` : `mi-ikigai-profesional-${date}.${ext}`
}
