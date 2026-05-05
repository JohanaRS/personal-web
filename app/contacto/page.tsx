import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Contact } from "@/components/sections/contact"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contacto | Johana Ríos",
  description: "Escribime o agendá una conversación. El primer paso para trabajar juntos es conocernos.",
}

export default function ContactoPage() {
  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-20">
        {/* Hero section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-secondary/30 to-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                Contacto
              </span>
              <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight text-balance">
                El primer paso es conversar
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Si algo de lo que leíste resonó con vos, escribime. No hay compromiso, solo una conversación para conocernos y ver si puedo acompañarte en lo que necesitás.
              </p>
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  )
}
