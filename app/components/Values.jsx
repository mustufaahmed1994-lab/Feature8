'use client'

const values = [
  { num: '01', title: 'Real Ownership', body: "Your name is on it. Your fingerprints are in it. The work you do here ships into the world. Not into a client's codebase you will never see again. You build things. You know it. So does everyone else." },
  { num: '02', title: 'Fair Compensation', body: "We publish our salary ranges. We review against inflation, not 'market surveys.' We negotiate with you, not against you. There's a whole page about this. It's called the Salary Pledge. Go read it." },
  { num: '03', title: 'Actual Growth', body: 'A career path that is written down, tracked, and followed. Not a vague conversation that happens once every 18 months. A measurable path. Starting day one.' },
]

export default function Values() {
  return (
    <section className="relative z-10 py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 reveal">
          <div className="section-label">FEATURE8'S RESPONSE</div>
          <h2 className="section-title text-[clamp(2rem,5vw,4.5rem)]">
            We decided the only way<br />to fix it was to build<br />something better.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v) => (
            <div key={v.num} className="value-card card-dark p-8 group cursor-default transition-all duration-200">
              <div className="font-display font-extrabold text-6xl text-cream/20 mb-6 group-hover:text-lime-400 transition-colors duration-200">
                {v.num}
              </div>
              <h3 className="font-display font-extrabold text-2xl text-cream mb-4">{v.title}</h3>
              <p className="text-cream/50 text-sm leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
