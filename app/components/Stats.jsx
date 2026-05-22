'use client'
import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: '760K+', label: 'Pakistanis left for work abroad in 2025. A substantial number were skilled IT and tech professionals.', cta: "We're building a place worth staying for." },
  { value: '$4.2B', label: 'Lost annually to brain drain. Not counting the institutional knowledge that walks out the door with every departure.', cta: 'Imagine what that talent could build if it stayed.' },
  { value: '88%', label: 'Drop in Pakistan tech funding between 2022 and 2024. The VC party ended. Most companies panicked.', cta: "We don't run on venture capital fumes. We run on people who show up." },
  { value: '99%', label: 'Of IT firms reported internet disruptions. The infrastructure is unreliable. The talent is not.', cta: 'We know the infrastructure. We built around it anyway.' },
]

function StatCard({ stat, index }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.2 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return (
    <div ref={ref} className={`card-dark p-8 flex flex-col gap-4 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 100}ms` }}>
      <div className="font-display font-extrabold text-5xl text-lime-400">{stat.value}</div>
      <p className="text-cream/50 text-sm leading-relaxed">{stat.label}</p>
      <p className="text-cream text-sm font-semibold mt-auto">{stat.cta}</p>
    </div>
  )
}

export default function Stats() {
  return (
    <section className="relative z-10 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 reveal">
          <div className="section-label">THE STATE OF THE INDUSTRY</div>
          <h2 className="section-title text-[clamp(2.5rem,6vw,5rem)]">Let's Talk<br />About the Room.</h2>
          <p className="text-cream/50 mt-6 max-w-xl text-lg leading-relaxed">
            Everyone knows the problems. We're just the ones who wrote them down and decided to do something about it.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => <StatCard key={i} stat={s} index={i} />)}
        </div>
      </div>
    </section>
  )
}
