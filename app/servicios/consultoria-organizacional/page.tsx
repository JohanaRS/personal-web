import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, CheckCircle2, Building2, Cog, Users, Lightbulb, Quote, Sparkles } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Consultoría Organizacional | Johana Ríos",
  description: "Consultoría para equipos y organizaciones. Cultura de calidad, procesos QA, adopción de IA con criterio, transformación organizacional y mejora continua.",
}

const consultingBlocks = [
  {
    icon: Sparkles,
    title: "Adopción de IA con Criterio y Contexto",
    description: "Para equipos y organizaciones que quieren integrar inteligencia artificial de forma estratégica, responsable y alineada con su cultura.",
    features: [
      "Diagnóstico de madurez y oportunidades de IA",
      "Identificación de casos de uso con impacto real",
      "Acompañamiento en la adopción gradual de herramientas",
      "Gestión del cambio y resistencias",
      "Integración de IA en procesos de QA y desarrollo",
      "Formación práctica para equipos",
    ],
    result: "Equipos que adoptan IA como herramienta potenciadora, con criterio, contexto y sin perder el factor humano.",
  },
  {
    icon: Cog,
    title: "Cultura de Calidad y Procesos QA",
    description: "Para equipos tech, startups, software factories o áreas de producto que necesitan revisar, ordenar o evolucionar su forma de trabajar la calidad.",
    features: [
      "Assessment de madurez QA",
      "Revisión de procesos de testing",
      "Estrategia de testing funcional y no funcional",
      "Definición de roles, responsabilidades y acuerdos",
      "Métricas e indicadores de calidad",
      "Adopción de herramientas e integración de IA en testing",
    ],
    result: "Procesos QA más claros, mejor colaboración entre áreas, reducción de retrabajo y una cultura de calidad más compartida.",
  },
  {
    icon: Users,
    title: "Desarrollo e Implantación de Talento QA Junior",
    description: "Para empresas que quieren incorporar talento QA trainee o junior con acompañamiento técnico, desarrollo de soft skills y liderazgo experto.",
    features: [
      "Evaluación y preparación de perfiles",
      "Mentoría en testing funcional y no funcional",
      "Desarrollo de criterio QA",
      "Comunicación profesional y reporte de bugs",
      "Planes de crecimiento individual",
      "Acompañamiento como tech lead durante la inserción",
    ],
    result: "Talento junior más preparado, acompañado en su curva de aprendizaje y con mayor capacidad de aportar valor real al proyecto.",
  },
  {
    icon: Lightbulb,
    title: "Transformación Organizacional y Mejora de Procesos",
    description: "Para organizaciones, áreas o equipos que necesitan definir procesos, mejorar dinámicas, ordenar responsabilidades o atravesar cambios culturales.",
    features: [
      "Diagnóstico organizacional",
      "Mapeo de procesos y fricciones",
      "Definición de roles y responsabilidades",
      "Alineación de objetivos",
      "Mejora de comunicación y coordinación",
      "Facilitación de workshops",
    ],
    result: "Equipos con más claridad, mejores acuerdos, procesos sostenibles y mayor capacidad de adaptación.",
  },
]

export default function ConsultoriaOrganizacionalPage() {
  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-20">
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-secondary/30 to-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Building2 className="w-4 h-4" />
                Para empresas y equipos
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight text-balance">
                Consultoría Organizacional
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Acompaño empresas, equipos y líderes a revisar, ordenar y transformar su forma de trabajar. Integro experiencia en liderazgo tech, calidad de software, adopción de IA, coaching organizacional y gestión del cambio.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/contacto">
                    Solicitar propuesta
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

        {/* Context */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-6">
                {"¿Por qué consultoría organizacional?"}
              </h2>
              <div className="text-muted-foreground leading-relaxed space-y-4 text-left">
                <p>
                  Muchas veces los problemas de una organización no aparecen por falta de talento, sino por <strong className="text-foreground">falta de claridad</strong>: procesos poco definidos, roles difusos, comunicación fragmentada, cambios que no terminan de adoptarse o equipos que trabajan en modo reactivo.
                </p>
                <p>
                  Hoy, a esto se suma el desafío de <strong className="text-foreground">adoptar nuevas tecnologías como la IA</strong> sin perder el foco en las personas, la calidad y la colaboración.
                </p>
                <p>
                  Mi trabajo es acompañar a empresas y equipos a ordenar esa complejidad, integrando una <strong className="text-foreground">mirada técnica, humana y sistémica</strong> del cambio. La IA puede ser una herramienta poderosa, pero solo cuando se adopta con criterio, contexto y cuidado por el equipo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Consulting Blocks */}
        <section className="py-16 lg:py-24 bg-card">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4">
                {"¿Cómo puedo ayudarte?"}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
              {consultingBlocks.map((block) => (
                <div
                  key={block.title}
                  className="bg-background rounded-2xl p-8 border border-border transition-all duration-300 hover:shadow-lg hover:border-primary/30 flex flex-col"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <block.icon className="w-6 h-6 text-primary" />
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {block.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {block.description}
                  </p>

                  <ul className="space-y-2 mb-6 flex-grow">
                    {block.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-foreground/80">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="bg-primary/5 rounded-xl p-4 border border-primary/15">
                    <p className="text-xs font-medium text-primary uppercase tracking-wider mb-1">
                      Resultado esperado
                    </p>
                    <p className="text-sm text-foreground/90 leading-relaxed">
                      {block.result}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20 text-center">
              <Quote className="w-8 h-8 text-primary/40 mx-auto mb-4" />
              <blockquote className="text-lg font-medium text-foreground leading-relaxed text-balance">
                La tecnología potencia, pero son las personas las que transforman. Adoptar IA o mejorar procesos sin cuidar al equipo es construir sobre arena.
              </blockquote>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-24 bg-primary/5">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4 text-balance">
              {"¿Tu equipo necesita ordenar procesos o transformar su forma de trabajar?"}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
              Podemos conversar para entender el contexto, detectar necesidades y diseñar una propuesta a medida.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link href="/contacto">
                  Solicitar propuesta
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
                  Agendar llamada exploratoria
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
