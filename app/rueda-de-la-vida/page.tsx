import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LifeWheel } from "@/components/life-wheel/life-wheel"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Rueda de la Vida | Johana Rios",
  description:
    "Herramienta interactiva de reflexión personal. Evaluá 8 áreas clave de tu vida y descubrí dónde estás hoy y dónde te gustaría estar.",
  openGraph: {
    title: "Rueda de la Vida | Johana Rios",
    description:
      "Herramienta interactiva de reflexión personal para evaluar las áreas clave de tu vida.",
    type: "website",
  },
}

export default function RuedaDeLaVidaPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero section */}
        <section className="pt-24 pb-10 lg:pt-32 lg:pb-14 bg-secondary/40">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio
            </Link>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance leading-tight">
              Rueda de la Vida
            </h1>
            <div className="mt-6 text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto text-left space-y-4">
              <p className="font-medium text-foreground text-pretty">
                La Rueda de la Vida es una herramienta simple, pero muy potente.
              </p>
              <p className="text-pretty">
                Te permite visualizar cómo estás hoy en las áreas que sostienen tu vida: salud, vínculos, trabajo, finanzas, crecimiento, propósito y más.
              </p>
              <p className="text-pretty">
                Cuando ponemos algo en forma visual, el cerebro lo procesa distinto. Deja de ser una sensación difusa y se convierte en información concreta.
              </p>
              <p className="text-pretty">
                {'Muchas veces decimos "estoy bien" o "no estoy tan bien", pero no sabemos exactamente en qué. La rueda ordena eso.'}
              </p>
              <p className="text-pretty">
                Desde la neurociencia, sabemos que el cerebro necesita claridad para tomar decisiones. Cuando identificás qué áreas están fuertes y cuáles están más bajas, activás algo clave: conciencia.
              </p>
              <p className="font-medium text-foreground text-pretty">
                Y la conciencia es el primer paso para el cambio.
              </p>
              <p className="text-pretty">
                No es un examen. No es un juicio. Es una fotografía honesta de tu momento actual.
              </p>
              <p className="text-pretty">
                Y cuando sabés dónde estás, podés elegir con más intención hacia dónde querés ir.
              </p>
              <p className="font-medium text-foreground text-pretty">
                Si querés empezar a ordenar tu presente, esta es una muy buena manera.
              </p>
            </div>
          </div>
        </section>

        {/* Wheel section */}
        <section className="py-10 lg:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <LifeWheel />
          </div>
        </section>

        {/* Info section */}
        <section className="py-10 lg:py-16 bg-secondary/30">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground text-center mb-6 text-balance">
              Más que una autoevaluación
            </h2>
            <p className="text-muted-foreground text-center leading-relaxed mb-8 text-pretty">
              Esta Rueda de la Vida puede ser también el punto de partida para un
              proceso de coaching personalizado. Al explorar cada área, obtendrás
              claridad sobre dónde te encontrás, reconocerás patrones y podrás tomar
              acciones alineadas hacia tus objetivos.
            </p>
            <div className="flex justify-center">
              <Button asChild size="lg">
                <a
                  href="https://calendly.com/johanapaolarios/coaching-con-joha"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Agendar sesión de coaching
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
