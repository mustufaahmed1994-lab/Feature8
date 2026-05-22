'use client'

const services = [
  { num:'01', title:'Product Engineering', desc:'Full-stack web and mobile development. High-performance apps, real-time systems, scalable cloud infrastructure — built to go live and stay live.', tags:['React','TypeScript','Node.js','AWS'] },
  { num:'02', title:'Experience Design', desc:'Research, wireframes, interaction design, design systems. Products that feel obvious to use because someone thought hard about every state.', tags:['Figma','Research','Systems'] },
  { num:'03', title:'Growth & BD', desc:'Building pipelines, partnerships, and revenue in US, UK, and Canadian markets. Opening doors with substance, not noise.', tags:['Partnerships','Pipeline','Markets'] },
  { num:'04', title:'Data & Intelligence', desc:"Analytics platforms, business intelligence dashboards, and data pipelines. Helping teams understand what's actually happening in their products.", tags:['Analytics','APIs','BI'] },
  { num:'05', title:'Media & Brand', desc:'Digital content strategy, campaign technology, and brand development for tech products that need to be heard in crowded international markets.', tags:['Content','Campaigns','Brand'] },
]

const markets = [
  { flag:'🇺🇸', country:'United States', cities:'New York · San Francisco · Austin · Chicago', desc:'Our prime overlap window with US East Coast (EST) runs from 6 PM to 11 PM PKT. West Coast gets the 11 PM to 2 AM slot, their morning. Both work.' },
  { flag:'🇬🇧', country:'United Kingdom', cities:'London · Manchester · Edinburgh', desc:'Starting at 6 PM PKT puts us at 1 PM GMT. Their afternoon is our prime time. By the time they wrap up at 6 PM their time, we're four hours deep and moving fast.' },
  { flag:'🇨🇦', country:'Canada', cities:'Toronto · Vancouver · Calgary · Montreal', desc:'Toronto is EST — same as New York. Vancouver is PST, same window as San Francisco. Canada coverage runs simultaneously with the US. No separate scheduling needed.' },
]

const principles = [
  { title:'Ship It Fast', desc:"We launch, learn, and iterate. A shipped product that needs improvement beats a perfect product that exists only in a Figma file. Velocity is a feature." },
  { title:'Stay Connected', desc:'Deep overlap with international teams is not an accident. It's the model. When you're building for US and UK markets, you need to talk to those markets while they're awake.' },
  { title:'Own the Outcome', desc:"We don't build to close tickets. We build to move metrics, ship products, and grow businesses. Every team member is accountable for the outcome, not just the effort." },
]

const stats = [
  { val:'3', label:'International Markets' },
  { val:'9h', label:'Standard Shift' },
  { val:'6–6', label:'Operating Hours' },
  { val:'0→1', label:'Where We Play' },
]

export default function Services() {
  return (
    <div className="relative z-10 py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-24">
        <div className="reveal">
          <div className="section-label">// what we actually build</div>
          <h2 className="section-title text-[clamp(3rem,7vw,7rem)]">We Build Things<br />That Actually Ship.</h2>
          <p className="text-cream/50 mt-6 max-w-xl text-lg leading-relaxed">
            Five disciplines. One team. A global market spanning the US, UK, and Canada. Here's what our teams work on every night.
          </p>
          <div className="flex flex-wrap gap-8 mt-10">
            {stats.map(s => (
              <div key={s.label}>
                <div className="font-display font-extrabold text-4xl text-lime-400">{s.val}</div>
                <div className="text-cream/40 text-xs tracking-[0.15em] uppercase mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-8">
            <h3 className="font-display font-extrabold text-2xl text-cream">Our Work Areas</h3>
            <p className="text-cream/40 text-sm mt-2">Five disciplines. All of them serious.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map(s => (
              <div key={s.num} className="service-card card-dark p-8">
                <div className="service-num font-display font-extrabold text-5xl text-cream/10 mb-4 transition-colors duration-200">{s.num}</div>
                <h4 className="font-display font-extrabold text-xl text-cream mb-3">{s.title}</h4>
                <p className="text-cream/50 text-sm leading-relaxed mb-6">{s.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map(t => (
                    <span key={t} className="text-[9px] tracking-[0.15em] uppercase text-lime-400/60 border border-lime-400/20 px-2 py-1 rounded-full">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-8">
            <h3 className="font-display font-extrabold text-2xl text-cream">International Markets</h3>
            <p className="text-cream/40 text-sm mt-2">Three Markets. One Operating Rhythm.</p>
            <p className="text-cream/30 text-sm mt-1">Our 6PM–6AM shift exists for a reason. When Karachi is working, so is London, New York, Toronto, and San Francisco.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {markets.map(m => (
              <div key={m.country} className="card-dark p-8">
                <div className="text-4xl mb-4">{m.flag}</div>
                <h4 className="font-display font-extrabold text-xl text-cream mb-1">{m.country}</h4>
                <p className="text-lime-400 text-xs tracking-[0.1em] mb-4">{m.cities}</p>
                <p className="text-cream/50 text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-8">
            <h3 className="font-display font-extrabold text-2xl text-cream">How We Work</h3>
            <p className="text-cream/40 text-sm mt-2">Three principles. Not negotiable.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {principles.map(p => (
              <div key={p.title} className="card-dark p-8">
                <div className="text-lime-400 font-display font-extrabold text-sm tracking-widest uppercase mb-3">{p.title}</div>
                <p className="text-cream/55 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <div className="section-label flex justify-center mb-4">Find Your Role</div>
          <h3 className="font-display font-extrabold text-[clamp(2rem,5vw,4rem)] text-cream mb-4">See Where You Fit.</h3>
          <p className="text-cream/50 mb-8">Five work areas. Four open roles right now. The right one probably has your name on it.</p>
          <a href="#careers" className="btn-primary">Browse Open Roles →</a>
        </div>
      </div>
    </div>
  )
}
