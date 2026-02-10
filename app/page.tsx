import { Header } from "@/components/header"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Process } from "@/components/sections/process"
import { Pricing } from "@/components/sections/pricing"
import { Experience } from "@/components/sections/experience"
import { Services } from "@/components/sections/services"
import { StartingPoint } from "@/components/sections/starting-point"
import { Workshops } from "@/components/sections/workshops"
import { Blog } from "@/components/sections/blog"

import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Process />
        <Experience />
        <Services />
        <Pricing />
        <StartingPoint />
        <Workshops />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
