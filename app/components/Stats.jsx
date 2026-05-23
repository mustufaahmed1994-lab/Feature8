'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { TrendingUp, Users, Globe, Zap } from 'lucide-react';

const STATS = [
  {
    icon: TrendingUp,
    number: '760K+',
    label: 'Pakistanis left for work abroad in 2025',
    sub: 'A substantial number were skilled IT and tech professionals.',
  },
  {
    icon: Users,
    number: '3 of 4',
    label: 'Talented professionals underpaid locally',
    sub: 'Market rates are broken. We’re fixing our corner of it.',
  },
  {
    icon: Globe,
    number: '100%',
    label: 'Salary transparency at Feature8',
    sub: 'Every role has a published range. No surprises.',
  },
  {
    icon: Zap,
    number: 'Day 1',
    label: 'Ownership mindset, not just employment',
    sub: 'We build with you, not around you.',
  },
];

function StatCard({ stat, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="card-dark p-6 flex flex-col gap-4"
    >
      <div className="flex items-center justify-between">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: 'rgba(184,242,36,0.1)', border: '1px solid rgba(184,242,36,0.2)' }}>
          <Icon size={17} color="#b8f224" strokeWidth={1.75} />
        </div>
        <span style={{ fontFamily: 'var(--font-jost)', fontWeight: 800, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#b8f224', lineHeight: 1, letterSpacing: '-0.02em' }}>
          {stat.number}
        </span>
      </div>
      <div>
        <p style={{ fontFamily: 'var(--font-jost)', fontWeight: 600, fontSize: '0.95rem', color: 'white', lineHeight: 1.3, marginBottom: '0.5rem' }}>
          {stat.label}
        </p>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
          {stat.sub}
        </p>
      </div>
    </motion.div>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section-pad" style={{ background: '#080808' }}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="label mb-3">The State of the Industry</p>
          <h2
            style={{
              fontFamily: 'var(--font-barlow)',
              fontWeight: 700,
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
              color: 'white',
              maxWidth: 640,
            }}
          >
            Let’s Talk About the Room.
          </h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '1rem', color: 'rgba(255,255,255,0.45)', marginTop: '1rem', maxWidth: 480, lineHeight: 1.7 }}>
            Everyone knows the problems. We’re just the ones who wrote them down and decided to do something about it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
