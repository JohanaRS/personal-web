"use client"

import { useId } from "react"
import { cn } from "@/lib/utils"

interface Option<T extends string> {
  id: T
  label: string
  description?: string
}

/** Native radio inputs styled as cards: arrow keys, Space and touch all work without extra code. */
export function ChoiceGroup<T extends string>({
  legend,
  legendClassName,
  options,
  value,
  onChange,
  columns = 1,
  size = "card",
  describedBy,
}: {
  legend: string
  legendClassName?: string
  options: readonly Option<T>[]
  value: T | ""
  onChange: (value: T) => void
  columns?: 1 | 2 | 3
  size?: "card" | "chip"
  describedBy?: string
}) {
  const name = useId()
  return (
    <fieldset className="flex min-w-0 flex-col gap-3" aria-describedby={describedBy}>
      <legend className={cn("mb-3 text-sm font-semibold text-foreground", legendClassName)}>{legend}</legend>
      <div
        className={cn(
          "grid gap-3",
          columns === 2 && "sm:grid-cols-2",
          columns === 3 && "sm:grid-cols-3",
          size === "chip" && "grid-cols-2 gap-2 sm:flex sm:flex-wrap",
        )}
      >
        {options.map((option) => {
          const checked = value === option.id
          return (
            <label
              key={option.id}
              className={cn(
                "flex cursor-pointer items-start gap-3 border transition-colors has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/40",
                size === "card" ? "rounded-xl p-4" : "min-h-11 items-center rounded-full px-4 py-2 text-sm",
                checked ? "border-olive bg-sage" : "border-border hover:border-olive",
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.id}
                checked={checked}
                onChange={() => onChange(option.id)}
                className={cn("size-4 shrink-0 accent-[var(--olive)]", size === "card" && "mt-1")}
              />
              <span className="flex flex-col">
                <span className="font-semibold text-foreground">{option.label}</span>
                {option.description && (
                  <span className="text-sm leading-relaxed text-muted-foreground">{option.description}</span>
                )}
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

const YES_NO = [
  { id: "si", label: "Sí" },
  { id: "no", label: "No" },
] as const

export function YesNo({
  legend,
  value,
  onChange,
}: {
  legend: string
  value: boolean | null
  onChange: (value: boolean) => void
}) {
  return (
    <ChoiceGroup
      legend={legend}
      legendClassName="mb-2 font-normal"
      size="chip"
      options={YES_NO}
      value={value === null ? "" : value ? "si" : "no"}
      onChange={(v) => onChange(v === "si")}
    />
  )
}
