"use client"

import { cn } from "@/lib/utils"

interface ReflectionQuestionProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
  className?: string
}

export function ReflectionQuestion({
  id,
  label,
  value,
  onChange,
  placeholder = "Escribí lo que te surja. Es solo para vos.",
  rows = 3,
  className,
}: ReflectionQuestionProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-card p-5", className)}>
      <label htmlFor={id} className="mb-3 block text-sm font-medium leading-relaxed text-foreground">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full resize-y rounded-lg border border-border bg-background px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
    </div>
  )
}
