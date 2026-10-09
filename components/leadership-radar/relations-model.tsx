import { ArrowRight } from "lucide-react"
import { DIMENSIONS, RELATIONS_FLOW, RELATIONS_INTRO } from "./content"
import { DimensionIcon } from "./dimension-icon"

export function RelationsModel() {
  return (
    <div className="flex flex-col gap-8">
      <p className="max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty">{RELATIONS_INTRO}</p>

      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {DIMENSIONS.map((dimension, i) => (
          <li
            key={dimension.id}
            className="relative flex flex-col gap-3 rounded-xl border border-border bg-card p-6"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <DimensionIcon id={dimension.id} className="size-5" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">{dimension.modelLabel}</p>
              <h3 className="mt-1 text-lg font-semibold text-foreground">{dimension.name}</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{dimension.modelSummary}</p>
            {i < DIMENSIONS.length - 1 && (
              <ArrowRight
                className="absolute -right-6 top-1/2 hidden size-4 -translate-y-1/2 text-muted-foreground lg:block"
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ol>

      <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground text-pretty">{RELATIONS_FLOW}</p>
    </div>
  )
}
