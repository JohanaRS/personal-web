import { Heart, Eye, Lightbulb, Target } from "lucide-react"

export function About() {
  return (
    <section id="sobre-mi" className="py-20 lg:py-32 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Sobre mí
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-foreground leading-tight text-balance">
              Soy Johana Ríos
            </h2>
            
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Coach certificada y facilitadora de procesos de cambio. Mi camino 
                profesional me llevó desde la calidad de software y la gestión de 
                equipos de tecnología hasta el acompañamiento de personas, líderes 
                y organizaciones.
              </p>
              <p>
                Creo en un enfoque donde <strong className="text-foreground">lo humano y los procesos se integran</strong>,
                donde el bienestar y los resultados no son opuestos, y donde cada 
                desafío es una oportunidad de desarrollo.
              </p>
              <p>
                Mi formación combina neurociencia aplicada, coaching ontológico y 
                ejecutivo, PNL, comunicación no violenta y metodologías de mejora 
                continua. Esta integración me permite acompañar desde una mirada 
                profunda, estructurada y siempre humana.
              </p>
            </div>

            {/* Values */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                { icon: Heart, label: "Cuidado y escucha" },
                { icon: Eye, label: "Claridad y foco" },
                { icon: Lightbulb, label: "Propósito" },
                { icon: Target, label: "Acción sostenible" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* How I see challenges */}
          <div className="bg-background rounded-2xl p-8 lg:p-10 border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Cómo miro los desafíos
            </h3>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-1 rounded-full bg-primary" />
                <div>
                  <p className="font-medium text-foreground">
                    Los desafíos son oportunidades de desarrollo
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Cada dificultad contiene información valiosa para crecer.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-1 rounded-full bg-primary" />
                <div>
                  <p className="font-medium text-foreground">
                    Soy puente entre mundos
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Entre lo humano y los procesos. Entre la emoción y la evidencia. 
                    Entre el bienestar y los resultados.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-1 rounded-full bg-primary" />
                <div>
                  <p className="font-medium text-foreground">
                    Mirada integral de calidad
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Aplico principios de mejora continua no solo a procesos, 
                    sino a la vida personal y profesional.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-1 rounded-full bg-primary" />
                <div>
                  <p className="font-medium text-foreground">
                    Basado en neurociencia
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Integro conocimientos de cómo funciona el cerebro para 
                    facilitar cambios reales y sostenibles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
