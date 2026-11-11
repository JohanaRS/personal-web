"use client"

import { useId, useState } from "react"
import { ChevronDown, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"
import { EXAMPLE } from "./content"

export function ExamplePanel({ text, label }: { text: string; label: string }) {
  const [open, setOpen] = useState(false)
  const id = useId()

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex w-fit items-center gap-2 rounded-lg py-1 text-sm font-semibold text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
      >
        <Lightbulb className="size-4 text-olive" aria-hidden="true" />
        {open ? "Ocultar el ejemplo" : "Ver un ejemplo"}
        <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} aria-hidden="true" />
      </button>
      {open && (
        <div id={id} className="flex flex-col gap-3 rounded-2xl bg-sage p-5 text-sm leading-relaxed text-foreground">
          <p>
            <span className="font-semibold">Situación del ejemplo:</span> {EXAMPLE.task}
          </p>
          <p className="border-l-2 border-olive pl-4">
            <span className="sr-only">{label}: </span>
            {text}
          </p>
        </div>
      )}
    </div>
  )
}
