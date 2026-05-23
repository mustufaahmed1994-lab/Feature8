'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import ParticleCanvas from './ParticleCanvas';
import ApplyModal from './ApplyModal';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.13, delayChildren: 0.3 } } };
const item = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };
const STATS = [{ label: 'Industry', value: 'TECH · INFO · MEDIA' }, { label: 'Base', value: 'KARACHI, PAKISTAN' }, { label: 'Status', value: 'HIRING NOW' }];

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);
  const scrollTo = (id) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  return (<>
    <section id="main-content" className="relative flex flex-col justify-end overflow-visible" style={{ minHeight: '100svh', paddingBottom: '5rem' }}>
      <div className="absolute inset-0 overflow-hidden"><ParticleCanvas /></div>
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #080808)' }} />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.8 }} className="absolute left-5 top-1/2 hidden lg:flex items-center gap-2" style={{ transform: 'translateY(-50%) rotate(-90deg)', transformOrigin: 'center', whiteSpace: 'nowrap' }}>
        <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)' }}>KARACHI, PAKISTAN · EST. 2025</span>
      </motion.div>
      <div className="relative z-10 px-6 md:px-14 lg:px-20 max-w-screen-2xl mx-auto w-full">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item}><h1 style={{ fontFamily: 'var(--font-jost)', fontWeight: 700, fontSize: 'clamp(3.8rem, 9vw, 8.5rem)', lineHeight: 1.02, letterSpacing: '-0.03em', color: '#f0ede4', marginBottom: '1.25rem', display: 'inline-flex', alignItems: 'flex-start', gap: '0.12em', overflow: 'visible' }}><span>Feature</span><span style={{ color: '#b8f224', fontSize: '0.44em', fontWeight: 800, lineHeight: 1, marginTop: '0.06em', display: 'inline-block', flexShrink: 0 }}>8</span></h1></motion.div>
          <motion.p variants={item} style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)', fontWeight: 500, color: 'rgba(255,255,255,0.72)', letterSpacing: '0.005em', marginBottom: '2.5rem', maxWidth: 480, lineHeight: 1.5 }}>Work Worth Waking Up For.</motion.p>
          <motion.div variants={item} className="flex flex-wrap gap-3 mb-10">
            <button onClick={() => scrollTo('careers')} className="btn-lime" style={{ fontSize: '0.78rem', padding: '0.75rem 1.5rem' }}><span>See Open Roles</span><ArrowUpRight size={14} /></button>
            <button onClick={() => scrollTo('manifesto')} className="btn-outline" style={{ fontSize: '0.78rem', padding: '0.75rem 1.5rem' }}><span>Our Manifesto</span></button>
          </motion.div>
          <motion.div variants={item} style={{ width: 400, maxWidth: '100%', height: 1, background: 'rgba(255,255,255,0.1)', marginBottom: '1.75rem' }} />
          <motion.div variants={item} className="flex flex-wrap gap-8 md:gap-14">{STATS.map(stat => (<div key={stat.label}><p style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)', marginBottom: '0.4rem' }}>{stat.label}</p><p style={{ fontFamily: 'var(--font-jost)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.85)' }}>{stat.value}</p></div>))}</motion.div>
        </motion.div>
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 0.8 }} onClick={() => scrollTo('manifesto')} aria-label="Scroll down" className="absolute right-8 bottom-0 hidden md:flex flex-col items-center gap-2 pb-6 cursor-pointer" style={{ background: 'none', border: 'none' }}>
          <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>SCROLL</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}><ChevronDown size={18} color="rgba(184,242,36,0.6)" strokeWidth={2} /></motion.div>
        </motion.button>
      </div>
      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.1, duration: 0.8 }} onClick={() => scrollTo('manifesto')} aria-label="Scroll down" className="absolute bottom-4 left-1/2 flex flex-col items-center gap-1 md:hidden" style={{ transform: 'translateX(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}>
        <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.52rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>SCROLL</span>
        <motion.div animate={{ y: [0, 5, 0], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}><ChevronDown size={16} color="rgba(184,242,36,0.55)" strokeWidth={2} /></motion.div>
      </motion.button>
    </section>
    <ApplyModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
  </>);
}
