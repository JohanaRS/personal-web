import { Heart, Eye, Lightbulb, Target } from "lucide-react"

export function About() {
  return (
    <section id="sobre-mi" className="py-20 lg:py-32 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Sobre mi
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-foreground leading-tight text-balance">
              Soy Johana Rios
            </h2>
            
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Coach certificada y facilitadora de procesos de cambio. Mi camino 
                profesional me llevo desde la calidad de software y la gestion de 
                equipos de tecnologia hasta el acompanamiento de personas, lideres 
                y organizaciones.
              </p>
              <p>
                Creo en un enfoque donde <strong className="text-foreground">lo humano y los procesos se integran</strong>,
                donde el bienestar y los resultados no son opuestos, y donde cada 
                desafio es una oportunidad de desarrollo.
              </p>
              <p>
                Mi formacion combina neurociencia aplicada, coaching ontologico y 
                ejecutivo, PNL, comunicacion no violenta y metodologias de mejora 
                continua. Esta integracion me permite acompanar desde una mirada 
                profunda, estructurada y siempre humana.
              </p>
            </div>

            {/* Values */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                { icon: Heart, label: "Cuidado y escucha" },
                { icon: Eye, label: "Claridad y foco" },
                { icon: Lightbulb, label: "Proposito" },
                { icon: Target, label: "Accion sostenible" },
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
              Como miro los desafios
            </h3>
            
            <div className="space-y-6">
              {[
                {
                  title: "Los desafios son oportunidades de desarrollo",
                  desc: "Cada dificultad contiene informacion valiosa para crecer.",
                },
                {
                  title: "Soy puente entre mundos",
                  desc: "Entre lo humano y los procesos. Entre la emocion y la evidencia. Entre el bienestar y los resultados.",
                },
                {
                  title: "Mirada integral de calidad",
                  desc: "Aplico principios de mejora continua no solo a procesos, sino a la vida personal y profesional.",
                },
                {
                  title: "Basado en neurociencia",
                  desc: "Integro conocimientos de como funciona el cerebro para facilitar cambios reales y sostenibles.",
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
