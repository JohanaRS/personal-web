"use client"

import Link from "next/link"
import { ArrowRight, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DIMENSIONS, HOW_IT_WORKS, PRIVACY_NOTE } from "./content"
import type { DiagramData } from "./diagram/svg"
import { DimensionMarker } from "./fields"
import { IkigaiDiagram } from "./ikigai-diagram"

const EMPTY_DIAGRAM: DiagramData = {
  keywords: { love: [], good: [], need: [], paid: [] },
  hypothesis: "",
}

export function IntroView({ onStart, hasProgress }: { onStart: () => void; hasProgress: boolean }) {
  return (
    <>
      <section className="bg-gradient-to-b from-secondary/50 to-background py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Ruta de navegación" className="mb-8 text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-primary">
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>Recursos</li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-foreground">
                Ikigai profesional
              </li>
            </ol>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            <div className="flex flex-col gap-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">Recurso gratuito</p>
              <h1 className="text-4xl font-bold leading-tight text-foreground text-balance sm:text-5xl">
                Ikigai profesional
              </h1>
              <p className="text-xl font-medium leading-snug text-foreground text-pretty">
                Una exploración de identidad, propósito y dirección profesional.
              </p>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
                Descubrí dónde se encuentran lo que amás, lo que hacés bien, las necesidades que podés atender y el
                valor por el que pueden pagarte. Al terminar, vas a tener un diagrama personalizado y un reporte con
                todas tus respuestas.
              </p>
              <p className="flex max-w-xl items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <span>
                  No es un test ni un diagnóstico: es una hipótesis viva para orientar tu próxima etapa. {PRIVACY_NOTE}
                </span>
              </p>
              <div>
                <Button size="lg" onClick={onStart}>
                  {hasProgress ? "Continuar mi exploración" : "Comenzar mi exploración"}
                  <ArrowRight />
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-8">
              <IkigaiDiagram data={EMPTY_DIAGRAM} variant="compact" label="Ejemplo visual del diagrama de Ikigai" />
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Ejemplo visual. Tu diagrama se completa con tus propias palabras.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="dimensiones-title" className="py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 id="dimensiones-title" className="mb-3 max-w-2xl text-3xl font-bold leading-tight text-foreground text-balance">
            Cuatro dimensiones, un mismo centro
          </h2>
          <p className="mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Cuando las cuatro se encuentran, aparece una hipótesis de propósito profesional que podés poner a prueba.
          </p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {DIMENSIONS.map((d) => (
              <li key={d.id} className="flex gap-4 rounded-xl border border-border bg-card p-6">
                <DimensionMarker id={d.id} className="mt-0.5 size-6" />
                <div>
                  <h3 className="text-base font-semibold text-foreground">{d.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{d.intro}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="como-funciona-title" className="bg-secondary/40 py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 id="como-funciona-title" className="mb-10 max-w-2xl text-3xl font-bold leading-tight text-foreground text-balance">
            ¿Cómo funciona?
          </h2>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {HOW_IT_WORKS.map((step, i) => (
              <li key={step.title} className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5">
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
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <Button size="lg" onClick={onStart}>
              {hasProgress ? "Continuar mi exploración" : "Comenzar mi exploración"}
              <ArrowRight />
            </Button>
            <p className="text-sm text-muted-foreground">Tiempo estimado: 30 a 45 minutos. Podés pausar cuando quieras.</p>
          </div>
        </div>
      </section>
    </>
  )
}
