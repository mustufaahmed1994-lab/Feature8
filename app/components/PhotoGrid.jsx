'use client'

const labels = ['SEE ALL MOMENTS', 'THE TEAM', 'DEEP WORK', 'THE SPACE', 'CULTURE MOMENTS', 'KARACHI']

export default function PhotoGrid() {
  return (
    <section className="relative z-10 py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 reveal">
          <h2 className="section-title text-[clamp(2rem,5vw,4rem)]">What It Actually Looks Like.</h2>
          <p className="text-cream/30 text-sm mt-3">No stock photos. Real moments added as we grow.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {labels.map((label) => (
            <div key={label}
              className="relative aspect-[4/3] bg-dark-700 border border-white/5 rounded-xl overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
              <div className="absolute inset-0 flex items-end p-4">
                <span className="text-[9px] tracking-[0.2em] uppercase text-cream/30 group-hover:text-lime-400 transition-colors">
                  {label}
                </span>
              </div>
              <div className="absolute inset-0 border-2 border-lime-400/0 group-hover:border-lime-400/20 rounded-xl transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
