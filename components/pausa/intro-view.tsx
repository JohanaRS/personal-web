"use client"

import Link from "next/link"
import { ArrowRight, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DISCLAIMER, INTRO_TEXT, PRIVACY_NOTE, QUESTIONS, RESOURCE_SUBTITLE } from "./content"
import { savedTime, type PausaState } from "./state"

const MOMENTS = ["Antes", "Durante", "Después"] as const

export function IntroView({
  savedDraft,
  onStart,
  onResume,
  onDiscard,
}: {
  savedDraft: PausaState | null
  onStart: () => void
  onResume: () => void
  onDiscard: () => void
}) {
  return (
    <section className="py-12 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Ruta de navegación" className="mb-10 text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="underline-offset-4 transition-colors hover:text-foreground hover:underline">
                Inicio
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>Recursos</li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              PAUSA
            </li>
          </ol>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <div className="flex flex-col gap-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-foreground">Recurso autoguiado</p>
            <h1 className="font-display text-6xl font-semibold leading-none tracking-tight text-foreground sm:text-7xl">
              PAUSA
            </h1>
            <p className="font-display text-2xl leading-snug text-foreground text-pretty sm:text-3xl">
              {RESOURCE_SUBTITLE}
            </p>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
              {INTRO_TEXT}
            </p>

            {savedDraft ? (
              <div className="flex max-w-xl flex-col gap-4 rounded-2xl bg-sage p-5">
                <p className="text-sm leading-relaxed text-foreground">
                  Tenés una pausa guardada
                  {savedDraft.updatedAt ? ` el ${savedTime(savedDraft.updatedAt)}` : ""}
                  {savedDraft.answers.task.trim() ? (
                    <>
                      {" sobre "}
                      <span className="font-semibold">«{savedDraft.answers.task.trim().slice(0, 90)}»</span>
                    </>
                  ) : null}
                  .
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <Button size="lg" onClick={onResume} className="h-12 px-6 text-base">
                    Retomar mi pausa
                    <ArrowRight aria-hidden="true" />
                  </Button>
                  <Button variant="ghost" onClick={onStart} className="h-12 text-base">
                    Empezar una nueva
                  </Button>
                  <button
                    type="button"
                    onClick={onDiscard}
                    className="text-sm text-foreground underline underline-offset-4 hover:no-underline sm:ml-auto"
                  >
                    Borrar borrador
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <Button size="lg" onClick={onStart} className="h-12 w-full px-6 text-base sm:w-auto">
                  Hacer mi pausa
                  <ArrowRight aria-hidden="true" />
                </Button>
              </div>
            )}

            <p className="flex max-w-xl items-start gap-3 text-sm leading-relaxed text-muted-foreground">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-olive" aria-hidden="true" />
              <span>{PRIVACY_NOTE}</span>
            </p>
          </div>

          <aside aria-label="Las cinco preguntas" className="rounded-3xl border border-border p-6 sm:p-8">
            <ol className="flex flex-col">
              {QUESTIONS.map((q, i) => {
                const showMoment = i === 0 || QUESTIONS[i - 1].moment !== q.moment
                return (
                  <li key={q.id} className="flex flex-col">
                    {showMoment && (
                      <p
                        className={`text-xs font-semibold uppercase tracking-widest text-muted-foreground ${i === 0 ? "" : "mt-5"}`}
                      >
                        {q.moment}
                      </p>
                    )}
                    <div className="flex items-baseline gap-4 border-b border-border py-3 last:border-b-0">
                      <span
                        aria-hidden="true"
                        className="w-8 shrink-0 font-display text-3xl font-semibold leading-none text-olive"
                      >
                        {q.letter}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground">{q.name}</span>
                        <span className="text-sm leading-relaxed text-muted-foreground">{q.question}</span>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ol>
            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">{DISCLAIMER}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              ¿Todavía no sabés en qué poner tu foco?{" "}
              <Link
                href="/recursos/pausa-estrategica"
                className="font-semibold text-foreground underline underline-offset-4 hover:text-olive"
              >
                Empezá por la Pausa estratégica
              </Link>
              .
            </p>
          </aside>
        </div>
        <p className="sr-only">Momentos: {MOMENTS.join(", ")}.</p>
      </div>
    </section>
  )
}
