"use client"

import { useState, useEffect, useCallback } from "react"
import { WheelChart } from "./wheel-chart"
import { CategoryControls } from "./category-controls"
import { Button } from "@/components/ui/button"
import { RotateCcw, Download } from "lucide-react"

const DEFAULT_CATEGORIES = [
  { name: "Salud y Bienestar", value: 5 },
  { name: "Crecimiento Personal", value: 5 },
  { name: "Relaciones", value: 5 },
  { name: "Amor y Pareja", value: 5 },
  { name: "Carrera y Proposito", value: 5 },
  { name: "Finanzas", value: 5 },
  { name: "Diversion y Ocio", value: 5 },
  { name: "Entorno", value: 5 },
]

const STORAGE_KEY = "rueda-de-la-vida-data"

function loadFromStorage() {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (
      Array.isArray(parsed) &&
      parsed.length === 8 &&
      parsed.every(
        (c: unknown) =>
          typeof c === "object" &&
          c !== null &&
          "name" in c &&
          "value" in c &&
          typeof (c as { name: string }).name === "string" &&
          typeof (c as { value: number }).value === "number" &&
          (c as { value: number }).value >= 1 &&
          (c as { value: number }).value <= 10
      )
    ) {
      return parsed as { name: string; value: number }[]
    }
  } catch {
    // ignore
  }
  return null
}

function saveToStorage(data: { name: string; value: number }[]) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // ignore
  }
}

export function LifeWheel() {
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES)
  const [loaded, setLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = loadFromStorage()
    if (saved) setCategories(saved)
    setLoaded(true)
  }, [])

  // Persist on changes (after initial load)
  useEffect(() => {
    if (loaded) saveToStorage(categories)
  }, [categories, loaded])

  const handleValueChange = useCallback((index: number, value: number) => {
    setCategories((prev) =>
      prev.map((c, i) => (i === index ? { ...c, value } : c))
    )
  }, [])

  const handleNameChange = useCallback((index: number, name: string) => {
    setCategories((prev) =>
      prev.map((c, i) => (i === index ? { ...c, name } : c))
    )
  }, [])

  const handleReset = useCallback(() => {
    setCategories(DEFAULT_CATEGORIES)
  }, [])

  const average = (
    categories.reduce((sum, c) => sum + c.value, 0) / categories.length
  ).toFixed(1)

  const handleDownload = useCallback(() => {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement | null
    if (!canvas) return
    const link = document.createElement("a")
    link.download = "rueda-de-la-vida.png"
    link.href = canvas.toDataURL("image/png")
    link.click()
  }, [])

  if (!loaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-muted-foreground">Cargando...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Score summary */}
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2">
          <span className="text-sm text-muted-foreground">Promedio general</span>
          <span className="text-xl font-bold text-primary">{average}</span>
          <span className="text-sm text-muted-foreground">/ 10</span>
        </div>
      </div>

      {/* Main layout: chart + controls */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        {/* Chart */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <WheelChart categories={categories} />
        </div>

        {/* Controls */}
        <div className="w-full lg:w-1/2">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-base font-semibold text-foreground mb-5">
              Ajusta tus valores
            </h3>
            <CategoryControls
              categories={categories}
              onValueChange={handleValueChange}
              onNameChange={handleNameChange}
            />
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <Button variant="outline" onClick={handleReset}>
          <RotateCcw className="w-4 h-4" />
          Reiniciar valores
        </Button>
        <Button variant="secondary" onClick={handleDownload}>
          <Download className="w-4 h-4" />
          Descargar imagen
        </Button>
      </div>
    </div>
  )
}
