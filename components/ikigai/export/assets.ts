import { COLORS } from "../brand"
import type { Logo, PrintAssets } from "../diagram/svg"

const MAX_LOGO_PX = 900

function hexToRgb(hex: string) {
  const value = Number.parseInt(hex.slice(1), 16)
  return { r: (value >> 16) & 255, g: (value >> 8) & 255, b: value & 255 }
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

/**
 * The brand PNGs have a wide empty margin and a baked-in light checkerboard.
 * Crop to the artwork and flatten near-white pixels onto the page background.
 */
export async function loadLogo(src: string, background = COLORS.background): Promise<Logo | null> {
  try {
    const img = await loadImage(src)
    const { naturalWidth: width, naturalHeight: height } = img
    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (!ctx) return null
    ctx.drawImage(img, 0, 0)
    const image = ctx.getImageData(0, 0, width, height)
    const px = image.data
    const bg = hexToRgb(background)
    let minX = width
    let minY = height
    let maxX = -1
    let maxY = -1
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4
        const lum = 0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2]
        if (lum < 200) {
          if (x < minX) minX = x
          if (x > maxX) maxX = x
          if (y < minY) minY = y
          if (y > maxY) maxY = y
        }
        const t = Math.min(1, Math.max(0, (238 - lum) / 20))
        px[i] = bg.r * (1 - t) + px[i] * t
        px[i + 1] = bg.g * (1 - t) + px[i + 1] * t
        px[i + 2] = bg.b * (1 - t) + px[i + 2] * t
        px[i + 3] = 255
      }
    }
    if (maxX < minX || maxY < minY) return null
    ctx.putImageData(image, 0, 0)

    const pad = 14
    const sx = Math.max(0, minX - pad)
    const sy = Math.max(0, minY - pad)
    const cw = Math.min(width, maxX + pad) - sx
    const ch = Math.min(height, maxY + pad) - sy
    const scale = Math.min(1, MAX_LOGO_PX / Math.max(cw, ch))
    const out = document.createElement("canvas")
    out.width = Math.round(cw * scale)
    out.height = Math.round(ch * scale)
    const outCtx = out.getContext("2d")
    if (!outCtx) return null
    outCtx.imageSmoothingQuality = "high"
    outCtx.drawImage(canvas, sx, sy, cw, ch, 0, 0, out.width, out.height)
    return { dataUrl: out.toDataURL("image/png"), ratio: cw / ch }
  } catch {
    return null
  }
}

let cached: Promise<PrintAssets> | null = null

/** Local brand assets, processed once per page load and reused by every export. */
export function loadBrandAssets(): Promise<PrintAssets> {
  cached ??= Promise.all([loadLogo("/images/logo-principal.png"), loadLogo("/images/logo-isotipo.png")]).then(
    ([logo, isotipo]) => ({ logo, isotipo }),
  )
  return cached
}

export async function svgToCanvas(svg: string, width: number, height: number) {
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }))
  try {
    const img = await loadImage(url)
    await img.decode?.().catch(() => undefined)
    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext("2d")
    if (!ctx) throw new Error("Canvas no disponible")
    ctx.fillStyle = COLORS.background
    ctx.fillRect(0, 0, width, height)
    ctx.drawImage(img, 0, 0, width, height)
    return canvas
  } finally {
    URL.revokeObjectURL(url)
  }
}

export function canvasToBlob(canvas: HTMLCanvasElement, type = "image/png") {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("No se pudo generar la imagen"))), type)
  })
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 2000)
}
