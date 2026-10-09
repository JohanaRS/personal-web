import { Compass, Target, UserRound, Users, type LucideIcon } from "lucide-react"
import type { DimensionId } from "./types"

const ICONS: Record<DimensionId, LucideIcon> = {
  self: UserRound,
  others: Users,
  context: Compass,
  results: Target,
}

export function DimensionIcon({ id, className }: { id: DimensionId; className?: string }) {
  const Icon = ICONS[id]
  return <Icon className={className} aria-hidden="true" />
}
