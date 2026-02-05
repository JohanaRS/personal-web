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

          {/* How I see challenges */}
          <div className="bg-background rounded-2xl p-8 lg:p-10 border border-border transition-all duration-300 hover:shadow-lg hover:border-primary/20">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Cómo miro los desafíos
            </h3>
            
            <div className="space-y-6">
              {[
                {
                  title: "Los desafíos son oportunidades de desarrollo",
                  desc: "Cada dificultad contiene información valiosa para crecer.",
                },
                {
                  title: "Soy puente entre mundos",
                  desc: "Entre lo humano y los procesos. Entre la emoción y la evidencia. Entre el bienestar y los resultados.",
                },
                {
                  title: "Mirada integral de calidad",
                  desc: "Aplico principios de mejora continua no solo a procesos, sino a la vida personal y profesional.",
                },
                {
                  title: "Basado en neurociencia",
                  desc: "Integro conocimientos de cómo funciona el cerebro para facilitar cambios reales y sostenibles.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 group cursor-default">
                  <div className="flex-shrink-0 w-1 rounded-full bg-primary transition-all duration-300 group-hover:bg-primary group-hover:w-1.5" />
                  <div>
                    <p className="font-medium text-foreground transition-colors duration-300 group-hover:text-primary">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
