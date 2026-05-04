import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Services } from "@/components/sections/services"
import { Pricing } from "@/components/sections/pricing"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Servicios | Johana Ríos",
  description: "Coaching personal con PNL, coaching ejecutivo, consultoría organizacional, talleres y formación QA. Descubrí cómo puedo acompañarte.",
}

export default function ServiciosPage() {
  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-20">
        {/* Hero section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-secondary/30 to-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                Servicios
              </span>
              <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight text-balance">
                Formas de acompañarte
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Cada persona, equipo u organización tiene necesidades únicas. Elijo acompañar procesos desde una mirada humana, estructurada y orientada a cambios sostenibles.
              </p>
            </div>
          </div>
        </section>

        <Services />
        <Pricing />
      </main>
      <Footer />
    </>
  )
}
