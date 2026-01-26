import { BookOpen } from "lucide-react"

export function Blog() {
  return (
    <section id="blog" className="py-20 lg:py-32 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Blog
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-foreground leading-tight text-balance">
            Reflexiones y aprendizajes
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Comparto ideas sobre liderazgo, desarrollo personal, mejora continua 
            y todo lo que aprendo en el camino.
          </p>
        </div>

        {/* Empty State / Coming Soon */}
        <div className="max-w-md mx-auto text-center">
          <div className="bg-background rounded-xl p-8 border border-border transition-all duration-300 hover:border-primary/30 hover:shadow-lg group cursor-default">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
              <BookOpen className="w-8 h-8 text-primary transition-transform duration-300 group-hover:scale-110" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2 transition-colors duration-300 group-hover:text-primary">
              Proximamente
            </h3>
            <p className="text-sm text-muted-foreground">
              Estoy preparando contenido para compartir contigo. 
              Pronto encontraras articulos y reflexiones aqui.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
