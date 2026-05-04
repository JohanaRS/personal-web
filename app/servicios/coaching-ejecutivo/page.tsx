import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, CheckCircle2, Briefcase, MessageSquare, Users, TrendingUp, Shield } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Coaching Ejecutivo y Liderazgo | Johana Ríos",
  description: "Coaching para líderes y profesionales. Comunicación efectiva, feedback, gestión del estrés, toma de decisiones y liderazgo consciente.",
}

const benefits = [
  "Comunicación efectiva con equipos y stakeholders",
  "Feedback constructivo y conversaciones difíciles",
  "Gestión del estrés y la presión",
  "Toma de decisiones más consciente y estratégica",
  "Liderazgo consciente y auténtico",
  "Equilibrio entre resultados y bienestar",
]

const forWhom = [
  {
    icon: Briefcase,
    title: "Líderes de equipos",
    description: "Que buscan mejorar su forma de liderar, comunicar y acompañar a sus equipos.",
  },
  {
    icon: TrendingUp,
    title: "Profesionales en crecimiento",
    description: "Que quieren desarrollar habilidades de liderazgo para avanzar en su carrera.",
  },
  {
    icon: Users,
    title: "Managers y directivos",
    description: "Que enfrentan desafíos de gestión, cambio organizacional o equipos complejos.",
  },
  {
    icon: Shield,
    title: "Líderes bajo presión",
    description: "Que necesitan herramientas para sostener su rol sin desgastarse.",
  },
]

export default function CoachingEjecutivoPage() {
  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-20">
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-secondary/30 to-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Briefcase className="w-4 h-4" />
                Para líderes y profesionales
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight text-balance">
                Coaching Ejecutivo y Liderazgo
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Acompañamiento para quienes lideran equipos o buscan crecer profesionalmente. Trabajamos comunicación, feedback, gestión del estrés, toma de decisiones y liderazgo consciente.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="gap-2">
                  <a
                    href="https://calendly.com/johanapaolarios/coaching-con-joha"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Calendar className="h-4 w-4" />
                    Agendar conversación
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contacto">
                    Consultar
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* What is it */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-6">
                  {"¿Qué es el coaching ejecutivo?"}
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Es un proceso de acompañamiento diseñado para líderes, profesionales y equipos directivos que quieren mejorar su desempeño, desarrollar competencias de liderazgo y atravesar desafíos con mayor consciencia.
                  </p>
                  <p>
                    Trabajo con un enfoque que integra <strong className="text-foreground">coaching ontológico, PNL y neurociencia aplicada</strong> al contexto organizacional. No es solo sobre resultados; es sobre cómo lográs esos resultados siendo fiel a tus valores.
                  </p>
                  <p>
                    Mi experiencia en liderazgo tech y gestión de equipos me permite entender los desafíos reales que enfrentás día a día.
                  </p>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-6">
                  {"¿Qué trabajamos?"}
                </h3>
                <ul className="space-y-4">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground/80">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* For whom */}
        <section className="py-16 lg:py-24 bg-card">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4">
                {"¿Para quién es?"}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                El coaching ejecutivo es para vos si te identificás con alguna de estas situaciones.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {forWhom.map((item) => (
                <div
                  key={item.title}
                  className="bg-background rounded-xl p-6 border border-border transition-all duration-300 hover:shadow-lg hover:border-primary/30"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Approach */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="bg-primary/5 rounded-2xl p-8 lg:p-12 border border-primary/20">
              <div className="flex items-start gap-4 mb-6">
                <MessageSquare className="w-8 h-8 text-primary shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Mi enfoque
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Combino mi formación en coaching con mi experiencia real liderando equipos de tecnología. Entiendo la presión, los deadlines, las conversaciones difíciles y el desafío de equilibrar resultados con bienestar.
                  </p>
                </div>
              </div>
              <blockquote className="border-l-4 border-primary pl-4 italic text-foreground/80">
                {`"Liderar no es solo lograr resultados. Es hacerlo de una manera que te permita sostener el camino sin romperte en el intento."`}
              </blockquote>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-24 bg-primary/5">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4 text-balance">
              {"¿Querés desarrollar tu liderazgo?"}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
              Agendá una conversación exploratoria para conocernos y ver si el coaching ejecutivo es lo que necesitás en este momento.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <a
                  href="https://calendly.com/johanapaolarios/coaching-con-joha"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Calendar className="h-4 w-4" />
                  Agendar conversación
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link href="/servicios">
                  <ArrowRight className="h-4 w-4" />
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
