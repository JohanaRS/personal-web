"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, Calendar } from "lucide-react"

const serviceItems = [
  { label: "Coaching personal con PNL", href: "/servicios/coaching-personal" },
  { label: "Coaching ejecutivo y liderazgo", href: "/servicios/coaching-ejecutivo" },
  { label: "Consultoría organizacional", href: "/servicios/consultoria-organizacional" },
  { label: "Talleres y charlas", href: "/servicios/talleres-charlas" },
  { label: "Formación y mentoring QA", href: "/servicios/formacion-qa" },
]

const resourceItems = [
  { label: "Rueda de la Vida", href: "/recursos/rueda-de-la-vida" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false)
  const servicesRef = useRef<HTMLDivElement>(null)
  const resourcesRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesOpen(false)
      }
      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) {
        setResourcesOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
    setMobileServicesOpen(false)
    setMobileResourcesOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 transition-opacity duration-300 hover:opacity-85">
            {/* Logo principal para desktop */}
            <Image
              src="/images/logo-principal.png"
              alt="Johana Ríos - Liderazgo, Coaching, Calidad"
              width={160}
              height={80}
              className="hidden lg:block h-14 w-auto object-contain"
              priority
            />
            {/* Isotipo para tablet y mobile */}
            <Image
              src="/images/logo-isotipo.png"
              alt="Johana Ríos"
              width={44}
              height={44}
              className="lg:hidden h-10 w-10 object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:gap-1">
            <Link
              href="/"
              className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-md group ${
                isActive("/") && pathname === "/" ? "text-primary" : "text-foreground/80 hover:text-primary"
              }`}
            >
              Inicio
              <span className={`absolute bottom-0 left-1/2 h-0.5 bg-primary transition-all duration-300 ${
                isActive("/") && pathname === "/" ? "w-3/4 left-[12.5%]" : "w-0 group-hover:w-3/4 group-hover:left-[12.5%]"
              }`} />
            </Link>

            <Link
              href="/sobre-mi"
              className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-md group ${
                isActive("/sobre-mi") ? "text-primary" : "text-foreground/80 hover:text-primary"
              }`}
            >
              Sobre mí
              <span className={`absolute bottom-0 left-1/2 h-0.5 bg-primary transition-all duration-300 ${
                isActive("/sobre-mi") ? "w-3/4 left-[12.5%]" : "w-0 group-hover:w-3/4 group-hover:left-[12.5%]"
              }`} />
            </Link>
            
            {/* Services dropdown */}
            <div 
              ref={servicesRef}
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                onClick={() => setServicesOpen(!servicesOpen)}
                className={`inline-flex items-center gap-1 px-4 py-2 text-sm font-medium transition-all duration-300 rounded-md ${
                  isActive("/servicios") ? "text-primary" : "text-foreground/80 hover:text-primary"
                }`}
              >
                Servicios
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-background border border-border rounded-xl shadow-lg py-2 z-50">
                  <Link
                    href="/servicios"
                    className="block px-4 py-2.5 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-200 border-b border-border mb-1"
                    onClick={() => setServicesOpen(false)}
                  >
                    Ver todos los servicios
                  </Link>
                  {serviceItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block px-4 py-2.5 text-sm transition-colors duration-200 ${
                        isActive(item.href) 
                          ? "text-primary bg-primary/5" 
                          : "text-foreground/80 hover:bg-primary/10 hover:text-primary"
                      }`}
                      onClick={() => setServicesOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Resources dropdown */}
            <div 
              ref={resourcesRef}
              className="relative"
              onMouseEnter={() => setResourcesOpen(true)}
              onMouseLeave={() => setResourcesOpen(false)}
            >
              <button
                type="button"
                onClick={() => setResourcesOpen(!resourcesOpen)}
                className={`inline-flex items-center gap-1 px-4 py-2 text-sm font-medium transition-all duration-300 rounded-md ${
                  isActive("/recursos") ? "text-primary" : "text-foreground/80 hover:text-primary"
                }`}
              >
                Recursos
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${resourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {resourcesOpen && (
                <div className="absolute top-full left-0 mt-1 w-52 bg-background border border-border rounded-xl shadow-lg py-2 z-50">
                  {resourceItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block px-4 py-2.5 text-sm transition-colors duration-200 ${
                        isActive(item.href) 
                          ? "text-primary bg-primary/5" 
                          : "text-foreground/80 hover:bg-primary/10 hover:text-primary"
                      }`}
                      onClick={() => setResourcesOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/contacto"
              className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-md group ${
                isActive("/contacto") ? "text-primary" : "text-foreground/80 hover:text-primary"
              }`}
            >
              Contacto
              <span className={`absolute bottom-0 left-1/2 h-0.5 bg-primary transition-all duration-300 ${
                isActive("/contacto") ? "w-3/4 left-[12.5%]" : "w-0 group-hover:w-3/4 group-hover:left-[12.5%]"
              }`} />
            </Link>
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <Button asChild size="sm" className="gap-2">
              <a
                href="https://calendly.com/johanapaolarios/coaching-con-joha"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Calendar className="h-4 w-4" />
                Agendar conversación
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2 text-foreground transition-all duration-300 hover:text-primary hover:bg-primary/10 rounded-md"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[80vh] overflow-y-auto" : "max-h-0"
        }`}
      >
        <div className="bg-background/95 backdrop-blur-sm px-4 py-4 space-y-1 border-t border-border">
          <Link
            href="/"
            className={`block py-3 px-4 text-base font-medium rounded-md transition-all duration-300 ${
              pathname === "/" 
                ? "text-primary bg-primary/10" 
                : "text-foreground/80 hover:text-primary hover:bg-primary/10"
            }`}
          >
            Inicio
          </Link>

          <Link
            href="/sobre-mi"
            className={`block py-3 px-4 text-base font-medium rounded-md transition-all duration-300 ${
              isActive("/sobre-mi")
                ? "text-primary bg-primary/10" 
                : "text-foreground/80 hover:text-primary hover:bg-primary/10"
            }`}
          >
            Sobre mí
          </Link>

          {/* Mobile Services Accordion */}
          <div>
            <button
              type="button"
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className={`w-full flex items-center justify-between py-3 px-4 text-base font-medium rounded-md transition-all duration-300 ${
                isActive("/servicios")
                  ? "text-primary bg-primary/10" 
                  : "text-foreground/80 hover:text-primary hover:bg-primary/10"
              }`}
            >
              Servicios
              <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`overflow-hidden transition-all duration-300 ${mobileServicesOpen ? 'max-h-96' : 'max-h-0'}`}>
              <div className="pl-4 py-2 space-y-1">
                <Link
                  href="/servicios"
                  className="block py-2 px-4 text-sm font-medium text-primary border-l-2 border-primary"
                >
                  Ver todos
                </Link>
                {serviceItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block py-2 px-4 text-sm rounded-md transition-colors ${
                      isActive(item.href)
                        ? "text-primary bg-primary/5"
                        : "text-foreground/70 hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Resources Accordion */}
          <div>
            <button
              type="button"
              onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
              className={`w-full flex items-center justify-between py-3 px-4 text-base font-medium rounded-md transition-all duration-300 ${
                isActive("/recursos")
                  ? "text-primary bg-primary/10" 
                  : "text-foreground/80 hover:text-primary hover:bg-primary/10"
              }`}
            >
              Recursos
              <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${mobileResourcesOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`overflow-hidden transition-all duration-300 ${mobileResourcesOpen ? 'max-h-48' : 'max-h-0'}`}>
              <div className="pl-4 py-2 space-y-1">
                {resourceItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block py-2 px-4 text-sm rounded-md transition-colors ${
                      isActive(item.href)
                        ? "text-primary bg-primary/5"
                        : "text-foreground/70 hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/contacto"
            className={`block py-3 px-4 text-base font-medium rounded-md transition-all duration-300 ${
              isActive("/contacto")
                ? "text-primary bg-primary/10" 
                : "text-foreground/80 hover:text-primary hover:bg-primary/10"
            }`}
          >
            Contacto
          </Link>

          <div className="pt-4">
            <Button asChild className="w-full gap-2">
              <a
                href="https://calendly.com/johanapaolarios/coaching-con-joha"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Calendar className="h-4 w-4" />
                Agendar conversación
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
