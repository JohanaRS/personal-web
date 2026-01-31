import { Button } from "@/components/ui/button"
import { User, Briefcase, UsersRound, ArrowRight } from "lucide-react"

export function Services() {
  const services = [
    {
      icon: User,
      title: "Coaching Personal",
      subtitle: "Para vos",
      description:
        "Para personas que buscan claridad, nuevos habitos, foco, autoliderazgo y bienestar. Sesiones individuales donde trabajamos en lo que realmente importa para tu vida.",
      features: [
        "Claridad sobre lo que queres",
        "Cambio de habitos",
        "Gestion emocional",
        "Autoliderazgo",
        "Bienestar integral",
      ],
      cta: {
        label: "Agendar sesion",
        href: "https://calendly.com/d/cxhn-dzx-p6y/coaching-con-joha",
        external: true,
      },
    },
    {
      icon: Briefcase,
      title: "Coaching Profesional y Liderazgo",
      subtitle: "Para lideres y profesionales",
      description:
        "Para quienes lideran equipos o buscan crecer profesionalmente. Trabajamos comunicacion, feedback, gestion del estres, toma de decisiones y liderazgo consciente.",
      features: [
        "Comunicacion efectiva",
        "Dar y recibir feedback",
        "Gestion del estres",
        "Toma de decisiones",
        "Liderazgo consciente",
      ],
      cta: {
        label: "Contactar",
        href: "#contacto",
        external: false,
      },

    },
    {
      icon: UsersRound,
      title: "Talleres y Charlas",
      subtitle: "Para equipos y organizaciones",
      description:
        "Instancias formativas con enfoque practico, humano y aplicable. Disenadas para generar impacto real en la cultura y dinamicas de trabajo.",
      features: [
        "Liderazgo y comunicacion",
        "Cultura de calidad",
        "Mejora continua",
        "Trabajo colaborativo",
        "Bienestar organizacional",
      ],
      cta: {
        label: "Solicitar propuesta",
        href: "#contacto",
        external: false,
      },
    },
  ]

  return (
    <section id="servicios" className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Servicios
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-foreground leading-tight text-balance">
            Tres formas de acompanarte
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Cada persona y organizacion tiene necesidades unicas. Elegi el 
            formato que mejor se adapte a tu momento y objetivos.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="relative rounded-2xl p-6 lg:p-8 border transition-all duration-300 group bg-card border-border hover:border-primary hover:shadow-xl hover:-translate-y-2 hover:bg-primary/5"
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

              <ul className="space-y-2 mb-8">
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

              <Button asChild className="w-full group/btn">
                {service.cta.external ? (
                  <a
                    href={service.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {service.cta.label}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </a>
                ) : (
                  <a href={service.cta.href}>
                    {service.cta.label}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </a>
                )}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
