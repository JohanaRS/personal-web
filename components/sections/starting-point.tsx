import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"

export function StartingPoint() {
  return (
    <section id="empeza-por-aca" className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Punto de partida
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-foreground leading-tight text-balance">
            Empeza por aca
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            El primer paso hacia tu transformacion comienza con autoconocimiento
          </p>
        </div>

        {/* Wheel of Life Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl p-8 lg:p-12 border border-border transition-all duration-300 hover:shadow-lg hover:border-primary/20">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Left Content */}
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  La Rueda de la Vida
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  La rueda de la vida es una herramienta visual de desarrollo 
                  personal que representa, en forma de circulo dividido en 
                  secciones, las areas mas importantes de la vida: 
                  <span className="text-foreground font-medium">
                    salud, trabajo, finanzas, relaciones, ocio, crecimiento 
                    personal, proposito y amor.
                  </span>
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Descubri como esta tu equilibrio actual y que areas necesitan 
                  mas atencion.
                </p>
                
                <Button asChild size="lg" className="group">
                  <a href="/rueda-de-la-vida">
                    Ve tu Rueda de la Vida
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>

              {/* Right Content - Info Box */}
              <div className="bg-background rounded-xl p-6 border border-border transition-all duration-300 hover:border-primary/30 hover:shadow-md">
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-medium text-primary mb-2">
                      Para que sirve?
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      La rueda de la vida te permite evaluar tu nivel de 
                      satisfaccion en distintas areas de tu vida y detectar 
                      cuales necesitan mas atencion.
                    </p>
                  </div>

                  <div className="border-t border-border pt-6">
                    <p className="text-sm text-muted-foreground mb-4">
                      Queres explorar tus resultados con acompanamiento profesional?
                    </p>
                    <Button asChild variant="outline" size="sm" className="group">
                      <a
                        href="https://calendly.com/d/cxhn-dzx-p6y/coaching-con-joha"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Agendar sesion
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
