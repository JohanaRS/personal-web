export interface Slot {
  y: number
  w: number
}

export interface TextStyle {
  weight?: 400 | 600 | 700
  letterSpacing?: number
  /** Extra room for the on-screen font, which is slightly wider than the export font it is measured with. */
  widthFactor?: number
}

export interface FittedText {
  lines: { text: string; y: number }[]
  size: number
  truncated: boolean
}

const ELLIPSIS = "…"
let context: CanvasRenderingContext2D | null | undefined

export function measure(text: string, size: number, style: TextStyle = {}) {
  const { weight = 400, letterSpacing = 0, widthFactor = 1 } = style
  if (context === undefined) {
    context = typeof document === "undefined" ? null : document.createElement("canvas").getContext("2d")
  }
  let width: number
  if (context) {
    context.font = `${weight} ${size}px Helvetica, Arial, sans-serif`
    width = context.measureText(text).width
  } else {
    width = text.length * size * (weight >= 600 ? 0.6 : 0.54)
  }
  return (width + letterSpacing * text.length) * widthFactor
}

function ellipsize(text: string, width: number, size: number, style: TextStyle) {
  let out = text
  while (out.length > 1 && measure(out + ELLIPSIS, size, style) > width) out = out.slice(0, -1)
  return out.trimEnd() + ELLIPSIS
}

/** Choose `count` consecutive slots, either the first ones or the last ones. */
function pickSlots(slots: Slot[], count: number, align: "start" | "end") {
  return align === "start" ? slots.slice(0, count) : slots.slice(slots.length - count)
}

/** Greedy word wrap into a sequence of line widths. Returns the lines and how many words fit. */
function wrapWords(words: string[], widths: number[], size: number, style: TextStyle) {
  const lines: string[] = []
  let i = 0
  let cut = false
  for (const width of widths) {
    if (i >= words.length) break
    let line = ""
    while (i < words.length) {
      const candidate = line ? `${line} ${words[i]}` : words[i]
      if (measure(candidate, size, style) <= width) {
        line = candidate
        i++
      } else if (!line) {
        line = ellipsize(words[i], width, size, style)
        cut = true
        i++
        break
      } else break
    }
    lines.push(line)
  }
  return { lines, placed: i, cut }
}

/**
 * Fit free text into the given slots. Tries every font size from max to min and the
 * fewest slots first; only truncates (with an ellipsis) when nothing fits at the minimum size.
 */
export function fitParagraph(
  text: string,
  slots: Slot[],
  sizes: number[],
  style: TextStyle,
  align: "start" | "end" = "start",
): FittedText {
  const words = text.trim().split(/\s+/).filter(Boolean)
  if (!words.length) return { lines: [], size: sizes[0], truncated: false }

  for (const size of sizes) {
    for (let count = 1; count <= slots.length; count++) {
      const chosen = pickSlots(slots, count, align)
      const { lines, placed, cut } = wrapWords(
        words,
        chosen.map((s) => s.w),
        size,
        style,
      )
      if (placed === words.length && !cut) {
        return { lines: lines.map((t, k) => ({ text: t, y: chosen[k].y })), size, truncated: false }
      }
    }
  }

  const size = sizes[sizes.length - 1]
  const { lines, placed } = wrapWords(
    words,
    slots.map((s) => s.w),
    size,
    style,
  )
  if (placed < words.length && lines.length) {
    const last = lines.length - 1
    lines[last] = ellipsize(lines[last], slots[last].w, size, style)
  }
  return { lines: lines.map((t, k) => ({ text: t, y: slots[k].y })), size, truncated: true }
}

/**
 * Fit a list of keywords joined by " · ". When they do not all fit, the last line ends
 * with "+N" so the person knows there is more in the full report.
 */
export function fitKeywords(
  keywords: string[],
  slots: Slot[],
  sizes: number[],
  style: TextStyle,
  align: "start" | "end" = "start",
): FittedText {
  if (!keywords.length) return { lines: [], size: sizes[0], truncated: false }
  const SEP = " · "

  const pack = (widths: number[], size: number) => {
    const lines: string[][] = []
    let i = 0
    let cut = false
    for (const width of widths) {
      if (i >= keywords.length) break
      const line: string[] = []
      while (i < keywords.length) {
        const candidate = [...line, keywords[i]].join(SEP)
        if (measure(candidate, size, style) <= width) {
          line.push(keywords[i])
          i++
        } else if (!line.length) {
          line.push(ellipsize(keywords[i], width, size, style))
          cut = true
          i++
          break
        } else break
      }
      lines.push(line)
    }
    return { lines, placed: i, cut }
  }

  for (const size of sizes) {
    for (let count = 1; count <= slots.length; count++) {
      const chosen = pickSlots(slots, count, align)
      const { lines, placed, cut } = pack(
        chosen.map((s) => s.w),
        size,
      )
      if (placed === keywords.length && !cut) {
        return {
          lines: lines.map((l, k) => ({ text: l.join(SEP), y: chosen[k].y })),
          size,
          truncated: false,
        }
      }
    }
  }

  const size = sizes[sizes.length - 1]
  const { lines, placed } = pack(
    slots.map((s) => s.w),
    size,
  )
  let remaining = keywords.length - placed
  const last = lines.length - 1
  if (remaining > 0 && last >= 0) {
    const width = slots[last].w
    while (lines[last].length > 1 && measure(`${lines[last].join(SEP)} +${remaining}`, size, style) > width) {
      lines[last].pop()
      remaining++
    }
  }
  return {
    lines: lines.map((l, k) => ({
      text: k === last && remaining > 0 ? `${l.join(SEP)} +${remaining}` : l.join(SEP),
      y: slots[k].y,
    })),
    size,
    truncated: true,
  }
}
