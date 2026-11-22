import { journey } from "./content"

export function GrowthOsJourney() {
  return (
    <section aria-labelledby="journey-title" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12 lg:mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Qué te permite
          </span>
          <h2 id="journey-title" className="mt-4 text-2xl sm:text-3xl font-semibold text-foreground leading-tight text-balance">
            Un recorrido claro, de la idea al avance
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed text-pretty">
            Growth OS acompaña cada paso del camino para que lo que pensás se convierta en algo que hacés.
          </p>
        </div>

        <ol className="relative mx-auto max-w-3xl flex flex-col gap-4">
          <span
            aria-hidden="true"
            className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-primary/10 via-primary/40 to-primary"
          />
          {journey.map((step, index) => (
            <li key={step.title} className="relative flex items-start gap-5">
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-background">
                <step.icon className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <div className="flex-1 bg-card rounded-xl p-5 border border-border transition-all duration-300 hover:shadow-md hover:border-primary/30">
                <p className="text-xs font-medium text-muted-foreground">
                  Paso {index + 1} de {journey.length}
                </p>
                <h3 className="mt-1 font-semibold text-foreground">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
