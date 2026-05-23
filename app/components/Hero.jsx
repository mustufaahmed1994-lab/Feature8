'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ParticleCanvas from './ParticleCanvas';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const STATS = [
  { label: 'Industry', value: 'TECH · INFO · MEDIA' },
  { label: 'Base', value: 'KARACHI, PAKISTAN' },
  { label: 'Status', value: 'HIRING NOW' },
];

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handle = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  const parallax = scrollY * 0.15;

  return (
    <section
      className="relative flex flex-col justify-end overflow-hidden"
      style={{ minHeight: '100svh', paddingBottom: '5rem' }}
    >
      {/* Particle bg */}
      <div className="absolute inset-0" style={{ transform: `translateY(${parallax}px)` }}>
        <ParticleCanvas />
      </div>

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #080808)' }} />

      {/* Left vertical label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute left-6 top-1/2 hidden lg:flex items-center gap-2"
        style={{ transform: 'translateY(-50%) rotate(-90deg)', transformOrigin: 'center', whiteSpace: 'nowrap' }}
      >
        <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>
          KARACHI, PAKISTAN · EST. 2025
        </span>
      </motion.div>

      <div className="relative z-10 px-6 md:px-12 lg:px-16 max-w-screen-2xl mx-auto w-full">
        <motion.div variants={container} initial="hidden" animate="show">
          {/* Big headline */}
          <motion.div variants={item} style={{ overflow: 'hidden' }}>
            <h1
              style={{
                fontFamily: 'var(--font-jost)',
                fontWeight: 700,
                fontSize: 'clamp(3.5rem, 10vw, 9rem)',
                lineHeight: 1,
                letterSpacing: '-0.03em',
                color: '#f0ede4',
                marginBottom: '1.25rem',
              }}
            >
              Feature<sup style={{ color: '#b8f224', fontSize: '0.45em', verticalAlign: 'super', lineHeight: 0, fontWeight: 800 }}>8</sup>
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={item}
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'clamp(1rem, 2vw, 1.35rem)',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.55)',
              letterSpacing: '0.01em',
              marginBottom: '3.5rem',
              maxWidth: 480,
            }}
          >
            Work Worth Waking Up For.
          </motion.p>

          {/* Divider */}
          <motion.div variants={item} className="divider mb-7" style={{ maxWidth: 480 }} />

          {/* Stats row */}
          <motion.div variants={item} className="flex flex-wrap gap-8 md:gap-12">
            {STATS.map(stat => (
              <div key={stat.label}>
                <p style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.35rem' }}>
                  {stat.label}
                </p>
                <p style={{ fontFamily: 'var(--font-jost)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.85)' }}>
                  {stat.value}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-0 right-8 hidden md:flex items-center gap-3"
          style={{ paddingBottom: '1.5rem' }}
        >
          <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>
            SCROLL
          </span>
          <div style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.15)' }} />
        </motion.div>
      </div>

      {/* Scroll line - centered */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ delay: 1.8, duration: 1, ease: 'easeOut' }}
        className="absolute bottom-0 left-1/2 flex flex-col items-center gap-1 pb-4 md:hidden"
        style={{ transform: 'translateX(-50%)', transformOrigin: 'bottom' }}
      >
        <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)' }}
        />
      </motion.div>
    </section>
  );
}
