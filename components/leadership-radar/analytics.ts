import { track } from "@vercel/analytics"

type RadarEvent =
  | "leadership_radar_started"
  | "leadership_radar_mode_selected"
  | "leadership_radar_completed"
  | "leadership_radar_priority_selected"
  | "leadership_radar_coaching_cta_clicked"

/** Only aggregated, anonymous usage data. Never pass what the person wrote or scored. */
export function trackRadar(
  event: RadarEvent,
  props?: Record<string, string | number>
) {
  try {
    track(event, props)
  } catch {
    // Analytics must never break the exercise.
  }
}

export function scrollToTop() {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })
}
