"use client"

import type { ReactNode } from "react"
import { AnswerField } from "../pausa/fields"
import { ChoiceGroup, YesNo } from "./choice"
import {
  ENERGY_OPTIONS,
  FIT_IDEAS,
  FIT_QUESTION,
  ITEM_PLACEHOLDERS,
  MOMENTS,
  NEXT_STEP_FIELDS,
  SOON_RESPONSES,
  TIME_OPTIONS,
} from "./content"
import { Matrix } from "./matrix"
import {
  activeItems,
  filled,
  momentById,
  priorityItem,
  scopeHint,
  type Answers,
  type FocusItem,
} from "./state"

export interface ScreenConfig {
  eyebrow: string
  title: string
  help: string
  body: ReactNode
  /** Returns a message when the screen is not ready to continue. */
  validate?: () => string | null
  secondary?: { label: string; onClick: () => void }
}

interface Ctx {
  answers: Answers
  labelledBy: string
  describedBy: string
  invalid: boolean
  setAnswers: (patch: Partial<Answers>) => void
  setItem: (id: string, patch: Partial<FocusItem>) => void
  goTo: (screen: string) => void
}

function Field({
  id,
  label,
  help,
  example,
  children,
}: {
  id: string
  label: string
  help: string
  example?: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-semibold text-foreground">
        {label}
      </label>
      <p id={`${id}-help`} className="text-sm leading-relaxed text-muted-foreground">
        {help}
      </p>
      {children}
      {example && (
        <p className="border-l-2 border-olive pl-4 text-sm leading-relaxed text-foreground">
          <span className="font-semibold">Ejemplo: </span>
          {example}
        </p>
      )}
    </div>
  )
}

function ItemQuote({ item }: { item: FocusItem }) {
  return <p className="font-display text-xl leading-snug text-foreground sm:text-2xl">«{item.text.trim()}»</p>
}

export function buildScreen(screen: string, ctx: Ctx): ScreenConfig {
  const { answers, setAnswers, setItem } = ctx
  const moment = momentById(answers.moment)
  const items = activeItems(answers)
  const aria = { "aria-describedby": ctx.describedBy, "aria-invalid": ctx.invalid || undefined }

  if (screen === "momento") {
    return {
      eyebrow: "Para empezar",
      title: "¿En qué momento estás haciendo esta pausa?",
      help: "Elegí el que más se parezca a tu situación. Cambia la pregunta con la que vas a mirar tus pendientes.",
      body: (
        <ChoiceGroup
          legend="Momento del día"
          legendClassName="sr-only"
          describedBy={ctx.describedBy}
          options={MOMENTS}
          value={answers.moment}
          onChange={(moment) => setAnswers({ moment })}
        />
      ),
      validate: () => (answers.moment ? null : "Elegí un momento para seguir."),
    }
  }

  if (screen === "mesa") {
    return {
      eyebrow: "Poner sobre la mesa",
      title: moment?.question ?? "¿Qué te está pidiendo atención?",
      help: "Anotá hasta tres pendientes, decisiones o preocupaciones que estén pidiendo tu atención. Con una frase alcanza.",
      body: (
        <div className="flex flex-col gap-8">
          <fieldset className="flex flex-col gap-3" aria-describedby={ctx.describedBy}>
            <legend className="sr-only">Lo que pide tu atención</legend>
            {answers.items.map((item, index) => (
              <div key={item.id} className="flex flex-col gap-1.5">
                <label htmlFor={`pe-item-${item.id}`} className="text-sm font-semibold text-foreground">
                  {index === 0 ? "Asunto 1" : `Asunto ${index + 1} (opcional)`}
                </label>
                <input
                  id={`pe-item-${item.id}`}
                  type="text"
                  maxLength={200}
                  value={item.text}
                  placeholder={ITEM_PLACEHOLDERS[index]}
                  aria-invalid={index === 0 && ctx.invalid ? true : undefined}
                  onChange={(e) => setItem(item.id, { text: e.target.value })}
                  className="h-12 w-full rounded-xl border border-input bg-background px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/80 focus-visible:border-olive focus-visible:ring-[3px] focus-visible:ring-ring/30 aria-invalid:border-clay"
                />
              </div>
            ))}
          </fieldset>
          <div className="flex flex-col gap-6 rounded-2xl bg-sage p-5 sm:p-6">
            <p className="text-sm leading-relaxed text-foreground">
              Para ajustar tu próximo paso a lo que realmente podés sostener:
            </p>
            <ChoiceGroup
              legend="¿Cuánto tiempo tenés disponible?"
              size="chip"
              options={TIME_OPTIONS}
              value={answers.time}
              onChange={(time) => setAnswers({ time })}
            />
            <ChoiceGroup
              legend="¿Cómo está tu energía?"
              size="chip"
              options={ENERGY_OPTIONS}
              value={answers.energy}
              onChange={(energy) => setAnswers({ energy })}
            />
          </div>
        </div>
      ),
      validate: () => (items.length ? null : "Anotá al menos un asunto para seguir."),
    }
  }

  if (screen.startsWith("item-")) {
    const item = items.find((i) => `item-${i.id}` === screen)
    if (item) {
      const index = items.indexOf(item)
      return {
        eyebrow: `Importante y urgente · Asunto ${index + 1} de ${items.length}`,
        title: "¿Qué lugar ocupa esto?",
        help: "Dos preguntas distintas. Respondelas por separado, aunque la respuesta sea breve.",
        body: (
          <div className="flex flex-col gap-8">
            <ItemQuote item={item} />
            <Field
              id={`pe-imp-${item.id}`}
              label="¿Qué objetivo, compromiso o necesidad importante cuida?"
              help="Si no cuida nada importante, también vale decirlo."
            >
              <AnswerField
                id={`pe-imp-${item.id}`}
                aria-describedby={`pe-imp-${item.id}-help`}
                rows={3}
                className="min-h-24"
                value={item.importance}
                placeholder="Cuida…"
                onChange={(e) => setItem(item.id, { importance: e.target.value })}
              />
            </Field>
            <Field
              id={`pe-urg-${item.id}`}
              label="¿Qué pasa si no avanzo hoy?"
              help="Pensá en consecuencias concretas, no en la sensación de apuro."
            >
              <AnswerField
                id={`pe-urg-${item.id}`}
                aria-describedby={`pe-urg-${item.id}-help`}
                rows={3}
                className="min-h-24"
                value={item.urgency}
                placeholder="Si no avanzo hoy…"
                onChange={(e) => setItem(item.id, { urgency: e.target.value })}
              />
            </Field>
          </div>
        ),
      }
    }
  }

  if (screen === "juntas") {
    return {
      eyebrow: "Importante y urgente",
      title: "Miralo todo junto",
      help: "Leé tus respuestas y decidí vos qué lectura hacés de cada asunto. No hay respuestas correctas.",
      body: (
        <ol className="flex flex-col gap-4">
          {items.map((item, index) => (
            <li key={item.id} className="flex flex-col gap-5 rounded-2xl border border-border p-5 sm:p-6">
              <div className="flex flex-col gap-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Asunto {index + 1}
                </p>
                <p className="font-display text-xl leading-snug text-foreground">{item.text.trim()}</p>
                <dl className="grid gap-3 text-sm leading-relaxed sm:grid-cols-2">
                  <div className="flex flex-col gap-1">
                    <dt className="font-semibold text-foreground">Lo que cuida</dt>
                    <dd className="whitespace-pre-line text-muted-foreground">
                      {filled(item.importance) ? item.importance.trim() : "Sin respuesta"}
                    </dd>
                  </div>
                  <div className="flex flex-col gap-1">
                    <dt className="font-semibold text-foreground">Si no avanzo hoy</dt>
                    <dd className="whitespace-pre-line text-muted-foreground">
                      {filled(item.urgency) ? item.urgency.trim() : "Sin respuesta"}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="flex flex-col gap-4 border-t border-border pt-4">
                <YesNo
                  legend="¿Necesita atención pronto?"
                  value={item.soon}
                  onChange={(soon) => setItem(item.id, { soon })}
                />
                {item.soon && (
                  <ChoiceGroup
                    legend="Podés considerar:"
                    legendClassName="mb-2 font-normal"
                    size="chip"
                    options={SOON_RESPONSES}
                    value={item.soonResponse}
                    onChange={(soonResponse) => setItem(item.id, { soonResponse })}
                  />
                )}
                {item.soon === false && (
                  <YesNo
                    legend="¿Importa, aunque pueda esperar?"
                    value={item.matters}
                    onChange={(matters) => setItem(item.id, { matters })}
                  />
                )}
                {item.soon === false && item.matters && (
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor={`pe-place-${item.id}`} className="text-sm text-foreground">
                      ¿Cuándo le vas a dar lugar?
                    </label>
                    <input
                      id={`pe-place-${item.id}`}
                      type="text"
                      maxLength={160}
                      value={item.placeWhen}
                      placeholder="El jueves a la mañana…"
                      onChange={(e) => setItem(item.id, { placeWhen: e.target.value })}
                      className="h-11 w-full rounded-xl border border-input bg-background px-4 text-base text-foreground outline-none placeholder:text-muted-foreground/80 focus-visible:border-olive focus-visible:ring-[3px] focus-visible:ring-ring/30"
                    />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      ),
    }
  }

  if (screen === "prioridad") {
    return {
      eyebrow: "Elegir y ajustar",
      title: "¿Cuál va a ser tu prioridad?",
      help: "Elegí una. Las otras no desaparecen: más adelante vas a poder anotar qué hacés con ellas.",
      body: (
        <ChoiceGroup
          legend="Mi prioridad"
          legendClassName="sr-only"
          describedBy={ctx.describedBy}
          options={items.map((item) => ({ id: item.id, label: item.text.trim() }))}
          value={answers.priorityId}
          onChange={(priorityId) => setAnswers({ priorityId })}
        />
      ),
      validate: () => (priorityItem(answers) ? null : "Elegí una prioridad o compará las opciones."),
      secondary: {
        label: "Comparar opciones por impacto y esfuerzo",
        onClick: () => {
          setAnswers({ useMatrix: true })
          ctx.goTo("matriz")
        },
      },
    }
  }

  if (screen === "matriz") {
    return {
      eyebrow: "Elegir y ajustar · Opcional",
      title: "Compará por impacto y esfuerzo",
      help: "Ubicá cada opción y después elegí tu prioridad. La matriz te muestra el panorama; la decisión es tuya.",
      body: (
        <Matrix
          items={items}
          priorityId={answers.priorityId}
          onItemChange={setItem}
          onSelect={(priorityId) => setAnswers({ priorityId })}
        />
      ),
      validate: () => (priorityItem(answers) ? null : "Tocá una opción de la matriz para elegirla como prioridad."),
      secondary: {
        label: "Seguir sin la matriz",
        onClick: () => {
          setAnswers({ useMatrix: false })
          ctx.goTo(priorityItem(answers) ? "alcance" : "prioridad")
        },
      },
    }
  }

  if (screen === "alcance") {
    const priority = priorityItem(answers)
    const hint = scopeHint(answers)
    return {
      eyebrow: "Elegir y ajustar",
      title: FIT_QUESTION,
      help: "Un paso que cabe en tu día vale más que uno ideal que no llega a empezar.",
      body: (
        <div className="flex flex-col gap-6">
          {priority && (
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Tu prioridad</p>
              <ItemQuote item={priority} />
            </div>
          )}
          {hint && (
            <p className="rounded-2xl bg-sage p-5 text-sm leading-relaxed text-foreground">
              <span className="font-semibold">Según lo que anotaste: </span>
              {hint}
            </p>
          )}
          <AnswerField
            aria-labelledby={ctx.labelledBy}
            {...aria}
            rows={3}
            className="min-h-24"
            value={answers.fitVersion}
            placeholder="La versión que cabe hoy es…"
            onChange={(e) => setAnswers({ fitVersion: e.target.value })}
          />
          <div className="flex flex-col gap-2 text-sm leading-relaxed">
            <p className="font-semibold text-foreground">Algunas formas de ajustarlo:</p>
            <ul className="flex flex-col gap-1 text-muted-foreground">
              {FIT_IDEAS.map((idea) => (
                <li key={idea} className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-olive" aria-hidden="true" />
                  {idea}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    }
  }

  const f = NEXT_STEP_FIELDS
  return {
    eyebrow: "Próximo paso",
    title: moment?.closing ?? "Elegí tu próximo paso",
    help: "Escribilo con tus palabras. Es lo que vas a encontrar en tu reporte.",
    body: (
      <div className="flex flex-col gap-8">
        <Field id="pe-next" label={f.nextStep.label} help={f.nextStep.help}>
          <AnswerField
            id="pe-next"
            aria-describedby={`pe-next-help ${ctx.invalid ? ctx.describedBy : ""}`}
            aria-invalid={ctx.invalid && !filled(answers.nextStep) ? true : undefined}
            rows={2}
            className="min-h-20"
            value={answers.nextStep}
            placeholder={f.nextStep.placeholder}
            onChange={(e) => setAnswers({ nextStep: e.target.value })}
          />
        </Field>
        <Field id="pe-why" label={f.why.label} help={f.why.help}>
          <AnswerField
            id="pe-why"
            aria-describedby="pe-why-help"
            rows={2}
            className="min-h-20"
            value={answers.why}
            placeholder={f.why.placeholder}
            onChange={(e) => setAnswers({ why: e.target.value })}
          />
        </Field>
        <Field id="pe-when" label={f.when.label} help={f.when.help} example={f.when.example}>
          <AnswerField
            id="pe-when"
            aria-describedby="pe-when-help"
            aria-invalid={ctx.invalid && !filled(answers.when) ? true : undefined}
            rows={2}
            className="min-h-20"
            value={answers.when}
            placeholder={f.when.placeholder}
            onChange={(e) => setAnswers({ when: e.target.value })}
          />
        </Field>
        <Field id="pe-later" label={f.later.label} help={f.later.help}>
          <AnswerField
            id="pe-later"
            aria-describedby="pe-later-help"
            rows={2}
            className="min-h-20"
            value={answers.later}
            placeholder={f.later.placeholder}
            onChange={(e) => setAnswers({ later: e.target.value })}
          />
        </Field>
      </div>
    ),
    validate: () => {
      if (!filled(answers.nextStep)) return "Escribí tu próximo paso para ver el reporte."
      if (!filled(answers.when)) return "Anotá cuándo lo vas a hacer: una hora, un momento o un disparador."
      return null
    },
  }
}
