import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Workshops } from "@/components/sections/workshops"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, UsersRound, Sparkles, CheckCircle2, Quote, Lightbulb, Cog, Users, Brain, Shield, Target } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Talleres y Charlas | Johana Ríos",
  description: "Talleres, charlas y workshops para equipos y organizaciones. Liderazgo, comunicación, adopción de AI, cultura de calidad y transformación organizacional.",
}

const aiTopics = [
  {
    icon: Brain,
    title: "Introducción a AI aplicada al trabajo en equipos tech",
    description: "Primeros pasos para entender qué es, cómo funciona y cómo puede ayudar en el día a día.",
  },
  {
    icon: Lightbulb,
    title: "Nuevo mindset de trabajo con AI",
    description: "Cómo cambiar la forma de pensar el trabajo cuando la AI es parte del equipo.",
  },
  {
    icon: Target,
    title: "AI como potenciador, no como reemplazo",
    description: "Usar AI para amplificar el criterio humano, no para sustituirlo.",
  },
  {
    icon: Shield,
    title: "Adopción responsable de AI en equipos de desarrollo",
    description: "Buenas prácticas, riesgos y límites del uso de AI en contextos reales.",
  },
  {
    icon: Cog,
    title: "AI aplicada a Quality Assurance",
    description: "Diseño de workflows con AI para QA, testing, documentación y toma de decisiones.",
  },
  {
    icon: Users,
    title: "Liderazgo y gestión del cambio con AI",
    description: "Cómo liderar equipos en contextos de transformación tecnológica.",
  },
]

const formats = [
  "Charlas introductorias (45-90 min)",
  "Workshops prácticos (medio día o día completo)",
  "Sesiones de entrenamiento para equipos",
  "Espacios de sensibilización sobre AI",
  "Facilitación de adopción y cambio de mindset",
  "Laboratorios de práctica con herramientas de AI",
]

export default function TalleresCharlasPage() {
  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-20">
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-secondary/30 to-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <UsersRound className="w-4 h-4" />
                Para equipos y organizaciones
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight text-balance">
                Talleres y Charlas
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Instancias formativas con enfoque práctico, humano y aplicable. Diseñadas para generar impacto real en la cultura, las conversaciones y las dinámicas de trabajo.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/contacto">
                    Quiero un workshop para mi equipo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <a
                    href="https://calendly.com/johanapaolarios/coaching-con-joha"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Calendar className="h-4 w-4" />
                    Agendar llamada
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* AI Workshops Section - NEW */}
        <section className="py-16 lg:py-24 bg-card">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Content */}
              <div>
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium mb-4">
                  <Sparkles className="w-4 h-4" />
                  Nueva línea de formación
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-foreground leading-tight mb-6">
                  Charlas y workshops sobre adopción de AI
                </h2>
                <div className="text-muted-foreground leading-relaxed space-y-4">
                  <p>
                    La incorporación de inteligencia artificial en los equipos no se trata solo de aprender una herramienta. Implica desarrollar un <strong className="text-foreground">nuevo mindset de trabajo</strong>, revisar procesos, definir criterios de calidad y acompañar a las personas en el cambio.
                  </p>
                  <p>
                    Desde mi experiencia liderando procesos de adopción de AI en equipos de Quality Assurance y desarrollo de software, diseño y facilito espacios de formación para que los equipos puedan <strong className="text-foreground">entender, experimentar e integrar</strong> estas herramientas de forma práctica, responsable y alineada a sus objetivos.
                  </p>
                </div>

                {/* Quote */}
                <div className="mt-8 p-6 bg-primary/5 rounded-xl border-l-4 border-primary">
                  <Quote className="h-6 w-6 text-primary/40 mb-3" />
                  <blockquote className="text-foreground font-medium leading-relaxed">
                    La AI potencia los procesos cuando las personas entienden cómo usarla, para qué usarla y qué criterios humanos deben seguir guiando las decisiones.
                  </blockquote>
                </div>
              </div>

              {/* Topics Grid */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-6">Temáticas disponibles</h3>
                <div className="grid gap-4">
                  {aiTopics.map((topic) => (
                    <div
                      key={topic.title}
                      className="flex gap-4 p-4 bg-background rounded-lg border border-border hover:border-primary/30 transition-colors"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <topic.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground text-sm mb-1">{topic.title}</h4>
                        <p className="text-sm text-muted-foreground">{topic.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Formats */}
            <div className="mt-16 pt-12 border-t border-border">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-6">Formatos disponibles</h3>
                  <ul className="space-y-3">
                    {formats.map((format) => (
                      <li key={format} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{format}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-6">Mi diferencial</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Mis talleres combinan <strong className="text-foreground">experiencia real liderando equipos de QA</strong>, diseño de procesos, adopción de AI, coaching organizacional y mirada humana del cambio.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    No se trata solo de enseñar herramientas, sino de ayudar a los equipos a <strong className="text-foreground">integrarlas con criterio, claridad y foco en calidad</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Workshops */}
        <Workshops />

        {/* CTA */}
        <section className="py-20 lg:py-24 bg-primary/5">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4 text-balance">
              {"¿Querés un taller a medida para tu equipo?"}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
              Diseño talleres y charlas adaptados a las necesidades específicas de tu organización. Conversemos sobre lo que tu equipo necesita.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link href="/contacto">
                  Quiero un workshop para mi equipo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link href="/servicios">
                  Ver otros servicios
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
