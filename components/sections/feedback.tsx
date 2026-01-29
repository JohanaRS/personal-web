"use client"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "El proceso con Johana me ayudo a encontrar claridad en un momento de mucha confusion. Su forma de escuchar y hacer preguntas me permitio ver opciones que antes no veia.",
    author: "Maria L.",
    role: "Lider de equipo de tecnologia",
    placeholder: true,
  },
  {
    quote:
      "Joha tiene esa capacidad unica de integrar lo humano con lo tecnico. Los talleres que facilito para nuestro equipo generaron cambios reales en como nos comunicamos.",
    author: "Carlos R.",
    role: "Director de operaciones",
    placeholder: true,
  },
  {
    quote:
      "Despues de anos trabajando sin parar, el coaching me ayudo a entender que el bienestar no es un lujo sino una necesidad. Hoy lidero mejor porque me cuido mejor.",
    author: "Ana P.",
    role: "Gerente de proyectos",
    placeholder: true,
  },
]

export function Feedback() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    authorize: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: "", email: "", message: "", authorize: false })
  }

  return (
    <section id="feedback" className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Feedback
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-foreground leading-tight text-balance">
            Lo que dicen quienes confiaron en el proceso
          </h2>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-card rounded-xl p-6 lg:p-8 border border-border transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 cursor-default group"
            >
              {testimonial.placeholder && (
                <span className="absolute top-4 right-4 text-xs text-muted-foreground bg-muted px-2 py-1 rounded transition-colors duration-300 group-hover:bg-primary/10 group-hover:text-primary">
                  Ejemplo
                </span>
              )}
              <Quote className="w-8 h-8 text-primary/30 mb-4 transition-colors duration-300 group-hover:text-primary/50" />
              <p className="text-foreground/90 leading-relaxed mb-6">
                {testimonial.quote}
              </p>
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                  {testimonial.author}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Feedback Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-2xl p-8 lg:p-10 border border-border transition-all duration-300 hover:shadow-lg">
            <h3 className="text-xl font-semibold text-foreground mb-2 text-center">
              Trabajamos juntos?
            </h3>
            <p className="text-muted-foreground text-center mb-8">
              Me encantaria conocer tu experiencia. Tu feedback ayuda a mejorar 
              y a que otros puedan decidir con confianza.
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
                  Gracias por tu feedback!
                </h4>
                <p className="text-muted-foreground">
                  Tu mensaje fue enviado correctamente.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="name"
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
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
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
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Tu experiencia
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 resize-none hover:border-primary/30"
                    placeholder="Contame como fue tu experiencia..."
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="authorize"
                    checked={formData.authorize}
                    onChange={(e) =>
                      setFormData({ ...formData, authorize: e.target.checked })
                    }
                    className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary/50 transition-colors duration-300 cursor-pointer"
                  />
                  <label
                    htmlFor="authorize"
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    Autorizo a publicar este comentario de forma anonima o con mi 
                    nombre en el sitio web.
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? "Enviando..." : "Enviar feedback"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
