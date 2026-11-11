"use client"

import { forwardRef, type TextareaHTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { DRAFT_NOTE, PENDING_LABEL } from "./content"

export const AnswerField = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function AnswerField({ className, rows = 5, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        rows={rows}
        maxLength={3000}
        className={cn(
          "field-sizing-content min-h-32 w-full resize-y rounded-xl border border-input bg-background px-4 py-3 text-base leading-relaxed text-foreground shadow-none outline-none transition-colors placeholder:text-muted-foreground/80 focus-visible:border-olive focus-visible:ring-[3px] focus-visible:ring-ring/30 aria-invalid:border-clay",
          className,
        )}
        {...props}
      />
    )
  },
)

export function PendingBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-clay px-3 py-1 text-sm font-semibold text-foreground",
        className,
      )}
    >
      <span className="size-2 rounded-full bg-clay" aria-hidden="true" />
      {PENDING_LABEL}
    </span>
  )
}

export function DraftToggle({
  checked,
  storageFailed,
  onChange,
}: {
  checked: boolean
  storageFailed: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-foreground">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 size-4 shrink-0 accent-[var(--olive)]"
        />
        <span>
          <span className="font-semibold">Guardar mi borrador en este navegador.</span>{" "}
          <span className="text-muted-foreground">{DRAFT_NOTE}</span>
        </span>
      </label>
      {checked && storageFailed && (
        <p role="status" className="pl-7 text-sm text-foreground">
          Este navegador no permite guardar el borrador. Mantené la pestaña abierta para no perder tus respuestas.
        </p>
      )}
    </div>
  )
}
