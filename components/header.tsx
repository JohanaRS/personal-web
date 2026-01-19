"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Cómo acompaño", href: "#como-acompano" },
  { label: "Servicios", href: "#servicios" },
  { label: "Talleres & Charlas", href: "#talleres" },
  { label: "Feedback", href: "#feedback" },
  { label: "Contacto", href: "#contacto" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
          <Link href="#inicio" className="flex-shrink-0">
            <Image
              src="/images/image.png"
              alt="Johana Ríos - JR Logo"
              width={48}
              height={48}
              className="h-10 w-10 lg:h-12 lg:w-12"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <a
                href="https://calendly.com/d/cxhn-dzx-p6y/coaching-con-joha"
                target="_blank"
                rel="noopener noreferrer"
              >
                Agendar sesión
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2 text-foreground"
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
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="bg-background/95 backdrop-blur-sm px-4 py-4 space-y-3 border-t border-border">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-2 text-base font-medium text-foreground/80 transition-colors hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4">
            <Button asChild className="w-full bg-primary hover:bg-primary/90">
              <a
                href="https://calendly.com/d/cxhn-dzx-p6y/coaching-con-joha"
                target="_blank"
                rel="noopener noreferrer"
              >
                Agendar sesión
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
