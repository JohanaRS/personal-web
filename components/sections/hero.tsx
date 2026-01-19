import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center pt-16 lg:pt-20"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-background" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Coaching basado en neurociencia
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground leading-tight tracking-tight text-balance mb-6">
            Liderar, comunicar y mejorar…{" "}
            <span className="text-primary">sin romperte en el intento</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10 text-pretty">
            Acompaño procesos de cambio personal, profesional y organizacional 
            integrando liderazgo consciente, coaching, comunicación efectiva y 
            cultura de mejora continua desde lo humano.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-base px-8">
              <a href="#como-acompano">
                Conocer cómo acompaño
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base px-8 bg-transparent">
              <a href="#contacto">
                Contactarme
              </a>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 pt-10 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-6">
              Para personas, líderes, equipos y organizaciones que buscan:
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-foreground/70">
              {[
                "Claridad y foco",
                "Bienestar sostenible",
                "Comunicación efectiva",
                "Procesos claros",
                "Resultados con cuidado humano",
              ].map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 rounded-full bg-card border border-border"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
