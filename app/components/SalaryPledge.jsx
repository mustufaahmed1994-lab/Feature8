'use client';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown, CircleDot } from 'lucide-react';

const DEPARTMENTS = [
  {
    name: 'Engineering and Technology',
    count: 6,
    roles: [
      { role: 'Frontend Developer', level: 'Junior (0 to 2 yrs)', range: '80,000 to 120,000', note: 'React focus. Mentorship included.' },
      { role: 'Frontend Developer', level: 'Mid (2 to 5 yrs)', range: '130,000 to 200,000', note: 'Architecture ownership expected.' },
      { role: 'Frontend Developer', level: 'Senior (5+ yrs)', range: '220,000 to 350,000', note: 'Currently hiring.', hiring: true },
      { role: 'Backend Developer', level: 'Junior', range: '75,000 to 115,000', note: 'Node, Python, or Go.' },
      { role: 'Backend Developer', level: 'Mid', range: '125,000 to 195,000', note: '' },
      { role: 'Backend Developer', level: 'Senior', range: '210,000 to 330,000', note: '' },
    ],
  },
  {
    name: 'Design',
    count: 3,
    roles: [
      { role: 'Product Designer', level: 'Junior', range: '70,000 to 105,000', note: 'Figma, user research, systems.' },
      { role: 'Product Designer', level: 'Mid', range: '120,000 to 185,000', note: '' },
      { role: 'Product Designer', level: 'Senior', range: '180,000 to 280,000', note: 'Currently hiring.', hiring: true },
    ],
  },
  {
    name: 'Product',
    count: 3,
    roles: [
      { role: 'Product Manager', level: 'Associate PM', range: '90,000 to 140,000', note: '2 to 3 years experience.' },
      { role: 'Product Manager', level: 'PM', range: '180,000 to 280,000', note: 'Currently hiring.', hiring: true },
      { role: 'Product Manager', level: 'Senior PM', range: '290,000 to 420,000', note: 'Not currently hiring.' },
    ],
  },
  {
    name: 'Sales and Business Development',
    count: 4,
    roles: [
      { role: 'BD Associate', level: 'Junior', range: '60,000 to 90,000 + commission', note: 'Commission uncapped.', hiring: true },
      { role: 'BD Manager or Lead', level: 'Mid to Senior', range: '120,000 to 200,000 + commission', note: 'Currently hiring.', hiring: true },
      { role: 'Acquisition Specialist', level: 'All Levels', range: '80,000 to 100,000 + commission', note: 'Currently hiring. Commission uncapped.', hiring: true },
      { role: 'Retention Specialist', level: 'All Levels', range: '80,000 to 100,000 + commission', note: 'Currently hiring. Renewal-based incentives.', hiring: true },
    ],
  },
  {
    name: 'Marketing',
    count: 2,
    roles: [
      { role: 'Marketing Specialist', level: 'Junior', range: '65,000 to 100,000', note: 'Content, performance, or brand.' },
      { role: 'Marketing Manager', level: 'Mid to Senior', range: '120,000 to 220,000', note: 'Not currently hiring.' },
    ],
  },
  {
    name: 'Operations',
    count: 2,
    roles: [
      { role: 'Project Manager', level: 'Mid (3 to 6 yrs)', range: '150,000 to 250,000', note: 'Currently hiring. Full lifecycle.', hiring: true },
      { role: 'Project Manager', level: 'Senior (6+ yrs)', range: '250,000 to 380,000', note: 'Multi-project. Strategic planning.' },
    ],
  },
];

const POLICIES = [
  'Ranges are set before roles are posted. Not after.',
  'We review ranges against market data every six months.',
  'If your scope changes, your pay changes with it.',
  'There are no secret tiers. What you see is what everyone gets.',
];

const FAQS = [
  {
    q: 'Why publish salaries publicly?',
    a: 'Because ambiguity about pay is a power imbalance. We want candidates to know what to expect before they even apply.',
  },
  {
    q: 'Are these ranges negotiable?',
    a: 'The ranges are real. Where you land within a range depends on your experience and the specifics of the role.',
  },
  {
    q: 'What about commission roles?',
    a: 'Commission is on top of base. The base ranges are the floor and commission is uncapped on relevant roles.',
  },
];

function DeptAccordion({ dept, index, isOpen, onToggle, inView }) {
  const hiringCount = dept.roles.filter(r => r.hiring).length;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left"
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <div className="flex items-center gap-4">
          <span style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: isOpen ? 'white' : 'rgba(255,255,255,0.65)', transition: 'color 0.2s', letterSpacing: '-0.01em' }}>
            {dept.name}
          </span>
          <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.28)', background: 'rgba(255,255,255,0.06)', padding: '0.15rem 0.5rem', borderRadius: 9999 }}>
            {dept.count} roles
          </span>
          {hiringCount > 0 && (
            <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.08em', color: '#b8f224', background: 'rgba(184,242,36,0.1)', border: '1px solid rgba(184,242,36,0.25)', padding: '0.15rem 0.5rem', borderRadius: 9999 }}>
              {hiringCount} open
            </span>
          )}
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.22 }}
          style={{ color: isOpen ? '#b8f224' : 'rgba(255,255,255,0.3)', flexShrink: 0 }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingBottom: '1.25rem' }}>
              {/* Column headers */}
              <div className="grid gap-2 mb-1 px-2" style={{ gridTemplateColumns: '1.6fr 1fr 1fr 1.2fr' }}>
                {['Role', 'Level', 'Monthly (PKR)', 'Notes'].map(h => (
                  <span key={h} style={{ fontFamily: 'var(--font-jost)', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)' }}>{h}</span>
                ))}
              </div>
              <div className="flex flex-col gap-1">
                {dept.roles.map((row, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                    className="grid gap-2 px-2 py-3 rounded-xl"
                    style={{
                      gridTemplateColumns: '1.6fr 1fr 1fr 1.2fr',
                      background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
                      borderLeft: row.hiring ? '2px solid rgba(184,242,36,0.4)' : '2px solid transparent',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-jost)', fontWeight: 600, fontSize: '0.85rem', color: 'white', lineHeight: 1.3 }}>{row.role}</span>
                    <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)' }}>{row.level}</span>
                    <span style={{ fontFamily: 'var(--font-jost)', fontWeight: 700, fontSize: '0.82rem', color: row.hiring ? '#b8f224' : 'rgba(255,255,255,0.8)' }}>PKR {row.range}</span>
                    <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.75rem', color: row.hiring ? 'rgba(184,242,36,0.7)' : 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      {row.hiring && <CircleDot size={9} color="#b8f224" style={{ flexShrink: 0 }} />}
                      {row.note || ''}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function SalaryPledge() {
  const [openDept, setOpenDept] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const tableRef = useRef(null);
  const tableInView = useInView(tableRef, { once: true, margin: '-60px' });

  return (
    <section className="section-pad" style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="label mb-3">Salary Pledge</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.05, color: 'white', maxWidth: 560 }}>
              What Every Role Pays. Published Before You Apply.
            </h2>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.88rem', color: 'rgba(255,255,255,0.4)', maxWidth: 360, lineHeight: 1.75 }}>
              No salary negotiation theatre. No lowball offers. Every range is real and reviewed twice a year.
            </p>
          </div>
        </motion.div>

        {/* Policy pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {POLICIES.map((p, i) => (
            <span key={i} className="tag" style={{ fontSize: '0.72rem', padding: '0.35rem 0.85rem', lineHeight: 1.5, textWrap: 'pretty' }}>{p}</span>
          ))}
        </motion.div>

        {/* Collapsible departments */}
        <div
          ref={tableRef}
          className="rounded-2xl overflow-hidden mb-12"
          style={{ border: '1px solid rgba(255,255,255,0.07)', background: '#111' }}
        >
          <div className="px-5 md:px-7">
            {DEPARTMENTS.map((dept, i) => (
              <DeptAccordion
                key={i}
                dept={dept}
                index={i}
                inView={tableInView}
                isOpen={openDept === i}
                onToggle={() => setOpenDept(openDept === i ? -1 : i)}
              />
            ))}
          </div>
        </div>

        {/* Mobile note */}
        <p className="block md:hidden text-center mb-8" style={{ fontFamily: 'var(--font-inter)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)' }}>
          Scroll horizontally inside a department to see all columns.
        </p>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={tableInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="label mb-6">Questions</p>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-4 text-left"
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <span style={{ fontFamily: 'var(--font-jost)', fontWeight: 600, fontSize: '0.95rem', color: openFaq === i ? 'white' : 'rgba(255,255,255,0.65)', transition: 'color 0.2s' }}>
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ color: openFaq === i ? '#b8f224' : 'rgba(255,255,255,0.3)', flexShrink: 0, marginLeft: '1rem' }}
                  >
                    <ChevronDown size={16} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, paddingBottom: '1rem', textWrap: 'pretty' }}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
