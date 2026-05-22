'use client'

const pages = [
  { label: 'Manifesto', href: '#manifesto' },
  { label: 'Culture', href: '#culture' },
  { label: 'Life at Feature8', href: '#life' },
  { label: 'Services', href: '#services' },
  { label: 'Careers', href: '#careers' },
  { label: 'Salary Pledge', href: '#salary-pledge' },
]

const work = [
  { label: 'Open Roles', href: '#careers' },
  { label: 'What We Pay', href: '#salary-pledge' },
  { label: 'careers@feature8.com', href: 'mailto:careers@feature8.com' },
]

const social = [
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61590306629357' },
  { label: 'Instagram', href: 'https://instagram.com/feature8hq' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/feature8hq' },
  { label: 'YouTube', href: 'https://youtube.com/@feature8hq' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative z-10 border-t border-white/8 pt-16 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <a href="#home" className="flex items-baseline mb-4">
              <span className="font-display text-3xl font-extrabold text-cream">Feature</span>
              <span className="font-display text-3xl font-extrabold text-lime-400">⁸</span>
            </a>
            <p className="text-cream/40 text-sm leading-relaxed mb-4">
              Building the place talented people don't want to leave.
            </p>
            <p className="text-cream/25 text-xs">Technology, Information and Media.</p>
            <p className="text-cream/25 text-xs">Karachi, Pakistan.</p>
          </div>

          <div>
            <div className="text-[9px] tracking-[0.2em] uppercase text-cream/30 mb-5">PAGES</div>
            <ul className="space-y-3">
              {pages.map(p => (
                <li key={p.href}>
                  <a href={p.href} className="text-cream/50 text-sm hover:text-lime-400 transition-colors">{p.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[9px] tracking-[0.2em] uppercase text-cream/30 mb-5">WORK HERE</div>
            <ul className="space-y-3">
              {work.map(w => (
                <li key={w.href}>
                  <a href={w.href} className="text-cream/50 text-sm hover:text-lime-400 transition-colors">{w.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[9px] tracking-[0.2em] uppercase text-cream/30 mb-5">FOLLOW US</div>
            <ul className="space-y-3">
              {social.map(s => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer"
                    className="text-cream/50 text-sm hover:text-lime-400 transition-colors flex items-center gap-2">
                    {s.label} <span className="text-lime-400/40 text-xs">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-cream/20 text-xs">© {year} Feature8 · Karachi, Pakistan</p>
          <p className="text-cream/15 text-xs italic">Built in the city we refuse to give up on.</p>
        </div>
      </div>
    </footer>
  )
}
