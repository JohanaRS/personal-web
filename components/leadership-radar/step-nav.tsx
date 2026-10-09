"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface StepNavProps {
  onBack: () => void
  onNext: () => void
  backLabel?: string
  nextLabel?: string
  error?: string
}

export function StepNav({ onBack, onNext, backLabel = "Atrás", nextLabel = "Continuar", error }: StepNavProps) {
  return (
    <div className="flex flex-col gap-4">
      {error && (
        <p
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-center text-sm text-destructive"
        >
          {error}
        </p>
      )}
      <div className="flex items-center justify-between gap-3">
        <Button type="button" variant="outline" onClick={onBack}>
          <ArrowLeft />
          {backLabel}
        </Button>
        <Button type="button" onClick={onNext}>
          {nextLabel}
          <ArrowRight />
        </Button>
      </div>
    </div>
  )
}

export function StepHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string
  title: string
  children?: React.ReactNode
}) {
  return (
    <header className="mb-8 flex flex-col gap-3">
      {eyebrow && <p className="text-xs font-semibold uppercase tracking-wider text-primary">{eyebrow}</p>}
      <h2 className="text-2xl font-bold leading-tight text-foreground text-balance sm:text-3xl">{title}</h2>
      {children && <div className="max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty">{children}</div>}
    </header>
  )
}
