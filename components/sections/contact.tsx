"use client"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Mail, Instagram, Calendar, Send } from "lucide-react"

const contactReasons = [
  "Coaching individual",
  "Talleres para equipos",
  "Consulta general",
  "Otro",
]

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Error al enviar el mensaje")
      }

      setIsSubmitted(true)
      setFormData({ name: "", email: "", reason: "", message: "" })
    } catch {
      setError("Hubo un error al enviar el mensaje. Por favor intentá nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contacto" className="py-20 lg:py-32 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          {/* Header */}
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Contacto
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-foreground leading-tight text-balance">
            El primer paso es conversar
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Si algo de lo que leíste resonó con vos, escribime. No hay 
            compromiso, solo una conversación para conocernos y ver si puedo 
            acompañarte en lo que necesitás.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-background rounded-2xl p-8 lg:p-10 border border-border transition-all duration-300 hover:shadow-lg order-2 lg:order-1">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Contactame
            </h3>
            <p className="text-muted-foreground mb-8">
              Contame un poco sobre vos y en qué te gustaría trabajar.
            </p>

            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-in zoom-in-50 duration-300">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  ¡Mensaje enviado!
                </h4>
                <p className="text-muted-foreground">
                  Gracias por escribirme. Te responderé a la brevedad.
                </p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => setIsSubmitted(false)}
                >
                  Enviar otro mensaje
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 hover:border-primary/30"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 hover:border-primary/30"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-reason"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    ¿Por qué me buscás?
                  </label>
                  <select
                    id="contact-reason"
                    required
                    value={formData.reason}
                    onChange={(e) =>
                      setFormData({ ...formData, reason: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 hover:border-primary/30 cursor-pointer"
                  >
                    <option value="">Seleccioná una opción</option>
                    {contactReasons.map((reason) => (
                      <option key={reason} value={reason}>
                        {reason}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    ¿Qué te gustaría trabajar?
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 resize-none hover:border-primary/30"
                    placeholder="Contame un poco sobre tu situación actual y en qué te gustaría que te acompañe..."
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-500 bg-red-50 px-4 py-2 rounded-lg">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? (
                    "Enviando..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Enviar mensaje
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* Contact Options */}
          <div className="space-y-6 order-1 lg:order-2">
            <div className="grid gap-4">
              {/* Email */}
              <a
                href="mailto:johanapaolarios@gmail.com"
                className="group flex items-center gap-4 bg-background rounded-xl p-5 border border-border transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                  <Mail className="w-5 h-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div>
                  <p className="font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">Email</p>
                  <p className="text-sm text-muted-foreground">
                    johanapaolarios@gmail.com
                  </p>
                </div>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/joharios.coach"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 bg-background rounded-xl p-5 border border-border transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                  <Instagram className="w-5 h-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div>
                  <p className="font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">Instagram</p>
                  <p className="text-sm text-muted-foreground">@joharios.coach</p>
                </div>
              </a>

              {/* Calendly */}
              <a
                href="https://calendly.com/johanapaolarios/coaching-con-joha"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 bg-background rounded-xl p-5 border border-border transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                  <Calendar className="w-5 h-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div>
                  <p className="font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">Agendar sesión</p>
                  <p className="text-sm text-muted-foreground">
                    Ver disponibilidad
                  </p>
                </div>
              </a>
            </div>

            {/* Main CTA */}
            <div className="bg-primary/5 rounded-xl p-6 border border-primary/20 text-center">
              <p className="text-foreground font-medium mb-4">
                ¿Preferís una llamada directa?
              </p>
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto"
              >
                <a
                  href="https://calendly.com/johanapaolarios/coaching-con-joha"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Agendar sesión exploratoria
                </a>
              </Button>
              <p className="mt-3 text-xs text-muted-foreground">
                Sin compromiso. Es una primera conversación para conocernos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
