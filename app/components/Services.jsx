'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, BarChart3, Video, Globe, Cpu, Building2, ShoppingBag, GraduationCap } from 'lucide-react';

const SERVICES = [
  {
    icon: Code2,
    title: 'Product Development',
    desc: 'We build software products that solve real problems. From MVPs to full-scale platforms, we own the outcome, not just the output.',
    tags: ['Web Apps', 'Mobile', 'SaaS'],
  },
  {
    icon: BarChart3,
    title: 'Digital Growth',
    desc: 'Acquisition, retention, and conversion — engineered, not guessed. We build growth systems that compound.',
    tags: ['SEO', 'Paid Media', 'CRO'],
  },
  {
    icon: Video,
    title: 'Content Operations',
    desc: 'High-quality content at scale. Strategy, production, and distribution handled end-to-end.',
    tags: ['Video', 'Editorial', 'Social'],
  },
  {
    icon: Cpu,
    title: 'Infrastructure & DevOps',
    desc: 'Reliable, scalable, and secure. We architect and manage the systems that keep products running.',
    tags: ['Cloud', 'CI/CD', 'Security'],
  },
  {
    icon: Globe,
    title: 'Market Expansion',
    desc: 'Enter new markets with a plan. We handle the research, positioning, and go-to-market execution.',
    tags: ['Strategy', 'Partnerships', 'GTM'],
  },
];

const MARKETS = [
  { icon: Building2, name: 'Enterprise', desc: 'Large organisations with complex digital needs' },
  { icon: ShoppingBag, name: 'SME', desc: 'Growing businesses ready to scale their online presence' },
  { icon: GraduationCap, name: 'Institutions', desc: 'Educational and non-profit organisations' },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' });

  return (
    <section className="section-pad" style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="label mb-3">What We Do</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.05, color: 'white', maxWidth: 500 }}>
              Five Things We<br />Do Exceptionally Well.
            </h2>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)', maxWidth: 380, lineHeight: 1.7 }}>
              We don’t try to do everything. We go deep on what we’re good at and find the right people to deliver it.
            </p>
          </div>
        </motion.div>

        {/* Services grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="card-dark p-6 flex flex-col gap-5"
                style={i === 4 ? { gridColumn: 'span 1' } : {}}
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(184,242,36,0.08)', border: '1px solid rgba(184,242,36,0.18)' }}>
                    <Icon size={18} color="#b8f224" strokeWidth={1.6} />
                  </div>
                  <div className="flex flex-wrap gap-1 justify-end max-w-32">
                    {s.tags.map(t => (
                      <span key={t} className="tag" style={{ fontSize: '0.6rem', padding: '0.15rem 0.5rem' }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: '1.2rem', color: 'white', marginBottom: '0.6rem', letterSpacing: '-0.01em' }}>
                    {s.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.83rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Markets section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={gridInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="label mb-6">Markets We Serve</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {MARKETS.map((m, i) => {
              const Icon = m.icon;
              return (
                <div key={i} className="card-dark p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <Icon size={17} color="rgba(255,255,255,0.5)" strokeWidth={1.6} />
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-jost)', fontWeight: 700, fontSize: '0.95rem', color: 'white', marginBottom: '0.2rem' }}>{m.name}</p>
                    <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.38)' }}>{m.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
