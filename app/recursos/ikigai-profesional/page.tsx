import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { IkigaiTool } from "@/components/ikigai/ikigai-tool"

const title = "Ikigai profesional | Johana Ríos"
const description =
  "Recurso gratuito para explorar tu identidad, propósito y dirección profesional. Respondé preguntas guiadas y descargá tu diagrama de Ikigai personalizado y un reporte completo."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/recursos/ikigai-profesional" },
  openGraph: {
    title,
    description,
    url: "/recursos/ikigai-profesional",
    type: "website",
    locale: "es_AR",
    images: [{ url: "/images/logo-principal.png", alt: "Johana Ríos - Liderazgo, Coaching, Calidad" }],
  },
  twitter: { card: "summary", title, description },
}

export default function IkigaiProfesionalPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 lg:pt-20">
        <IkigaiTool />
      </main>
      <Footer />
    </>
  )
}
