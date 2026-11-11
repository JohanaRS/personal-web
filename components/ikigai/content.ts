export type DimensionId = "love" | "good" | "need" | "paid"
export type IntersectionId = "passion" | "mission" | "profession" | "vocation"

export interface Field {
  id: string
  label: string
}

export interface Dimension {
  id: DimensionId
  name: string
  diagramTitle: string
  intro: string
  questions: Field[]
  note?: string
  keywords: Field
}

export interface Intersection {
  id: IntersectionId
  name: string
  formula: string
  question: string
  dimensions: [DimensionId, DimensionId]
}

export interface CompassCard {
  id: string
  title: string
  fields: [Field, Field]
}

export const SITE_URL = "https://www.joharios.com"
export const SITE_LABEL = "www.joharios.com"
export const BOOKING_URL = "https://calendly.com/johanapaolarios/coaching-con-joha"
export const BRAND_LINE = "Johana Ríos · Coaching y desarrollo profesional"
export const DISCLAIMER = "Recurso de reflexión personal y profesional"
export const PRIVACY_NOTE = "Tus respuestas se guardan únicamente en este dispositivo. No se envían a ningún servidor."

export const STAGES = [
  { id: "frame", label: "Encuadre" },
  { id: "love", label: "Lo que amo" },
  { id: "good", label: "Lo que hago bien" },
  { id: "need", label: "Necesidades que puedo atender" },
  { id: "paid", label: "Por lo que pueden pagarme" },
  { id: "intersections", label: "Intersecciones y propósito" },
  { id: "compass", label: "Brújula profesional" },
  { id: "closing", label: "Cierre y próximos pasos" },
  { id: "synthesis", label: "Mi Ikigai profesional" },
] as const

export type StageId = (typeof STAGES)[number]["id"]

export const FRAME_FIELDS = {
  name: { id: "frame.name", label: "Nombre" },
  date: { id: "frame.date", label: "Fecha" },
}

export const DIMENSIONS: Dimension[] = [
  {
    id: "love",
    name: "Lo que amo",
    diagramTitle: "Lo que amo",
    intro: "Actividades, temas y contextos que despiertan energía genuina, curiosidad o disfrute.",
    questions: [
      { id: "love.q1", label: "¿Qué actividades profesionales disfrutás incluso cuando son desafiantes?" },
      { id: "love.q2", label: "¿Qué temas te dan ganas de aprender, investigar o conversar?" },
      { id: "love.q3", label: "¿En qué momentos recientes sentiste entusiasmo o orgullo profesional?" },
      {
        id: "love.q4",
        label: "¿Qué parte de tu trabajo seguirías eligiendo si no tuvieras que demostrarle nada a nadie?",
      },
    ],
    keywords: { id: "love.keywords", label: "Palabras que resumen esta dimensión" },
  },
  {
    id: "good",
    name: "Lo que hago bien",
    diagramTitle: "Lo que hago bien",
    intro: "Capacidades naturales y desarrolladas, respaldadas por experiencias y por la mirada de otras personas.",
    questions: [
      { id: "good.q1", label: "¿Qué resolvés con facilidad que a otras personas les cuesta?" },
      { id: "good.q2", label: "¿Qué devoluciones positivas se repiten sobre vos?" },
      { id: "good.q3", label: "¿Qué logro muestra mejor tu manera de aportar valor?" },
      { id: "good.q4", label: "¿Qué combinación de habilidades te diferencia?" },
    ],
    note: "Que algo te resulte natural no significa que sea común. A veces el talento propio se vuelve invisible por familiaridad.",
    keywords: { id: "good.keywords", label: "Fortalezas que quiero llevar a mi próxima etapa" },
  },
  {
    id: "need",
    name: "Necesidades que puedo atender",
    diagramTitle: "Necesidades que puedo atender",
    intro: "Problemas que vale la pena resolver, personas a quienes servir y cambios que deseo impulsar.",
    questions: [
      { id: "need.q1", label: "¿Qué problemas de organizaciones, equipos o usuarios te importa resolver?" },
      { id: "need.q2", label: "¿A quiénes querés ayudar con tu trabajo?" },
      { id: "need.q3", label: "¿Qué cambio concreto querés que exista después de tu intervención?" },
      { id: "need.q4", label: "¿Qué problema elegirías no resolver, aunque puedas?" },
    ],
    note: "Generar impacto no implica cargar con todos los problemas. También elegís dónde termina tu responsabilidad.",
    keywords: { id: "need.keywords", label: "Ámbitos de impacto que más me importan" },
  },
  {
    id: "paid",
    name: "Por lo que pueden pagarme",
    diagramTitle: "Por lo que pueden pagarme",
    intro: "Formas concretas en que el mercado necesita, reconoce y remunera el valor que ofrecés.",
    questions: [
      { id: "paid.q1", label: "¿Qué resultados concretos podría una organización pagarte por producir?" },
      { id: "paid.q2", label: "¿Qué roles o formatos podrían contener ese aporte?" },
      { id: "paid.q3", label: "¿Qué señales muestran que ese valor tiene demanda?" },
      {
        id: "paid.q4",
        label: "¿Qué necesitás aprender, actualizar o demostrar para acceder a esas oportunidades?",
      },
      {
        id: "paid.q5",
        label: "¿Qué no necesitás dominar personalmente, pero sí saber liderar, evaluar o delegar?",
      },
    ],
    keywords: { id: "paid.keywords", label: "Oportunidades o formatos que quiero explorar" },
  },
]

export const DIMENSION_BY_ID = Object.fromEntries(DIMENSIONS.map((d) => [d.id, d])) as Record<DimensionId, Dimension>

export const INTERSECTIONS: Intersection[] = [
  {
    id: "passion",
    name: "Pasión",
    formula: "amo + hago bien",
    question: "¿Qué actividad combina disfrute y maestría?",
    dimensions: ["love", "good"],
  },
  {
    id: "mission",
    name: "Misión",
    formula: "amo + hace falta",
    question: "¿Qué causa, problema o cambio me importa impulsar?",
    dimensions: ["love", "need"],
  },
  {
    id: "profession",
    name: "Profesión",
    formula: "hago bien + pueden pagarme",
    question: "¿Dónde se vuelve valiosa mi combinación de capacidades?",
    dimensions: ["good", "paid"],
  },
  {
    id: "vocation",
    name: "Vocación",
    formula: "hace falta + pueden pagarme",
    question: "¿Qué necesidad real puede transformarse en una oportunidad sostenible?",
    dimensions: ["need", "paid"],
  },
]

export const intersectionFieldId = (id: IntersectionId) => `intersection.${id}`

export const PURPOSE_FIELD: Field = { id: "purpose.hypothesis", label: "Mi hipótesis de propósito profesional" }

export const PURPOSE_TEMPLATES = [
  "Quiero usar mis capacidades para… con el fin de generar… en contextos que me permitan…",
  "Conecto lo que sé hacer con el problema que me importa para ayudar a…",
  "Mi mejor aporte aparece cuando hago… para… de una manera que también cuida…",
]

export const COMPASS: CompassCard[] = [
  {
    id: "congruence",
    title: "Congruencia",
    fields: [
      { id: "compass.congruence.yes", label: "Una oportunidad es congruente conmigo cuando…" },
      { id: "compass.congruence.no", label: "Señales de que una oportunidad no es congruente conmigo…" },
    ],
  },
  {
    id: "sufficiency",
    title: "Suficiencia",
    fields: [
      { id: "compass.sufficiency.enough", label: "Para mí, cumplir bien significa…" },
      {
        id: "compass.sufficiency.overgiving",
        label: "Voy a notar que estoy dando de más para demostrar mi valor cuando…",
      },
    ],
  },
  {
    id: "reciprocity",
    title: "Reciprocidad",
    fields: [
      { id: "compass.reciprocity.offer", label: "Estoy dispuesto/a a ofrecer…" },
      { id: "compass.reciprocity.receive", label: "Para poder sostenerlo, necesito recibir…" },
    ],
  },
  {
    id: "nonNegotiables",
    title: "No negociables",
    fields: [
      { id: "compass.nonNegotiables.minimum", label: "Mis condiciones mínimas de bienestar y trabajo son…" },
      { id: "compass.nonNegotiables.alerts", label: "Mis señales de alerta tempranas son…" },
    ],
  },
]

export const COMPASS_TIP =
  "Convertí los valores abstractos en señales observables. ¿Cómo reconocerías estas condiciones durante una entrevista o en los primeros 90 días?"

export const CLOSING_FIELDS: Field[] = [
  { id: "closing.surprise", label: "La idea que más me sorprendió fue…" },
  { id: "closing.question", label: "La pregunta que todavía necesito explorar es…" },
  { id: "closing.experiment", label: "Una conversación o experimento que puedo realizar en las próximas dos semanas…" },
  { id: "closing.signal", label: "La señal concreta que voy a observar será…" },
]

export const NEXT_STEP_FIELDS = {
  step: { id: "closing.nextStep", label: "Mi próximo paso: pequeño, observable y con fecha" },
  date: { id: "closing.nextStepDate", label: "Fecha" },
}

export const HOW_IT_WORKS = [
  {
    title: "Explorá",
    description: "Respondé preguntas guiadas sobre las cuatro dimensiones, a tu ritmo y en el orden que necesites.",
  },
  {
    title: "Reconocé patrones",
    description: "Mirá juntas tus palabras clave y buscá dónde se cruzan disfrute, capacidad, aporte y viabilidad.",
  },
  {
    title: "Construí tu brújula",
    description: "Definí criterios de congruencia, suficiencia, reciprocidad y tus no negociables.",
  },
  {
    title: "Visualizá tu Ikigai",
    description: "Obtené un diagrama personalizado con tus propias palabras, listo para descargar e imprimir.",
  },
  {
    title: "Definí un próximo paso",
    description: "Cerrá con una acción pequeña, observable y con fecha para poner a prueba tu hipótesis.",
  },
]

export const CLOSING_MESSAGE =
  "Tu Ikigai profesional no es una definición cerrada. Es una hipótesis viva que podés revisar a medida que aprendés, experimentás y elegís nuevas formas de aportar valor."

/** Every field that counts towards progress (name and date are optional framing). */
export const PROGRESS_FIELD_IDS: string[] = [
  ...DIMENSIONS.flatMap((d) => [...d.questions.map((q) => q.id), d.keywords.id]),
  ...INTERSECTIONS.map((i) => intersectionFieldId(i.id)),
  PURPOSE_FIELD.id,
  ...COMPASS.flatMap((c) => c.fields.map((f) => f.id)),
  ...CLOSING_FIELDS.map((f) => f.id),
  NEXT_STEP_FIELDS.step.id,
]

export const STAGE_FIELD_IDS: Record<StageId, string[]> = {
  frame: [FRAME_FIELDS.name.id, FRAME_FIELDS.date.id],
  love: [...DIMENSION_BY_ID.love.questions.map((q) => q.id), DIMENSION_BY_ID.love.keywords.id],
  good: [...DIMENSION_BY_ID.good.questions.map((q) => q.id), DIMENSION_BY_ID.good.keywords.id],
  need: [...DIMENSION_BY_ID.need.questions.map((q) => q.id), DIMENSION_BY_ID.need.keywords.id],
  paid: [...DIMENSION_BY_ID.paid.questions.map((q) => q.id), DIMENSION_BY_ID.paid.keywords.id],
  intersections: [...INTERSECTIONS.map((i) => intersectionFieldId(i.id)), PURPOSE_FIELD.id],
  compass: COMPASS.flatMap((c) => c.fields.map((f) => f.id)),
  closing: [...CLOSING_FIELDS.map((f) => f.id), NEXT_STEP_FIELDS.step.id, NEXT_STEP_FIELDS.date.id],
  synthesis: [],
}
