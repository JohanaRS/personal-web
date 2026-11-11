import type { Metadata } from "next"
import { Fraunces, Manrope } from "next/font/google"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PausaTool } from "@/components/pausa/pausa-tool"

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" })
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" })

const title = "PAUSA | Una pausa estratégica para usar IA con criterio propio | Johana Ríos"
const description =
  "Recurso autoguiado y gratuito: cinco preguntas para decidir qué ayuda pedirle a la IA, revisar lo que obtenés y salir con un próximo paso propio. Sin cuenta ni correo."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/recursos/pausa" },
  openGraph: {
    title,
    description,
    url: "/recursos/pausa",
    type: "website",
    locale: "es_AR",
    images: [{ url: "/images/logo-principal.png", alt: "Johana Ríos - Liderazgo, Coaching, Calidad" }],
  },
  twitter: { card: "summary", title, description },
}

export default function PausaPage() {
  return (
    <>
      <Header />
      <main className={`${fraunces.variable} ${manrope.variable} pausa-theme min-h-screen pt-16 lg:pt-20`}>
        <PausaTool />
      </main>
      <Footer />
    </>
  )
}
