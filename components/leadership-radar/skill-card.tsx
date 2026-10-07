"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { gapLabel, gapOf, skillDefinition } from "./derived"
import type { Skill } from "./types"

interface SkillCardProps {
  index: number
  skill: Skill
  showDefinition?: boolean
  selected?: boolean
  disabled?: boolean
  onToggle?: () => void
}

export function SkillCard({ index, skill, showDefinition = false, selected = false, disabled = false, onToggle }: SkillCardProps) {
  const gap = gapOf(skill)

  const body = (
    <>
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold",
          selected ? "border-primary bg-primary text-primary-foreground" : "border-border bg-secondary text-foreground"
        )}
        aria-hidden="true"
      >
        {selected ? <Check className="size-4" /> : index + 1}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-2 text-left">
        <span className="text-sm font-semibold leading-snug text-foreground text-pretty">{skill.name}</span>
        {showDefinition && (
          <span className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">{skillDefinition(skill)}</span>
        )}
        <span className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
            Hoy <strong className="text-sm font-semibold text-foreground">{skill.currentScore ?? "–"}</strong>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rotate-45 bg-clay" aria-hidden="true" />
            Deseado <strong className="text-sm font-semibold text-foreground">{skill.desiredScore ?? "–"}</strong>
          </span>
          <span>
            Brecha <strong className="text-sm font-semibold text-foreground">{gapLabel(gap)}</strong>
          </span>
        </span>
      </span>
    </>
  )

  const base = "flex w-full items-start gap-3 rounded-xl border bg-card p-4"

  if (onToggle) {
    return (
      <button
        type="button"
        onClick={onToggle}
        disabled={disabled && !selected}
        aria-pressed={selected}
        className={cn(
          base,
          "cursor-pointer transition-colors disabled:cursor-not-allowed disabled:opacity-50",
          selected ? "border-primary bg-primary/5 ring-2 ring-primary/25" : "border-border hover:border-primary/50"
        )}
      >
        {body}
      </button>
    )
  }

  return <div className={cn(base, "border-border")}>{body}</div>
}
