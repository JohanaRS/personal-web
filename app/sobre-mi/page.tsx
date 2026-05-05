import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { About } from "@/components/sections/about"
import { Challenges } from "@/components/sections/challenges"
import { Experience } from "@/components/sections/experience"
import { Process } from "@/components/sections/process"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, ExternalLink } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sobre mí | Johana Ríos",
  description: "Conocé mi historia, formación y enfoque. Coach certificada en PNL, especialista en liderazgo, calidad y transformación organizacional.",
}

export default function SobreMiPage() {
  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-20">
        {/* Hero section for this page */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-secondary/30 to-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                Conocé mi historia
              </span>
              <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight text-balance">
                Soy Joha, y este es mi camino
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Desde la tecnología y la calidad de software hasta el coaching y la transformación organizacional. Un recorrido que integra lo técnico con lo humano.
              </p>
              <a 
                href="https://medium.com/@johana_rios/storytelling-hola-soy-joha-3a07fb20a504"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Leer mi historia completa en Medium
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* 1. Sobre mí - Soy Johana Ríos */}
        <About />

        {/* 2. Cómo miro los desafíos */}
        <Challenges />

        {/* 3. Experiencias y saberes */}
        <Experience />

        {/* 4. Cómo acompaño */}
        <Process />

        {/* CTA Section */}
        <section className="py-20 lg:py-24 bg-primary/5">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4 text-balance">
              {"¿Te gustaría que conversemos?"}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
              Si algo de lo que leíste resonó con vos, podemos tener una primera conversación para conocernos y ver cómo puedo acompañarte.
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
                <a href="/servicios">
                  Ver servicios
                  <ArrowRight className="h-4 w-4" />
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
