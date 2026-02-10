import { Button } from "@/components/ui/button"
import {
  Clock,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  ArrowRight,
  MessageCircle,
  Ear,
  HelpCircle,
  Wrench,
  Heart,
  Lightbulb,
  Zap,
  Calendar,
} from "lucide-react"

export function Pricing() {
  const valuePoints = [
    { icon: Ear, text: "Escucha entrenada" },
    { icon: HelpCircle, text: "Preguntas que ayudan a ordenar el caos interno" },
    { icon: Wrench, text: "Herramientas de PNL, neurociencia aplicada y coaching" },
    { icon: Sparkles, text: "Ejercicios y recomendaciones basadas en neurociencia, adaptadas a cada persona" },
    { icon: Heart, text: "Contención emocional" },
    { icon: Lightbulb, text: "Claridad que muchas veces no se logra en soledad" },
    { icon: Zap, text: "Un cambio de estado interno que impacta decisiones reales" },
  ]

  return (
    <section id="precios" className="py-20 lg:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Inversión
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-foreground leading-tight text-balance">
            Precios y planes
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Un marco claro y consciente para sostener tu proceso con presencia y compromiso.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Los valores expresados están en pesos uruguayos.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mb-20">
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
        <div className="max-w-4xl mx-auto mb-20">
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

        {/* Block 3 - Sesión explicativa + CTAs */}
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-semibold text-foreground mb-4 text-balance">
            {"¿Todavía tenés dudas?"}
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Si esto resuena con vos, pero aún no sabés si el coaching con PNL es lo que necesitás en este momento, podés agendar una sesión explicativa.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Es un espacio breve para conversar sobre tu situación, despejar dudas y ver si este proceso es adecuado para vos, sin compromiso.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="w-full sm:w-auto group">
              <a
                href="https://calendly.com/johanapaolarios/coaching-con-joha"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Agendar sesión explicativa
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto group">
              <a
                href="https://wa.me/59898493203"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Consultar por WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
