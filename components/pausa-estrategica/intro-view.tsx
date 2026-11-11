import Link from "next/link"
import { ArrowRight, Clock, Lock, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  COMPANION,
  INTRO_TEXT,
  OUTCOMES,
  PRIVACY_NOTE,
  RESOURCE_DURATION,
  RESOURCE_SUBTITLE,
  RESOURCE_TITLE,
} from "./content"
import { savedTime } from "./state"

export function IntroView({
  draftSavedAt,
  onStart,
  onResume,
  onDiscard,
}: {
  draftSavedAt: number | null | undefined
  onStart: () => void
  onResume: () => void
  onDiscard: () => void
}) {
  const hasDraft = draftSavedAt !== undefined

  return (
    <section className="py-12 lg:py-20" aria-labelledby="pe-titulo">
      <div className="mx-auto flex max-w-3xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-foreground">Recurso autoguiado</p>
          <div className="flex flex-col gap-3">
            <h1
              id="pe-titulo"
              className="font-display text-5xl font-semibold leading-none text-foreground text-balance sm:text-6xl"
            >
              {RESOURCE_TITLE}
            </h1>
            <p className="font-display text-2xl leading-snug text-foreground text-balance sm:text-3xl">
              {RESOURCE_SUBTITLE}
            </p>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">{INTRO_TEXT}</p>
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
            <Clock className="size-4 text-olive" aria-hidden="true" />
            Te lleva {RESOURCE_DURATION}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-foreground">Te vas a llevar</h2>
          <ul className="grid gap-3 sm:grid-cols-3">
            {OUTCOMES.map((outcome) => (
              <li key={outcome.title} className="flex flex-col gap-1 rounded-2xl bg-sage p-5">
                <span className="font-display text-xl font-semibold text-foreground">{outcome.title}</span>
                <span className="text-sm leading-relaxed text-foreground">{outcome.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          {hasDraft ? (
            <div className="flex flex-col gap-4 rounded-2xl border border-olive p-5 sm:p-6">
              <p className="text-base leading-relaxed text-foreground">
                Tenés una pausa guardada
                {draftSavedAt ? ` el ${savedTime(draftSavedAt)}` : ""}. Podés retomarla donde la dejaste.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" onClick={onResume} className="h-12 px-6 text-base">
                  Retomar mi pausa
                  <ArrowRight aria-hidden="true" />
                </Button>
                <Button size="lg" variant="ghost" onClick={onDiscard} className="h-12 text-base">
                  <RotateCcw aria-hidden="true" />
                  Empezar una nueva
                </Button>
              </div>
            </div>
          ) : (
            <Button size="lg" onClick={onStart} className="h-12 w-full px-6 text-base sm:w-fit">
              Empezar mi pausa
              <ArrowRight aria-hidden="true" />
            </Button>
          )}
          <p className="flex max-w-2xl items-start gap-2 text-sm leading-relaxed text-muted-foreground">
            <Lock className="mt-0.5 size-4 shrink-0 text-olive" aria-hidden="true" />
            {PRIVACY_NOTE}
          </p>
        </div>

        <aside
          aria-labelledby="pe-complementario"
          className="flex flex-col gap-2 border-t border-border pt-8 text-sm leading-relaxed"
        >
          <p className="font-semibold uppercase tracking-widest text-muted-foreground">Recurso complementario</p>
          <h2 id="pe-complementario" className="font-display text-xl font-semibold text-foreground">
            {COMPANION.title}
          </h2>
          <p className="max-w-2xl text-muted-foreground">{COMPANION.text}</p>
          <Link
            href={COMPANION.href}
            className="inline-flex w-fit items-center gap-1.5 font-semibold text-foreground underline underline-offset-4 hover:text-olive"
          >
            Conocer PAUSA
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </aside>
      </div>
    </section>
  )
}
