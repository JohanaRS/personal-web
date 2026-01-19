import { Users, BarChart3, MessageSquare, Sparkles } from "lucide-react"

export function Experience() {
  const areas = [
    {
      icon: Users,
      title: "Liderazgo de equipos",
      description:
        "Años de experiencia liderando equipos diversos, entendiendo las dinámicas humanas que hacen que un grupo funcione... o se desgaste.",
      highlights: ["Gestión de conflictos", "Desarrollo de talento", "Cultura de equipo"],
    },
    {
      icon: BarChart3,
      title: "Calidad y mejora continua",
      description:
        "Mi formación en calidad de software me enseñó que los mejores sistemas son los que aprenden y mejoran constantemente.",
      highlights: ["Procesos iterativos", "Retroalimentación", "Optimización"],
    },
    {
      icon: MessageSquare,
      title: "Procesos y comunicación",
      description:
        "La comunicación clara y los procesos bien definidos son la base de cualquier transformación sostenible.",
      highlights: ["Comunicación no violenta", "Feedback efectivo", "Claridad"],
    },
    {
      icon: Sparkles,
      title: "Coaching personal y profesional",
      description:
        "Certificada en coaching ontológico y ejecutivo, con enfoque en neurociencia aplicada y PNL para facilitar cambios profundos.",
      highlights: ["Neurociencia", "PNL", "Coaching ontológico"],
    },
  ]

  return (
    <section className="py-20 lg:py-32 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Experiencia y saberes
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-foreground leading-tight text-balance">
            Un camino que integra lo técnico y lo humano
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            No me defino por cargos o títulos, sino por el impacto que puedo 
            generar combinando distintas miradas y experiencias.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {areas.map((area) => (
            <div
              key={area.title}
              className="group bg-background rounded-2xl p-6 lg:p-8 border border-border transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <area.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">
                    {area.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                    {area.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {area.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="text-xs font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
