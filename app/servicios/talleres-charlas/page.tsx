import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Workshops } from "@/components/sections/workshops"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, UsersRound } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Talleres y Charlas | Johana Ríos",
  description: "Talleres y charlas para equipos y organizaciones. Liderazgo, comunicación, cultura de calidad, mejora continua y bienestar organizacional.",
}

export default function TalleresCharlasPage() {
  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-20">
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-secondary/30 to-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <UsersRound className="w-4 h-4" />
                Para equipos y organizaciones
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight text-balance">
                Talleres y Charlas
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Instancias formativas con enfoque práctico, humano y aplicable. Diseñadas para generar impacto real en la cultura, las conversaciones y las dinámicas de trabajo.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/contacto">
                    Solicitar propuesta
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <a
                    href="https://calendly.com/johanapaolarios/coaching-con-joha"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Calendar className="h-4 w-4" />
                    Agendar llamada
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Workshops />

        {/* CTA */}
        <section className="py-20 lg:py-24 bg-primary/5">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4 text-balance">
              {"¿Querés un taller a medida para tu equipo?"}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
              Diseño talleres y charlas adaptados a las necesidades específicas de tu organización. Conversemos sobre lo que tu equipo necesita.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link href="/contacto">
                  Solicitar propuesta
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link href="/servicios">
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
