'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import ApplyModal from './ApplyModal';

const NAV_LINKS = [
  { label: 'Manifesto', href: '#manifesto' },
  { label: 'Culture', href: '#culture' },
  { label: 'Life', href: '#life' },
  { label: 'Services', href: '#services' },
  { label: 'Careers', href: '#careers' },
  { label: 'Salary Pledge', href: '#salary-pledge' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Scroll spy
      const sections = NAV_LINKS.map(l => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActive(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8"
        style={{
          height: 56,
          background: scrolled ? 'rgba(8,8,8,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
          transition: 'background 0.3s, backdrop-filter 0.3s, border-color 0.3s',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            fontFamily: 'var(--font-jost)',
            fontWeight: 700,
            fontSize: '1.1rem',
            letterSpacing: '-0.02em',
            color: 'white',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            lineHeight: 1,
          }}
          aria-label="Feature8 home"
        >
          Feature<span style={{ color: '#b8f224', fontSize: '0.85em', verticalAlign: 'super', lineHeight: 0 }}>8</span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-0">
          {NAV_LINKS.map(link => {
            const id = link.href.replace('#', '');
            const isActive = active === id;
            return (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                style={{
                  fontFamily: 'var(--font-jost)',
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '0.5rem 0.85rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: isActive ? '#b8f224' : 'rgba(255,255,255,0.55)',
                  transition: 'color 0.2s',
                  position: 'relative',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.9)'; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; }}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    style={{
                      position: 'absolute',
                      bottom: 2,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      background: '#b8f224',
                      display: 'block',
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setModalOpen(true)}
            className="btn-lime hidden sm:inline-flex"
          >
            <span>We&apos;re Hiring</span>
            <ArrowUpRight size={13} />
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.22 }}
          >
            <div className="flex items-center justify-between mb-10">
              <span style={{ fontFamily: 'var(--font-jost)', fontWeight: 700, fontSize: '1.1rem' }}>
                Feature<span style={{ color: '#b8f224', fontSize: '0.85em', verticalAlign: 'super' }}>8</span>
              </span>
              <button onClick={() => setMenuOpen(false)} style={{ color: 'rgba(255,255,255,0.5)', background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-col gap-1 flex-1">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(link.href)}
                  style={{
                    fontFamily: 'var(--font-barlow)',
                    fontWeight: 700,
                    fontSize: '2rem',
                    letterSpacing: '-0.01em',
                    color: 'white',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    padding: '0.5rem 0',
                    lineHeight: 1.1,
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#b8f224'}
                  onMouseLeave={e => e.currentTarget.style.color = 'white'}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
            <div className="mt-8">
              <button
                onClick={() => { setMenuOpen(false); setModalOpen(true); }}
                className="btn-lime w-full justify-center"
                style={{ borderRadius: 12, padding: '0.875rem' }}
              >
                <span>We&apos;re Hiring</span>
                <ArrowUpRight size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ApplyModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
