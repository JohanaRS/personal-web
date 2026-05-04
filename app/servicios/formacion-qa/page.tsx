import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, CheckCircle2, GraduationCap, Code, Users, Rocket, Target } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Formación y Mentoring QA | Johana Ríos",
  description: "Formación y mentoring para talento QA junior. Desarrollo técnico, soft skills y acompañamiento para inserción laboral en tecnología.",
}

const features = [
  "Evaluación y preparación de perfiles QA",
  "Mentoría en testing funcional y no funcional",
  "Desarrollo de criterio QA y pensamiento crítico",
  "Comunicación profesional y reporte de bugs",
  "Planes de crecimiento individual personalizados",
  "Seguimiento semanal o quincenal",
  "Acompañamiento como tech lead durante la inserción",
  "Preparación para entrevistas técnicas",
]

const forWhom = [
  {
    icon: GraduationCap,
    title: "Personas que inician en QA",
    description: "Que quieren entrar al mundo de la tecnología como testers y necesitan formación práctica.",
  },
  {
    icon: Code,
    title: "Juniors que buscan crecer",
    description: "Que ya trabajan en QA pero quieren mejorar sus habilidades técnicas y blandas.",
  },
  {
    icon: Users,
    title: "Empresas que incorporan talento",
    description: "Que quieren integrar perfiles junior con acompañamiento experto.",
  },
  {
    icon: Rocket,
    title: "Equipos tech en crecimiento",
    description: "Que necesitan desarrollar capacidades QA internas de forma sostenible.",
  },
]

const approach = [
  {
    title: "Técnico + Humano",
    description: "No solo te enseño testing, te acompaño a desarrollar la mentalidad QA y las habilidades de comunicación que necesitás.",
  },
  {
    title: "Práctico y aplicable",
    description: "Trabajamos con casos reales, proyectos concretos y situaciones que vas a encontrar en tu trabajo.",
  },
  {
    title: "Personalizado",
    description: "Cada persona tiene su ritmo y sus desafíos. El acompañamiento se adapta a vos.",
  },
  {
    title: "Con experiencia real",
    description: "Tengo años de experiencia liderando equipos QA. Conozco los desafíos desde adentro.",
  },
]

export default function FormacionQAPage() {
  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-20">
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-secondary/30 to-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Target className="w-4 h-4" />
                Formación técnica + acompañamiento
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight text-balance">
                Formación y Mentoring QA
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Acompañamiento para talento QA junior que quiere desarrollarse profesionalmente. Formación técnica, soft skills y mentoría para tu inserción y crecimiento en el mundo tech.
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

        {/* What we work */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-6">
                  {"¿Qué incluye el mentoring?"}
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    El mentoring QA es un programa de acompañamiento diseñado para personas que están comenzando en el mundo del testing o que quieren dar un salto en su carrera.
                  </p>
                  <p>
                    No es solo formación técnica. Trabajamos también las <strong className="text-foreground">habilidades blandas</strong> que hacen la diferencia: comunicación, pensamiento crítico, trabajo en equipo y cómo desenvolverte en un entorno profesional.
                  </p>
                  <p>
                    Mi experiencia como QA Lead me permite acompañarte desde una mirada práctica y realista de lo que necesitás para crecer en esta profesión.
                  </p>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-6">
                  {"¿Qué trabajamos?"}
                </h3>
                <ul className="space-y-3">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground/80">{feature}</span>
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

        {/* My approach */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4">
                Mi enfoque
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {approach.map((item) => (
                <div
                  key={item.title}
                  className="bg-card rounded-xl p-6 border border-border"
                >
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
              {"¿Querés desarrollarte como profesional QA?"}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
              Conversemos sobre tu situación actual, tus objetivos y cómo puedo acompañarte en tu camino profesional.
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
