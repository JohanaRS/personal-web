import type { DimensionId } from "./content"

/** Hex equivalents of the site's oklch tokens (globals.css), needed by SVG/PDF exports. */
export const COLORS = {
  background: "#faf8f5",
  foreground: "#262117",
  card: "#f4f1ec",
  primary: "#4b5d28",
  primarySoft: "#eef0e4",
  muted: "#5a5549",
  border: "#e3ddd3",
}

export interface DimensionStyle {
  /** Circle outline and fill hue. */
  stroke: string
  /** Darker variant used for text (WCAG AA on the cream background). */
  text: string
  /** Outline pattern so the circles stay distinguishable in grayscale and without color. */
  dash: string
  pattern: string
}

export const DIMENSION_STYLES: Record<DimensionId, DimensionStyle> = {
  love: { stroke: "#5b6e2f", text: "#3d4c1e", dash: "", pattern: "Línea continua" },
  good: { stroke: "#a04f27", text: "#86401d", dash: "14 8", pattern: "Línea de guiones" },
  need: { stroke: "#4c6371", text: "#3b4f5c", dash: "2 7", pattern: "Línea de puntos" },
  paid: { stroke: "#9a7420", text: "#6b5011", dash: "18 7 3 7", pattern: "Línea de guion y punto" },
}
