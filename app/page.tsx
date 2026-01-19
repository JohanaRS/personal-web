import { Header } from "@/components/header"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Process } from "@/components/sections/process"
import { Experience } from "@/components/sections/experience"
import { Services } from "@/components/sections/services"
import { Workshops } from "@/components/sections/workshops"
import { Feedback } from "@/components/sections/feedback"
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
        <Workshops />
        <Feedback />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
