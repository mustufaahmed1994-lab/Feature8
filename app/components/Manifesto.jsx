'use client'
import { useState } from 'react'

const items = [
  {
    num: "01", tag: "On Pakistan's Talent",
    pull: "The talent isn't the problem. It never was.",
    paras: [
      "Pakistan produces engineers, designers, strategists, and operators who compete with anyone in the world. IBA, NED, FAST. Thousands of graduates every year who are sharp, hungry, and ready. The raw material exists. It has always existed.",
      "The problem is what happens after. The software house that runs on billing hours to clients in Ohio. The manager who thinks 11pm messages are a sign of dedication. The appraisal cycle that happens once a year, says keep it up, and offers a 5% raise against 25% inflation.",
      "Over 760,000 Pakistanis left for work abroad in 2025. Not because they were disloyal. Because they were rational. You cannot ask someone to be loyal to a system that isn't loyal to them.",
    ],
  },
  {
    num: "02", tag: "On the Software House Model",
    pull: "The body-shop model made money. It just didn't make careers.",
    paras: [
      "The traditional Pakistani software house works like this. You hire junior developers. You bill them to clients at a markup. You keep the spread. The developer learns, gets good, and leaves for somewhere that pays more. You hire another junior developer. Repeat.",
      "This is not a talent problem. This is a business model problem. When the incentive is billable hours, not product quality, everything downstream suffers. The work is shallow. The growth is stunted. The turnover is constant.",
      "We are not a software house. We build our own products. Our incentives are aligned with quality and output, not with keeping someone billable.",
    ],
  },
  {
    num: "03", tag: "On Transparency",
    pull: "Opacity is a management tool. We are done with it.",
    paras: [
      "Salary opacity is how you suppress wages and gaslight people into accepting less than they are worth. Our salary ranges are on the website. Go look.",
      "That means writing down career paths. Not as a document that lives on a shared drive nobody reads. As a real conversation, tracked, reviewed, and updated. If you are not growing here, that is partly on you and partly on us. We take our part seriously.",
    ],
  },
  {
    num: "04", tag: "On Karachi",
    pull: "We're based in Karachi. Not in spite of it. Because of it.",
    paras: [
      "Karachi has solved problems that no business school curriculum covers. Infrastructure failures, grid collapses, internet shutdowns, economic whiplash. The people who built careers here did it through conditions that would have levelled most organisations elsewhere.",
      "That resilience is not a consolation prize. It is a competitive advantage. Feature8 is a Karachi company because the best version of this company could only come from here.",
    ],
  },
  {
    num: "05", tag: "The Commitment",
    pull: "Here is what we commit to. In writing. On the internet.",
    paras: [
      "We will pay you fairly, review salaries annually against inflation, and never defend an offer with that is market rate when we know it isn't. We will tell you exactly what growth looks like before you join, not after you ask. We will give you real work that ships, not busywork that fills a timesheet.",
      "And if we fail to do any of this, we expect you to call it out. That is not just permitted here. It is required. A company that cannot handle honest feedback from its own people has no business asking for trust from anyone.",
    ],
  },
]

export default function Manifesto() {
  const [open, setOpen] = useState(null)
  return (
    <div className="relative z-10 py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 reveal">
          <div className="section-label">THE FEATURE8 MANIFESTO</div>
          <h2 className="section-title text-[clamp(3rem,8vw,8rem)]">This Is What<br />We Believe.</h2>
          <p className="text-cream/50 mt-6 max-w-xl text-lg leading-relaxed">
            Every decision we make comes from this document. If something on this page makes you uncomfortable, you&apos;re probably not our person. That&apos;s fine. We&apos;d rather you know now.
          </p>
        </div>
        <div className="space-y-0">
          {items.map((item, i) => (
            <div key={i} className="mf-section">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-start justify-between py-8 gap-6 text-left group">
                <div className="flex items-start gap-6">
                  <span className="font-display font-extrabold text-lg text-lime-400 w-8 flex-shrink-0">{item.num}</span>
                  <div>
                    <div className="font-display font-extrabold text-[clamp(1.5rem,3vw,2.5rem)] text-cream group-hover:text-lime-400 transition-colors leading-tight">
                      {item.tag}
                    </div>
                    <p className="text-cream/40 text-lg mt-2 font-sans italic">{item.pull}</p>
                  </div>
                </div>
                <span className={`text-lime-400 text-2xl flex-shrink-0 mt-1 transition-transform duration-200 ${open === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              {open === i && (
                <div className="pb-8 pl-14 space-y-4">
                  {item.paras.map((p, j) => (
                    <p key={j} className="text-cream/60 text-base leading-relaxed max-w-3xl">{p}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
