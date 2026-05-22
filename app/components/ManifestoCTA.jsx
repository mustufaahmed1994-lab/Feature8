'use client'

export default function ManifestoCTA() {
  return (
    <section className="relative z-10 my-8 mx-4 md:mx-6 rounded-3xl overflow-hidden">
      <div className="bg-lime-400 px-8 md:px-16 py-20 md:py-28">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="text-[10px] tracking-[0.25em] uppercase text-dark-900/50 mb-4">READ THE MANIFESTO</div>
            <h2 className="font-display font-extrabold text-[clamp(2rem,6vw,5rem)] leading-none tracking-tight text-dark-900">
              We Wrote Down<br />Everything<br />We Believe.
            </h2>
            <p className="mt-6 text-dark-900/70 text-lg max-w-lg leading-relaxed">
              And then we built a company around it. Every page on this site comes from that document. Worth reading before you apply.
            </p>
          </div>
          <a href="#manifesto"
            className="inline-flex items-center gap-2 bg-dark-900 text-cream font-sans font-semibold text-sm tracking-widest uppercase px-8 py-4 rounded-full hover:bg-dark-700 transition-colors self-start md:self-center flex-shrink-0">
            READ THE MANIFESTO ↗
          </a>
        </div>
      </div>
    </section>
  )
}
