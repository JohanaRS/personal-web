import { audiences } from "./content"

export function GrowthOsAudience() {
  return (
    <section aria-labelledby="audience-title" className="py-16 lg:py-24 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Para quién es
          </span>
          <h2 id="audience-title" className="mt-4 text-2xl sm:text-3xl font-semibold text-foreground leading-tight text-balance">
            Para quienes quieren avanzar con intención
          </h2>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((item) => (
            <li
              key={item.title}
              className="bg-background rounded-xl p-6 border border-border transition-all duration-300 hover:shadow-lg hover:border-primary/30"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          <div className="rounded-2xl border border-border bg-background p-6 lg:p-8">
            <h3 className="text-lg font-semibold text-foreground">De forma individual</h3>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              Un espacio propio para pensar, decidir y dar seguimiento a lo que te proponés.
            </p>
          </div>
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 lg:p-8">
            <h3 className="text-lg font-semibold text-foreground">En procesos de coaching</h3>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              Un apoyo para llevar lo trabajado en sesión a objetivos, metas y acciones concretas entre encuentro y encuentro.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
