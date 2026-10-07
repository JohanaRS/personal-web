"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, GripVertical, Lightbulb, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { IDEA_CATEGORIES, MAX_SKILLS, MIN_SKILLS, TARGET_SKILLS } from "./content"
import { skillDefinition } from "./derived"
import { createCustomSkill } from "./state"
import type { Skill } from "./types"

interface SkillSelectorProps {
  skills: Skill[]
  onChange: (skills: Skill[]) => void
}

const normalize = (text: string) => text.trim().toLowerCase()

export function SkillSelector({ skills, onChange }: SkillSelectorProps) {
  const [ideasOpen, setIdeasOpen] = useState(false)
  const [editingDefinition, setEditingDefinition] = useState<Set<string>>(new Set())
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [overIndex, setOverIndex] = useState<number | null>(null)
  const [lastAddedId, setLastAddedId] = useState<string | null>(null)

  const count = skills.length
  const atMax = count >= MAX_SKILLS

  const patchSkill = (id: string, patch: Partial<Skill>) =>
    onChange(skills.map((s) => (s.id === id ? { ...s, ...patch } : s)))

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

  const toggleIdea = (idea: string) => {
    const existing = skills.find((s) => normalize(s.name) === normalize(idea))
    if (existing) {
      onChange(skills.filter((s) => s.id !== existing.id))
      return
    }
    if (atMax) return
    onChange([...skills, createCustomSkill(idea)])
  }

  const toggleDefinition = (id: string) =>
    setEditingDefinition((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div aria-live="polite">
          <p className="text-base font-semibold text-foreground">
            {count <= TARGET_SKILLS
              ? `${count} de ${TARGET_SKILLS} capacidades definidas`
              : `${count} capacidades definidas`}
          </p>
          <p className="text-sm text-muted-foreground">
            Podés usar entre {MIN_SKILLS} y {MAX_SKILLS}. Con {TARGET_SKILLS} el radar se lee mejor.
          </p>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={() => setIdeasOpen((v) => !v)} aria-expanded={ideasOpen}>
          <Lightbulb />
          Necesito ideas
        </Button>
      </div>

      {ideasOpen && (
        <div className="rounded-xl border border-border bg-secondary/40 p-5">
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            Tocá las que resuenen con vos para sumarlas o quitarlas. Después podés renombrarlas.
          </p>
          <div className="flex flex-col gap-5">
            {IDEA_CATEGORIES.map((category) => (
              <div key={category.title}>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {category.title}
                </p>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((idea) => {
                    const selected = skills.some((s) => normalize(s.name) === normalize(idea))
                    return (
                      <button
                        key={idea}
                        type="button"
                        aria-pressed={selected}
                        disabled={!selected && atMax}
                        onClick={() => toggleIdea(idea)}
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
                  overIndex === i && dragIndex !== null && dragIndex !== i ? "border-primary" : "border-border",
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
                      onClick={() => onChange(skills.filter((s) => s.id !== skill.id))}
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
          <p className="text-sm text-muted-foreground">
            Llegaste al máximo de {MAX_SKILLS}. Quitá alguna si querés sumar otra.
          </p>
        )}
      </div>
    </div>
  )
}
