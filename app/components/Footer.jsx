'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, Linkedin, Instagram, Twitter } from 'lucide-react';

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const NAV = [
  { label: 'Manifesto', id: 'manifesto' },
  { label: 'Culture', id: 'culture' },
  { label: 'Life', id: 'life' },
  { label: 'Services', id: 'services' },
  { label: 'Careers', id: 'careers' },
  { label: 'Salary Pledge', id: 'salary-pledge' },
];

const SOCIALS = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/feature8' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/feature8.pk/' },
  { icon: Twitter, label: 'X (Twitter)', href: 'https://twitter.com/feature8pk' },
];

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <footer
      ref={ref}
      style={{
        background: '#060606',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        paddingTop: '4rem',
        paddingBottom: '2.5rem',
      }}
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 mb-14"
        >
          {/* Brand */}
          <div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{
                fontFamily: 'var(--font-jost)',
                fontWeight: 700,
                fontSize: '1.3rem',
                letterSpacing: '-0.02em',
                color: 'white',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                marginBottom: '1rem',
                display: 'block',
              }}
            >
              Feature<span style={{ color: '#b8f224', fontSize: '0.8em', verticalAlign: 'super', lineHeight: 0 }}>8</span>
            </button>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.83rem', color: 'rgba(255,255,255,0.38)', lineHeight: 1.75, maxWidth: 260 }}>
              A technology, information, and media company. Building work worth waking up for. Karachi, Pakistan.
            </p>
            <div className="flex gap-3 mt-5">
              {SOCIALS.map(s => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'rgba(255,255,255,0.5)',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(184,242,36,0.4)'; e.currentTarget.style.color = '#b8f224'; e.currentTarget.style.background = 'rgba(184,242,36,0.07)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                  >
                    <Icon size={15} strokeWidth={1.75} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p style={{ fontFamily: 'var(--font-jost)', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '1.25rem' }}>
              Navigation
            </p>
            <div className="flex flex-col gap-2">
              {NAV.map(n => (
                <button
                  key={n.id}
                  onClick={() => scrollTo(n.id)}
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.88rem',
                    fontWeight: 400,
                    color: 'rgba(255,255,255,0.45)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    padding: '0.15rem 0',
                    transition: 'color 0.15s',
                    width: 'fit-content',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'white'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                >
                  {n.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontFamily: 'var(--font-jost)', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '1.25rem' }}>
              Get in Touch
            </p>
            <a
              href="mailto:hello@feature8.com"
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.88rem',
                color: 'rgba(255,255,255,0.55)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'color 0.15s',
                marginBottom: '0.5rem',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#b8f224'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
            >
              hello@feature8.com <ArrowUpRight size={13} />
            </a>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.83rem', color: 'rgba(255,255,255,0.3)', lineHeight: 1.6 }}>
              Karachi, Pakistan
            </p>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.2)' }}>
            © {new Date().getFullYear()} Feature8. All rights reserved.
          </p>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.15)' }}>
            Karachi, Pakistan · Est. 2025
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
