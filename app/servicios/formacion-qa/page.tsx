import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, CheckCircle2, GraduationCap, Code, Users, Rocket, Target, Sparkles, Brain, MessageSquare, Shield, Quote } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Formación y Mentoring QA | Johana Ríos",
  description: "Formación y mentoring para talento QA junior. Desarrollo técnico, AI aplicada a QA, soft skills y acompañamiento para inserción laboral en tecnología.",
}

const aiTopics = [
  "Fundamentos de Quality Assurance",
  "Mindset QA orientado a valor y riesgo",
  "Uso de AI para análisis de tickets e historias de usuario",
  "Generación y revisión de casos de prueba con AI",
  "Mejora de documentación QA",
  "Diseño de estrategias de testing asistidas por AI",
  "Uso responsable de herramientas de AI",
  "Criterio humano para validar outputs generados por AI",
  "Comunicación de riesgos, hallazgos y decisiones",
  "Colaboración con desarrollo, producto y liderazgo",
  "Mejora continua de procesos QA",
]

const forWhom = [
  {
    icon: GraduationCap,
    title: "Personas que inician en QA",
    description: "Que quieren entrar al mundo de la tecnología como testers y necesitan formación práctica y actualizada.",
  },
  {
    icon: Code,
    title: "Juniors que buscan crecer",
    description: "Que ya trabajan en QA pero quieren mejorar sus habilidades técnicas, blandas y adoptar AI con criterio.",
  },
  {
    icon: Users,
    title: "Empresas que forman talento",
    description: "Que quieren desarrollar talento QA actualizado con mindset moderno y uso responsable de AI.",
  },
  {
    icon: Rocket,
    title: "Equipos QA en evolución",
    description: "Que necesitan incorporar AI a sus procesos sin perder el criterio humano ni la calidad.",
  },
  {
    icon: Sparkles,
    title: "Perfiles QA adoptando AI",
    description: "Que necesitan desarrollar criterio técnico y uso responsable de herramientas de inteligencia artificial.",
  },
  {
    icon: Brain,
    title: "Organizaciones en transición",
    description: "Que necesitan acompañar la evolución del rol QA en contextos potenciados por AI.",
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
    description: "Años liderando equipos QA, formando talento junior, diseñando procesos de calidad y adoptando AI.",
  },
]

const differentials = [
  {
    icon: Target,
    text: "Experiencia real liderando equipos de QA",
  },
  {
    icon: GraduationCap,
    text: "Formación de talento junior en empresas tech",
  },
  {
    icon: Sparkles,
    text: "Adopción de AI con criterio y contexto",
  },
  {
    icon: MessageSquare,
    text: "Desarrollo de habilidades humanas clave",
  },
  {
    icon: Shield,
    text: "Diseño de procesos de calidad sostenibles",
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
                Formación técnica + AI + acompañamiento
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight text-balance">
                Formación y Mentoring QA
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Acompaño la formación de talento QA con una mirada actualizada, integrando fundamentos de calidad, testing funcional, comunicación, criterio analítico y herramientas de AI aplicadas al trabajo diario.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="gap-2">
                  <a
                    href="https://calendly.com/johanapaolarios/coaching-con-joha"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Calendar className="h-4 w-4" />
                    Quiero desarrollar mi talento QA
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

        {/* AI Applied to QA - Nueva sección destacada */}
        <section className="py-16 lg:py-24 bg-primary/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Nuevo enfoque
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-6">
                AI aplicada a Quality Assurance
              </h2>
              <div className="text-muted-foreground leading-relaxed space-y-4 text-left">
                <p>
                  El rol de QA está evolucionando. Hoy no alcanza solo con ejecutar pruebas: necesitamos perfiles capaces de <strong className="text-foreground">analizar riesgos, entender procesos, comunicarse bien, usar herramientas de inteligencia artificial con criterio</strong> y seguir cuidando la calidad del producto desde una mirada integral.
                </p>
                <p>
                  Desde mi experiencia liderando equipos de QA y procesos de adopción de AI, acompaño a perfiles junior, trainee y equipos en el <strong className="text-foreground">desarrollo de nuevas capacidades</strong> para trabajar en entornos modernos de desarrollo de software.
                </p>
              </div>
            </div>

            {/* Key message */}
            <div className="max-w-3xl mx-auto mb-12">
              <div className="bg-card rounded-2xl p-8 border border-primary/20 relative">
                <Quote className="absolute top-4 left-4 w-8 h-8 text-primary/20" />
                <blockquote className="text-lg font-medium text-foreground leading-relaxed text-center text-balance pl-6">
                  La AI puede acelerar tareas, pero el valor del QA sigue estando en su criterio, pensamiento crítico, mirada de riesgo, comunicación y capacidad de cuidar la calidad del producto.
                </blockquote>
              </div>
            </div>

            {/* Topics grid */}
            <div className="max-w-4xl mx-auto">
              <h3 className="text-lg font-semibold text-foreground mb-6 text-center">
                {"¿Qué se puede trabajar?"}
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {aiTopics.map((topic) => (
                  <div key={topic} className="flex items-start gap-3 bg-card rounded-lg p-4 border border-border">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground/80 text-sm">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* For whom */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4">
                {"¿Para quién es?"}
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

        {/* My approach */}
        <section className="py-16 lg:py-24 bg-card">
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
                  className="bg-background rounded-xl p-6 border border-border"
                >
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Differential */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4">
                Mi diferencial
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Combino experiencia real liderando equipos de QA, formación de talento junior, diseño de procesos de calidad, adopción de AI y desarrollo de habilidades humanas clave como comunicación, criterio, ownership y colaboración.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {differentials.map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-3 bg-card rounded-full px-5 py-3 border border-border"
                >
                  <item.icon className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm text-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-24 bg-primary/5">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4 text-balance">
              {"¿Querés desarrollarte como profesional QA con mindset actual?"}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
              Conversemos sobre tu situación actual, tus objetivos y cómo puedo acompañarte en tu camino profesional integrando las herramientas y capacidades que el mercado necesita hoy.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <a
                  href="https://calendly.com/johanapaolarios/coaching-con-joha"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Calendar className="h-4 w-4" />
                  Quiero desarrollar mi talento QA
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
