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
        "Cómo construir equipos sostenibles donde el bienestar y los resultados convivan.",
    },
    {
      icon: Bug,
      title: "Debugging organizacional",
      description:
        "Encontrar y resolver los 'bugs' que frenan a tu equipo: comunicación, procesos, dinámicas.",
    },
    {
      icon: MessageCircle,
      title: "Comunicación en equipos diversos",
      description:
        "Herramientas para comunicarse mejor en contextos multiculturales y multidisciplinarios.",
    },
    {
      icon: Award,
      title: "Calidad como cultura",
      description:
        "Integrar la mentalidad de mejora continua en el ADN del equipo, más allá de los procesos.",
    },
    {
      icon: TrendingUp,
      title: "Mejora continua aplicada al día a día",
      description:
        "Pequeños cambios, grandes resultados. Metodologías simples para mejorar constantemente.",
    },
    {
      icon: Cpu,
      title: "IA como acelerador del trabajo humano",
      description:
        "Cómo usar inteligencia artificial para potenciar (no reemplazar) el talento humano.",
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
            Formación práctica para equipos y organizaciones
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Cada taller está diseñado para generar impacto inmediato. 
            Combino teoría con ejercicios prácticos y herramientas aplicables.
          </p>
        </div>

        {/* Workshops Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops.map((workshop) => (
            <div
              key={workshop.title}
              className="group bg-background rounded-xl p-6 border border-border transition-all duration-300 hover:border-primary/30 hover:shadow-md"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <workshop.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
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
            ¿Buscás un taller a medida para tu equipo?
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <a href="#contacto">Solicitar propuesta personalizada</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
