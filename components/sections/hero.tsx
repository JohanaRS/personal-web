import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center pt-16 lg:pt-24"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-background" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-8">
              {[
                "Liderazgo",
                "Coaching con programación neurolingüística",
                "Calidad",
                "Coaching ejecutivo y organizacional",
              ].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-semibold text-foreground leading-tight tracking-tight text-balance mb-6">
              Claridad para avanzar,{" "}
              <span className="text-primary">consciencia para sostener el camino</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-6 text-pretty">
              Coaching con Programación Neurolingüística para acompañarte en tus 
              procesos personales y profesionales, con un enfoque humano, consciente 
              y sostenible.
            </p>

            {/* Supporting text */}
            <p className="text-base text-muted-foreground/80 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10 text-pretty">
              Te acompaño en procesos de cambio, toma de decisiones, desarrollo 
              personal, liderazgo y trabajo en equipo. Cada camino es único, y 
              estoy aquí para recorrerlo contigo.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
              <Button asChild size="lg" className="text-base px-8 group">
                <a href="/sobre-mi#como-acompano">
                  Conocer cómo acompaño
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base px-8">
                <a href="/contacto">
                  Conversemos
                </a>
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -inset-4 bg-primary/5 rounded-3xl -rotate-3 hidden lg:block" />
              <div className="absolute -inset-4 border-2 border-primary/20 rounded-3xl rotate-2 hidden lg:block" />
              
              {/* Image container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/johana-hero.jpg"
                  alt="Johana Ríos, coach en PNL y facilitadora de procesos de cambio"
                  width={500}
                  height={600}
                  className="object-cover object-top w-72 h-80 sm:w-80 sm:h-96 lg:w-[400px] lg:h-[500px]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 pt-10 border-t border-border/50">
          <p className="text-sm text-muted-foreground mb-6 text-center">
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
    </section>
  )
}
