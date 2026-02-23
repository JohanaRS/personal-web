/* ------------------------------------------------------------------ */
/*  Shared types, area definitions, colors, and localStorage helpers   */
/* ------------------------------------------------------------------ */

export interface AreaDefinition {
  name: string
  questions: string[]
}

export interface AreaResponse {
  answers: string[]
  score: number
}

export interface DeepWorkAreaData {
  currentState: string
  desiredState: string
  beliefs: string
  action: string
  desiredScore: number
}

export interface ClosureData {
  takeaway: string
  emotion: string
  symbol: string
  reminder: string
}

export interface DeepWorkData {
  selectedAreas: number[]
  areas: Record<number, DeepWorkAreaData>
  closure: ClosureData
}

export interface AssessmentState {
  responses: AreaResponse[]
  deepWork: DeepWorkData | null
  completedAt: string | null
}

/* ------------------------------------------------------------------ */
/*  Area definitions with exact questions from user spec               */
/* ------------------------------------------------------------------ */

export const AREAS: AreaDefinition[] = [
  {
    name: "Salud y Bienestar Fisico",
    questions: [
      "Como me siento con mi cuerpo? Tengo energia y vitalidad?",
      "Estoy alimentandome de manera consciente y nutritiva?",
      "Estoy durmiendo bien y descansando lo suficiente?",
      "Hago actividad fisica con regularidad? Disfruto de moverme?",
      "Estoy cuidando mi salud (consultas medicas, chequeos, etc.)?",
    ],
  },
  {
    name: "Desarrollo Personal / Espiritualidad",
    questions: [
      "Estoy aprendiendo o desarrollando habilidades nuevas?",
      "Dedico tiempo para conectar conmigo?",
      "Tengo momentos de pausa o reflexion?",
      "Siento que tengo un proposito o direccion?",
      "Practico la gratitud, la meditacion u otra forma de conexion interna?",
    ],
  },
  {
    name: "Relaciones y Vida Social",
    questions: [
      "Como estan mis vinculos mas cercanos? Siento que me cuidan y me valoran?",
      "Estoy cultivando amistades o relaciones significativas?",
      "Hay alguna relacion que necesite sanar, soltar o fortalecer?",
      "Estoy siendo genuino en mis relaciones?",
      "Estoy dedicando tiempo de calidad a mi vida social?",
    ],
  },
  {
    name: "Pareja / Amor",
    questions: [
      "Siento conexion emocional y fisica con mi pareja?",
      "Nuestra relacion me suma y me inspira a crecer?",
      "Nos estamos comunicando bien?",
      "Estoy mostrando y recibiendo amor como necesito?",
      "Que necesito para sentir mas plenitud en esta area?",
    ],
  },
  {
    name: "Carrera / Proposito Profesional",
    questions: [
      "Estoy disfrutando lo que hago? Siento motivacion?",
      "Siento que mi trabajo refleja mis valores?",
      "Estoy desarrollandome profesionalmente?",
      "Siento reconocimiento por mi aporte?",
      "Que me gustaria cambiar o potenciar en esta area?",
    ],
  },
  {
    name: "Finanzas",
    questions: [
      "Siento tranquilidad con mi situacion financiera?",
      "Estoy gestionando mi dinero de forma consciente?",
      "Tengo claridad sobre ingresos, egresos y ahorros?",
      "Tengo metas financieras definidas?",
      "Me doy permisos para disfrutar sin culpas?",
    ],
  },
  {
    name: "Tiempo Libre / Diversion / Creatividad",
    questions: [
      "Estoy haciendo actividades que me den placer?",
      "Cuando fue la ultima vez que me rei o disfrute sin pensar en nada mas?",
      "Estoy dedicando tiempo a hobbies o intereses personales?",
      "Siento que puedo desconectarme del deber y simplemente ser?",
      "Estoy creando algo que me entusiasme o inspire?",
    ],
  },
  {
    name: "Entorno / Hogar / Espacios",
    questions: [
      "Mi entorno me transmite calma, orden y bienestar?",
      "Como me siento en mi casa? Refleja quien soy?",
      "Tengo espacios que me inspiren o me ayuden a enfocarme?",
      "Estoy cuidando mis espacios fisicos y digitales?",
      "Que pequenos cambios podria hacer para sentirme mejor en mi entorno?",
    ],
  },
]

/* ------------------------------------------------------------------ */
/*  Colors                                                             */
/* ------------------------------------------------------------------ */

export const CATEGORY_COLORS = [
  "oklch(0.55 0.12 145)", // green
  "oklch(0.55 0.12 200)", // teal
  "oklch(0.55 0.12 260)", // blue
  "oklch(0.55 0.10 310)", // purple
  "oklch(0.55 0.12 350)", // rose
  "oklch(0.60 0.15 30)",  // orange
  "oklch(0.60 0.15 85)",  // amber
  "oklch(0.50 0.10 125)", // olive
]

/* ------------------------------------------------------------------ */
/*  localStorage helpers                                               */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "rueda-vida-assessment"

export function loadAssessment(): AssessmentState | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as AssessmentState
  } catch {
    return null
  }
}

export function saveAssessment(state: AssessmentState) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    /* ignore */
  }
}

export function clearAssessment() {
  if (typeof window === "undefined") return
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignore */
  }
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

export function emptyResponses(): AreaResponse[] {
  return AREAS.map((a) => ({
    answers: a.questions.map(() => ""),
    score: 0,
  }))
}

export function emptyDeepWork(): DeepWorkData {
  return {
    selectedAreas: [],
    areas: {},
    closure: { takeaway: "", emotion: "", symbol: "", reminder: "" },
  }
}

export function emptyDeepWorkArea(): DeepWorkAreaData {
  return {
    currentState: "",
    desiredState: "",
    beliefs: "",
    action: "",
    desiredScore: 0,
  }
}
