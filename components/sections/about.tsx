"use client"

import Image from "next/image"
import { Heart, Eye, Lightbulb, Target, Brain, Users, MessageSquare, Cog, Mic2, TrendingUp, Laptop } from "lucide-react"

export function About() {
  const enfoque = [
    { icon: Brain, label: "Coaching con PNL" },
    { icon: Lightbulb, label: "Neurociencia aplicada" },
    { icon: Users, label: "Coaching ejecutivo y organizacional" },
    { icon: Target, label: "Liderazgo de equipos" },
    { icon: MessageSquare, label: "Comunicación efectiva" },
    { icon: Cog, label: "Mejora continua" },
    { icon: Laptop, label: "Experiencia real en empresas tech" },
  ]

  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="flex justify-center lg:justify-start order-1 lg:order-1">
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -inset-3 border-2 border-primary/20 rounded-2xl" />
              
              {/* Image container */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/johana-about.jpg"
                  alt="Johana Ríos, coach certificada y facilitadora de procesos de cambio"
                  width={450}
                  height={550}
                  className="object-cover object-top w-72 h-80 sm:w-80 sm:h-96 lg:w-[380px] lg:h-[480px]"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-2 lg:order-2">
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Sobre mí
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-foreground leading-tight text-balance">
              Soy Johana Ríos
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Pero podés decirme <strong className="text-foreground">Joha</strong>.
            </p>
            
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Vengo del mundo tech y hace años trabajo liderando equipos, procesos y calidad de software. En ese camino descubrí que los resultados no dependen solo de herramientas o metodologías, sino de la <strong className="text-foreground">forma en que las personas se comunican, toman decisiones, atraviesan desafíos y construyen confianza</strong>.
              </p>
              <p>
                Me formé como coach en Programación Neurolingüística y sigo profundizando en coaching ejecutivo, neurociencia aplicada, liderazgo y desarrollo humano.
              </p>
              <p>
                Hoy integro esos mundos: <strong className="text-foreground">estructura y sensibilidad, procesos y personas, ciencia y consciencia, liderazgo y bienestar</strong>.
              </p>
              <p>
                Acompaño a personas, líderes y equipos a generar claridad, ordenar lo que abruma, revisar patrones, tomar mejores decisiones y construir formas de avanzar más sostenibles.
              </p>
            </div>

            {/* Values */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { icon: Heart, label: "Cuidado y escucha" },
                { icon: Eye, label: "Claridad y foco" },
                { icon: Lightbulb, label: "Propósito" },
                { icon: Target, label: "Acción sostenible" },
              ].map(({ icon: Icon, label }) => (
                <div 
                  key={label} 
                  className="flex items-center gap-3 group cursor-default"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                    <Icon className="w-5 h-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <span className="text-sm font-medium text-foreground transition-colors duration-300 group-hover:text-primary">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mi enfoque combina */}
        <div className="mt-16 bg-background rounded-2xl p-8 lg:p-10 border border-border">
          <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
            Mi enfoque combina
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {enfoque.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 transition-all duration-300 hover:bg-primary/10 hover:border-primary/30"
              >
                <Icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
