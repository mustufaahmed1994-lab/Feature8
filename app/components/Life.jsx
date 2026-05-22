'use client'

const timeline = [
  { time: '6:00 PM', title: 'Log On — Async Updates', desc: 'Slack standup kicks off the shift. What you finished last night, what's on deck, what's blocking you. Two minutes. Written. No meeting required.' },
  { time: '6:30 – 10:00 PM', title: 'Prime Work Block', desc: 'US East Coast and UK afternoon overlap. This is the golden window — maximum async bandwidth with international teammates. Deep work. Real outputs.' },
  { time: '10:00 PM', title: 'Dinner and Breathing', desc: "An hour. Whole. We're not going to send a message at 10:15 and expect a reply. The break is protected, not optional." },
  { time: '11:00 PM – 1:30 AM', title: 'International Sync Hours', desc: 'US West Coast morning, Canada overlap. This is where live calls, sprint reviews, design critiques, and cross-timezone standups happen. Calendars are visible to everyone.' },
  { time: '1:30 – 3:00 AM', title: 'Focused Close-Out', desc: 'The city is quiet. The calls are done. This is wrap-up time: PRs merged, tickets updated, async notes left for the day team. One final push before the handoff.' },
  { time: '3:00 AM', title: 'Log Off', desc: "Shift ends. Nobody is sending messages after this. No exceptions. The next shift picks up where you left off." },
]

const tickerItems = ['Ship It', 'Game On', 'Level Up', 'Deep Work', 'Build Together', 'Own It', 'Late Night Launches', 'No BS', 'Stay Hungry', 'Real Ownership', 'Creative Recharge', 'Make It Count', 'International Stage', 'Vibe Matters', 'Career Growth', '6PM to 6AM']

export default function Life() {
  return (
    <div className="relative z-10 border-t border-white/5">
      <div className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-16">
            <div className="section-label">LIFE AT FEATURE8</div>
            <h2 className="section-title text-[clamp(3rem,7vw,7rem)]">Show.<br />Don't Tell.</h2>
            <p className="text-cream/50 mt-6 max-w-xl text-lg leading-relaxed">
              No stock photos. No team outing captions. Real moments from the people who work here. We'll keep adding to this page as we grow.
            </p>
          </div>

          <div className="mb-16">
            <h3 className="font-display font-extrabold text-2xl text-cream mb-6">Moments</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-[4/3] bg-dark-700 border border-white/5 rounded-xl flex items-center justify-center">
                  <span className="text-cream/20 text-xs tracking-[0.2em] uppercase">Coming Soon</span>
                </div>
              ))}
            </div>
            <p className="text-cream/25 text-sm mt-4">
              We don't do staged team shoots. When we have moments worth sharing, they'll be here. Check back.
            </p>
          </div>
        </div>
      </div>

      <div className="ticker-wrap py-4 border-y border-white/5 bg-dark-800/50">
        <div className="ticker-inner">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="px-6 text-xs tracking-[0.2em] uppercase text-cream/30 hover:text-lime-400 transition-colors flex items-center gap-6">
              {item} <span className="text-lime-400">→</span>
            </span>
          ))}
        </div>
      </div>

      <div className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-12">
            <h3 className="font-display font-extrabold text-3xl text-cream">Day in the Life</h3>
            <p className="text-cream/40 text-sm mt-2">What a Tuesday Night Looks Like.</p>
            <p className="text-cream/30 text-sm mt-1">We run 6PM to 6AM to overlap with the US, UK, and Canada. Standard shifts are 9 hours.</p>
          </div>
          <div className="relative">
            <div className="absolute left-[5px] top-0 bottom-0 w-px bg-white/8" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-6 reveal">
                  <div className="timeline-dot mt-1.5" />
                  <div>
                    <div className="text-lime-400 text-xs tracking-[0.15em] uppercase mb-1">{item.time}</div>
                    <h4 className="font-display font-extrabold text-lg text-cream mb-2">{item.title}</h4>
                    <p className="text-cream/50 text-sm leading-relaxed max-w-2xl">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
