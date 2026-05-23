'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, Linkedin, Instagram, Twitter } from 'lucide-react';

const scrollTo = (id) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth' }); };

const NAV = [
  { label: 'Manifesto', id: 'manifesto' },
  { label: 'Culture', id: 'culture' },
  { label: 'Life', id: 'life' },
  { label: 'Careers', id: 'careers' },
  { label: 'Salary Pledge', id: 'salary-pledge' },
  { label: 'Services', id: 'services' },
];

const SOCIALS = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/feature8' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/feature8.pk/' },
  { icon: Twitter, label: 'X / Twitter', href: 'https://twitter.com/feature8pk' },
];

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <footer ref={ref} style={{ background: '#060606', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '5rem', paddingBottom: '2.5rem' }}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">

        {/* Large hero wordmark row */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-10" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{ fontFamily: 'var(--font-jost)', fontWeight: 700, fontSize: 'clamp(3rem, 6vw, 5.5rem)', letterSpacing: '-0.03em', color: 'rgba(255,255,255,0.18)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, lineHeight: 1, display: 'flex', alignItems: 'flex-start', gap: '0.1em', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.18)'}
            >
              <span>Feature</span>
              <span style={{ color: 'rgba(184,242,36,0.55)', fontSize: '0.45em', fontWeight: 800, marginTop: '0.06em', transition: 'color 0.2s' }}>8</span>
            </button>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.95rem', color: 'rgba(255,255,255,0.35)', marginTop: '0.75rem', letterSpacing: '0.01em' }}>Building work worth waking up for.</p>
          </div>
          <div className="flex flex-col gap-3">
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.28)', maxWidth: 300, lineHeight: 1.75 }}>A technology, information, and media company. Karachi, Pakistan.</p>
            <a href="mailto:careers@feature8.com" style={{ fontFamily: 'var(--font-jost)', fontWeight: 700, fontSize: '0.78rem', color: '#b8f224', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', letterSpacing: '0.05em', width: 'fit-content', transition: 'opacity 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.75'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
              careers@feature8.com <ArrowUpRight size={13} />
            </a>
          </div>
        </motion.div>

        {/* Three-col grid */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 mb-12">
          
          {/* Socials */}
          <div>
            <p style={{ fontFamily: 'var(--font-jost)', fontWeight: 700, fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', marginBottom: '1.25rem' }}>Follow</p>
            <div className="flex gap-3">
              {SOCIALS.map(s => {
                const Icon = s.icon;
                return (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.45)', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(184,242,36,0.4)'; e.currentTarget.style.color = '#b8f224'; e.currentTarget.style.background = 'rgba(184,242,36,0.07)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'none'; }}>
                    <Icon size={16} strokeWidth={1.75} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p style={{ fontFamily: 'var(--font-jost)', fontWeight: 700, fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', marginBottom: '1.25rem' }}>Navigate</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {NAV.map(n => (
                <button key={n.id} onClick={() => scrollTo(n.id)}
                  style={{ fontFamily: 'var(--font-inter)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: '0.1rem 0', transition: 'color 0.15s', width: 'fit-content' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'white'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
                  {n.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontFamily: 'var(--font-jost)', fontWeight: 700, fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', marginBottom: '1.25rem' }}>Get in Touch</p>
            <a href="mailto:careers@feature8.com"
              style={{ fontFamily: 'var(--font-inter)', fontSize: '0.88rem', color: 'rgba(255,255,255,0.5)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', transition: 'color 0.15s', marginBottom: '0.6rem' }}
              onMouseEnter={e => e.currentTarget.style.color = '#b8f224'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
              careers@feature8.com <ArrowUpRight size={13} />
            </a>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.22)', lineHeight: 1.6 }}>Karachi, Pakistan</p>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.73rem', color: 'rgba(255,255,255,0.18)' }}>© {new Date().getFullYear()} Feature8. All rights reserved.</p>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.73rem', color: 'rgba(255,255,255,0.14)' }}>Karachi, Pakistan · Est. 2025</p>
        </motion.div>
      </div>
    </footer>
  );
}
