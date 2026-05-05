"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const faqs = [
  {
    question: "¿El coaching es terapia?",
    answer:
      "No. El coaching no es terapia, no diagnostica y no reemplaza procesos psicológicos, médicos o psiquiátricos. Es un espacio de acompañamiento orientado al presente, al futuro, al desarrollo de recursos internos, claridad y acción.",
  },
  {
    question: "¿Qué es el coaching con PNL?",
    answer:
      "Es un proceso que trabaja sobre la forma en que interpretamos la realidad, nos comunicamos con nosotros mismos y tomamos decisiones. A través de preguntas, herramientas y reflexión, buscamos ampliar la conciencia y generar nuevas posibilidades de acción.",
  },
  {
    question: "¿Cuánto dura un proceso?",
    answer:
      "Depende del objetivo y del momento de cada persona o equipo. Podemos definirlo en el encuentro inicial.",
  },
  {
    question: "¿Las sesiones son online o presenciales?",
    answer:
      "Pueden ser online y/o presenciales según disponibilidad y contexto.",
  },
  {
    question: "¿Para quién es este espacio?",
    answer:
      "Para personas, líderes o equipos que buscan claridad, foco, autoconocimiento, mejores decisiones y formas más sostenibles de avanzar.",
  },
  {
    question: "¿Cómo sé si este proceso es para mí?",
    answer:
      "Podemos tener una primera conversación para entender tu momento, tus objetivos y evaluar si este acompañamiento tiene sentido para vos.",
  },
]

export function FAQ() {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Dudas
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-foreground leading-tight text-balance">
            Preguntas frecuentes
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Respuestas a las consultas más comunes antes de empezar.
          </p>
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border-b border-border/50"
            >
              <AccordionTrigger className="text-left text-base font-medium text-foreground hover:text-primary hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-6">
            ¿Tenés otra pregunta? Escribime sin compromiso.
          </p>
          <Button asChild size="lg" className="gap-2">
            <Link href="/contacto">
              Contactar
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
