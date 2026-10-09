"use client"

import { useRef, useState } from "react"
import { ChevronDown, ChevronUp, GripVertical, Lightbulb, Plus, Repeat2, Search, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { DIMENSIONS, SKILLS_COUNT, getDimension } from "./content"
import { DimensionIcon } from "./dimension-icon"
import { isConcentrated, skillDefinition } from "./derived"
import { createCustomSkill } from "./state"
import type { DimensionId, Skill } from "./types"

interface SkillSelectorProps {
  skills: Skill[]
  onChange: (skills: Skill[]) => void
  showTriggers?: boolean
}

type IdeasFilter = DimensionId | "all"

const normalize = (text: string) => text.trim().toLowerCase()

export function SkillSelector({ skills, onChange, showTriggers = false }: SkillSelectorProps) {
  const [ideasOpen, setIdeasOpen] = useState(false)
  const [ideasFilter, setIdeasFilter] = useState<IdeasFilter>("all")
  const [query, setQuery] = useState("")
  const [replacingId, setReplacingId] = useState<string | null>(null)
  const [editingDefinition, setEditingDefinition] = useState<Set<string>>(new Set())
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [overIndex, setOverIndex] = useState<number | null>(null)
  const [lastAddedId, setLastAddedId] = useState<string | null>(null)
  const ideasRef = useRef<HTMLDivElement>(null)

  const count = skills.length
  const atMax = count >= SKILLS_COUNT
  const missing = SKILLS_COUNT - count
  const replacing = skills.find((s) => s.id === replacingId) ?? null

  const patchSkill = (id: string, patch: Partial<Skill>) =>
    onChange(skills.map((s) => (s.id === id ? { ...s, ...patch } : s)))

  const revealIdeas = (filter: IdeasFilter) => {
    setIdeasFilter(filter)
    setIdeasOpen(true)
    requestAnimationFrame(() => ideasRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }))
  }

  const move = (from: number, to: number) => {
    if (to < 0 || to >= skills.length || from === to) return
    const next = [...skills]
    const [item] = next.splice(from, 1)
    next.splice(to, 0, item)
    onChange(next)
  }

  const addBlank = () => {
    if (atMax) return
    const skill = createCustomSkill()
    setLastAddedId(skill.id)
    onChange([...skills, skill])
  }

  const removeSkill = (id: string) => {
    if (replacingId === id) setReplacingId(null)
    onChange(skills.filter((s) => s.id !== id))
  }

  const toggleIdea = (idea: string, dimension: DimensionId) => {
    const existing = skills.find((s) => normalize(s.name) === normalize(idea))
    if (existing) {
      removeSkill(existing.id)
      return
    }
    if (replacing) {
      onChange(skills.map((s) => (s.id === replacing.id ? createCustomSkill(idea, dimension) : s)))
      setReplacingId(null)
      return
    }
    if (atMax) return
    onChange([...skills, createCustomSkill(idea, dimension)])
  }

  const toggleDefinition = (id: string) =>
    setEditingDefinition((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const visibleGroups = DIMENSIONS.filter((d) => ideasFilter === "all" || d.id === ideasFilter)
    .map((d) => ({
      dimension: d,
      ideas: d.ideas.filter((idea) => normalize(idea).includes(normalize(query))),
    }))
    .filter((g) => g.ideas.length > 0)

  return (
    <div className="flex flex-col gap-6">
      {showTriggers && (
        <section aria-labelledby="triggers-title" className="flex flex-col gap-3">
          <h3 id="triggers-title" className="text-sm font-semibold text-foreground">
            Para pensar, mirá tu liderazgo desde cuatro relaciones
          </h3>
          <ul className="grid gap-3 sm:grid-cols-2">
            {DIMENSIONS.map((dimension) => (
              <li key={dimension.id}>
                <button
                  type="button"
                  onClick={() => revealIdeas(dimension.id)}
                  className="flex h-full w-full cursor-pointer items-start gap-3 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/50"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <DimensionIcon id={dimension.id} className="size-4" />
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-foreground">{dimension.triggerTitle}</span>
                    <span className="text-sm leading-relaxed text-muted-foreground">{dimension.triggerQuestion}</span>
                    <span className="mt-1 text-xs font-medium text-primary">Ver ideas</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="flex flex-col gap-3 rounded-xl border border-border bg-secondary/40 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div aria-live="polite">
            <p className="text-base font-semibold text-foreground">
              {count} de {SKILLS_COUNT} capacidades definidas
            </p>
            <p className="text-sm text-muted-foreground">
              {missing > 0
                ? `Te ${missing === 1 ? "falta 1 capacidad" : `faltan ${missing} capacidades`} para completar tu Radar.`
                : "Tu Radar está completo. Podés ajustarlo antes de seguir."}
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => (ideasOpen ? setIdeasOpen(false) : revealIdeas(ideasFilter))}
            aria-expanded={ideasOpen}
          >
            <Lightbulb />
            Necesito ideas
          </Button>
        </div>

        <ul className="flex flex-wrap gap-2" aria-label="Capacidades por relación">
          {DIMENSIONS.map((dimension) => {
            const n = skills.filter((s) => s.dimension === dimension.id).length
            return (
              <li
                key={dimension.id}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs",
                  n > 0 ? "border-primary/40 bg-primary/5 text-foreground" : "border-border bg-card text-muted-foreground"
                )}
              >
                <DimensionIcon id={dimension.id} className="size-3.5" />
                {dimension.modelLabel}
                <strong className="font-semibold">{n}</strong>
              </li>
            )
          })}
        </ul>

        {isConcentrated(skills) && (
          <p role="status" className="text-sm leading-relaxed text-foreground">
            Todas tus capacidades pertenecen a una misma relación. Si querés, mirá también las otras tres: tu liderazgo
            se expresa en las cuatro.
          </p>
        )}
      </div>

      {ideasOpen && (
        <div ref={ideasRef} className="flex flex-col gap-4 rounded-xl border border-border bg-secondary/40 p-5">
          {replacing && (
            <div className="flex items-start justify-between gap-3 rounded-lg bg-card px-4 py-3 text-sm text-foreground">
              <p>
                Elegí una idea para reemplazar <strong>{replacing.name || "esta capacidad"}</strong>.
              </p>
              <button
                type="button"
                onClick={() => setReplacingId(null)}
                className="inline-flex shrink-0 cursor-pointer items-center gap-1 font-medium text-primary underline-offset-4 hover:underline"
              >
                <X className="size-4" aria-hidden="true" />
                Cancelar
              </button>
            </div>
          )}

          <p className="text-sm leading-relaxed text-muted-foreground">
            Tocá las que resuenen con vos para sumarlas o quitarlas. Después podés renombrarlas.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative sm:w-64">
              <label htmlFor="ideas-search" className="sr-only">
                Buscar ideas de capacidades
              </label>
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                id="ideas-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar una idea"
                className="h-10 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por relación">
              {([{ id: "all", label: "Todas" }, ...DIMENSIONS.map((d) => ({ id: d.id, label: d.modelLabel }))] as {
                id: IdeasFilter
                label: string
              }[]).map((option) => (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={ideasFilter === option.id}
                  onClick={() => setIdeasFilter(option.id)}
                  className={cn(
                    "min-h-9 cursor-pointer rounded-full border px-3.5 text-sm transition-colors",
                    ideasFilter === option.id
                      ? "border-primary bg-primary/10 font-medium text-primary"
                      : "border-border bg-card text-foreground hover:border-primary/50"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {visibleGroups.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No encontramos ideas con esa búsqueda. Podés agregar tu propia capacidad igualmente.
            </p>
          ) : (
            <div className="flex flex-col gap-5">
              {visibleGroups.map(({ dimension, ideas }) => (
                <div key={dimension.id}>
                  <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <DimensionIcon id={dimension.id} className="size-3.5" />
                    {dimension.name} · {dimension.relation}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {ideas.map((idea) => {
                      const selected = skills.some((s) => normalize(s.name) === normalize(idea))
                      return (
                        <button
                          key={idea}
                          type="button"
                          aria-pressed={selected}
                          disabled={!selected && atMax && !replacing}
                          onClick={() => toggleIdea(idea, dimension.id)}
                          className={cn(
                            "min-h-9 cursor-pointer rounded-full border px-3.5 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50",
                            selected
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-card text-foreground hover:border-primary/50"
                          )}
                        >
                          {idea}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {count === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card px-6 py-10 text-center">
          <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground text-pretty">
            Todavía no definiste ninguna capacidad. Podés agregar la primera o abrir “Necesito ideas” para elegir entre
            varias opciones.
          </p>
        </div>
      ) : (
        <ol className="flex flex-col gap-3">
          {skills.map((skill, i) => {
            const editing = editingDefinition.has(skill.id)
            const definition = skillDefinition(skill)
            const dimension = getDimension(skill.dimension)
            const isReplacing = replacingId === skill.id
            return (
              <li
                key={skill.id}
                onDragOver={(e) => {
                  if (dragIndex === null) return
                  e.preventDefault()
                  setOverIndex(i)
                }}
                onDrop={(e) => {
                  e.preventDefault()
                  if (dragIndex !== null) move(dragIndex, i)
                  setDragIndex(null)
                  setOverIndex(null)
                }}
                className={cn(
                  "rounded-xl border bg-card p-3 transition-colors sm:p-4",
                  overIndex === i && dragIndex !== null && dragIndex !== i
                    ? "border-primary"
                    : isReplacing
                      ? "border-primary ring-2 ring-primary/25"
                      : "border-border",
                  dragIndex === i && "opacity-50"
                )}
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <span
                    draggable
                    onDragStart={(e) => {
                      setDragIndex(i)
                      e.dataTransfer.effectAllowed = "move"
                      e.dataTransfer.setData("text/plain", skill.id)
                      const row = e.currentTarget.closest("li")
                      if (row) e.dataTransfer.setDragImage(row, 24, 24)
                    }}
                    onDragEnd={() => {
                      setDragIndex(null)
                      setOverIndex(null)
                    }}
                    className="mt-1.5 hidden cursor-grab text-muted-foreground active:cursor-grabbing sm:block"
                    aria-hidden="true"
                    title="Arrastrá para reordenar"
                  >
                    <GripVertical className="size-5" />
                  </span>

                  <span
                    className="mt-1.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-foreground"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>

                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <label htmlFor={`skill-name-${skill.id}`} className="sr-only">
                      Nombre de la capacidad {i + 1}
                    </label>
                    <input
                      id={`skill-name-${skill.id}`}
                      type="text"
                      value={skill.name}
                      autoFocus={skill.id === lastAddedId}
                      maxLength={80}
                      placeholder="Ej.: Escucha activa"
                      onChange={(e) => patchSkill(skill.id, { name: e.target.value, shortName: undefined })}
                      className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />

                    {skill.custom ? (
                      <div className="flex flex-wrap items-center gap-2">
                        <label htmlFor={`skill-dim-${skill.id}`} className="text-xs text-muted-foreground">
                          Relación
                        </label>
                        <select
                          id={`skill-dim-${skill.id}`}
                          value={skill.dimension ?? ""}
                          onChange={(e) =>
                            patchSkill(skill.id, { dimension: (e.target.value || null) as DimensionId | null })
                          }
                          className="h-8 cursor-pointer rounded-md border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                        >
                          <option value="">Sin asignar</option>
                          {DIMENSIONS.map((d) => (
                            <option key={d.id} value={d.id}>
                              {d.relation}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      dimension && (
                        <p className="inline-flex w-fit items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-foreground">
                          <DimensionIcon id={dimension.id} className="size-3.5" />
                          {dimension.relation}
                        </p>
                      )
                    )}

                    {editing ? (
                      <>
                        <label htmlFor={`skill-def-${skill.id}`} className="sr-only">
                          Qué significa esta capacidad para vos
                        </label>
                        <textarea
                          id={`skill-def-${skill.id}`}
                          rows={3}
                          value={skill.userDescription ?? definition}
                          onChange={(e) => patchSkill(skill.id, { userDescription: e.target.value })}
                          placeholder="¿Qué significa esta capacidad para vos? (opcional)"
                          className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </>
                    ) : (
                      definition && <p className="text-sm leading-relaxed text-muted-foreground">{definition}</p>
                    )}

                    <button
                      type="button"
                      onClick={() => toggleDefinition(skill.id)}
                      className="w-fit cursor-pointer text-sm font-medium text-primary underline-offset-4 hover:underline"
                    >
                      {editing ? "Listo" : definition ? "Adaptar definición" : "Agregar qué significa para mí (opcional)"}
                    </button>
                  </div>

                  <div className="flex shrink-0 flex-col gap-1 sm:flex-row">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => move(i, i - 1)}
                      disabled={i === 0}
                      aria-label={`Subir ${skill.name || `capacidad ${i + 1}`}`}
                    >
                      <ChevronUp />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => move(i, i + 1)}
                      disabled={i === skills.length - 1}
                      aria-label={`Bajar ${skill.name || `capacidad ${i + 1}`}`}
                    >
                      <ChevronDown />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setReplacingId(skill.id)
                        revealIdeas(skill.dimension ?? "all")
                      }}
                      aria-label={`Reemplazar ${skill.name || `capacidad ${i + 1}`}`}
                      aria-pressed={isReplacing}
                      className="text-muted-foreground hover:text-primary"
                    >
                      <Repeat2 />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSkill(skill.id)}
                      aria-label={`Quitar ${skill.name || `capacidad ${i + 1}`}`}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      )}

      <div className="flex flex-col items-start gap-2">
        <Button type="button" variant="outline" onClick={addBlank} disabled={atMax}>
          <Plus />
          Agregar capacidad
        </Button>
        {atMax && (
          <p className="text-sm leading-relaxed text-muted-foreground">
            Tu Radar ya tiene las 8 capacidades. Si querés incluir otra, reemplazá o quitá alguna.
          </p>
        )}
      </div>
    </div>
  )
}
