import type { ActionPlan, Phase } from "./types"

/* ------------------------------------------------------------------ */
/*  Escala                                                             */
/* ------------------------------------------------------------------ */

export const SCORE_MIN = 1
export const SCORE_MAX = 10

export const CURRENT_ANCHORS = [
  { value: 1, text: "Necesita mucha atención" },
  { value: 5, text: "Lo desarrollo de forma irregular" },
  { value: 10, text: "Es una fortaleza que sostengo consistentemente" },
]

export const DESIRED_ANCHORS = [
  { value: 1, text: "Muy por debajo de lo que necesito" },
  { value: 5, text: "Un nivel intermedio y sostenible" },
  { value: 10, text: "El máximo nivel de desarrollo" },
]

export const MIN_SKILLS = 6
export const MAX_SKILLS = 10
export const TARGET_SKILLS = 8
export const MAX_PRIORITIES = 3

/* ------------------------------------------------------------------ */
/*  Pasos del recorrido                                                */
/* ------------------------------------------------------------------ */

export const STEPS: { phase: Phase; label: string }[] = [
  { phase: "define", label: "Tus capacidades" },
  { phase: "assess", label: "Autoevaluación" },
  { phase: "radar", label: "Tu radar" },
  { phase: "reflect", label: "Reflexión" },
  { phase: "prioritize", label: "Prioridades" },
  { phase: "intention", label: "Tu intención" },
  { phase: "action", label: "Próximo paso" },
]

export function stepIndexOf(phase: Phase): number {
  if (phase === "summary") return STEPS.length - 1
  return STEPS.findIndex((s) => s.phase === phase)
}

/* ------------------------------------------------------------------ */
/*  Portada                                                            */
/* ------------------------------------------------------------------ */

export const HOW_IT_WORKS = [
  {
    title: "Definí tu liderazgo",
    description:
      "Elegí qué capacidades son importantes para la clase de líder que querés ser.",
  },
  {
    title: "Evaluá dónde estás hoy",
    description:
      "Reflexioná y puntuá cómo sentís que estás expresando actualmente cada capacidad.",
  },
  {
    title: "Visualizá tu radar",
    description:
      "Observá fortalezas, desequilibrios y áreas que querés desarrollar.",
  },
  {
    title: "Elegí dónde crecer",
    description: "Definí prioridades y transformalas en acciones concretas.",
  },
]

export const MODES = {
  guided: {
    title: "Quiero una guía",
    description:
      "Empezá con 8 capacidades clave para un liderazgo humano, efectivo y sostenible. Después vas a poder adaptarlas si alguna no representa tu realidad.",
    cta: "Usar radar guiado",
  },
  custom: {
    title: "Quiero definir mi liderazgo",
    description:
      "Elegí las capacidades que para vos necesita tener el líder que querés ser.",
    cta: "Crear radar personalizado",
    footnote: "Tu liderazgo no tiene por qué parecerse al de otra persona.",
  },
}

/* ------------------------------------------------------------------ */
/*  Capacidades del radar guiado                                       */
/* ------------------------------------------------------------------ */

export interface SkillTemplate {
  id: string
  name: string
  shortName: string
  description: string
  note?: string
  guidingQuestions: string[]
}

export const GUIDED_SKILLS: SkillTemplate[] = [
  {
    id: "self",
    name: "Autoconocimiento y autenticidad",
    shortName: "Autoconocimiento",
    description:
      "Reconocer tus fortalezas, límites, patrones, emociones y valores, y liderar desde una identidad coherente con quién sos.",
    guidingQuestions: [
      "¿Qué tan claro tengo quién soy cuando lidero?",
      "¿Reconozco mis fortalezas y mis patrones bajo presión?",
      "¿Mi forma de liderar refleja mis valores o actúo principalmente desde lo que creo que otros esperan de mí?",
      "¿Puedo reconocer cuándo mi ego, miedo o necesidad de control están influyendo en mis decisiones?",
    ],
  },
  {
    id: "energy",
    name: "Gestión personal, energía y bienestar",
    shortName: "Energía y bienestar",
    description:
      "Gestionar tu energía, atención, emociones, límites y recuperación para poder sostener tu liderazgo en el tiempo. Bienestar no es comodidad: es lo que te permite sostener resultados de manera saludable.",
    guidingQuestions: [
      "¿Cómo llego emocional y mentalmente a las conversaciones importantes?",
      "¿Puedo reconocer cuándo estoy funcionando desde el agotamiento o el estrés?",
      "¿Tengo espacios para pensar, recuperar energía y desconectar?",
      "¿Mi forma actual de trabajar es sostenible?",
    ],
  },
  {
    id: "clarity",
    name: "Claridad, prioridades y toma de decisiones",
    shortName: "Claridad y decisiones",
    description:
      "Distinguir lo importante de lo urgente, construir dirección y tomar decisiones aun cuando no existe información perfecta.",
    guidingQuestions: [
      "¿Tengo claridad sobre qué necesita realmente mi atención?",
      "¿Puedo priorizar o siento que todo es urgente?",
      "¿Tomo decisiones con suficiente claridad aun en contextos inciertos?",
      "¿Estoy trabajando estratégicamente o principalmente reaccionando?",
    ],
  },
  {
    id: "communication",
    name: "Comunicación y escucha",
    shortName: "Comunicación y escucha",
    description:
      "Comunicar con claridad y desarrollar una escucha capaz de comprender perspectivas, necesidades y contexto.",
    guidingQuestions: [
      "¿Expreso expectativas con claridad?",
      "¿Escucho para comprender o principalmente para responder?",
      "¿Adapto mi comunicación a diferentes personas?",
      "¿Creo espacios donde otros puedan expresar desacuerdos o inquietudes?",
    ],
  },
  {
    id: "trust",
    name: "Confianza y calidad de las relaciones",
    shortName: "Confianza y relaciones",
    description:
      "Construir relaciones en las que exista credibilidad, respeto, apertura y posibilidad de trabajar con diferencias.",
    guidingQuestions: [
      "¿Las personas pueden hablar conmigo de problemas antes de que se vuelvan grandes?",
      "¿Genero confianza a través de coherencia entre lo que digo y hago?",
      "¿Cómo reacciono cuando alguien piensa diferente?",
      "¿Las relaciones que construyo facilitan o dificultan los resultados?",
    ],
  },
  {
    id: "delegation",
    name: "Delegación y desarrollo de otras personas",
    shortName: "Delegación y desarrollo",
    description:
      "Salir del “hacerlo todo” para crear autonomía, desarrollar capacidades y permitir que otras personas crezcan.",
    note: "Si hoy no tenés personas a cargo, pensá esta capacidad como colaboración, generación de autonomía e influencia en otros.",
    guidingQuestions: [
      "¿Delego responsabilidad real o solamente tareas?",
      "¿Me cuesta soltar control?",
      "¿Permito que otras personas encuentren sus propias soluciones?",
      "¿Ayudo a otros a crecer o termino resolviendo por ellos?",
    ],
  },
  {
    id: "feedback",
    name: "Feedback, conversaciones difíciles y conflicto",
    shortName: "Feedback y conflicto",
    description:
      "Abordar conversaciones necesarias con claridad, respeto y oportunidad, incluso cuando resultan incómodas.",
    guidingQuestions: [
      "¿Doy feedback cuando es necesario o lo postergo?",
      "¿Puedo conversar sobre desempeño sin atacar a la persona?",
      "¿Cómo reacciono frente al conflicto?",
      "¿Soy capaz de escuchar feedback sobre mi propio liderazgo?",
    ],
  },
  {
    id: "adaptability",
    name: "Adaptabilidad, influencia y orientación a resultados",
    shortName: "Adaptabilidad y resultados",
    description:
      "Moverte con flexibilidad frente al cambio, generar influencia y mantener foco en resultados sin perder de vista a las personas.",
    guidingQuestions: [
      "¿Cómo respondo cuando cambia el contexto?",
      "¿Puedo influir sin depender únicamente de autoridad formal?",
      "¿Ayudo a otros a atravesar incertidumbre y cambio?",
      "¿Puedo sostener resultados sin convertir la presión permanente en la forma normal de trabajar, o estoy resolviendo solamente el corto plazo?",
    ],
  },
]

export const CUSTOM_GUIDING_QUESTIONS = [
  "¿Cómo se ve hoy esta capacidad en tu forma de liderar? Pensá en una situación reciente.",
  "¿Cuándo aparece con más fuerza y cuándo se te hace más difícil sostenerla?",
  "¿Qué impacto tiene en vos y en las personas con las que trabajás?",
]

/* ------------------------------------------------------------------ */
/*  Ideas para el radar personalizado                                  */
/* ------------------------------------------------------------------ */

export const IDEA_CATEGORIES: { title: string; items: string[] }[] = [
  {
    title: "Liderarme",
    items: [
      "Autoconocimiento",
      "Autenticidad",
      "Regulación emocional",
      "Confianza personal",
      "Gestión de energía",
      "Adaptabilidad",
      "Resiliencia",
      "Organización",
    ],
  },
  {
    title: "Liderar relaciones",
    items: [
      "Escucha",
      "Empatía",
      "Comunicación",
      "Feedback",
      "Confianza",
      "Manejo de conflictos",
      "Influencia",
      "Colaboración",
    ],
  },
  {
    title: "Liderar personas",
    items: [
      "Delegación",
      "Desarrollo de personas",
      "Motivación",
      "Acompañamiento",
      "Generación de autonomía",
      "Construcción de equipos",
    ],
  },
  {
    title: "Liderar resultados",
    items: [
      "Visión",
      "Priorización",
      "Pensamiento estratégico",
      "Toma de decisiones",
      "Accountability",
      "Orientación a resultados",
      "Gestión del cambio",
      "Innovación",
    ],
  },
]

/* ------------------------------------------------------------------ */
/*  Reflexión sobre el resultado                                       */
/* ------------------------------------------------------------------ */

export interface QuestionGroup {
  id: string
  title: string
  questions: { id: string; text: string }[]
}

export const REFLECTION_GROUPS: QuestionGroup[] = [
  {
    id: "whole",
    title: "Mirando el conjunto…",
    questions: [
      { id: "whole-1", text: "¿Qué es lo primero que te llama la atención?" },
      { id: "whole-2", text: "¿Qué resultado te sorprende?" },
      { id: "whole-3", text: "¿Dónde aparece mayor equilibrio?" },
      { id: "whole-4", text: "¿Dónde sentís mayor tensión?" },
    ],
  },
  {
    id: "strengths",
    title: "Sobre tus fortalezas…",
    questions: [
      {
        id: "strengths-1",
        text: "¿Qué capacidades ya tenés y quizás no estabas reconociendo?",
      },
      {
        id: "strengths-2",
        text: "¿Cómo podrías apoyarte en ellas para desarrollar otras áreas?",
      },
    ],
  },
  {
    id: "gaps",
    title: "Sobre tus brechas…",
    questions: [
      {
        id: "gaps-1",
        text: "¿Cuál de estas brechas tiene hoy mayor impacto en vos?",
      },
      {
        id: "gaps-2",
        text: "¿Cuál tiene mayor impacto en las personas con las que trabajás?",
      },
      {
        id: "gaps-3",
        text: "¿Cuál tiene mayor impacto sobre tus resultados?",
      },
    ],
  },
  {
    id: "deeper",
    title: "Mirando más profundo…",
    questions: [
      {
        id: "deeper-1",
        text: "¿Qué patrón aparece detrás de esta situación?",
      },
      {
        id: "deeper-2",
        text: "¿Qué estás haciendo, evitando o sosteniendo que contribuye a que esto siga igual?",
      },
      {
        id: "deeper-3",
        text: "¿Qué necesitás empezar a hacer diferente?",
      },
      {
        id: "deeper-4",
        text: "¿Hay algo que necesites dejar de hacer?",
      },
    ],
  },
]

/* ------------------------------------------------------------------ */
/*  El líder que quiero ser                                            */
/* ------------------------------------------------------------------ */

export const LEADER_QUESTIONS: { id: string; text: string }[] = [
  { id: "leader-1", text: "¿Cómo querés sentirte al liderar?" },
  {
    id: "leader-2",
    text: "¿Cómo querés que las personas se sientan trabajando con vos?",
  },
  {
    id: "leader-3",
    text: "¿Qué querés que sea diferente en tu forma de decidir?",
  },
  { id: "leader-4", text: "¿Qué comportamiento querés fortalecer?" },
  { id: "leader-5", text: "¿Qué comportamiento querés dejar atrás?" },
  {
    id: "leader-6",
    text: "¿Qué querés sostener incluso cuando haya presión?",
  },
  {
    id: "leader-7",
    text: "¿Qué significa para vos obtener resultados de una manera sostenible?",
  },
  {
    id: "leader-8",
    text: "¿Qué parte de tu autenticidad querés expresar más en tu liderazgo?",
  },
]

/* ------------------------------------------------------------------ */
/*  Acción                                                             */
/* ------------------------------------------------------------------ */

export const ACTION_QUESTIONS: { id: keyof ActionPlan; text: string }[] = [
  {
    id: "weekAction",
    text: "¿Qué acción concreta podrías tomar durante los próximos 7 días?",
  },
  { id: "conversation", text: "¿Qué conversación necesitás tener?" },
  { id: "practice", text: "¿Qué comportamiento querés practicar?" },
  { id: "stopDoing", text: "¿Qué vas a dejar de hacer?" },
  { id: "obstacle", text: "¿Qué podría dificultarlo?" },
  { id: "support", text: "¿Qué apoyo necesitás?" },
]

/* ------------------------------------------------------------------ */
/*  Enlaces                                                            */
/* ------------------------------------------------------------------ */

export const COACHING_HREF = "/servicios/coaching-ejecutivo"
export const CALENDAR_HREF =
  "https://calendly.com/johanapaolarios/coaching-con-joha"
