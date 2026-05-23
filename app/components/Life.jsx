'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Clock, MessageCircle, Lightbulb, CheckCircle, Sun } from 'lucide-react';

const TIMELINE = [
  {
    icon: Sun,
    time: '9:00 AM',
    title: 'Start With Intent',
    desc: "An hour. Whole. We’re not going to send you a message at 9:01.",
  },
  {
    icon: MessageCircle,
    time: '10:00 AM',
    title: 'Team Sync',
    desc: "15 minutes max. What’s happening, what’s blocked, what’s shipped. No status theatre.",
  },
  {
    icon: Lightbulb,
    time: '11:00 AM',
    title: 'Deep Work Block',
    desc: "This is the meat of the day. Focused, uninterrupted, actual output.",
  },
  {
    icon: CheckCircle,
    time: '2:00 PM',
    title: 'Review & Feedback',
    desc: "Work gets looked at. Real feedback given. Improvements made fast.",
  },
  {
    icon: Clock,
    time: '5:00 PM',
    title: 'Clean Handoff',
    desc: "Document where you are. Tomorrow’s you will appreciate it.",
  },
];

const TICKER_ITEMS = [
  'Transparent Pay', 'Real Ownership', 'Karachi-Based', 'No Nonsense Culture',
  'Direct Communication', 'Results Over Hours', 'Built to Last', 'Hiring Now',
  'Transparent Pay', 'Real Ownership', 'Karachi-Based', 'No Nonsense Culture',
  'Direct Communication', 'Results Over Hours', 'Built to Last', 'Hiring Now',
];

export default function Life() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const timelineRef = useRef(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: '-60px' });

  return (
    <section className="section-pad" style={{ background: '#080808' }}>
      {/* Ticker */}
      <div
        className="ticker-wrap mb-14 py-3 overflow-hidden"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="ticker-inner">
          {TICKER_ITEMS.map((item, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', paddingRight: '2rem' }}>
              <span style={{ fontFamily: 'var(--font-jost)', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', whiteSpace: 'nowrap' }}>
                {item}
              </span>
              <span style={{ color: '#b8f224', fontSize: '0.5rem' }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="label mb-3">Life at Feature8</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.05, color: 'white', maxWidth: 480 }}>
              A Day Worth Showing Up For.
            </h2>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)', maxWidth: 360, lineHeight: 1.7 }}>
              This is roughly how a day here unfolds. Structure without rigidity.
            </p>
          </div>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={timelineInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={{
              position: 'absolute',
              left: 19,
              top: 20,
              bottom: 20,
              width: 1,
              background: 'linear-gradient(to bottom, rgba(184,242,36,0.5), rgba(184,242,36,0.05))',
              transformOrigin: 'top',
              display: 'none',
            }}
            className="md:!block"
          />

          <div className="flex flex-col gap-6 md:gap-8">
            {TIMELINE.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="flex gap-5 md:gap-8 items-start"
                >
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center z-10"
                    style={{ background: 'rgba(184,242,36,0.1)', border: '1px solid rgba(184,242,36,0.3)' }}>
                    <Icon size={16} color="#b8f224" strokeWidth={1.75} />
                  </div>

                  {/* Content */}
                  <div className="card-dark p-5 flex-1">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#b8f224', display: 'block', marginBottom: '0.3rem' }}>
                          {item.time}
                        </span>
                        <h3 style={{ fontFamily: 'var(--font-jost)', fontWeight: 700, fontSize: '1rem', color: 'white', marginBottom: '0.4rem' }}>
                          {item.title}
                        </h3>
                        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.83rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
