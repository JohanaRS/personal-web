"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

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
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-sm font-medium text-foreground/80 hover:text-primary hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-primary data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent transition-colors duration-300">
                    Sobre mi
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-background border border-border shadow-lg rounded-md">
                    <ul className="grid w-48 gap-1 p-2">
                      {sobreMiItems.map((item) => (
                        <li key={item.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={item.href}
                              className="block select-none rounded-md px-3 py-2 text-sm leading-none no-underline outline-none transition-all duration-300 text-foreground hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary"
                            >
                              {item.label}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

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
