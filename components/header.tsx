"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"

const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
]

const sobreMiItems = [
  { label: "Sobre mi", href: "#sobre-mi" },
  { label: "Como acompano", href: "#como-acompano" },
  { label: "Empeza por aca", href: "#empeza-por-aca" },
  { label: "Blog", href: "#blog" },
  { label: "Recursos", href: "#recursos" },
  { label: "Feedback", href: "#feedback" },
]

const mobileNavItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Sobre mi", href: "#sobre-mi" },
  { label: "Como acompano", href: "#como-acompano" },
  { label: "Empeza por aca", href: "#empeza-por-aca" },
  { label: "Blog", href: "#blog" },
  { label: "Talleres & Charlas", href: "#talleres" },
  { label: "Feedback", href: "#feedback" },
  { label: "Contacto", href: "#contacto" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [sobreMiOpen, setSobreMiOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSobreMiOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
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
          <Link href="#inicio" className="flex-shrink-0 transition-transform duration-300 hover:scale-105">
            <Image
              src="/images/image.png"
              alt="Johana Rios - JR Logo"
              width={48}
              height={48}
              className="h-10 w-10 lg:h-12 lg:w-12"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-foreground/80 transition-all duration-300 hover:text-primary rounded-md group"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-3/4 group-hover:left-[12.5%]" />
              </Link>
            ))}
            
            {/* Sobre mi dropdown */}
            <div 
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setSobreMiOpen(true)}
              onMouseLeave={() => setSobreMiOpen(false)}
            >
              <button
                type="button"
                onClick={() => setSobreMiOpen(!sobreMiOpen)}
                className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 transition-all duration-300 hover:text-primary rounded-md"
              >
                Sobre mi
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${sobreMiOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {sobreMiOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-background border border-border rounded-md shadow-lg py-2 z-50">
                  {sobreMiItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                      onClick={() => setSobreMiOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="#talleres"
              className="relative px-4 py-2 text-sm font-medium text-foreground/80 transition-all duration-300 hover:text-primary rounded-md group"
            >
              Talleres & Charlas
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-3/4 group-hover:left-[12.5%]" />
            </Link>
            <Link
              href="#contacto"
              className="relative px-4 py-2 text-sm font-medium text-foreground/80 transition-all duration-300 hover:text-primary rounded-md group"
            >
              Contacto
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-3/4 group-hover:left-[12.5%]" />
            </Link>
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <Button asChild>
              <a
                href="https://calendly.com/d/cxhn-dzx-p6y/coaching-con-joha"
                target="_blank"
                rel="noopener noreferrer"
              >
                Agendar sesion
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2 text-foreground transition-all duration-300 hover:text-primary hover:bg-primary/10 rounded-md"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
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
        <div className="bg-background/95 backdrop-blur-sm px-4 py-4 space-y-1 border-t border-border">
          {mobileNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-3 px-4 text-base font-medium text-foreground/80 transition-all duration-300 hover:text-primary hover:bg-primary/10 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4">
            <Button asChild className="w-full">
              <a
                href="https://calendly.com/d/cxhn-dzx-p6y/coaching-con-joha"
                target="_blank"
                rel="noopener noreferrer"
              >
                Agendar sesion
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
