'use client'
import { useState } from 'react'

const salaryData = [
  { category: 'Engineering and Technology', rows: [
    { role: 'Frontend Developer', dept: 'Tech', level: 'Junior (0–2 yrs)', range: '80,000 – 120,000', notes: 'React focus. Mentorship included.' },
    { role: 'Frontend Developer', dept: 'Tech', level: 'Mid (2–5 yrs)', range: '130,000 – 200,000', notes: 'Architecture ownership expected.' },
    { role: 'Frontend Developer', dept: 'Tech', level: 'Senior (5+ yrs)', range: '220,000 – 350,000', notes: 'Currently hiring.', highlight: true },
    { role: 'Backend Developer', dept: 'Tech', level: 'Junior', range: '75,000 – 115,000', notes: 'Node, Python, or Go.' },
    { role: 'Backend Developer', dept: 'Tech', level: 'Mid', range: '125,000 – 195,000', notes: '' },
    { role: 'Backend Developer', dept: 'Tech', level: 'Senior', range: '210,000 – 330,000', notes: '' },
  ]},
  { category: 'Design', rows: [
    { role: 'Product Designer', dept: 'Design', level: 'Junior', range: '70,000 – 105,000', notes: 'Figma, user research, systems.' },
    { role: 'Product Designer', dept: 'Design', level: 'Mid', range: '120,000 – 185,000', notes: '' },
    { role: 'Product Designer', dept: 'Design', level: 'Senior', range: '180,000 – 280,000', notes: 'Currently hiring.', highlight: true },
  ]},
  { category: 'Product', rows: [
    { role: 'Product Manager', dept: 'Product', level: 'Associate PM', range: '90,000 – 140,000', notes: '2–3 years experience.' },
    { role: 'Product Manager', dept: 'Product', level: 'PM', range: '180,000 – 280,000', notes: 'Currently hiring.', highlight: true },
    { role: 'Product Manager', dept: 'Product', level: 'Senior PM', range: '290,000 – 420,000', notes: 'Not currently hiring.' },
  ]},
  { category: 'Sales and Business Development', rows: [
    { role: 'BD Associate', dept: 'Sales & BD', level: 'Junior', range: '60,000 – 90,000 + commission', notes: 'Commission uncapped.' },
    { role: 'BD Manager / Lead', dept: 'Sales & BD', level: 'Mid to Senior', range: '120,000 – 200,000 + commission', notes: 'Currently hiring.', highlight: true },
    { role: 'Acquisition Specialist', dept: 'Sales & BD', level: 'All Levels', range: '80,000 – 100,000 + commission', notes: 'Currently hiring. Commission uncapped.', highlight: true },
    { role: 'Retention Specialist', dept: 'Sales & BD', level: 'All Levels', range: '80,000 – 100,000 + commission', notes: 'Currently hiring. Renewal-based incentives.', highlight: true },
  ]},
  { category: 'Marketing', rows: [
    { role: 'Marketing Specialist', dept: 'Marketing', level: 'Junior', range: '65,000 – 100,000', notes: 'Content, performance, or brand.' },
    { role: 'Marketing Manager', dept: 'Marketing', level: 'Mid to Senior', range: '120,000 – 220,000', notes: 'Not currently hiring.' },
  ]},
  { category: 'Operations', rows: [
    { role: 'Project Manager', dept: 'Operations', level: 'Mid (3–6 yrs)', range: '150,000 – 250,000', notes: 'Currently hiring. Full lifecycle.', highlight: true },
    { role: 'Project Manager', dept: 'Operations', level: 'Senior (6+ yrs)', range: '250,000 – 380,000', notes: 'Multi-project. Strategic planning.' },
  ]},
]

const policies = [
  { title: 'Annual Reviews', desc: 'Every salary is reviewed once per year in January. The benchmark is Pakistan CPI, not internal peer comparisons. If inflation outpaces your raise, that's a failure on our side.' },
  { title: 'Negotiation', desc: "We negotiate with you, not against you. If you're asking above range, we'll tell you honestly whether that's possible rather than string you along. No games." },
  { title: 'Off-Cycle Increases', desc: "If your scope changes significantly mid-year, your salary follows. We don't wait for January to acknowledge you're doing a bigger job." },
  { title: 'Benefits on Top', desc: "Medical, learning budget, and tools are on top of these ranges. We don't fold those into 'total compensation' to make salaries look bigger than they are." },
]

const faqs = [
  { q: "What if I'm earning more than your range?", a: "We'll tell you in the first call. We won't try to talk you down or sell you on 'total compensation.' If the range doesn't work, it doesn't work." },
  { q: 'Are ranges adjusted for experience?', a: "Within the range, yes. The level is set by the role requirements, not by what you were making before." },
  { q: 'Can ranges change?', a: "Yes, upward. We review annually. If market rates move, we move with them. Downward changes don't happen without a public announcement." },
  { q: 'What about promotions?', a: "If you get promoted or your scope changes materially, your salary changes with it. Off-cycle adjustments happen when warranted." },
  { q: 'What if the ranges feel low?', a: "Tell us. Email careers@feature8.com with data and we'll look at it seriously. We review against the market every six months." },
]

export default function SalaryPledge() {
  const [openFaq, setOpenFaq] = useState(null)
  return (
    <div className="relative z-10 py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-20">
        <div className="reveal">
          <div className="section-label">THE FEATURE8 SALARY PLEDGE</div>
          <h2 className="section-title text-[clamp(3rem,7vw,7rem)]">We Publish<br />What We Pay.</h2>
          <p className="text-cream/50 mt-6 max-w-2xl text-lg leading-relaxed">
            Salary opacity is how companies suppress wages and convince people to accept less than they're worth. We're not playing that game. Every range on this page is real, reviewed annually, and tied to the role, not to how well you negotiate.
          </p>
          <p className="text-cream/30 text-sm mt-4">Last updated: May 2025</p>
        </div>

        <div className="overflow-x-auto">
          <div className="mb-6">
            <h3 className="font-display font-extrabold text-2xl text-cream">Salary Ranges · PKR Per Month · Gross</h3>
            <p className="text-cream/40 text-sm mt-2">All Roles. All Levels. Published. Ranges reviewed each January against actual inflation data.</p>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-[10px] tracking-[0.15em] uppercase text-cream/30 pb-3 pr-4">Role</th>
                <th className="text-left text-[10px] tracking-[0.15em] uppercase text-cream/30 pb-3 pr-4">Dept</th>
                <th className="text-left text-[10px] tracking-[0.15em] uppercase text-cream/30 pb-3 pr-4">Level</th>
                <th className="text-left text-[10px] tracking-[0.15em] uppercase text-cream/30 pb-3 pr-4">Monthly Range (PKR)</th>
                <th className="text-left text-[10px] tracking-[0.15em] uppercase text-cream/30 pb-3">Notes</th>
              </tr>
            </thead>
            <tbody>
              {salaryData.map(cat => (
                <>
                  <tr key={cat.category}>
                    <td colSpan={5} className="pt-8 pb-3">
                      <span className="text-[9px] tracking-[0.2em] uppercase text-lime-400/70 font-semibold">{cat.category}</span>
                    </td>
                  </tr>
                  {cat.rows.map((row, i) => (
                    <tr key={i} className={`salary-row ${row.highlight ? 'bg-lime-400/3' : ''}`}>
                      <td className="text-cream text-sm font-medium">{row.role}</td>
                      <td className="text-cream/40 text-xs">{row.dept}</td>
                      <td className="text-cream/60 text-sm">{row.level}</td>
                      <td className="text-cream font-semibold text-sm font-mono">{row.range}</td>
                      <td className={`text-xs ${row.highlight ? 'text-lime-400' : 'text-cream/30'}`}>{row.notes}</td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {policies.map(p => (
            <div key={p.title} className="card-dark p-6">
              <div className="text-lime-400 font-semibold text-xs tracking-widest uppercase mb-3">{p.title}</div>
              <p className="text-cream/50 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="font-display font-extrabold text-2xl text-cream mb-2">Our Philosophy</h3>
            <h4 className="text-cream/40 text-sm mb-6">Why We're Doing This</h4>
            <p className="text-cream/55 text-sm leading-relaxed mb-4">
              Salary transparency makes companies better. It forces consistency. You cannot pay one person at the bottom of the range and another at the top for the same work and pretend there's no bias once the numbers are public.
            </p>
            <p className="text-cream/55 text-sm leading-relaxed mb-4">
              When candidates know the range before they apply, the conversation becomes about the role. Not about game theory. Not about who blinks first.
            </p>
            <p className="text-cream/55 text-sm leading-relaxed">
              We know this is unusual in Karachi. We're fine with that. If this document causes someone to go ask for a raise they deserved, that's a good outcome, even if they never apply to us.
            </p>
          </div>
          <div>
            <h3 className="font-display font-extrabold text-2xl text-cream mb-6">FAQ</h3>
            <div className="space-y-0">
              {faqs.map((faq, i) => (
                <div key={i} className="border-t border-white/8">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-start justify-between py-4 gap-4 text-left group">
                    <span className="text-cream/80 text-sm group-hover:text-cream transition-colors">{faq.q}</span>
                    <span className={`text-lime-400 flex-shrink-0 transition-transform duration-150 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  {openFaq === i && <p className="pb-4 text-cream/50 text-sm leading-relaxed">{faq.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card-dark p-12 rounded-3xl text-center border border-lime-400/10">
          <div className="section-label flex justify-center mb-4">The Pledge</div>
          <p className="text-cream/60 text-lg max-w-2xl mx-auto leading-relaxed mb-6">
            These numbers are real. They are reviewed annually against inflation. They will not be used against you in a negotiation. If we change this policy, we will announce it publicly before it takes effect.
          </p>
          <p className="text-cream/30 text-xs tracking-widest uppercase">Feature8 · Karachi · Updated May 2025</p>
        </div>

        <div className="text-center">
          <div className="section-label flex justify-center mb-4">Ready?</div>
          <h3 className="font-display font-extrabold text-[clamp(2rem,5vw,4rem)] text-cream mb-4">Now You Know What We Pay.</h3>
          <p className="text-cream/50 mb-8">Four roles open. The ranges are on this page. What's left is applying.</p>
          <a href="#careers" className="btn-primary">See Open Roles →</a>
        </div>
      </div>
    </div>
  )
}
