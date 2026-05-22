'use client'

const values = [
  { num:'01', title:'Ship It', desc:'The best version that never launched lost to the decent version that did. Done beats perfect. Shipped beats done.' },
  { num:'02', title:'No BS', desc:'Say what you mean. Hear what you don't want to. Own what went wrong. We don't do diplomatic vagueness.' },
  { num:'03', title:'Level Up', desc:"We'll invest in you. We need you to not waste it. Curiosity isn't a personality trait here. It's a job requirement." },
  { num:'04', title:'Own It', desc:"If something matters, it's yours. Nobody's holding a permission slip. Accountability builds trust. Dodging it destroys it." },
  { num:'05', title:'Stay Honest', desc:'With clients. With the team. With yourself. When things go wrong — and they will — honesty is the only thing that moves you forward.' },
  { num:'06', title:'Think Global', desc:'We build for the US, UK, and Canada. The standard is international. The mindset has to match.' },
  { num:'07', title:'Build Together', desc:'Solo brilliance has a ceiling. Collaborative brilliance doesn't. We hire people who make the people around them better.' },
  { num:'08', title:'Make It Count', desc:"Hours are not the metric. Impact is. We're not here to look busy. We're here to move something." },
]

const pillars = [
  { num:'01', title:'Radical Clarity', desc:'People know what is expected of them. Feedback is specific, timely, and kind. Not vague. Not delayed. Not saved for the annual review.' },
  { num:'02', title:'Rooms Worth Being In', desc:'Your career is shaped by the conversations you're part of. Title doesn't buy access here. If you have something worth saying, you're in the room.' },
  { num:'03', title:'Speed Without Panic', desc:'We move fast and we know where we're going. Fast doesn't mean frantic. Urgency and anxiety are different things. We name it when it shows up.' },
  { num:'04', title:'Growth That's Measurable', desc:'Not a promise in an offer letter. An actual path with actual milestones. We invest in skills. We promote from within.' },
]

const perks = [
  { title:'The Tools', desc:'Real project management software. Not Excel. Not WhatsApp groups with 47 people.' },
  { title:'Learning Budget', desc:'A real budget for courses, certifications, and conferences. Numbers on a page you can actually spend.' },
  { title:'Health Coverage', desc:'Medical coverage for you and your immediate family. Because showing up and being well are related.' },
  { title:'Flexible Hours', desc:'Core hours exist. Outside of them, you manage your time. We track output, not attendance.' },
  { title:'Honest Management', desc:"Your manager's job is to remove blockers, not create them. HR will actually do something if that's not happening." },
]

export default function Culture() {
  return (
    <div className="relative z-10 py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-24">
        <div className="reveal">
          <div className="section-label">CULTURE AT FEATURE8</div>
          <h2 className="section-title text-[clamp(3rem,7vw,7rem)]">Eight Things.<br />We Mean Them.</h2>
          <p className="text-cream/50 mt-6 max-w-xl text-lg leading-relaxed">
            Not printed on a wall. Not in an onboarding deck. These are the things we hire for, promote for, and part ways over.
          </p>
        </div>

        <div>
          <div className="mb-8">
            <h3 className="font-display font-extrabold text-3xl text-cream">The Feature8 Code</h3>
            <p className="text-cream/40 text-sm mt-2">Eight values. Zero exceptions.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map(v => (
              <div key={v.num} className="value-card card-dark p-6 group cursor-default transition-all duration-200">
                <div className="font-display font-extrabold text-4xl text-cream/15 mb-4 group-hover:text-lime-400 transition-colors">{v.num}</div>
                <div className="font-display font-extrabold text-lg text-cream mb-3">{v.title}</div>
                <p className="text-cream/45 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-8">
            <h3 className="font-display font-extrabold text-3xl text-cream">Culture Pillars</h3>
            <p className="text-cream/40 text-sm mt-2">What it's actually like here.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pillars.map(p => (
              <div key={p.num} className="pillar-card card-dark p-8 border border-white/5 rounded-2xl transition-colors duration-200">
                <div className="flex items-start gap-4">
                  <span className="text-lime-400 font-display font-extrabold text-xl">{p.num}</span>
                  <div>
                    <h4 className="font-display font-extrabold text-xl text-cream mb-3">{p.title}</h4>
                    <p className="text-cream/50 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-8">
            <h3 className="font-display font-extrabold text-3xl text-cream">What We Actually Offer</h3>
            <p className="text-cream/40 text-sm mt-2">Real perks. No ping-pong table.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {perks.map(p => (
              <div key={p.title} className="card-dark p-6">
                <div className="text-lime-400 font-display font-extrabold text-sm tracking-widest uppercase mb-3">{p.title}</div>
                <p className="text-cream/50 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-cream/25 text-sm mt-6 max-w-2xl">
            What we don't have yet: an on-site gym, equity schemes, or a ping-pong table. We're working on the list. When we add something, we'll say so. When we can't, we'll say that too.
          </p>
        </div>

        <div className="bg-dark-800 border border-white/5 rounded-3xl p-12 md:p-16 text-center">
          <div className="section-label mb-6 justify-center flex">// culture in three lines</div>
          <h2 className="font-display font-extrabold text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-cream mb-4">
            No Ping-Pong Table.<br />
            <span className="text-lime-400">Just Good Work.</span>
          </h2>
          <p className="text-cream/50 text-lg mt-4">Finally, a Monday you don't hate.</p>
          <a href="#careers" className="btn-primary mt-8 inline-flex">Come work here →</a>
        </div>
      </div>
    </div>
  )
}
