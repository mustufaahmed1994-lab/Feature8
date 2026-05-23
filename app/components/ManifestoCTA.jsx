'use client';
import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ApplyModal from './ApplyModal';

export default function ManifestoCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section
        ref={ref}
        className="section-pad"
        style={{ background: '#b8f224' }}
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-8"
          >
            <div>
              <p style={{ fontFamily: 'var(--font-jost)', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(8,8,8,0.5)', marginBottom: '0.75rem' }}>
                Ready to Work Here?
              </p>
              <h2 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', lineHeight: 1.05, color: '#080808', maxWidth: 560 }}>
                If the Manifesto Sounds Like You,<br className="hidden md:block" /> Let’s Talk.
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setModalOpen(true)}
                style={{
                  fontFamily: 'var(--font-jost)',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '0.875rem 1.5rem',
                  borderRadius: 9999,
                  background: '#080808',
                  color: '#b8f224',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#111'; e.currentTarget.style.transform = 'scale(1.03)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#080808'; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                See Open Roles <ArrowUpRight size={14} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <ApplyModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
