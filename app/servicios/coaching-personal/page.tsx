import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, CheckCircle2, User, Heart, Brain, Target, Sparkles, RefreshCw, AlertCircle, Compass, Quote } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Coaching Personal con PNL | Johana Ríos",
  description: "Un espacio para ordenar lo que te abruma, entender tus patrones internos y avanzar con más claridad, coherencia y acción. Coaching basado en PNL y neurociencia aplicada.",
}

const forWhom = [
  {
    icon: RefreshCw,
    title: "Personas en transición",
    description: "Que están atravesando cambios personales o profesionales importantes.",
  },
  {
    icon: AlertCircle,
    title: "Quienes sienten bloqueo",
    description: "Que experimentan confusión, sobrecarga mental o sienten que están estancados.",
  },
  {
    icon: RefreshCw,
    title: "Quienes repiten patrones",
    description: "Que reconocen hábitos o dinámicas que ya no les funcionan pero no logran cambiarlas.",
  },
  {
    icon: Compass,
    title: "Personas decidiendo",
    description: "Que necesitan tomar decisiones importantes y buscan claridad para elegir.",
  },
  {
    icon: Brain,
    title: "Quienes trabajan su interior",
    description: "Que quieren trabajar su diálogo interno, creencias, foco y hábitos.",
  },
  {
    icon: Heart,
    title: "Quienes buscan bienestar",
    description: "Que quieren sentirse bien sin perder dirección ni propósito.",
  },
]

const whatWeWork = [
  "Autoexigencia y diálogo interno",
  "Creencias limitantes",
  "Claridad de objetivos",
  "Toma de decisiones",
  "Límites personales",
  "Patrones emocionales",
  "Valores y prioridades",
  "Hábitos y coherencia interna",
]

const process = [
  {
    step: 1,
    title: "Encuentro inicial",
    description: "Conversamos para conocernos, entender tu momento y definir si este espacio es para vos.",
  },
  {
    step: 2,
    title: "Definición de objetivo",
    description: "Clarificamos hacia dónde querés ir y qué querés lograr con el proceso.",
  },
  {
    step: 3,
    title: "Sesiones de coaching",
    description: "Trabajamos con herramientas de PNL y neurociencia aplicada en sesiones de 60-90 minutos.",
  },
  {
    step: 4,
    title: "Integración y acción",
    description: "Entre sesiones, llevás lo trabajado a tu vida cotidiana con pequeñas acciones concretas.",
  },
  {
    step: 5,
    title: "Cierre consciente",
    description: "Cerramos el proceso integrando aprendizajes y celebrando el camino recorrido.",
  },
]

export default function CoachingPersonalPage() {
  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-24">
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
              <p className="mt-6 text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Un espacio para ordenar lo que te abruma, entender tus patrones internos y avanzar con más claridad, coherencia y acción.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="gap-2">
                  <a
                    href="https://calendly.com/johanapaolarios/coaching-con-joha"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Calendar className="h-4 w-4" />
                    Agendar una conversación
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

        {/* For whom */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4">
                Este servicio es para personas que...
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {forWhom.map((item) => (
                <div
                  key={item.title}
                  className="bg-card rounded-xl p-6 border border-border transition-all duration-300 hover:shadow-lg hover:border-primary/30"
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

        {/* What we work */}
        <section className="py-16 lg:py-24 bg-card">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-6">
                  {"¿Qué se trabaja?"}
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {whatWeWork.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-foreground/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-background rounded-2xl p-8 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-6">
                  Mi enfoque
                </h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Trabajo desde <strong className="text-foreground">coaching con PNL</strong>, <strong className="text-foreground">neurociencia aplicada</strong> y herramientas de reflexión, regulación y acción.
                  </p>
                  <p>
                    Estoy en constante formación y aprendizaje en neurociencia con referentes reconocidos como <strong className="text-foreground">Nazareth Castellanos</strong>, integrando lo último en ciencia del cerebro, cuerpo y comportamiento humano a mi práctica.
                  </p>
                  <p className="text-sm border-l-2 border-primary/30 pl-4 italic">
                    Nota importante: Este espacio no es terapia ni reemplaza procesos psicológicos o médicos. Es un acompañamiento complementario orientado al presente, al futuro y al desarrollo de recursos internos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4">
                {"¿Cómo es el proceso?"}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Cada proceso es único, pero estos son los momentos que solemos transitar juntos.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {process.map((item, index) => (
                <div key={item.step} className="relative">
                  <div className="bg-card rounded-xl p-6 border border-border h-full">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <span className="text-primary font-semibold">{item.step}</span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                      <ArrowRight className="w-5 h-5 text-muted-foreground/30" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote */}
        <section className="py-16 lg:py-20 bg-primary/5">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <Quote className="w-10 h-10 text-primary/30 mx-auto mb-6" />
            <blockquote className="text-xl lg:text-2xl font-medium text-foreground leading-relaxed text-balance">
              No te doy las respuestas; te ayudo a encontrarlas. No te digo qué hacer; te acompaño a descubrir qué es lo mejor para vos.
            </blockquote>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4 text-balance">
              {"¿Listo/a para dar el primer paso?"}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
              Agendá una conversación sin compromiso. Es un primer encuentro para conocernos, entender tu momento y ver si este espacio es para vos.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <a
                  href="https://calendly.com/johanapaolarios/coaching-con-joha"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Calendar className="h-4 w-4" />
                  Agendar una conversación
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
