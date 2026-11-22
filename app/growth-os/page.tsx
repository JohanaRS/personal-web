import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GrowthOsHero } from "@/components/growth-os/hero"
import { GrowthOsJourney } from "@/components/growth-os/journey"
import { GrowthOsAudience } from "@/components/growth-os/audience"
import { GrowthOsClosingCta } from "@/components/growth-os/closing-cta"

export const metadata: Metadata = {
  title: "Growth OS | Johana Ríos",
  description:
    "De tus ideas a acciones con sentido. Organizá ideas, definí objetivos y prioridades, transformalos en metas medibles con indicadores, planificá acciones y visualizá tus avances.",
  alternates: { canonical: "/growth-os" },
  openGraph: {
    title: "Growth OS | Johana Ríos",
    description: "De tus ideas a acciones con sentido.",
    url: "/growth-os",
    siteName: "Johana Ríos",
    type: "website",
  },
}

export default function GrowthOsPage() {
  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-24">
        <GrowthOsHero />
        <GrowthOsJourney />
        <GrowthOsAudience />
        <GrowthOsClosingCta />
      </main>
      <Footer />
    </>
  )
}
