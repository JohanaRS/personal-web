export const RESOURCE_TITLE = "Pausa estratégica"
export const RESOURCE_SUBTITLE = "Decidí qué merece tu foco hoy"
export const RESOURCE_DURATION = "5 a 8 minutos"

export const INTRO_TEXT =
  "Cuando varias cosas te piden atención, puede costar distinguir qué necesita una respuesta ahora y qué merece que le hagas lugar. Tomate unos minutos para ordenar lo que tenés entre manos y elegir cómo querés seguir."

export const OUTCOMES = [
  { title: "Una prioridad", text: "Lo que elegís atender, según lo que querés cuidar." },
  { title: "Un próximo paso", text: "Una acción concreta y un momento para hacerla." },
  { title: "Lo que puede esperar", text: "Lo que decidís reprogramar, delegar o conversar." },
]

export const MOMENTS = [
  {
    id: "empezar",
    label: "Empezar el día",
    description: "Antes de que la agenda decida por vos.",
    question: "¿Qué te gustaría haber movido cuando termine el día?",
    closing: "Elegí tu primer paso y cuándo le vas a hacer lugar.",
  },
  {
    id: "reorientar",
    label: "Reorientar el día",
    description: "Cuando algo cambió y necesitás reacomodarte.",
    question: "¿Qué cambió y qué merece tu atención ahora?",
    closing: "Elegí qué atender y qué vas a reprogramar, delegar o conversar.",
  },
  {
    id: "cerrar",
    label: "Cerrar el día",
    description: "Para soltar lo hecho y dejar el camino listo.",
    question: "¿Qué ya podés dar por cerrado y qué conviene retomar mañana?",
    closing: "Dejá anotado por dónde vas a empezar cuando retomes.",
  },
] as const

export type MomentId = (typeof MOMENTS)[number]["id"]

export const TIME_OPTIONS = [
  { id: "poco", label: "Menos de 30 minutos" },
  { id: "medio", label: "Entre 30 minutos y 2 horas" },
  { id: "mucho", label: "Más de 2 horas" },
] as const
export type TimeId = (typeof TIME_OPTIONS)[number]["id"]

export const ENERGY_OPTIONS = [
  { id: "baja", label: "Baja" },
  { id: "media", label: "Media" },
  { id: "alta", label: "Alta" },
] as const
export type EnergyId = (typeof ENERGY_OPTIONS)[number]["id"]

export const ITEM_PLACEHOLDERS = [
  "Por ejemplo: responder la propuesta del cliente.",
  "Por ejemplo: decidir si sumo a alguien al proyecto.",
  "Por ejemplo: la conversación pendiente con mi equipo.",
]

export const SOON_RESPONSES = [
  { id: "atender", label: "Atenderlo yo" },
  { id: "ayuda", label: "Pedir ayuda" },
  { id: "acordar", label: "Acordar responsable y plazo" },
] as const
export type SoonResponse = (typeof SOON_RESPONSES)[number]["id"]

export const LEVELS = [
  { id: "bajo", label: "Bajo" },
  { id: "alto", label: "Alto" },
] as const
export type Level = (typeof LEVELS)[number]["id"]

export const IMPACT_HELP = "Cuánto movería la situación hacia lo que importa."
export const EFFORT_HELP = "El trabajo, tiempo o coordinación que requiere."

export const QUADRANTS: { impact: Level; effort: Level; title: string; hint: string }[] = [
  { impact: "alto", effort: "bajo", title: "Impacto alto · Esfuerzo bajo", hint: "Mueve mucho con poco." },
  { impact: "alto", effort: "alto", title: "Impacto alto · Esfuerzo alto", hint: "Vale la pena, con un plan." },
  { impact: "bajo", effort: "bajo", title: "Impacto bajo · Esfuerzo bajo", hint: "Rápido, si suma." },
  { impact: "bajo", effort: "alto", title: "Impacto bajo · Esfuerzo alto", hint: "Revisá si hace falta ahora." },
]

export const FIT_QUESTION = "¿Qué versión de este paso cabe en el tiempo y la energía que tenés?"
export const FIT_IDEAS = [
  "Acotar el alcance: hacer solo la primera parte.",
  "Pedir apoyo a alguien que pueda sumar.",
  "Reservar un bloque en la agenda para hacerle lugar.",
]

export const NEXT_STEP_FIELDS = {
  nextStep: {
    label: "Mi próximo paso",
    help: "Una acción concreta y observable.",
    placeholder: "Voy a…",
  },
  why: {
    label: "Por qué lo elijo",
    help: "Qué objetivo, compromiso o necesidad estoy cuidando.",
    placeholder: "Lo elijo porque…",
  },
  when: {
    label: "Cuándo lo voy a hacer",
    help: "Una hora, un momento del día o un disparador.",
    placeholder: "Hoy a las…  /  Cuando termine…",
    example:
      "«Cuando termine mi primera reunión, voy a dedicar 15 minutos a escribir qué decisión necesita el equipo de mí».",
  },
  later: {
    label: "Qué voy a dejar para después",
    help: "Opcional. Puede ser algo para delegar, reprogramar o renegociar.",
    placeholder: "Voy a reprogramar…  /  Le voy a pedir a…",
  },
} as const

export const REPORT_TITLE = "Mi pausa estratégica"
export const SIGNATURE_NAME = "Johana Ríos"
export const SIGNATURE_ROLE = "Liderazgo · Coaching · Calidad"
export const SITE_LABEL = "joharios.com"

export const PRIVACY_NOTE =
  "Tus respuestas se procesan solo en este navegador. No necesitás cuenta ni correo, y nada se envía a servicios externos."

export const DRAFT_NOTE =
  "El borrador queda guardado solo en este navegador y dispositivo. Si usás otro, no lo vas a encontrar."

export const COMPANION = {
  title: "PAUSA: IA con criterio propio",
  text: "Si tu próximo paso incluye usar inteligencia artificial, PAUSA te ayuda a decidir qué pedirle y qué decisión conservar vos.",
  href: "/recursos/pausa",
}
