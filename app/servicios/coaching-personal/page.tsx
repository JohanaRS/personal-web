import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, CheckCircle2, User, Heart, Brain, Target, Sparkles, RefreshCw, AlertCircle, Compass, Quote, Clock, MapPin, ShieldCheck, Star, MessageCircle, Ear, HelpCircle, Wrench, Lightbulb, Zap } from "lucide-react"
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

const valuePoints = [
  { icon: Ear, text: "Escucha entrenada" },
  { icon: HelpCircle, text: "Preguntas que ayudan a ordenar el caos interno" },
  { icon: Wrench, text: "Herramientas de PNL, neurociencia aplicada y coaching" },
  { icon: Sparkles, text: "Ejercicios y recomendaciones basadas en neurociencia, adaptadas a cada persona" },
  { icon: Heart, text: "Contención emocional" },
  { icon: Lightbulb, text: "Claridad que muchas veces no se logra en soledad" },
  { icon: Zap, text: "Un cambio de estado interno que impacta decisiones reales" },
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

        {/* Pricing */}
        <section className="py-16 lg:py-24 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                Inversión
              </span>
              <h2 className="mt-4 text-2xl sm:text-3xl font-semibold text-foreground leading-tight text-balance">
                Precios y planes
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Un marco claro y consciente para sostener tu proceso con presencia y compromiso.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Los valores expresados están en pesos uruguayos.
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mb-16">
              {/* Card 1 - Sesión individual */}
              <div className="bg-card rounded-2xl p-6 border border-border transition-all duration-300 hover:shadow-lg hover:border-primary/20 flex flex-col">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary/10 mb-5">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Sesión individual 1:1
                </h3>
                <ul className="flex flex-col gap-3 text-sm text-muted-foreground mt-auto">
                  <li className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-primary shrink-0" />
                    60 minutos
                  </li>
                  <li className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    Online o presencial
                  </li>
                  <li className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    Espacio confidencial, cuidado y sin juicios
                  </li>
                </ul>
              </div>

              {/* Card 2 - Valor lanzamiento (highlighted) */}
              <div className="relative bg-primary/5 rounded-2xl p-6 border-2 border-primary transition-all duration-300 hover:shadow-xl flex flex-col">
                <div className="absolute -top-3 left-6">
                  <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    <Sparkles className="w-3 h-3" />
                    Lanzamiento
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary/10 mb-5 mt-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Valor lanzamiento
                </h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-foreground">$1000</span>
                  <span className="text-sm text-muted-foreground ml-1">/ sesión</span>
                </div>
                <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                    Aplica para las primeras 2 sesiones
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                    Válido para procesos iniciados hasta el 15/03
                  </li>
                </ul>
                <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
                  A partir de la tercera sesión, el proceso continúa con el valor regular.
                </p>
              </div>

              {/* Card 3 - Valor regular */}
              <div className="bg-card rounded-2xl p-6 border border-border transition-all duration-300 hover:shadow-lg hover:border-primary/20 flex flex-col">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary/10 mb-5">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Valor regular
                </h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-foreground">$1500</span>
                  <span className="text-sm text-muted-foreground ml-1">/ sesión</span>
                </div>
                <p className="text-sm text-muted-foreground mt-auto">
                  Precio por sesión a partir del periodo regular de acompañamiento.
                </p>
              </div>

              {/* Card 4 - Proceso inicial (recommended) */}
              <div className="relative bg-card rounded-2xl p-6 border border-border transition-all duration-300 hover:shadow-lg hover:border-primary/20 flex flex-col">
                <div className="absolute -top-3 left-6">
                  <span className="inline-flex items-center gap-1 bg-foreground text-background text-xs font-semibold px-3 py-1 rounded-full">
                    Recomendado
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary/10 mb-5 mt-2">
                  <ArrowRight className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Proceso inicial
                </h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-foreground">$5000</span>
                  <span className="text-sm text-muted-foreground ml-1">/ 4 sesiones</span>
                </div>
                <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                    2 sesiones a $1000
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                    2 sesiones a $1500
                  </li>
                </ul>
                <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
                  Este formato permite explorar, profundizar e integrar lo trabajado en tu vida cotidiana.
                </p>
              </div>
            </div>

            {/* Block 2 - Transparencia y valor */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-2xl p-8 lg:p-12 border border-border transition-all duration-300 hover:shadow-lg hover:border-primary/20">
                <h3 className="text-2xl font-semibold text-foreground mb-8 text-center lg:text-left">
                  Sobre el valor de una sesión
                </h3>

                {/* Quote */}
                <blockquote className="text-lg text-foreground font-medium leading-relaxed mb-8 pl-4 border-l-2 border-primary">
                  No cobro por hablar una hora.
                  <br />
                  Cobro por el espacio que sostengo en cada sesión.
                </blockquote>

                {/* Value points */}
                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {valuePoints.map((point) => (
                    <div
                      key={point.text}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <point.icon className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      {point.text}
                    </div>
                  ))}
                </div>

                {/* Intermediate paragraphs */}
                <div className="flex flex-col gap-4 mb-8">
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    Los ejercicios, reflexiones y propuestas que surgen en sesión no son aleatorios. Se apoyan en principios de neurociencia aplicada al comportamiento, la atención, la regulación emocional y la toma de decisiones, siempre adaptados a tu contexto y momento vital.
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    Cada persona se va de la sesión con reflexiones, ideas o puntos de acción concretos para integrar lo trabajado en su vida cotidiana, respetando su ritmo y su proceso.
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    Este espacio no es común, ni improvisado, ni automático. Es el resultado de formación, práctica, observación y análisis cuidadoso de cada persona, cada contexto y cada proceso.
                  </p>
                </div>

                {/* Highlighted personal phrases */}
                <div className="flex flex-col gap-4">
                  {[
                    "Este es el valor de un espacio profesional, cuidado y transformador.",
                    "Este precio sostiene mi energía y la calidad del acompañamiento.",
                  ].map((phrase) => (
                    <div
                      key={phrase}
                      className="bg-primary/5 rounded-xl px-5 py-4 border border-primary/15"
                    >
                      <p className="text-sm font-medium text-foreground leading-relaxed">
                        {phrase}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
