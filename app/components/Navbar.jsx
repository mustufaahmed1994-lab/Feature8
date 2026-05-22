'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Manifesto', href: '#manifesto' },
  { label: 'Culture', href: '#culture' },
  { label: 'Life', href: '#life' },
  { label: 'Services', href: '#services' },
  { label: 'Careers', href: '#careers' },
  { label: 'Salary Pledge', href: '#salary-pledge' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = ['home','manifesto','culture','life','services','careers','salary-pledge']
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.3 }
    )
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-dark-900/95 backdrop-blur-md border-b border-white/5' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#home" className="flex items-baseline group">
            <span className="font-display text-xl font-extrabold text-cream group-hover:text-lime-400 transition-colors">Feature</span>
            <span className="font-display text-xl font-extrabold text-lime-400">⁸</span>
          </a>
          <div className="hidden lg:flex items-center gap-8">
            {links.map(l => (
              <a key={l.href} href={l.href}
                className={`nav-link ${active === l.href.slice(1) ? 'text-cream' : ''}`}>
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <a href="#careers" className="btn-primary text-xs py-2 px-5 hidden sm:inline-flex">
              We’re Hiring ↗
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-8 h-8 flex flex-col justify-center gap-1.5" aria-label="Menu">
              <span className={`block h-px bg-cream transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
              <span className={`block h-px bg-cream transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-px bg-cream transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </motion.nav>
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-dark-900/98 backdrop-blur-xl flex flex-col pt-20 px-8">
            <div className="text-xs tracking-[0.2em] uppercase text-lime-400 mb-8">
              KARACHI, PAKISTAN · TECHNOLOGY AND MEDIA · 2025
            </div>
            {links.map((l, i) => (
              <motion.a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="font-display text-4xl font-extrabold text-cream hover:text-lime-400 transition-colors py-3 border-b border-white/5">
                {l.label}
              </motion.a>
            ))}
            <a href="#careers" onClick={() => setMenuOpen(false)} className="btn-primary mt-8 self-start">
              We’re Hiring ↗
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
