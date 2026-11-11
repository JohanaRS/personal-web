import { cn } from "@/lib/utils"
import { STAGES } from "./state"

export function Progress({
  stage,
  furthest,
  onGoToStage,
}: {
  stage: number
  furthest: number
  onGoToStage: (stage: number) => void
}) {
  return (
    <nav aria-label="Etapas de la pausa" className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">
        Etapa {stage + 1} de {STAGES.length}: <span className="font-semibold text-foreground">{STAGES[stage]}</span>
      </p>
      <ol className="flex gap-1.5">
        {STAGES.map((label, index) => {
          const reachable = index <= furthest && index !== stage
          const bar = (
            <span
              className={cn(
                "block h-1.5 w-full rounded-full transition-colors",
                index < stage ? "bg-olive" : index === stage ? "bg-primary" : "bg-sage",
              )}
            />
          )
          return (
            <li key={label} className="flex-1">
              {reachable ? (
                <button
                  type="button"
                  onClick={() => onGoToStage(index)}
                  className="flex h-6 w-full items-center rounded-sm focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
                >
                  {bar}
                  <span className="sr-only">Ir a la etapa {index + 1}: {label}</span>
                </button>
              ) : (
                <span className="flex h-6 items-center" aria-current={index === stage ? "step" : undefined}>
                  {bar}
                  <span className="sr-only">
                    Etapa {index + 1}: {label}
                    {index === stage ? " (actual)" : ""}
                  </span>
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
