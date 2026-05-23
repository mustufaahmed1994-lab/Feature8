'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Eye, DollarSign, Handshake } from 'lucide-react';

const VALUES = [
  {
    icon: Eye,
    number: '01',
    title: 'Radical Transparency',
    desc: 'Salaries are public. Decisions are explained. No hidden agendas, no black-box promotions. You know where you stand because we tell you.',
  },
  {
    icon: DollarSign,
    number: '02',
    title: 'Pay That Reflects Reality',
    desc: 'We benchmarked against what the market actually pays — not what it claims to. Our ranges are published and our floors are real.',
  },
  {
    icon: Handshake,
    number: '03',
    title: 'Work That Compounds',
    desc: 'You won’t be handed a job description and left to it. You’ll build things that matter, with people who give a damn.',
  },
];

export default function Values() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section-pad" style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="label mb-3">Why Feature8</p>
          <h2
            style={{
              fontFamily: 'var(--font-barlow)',
              fontWeight: 700,
              fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
              lineHeight: 1.05,
              color: 'white',
              maxWidth: 540,
            }}
          >
            Three Things We<br />Won’t Compromise On.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 35 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="card-dark p-7 flex flex-col gap-5"
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(184,242,36,0.08)', border: '1px solid rgba(184,242,36,0.18)' }}>
                    <Icon size={18} color="#b8f224" strokeWidth={1.6} />
                  </div>
                  <span style={{ fontFamily: 'var(--font-jost)', fontWeight: 800, fontSize: '0.65rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.18)' }}>
                    {v.number}
                  </span>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-jost)', fontWeight: 700, fontSize: '1.1rem', color: 'white', marginBottom: '0.6rem', lineHeight: 1.25 }}>
                    {v.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>
                    {v.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
