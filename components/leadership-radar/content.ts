import type { ActionPlan, DimensionId, Phase } from "./types"

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

export const SKILLS_COUNT = 8
export const MAX_PRIORITIES = 3
export const INITIAL_QUESTIONS = 3

/* ------------------------------------------------------------------ */
/*  Pasos del recorrido                                                */
/* ------------------------------------------------------------------ */

export const STEPS: { phase: Phase; label: string }[] = [
  { phase: "define", label: "Tus capacidades" },
  { phase: "assess", label: "Autoevaluación" },
  { phase: "radar", label: "Tu radar" },
  { phase: "choice", label: "Qué sigue" },
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
/*  Las cuatro relaciones del liderazgo                                */
/* ------------------------------------------------------------------ */

export interface Dimension {
  id: DimensionId
  /** Nombre corto de la dimensión, ej. "Liderarme" */
  name: string
  /** Ej. "Relación conmigo" */
  relation: string
  /** Ej. "La relación conmigo." */
  tagline: string
  /** Ej. "Conmigo" (para títulos de resultado y modelo) */
  modelLabel: string
  modelSummary: string
  description: string
  triggerTitle: string
  triggerQuestion: string
  /** Preguntas generales que se suman al profundizar en capacidades propias */
  questions: string[]
  ideas: string[]
}

export const RELATIONS_INTRO =
  "Tu liderazgo se expresa en distintas relaciones: la que construís con vos mismo, con las personas, con el contexto que te toca atravesar y con los resultados que buscás generar."

export const RELATIONS_FLOW =
  "Lo que sucede en vos influye en cómo te relacionás. Cómo te relacionás influye en la manera en que atravesás el contexto y coordinás acciones. Todo eso termina impactando en los resultados que construís. No es una fórmula: es un marco para reflexionar."

export const DIMENSIONS: Dimension[] = [
  {
    id: "self",
    name: "Liderarme",
    relation: "Relación conmigo",
    tagline: "La relación conmigo.",
    modelLabel: "Conmigo",
    modelSummary: "Cómo me conozco y me lidero.",
    description:
      "Cómo me conozco, me gestiono y respondo frente a lo que me sucede impacta directamente en mi forma de liderar.",
    triggerTitle: "Pensá en tu relación con vos",
    triggerQuestion: "¿Qué capacidades necesitás para liderarte mejor?",
    questions: [
      "¿Qué conozco sobre mi forma de reaccionar cuando estoy bajo presión?",
      "¿Qué patrones aparecen con más frecuencia cuando lidero?",
      "¿Cuánto espacio tengo para detenerme y elegir cómo responder?",
      "¿Estoy liderando de una manera coherente con mis valores?",
      "¿Cómo estoy gestionando mi energía para sostener este rol?",
      "¿Qué relación tengo con equivocarme, no saber o pedir ayuda?",
    ],
    ideas: [
      "Autoconocimiento",
      "Autenticidad",
      "Regulación emocional",
      "Confianza personal",
      "Gestión de energía",
      "Bienestar",
      "Gestión del tiempo",
      "Prioridades personales",
      "Organización personal",
      "Relación con el error",
      "Resiliencia",
      "Conciencia de patrones",
      "Gestión del estrés",
      "Pausa y reflexión",
    ],
  },
  {
    id: "others",
    name: "Liderar con otros",
    relation: "Relación con los demás",
    tagline: "La relación con los demás.",
    modelLabel: "Con los demás",
    modelSummary: "Cómo construyo relaciones y coordino con otros.",
    description:
      "Cómo escuchamos, conversamos, construimos confianza y coordinamos con otros determina buena parte de nuestra capacidad de liderar.",
    triggerTitle: "Pensá en tu relación con otros",
    triggerQuestion: "¿Qué capacidades necesitás para construir relaciones y trabajar con personas?",
    questions: [
      "¿Cómo se sienten otras personas al conversar conmigo?",
      "¿Escucho para comprender o principalmente para responder?",
      "¿Puedo construir confianza incluso cuando existen diferencias?",
      "¿Qué tan claramente coordino expectativas, pedidos y compromisos?",
      "¿Permito autonomía o tiendo a controlar?",
      "¿Cómo reacciono ante desacuerdos o conflictos?",
      "¿Ayudo a otros a desarrollar capacidades o termino resolviendo por ellos?",
    ],
    ideas: [
      "Escucha",
      "Empatía",
      "Comunicación",
      "Confianza",
      "Feedback",
      "Feedforward",
      "Conversaciones difíciles",
      "Gestión de conflictos",
      "Influencia",
      "Colaboración",
      "Coordinación de acciones",
      "Delegación",
      "Desarrollo de personas",
      "Acompañamiento",
      "Motivación",
      "Generación de autonomía",
      "Construcción de equipos",
      "Reconocimiento",
      "Manejo de expectativas",
      "Alineación",
    ],
  },
  {
    id: "context",
    name: "Liderar en contexto",
    relation: "Relación con el contexto",
    tagline: "La relación con el contexto.",
    modelLabel: "Con el contexto",
    modelSummary: "Cómo interpreto y respondo a la realidad.",
    description:
      "No siempre podemos elegir lo que sucede, pero sí desarrollar nuestra capacidad para interpretar el contexto, adaptarnos y decidir cómo responder.",
    triggerTitle: "Pensá en tu relación con el contexto",
    triggerQuestion: "¿Qué capacidades necesitás para responder frente al cambio, la presión y la incertidumbre?",
    questions: [
      "¿Cómo reacciono cuando la realidad no coincide con lo que esperaba?",
      "¿Qué sucede conmigo cuando cambian las reglas o prioridades?",
      "¿Puedo distinguir qué puedo controlar y qué no?",
      "¿Me adapto sin perder dirección?",
      "¿Qué historias o interpretaciones construyo frente a la incertidumbre?",
      "¿Puedo ayudar a otros a atravesar contextos de cambio?",
      "¿Soy capaz de aprender y ajustar mi forma de actuar cuando el contexto lo requiere?",
    ],
    ideas: [
      "Lectura de contexto",
      "Adaptabilidad",
      "Flexibilidad",
      "Gestión de la incertidumbre",
      "Gestión del cambio",
      "Manejo de la presión",
      "Aprendizaje",
      "Toma de perspectiva",
      "Apertura",
      "Curiosidad",
      "Capacidad de reformular",
      "Aprender del error",
      "Respuesta ante imprevistos",
      "Navegación de la complejidad",
      "Pensamiento sistémico",
    ],
  },
  {
    id: "results",
    name: "Liderar resultados",
    relation: "Relación con los resultados",
    tagline: "La relación con los resultados.",
    modelLabel: "Con los resultados",
    modelSummary: "Cómo transformo intención en resultados sostenibles.",
    description:
      "Liderar también implica transformar intención en decisiones, coordinación y acción para construir resultados que puedan sostenerse en el tiempo.",
    triggerTitle: "Pensá en tu relación con los resultados",
    triggerQuestion: "¿Qué capacidades necesitás para transformar intención en resultados?",
    questions: [
      "¿Tengo claridad sobre qué resultado estoy buscando?",
      "¿Puedo distinguir lo importante de lo urgente?",
      "¿Transformo ideas en decisiones y acciones?",
      "¿Genero claridad respecto de responsabilidades y compromisos?",
      "¿Hago seguimiento sin caer en el control excesivo?",
      "¿Qué costo tiene actualmente la forma en la que estoy obteniendo resultados?",
      "¿Los resultados que construyo son sostenibles para mí y para los demás?",
      "¿Puedo sostener buen desempeño sin instalar la urgencia como forma permanente de trabajar?",
    ],
    ideas: [
      "Visión",
      "Claridad",
      "Pensamiento estratégico",
      "Claridad de prioridades",
      "Toma de decisiones",
      "Planificación",
      "Ejecución",
      "Seguimiento",
      "Foco",
      "Responsabilidad",
      "Compromiso",
      "Coordinación de recursos",
      "Orientación a resultados",
      "Medición",
      "Innovación",
      "Resolución de problemas",
      "Capacidad de cierre",
      "Gestión de objetivos",
      "Decisiones bajo incertidumbre",
    ],
  },
]

export function getDimension(id: DimensionId | null | undefined): Dimension | null {
  if (!id) return null
  return DIMENSIONS.find((d) => d.id === id) ?? null
}

/* ------------------------------------------------------------------ */
/*  Portada                                                            */
/* ------------------------------------------------------------------ */

export const HOW_IT_WORKS = [
  {
    title: "Elegí tus capacidades",
    description: "Partí de 8 capacidades ya pensadas o definí las tuyas.",
  },
  {
    title: "Reflexioná y evaluá",
    description:
      "Para cada capacidad, primero pensá y escribí lo que observás. Después elegí dónde estás hoy y dónde querés estar.",
  },
  {
    title: "Mirá tu radar",
    description: "Observá fortalezas, desequilibrios y brechas desde las cuatro relaciones del liderazgo.",
  },
  {
    title: "Elegí dónde crecer",
    description: "Definí prioridades y transformalas en un próximo paso concreto.",
  },
]

export const MODES = {
  guided: {
    title: "Empezar con una guía",
    badge: "Recomendado para empezar",
    description:
      "Explorá 8 capacidades clave para un liderazgo humano, efectivo y sostenible. Vas a poder reflexionar sobre cada una y evaluar cómo sentís que las estás desarrollando hoy.",
    forWhoTitle: "Es especialmente útil si:",
    forWho: [
      "No sabés por dónde empezar.",
      "Todavía no tenés identificado qué capacidades querés desarrollar.",
      "Querés una referencia inicial para observar tu liderazgo.",
    ],
    cta: "Comenzar Radar Guiado",
  },
  custom: {
    title: "Crear mi propio Radar",
    badge: "Para profundizar",
    description:
      "Definí vos mismo las capacidades que querés observar y construí una evaluación adaptada a tu propia visión de liderazgo.",
    footnote: "Tu liderazgo no tiene por qué parecerse al de otra persona.",
    cta: "Crear Radar Personalizado",
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
  dimension: DimensionId
  /** Las primeras INITIAL_QUESTIONS se ven siempre; el resto aparece con “Quiero profundizar”. */
  guidingQuestions: string[]
}

export const GUIDED_SKILLS: SkillTemplate[] = [
  {
    id: "self",
    dimension: "self",
    name: "Autoconocimiento y autenticidad",
    shortName: "Autoconocimiento",
    description:
      "Reconocer fortalezas, límites, valores, patrones y emociones para liderar con mayor conciencia y coherencia.",
    guidingQuestions: [
      "¿Qué tan claro tengo quién soy cuando lidero?",
      "¿Reconozco mis fortalezas y mis patrones bajo presión?",
      "¿Mi forma de liderar refleja mis valores o actúo principalmente desde lo que creo que otros esperan de mí?",
      "¿Puedo reconocer cuándo mi ego, miedo o necesidad de control están influyendo en mis decisiones?",
      "¿Qué patrones aparecen con más frecuencia cuando lidero?",
      "¿Qué relación tengo con equivocarme, no saber o pedir ayuda?",
    ],
  },
  {
    id: "energy",
    dimension: "self",
    name: "Gestión personal, energía y bienestar",
    shortName: "Energía y bienestar",
    description:
      "Gestionar energía, atención, tiempo, estrés y recuperación para sostener el liderazgo en el tiempo. Bienestar no es comodidad: es lo que te permite sostener resultados de manera saludable.",
    guidingQuestions: [
      "¿Cómo llego emocional y mentalmente a las conversaciones importantes?",
      "¿Puedo reconocer cuándo estoy funcionando desde el agotamiento o el estrés?",
      "¿Tengo espacios para pensar, recuperar energía y desconectar?",
      "¿Mi forma actual de trabajar es sostenible?",
      "¿Cuánto espacio tengo para detenerme y elegir cómo responder?",
    ],
  },
  {
    id: "communication",
    dimension: "others",
    name: "Comunicación, escucha y confianza",
    shortName: "Comunicación y confianza",
    description:
      "Construir relaciones de calidad a través de comunicación clara, escucha, apertura y coherencia.",
    guidingQuestions: [
      "¿Expreso expectativas con claridad?",
      "¿Escucho para comprender o principalmente para responder?",
      "¿Las personas pueden hablar conmigo de problemas antes de que se vuelvan grandes?",
      "¿Genero confianza a través de coherencia entre lo que digo y hago?",
      "¿Creo espacios donde otros puedan expresar desacuerdos o inquietudes?",
      "¿Puedo construir confianza incluso cuando existen diferencias?",
    ],
  },
  {
    id: "coordination",
    dimension: "others",
    name: "Coordinación y desarrollo de otros",
    shortName: "Coordinación y desarrollo",
    description:
      "Coordinar acciones, generar autonomía, acompañar, delegar y desarrollar capacidades en otras personas. Incluye dar feedback, tener conversaciones difíciles y gestionar conflictos.",
    note: "Si hoy no tenés personas a cargo, pensá esta capacidad como colaboración, generación de autonomía e influencia en otros.",
    guidingQuestions: [
      "¿Delego responsabilidad real o solamente tareas?",
      "¿Qué tan claramente coordino expectativas, pedidos y compromisos?",
      "¿Ayudo a otros a crecer o termino resolviendo por ellos?",
      "¿Doy feedback cuando es necesario o lo postergo?",
      "¿Cómo reacciono frente a un conflicto o desacuerdo?",
      "¿Soy capaz de escuchar feedback sobre mi propio liderazgo?",
    ],
  },
  {
    id: "adaptability",
    dimension: "context",
    name: "Adaptabilidad y gestión de la incertidumbre",
    shortName: "Adaptabilidad",
    description:
      "Responder con flexibilidad ante cambios, incertidumbre y situaciones que no pueden controlarse completamente.",
    guidingQuestions: [
      "¿Cómo reacciono cuando la realidad no coincide con lo que esperaba?",
      "¿Qué sucede conmigo cuando cambian las reglas o prioridades?",
      "¿Puedo distinguir qué puedo controlar y qué no?",
      "¿Me adapto sin perder dirección?",
      "¿Qué historias o interpretaciones construyo frente a la incertidumbre?",
      "¿Puedo ayudar a otros a atravesar contextos de cambio?",
    ],
  },
  {
    id: "perspective",
    dimension: "context",
    name: "Perspectiva y aprendizaje",
    shortName: "Perspectiva y aprendizaje",
    description:
      "Leer el contexto, ampliar perspectivas, revisar interpretaciones y aprender de nuevas circunstancias.",
    guidingQuestions: [
      "¿Qué estoy dejando de ver de lo que pasa a mi alrededor?",
      "¿Puedo mirar una situación desde el punto de vista de otras personas o áreas?",
      "¿Soy capaz de aprender y ajustar mi forma de actuar cuando el contexto lo requiere?",
      "¿Qué aprendí de mi último error o desacierto?",
      "¿Revisé últimamente alguna interpretación que daba por cierta?",
      "¿Qué curiosidad tengo hoy por entender algo nuevo de mi contexto?",
    ],
  },
  {
    id: "clarity",
    dimension: "results",
    name: "Claridad, prioridades y decisiones",
    shortName: "Claridad y decisiones",
    description:
      "Construir dirección, distinguir prioridades y tomar decisiones aun sin contar con información perfecta.",
    guidingQuestions: [
      "¿Tengo claridad sobre qué resultado estoy buscando?",
      "¿Puedo distinguir lo importante de lo urgente o siento que todo es urgente?",
      "¿Tomo decisiones con suficiente claridad aun en contextos inciertos?",
      "¿Estoy trabajando estratégicamente o principalmente reaccionando?",
      "¿Tengo claridad sobre qué necesita realmente mi atención?",
    ],
  },
  {
    id: "execution",
    dimension: "results",
    name: "Ejecución y resultados sostenibles",
    shortName: "Ejecución y resultados",
    description:
      "Transformar decisiones en acción, coordinar compromisos y construir resultados sin perder de vista su impacto sobre las personas y su sostenibilidad.",
    guidingQuestions: [
      "¿Transformo ideas en decisiones y acciones?",
      "¿Genero claridad respecto de responsabilidades y compromisos?",
      "¿Hago seguimiento sin caer en el control excesivo?",
      "¿Qué costo tiene actualmente la forma en la que estoy obteniendo resultados?",
      "¿Los resultados que construyo son sostenibles para mí y para los demás?",
      "¿Puedo sostener buen desempeño sin instalar la urgencia como forma permanente de trabajar?",
    ],
  },
]

export const CUSTOM_GUIDING_QUESTIONS = [
  "¿Cómo se ve hoy esta capacidad en tu forma de liderar? Pensá en una situación reciente.",
  "¿Cuándo aparece con más fuerza y cuándo se te hace más difícil sostenerla?",
  "¿Qué impacto tiene en vos y en las personas con las que trabajás?",
]

/* ------------------------------------------------------------------ */
/*  Reflexión sobre el resultado                                       */
/* ------------------------------------------------------------------ */

export interface QuestionGroup {
  id: string
  title: string
  intro?: string
  questions: { id: string; text: string; dimension?: DimensionId }[]
}

export const REFLECTION_GROUPS: QuestionGroup[] = [
  {
    id: "whole",
    title: "Mirando el conjunto…",
    questions: [
      { id: "whole-1", text: "¿Qué es lo primero que te llama la atención?" },
      { id: "whole-2", text: "¿Qué resultado te sorprende?" },
      { id: "whole-3", text: "¿Dónde aparece mayor equilibrio y dónde sentís mayor tensión?" },
    ],
  },
  {
    id: "relations",
    title: "Desde cada relación…",
    intro: "Una pregunta para cada una de las cuatro relaciones de tu liderazgo.",
    questions: [
      {
        id: "relations-self",
        dimension: "self",
        text: "¿Qué de tu propia forma de liderarte está ayudando o dificultando tu liderazgo hoy?",
      },
      {
        id: "relations-others",
        dimension: "others",
        text: "¿Qué impacto puede estar teniendo tu manera de relacionarte sobre las personas con las que trabajás?",
      },
      {
        id: "relations-context",
        dimension: "context",
        text: "¿Cómo estás respondiendo frente a aquello que hoy no podés controlar?",
      },
      {
        id: "relations-results",
        dimension: "results",
        text: "¿La forma en la que estás obteniendo resultados es la forma en la que querés seguir obteniéndolos?",
      },
    ],
  },
  {
    id: "strengths-gaps",
    title: "Fortalezas y brechas…",
    questions: [
      {
        id: "strengths-1",
        text: "¿Qué capacidades ya tenés y quizás no estabas reconociendo?",
      },
      {
        id: "strengths-2",
        text: "¿Cómo podrías apoyarte en ellas para desarrollar otras áreas?",
      },
      {
        id: "gaps-1",
        text: "¿Cuál de estas brechas tiene hoy mayor impacto en vos, en las personas con las que trabajás o en tus resultados?",
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
  {
    id: "four-relations",
    title: "Mirando las cuatro relaciones…",
    questions: [
      { id: "four-1", text: "¿Cuál sentís más sólida?" },
      { id: "four-2", text: "¿Cuál necesita más atención?" },
      { id: "four-3", text: "¿Dónde tendría mayor impacto un pequeño cambio?" },
      { id: "four-4", text: "¿Qué relación querés empezar a trabajar primero?" },
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
