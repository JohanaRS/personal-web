"use client"

import { cn } from "@/lib/utils"
import { STEPS } from "./content"

interface ProgressStepperProps {
  currentIndex: number
  maxIndex: number
  subLabel?: string
  onSelect: (index: number) => void
}

export function ProgressStepper({ currentIndex, maxIndex, subLabel, onSelect }: ProgressStepperProps) {
  return (
    <nav aria-label="Progreso del Radar de Liderazgo" className="mb-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="text-sm font-semibold text-foreground">
          Paso {currentIndex + 1} de {STEPS.length}
          <span className="font-normal text-muted-foreground"> · {STEPS[currentIndex].label}</span>
        </p>
        {subLabel && <p className="text-sm text-muted-foreground">{subLabel}</p>}
      </div>
      <ol className="mt-2 flex gap-1.5">
        {STEPS.map((step, i) => {
          const reachable = i <= maxIndex
          const isCurrent = i === currentIndex
          return (
            <li key={step.phase} className="flex-1">
              <button
                type="button"
                disabled={!reachable || isCurrent}
                onClick={() => onSelect(i)}
                aria-current={isCurrent ? "step" : undefined}
                aria-label={`Paso ${i + 1}: ${step.label}`}
                className="group w-full cursor-pointer py-2 text-left disabled:cursor-default"
              >
                <span
                  className={cn(
                    "block h-1.5 w-full rounded-full transition-colors",
                    isCurrent ? "bg-primary" : reachable ? "bg-primary/45 group-hover:bg-primary/70" : "bg-border"
                  )}
                />
                <span
                  className={cn(
                    "mt-2 hidden text-xs leading-tight md:block",
                    isCurrent ? "font-semibold text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
