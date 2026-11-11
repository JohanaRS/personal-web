"use client"

import { cn } from "@/lib/utils"
import { DIMENSION_STYLES } from "./brand"
import { DIMENSION_BY_ID, type DimensionId } from "./content"
import { parseKeywords } from "./state"

const inputClass =
  "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/30"

/** Small circle drawn with the same outline pattern as the diagram, so it never relies on color alone. */
export function DimensionMarker({ id, className }: { id: DimensionId; className?: string }) {
  const s = DIMENSION_STYLES[id]
  return (
    <svg viewBox="0 0 24 24" className={cn("size-5 shrink-0", className)} aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill={s.stroke} fillOpacity="0.15" />
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke={s.stroke}
        strokeWidth="2"
        strokeDasharray={s.dash ? s.dash.split(" ").map((n) => Number(n) / 3).join(" ") : undefined}
        strokeLinecap="round"
      />
    </svg>
  )
}

export function KeywordChips({ dimension, keywords }: { dimension: DimensionId; keywords: string[] }) {
  if (!keywords.length) return null
  return (
    <ul className="flex flex-wrap gap-2" aria-label={`Palabras clave de ${DIMENSION_BY_ID[dimension].name}`}>
      {keywords.map((k) => (
        <li
          key={k}
          className="rounded-full border px-3 py-1 text-sm text-foreground"
          style={{ borderColor: DIMENSION_STYLES[dimension].stroke, backgroundColor: `${DIMENSION_STYLES[dimension].stroke}14` }}
        >
          {k}
        </li>
      ))}
    </ul>
  )
}

interface KeywordFieldProps {
  id: string
  label: string
  dimension: DimensionId
  value: string
  onChange: (value: string) => void
}

export function KeywordField({ id, label, dimension, value, onChange }: KeywordFieldProps) {
  const keywords = parseKeywords(value)
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-primary/30 bg-card p-5">
      <div className="flex items-center gap-2">
        <DimensionMarker id={dimension} />
        <label htmlFor={id} className="text-sm font-semibold text-foreground">
          {label}
        </label>
      </div>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Por ejemplo: enseñar, ordenar el caos, conversaciones difíciles"
        aria-describedby={`${id}-help`}
        className={inputClass}
      />
      <p id={`${id}-help`} className="text-xs leading-relaxed text-muted-foreground">
        Separalas con comas. Estas son las palabras que van a aparecer en tu diagrama.
      </p>
      <KeywordChips dimension={dimension} keywords={keywords} />
    </div>
  )
}

interface TextInputProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  type?: "text" | "date"
  placeholder?: string
  hint?: string
  autoComplete?: string
}

export function TextInput({ id, label, value, onChange, type = "text", placeholder, hint, autoComplete }: TextInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-describedby={hint ? `${id}-hint` : undefined}
        className={inputClass}
      />
      {hint && (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  )
}
