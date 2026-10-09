"use client"

import { scrollToTop } from "../analytics"
import { REFLECTION_GROUPS, getDimension } from "../content"
import { toRadarData } from "../derived"
import { RadarChart } from "../radar-chart"
import { ReflectionQuestion } from "../reflection-question"
import { StepHeader, StepNav } from "../step-nav"
import type { StepProps } from "../types"

export function ReflectStep({ state, update, goTo }: StepProps) {
  const groupIndex = Math.min(Math.max(state.reflectIndex ?? 0, 0), REFLECTION_GROUPS.length - 1)
  const setGroupIndex = (index: number) => update({ reflectIndex: index })
  const group = REFLECTION_GROUPS[groupIndex]
  const last = groupIndex === REFLECTION_GROUPS.length - 1

  const setAnswer = (id: string, value: string) =>
    update((s) => ({ reflections: { ...s.reflections, [id]: value } }))

  const next = () => {
    if (last) goTo("prioritize")
    else {
      setGroupIndex(groupIndex + 1)
      scrollToTop()
    }
  }

  const back = () => {
    if (groupIndex === 0) goTo("choice")
    else {
      setGroupIndex(groupIndex - 1)
      scrollToTop()
    }
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-start">
      <aside className="hidden lg:sticky lg:top-28 lg:block" aria-label="Tu radar">
        <div className="rounded-2xl border border-border bg-card p-4">
          <RadarChart data={toRadarData(state.skills)} labelMode="numbers" ariaLabel="Tu radar de liderazgo" />
          <ol className="mt-4 grid gap-1.5 text-xs text-muted-foreground">
            {state.skills.map((s, i) => (
              <li key={s.id} className="flex gap-2">
                <span className="w-4 shrink-0 font-semibold text-foreground">{i + 1}</span>
                <span>{s.name}</span>
              </li>
            ))}
          </ol>
        </div>
      </aside>

      <div className="flex flex-col gap-6">
        <StepHeader eyebrow={`Reflexión · ${groupIndex + 1} de ${REFLECTION_GROUPS.length}`} title={group.title}>
          <p>Respondé lo que quieras, no es obligatorio. Escribir ayuda a que lo que viste se vuelva claro.</p>
          {group.intro && <p className="mt-2">{group.intro}</p>}
        </StepHeader>

        <div className="flex flex-col gap-4">
          {group.questions.map((q) => (
            <ReflectionQuestion
              key={q.id}
              id={q.id}
              eyebrow={getDimension(q.dimension)?.relation}
              label={q.text}
              value={state.reflections[q.id] ?? ""}
              onChange={(v) => setAnswer(q.id, v)}
            />
          ))}
        </div>

        <StepNav onBack={back} onNext={next} nextLabel={last ? "Elegir mis prioridades" : "Continuar"} />
      </div>
    </div>
  )
}
