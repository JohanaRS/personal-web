import { Header } from "@/components/header"
import { Hero } from "@/components/sections/hero"
import { FAQ } from "@/components/sections/faq"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, User, Briefcase, Building2, UsersRound } from "lucide-react"
import Link from "next/link"

const featuredServices = [
  {
    icon: User,
    title: "Coaching Personal",
    description: "Claridad, nuevos hábitos y bienestar para tu vida personal.",
    href: "/servicios/coaching-personal",
  },
  {
    icon: Briefcase,
    title: "Coaching Ejecutivo",
    description: "Liderazgo, comunicación y toma de decisiones para profesionales.",
    href: "/servicios/coaching-ejecutivo",
  },
  {
    icon: Building2,
    title: "Consultoría Organizacional",
    description: "Transformación de equipos, procesos y cultura de calidad.",
    href: "/servicios/consultoria-organizacional",
  },
  {
    icon: UsersRound,
    title: "Talleres y Charlas",
    description: "Instancias formativas para equipos y organizaciones.",
    href: "/servicios/talleres-charlas",
  },
]

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />

        {/* Featured Services */}
        <section className="py-20 lg:py-28 bg-card">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                Servicios
              </span>
              <h2 className="mt-4 text-2xl sm:text-3xl font-semibold text-foreground leading-tight">
                Formas de acompañarte
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Cada persona, equipo u organización tiene necesidades únicas.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredServices.map((service) => (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group bg-background rounded-xl p-6 border border-border transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-primary/20">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  <span className="text-sm font-medium text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Ver más
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link href="/servicios">
                  Ver todos los servicios
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* About Preview */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-primary font-medium text-sm uppercase tracking-wider">
                  Sobre mí
                </span>
                <h2 className="mt-4 text-2xl sm:text-3xl font-semibold text-foreground leading-tight text-balance">
                  Soy Johana Ríos
                </h2>
                <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Coach certificada en PNL, con experiencia en liderazgo tech, calidad de software y transformación organizacional.
                  </p>
                  <p>
                    Creo en un enfoque donde <strong className="text-foreground">lo humano y los procesos se integran</strong>, donde el bienestar y los resultados no son opuestos.
                  </p>
                </div>
                <div className="mt-8">
                  <Button asChild className="gap-2">
                    <Link href="/sobre-mi">
                      Conocé mi historia
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-6">
                  Mi enfoque integra
                </h3>
                <ul className="space-y-4">
                  {[
                    "Coaching ejecutivo y organizacional",
                    "Coaching con PNL y neurociencia aplicada",
                    "Experiencia real en liderazgo y gestión de equipos",
                    "Mirada sistémica de procesos y cultura organizacional",
                    "Metodologías de mejora continua y calidad",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span className="text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Resource CTA */}
        <section className="py-16 lg:py-20 bg-primary/5">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Recurso gratuito
            </span>
            <h2 className="mt-4 text-2xl sm:text-3xl font-semibold text-foreground mb-4 text-balance">
              La Rueda de la Vida
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
              Descubrí tu nivel de equilibrio actual en las áreas clave de tu vida con esta herramienta de autoconocimiento.
            </p>
            <Button asChild size="lg" className="gap-2">
              <Link href="/recursos/rueda-de-la-vida">
                Hacer el ejercicio
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* FAQ */}
        <FAQ />

        {/* Final CTA */}
        <section className="py-20 lg:py-28 bg-card">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4 text-balance">
              {"¿Listo/a para dar el primer paso?"}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
              El primer paso es conversar. Agendá una sesión exploratoria sin compromiso para conocernos y ver cómo puedo acompañarte.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg">
                <a
                  href="https://calendly.com/johanapaolarios/coaching-con-joha"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Agendar conversación
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contacto">
                  Escribime
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
