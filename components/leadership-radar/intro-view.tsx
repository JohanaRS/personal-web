"use client"

import Link from "next/link"
import { ArrowDown, ArrowLeft, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { GUIDED_SKILLS, HOW_IT_WORKS, MODES } from "./content"
import { RadarChart, type RadarDatum } from "./radar-chart"
import { RelationsModel } from "./relations-model"
import type { Mode } from "./types"

const SAMPLE_SCORES: [number, number][] = [
  [7, 9],
  [4, 7],
  [6, 8],
  [8, 9],
  [7, 8],
  [5, 8],
  [4, 7],
  [6, 8],
]

const SAMPLE_DATA: RadarDatum[] = GUIDED_SKILLS.map((skill, i) => ({
  id: skill.id,
  label: skill.shortName,
  current: SAMPLE_SCORES[i][0],
  desired: SAMPLE_SCORES[i][1],
}))

interface IntroViewProps {
  onStart: () => void
  onSelectMode: (mode: Mode) => void
}

export function IntroView({ onStart, onSelectMode }: IntroViewProps) {
  return (
    <>
      <section className="bg-gradient-to-b from-secondary/50 to-background py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            Volver al inicio
          </Link>

          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            <div className="flex flex-col gap-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">Recurso gratuito</p>
              <div>
                <h1 className="text-4xl font-bold leading-tight text-foreground text-balance sm:text-5xl">
                  Radar de Liderazgo
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">También conocido como Rueda de Liderazgo</p>
              </div>
              <p className="text-xl font-medium leading-snug text-foreground text-pretty">
                Definí qué clase de líder querés ser, observá dónde estás hoy y descubrí qué querés desarrollar.
              </p>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
                Una herramienta de autoconocimiento para reflexionar sobre tu liderazgo, identificar fortalezas, ver
                desequilibrios y elegir próximos pasos con intención. Sirve tanto si liderás un equipo como si influís
                sin autoridad formal.
              </p>
              <p className="flex max-w-xl items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <span>
                  No es un test psicológico ni un diagnóstico. Es una herramienta de reflexión basada en
                  autopercepción. No hay respuestas correctas: tu liderazgo no tiene por qué parecerse al de otra
                  persona.
                </span>
              </p>
              <div>
                <Button asChild size="lg">
                  <a href="#como-funciona" onClick={onStart}>
                    Comenzar mi Radar de Liderazgo
                    <ArrowDown />
                  </a>
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-8">
              <RadarChart data={SAMPLE_DATA} labelMode="none" ariaLabel="Ejemplo ilustrativo de un radar de liderazgo" />
              <p className="mt-3 text-center text-xs text-muted-foreground">Ejemplo ilustrativo</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="relaciones-title" className="py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2
            id="relaciones-title"
            className="mb-6 max-w-2xl text-3xl font-bold leading-tight text-foreground text-balance"
          >
            Cuatro relaciones que sostienen tu liderazgo
          </h2>
          <RelationsModel />
        </div>
      </section>

      <section id="como-funciona" className="scroll-mt-24 bg-secondary/40 py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 max-w-2xl text-3xl font-bold leading-tight text-foreground text-balance">
            Cómo funciona
          </h2>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((step, i) => (
              <li key={step.title} className="flex flex-col gap-3 rounded-xl border border-border bg-card p-6">
                <span
                  className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <Button asChild size="lg" variant="outline">
              <a href="#modalidad">
                Crear mi radar
                <ArrowDown />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section id="modalidad" className="scroll-mt-24 bg-secondary/40 py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-3 max-w-2xl text-3xl font-bold leading-tight text-foreground text-balance">
            ¿Cómo querés armar tu radar?
          </h2>
          <p className="mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Podés partir de una propuesta ya pensada o definir desde cero las capacidades de tu liderazgo.
          </p>

          <div className="grid gap-5 md:grid-cols-2">
            {(["guided", "custom"] as const).map((mode) => {
              const data = MODES[mode]
              return (
                <div
                  key={mode}
                  className={cn(
                    "flex flex-col gap-4 rounded-2xl border bg-card p-6 sm:p-8",
                    mode === "guided" ? "border-primary/50" : "border-border"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-bold text-foreground">{data.title}</h3>
                    <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {data.badge}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{data.description}</p>
                  {"forWho" in data && (
                    <div className="flex-1">
                      <p className="mb-2 text-sm font-medium text-foreground">{data.forWhoTitle}</p>
                      <ul className="flex list-disc flex-col gap-1 pl-5 text-sm leading-relaxed text-muted-foreground">
                        {data.forWho.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {"footnote" in data && <p className="flex-1 text-sm italic text-muted-foreground">{data.footnote}</p>}
                  <Button
                    type="button"
                    size="lg"
                    variant={mode === "guided" ? "default" : "outline"}
                    onClick={() => onSelectMode(mode)}
                  >
                    {data.cta}
                  </Button>
                </div>
              )
            })}
          </div>

          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Tus respuestas son para tu reflexión personal. Se guardan solo en este navegador y no las usamos para evaluar
            tu liderazgo.
          </p>
        </div>
      </section>
    </>
  )
}
