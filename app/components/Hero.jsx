'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ParticleCanvas from './ParticleCanvas';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
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

  return (
    <section
      className="relative flex flex-col justify-end overflow-visible"
      style={{ minHeight: '100svh', paddingBottom: '5rem' }}
    >
      {/* Particle bg */}
      <div className="absolute inset-0 overflow-hidden">
        <ParticleCanvas />
      </div>

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #080808)' }} />

      {/* Left vertical label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute left-5 top-1/2 hidden lg:flex items-center gap-2"
        style={{
          transform: 'translateY(-50%) rotate(-90deg)',
          transformOrigin: 'center',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-jost)',
          fontSize: '0.58rem',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.22)',
        }}>
          KARACHI, PAKISTAN · EST. 2025
        </span>
      </motion.div>

      <div className="relative z-10 px-6 md:px-14 lg:px-20 max-w-screen-2xl mx-auto w-full">
        <motion.div variants={container} initial="hidden" animate="show">

          {/* Logo lockup */}
          <motion.div variants={item}>
            <div
              style={{
                fontFamily: 'var(--font-jost)',
                fontWeight: 700,
                fontSize: 'clamp(3.8rem, 9vw, 8.5rem)',
                lineHeight: 1.02,
                letterSpacing: '-0.03em',
                color: '#f0ede4',
                marginBottom: '1.5rem',
                display: 'inline-flex',
                alignItems: 'flex-start',
                gap: '0.12em',
                overflow: 'visible',
              }}
            >
              <span>Feature</span>
              <span
                style={{
                  color: '#b8f224',
                  fontSize: '0.44em',
                  fontWeight: 800,
                  lineHeight: 1,
                  marginTop: '0.06em',
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              >
                8
              </span>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={item}
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'clamp(0.95rem, 1.8vw, 1.25rem)',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.01em',
              marginBottom: '3rem',
              maxWidth: 440,
              lineHeight: 1.5,
            }}
          >
            Work Worth Waking Up For.
          </motion.p>

          {/* Divider */}
          <motion.div
            variants={item}
            style={{ width: 400, maxWidth: '100%', height: 1, background: 'rgba(255,255,255,0.1)', marginBottom: '1.75rem' }}
          />

          {/* Stats row */}
          <motion.div variants={item} className="flex flex-wrap gap-8 md:gap-14">
            {STATS.map(stat => (
              <div key={stat.label}>
                <p style={{
                  fontFamily: 'var(--font-jost)',
                  fontSize: '0.58rem',
                  fontWeight: 700,
                  letterSpacing: '0.13em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.28)',
                  marginBottom: '0.4rem',
                }}>
                  {stat.label}
                </p>
                <p style={{
                  fontFamily: 'var(--font-jost)',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  color: 'rgba(255,255,255,0.8)',
                }}>
                  {stat.value}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator — bottom right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="absolute right-8 bottom-0 hidden md:flex items-center gap-3 pb-6"
        >
          <span style={{
            fontFamily: 'var(--font-jost)',
            fontSize: '0.58rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.2)',
          }}>
            SCROLL
          </span>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            style={{ width: 36, height: 1, background: 'rgba(255,255,255,0.15)' }}
          />
        </motion.div>
      </div>

      {/* Mobile scroll line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-4 left-1/2 flex flex-col items-center gap-1 md:hidden"
        style={{ transform: 'translateX(-50%)' }}
      >
        <span style={{
          fontFamily: 'var(--font-jost)',
          fontSize: '0.52rem',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.18)',
        }}>
          SCROLL
        </span>
        <motion.div
          animate={{ scaleY: [0.6, 1, 0.6], opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          style={{ width: 1, height: 28, background: 'linear-gradient(to bottom, rgba(184,242,36,0.6), transparent)', transformOrigin: 'top' }}
        />
      </motion.div>
    </section>
  );
}
