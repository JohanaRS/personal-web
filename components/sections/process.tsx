import { MessageCircleQuestion, Layers, Focus, Footprints } from "lucide-react"

export function Process() {
  const steps = [
    {
      icon: MessageCircleQuestion,
      title: "Preguntas que abren",
      description:
        "Empiezo por escuchar y hacer preguntas que iluminan lo que no se ve. No doy respuestas rapidas; construyo claridad contigo.",
    },
    {
      icon: Layers,
      title: "Estructura y orden",
      description:
        "Organizo el ruido interno. Trabajo con metodologias claras que dan sosten al proceso sin rigidez.",
    },
    {
      icon: Focus,
      title: "Foco y prioridad",
      description:
        "Identificamos que es realmente importante. No se trata de hacer mas, sino de hacer lo que importa.",
    },
    {
      icon: Footprints,
      title: "Accion sostenible",
      description:
        "Cada sesion termina con pasos concretos. Avanzamos de forma progresiva, cuidando tu energia y bienestar.",
    },
  ]

  return (
    <section id="como-acompano" className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Como acompano
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-foreground leading-tight text-balance">
            Acompano procesos de cambio, no soluciones magicas
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Mi trabajo es ayudarte a ver lo que no ves, ordenar lo que te abruma 
            y construir un camino que tenga sentido para vos. Integro coaching, 
            comunicacion, procesos y calidad de forma personalizada.
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative group">
              {/* Connector line - hidden on mobile */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-border" />
              )}
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                  <step.icon className="w-7 h-7 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3 transition-colors duration-300 group-hover:text-primary">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Differentiator box */}
        <div className="mt-20 bg-card rounded-2xl p-8 lg:p-12 border border-border transition-all duration-300 hover:shadow-lg hover:border-primary/20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                No doy recetas, construyo caminos personalizados
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Cada persona, equipo u organizacion tiene su historia, sus 
                recursos y sus desafios unicos. Mi rol es acompanarte a descubrir 
                tus propias respuestas, no imponerte las mias.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Coaching", desc: "Personal y profesional" },
                { label: "Comunicacion", desc: "Efectiva y consciente" },
                { label: "Procesos", desc: "Claros y sostenibles" },
                { label: "Neurociencia", desc: "Aplicada al cambio" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-background rounded-lg p-4 border border-border transition-all duration-300 hover:border-primary/30 hover:shadow-md hover:-translate-y-1 cursor-default"
                >
                  <p className="font-semibold text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
