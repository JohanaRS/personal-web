"use client"

import { Button } from "@/components/ui/button"
import { gapLabel, gapOf, getGaps, getStrengths, toRadarData } from "../derived"
import { RadarChart } from "../radar-chart"
import { SkillCard } from "../skill-card"
import { StepHeader, StepNav } from "../step-nav"
import type { Skill, StepProps } from "../types"

function InsightList({ title, empty, skills, detail }: { title: string; empty: string; skills: Skill[]; detail: (s: Skill) => string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="mb-3 text-sm font-semibold text-foreground">{title}</h3>
      {skills.length === 0 ? (
        <p className="text-sm leading-relaxed text-muted-foreground">{empty}</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {skills.map((s) => (
            <li key={s.id} className="flex flex-col">
              <span className="text-sm font-medium text-foreground">{s.name}</span>
              <span className="text-xs text-muted-foreground">{detail(s)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function RadarStep({ state, update, goTo }: StepProps) {
  const strengths = getStrengths(state.skills)
  const gaps = getGaps(state.skills)

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10">
      <StepHeader eyebrow="Tu radar" title="Tu Radar de Liderazgo">
        <p>
          No es una nota sobre tu capacidad como líder. Es una fotografía de cómo te percibís hoy y hacia dónde querés
          moverte.
        </p>
      </StepHeader>

      <div className="rounded-2xl border border-border bg-card p-4 sm:p-8">
        <RadarChart data={toRadarData(state.skills)} />
      </div>

      <section aria-labelledby="skills-title" className="flex flex-col gap-4">
        <h3 id="skills-title" className="text-lg font-semibold text-foreground">
          Tus capacidades
        </h3>
        <ul className="grid gap-3 md:grid-cols-2">
          {state.skills.map((skill, i) => (
            <li key={skill.id}>
              <SkillCard index={i} skill={skill} />
            </li>
          ))}
        </ul>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        <InsightList
          title="Fortalezas actuales"
          empty="Todavía no hay puntajes para mostrar."
          skills={strengths}
          detail={(s) => `Hoy ${s.currentScore}`}
        />
        <InsightList
          title="Mayores brechas"
          empty="No hay brechas entre tu situación actual y la deseada."
          skills={gaps}
          detail={(s) => `Hoy ${s.currentScore} · Deseado ${s.desiredScore} · ${gapLabel(gapOf(s))}`}
        />
        <div className="rounded-xl border border-border bg-secondary/50 p-5">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Áreas que podrían necesitar atención</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Los números cuentan solo una parte de la historia. Una brecha pequeña puede ser clave para tu momento, y una
            grande puede no ser prioridad hoy. Más adelante vas a elegir cuáles querés desarrollar.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              update({ assessIndex: 0 })
              goTo("assess")
            }}
          >
            Ajustar mis puntajes
          </Button>
        </div>
        <StepNav
          onBack={() => {
            update({ assessIndex: state.skills.length - 1 })
            goTo("assess")
          }}
          onNext={() => goTo("reflect")}
          nextLabel="Reflexionar sobre mi radar"
        />
      </div>
    </div>
  )
}
