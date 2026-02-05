import Image from "next/image"
import Link from "next/link"
import { Mail, Instagram } from "lucide-react"

const quickLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Cómo acompaño", href: "#como-acompano" },
  { label: "Servicios", href: "#servicios" },
  { label: "Talleres & Charlas", href: "#talleres" },
  { label: "Contacto", href: "#contacto" },
]

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
          {/* Brand */}
          <div>
            <Image
              src="/images/image.png"
              alt="Johana Ríos - JR Logo"
              width={56}
              height={56}
              className="h-12 w-12 mb-4"
            />
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Acompaño procesos de cambio personal, profesional y organizacional 
              desde un enfoque humano e integral.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              Enlaces rápidos
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:johanapaolarios@gmail.com"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  johanapaolarios@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/joharios.coach"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  @joharios.coach
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Johana Ríos. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
