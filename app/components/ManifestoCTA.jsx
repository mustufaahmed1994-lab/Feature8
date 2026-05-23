'use client';
import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ApplyModal from './ApplyModal';

export default function ManifestoCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [modalOpen, setModalOpen] = useState(false);

  const scrollTo = (id) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

  return (
    <>
      <section
        ref={ref}
        style={{ background: '#b8f224', position: 'relative', overflow: 'hidden', padding: '7rem 0' }}
      >
        {/* Animated background wash */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 0.12 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #ceff40, #80c400)', transformOrigin: 'left', pointerEvents: 'none' }}
        />

        <div className="max-w-screen-xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-10"
          >
            <div style={{ maxWidth: 560 }}>
              <p style={{ fontFamily: 'var(--font-jost)', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(8,8,8,0.5)', marginBottom: '1rem' }}>Ready to Work Here?</p>
              <h2 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', lineHeight: 1.05, color: '#080808' }}>
                If the Manifesto Sounds Like You,<br className="hidden md:block" /> Let&apos;s Talk.
              </h2>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: '1rem', color: 'rgba(8,8,8,0.6)', marginTop: '1.25rem', lineHeight: 1.65, maxWidth: 440 }}>
                Join a small team building work worth waking up for. On-site in Karachi, with published pay and zero corporate nonsense.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 flex-shrink-0">
              <button
                onClick={() => setModalOpen(true)}
                style={{ fontFamily: 'var(--font-jost)', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.9rem 1.75rem', borderRadius: 9999, background: '#080808', color: '#b8f224', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#111'; e.currentTarget.style.transform = 'scale(1.03)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#080808'; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                See Open Roles <ArrowUpRight size={14} />
              </button>
              <button
                onClick={() => scrollTo('salary-pledge')}
                style={{ fontFamily: 'var(--font-jost)', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.9rem 1.75rem', borderRadius: 9999, background: 'rgba(8,8,8,0.12)', color: '#080808', border: '2px solid rgba(8,8,8,0.25)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(8,8,8,0.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(8,8,8,0.12)'; }}
              >
                See Salary Pledge
              </button>
            </div>
          </motion.div>
        </div>
      </section>
      <ApplyModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
