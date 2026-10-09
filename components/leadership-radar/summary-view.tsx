"use client"

import { useState } from "react"
import Link from "next/link"
import { FileDown, Loader2, Pencil, Quote, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { trackRadar } from "./analytics"
import { ACTION_QUESTIONS, COACHING_HREF, LEADER_QUESTIONS, REFLECTION_GROUPS } from "./content"
import { gapLabel, gapOf, getGaps, getStrengths, groupByDimension, toRadarData } from "./derived"
import { RadarChart } from "./radar-chart"
import type { StepProps } from "./types"

interface SummaryViewProps extends StepProps {
  onRestart: () => void
}

type PdfStatus = "idle" | "loading" | "done" | "error"

export function SummaryView({ state, update, goTo, onRestart }: SummaryViewProps) {
  const [pdfStatus, setPdfStatus] = useState<PdfStatus>("idle")

  const downloadReport = async () => {
    setPdfStatus("loading")
    try {
      const { exportRadarPdf } = await import("./pdf/export-radar-pdf")
      await exportRadarPdf(state.skills, state)
      trackRadar("leadership_radar_report_downloaded", { skills: state.skills.length })
      setPdfStatus("done")
    } catch {
      setPdfStatus("error")
    }
  }

  const strengths = getStrengths(state.skills)
  const gaps = getGaps(state.skills)
  const priorities = state.skills.filter((s) => state.priorityIds.includes(s.id))
  const primary = state.skills.find((s) => s.id === state.primaryId)
  const today = new Date().toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })

  const sections = [
    ...REFLECTION_GROUPS.map((g) => ({
      title: g.title,
      items: g.questions.map((q) => ({ q: q.text, a: state.reflections[q.id] })),
    })),
    { title: "El líder que quiero ser", items: LEADER_QUESTIONS.map((q) => ({ q: q.text, a: state.leaderAnswers[q.id] })) },
    { title: "Mi próximo paso", items: ACTION_QUESTIONS.map((q) => ({ q: q.text, a: state.action[q.id] })) },
    {
      title: "Observaciones por capacidad",
      items: state.skills.map((s) => ({ q: s.name, a: s.reflection })),
    },
  ]
    .map((section) => ({ ...section, items: section.items.filter((item) => item.a?.trim()) }))
    .filter((section) => section.items.length > 0)

  const plan = state.action
  const hasPlan = plan.nextAction || plan.when || plan.progressSign || plan.companion

  return (
    <div data-print-root className="mx-auto flex max-w-5xl flex-col gap-10">
      <header className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">Tu reflexión · {today}</p>
        <h2 className="text-3xl font-bold leading-tight text-foreground text-balance sm:text-4xl">
          Mi Radar de Liderazgo
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          Una fotografía de tu liderazgo hoy y de la dirección que elegiste. Volvé a mirarla en unas semanas.
        </p>
      </header>

      <div className="break-inside-avoid rounded-2xl border border-border bg-card p-4 sm:p-8">
        <RadarChart data={toRadarData(state.skills)} />
      </div>

      <section aria-labelledby="summary-skills" className="break-inside-avoid">
        <h3 id="summary-skills" className="mb-4 text-lg font-semibold text-foreground">
          Capacidades
        </h3>
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full min-w-[420px] text-left text-sm">
            <thead className="border-b border-border bg-secondary/60 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Capacidad</th>
                <th scope="col" className="px-3 py-3 text-center font-semibold">Hoy</th>
                <th scope="col" className="px-3 py-3 text-center font-semibold">Deseado</th>
                <th scope="col" className="px-3 py-3 text-center font-semibold">Brecha</th>
              </tr>
            </thead>
            {groupByDimension(state.skills).map(({ dimension, items }) => (
              <tbody key={dimension?.id ?? "unassigned"}>
                <tr className="border-b border-border bg-secondary/30">
                  <th colSpan={4} scope="colgroup" className="px-4 py-2 text-xs font-semibold text-primary">
                    {dimension ? `${dimension.modelLabel} · ${dimension.name}` : "Otras capacidades"}
                  </th>
                </tr>
                {items.map(({ skill: s }) => (
                  <tr key={s.id} className="border-b border-border last:border-0">
                    <th scope="row" className="px-4 py-3 font-medium text-foreground">
                      {s.name}
                      {state.priorityIds.includes(s.id) && (
                        <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                          {s.id === state.primaryId ? "Prioridad principal" : "Prioridad"}
                        </span>
                      )}
                    </th>
                    <td className="px-3 py-3 text-center tabular-nums">{s.currentScore ?? "–"}</td>
                    <td className="px-3 py-3 text-center tabular-nums">{s.desiredScore ?? "–"}</td>
                    <td className="px-3 py-3 text-center tabular-nums">{gapLabel(gapOf(s))}</td>
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </section>

      <div className="grid break-inside-avoid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Fortalezas actuales</h3>
          <ul className="flex flex-col gap-1.5 text-sm text-foreground">
            {strengths.map((s) => (
              <li key={s.id}>
                {s.name} <span className="text-muted-foreground">· {s.currentScore}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Mayores brechas</h3>
          {gaps.length === 0 ? (
            <p className="text-sm text-muted-foreground">Sin brechas entre tu situación actual y la deseada.</p>
          ) : (
            <ul className="flex flex-col gap-1.5 text-sm text-foreground">
              {gaps.map((s) => (
                <li key={s.id}>
                  {s.name} <span className="text-muted-foreground">· {gapLabel(gapOf(s))}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {(priorities.length > 0 || state.intention.trim()) && (
        <section className="grid break-inside-avoid gap-4 md:grid-cols-2">
          {priorities.length > 0 && (
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Mis prioridades</h3>
              <ul className="flex flex-col gap-1.5 text-sm text-foreground">
                {priorities.map((s) => (
                  <li key={s.id}>
                    {s.name}
                    {s.id === primary?.id && <span className="font-semibold text-primary"> · empiezo por acá</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {state.intention.trim() && (
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
              <Quote className="mb-2 size-5 text-primary" aria-hidden="true" />
              <h3 className="mb-2 text-sm font-semibold text-foreground">Mi intención como líder</h3>
              <p className="whitespace-pre-line text-base leading-relaxed text-foreground">
                Quiero ser un líder que {state.intention.trim()}
              </p>
            </div>
          )}
        </section>
      )}

      {hasPlan && (
        <section className="break-inside-avoid rounded-xl border border-border bg-card p-6">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Mi siguiente acción</h3>
          <dl className="grid gap-4 text-sm md:grid-cols-2">
            {plan.nextAction && (
              <div className="md:col-span-2">
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Acción</dt>
                <dd className="mt-1 whitespace-pre-line text-base text-foreground">{plan.nextAction}</dd>
              </div>
            )}
            {plan.when && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cuándo</dt>
                <dd className="mt-1 text-foreground">
                  {new Date(`${plan.when}T12:00:00`).toLocaleDateString("es-AR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </dd>
              </div>
            )}
            {plan.companion && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Quién me acompaña</dt>
                <dd className="mt-1 text-foreground">{plan.companion}</dd>
              </div>
            )}
            {plan.progressSign && (
              <div className="md:col-span-2">
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cómo sabré que avanzo</dt>
                <dd className="mt-1 whitespace-pre-line text-foreground">{plan.progressSign}</dd>
              </div>
            )}
          </dl>
        </section>
      )}

      {sections.length > 0 && (
        <section aria-labelledby="summary-reflections" className="flex flex-col gap-6">
          <h3 id="summary-reflections" className="text-lg font-semibold text-foreground">
            Mis reflexiones
          </h3>
          {sections.map((section) => (
            <div key={section.title} className="flex flex-col gap-3">
              <h4 className="text-sm font-semibold text-primary">{section.title}</h4>
              <dl className="flex flex-col gap-3">
                {section.items.map((item) => (
                  <div key={item.q} className="break-inside-avoid rounded-lg bg-secondary/50 px-4 py-3">
                    <dt className="text-xs text-muted-foreground">{item.q}</dt>
                    <dd className="mt-1 whitespace-pre-line text-sm leading-relaxed text-foreground">{item.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </section>
      )}

      <div className="flex flex-col gap-3 print:hidden">
        <div className="flex flex-wrap gap-3">
          <Button type="button" onClick={downloadReport} disabled={pdfStatus === "loading"}>
            {pdfStatus === "loading" ? <Loader2 className="animate-spin" /> : <FileDown />}
            {pdfStatus === "loading" ? "Preparando tu PDF..." : "Descargar / guardar mi reflexión"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              update({ assessIndex: 0 })
              goTo("assess")
            }}
          >
            <Pencil />
            Volver a editar mi radar
          </Button>
          <Button type="button" variant="ghost" onClick={onRestart}>
            <RotateCcw />
            Empezar de nuevo
          </Button>
        </div>
        <p aria-live="polite" className="min-h-5 text-sm text-muted-foreground">
          {pdfStatus === "done" && "Tu PDF se descargó con tu radar, tus reflexiones y mis datos de contacto."}
          {pdfStatus === "error" && (
            <span role="alert" className="text-destructive">
              No pudimos generar el PDF. Probá de nuevo en unos segundos.
            </span>
          )}
        </p>
      </div>

      <section className="rounded-2xl bg-primary p-8 text-primary-foreground print:hidden sm:p-10">
        <h3 className="mb-3 text-2xl font-bold leading-tight text-balance">
          ¿Querés trabajar sobre lo que descubriste?
        </h3>
        <p className="mb-6 max-w-2xl text-base leading-relaxed text-primary-foreground/90 text-pretty">
          Si te interesa profundizar en tu liderazgo con acompañamiento personalizado, podemos conversar sobre cómo
          trabajarlo juntos desde un proceso de coaching ejecutivo.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            asChild
            variant="secondary"
            size="lg"
            onClick={() => trackRadar("leadership_radar_coaching_cta_clicked", { cta: "coaching_ejecutivo" })}
          >
            <Link href={COACHING_HREF}>Conocer Coaching Ejecutivo</Link>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="border-primary-foreground/60 text-primary-foreground hover:border-primary-foreground hover:bg-primary-foreground hover:text-primary"
            onClick={() => {
              update({ assessIndex: 0 })
              goTo("radar")
            }}
          >
            Volver a mi Radar
          </Button>
        </div>
      </section>
    </div>
  )
}
