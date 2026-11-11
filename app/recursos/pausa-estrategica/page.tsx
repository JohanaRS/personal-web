import type { Metadata } from "next"
import { Fraunces, Manrope } from "next/font/google"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PausaEstrategicaTool } from "@/components/pausa-estrategica/pausa-estrategica-tool"

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" })
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" })

const title = "Pausa estratégica | Decidí qué merece tu foco hoy | Johana Ríos"
const description =
  "Recurso autoguiado y gratuito: en 5 a 8 minutos distinguí lo importante de lo urgente, elegí una prioridad y salí con un próximo paso concreto. Sin cuenta ni correo."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/recursos/pausa-estrategica" },
  openGraph: {
    title,
    description,
    url: "/recursos/pausa-estrategica",
    type: "website",
    locale: "es_AR",
    images: [{ url: "/images/logo-principal.png", alt: "Johana Ríos - Liderazgo, Coaching, Calidad" }],
  },
  twitter: { card: "summary", title, description },
}

export default function PausaEstrategicaPage() {
  return (
    <>
      <Header />
      <main className={`${fraunces.variable} ${manrope.variable} pausa-theme min-h-screen pt-16 lg:pt-20`}>
        <PausaEstrategicaTool />
      </main>
      <Footer />
    </>
  )
}
