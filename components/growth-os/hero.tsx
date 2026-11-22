import { GrowthOsAccessButton } from "./access-button"

export function GrowthOsHero() {
  return (
    <section aria-labelledby="growth-os-title" className="py-16 lg:py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
            Versión piloto
          </span>

          <h1
            id="growth-os-title"
            className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground leading-tight tracking-tight text-balance"
          >
            Growth OS
          </h1>

          <p className="mt-4 text-xl sm:text-2xl text-primary font-medium text-balance">
            De tus ideas a acciones con sentido.
          </p>

          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl text-pretty">
            Una herramienta para ordenar lo que tenés en mente, definir hacia dónde querés ir y
            transformar tus objetivos en metas, indicadores y acciones concretas. Para avanzar con
            claridad y a tu ritmo, de forma individual o dentro de un proceso de coaching.
          </p>

          <div className="mt-8">
            <GrowthOsAccessButton />
          </div>
        </div>
      </div>
    </section>
  )
}
