"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { ChoiceGroup } from "./choice"
import { EFFORT_HELP, IMPACT_HELP, LEVELS, QUADRANTS } from "./content"
import type { FocusItem } from "./state"

function ItemButton({ item, selected, onSelect }: { item: FocusItem; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={cn(
        "flex min-h-11 w-full items-start gap-2 rounded-lg border px-3 py-2 text-left text-sm leading-snug transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40",
        selected
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-foreground hover:border-olive",
      )}
    >
      {selected && <Check className="mt-0.5 size-4 shrink-0" aria-hidden="true" />}
      <span className="min-w-0 break-words">{item.text.trim()}</span>
    </button>
  )
}

export function Matrix({
  items,
  priorityId,
  onItemChange,
  onSelect,
}: {
  items: FocusItem[]
  priorityId: string
  onItemChange: (id: string, patch: Partial<FocusItem>) => void
  onSelect: (id: string) => void
}) {
  const unplaced = items.filter((item) => !item.impact || !item.effort)

  return (
    <div className="flex flex-col gap-8">
      <ol className="flex flex-col gap-4">
        {items.map((item, index) => (
          <li key={item.id} className="flex flex-col gap-4 rounded-2xl border border-border p-5">
            <p className="font-semibold text-foreground">
              <span className="sr-only">Opción {index + 1}: </span>
              {item.text.trim()}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <ChoiceGroup
                legend={`Impacto · ${IMPACT_HELP}`}
                legendClassName="mb-2 font-normal leading-relaxed"
                size="chip"
                options={LEVELS}
                value={item.impact}
                onChange={(impact) => onItemChange(item.id, { impact })}
              />
              <ChoiceGroup
                legend={`Esfuerzo · ${EFFORT_HELP}`}
                legendClassName="mb-2 font-normal leading-relaxed"
                size="chip"
                options={LEVELS}
                value={item.effort}
                onChange={(effort) => onItemChange(item.id, { effort })}
              />
            </div>
          </li>
        ))}
      </ol>

      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-foreground">Tu matriz. Tocá la opción que elegís como prioridad.</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {QUADRANTS.map((quadrant) => {
            const inside = items.filter((i) => i.impact === quadrant.impact && i.effort === quadrant.effort)
            return (
              <section
                key={quadrant.title}
                aria-label={quadrant.title}
                className={cn(
                  "flex min-h-32 flex-col gap-3 rounded-2xl p-4",
                  quadrant.impact === "alto" ? "bg-sage" : "border border-dashed border-olive",
                )}
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-foreground">{quadrant.title}</p>
                  <p className="text-sm text-muted-foreground">{quadrant.hint}</p>
                </div>
                {inside.length > 0 ? (
                  <ul className="flex flex-col gap-2">
                    {inside.map((item) => (
                      <li key={item.id}>
                        <ItemButton
                          item={item}
                          selected={priorityId === item.id}
                          onSelect={() => onSelect(item.id)}
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">Nada por acá.</p>
                )}
              </section>
            )
          })}
        </div>
        {unplaced.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">Todavía sin ubicar:</p>
            <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              {unplaced.map((item) => (
                <li key={item.id}>
                  <ItemButton item={item} selected={priorityId === item.id} onSelect={() => onSelect(item.id)} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
