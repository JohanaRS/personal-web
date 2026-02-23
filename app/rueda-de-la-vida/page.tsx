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
    "Herramienta interactiva de reflexi\u00f3n personal. Evalu\u00e1 8 \u00e1reas clave de tu vida y descubr\u00ed d\u00f3nde est\u00e1s hoy y d\u00f3nde te gustar\u00eda estar.",
  openGraph: {
    title: "Rueda de la Vida | Johana Rios",
    description:
      "Herramienta interactiva de reflexi\u00f3n personal para evaluar las \u00e1reas clave de tu vida.",
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
            <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto text-pretty">
              Esta herramienta interactiva te invita a hacer una pausa y reflexionar
              sobre las \u00e1reas clave de tu vida. Evalu\u00e1 d\u00f3nde te encontr\u00e1s hoy y
              descubr\u00ed qu\u00e9 peque\u00f1os pasos podr\u00edan acercarte a la vida que quer\u00e9s.
            </p>
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
              {"M\u00e1s que una autoevaluaci\u00f3n"}
            </h2>
            <p className="text-muted-foreground text-center leading-relaxed mb-8 text-pretty">
              {"Esta Rueda de la Vida puede ser tambi\u00e9n el punto de partida para un proceso de coaching personalizado. Al explorar cada \u00e1rea, obtendr\u00e1s claridad sobre d\u00f3nde te encontr\u00e1s, reconocer\u00e1s patrones y podr\u00e1s tomar acciones alineadas hacia tus objetivos."}
            </p>
            <div className="flex justify-center">
              <Button asChild size="lg">
                <a
                  href="https://calendly.com/johanapaolarios/coaching-con-joha"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {"Agendar sesi\u00f3n de coaching"}
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
