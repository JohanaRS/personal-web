"use client"

import { cn } from "@/lib/utils"
import { SCORE_MAX, SCORE_MIN } from "./content"

interface ScoreSliderProps {
  id: string
  label: string
  helper?: string
  value: number | null
  onChange: (value: number) => void
  tone: "current" | "desired"
  anchors: { value: number; text: string }[]
}

export function ScoreSlider({
  id,
  label,
  helper,
  value,
  onChange,
  tone,
  anchors,
}: ScoreSliderProps) {
  const pct = value === null ? 0 : ((value - SCORE_MIN) / (SCORE_MAX - SCORE_MIN)) * 100

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-4">
        <div>
          <label htmlFor={id} className="flex items-center gap-2 text-base font-semibold text-foreground">
            {tone === "current" ? (
              <span className="size-3 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            ) : (
              <span className="size-3 shrink-0 rotate-45 bg-clay" aria-hidden="true" />
            )}
            {label}
          </label>
          {helper && <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{helper}</p>}
        </div>
        <output
          htmlFor={id}
          aria-hidden="true"
          className={cn(
            "min-w-[2.5ch] text-right text-4xl font-bold tabular-nums",
            value === null ? "text-muted-foreground/50" : tone === "current" ? "text-primary" : "text-clay"
          )}
        >
          {value ?? "–"}
        </output>
      </div>

      <input
        id={id}
        type="range"
        min={SCORE_MIN}
        max={SCORE_MAX}
        step={1}
        value={value ?? 5}
        data-tone={tone}
        data-unset={value === null}
        aria-valuetext={value === null ? "Sin puntuar" : `${value} de 10`}
        onChange={(e) => onChange(Number(e.target.value))}
        onPointerUp={(e) => {
          if (value === null) onChange(Number(e.currentTarget.value))
        }}
        className="score-slider"
        style={{ "--slider-pct": `${pct}%` } as React.CSSProperties}
      />

      <div className="grid grid-cols-3 gap-2 text-xs leading-snug text-muted-foreground">
        {anchors.map((anchor, i) => (
          <p key={anchor.value} className={cn(i === 1 && "text-center", i === 2 && "text-right")}>
            <span className="font-semibold text-foreground">{anchor.value}</span>
            <span className="block">{anchor.text}</span>
          </p>
        ))}
      </div>

      {value === null && (
        <p className="text-sm text-muted-foreground">Tocá o deslizá el control para elegir un valor.</p>
      )}
    </div>
  )
}
