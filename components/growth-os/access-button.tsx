import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GROWTH_OS_LOGIN_URL } from "./content"

export function GrowthOsAccessButton({ className }: { className?: string }) {
  return (
    <Button asChild size="lg" className={`gap-2 ${className ?? ""}`}>
      <a href={GROWTH_OS_LOGIN_URL} target="_blank" rel="noopener noreferrer">
        Ingresar a Growth OS
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">(se abre en una nueva pestaña)</span>
      </a>
    </Button>
  )
}
