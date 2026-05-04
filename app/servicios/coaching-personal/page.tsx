import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, CheckCircle2, User, Heart, Brain, Target, Sparkles } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Coaching Personal con PNL | Johana Ríos",
  description: "Sesiones de coaching individual para claridad, nuevos hábitos, foco, autoliderazgo y bienestar. Basado en PNL y neurociencia aplicada.",
}

const benefits = [
  "Claridad sobre lo que querés y hacia dónde vas",
  "Cambio de hábitos y patrones que ya no te sirven",
  "Gestión emocional y manejo del estrés",
  "Autoliderazgo y confianza en vos mismo/a",
  "Bienestar integral y equilibrio de vida",
  "Toma de decisiones más consciente",
]

const forWhom = [
  {
    icon: Heart,
    title: "Personas en transición",
    description: "Que están atravesando cambios importantes en su vida personal o profesional.",
  },
  {
    icon: Brain,
    title: "Quienes buscan autoconocimiento",
    description: "Que quieren entenderse mejor, conocer sus patrones y evolucionar.",
  },
  {
    icon: Target,
    title: "Personas con objetivos claros",
    description: "Que tienen metas pero necesitan acompañamiento para alcanzarlas.",
  },
  {
    icon: Sparkles,
    title: "Quienes buscan bienestar",
    description: "Que quieren mejorar su calidad de vida, equilibrio y satisfacción personal.",
  },
]

export default function CoachingPersonalPage() {
  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-20">
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-secondary/30 to-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <User className="w-4 h-4" />
                Para vos
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight text-balance">
                Coaching Personal con PNL
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Sesiones individuales donde trabajamos en lo que realmente importa para tu vida y tu momento actual. Un espacio de escucha, reflexión y acción.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="gap-2">
                  <a
                    href="https://calendly.com/johanapaolarios/coaching-con-joha"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Calendar className="h-4 w-4" />
                    Agendar sesión
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
                  {"¿Qué es el coaching personal con PNL?"}
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Es un proceso de acompañamiento donde trabajamos juntos para que logres mayor claridad sobre tus objetivos, desbloquees patrones que te limitan y construyas el camino hacia lo que querés.
                  </p>
                  <p>
                    Integro herramientas de <strong className="text-foreground">Programación Neurolingüística (PNL)</strong> y <strong className="text-foreground">neurociencia aplicada</strong> para facilitar cambios profundos y sostenibles, respetando tu ritmo y tus tiempos.
                  </p>
                  <p>
                    No te doy las respuestas; te ayudo a encontrarlas. No te digo qué hacer; te acompaño a descubrir qué es lo mejor para vos.
                  </p>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-6">
                  {"¿Qué podés lograr?"}
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
                El coaching personal es para vos si te identificás con alguna de estas situaciones.
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

        {/* CTA */}
        <section className="py-20 lg:py-24 bg-primary/5">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4 text-balance">
              {"¿Listo/a para dar el primer paso?"}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
              Agendá una sesión exploratoria sin compromiso. Es una primera conversación para conocernos y ver si el coaching es lo que necesitás.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <a
                  href="https://calendly.com/johanapaolarios/coaching-con-joha"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Calendar className="h-4 w-4" />
                  Agendar sesión exploratoria
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
