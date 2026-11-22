import Image from "next/image"
import { GrowthOsAccessButton } from "./access-button"

export function GrowthOsClosingCta() {
  return (
    <section aria-labelledby="closing-title" className="py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-secondary/40 p-8 lg:p-12 flex flex-col items-center text-center">
          <Image
            src="/images/logo-isotipo.png"
            alt=""
            width={48}
            height={48}
            className="h-12 w-12 object-contain"
          />
          <h2 id="closing-title" className="mt-6 text-2xl sm:text-3xl font-semibold text-foreground leading-tight text-balance">
            Tus objetivos merecen un lugar donde crecer
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground leading-relaxed text-pretty">
            Growth OS está en versión piloto: la estamos construyendo y mejorando junto a quienes ya la usan.
          </p>
          <div className="mt-8">
            <GrowthOsAccessButton />
          </div>
        </div>
      </div>
    </section>
  )
}
