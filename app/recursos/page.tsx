import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Recursos | Johana Ríos",
  description:
    "Recursos gratuitos y autoguiados para reflexionar sobre tu vida, tu liderazgo, tu propósito y tu foco. Sin cuenta ni correo.",
  alternates: { canonical: "/recursos" },
}

const resources = [
  {
    title: "Rueda de la Vida",
    href: "/recursos/rueda-de-la-vida",
    text: "Evaluá ocho áreas clave de tu vida y descubrí dónde estás hoy y dónde te gustaría estar.",
  },
  {
    title: "Radar de Liderazgo",
    href: "/recursos/radar-de-liderazgo",
    text: "Observá tu liderazgo en cuatro relaciones: con vos, con las personas, con el equipo y con el contexto.",
  },
  {
    title: "Ikigai profesional",
    href: "/recursos/ikigai-profesional",
    text: "Explorá tu identidad, propósito y dirección profesional, y descargá tu diagrama personalizado.",
  },
]

const pauses = [
  {
    title: "Pausa estratégica",
    tag: "Para decidir tu foco",
    href: "/recursos/pausa-estrategica",
    text: "Distinguí lo importante de lo urgente, elegí una prioridad y salí con un próximo paso concreto. De 5 a 8 minutos.",
  },
  {
    title: "PAUSA: IA con criterio",
    tag: "Para usar IA",
    href: "/recursos/pausa",
    text: "Cinco preguntas para decidir qué ayuda pedirle a la IA, revisar lo que obtenés y conservar tu criterio.",
  },
]

function ResourceCard({ title, href, text, tag }: { title: string; href: string; text: string; tag?: string }) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
    >
      {tag && <span className="text-xs font-semibold uppercase tracking-wider text-primary">{tag}</span>}
      <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
        Abrir recurso
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  )
}

export default function RecursosPage() {
  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-20">
        <section className="bg-gradient-to-b from-secondary/30 to-background py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <span className="text-sm font-medium uppercase tracking-wider text-primary">Recursos</span>
            <h1 className="mt-4 text-3xl font-semibold leading-tight text-foreground text-balance sm:text-4xl lg:text-5xl">
              Herramientas para pensar con claridad
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Recursos gratuitos y autoguiados. Tus respuestas se quedan en tu navegador: no necesitás cuenta ni correo.
            </p>
          </div>
        </section>

        <div className="mx-auto flex max-w-5xl flex-col gap-16 px-4 pb-20 sm:px-6 lg:px-8">
          <section aria-labelledby="pausas" className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h2 id="pausas" className="text-2xl font-semibold text-foreground">
                Dos pausas que se complementan
              </h2>
              <p className="max-w-2xl leading-relaxed text-muted-foreground">
                La Pausa estratégica te ayuda a elegir en qué poner tu foco. Si ese paso incluye usar IA, PAUSA te
                acompaña a hacerlo con criterio propio.
              </p>
            </div>
            <ul className="grid gap-4 md:grid-cols-2">
              {pauses.map((r) => (
                <li key={r.href}>
                  <ResourceCard {...r} />
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="autoconocimiento" className="flex flex-col gap-6">
            <h2 id="autoconocimiento" className="text-2xl font-semibold text-foreground">
              Autoconocimiento y dirección
            </h2>
            <ul className="grid gap-4 md:grid-cols-3">
              {resources.map((r) => (
                <li key={r.href}>
                  <ResourceCard {...r} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
