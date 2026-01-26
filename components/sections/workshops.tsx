import { Button } from "@/components/ui/button"
import {
  Heart,
  Bug,
  MessageCircle,
  Award,
  TrendingUp,
  Cpu,
} from "lucide-react"

export function Workshops() {
  const workshops = [
    {
      icon: Heart,
      title: "Liderar desde el cuidado",
      description:
        "Como construir equipos sostenibles donde el bienestar y los resultados convivan.",
    },
    {
      icon: Bug,
      title: "Debugging organizacional",
      description:
        "Encontrar y resolver los 'bugs' que frenan a tu equipo: comunicacion, procesos, dinamicas.",
    },
    {
      icon: MessageCircle,
      title: "Comunicacion en equipos diversos",
      description:
        "Herramientas para comunicarse mejor en contextos multiculturales y multidisciplinarios.",
    },
    {
      icon: Award,
      title: "Calidad como cultura",
      description:
        "Integrar la mentalidad de mejora continua en el ADN del equipo, mas alla de los procesos.",
    },
    {
      icon: TrendingUp,
      title: "Mejora continua aplicada al dia a dia",
      description:
        "Pequenos cambios, grandes resultados. Metodologias simples para mejorar constantemente.",
    },
    {
      icon: Cpu,
      title: "IA como acelerador del trabajo humano",
      description:
        "Como usar inteligencia artificial para potenciar (no reemplazar) el talento humano.",
    },
  ]

  return (
    <section id="talleres" className="py-20 lg:py-32 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Talleres & Charlas
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-foreground leading-tight text-balance">
            Formacion practica para equipos y organizaciones
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Cada taller esta disenado para generar impacto inmediato. 
            Combino teoria con ejercicios practicos y herramientas aplicables.
          </p>
        </div>

        {/* Workshops Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops.map((workshop) => (
            <div
              key={workshop.title}
              className="group bg-background rounded-xl p-6 border border-border transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 cursor-default"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                <workshop.icon className="w-5 h-5 text-primary transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2 transition-colors duration-300 group-hover:text-primary">
                {workshop.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {workshop.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-6">
            Buscas un taller a medida para tu equipo?
          </p>
          <Button asChild size="lg">
            <a href="#contacto">Solicitar propuesta personalizada</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
