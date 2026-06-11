'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MessageSquare, Lightbulb, Target, Clock, Shield, BookOpen, Users, Zap, Coffee, Laptop, Heart, TrendingUp } from 'lucide-react';
import Image from 'next/image';

const VALUES = [
  { icon: MessageSquare, title: 'Direct Communication', desc: "Say what you mean. We don't do diplomatic vagueness or corporate-speak." },
  { icon: Lightbulb, title: 'Ownership Mindset', desc: "Think like a founder, not an employee. It's your work, not just your job." },
  { icon: Target, title: 'Results Over Hours', desc: "We measure output, not attendance. Quality work in less time is a win." },
  { icon: Clock, title: 'Respect for Time', desc: "No meetings that could be messages. No processes that exist for their own sake." },
  { icon: Shield, title: 'Psychological Safety', desc: "Raise a problem without it becoming a political event. Mistakes are learning data." },
  { icon: BookOpen, title: 'Continuous Learning', desc: "We grow individually and together. Share what you know, ask what you don't." },
  { icon: Users, title: 'Small, Strong Teams', desc: "We stay lean on purpose. Every person here has real impact." },
  { icon: Zap, title: 'Bias for Action', desc: "We move fast, decide with the information we have, and course-correct as we go." },
];

const PILLARS = [
  { label: 'Culture', value: 'Transparent by Default' },
  { label: 'Management', value: 'Outcome-Driven' },
  { label: 'Growth', value: 'Continuous' },
  { label: 'Communication', value: 'Direct & Honest' },
];

const PERKS = [
  { icon: Coffee, text: 'Fuel for your best work' },
  { icon: Laptop, text: 'Tools that get out of your way' },
  { icon: Heart, text: 'A team that actually gives a damn' },
  { icon: TrendingUp, text: 'A career that compounds' },
];

export default function Culture() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' });
  const pairRef = useRef(null);
  const pairInView = useInView(pairRef, { once: true, margin: '-60px' });
  const stripRef = useRef(null);
  const stripInView = useInView(stripRef, { once: true, margin: '-60px' });

  return (
    <section className="section-pad" style={{ background: '#080808' }}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="label mb-3">Culture</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.05, color: 'white', maxWidth: 560 }}>
              How We Actually Work.
            </h2>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)', maxWidth: 360, lineHeight: 1.7 }}>
              Eight principles we hold ourselves to. Not aspirational posters on the wall — the actual code we run on.
            </p>
          </div>
        </motion.div>

        {/* Culture pillars row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {PILLARS.map((p, i) => (
            <div key={i} className="card-dark p-5 text-center">
              <p style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.4rem' }}>{p.label}</p>
              <p style={{ fontFamily: 'var(--font-jost)', fontWeight: 700, fontSize: '0.9rem', color: '#b8f224' }}>{p.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Square image pair */}
<div ref={pairRef} className="grid grid-cols-2 gap-4 mb-12">
          {/* Workspace image */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={pairInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.55, delay: 0, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl overflow-hidden"
            style={{ aspectRatio: '1 / 1', position: 'relative' }}
          >
            <Image
              src="/theworkspace.png"
              alt="The workspace"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 50vw, 600px"
            />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', background: 'linear-gradient(to top, rgba(8,8,8,0.75), transparent)' }} />
            <div style={{ position: 'absolute', bottom: '0.9rem', left: '1rem' }}>
            </div>
          </motion.div>

          {/* Team image */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={pairInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl overflow-hidden"
            style={{ aspectRatio: '1 / 1', position: 'relative' }}
          >
            <Image
              src="/Culture.png"
              alt="The team"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 50vw, 600px"
            />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', background: 'linear-gradient(to top, rgba(8,8,8,0.75), transparent)' }} />
            <div style={{ position: 'absolute', bottom: '0.9rem', left: '1rem' }}>
            </div>
          </motion.div>
        </div>

        {/* Values grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="card-dark p-5 flex flex-col gap-3"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(184,242,36,0.08)', border: '1px solid rgba(184,242,36,0.15)' }}>
                  <Icon size={15} color="#b8f224" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-jost)', fontWeight: 700, fontSize: '0.9rem', color: 'white', marginBottom: '0.35rem' }}>{v.title}</h3>
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.65 }}>{v.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Cinematic wide image */}
        <motion.div
          ref={stripRef}
          initial={{ opacity: 0, y: 24 }}
          animate={stripInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 rounded-2xl overflow-hidden"
          style={{ height: 420, position: 'relative', background: 'rgba(255,255,255,0.025)', border: '1px dashed rgba(255,255,255,0.1)' }}
        >
          <img
            src="/Karachi%20Cinematic%20Strip.png"
            alt="Karachi"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to top, rgba(8,8,8,0.8), transparent)' }} />
          <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.5rem', right: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <p style={{ fontFamily: 'var(--font-jost)', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>Feature8 — Karachi</p>
            <p style={{ fontFamily: 'var(--font-jost)', fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(184,242,36,0.35)' }}>Culture</p>
          </div>
        </motion.div>

        {/* Perks strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={gridInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl"
          style={{ background: 'rgba(184,242,36,0.04)', border: '1px solid rgba(184,242,36,0.12)' }}
        >
          {PERKS.map((perk, i) => {
            const Icon = perk.icon;
            return (
              <div key={i} className="flex items-center gap-3">
                <Icon size={16} color="#b8f224" strokeWidth={1.75} />
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)' }}>{perk.text}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
