import { Button } from "@/components/ui/button"
import Link from "next/link"
import { User, Briefcase, UsersRound, Building2, ArrowRight, CheckCircle2, Lightbulb, Users, Cog, Quote, Sparkles, GraduationCap } from "lucide-react"

export function Services() {
  const services = [
    {
      icon: User,
      title: "Coaching Personal",
      subtitle: "Para vos",
      description:
        "Para personas que buscan claridad, nuevos hábitos, foco, autoliderazgo y bienestar. Sesiones individuales donde trabajamos en lo que realmente importa para tu vida y tu momento actual.",
      features: [
        "Claridad sobre lo que querés",
        "Cambio de hábitos",
        "Gestión emocional",
        "Autoliderazgo",
        "Bienestar integral",
      ],
      cta: {
        label: "Ver servicio",
        href: "/servicios/coaching-personal",
      },
    },
    {
      icon: Briefcase,
      title: "Coaching Ejecutivo y Liderazgo",
      subtitle: "Para líderes y profesionales",
      description:
        "Para quienes lideran equipos o buscan crecer profesionalmente. Trabajamos comunicación, feedback, gestión del estrés, toma de decisiones y liderazgo consciente.",
      features: [
        "Comunicación efectiva",
        "Feedback y conversaciones difíciles",
        "Gestión del estrés",
        "Toma de decisiones",
        "Liderazgo consciente",
      ],
      cta: {
        label: "Ver servicio",
        href: "/servicios/coaching-ejecutivo",
      },
    },
    {
      icon: Building2,
      title: "Consultoría organizacional y transformación con AI",
      subtitle: "Para empresas y equipos",
      description:
        "Acompaño equipos y organizaciones a ordenar procesos, mejorar dinámicas de trabajo y adoptar inteligencia artificial de forma clara, responsable y alineada a la calidad, la colaboración y los objetivos del negocio.",
      features: [
        "Cultura de calidad y procesos QA",
        "Adopción de AI con criterio y contexto",
        "Transformación organizacional",
        "Mejora de procesos y dinámicas",
        "Gestión del cambio",
      ],
      cta: {
        label: "Conocer más",
        href: "/servicios/consultoria-organizacional",
      },
    },
    {
      icon: UsersRound,
      title: "Talleres sobre liderazgo, calidad y adopción de AI",
      subtitle: "Para equipos y organizaciones",
      description:
        "Diseño y facilito charlas y workshops sobre liderazgo, comunicación, cultura de calidad, nuevo mindset de trabajo y adopción práctica de AI en equipos de tecnología.",
      features: [
        "Liderazgo y comunicación",
        "Cultura de calidad",
        "Adopción práctica de AI",
        "Nuevo mindset de trabajo",
        "Trabajo colaborativo",
      ],
      cta: {
        label: "Quiero saber más",
        href: "/servicios/talleres-charlas",
      },
    },
    {
      icon: GraduationCap,
      title: "Mentoring de QA y AI aplicada",
      subtitle: "Para talento QA y equipos de calidad",
      description:
        "Acompaño la formación de talento QA y equipos de calidad, integrando fundamentos de testing, criterio analítico, comunicación y uso responsable de AI para potenciar procesos de QA.",
      features: [
        "Fundamentos de testing",
        "Criterio analítico y reporte",
        "Comunicación profesional",
        "AI aplicada a QA",
        "Planes de crecimiento",
      ],
      cta: {
        label: "Ver servicio",
        href: "/servicios/formacion-qa",
      },
    },
  ]

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* AI Quote - Highlighted */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-primary/5 rounded-2xl p-8 lg:p-10 border border-primary/20">
            <div className="flex items-start gap-4">
              <Sparkles className="w-8 h-8 text-primary shrink-0 mt-1" />
              <div className="space-y-4">
                <p className="text-lg text-foreground leading-relaxed">
                  La inteligencia artificial no transforma una organización por sí sola. La transformación ocurre cuando las personas entienden cómo integrarla con criterio, procesos claros, colaboración y foco en calidad.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Mi trabajo es acompañar esa adopción desde una mirada técnica, humana y organizacional.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    AI como herramienta
                  </span>
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    Calidad como criterio
                  </span>
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    Personas como centro del cambio
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid - 5 cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="relative rounded-2xl p-6 lg:p-8 border transition-all duration-300 group bg-card border-border hover:border-primary hover:shadow-xl hover:-translate-y-2 hover:bg-primary/5 flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 bg-primary/10 group-hover:bg-primary/20 group-hover:scale-110">
                <service.icon className="w-6 h-6 transition-transform duration-300 text-primary group-hover:scale-110" />
              </div>

              <p className="text-sm font-medium mb-2 text-muted-foreground group-hover:text-primary transition-colors duration-300">
                {service.subtitle}
              </p>

              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {service.title}
              </h3>

              <p className="text-sm leading-relaxed mb-6 text-muted-foreground">
                {service.description}
              </p>

              <ul className="space-y-2 mb-8 flex-grow">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-foreground/80"
                  >
                    <span className="w-1.5 h-1.5 rounded-full transition-transform duration-300 bg-primary group-hover:scale-125" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button asChild className="w-full group/btn mt-auto">
                <Link href={service.cta.href}>
                  {service.cta.label}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="max-w-2xl mx-auto text-center mt-20">
          <h4 className="text-xl sm:text-2xl font-semibold text-foreground mb-4 text-balance">
            {"¿No estás seguro de qué servicio necesitás?"}
          </h4>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Podemos conversar para entender tu situación y encontrar la mejor forma de acompañarte.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="w-full sm:w-auto group">
              <Link href="/contacto">
                Escribime
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <a
                href="https://calendly.com/johanapaolarios/coaching-con-joha"
                target="_blank"
                rel="noopener noreferrer"
              >
                Agendar conversación
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
