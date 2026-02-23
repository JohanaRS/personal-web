"use client"

import { Pencil, Check } from "lucide-react"
import { useState } from "react"

interface Category {
  name: string
  value: number
}

interface CategoryControlsProps {
  categories: Category[]
  onValueChange: (index: number, value: number) => void
  onNameChange: (index: number, name: string) => void
}

const CATEGORY_COLORS = [
  "oklch(0.55 0.12 145)",
  "oklch(0.55 0.12 200)",
  "oklch(0.55 0.12 260)",
  "oklch(0.55 0.10 310)",
  "oklch(0.55 0.12 350)",
  "oklch(0.60 0.15 30)",
  "oklch(0.60 0.15 85)",
  "oklch(0.50 0.10 125)",
]

export function CategoryControls({
  categories,
  onValueChange,
  onNameChange,
}: CategoryControlsProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editingName, setEditingName] = useState("")

  function startEditing(index: number) {
    setEditingIndex(index)
    setEditingName(categories[index].name)
  }

  function confirmEditing() {
    if (editingIndex !== null && editingName.trim()) {
      onNameChange(editingIndex, editingName.trim())
    }
    setEditingIndex(null)
    setEditingName("")
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") confirmEditing()
    if (e.key === "Escape") {
      setEditingIndex(null)
      setEditingName("")
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {categories.map((cat, i) => (
        <div key={i} className="flex flex-col gap-2">
          {/* Category name row */}
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: CATEGORY_COLORS[i % CATEGORY_COLORS.length] }}
              aria-hidden="true"
            />
            {editingIndex === i ? (
              <div className="flex items-center gap-1 flex-1">
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={confirmEditing}
                  maxLength={30}
                  className="flex-1 text-sm font-medium bg-secondary border border-border rounded-md px-2 py-1 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  autoFocus
                  aria-label={`Renombrar categoria ${cat.name}`}
                />
                <button
                  type="button"
                  onClick={confirmEditing}
                  className="p-1 text-primary hover:bg-primary/10 rounded-md transition-colors"
                  aria-label="Confirmar nombre"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1 flex-1 min-w-0">
                <span className="text-sm font-medium text-foreground truncate">
                  {cat.name}
                </span>
                <button
                  type="button"
                  onClick={() => startEditing(i)}
                  className="p-1 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors shrink-0"
                  aria-label={`Editar nombre de ${cat.name}`}
                >
                  <Pencil className="w-3 h-3" />
                </button>
              </div>
            )}
            <span className="text-sm font-semibold text-primary tabular-nums w-6 text-right shrink-0">
              {cat.value}
            </span>
          </div>

          {/* Slider */}
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            value={cat.value}
            onChange={(e) => onValueChange(i, Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer
              [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
            style={{
              background: `linear-gradient(to right, ${CATEGORY_COLORS[i % CATEGORY_COLORS.length]} ${((cat.value - 1) / 9) * 100}%, oklch(0.92 0.01 85) ${((cat.value - 1) / 9) * 100}%)`,
              // thumb color via CSS variable
              ["--thumb-color" as string]: CATEGORY_COLORS[i % CATEGORY_COLORS.length],
            }}
            aria-label={`Valor de ${cat.name}: ${cat.value} de 10`}
          />
        </div>
      ))}

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          background: var(--thumb-color, oklch(0.45 0.08 125));
        }
        input[type="range"]::-moz-range-thumb {
          background: var(--thumb-color, oklch(0.45 0.08 125));
        }
      `}</style>
    </div>
  )
}
