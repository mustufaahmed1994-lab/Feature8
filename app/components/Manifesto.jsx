'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import Image from 'next/image';

const ITEMS = [
  {
    num: '01',
    title: 'The Problem With Pakistan\u2019s Job Market',
    body: "Pakistan loses hundreds of thousands of skilled workers every year. Not because the talent isn\u2019t here. Because the workplaces aren\u2019t. Unclear expectations, unpublished salaries, performative culture, and management that confuses hours with output. Feature8 was built as an answer to that.",
  },
  {
    num: '02',
    title: 'What We Actually Do',
    body: "We\u2019re a technology, information, and media company. We build digital products, run content operations, and work with businesses to grow their online presence. Our three verticals\u2014Tech, Info, and Media\u2014aren\u2019t silos. They feed each other. A tool we build internally becomes a product. A content insight shapes a client strategy.",
  },
  {
    num: '03',
    title: 'How We Run the Place',
    body: "We don\u2019t do diplomatic vagueness. Say what you mean. We don\u2019t do title politics. Your contribution matters more than your seniority. We don\u2019t do busywork. If a meeting can be a message it is a message. We do expect excellence. Not performative effort but actual results.",
  },
  {
    num: '04',
    title: 'What You Can Expect From Us',
    body: "Published salary ranges before you apply. A real explanation if you\u2019re not selected. Feedback that is honest and not sanitised by HR. A manager who knows what you\u2019re working on. The ability to raise a problem without it becoming a political event.",
  },
  {
    num: '05',
    title: 'Who This Is For',
    body: "People who are good at what they do and tired of pretending the current state of things is fine. People who want to be paid what the work is actually worth. People who would rather build something real than manage the appearance of building something. If that\u2019s you, we\u2019d like to meet you.",
  },
  ];

function AccordionItem({ item, isOpen, onToggle, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
      >
    <button
      className="accordion-trigger"
      onClick={onToggle}
      style={{ padding: '1.4rem 0' }}
      >
    <div className="flex items-center gap-5">
    <span style={{ fontFamily: 'var(--font-jost)', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.12em', color: isOpen ? '#b8f224' : 'rgba(255,255,255,0.25)', minWidth: 24, transition: 'color 0.2s' }}>
      {item.num}
    </span>
    <span style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', color: isOpen ? 'white' : 'rgba(255,255,255,0.7)', transition: 'color 0.2s', letterSpacing: '-0.01em' }}>
      {item.title}
    </span>
    </div>
    <motion.div
      animate={{ rotate: isOpen ? 0 : 0 }}
      className="flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center"
      style={{
        background: isOpen ? 'rgba(184,242,36,0.15)' : 'rgba(255,255,255,0.05)',
        border: isOpen ? '1px solid rgba(184,242,36,0.3)' : '1px solid rgba(255,255,255,0.1)',
        color: isOpen ? '#b8f224' : 'rgba(255,255,255,0.4)',
        transition: 'all 0.2s',
        flexShrink: 0,
      }}
      >
      {isOpen ? <Minus size={13} /> : <Plus size={13} />}
    </motion.div>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: 'hidden' }}
          >
        <div style={{ paddingLeft: 'calc(24px + 1.25rem)', paddingBottom: '1.5rem', paddingRight: '3rem' }}>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8 }}>
          {item.body}
        </p>
        </div>
        </motion.div>
        )}
    </AnimatePresence>
    </motion.div>
    );
}

export default function Manifesto() {
  const [openIndex, setOpenIndex] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const imgRef = useRef(null);
  const imgInView = useInView(imgRef, { once: true, margin: '-60px' });
  
  return (
    <section className="section-pad" style={{ background: '#080808' }}>
    <div className="max-w-screen-xl mx-auto px-6 md:px-12">
    
      {/* Header */}
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="mb-12"
      >
    <p className="label mb-3">Our Manifesto</p>
    <h2 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.05, color: 'white', maxWidth: 600 }}>
    What Feature8 Actually Is.
    </h2>
    </motion.div>
    
      {/* Two-column layout: accordion left, sticky portrait image right */}
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
    
      {/* Accordion */}
    <div className="flex-1 min-w-0" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      {ITEMS.map((item, i) => (
      <AccordionItem
        key={i}
        item={item}
        index={i}
        inView={inView}
        isOpen={openIndex === i}
        onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
        />
      ))}
    </div>
    
      {/* Portrait image — sticky while scrolling accordion on desktop */}
    <motion.div
      ref={imgRef}
      initial={{ opacity: 0, x: 24 }}
      animate={imgInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="w-full lg:w-72 xl:w-80 flex-shrink-0"
      style={{ position: 'sticky', top: '5.5rem', alignSelf: 'flex-start' }}
      >
    <div
      className="rounded-2xl overflow-hidden"
      style={{ aspectRatio: '3 / 4', position: 'relative' }}
      >
    <Image
      src="/Manifesto.png"
      alt="The people behind the product"
      fill
      style={{ objectFit: 'cover' }}
      sizes="(max-width: 1024px) 100vw, 320px"
      />
    </div>
    <p style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', marginTop: '0.8rem', paddingLeft: '0.2rem' }}>The people behind the product.</p>
    </motion.div>
    
    </div>
    </div>
    </section>
    );
}</motion.div>
