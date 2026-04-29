import { Button } from "@/components/ui/button"
import { User, Briefcase, UsersRound, Building2, ArrowRight, CheckCircle2, Lightbulb, Users, Cog, Quote } from "lucide-react"

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
        label: "Agendar sesión",
        href: "https://calendly.com/johanapaolarios/coaching-con-joha",
        external: true,
      },
    },
    {
      icon: Briefcase,
      title: "Coaching Profesional y Liderazgo",
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
        "Instancias formativas con enfoque práctico, humano y aplicable. Diseñadas para generar impacto real en la cultura, las conversaciones y las dinámicas de trabajo.",
      features: [
        "Liderazgo y comunicación",
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
    {
      icon: Building2,
      title: "Transformación de Equipos y Cultura de Calidad",
      subtitle: "Para empresas y equipos",
      description:
        "Acompaño empresas, equipos y líderes a revisar, ordenar y transformar su forma de trabajar. Integro experiencia en liderazgo tech, calidad de software, desarrollo de talento, coaching organizacional, PNL y neurociencia aplicada al cambio.",
      features: [
        "Assessment de procesos y cultura de calidad",
        "Mejora de procesos QA y formas de trabajo",
        "Desarrollo e implantación de talento QA junior",
        "Transformación organizacional y mejora continua",
        "Adopción de herramientas, agilidad e IA",
      ],
      cta: {
        label: "Solicitar propuesta",
        href: "#contacto",
        external: false,
      },
    },
  ]

  const consultingBlocks = [
    {
      icon: Cog,
      title: "Cultura de Calidad y Procesos QA",
      description:
        "Para equipos tech, startups, software factories o áreas de producto que necesitan revisar, ordenar o evolucionar su forma de trabajar la calidad.",
      features: [
        "Assessment de madurez QA",
        "Revisión de procesos de testing",
        "Estrategia de testing funcional y no funcional",
        "Definición de roles, responsabilidades y acuerdos de trabajo",
        "Métricas e indicadores de calidad",
        "Adopción de herramientas, automatización e inteligencia artificial",
        "Workshops de alineación entre QA, desarrollo, producto y liderazgo",
      ],
      result:
        "Procesos QA más claros, mejor colaboración entre áreas, reducción de retrabajo y una cultura de calidad más compartida.",
    },
    {
      icon: Users,
      title: "Desarrollo e Implantación de Talento QA Junior",
      description:
        "Para empresas que quieren incorporar talento QA trainee o junior con acompañamiento técnico, desarrollo de soft skills y liderazgo experto.",
      features: [
        "Evaluación y preparación de perfiles",
        "Mentoría en testing funcional y no funcional",
        "Desarrollo de criterio QA",
        "Comunicación profesional y reporte de bugs",
        "Planes de crecimiento individual",
        "Seguimiento semanal o quincenal",
        "Acompañamiento como tech lead durante la inserción",
      ],
      result:
        "Talento junior más preparado, acompañado en su curva de aprendizaje y con mayor capacidad de aportar valor real al proyecto.",
    },
    {
      icon: Lightbulb,
      title: "Transformación Organizacional y Mejora de Procesos",
      description:
        "Para organizaciones, áreas o equipos que necesitan definir procesos, mejorar dinámicas, ordenar responsabilidades o atravesar cambios culturales, operativos o tecnológicos.",
      features: [
        "Diagnóstico organizacional",
        "Mapeo de procesos y fricciones",
        "Definición de roles y responsabilidades",
        "Alineación de objetivos",
        "Mejora de comunicación y coordinación",
        "Facilitación de workshops",
        "Coaching ejecutivo/organizacional",
        "Seguimiento de adopción y mejora continua",
      ],
      result:
        "Equipos con más claridad, mejores acuerdos, procesos sostenibles y mayor capacidad de adaptación.",
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
            Formas de acompañarte
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Cada persona, equipo u organización tiene necesidades únicas. Elijo acompañar procesos desde una mirada humana, estructurada y orientada a cambios sostenibles.
          </p>
        </div>

        {/* Services Grid - 4 cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
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

        {/* Consulting Subsection */}
        <div className="mt-24 lg:mt-32">
          {/* Subsection Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Consultoría
            </span>
            <h3 className="mt-4 text-2xl sm:text-3xl font-semibold text-foreground leading-tight text-balance">
              Consultoría para equipos, calidad y transformación organizacional
            </h3>
            <div className="mt-6 text-muted-foreground leading-relaxed space-y-4">
              <p>
                Muchas veces los problemas de una organización no aparecen por falta de talento, sino por falta de claridad: procesos poco definidos, roles difusos, comunicación fragmentada, cambios que no terminan de adoptarse o equipos que trabajan en modo reactivo.
              </p>
              <p>
                Mi trabajo es acompañar a empresas y equipos a ordenar esa complejidad, integrando una mirada técnica, humana y sistémica del cambio.
              </p>
            </div>
          </div>

          {/* Consulting Blocks */}
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {consultingBlocks.map((block) => (
              <div
                key={block.title}
                className="bg-card rounded-2xl p-6 lg:p-8 border border-border transition-all duration-300 hover:shadow-lg hover:border-primary/30 flex flex-col"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary/10 mb-5">
                  <block.icon className="w-5 h-5 text-primary" />
                </div>

                <h4 className="text-lg font-semibold text-foreground mb-3">
                  {block.title}
                </h4>

                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {block.description}
                </p>

                <ul className="space-y-2 mb-6 flex-grow">
                  {block.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-foreground/80"
                    >
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

          {/* Highlighted Quote */}
          <div className="max-w-3xl mx-auto mt-12">
            <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20 text-center">
              <Quote className="w-8 h-8 text-primary/40 mx-auto mb-4" />
              <blockquote className="text-lg font-medium text-foreground leading-relaxed text-balance">
                Transformar equipos no es solo cambiar procesos. Es acompañar personas, conversaciones y decisiones para que el sistema completo pueda evolucionar.
              </blockquote>
            </div>
          </div>

          {/* Final CTA */}
          <div className="max-w-2xl mx-auto text-center mt-16">
            <h4 className="text-xl sm:text-2xl font-semibold text-foreground mb-4 text-balance">
              {"¿Tu equipo necesita ordenar procesos, desarrollar talento o transformar su forma de trabajar?"}
            </h4>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Podemos conversar para entender el contexto, detectar necesidades y diseñar una propuesta a medida.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto group">
                <a href="#contacto">
                  Solicitar propuesta
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
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
                  Agendar llamada exploratoria
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
