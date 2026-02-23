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
  /** For conditional block: user's selection ("Si" / "No" / "Prefiero no responder") */
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
/*  Area definitions with exact questions (gender-neutral, with tildes)*/
/* ------------------------------------------------------------------ */

export const AREAS: AreaDefinition[] = [
  {
    name: "Salud y Bienestar F\u00edsico",
    questions: [
      "\u00bfC\u00f3mo me siento con mi cuerpo? \u00bfTengo energ\u00eda y vitalidad?",
      "\u00bfEstoy aliment\u00e1ndome de manera consciente y nutritiva?",
      "\u00bfEstoy durmiendo bien y descansando lo suficiente?",
      "\u00bfHago actividad f\u00edsica con regularidad? \u00bfDisfruto de moverme?",
      "\u00bfEstoy cuidando mi salud (consultas m\u00e9dicas, chequeos, etc.)?",
    ],
  },
  {
    name: "Desarrollo Personal / Espiritualidad",
    questions: [
      "\u00bfEstoy aprendiendo o desarrollando habilidades nuevas?",
      "\u00bfDedico tiempo para conectar conmigo?",
      "\u00bfTengo momentos de pausa o reflexi\u00f3n?",
      "\u00bfSiento que tengo un prop\u00f3sito o direcci\u00f3n?",
      "\u00bfPractico la gratitud, la meditaci\u00f3n u otra forma de conexi\u00f3n interna?",
    ],
  },
  {
    name: "Relaciones y Vida Social",
    questions: [
      "\u00bfC\u00f3mo est\u00e1n mis v\u00ednculos m\u00e1s cercanos? \u00bfSiento que me cuidan y me valoran?",
      "\u00bfEstoy cultivando amistades o relaciones significativas?",
      "\u00bfHay alguna relaci\u00f3n que necesite sanar, soltar o fortalecer?",
      "\u00bfEstoy siendo genuino en mis relaciones?",
      "\u00bfEstoy dedicando tiempo de calidad a mi vida social?",
    ],
  },
  {
    name: "Amor y V\u00ednculos",
    questions: [
      "\u00bfC\u00f3mo es la relaci\u00f3n que tengo conmigo?",
      "\u00bfMe trato con respeto y compasi\u00f3n cuando cometo errores?",
      "\u00bfEstoy respetando mis propios l\u00edmites?",
      "\u00bfSiento que merezco amor y bienestar?",
      "\u00bfEstoy priorizando mis necesidades emocionales?",
    ],
    conditionalBlock: {
      triggerQuestion: "\u00bfActualmente est\u00e1s en una relaci\u00f3n amorosa?",
      options: ["S\u00ed", "No", "Prefiero no responder"],
      questions: [
        "\u00bfSiento conexi\u00f3n emocional y f\u00edsica en mi relaci\u00f3n?",
        "\u00bfNuestra relaci\u00f3n me suma y me impulsa a crecer?",
        "\u00bfNos estamos comunicando de forma sana y clara?",
        "\u00bfEstoy mostrando y recibiendo amor como necesito?",
      ],
    },
  },
  {
    name: "Carrera / Prop\u00f3sito Profesional",
    questions: [
      "\u00bfEstoy disfrutando lo que hago? \u00bfSiento motivaci\u00f3n?",
      "\u00bfSiento que mi trabajo refleja mis valores?",
      "\u00bfEstoy desarroll\u00e1ndome profesionalmente?",
      "\u00bfSiento reconocimiento por mi aporte?",
      "\u00bfQu\u00e9 me gustar\u00eda cambiar o potenciar en esta \u00e1rea?",
    ],
  },
  {
    name: "Finanzas",
    questions: [
      "\u00bfSiento tranquilidad con mi situaci\u00f3n financiera?",
      "\u00bfEstoy gestionando mi dinero de forma consciente?",
      "\u00bfTengo claridad sobre ingresos, egresos y ahorros?",
      "\u00bfTengo metas financieras definidas?",
      "\u00bfMe doy permisos para disfrutar sin culpas?",
    ],
  },
  {
    name: "Tiempo Libre / Diversi\u00f3n / Creatividad",
    questions: [
      "\u00bfEstoy haciendo actividades que me den placer?",
      "\u00bfCu\u00e1ndo fue la \u00faltima vez que me re\u00ed o disfrut\u00e9 sin pensar en nada m\u00e1s?",
      "\u00bfEstoy dedicando tiempo a hobbies o intereses personales?",
      "\u00bfSiento que puedo desconectarme del deber y simplemente ser?",
      "\u00bfEstoy creando algo que me entusiasme o inspire?",
    ],
  },
  {
    name: "Entorno / Hogar / Espacios",
    questions: [
      "\u00bfMi entorno me transmite calma, orden y bienestar?",
      "\u00bfC\u00f3mo me siento en mi casa? \u00bfRefleja qui\u00e9n soy?",
      "\u00bfTengo espacios que me inspiren o me ayuden a enfocarme?",
      "\u00bfEstoy cuidando mis espacios f\u00edsicos y digitales?",
      "\u00bfQu\u00e9 peque\u00f1os cambios podr\u00eda hacer para sentirme mejor en mi entorno?",
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
