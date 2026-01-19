import { Button } from "@/components/ui/button"
import { Mail, Instagram, Calendar } from "lucide-react"

export function Contact() {
  return (
    <section id="contacto" className="py-20 lg:py-32 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
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

          {/* Contact Options */}
          <div className="mt-12 grid sm:grid-cols-3 gap-6">
            {/* Email */}
            <a
              href="mailto:johanapaolarios@gmail.com"
              className="group bg-background rounded-xl p-6 border border-border transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <p className="font-semibold text-foreground mb-1">Email</p>
              <p className="text-sm text-muted-foreground break-all">
                johanapaolarios@gmail.com
              </p>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/johana.rioss"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-background rounded-xl p-6 border border-border transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Instagram className="w-5 h-5 text-primary" />
              </div>
              <p className="font-semibold text-foreground mb-1">Instagram</p>
              <p className="text-sm text-muted-foreground">@johana.rioss</p>
            </a>

            {/* Calendly */}
            <a
              href="https://calendly.com/d/cxhn-dzx-p6y/coaching-con-joha"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-background rounded-xl p-6 border border-border transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <p className="font-semibold text-foreground mb-1">Agendar</p>
              <p className="text-sm text-muted-foreground">
                Ver disponibilidad
              </p>
            </a>
          </div>

          {/* Main CTA */}
          <div className="mt-12">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-base px-10"
            >
              <a
                href="https://calendly.com/d/cxhn-dzx-p6y/coaching-con-joha"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Agendar sesión exploratoria
              </a>
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              Sin compromiso. Es una primera conversación para conocernos.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
