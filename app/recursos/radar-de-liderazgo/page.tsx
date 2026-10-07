import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LeadershipRadar } from "@/components/leadership-radar/leadership-radar"

export const metadata: Metadata = {
  title: "Radar de Liderazgo | Johana Ríos",
  description:
    "Herramienta gratuita de autoconocimiento: definí qué clase de líder querés ser, observá dónde estás hoy y elegí qué desarrollar.",
}

export default function RadarDeLiderazgoPage() {
  return (
    <>
      <div className="print:hidden">
        <Header />
      </div>
      <main className="min-h-screen bg-background pt-16 lg:pt-20 print:pt-0">
        <LeadershipRadar />
      </main>
      <div className="print:hidden">
        <Footer />
      </div>
    </>
  )
}
