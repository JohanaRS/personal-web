/* ------------------------------------------------------------------ */
/*  Shared types, area definitions, colors, and localStorage helpers   */
/* ------------------------------------------------------------------ */

export interface AreaDefinition {
  name: string
  questions: string[]
  /** Optional conditional block (used for Amor y Vinculos) */
  conditionalBlock?: {
    triggerQuestion: string
    options: string[]
    /** Questions only shown if the answer is the first option (e.g. "Si") */
    questions: string[]
  }
}

export interface AreaResponse {
  answers: string[]
  score: number
  /** For conditional block: user's selection */
  conditionalAnswer?: string
  /** Answers for conditional block questions */
  conditionalAnswers?: string[]
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
/*  Area definitions with exact questions (gender-neutral)             */
/* ------------------------------------------------------------------ */

export const AREAS: AreaDefinition[] = [
  {
    name: "Salud y Bienestar Físico",
    questions: [
      "¿Cómo me siento con mi cuerpo? ¿Tengo energía y vitalidad?",
      "¿Estoy alimentándome de manera consciente y nutritiva?",
      "¿Estoy durmiendo bien y descansando lo suficiente?",
      "¿Hago actividad física con regularidad? ¿Disfruto de moverme?",
      "¿Estoy cuidando mi salud (consultas médicas, chequeos, etc.)?",
    ],
  },
  {
    name: "Desarrollo Personal / Espiritualidad",
    questions: [
      "¿Estoy aprendiendo o desarrollando habilidades nuevas?",
      "¿Dedico tiempo para conectar conmigo?",
      "¿Tengo momentos de pausa o reflexión?",
      "¿Siento que tengo un propósito o dirección?",
      "¿Practico la gratitud, la meditación u otra forma de conexión interna?",
    ],
  },
  {
    name: "Relaciones y Vida Social",
    questions: [
      "¿Cómo están mis vínculos más cercanos? ¿Siento que me cuidan y me valoran?",
      "¿Estoy cultivando amistades o relaciones significativas?",
      "¿Hay alguna relación que necesite sanar, soltar o fortalecer?",
      "¿Estoy siendo genuino en mis relaciones?",
      "¿Estoy dedicando tiempo de calidad a mi vida social?",
    ],
  },
  {
    name: "Amor y Vínculos",
    questions: [
      "¿Cómo es la relación que tengo conmigo?",
      "¿Me trato con respeto y compasión cuando cometo errores?",
      "¿Estoy respetando mis propios límites?",
      "¿Siento que merezco amor y bienestar?",
      "¿Estoy priorizando mis necesidades emocionales?",
    ],
    conditionalBlock: {
      triggerQuestion: "¿Actualmente estás en una relación amorosa?",
      options: ["Sí", "No", "Prefiero no responder"],
      questions: [
        "¿Siento conexión emocional y física en mi relación?",
        "¿Nuestra relación me suma y me impulsa a crecer?",
        "¿Nos estamos comunicando de forma sana y clara?",
        "¿Estoy mostrando y recibiendo amor como necesito?",
      ],
    },
  },
  {
    name: "Carrera / Propósito Profesional",
    questions: [
      "¿Estoy disfrutando lo que hago? ¿Siento motivación?",
      "¿Siento que mi trabajo refleja mis valores?",
      "¿Estoy desarrollándome profesionalmente?",
      "¿Siento reconocimiento por mi aporte?",
      "¿Qué me gustaría cambiar o potenciar en esta área?",
    ],
  },
  {
    name: "Finanzas",
    questions: [
      "¿Siento tranquilidad con mi situación financiera?",
      "¿Estoy gestionando mi dinero de forma consciente?",
      "¿Tengo claridad sobre ingresos, egresos y ahorros?",
      "¿Tengo metas financieras definidas?",
      "¿Me doy permisos para disfrutar sin culpas?",
    ],
  },
  {
    name: "Tiempo Libre / Diversión / Creatividad",
    questions: [
      "¿Estoy haciendo actividades que me den placer?",
      "¿Cuándo fue la última vez que me reí o disfruté sin pensar en nada más?",
      "¿Estoy dedicando tiempo a hobbies o intereses personales?",
      "¿Siento que puedo desconectarme del deber y simplemente ser?",
      "¿Estoy creando algo que me entusiasme o inspire?",
    ],
  },
  {
    name: "Entorno / Hogar / Espacios",
    questions: [
      "¿Mi entorno me transmite calma, orden y bienestar?",
      "¿Cómo me siento en mi casa? ¿Refleja quién soy?",
      "¿Tengo espacios que me inspiren o me ayuden a enfocarme?",
      "¿Estoy cuidando mis espacios físicos y digitales?",
      "¿Qué pequeños cambios podría hacer para sentirme mejor en mi entorno?",
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
    ...(a.conditionalBlock
      ? {
          conditionalAnswer: "",
          conditionalAnswers: a.conditionalBlock.questions.map(() => ""),
        }
      : {}),
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
