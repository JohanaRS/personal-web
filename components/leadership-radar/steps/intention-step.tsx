"use client"

import { LEADER_QUESTIONS } from "../content"
import { ReflectionQuestion } from "../reflection-question"
import { StepHeader, StepNav } from "../step-nav"
import type { StepProps } from "../types"

export function IntentionStep({ state, update, goTo }: StepProps) {
  const setAnswer = (id: string, value: string) =>
    update((s) => ({ leaderAnswers: { ...s.leaderAnswers, [id]: value } }))

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8">
      <StepHeader eyebrow="Tu intención" title="El líder que querés ser">
        <p>
          Más allá de las puntuaciones: ¿qué clase de liderazgo querés construir? Respondé las preguntas que te
          resuenen y cerrá con una frase propia.
        </p>
      </StepHeader>

      <div className="grid gap-4 md:grid-cols-2">
        {LEADER_QUESTIONS.map((q) => (
          <ReflectionQuestion
            key={q.id}
            id={q.id}
            label={q.text}
            value={state.leaderAnswers[q.id] ?? ""}
            onChange={(v) => setAnswer(q.id, v)}
            rows={3}
          />
        ))}
      </div>

      <section aria-labelledby="intention-title" className="rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8">
        <h3 id="intention-title" className="mb-1 text-xl font-bold text-foreground">
          Mi intención como líder
        </h3>
        <p className="mb-4 text-sm text-muted-foreground">Completá la frase con tus propias palabras.</p>
        <label htmlFor="intention" className="mb-2 block text-base font-medium text-foreground">
          Quiero ser un líder que…
        </label>
        <textarea
          id="intention"
          rows={4}
          value={state.intention}
          onChange={(e) => update({ intention: e.target.value })}
          placeholder="Escuche antes de decidir, sostenga conversaciones difíciles con respeto y deje espacio para que otros crezcan…"
          className="w-full resize-y rounded-lg border border-border bg-background px-4 py-3 text-base leading-relaxed text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </section>

      <StepNav onBack={() => goTo("prioritize")} onNext={() => goTo("action")} nextLabel="Definir mi próximo paso" />
    </div>
  )
}
