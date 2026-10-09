"use client"

import { useId } from "react"
import { cn } from "@/lib/utils"

export interface RadarDatum {
  id: string
  label: string
  current: number | null
  desired: number | null
}

interface RadarChartProps {
  data: RadarDatum[]
  /** auto: names on wide screens, numbers on phones. numbers: always numbers. none: no labels. */
  labelMode?: "auto" | "numbers" | "none"
  showDesired?: boolean
  showLegend?: boolean
  className?: string
  ariaLabel?: string
}

const WIDTH = 720
const HEIGHT = 640
const CX = 360
const CY = 316
const RADIUS = 196
const RINGS = [2, 4, 6, 8, 10]
const LINE_HEIGHT = 19

function angleFor(index: number, total: number) {
  return -Math.PI / 2 + (index * 2 * Math.PI) / total
}

function wrapLabel(text: string, max = 16, maxLines = 3): string[] {
  const words = text.split(/\s+/).filter(Boolean)
  const lines: string[] = []
  let current = ""
  for (const word of words) {
    if (!current) current = word
    else if (`${current} ${word}`.length <= max) current += ` ${word}`
    else {
      lines.push(current)
      current = word
    }
  }
  if (current) lines.push(current)
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines)
    kept[maxLines - 1] = `${kept[maxLines - 1].slice(0, max - 1)}…`
    return kept
  }
  return lines
}

export function RadarChart({
  data,
  labelMode = "auto",
  showDesired = true,
  showLegend = true,
  className,
  ariaLabel = "Radar de liderazgo",
}: RadarChartProps) {
  const uid = useId()
  const total = data.length

  const pointAt = (index: number, value: number, radius = RADIUS) => {
    const angle = angleFor(index, total)
    const r = (value / 10) * radius
    return [CX + r * Math.cos(angle), CY + r * Math.sin(angle)] as const
  }

  const polygonFor = (key: "current" | "desired") =>
    data.map((d, i) => pointAt(i, d[key] ?? 0).join(",")).join(" ")

  const description = data
    .map((d) => {
      const parts = [`${d.label}: actual ${d.current ?? "sin puntuar"}`]
      if (showDesired) parts.push(`deseado ${d.desired ?? "sin puntuar"}`)
      return parts.join(", ")
    })
    .join(". ")

  return (
    <figure className={cn("w-full", className)}>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="mx-auto h-auto w-full max-w-[720px]"
        role="img"
        aria-labelledby={`${uid}-title ${uid}-desc`}
      >
        <title id={`${uid}-title`}>{ariaLabel}</title>
        <desc id={`${uid}-desc`}>{description}</desc>

        {/* Grid */}
        <g aria-hidden="true">
          {RINGS.map((ring) => (
            <polygon
              key={ring}
              points={data
                .map((_, i) => pointAt(i, ring).join(","))
                .join(" ")}
              className={cn(
                "fill-none stroke-border",
                ring === 10 ? "stroke-[1.5]" : "stroke-1"
              )}
            />
          ))}
          {data.map((d, i) => {
            const [x, y] = pointAt(i, 10)
            return (
              <line
                key={d.id}
                x1={CX}
                y1={CY}
                x2={x}
                y2={y}
                className="stroke-border"
                strokeWidth={1}
              />
            )
          })}
          <g className="hidden sm:block">
            {RINGS.map((ring) => (
              <text
                key={ring}
                x={CX + 6}
                y={CY - (ring / 10) * RADIUS - 4}
                className="fill-muted-foreground"
                style={{ fontSize: 12 }}
              >
                {ring}
              </text>
            ))}
          </g>
        </g>

        {/* Desired */}
        {showDesired && (
          <g aria-hidden="true">
            <polygon
              points={polygonFor("desired")}
              className="fill-clay/10 stroke-clay"
              strokeWidth={3}
              strokeDasharray="9 7"
              strokeLinejoin="round"
            />
            {data.map((d, i) => {
              if (d.desired === null) return null
              const [x, y] = pointAt(i, d.desired)
              return (
                <polygon
                  key={d.id}
                  points={`${x},${y - 8} ${x + 8},${y} ${x},${y + 8} ${x - 8},${y}`}
                  className="fill-clay stroke-background"
                  strokeWidth={2}
                />
              )
            })}
          </g>
        )}

        {/* Current */}
        <g aria-hidden="true">
          <polygon
            points={polygonFor("current")}
            className="fill-primary/20 stroke-primary"
            strokeWidth={3.5}
            strokeLinejoin="round"
          />
          {data.map((d, i) => {
            if (d.current === null) return null
            const [x, y] = pointAt(i, d.current)
            return (
              <circle
                key={d.id}
                cx={x}
                cy={y}
                r={7}
                className="fill-primary stroke-background"
                strokeWidth={2.5}
              />
            )
          })}
        </g>

        {/* Names */}
        {labelMode !== "none" && (
          <g
            aria-hidden="true"
            className={labelMode === "numbers" ? "hidden" : "hidden sm:block"}
          >
            {data.map((d, i) => {
              const angle = angleFor(i, total)
              const cos = Math.cos(angle)
              const sin = Math.sin(angle)
              const lx = CX + (RADIUS + 20) * cos
              const ly = CY + (RADIUS + 20) * sin
              const anchor = cos > 0.3 ? "start" : cos < -0.3 ? "end" : "middle"
              const lines = wrapLabel(d.label)
              const startY =
                sin < -0.5
                  ? ly - (lines.length - 1) * LINE_HEIGHT - 2
                  : sin > 0.5
                    ? ly + 12
                    : ly - ((lines.length - 1) * LINE_HEIGHT) / 2 + 5
              return (
                <text
                  key={d.id}
                  x={lx}
                  y={startY}
                  textAnchor={anchor}
                  className="fill-foreground"
                  style={{ fontSize: 16, fontWeight: 500 }}
                >
                  {lines.map((line, k) => (
                    <tspan key={k} x={lx} dy={k === 0 ? 0 : LINE_HEIGHT}>
                      {line}
                    </tspan>
                  ))}
                </text>
              )
            })}
          </g>
        )}

        {/* Numbers (phones): the legend below the chart carries the names */}
        {labelMode !== "none" && (
          <g
            aria-hidden="true"
            className={labelMode === "auto" ? "sm:hidden" : undefined}
          >
            {data.map((d, i) => {
              const [x, y] = pointAt(i, 10, RADIUS + 34)
              return (
                <g key={d.id}>
                  <circle
                    cx={x}
                    cy={y}
                    r={20}
                    className="fill-card stroke-border"
                    strokeWidth={1.5}
                  />
                  <text
                    x={x}
                    y={y + 8}
                    textAnchor="middle"
                    className="fill-foreground"
                    style={{ fontSize: 22, fontWeight: 600 }}
                  >
                    {i + 1}
                  </text>
                </g>
              )
            })}
          </g>
        )}
      </svg>

      {showLegend && (
        <figcaption className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-foreground">
          <span className="inline-flex items-center gap-2">
            <svg width="32" height="12" viewBox="0 0 32 12" aria-hidden="true">
              <line
                x1="0"
                y1="6"
                x2="32"
                y2="6"
                className="stroke-primary"
                strokeWidth="3"
              />
              <circle cx="16" cy="6" r="5" className="fill-primary" />
            </svg>
            Situación actual
            <span className="sr-only">(línea continua)</span>
          </span>
          {showDesired && (
            <span className="inline-flex items-center gap-2">
              <svg width="32" height="12" viewBox="0 0 32 12" aria-hidden="true">
                <line
                  x1="0"
                  y1="6"
                  x2="32"
                  y2="6"
                  className="stroke-clay"
                  strokeWidth="3"
                  strokeDasharray="5 4"
                />
                <polygon points="16,0 22,6 16,12 10,6" className="fill-clay" />
              </svg>
              Situación deseada
              <span className="sr-only">(línea punteada)</span>
            </span>
          )}
        </figcaption>
      )}
    </figure>
  )
}
