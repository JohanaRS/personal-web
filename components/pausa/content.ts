export type Moment = "Antes" | "Durante" | "Después"

export type QuestionId = "proposito" | "autonomia" | "uso" | "supervision" | "aprendizaje"

export interface QuestionStep {
  id: QuestionId
  letter: string
  name: string
  moment: Moment
  question: string
  help: string
  placeholder: string
}

export const RESOURCE_TITLE = "PAUSA"
export const RESOURCE_SUBTITLE = "Una pausa estratégica para usar IA con criterio propio"

export const INTRO_TEXT =
  "A veces abrimos la IA antes de terminar de entender qué necesitamos. Elegí una tarea que tengas entre manos. Te propongo cinco preguntas para decidir cómo querés avanzar y qué te querés llevar de la experiencia."

export const TASK_STEP = {
  title: "¿Con qué tarea vas a hacer tu pausa?",
  help: "Nombrá una tarea o situación concreta que tengas entre manos hoy. Cuanto más específica, mejor.",
  placeholder: "Por ejemplo: preparar la presentación del jueves para el equipo directivo.",
}

export const QUESTIONS: QuestionStep[] = [
  {
    id: "proposito",
    letter: "P",
    name: "Propósito",
    moment: "Antes",
    question: "¿Para qué necesito esta herramienta?",
    help: "Nombrá qué querés resolver y cómo sabrías que el resultado te sirve.",
    placeholder: "Quiero resolver… Me va a servir si…",
  },
  {
    id: "autonomia",
    letter: "A",
    name: "Autonomía",
    moment: "Antes",
    question: "¿Qué puedo pensar o intentar primero?",
    help: "Anotá lo que ya sabés, una duda que tengas o un primer intento propio.",
    placeholder: "Lo que ya sé es… Mi duda es… Un primer intento sería…",
  },
  {
    id: "uso",
    letter: "U",
    name: "Uso",
    moment: "Durante",
    question: "¿Cómo quiero que me ayude la IA?",
    help: "Elegí una función concreta: hacerte preguntas, comparar opciones o revisar un borrador. Anotá qué decisión querés tomar vos. También podés elegir seguir por tu cuenta.",
    placeholder: "Le voy a pedir que… La decisión que tomo yo es…",
  },
  {
    id: "supervision",
    letter: "S",
    name: "Supervisión",
    moment: "Durante",
    question: "¿Qué debo comprobar o cuestionar?",
    help: "Elegí algo específico para revisar: un dato, un supuesto o si la respuesta encaja con tu situación. Si seguiste por tu cuenta, aplicá la pregunta a tu propio intento.",
    placeholder: "Voy a comprobar… Me pregunto si…",
  },
  {
    id: "aprendizaje",
    letter: "A",
    name: "Aprendizaje",
    moment: "Después",
    question: "¿Qué comprendí y qué me llevo?",
    help: "Escribí con tus palabras qué entendiste y qué harías distinto la próxima vez. Si todavía no lo probaste, podés dejar esta respuesta pendiente y volver.",
    placeholder: "Comprendí que… La próxima vez voy a…",
  },
]

export const USE_MODES = [
  { id: "ia", label: "Con ayuda de la IA", description: "Le pido una función concreta y decido yo." },
  { id: "propia", label: "Por mi cuenta", description: "Sigo con mi propio intento, sin IA." },
] as const

export type UseMode = (typeof USE_MODES)[number]["id"]

export const CLOSING = {
  title: "¿Qué vas a hacer con lo que viste en esta pausa?",
  help: "Escribí un próximo paso concreto, algo que puedas empezar vos.",
  placeholder: "Mi próximo paso es…",
  optionalLabel: "Opcional: ¿cuándo lo vas a hacer o qué necesitás comprobar antes de avanzar?",
  optionalPlaceholder: "Mañana a primera hora… Antes necesito confirmar…",
}

export const REPORT_TITLE = "Mi pausa estratégica"
export const PENDING_LABEL = "Pendiente para retomar"

export const REPORT_SECTIONS: { title: string; ids: QuestionId[] }[] = [
  { title: "Qué quiero resolver", ids: ["proposito", "autonomia"] },
  { title: "Cómo elegí avanzar", ids: ["uso"] },
  { title: "Qué revisé y aprendí", ids: ["supervision", "aprendizaje"] },
]

export const PRIVACY_NOTE =
  "Tus respuestas se procesan solo en este navegador. No necesitás cuenta ni correo, y nada se envía a servicios externos."

export const DRAFT_NOTE =
  "El borrador queda guardado solo en este dispositivo y navegador. Podés borrarlo cuando quieras."

export const DISCLAIMER =
  "Marco de reflexión propuesto por Johana Ríos para talleres y charlas. No es una escala clínica ni un instrumento neuropsicológico validado."

export const SIGNATURE_NAME = "Johana Ríos"
export const SIGNATURE_ROLE = "Liderazgo · Coaching · Calidad"
export const SITE_LABEL = "joharios.com"

export const EXAMPLE = {
  task: "Preparar una conversación de feedback con Martín, que entregó fuera de plazo los dos últimos informes.",
  answers: {
    proposito:
      "Quiero ordenar lo que voy a decir para que la conversación sea clara y no suene a reproche. Me va a servir si salgo con dos o tres frases basadas en hechos y una forma de abrir el diálogo.",
    autonomia:
      "Hechos: el informe de marzo llegó tres días tarde y el de abril, dos. Interpretación mía: «no le importa». Eso no lo sé. Mi duda es si hubo algo que no estoy viendo. Primer intento: «Noté que los dos últimos informes llegaron después de la fecha acordada».",
    uso: "Le voy a pedir a la IA que me haga preguntas para detectar dónde estoy mezclando hechos con interpretaciones. No le pido que escriba el guion. La decisión de qué decir y cómo la tomo yo.",
    supervision:
      "Voy a comprobar que cada frase describa algo observable y no un juicio. Y voy a cuestionar si la sugerencia encaja con mi relación con Martín: no quiero un tono de manual.",
    aprendizaje:
      "Comprendí que mi primera versión tenía más interpretación que hechos. La próxima vez separo las dos columnas antes de abrir cualquier herramienta.",
  } satisfies Record<QuestionId, string>,
  nextStep:
    "El martes, en nuestra reunión uno a uno, empiezo por los hechos y le pregunto: «¿Qué pasó desde tu lado con esas entregas y qué necesitarías para llegar a tiempo?».",
}
