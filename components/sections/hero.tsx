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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 transition-all duration-300 hover:bg-primary/20 hover:scale-105 cursor-default">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Coaching con PNL
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground leading-tight tracking-tight text-balance mb-6">
            Claridad para avanzar,{" "}
            <span className="text-primary">consciencia para sostener el camino</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6 text-pretty">
            Coaching con Programacion Neurolinguistica para acompanarte en tus 
            procesos personales y profesionales, con un enfoque humano, consciente 
            y sostenible.
          </p>

          {/* Supporting text */}
          <p className="text-base text-muted-foreground/80 leading-relaxed max-w-xl mx-auto mb-10 text-pretty">
            Te acompano en procesos de cambio, toma de decisiones, desarrollo 
            personal, liderazgo y trabajo en equipo. Cada camino es unico, y 
            estoy aqui para recorrerlo contigo.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="text-base px-8 group">
              <a href="#como-acompano">
                Conocer como acompano
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base px-8">
              <a href="#contacto">
                Conversemos
              </a>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 pt-10 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-6">
              Para quienes buscan:
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-foreground/70">
              {[
                "Claridad interior",
                "Transitar cambios",
                "Crecer con consciencia",
                "Liderar desde el ser",
                "Bienestar sostenible",
              ].map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 rounded-full bg-card border border-border transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:text-primary cursor-default"
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
