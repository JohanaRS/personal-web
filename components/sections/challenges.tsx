"use client"

import { Compass, Link2, Layers, Brain } from "lucide-react"

export function Challenges() {
  const challenges = [
    {
      icon: Compass,
      title: "Los desafíos son oportunidades de desarrollo",
      desc: "Cada dificultad contiene información valiosa para crecer. No huyo de la incomodidad, la uso como brújula.",
    },
    {
      icon: Link2,
      title: "Soy puente entre mundos",
      desc: "Entre lo humano y los procesos. Entre la emoción y la evidencia. Entre el bienestar y los resultados.",
    },
    {
      icon: Layers,
      title: "Mirada integral de calidad",
      desc: "Aplico principios de mejora continua no solo a procesos, sino a la vida personal y profesional.",
    },
    {
      icon: Brain,
      title: "Basado en neurociencia",
      desc: "Integro conocimientos de cómo funciona el cerebro para facilitar cambios reales y sostenibles.",
    },
  ]

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Mi mirada
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-foreground leading-tight text-balance">
            Cómo miro los desafíos
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {challenges.map((item) => (
            <div 
              key={item.title} 
              className="bg-card rounded-2xl p-6 lg:p-8 border border-border transition-all duration-300 hover:shadow-lg hover:border-primary/20 group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
