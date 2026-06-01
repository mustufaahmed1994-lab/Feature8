'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Moon, MessageCircle, Lightbulb, CheckCircle, Clock, Image as ImageIcon } from 'lucide-react';

const TIMELINE = [
{
icon: Moon,
time: 'Shift Start',
title: 'Your Hour to Begin',
desc: 'Office hours run from 6PM to 6AM. Your nine-hour shift falls somewhere in that window. The first hour is yours to settle in without interruption.',
},
{
icon: MessageCircle,
time: '15 Minutes',
title: 'Team Sync',
desc: 'A short check-in at the start of your shift. What is happening, what is blocked, what has shipped. No status theatre and no long meetings.',
},
{
icon: Lightbulb,
time: 'Core Block',
title: 'Deep Work',
desc: 'The heart of the shift. Focused time to produce actual output. Interruptions are minimised so the work can be real.',
},
{
icon: CheckCircle,
time: 'Mid-Shift',
title: 'Review and Feedback',
desc: 'Work gets looked at. Honest feedback is given and improvements are made without delay. No waiting until next week.',
},
{
icon: Clock,
time: 'Shift End',
title: 'Clean Handoff',
desc: 'Document where things stand before you log off. The next person on shift should be able to pick up without having to ask.',
},
];

const TICKER_ITEMS = [
'Transparent Pay', 'Real Ownership', 'Karachi Based', 'No Nonsense Culture',
'Direct Communication', 'Results Over Hours', 'Built to Last', 'Hiring Now',
'Transparent Pay', 'Real Ownership', 'Karachi Based', 'No Nonsense Culture',
'Direct Communication', 'Results Over Hours', 'Built to Last', 'Hiring Now',
];

export default function Life() {
const ref = useRef(null);
const inView = useInView(ref, { once: true, margin: '-80px' });
const timelineRef = useRef(null);
const timelineInView = useInView(timelineRef, { once: true, margin: '-60px' });
const imgRef = useRef(null);
const imgInView = useInView(imgRef, { once: true, margin: '-60px' });

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
<span style={{ fontFamily: 'var(--font-jost)', fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)', whiteSpace: 'nowrap' }}>
{item}
</span>
<span style={{ color: '#b8f224', fontSize: '0.45rem' }}>◆</span>
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
A Shift Worth Showing Up For.
</h2>
<p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.88rem', color: 'rgba(255,255,255,0.4)', maxWidth: 380, lineHeight: 1.75 }}>
We run on night hours. Shifts are nine hours long and fall anywhere between 6PM and 6AM. This is how one typically goes.
</p>
</div>
</motion.div>

{/* Office image placeholder */}
<motion.div
ref={imgRef}
initial={{ opacity: 0, y: 20 }}
animate={imgInView ? { opacity: 1, y: 0 } : {}}
transition={{ duration: 0.55, delay: 0.1 }}
className="mb-12 rounded-2xl overflow-hidden"
style={{ height: 340, background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
>
<div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(184,242,36,0.035) 0%, rgba(0,0,0,0) 55%, rgba(0,200,155,0.02) 100%)' }} />
<div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, rgba(8,8,8,0.7), transparent)' }} />
<div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
<ImageIcon size={30} color="rgba(184,242,36,0.25)" strokeWidth={1.2} style={{ margin: '0 auto 0.8rem' }} />
<p style={{ fontFamily: 'var(--font-jost)', fontSize: '0.63rem', fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.15)' }}>Office Photo Coming Soon</p>
</div>
</motion.div>

{/* Hours context card */}
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={inView ? { opacity: 1, y: 0 } : {}}
transition={{ duration: 0.45, delay: 0.15 }}
className="mb-10 p-5 rounded-2xl flex flex-wrap gap-6"
style={{ background: 'rgba(184,242,36,0.05)', border: '1px solid rgba(184,242,36,0.15)' }}
>
<div>
<p style={{ fontFamily: 'var(--font-jost)', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.3rem' }}>Office Window</p>
<p style={{ fontFamily: 'var(--font-jost)', fontWeight: 700, fontSize: '1rem', color: '#b8f224' }}>6PM to 6AM</p>
</div>
<div>
<p style={{ fontFamily: 'var(--font-jost)', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.3rem' }}>Shift Length</p>
<p style={{ fontFamily: 'var(--font-jost)', fontWeight: 700, fontSize: '1rem', color: 'white' }}>9 Hours</p>
</div>
<div>
<p style={{ fontFamily: 'var(--font-jost)', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.3rem' }}>Location</p>
<p style={{ fontFamily: 'var(--font-jost)', fontWeight: 700, fontSize: '1rem', color: 'white' }}>On-Site, Karachi</p>
</div>
<div>
<p style={{ fontFamily: 'var(--font-jost)', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.3rem' }}>Type</p>
<p style={{ fontFamily: 'var(--font-jost)', fontWeight: 700, fontSize: '1rem', color: 'white' }}>Fixed Shift</p>
</div>
</motion.div>

{/* Timeline */}
<div ref={timelineRef} className="relative">
<motion.div
initial={{ scaleY: 0 }}
animate={timelineInView ? { scaleY: 1 } : {}}
transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
style={{
position: 'absolute',
left: 19,
top: 24,
bottom: 24,
width: 1,
background: 'linear-gradient(to bottom, rgba(184,242,36,0.5), rgba(184,242,36,0.04))',
transformOrigin: 'top',
}}
className="hidden md:block"
/>

<div className="flex flex-col gap-5 md:gap-6">
{TIMELINE.map((item, i) => {
const Icon = item.icon;
return (
<motion.div
key={i}
initial={{ opacity: 0, x: -20 }}
animate={timelineInView ? { opacity: 1, x: 0 } : {}}
transition={{ duration: 0.45, delay: 0.35 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
className="flex gap-5 md:gap-8 items-start"
>
<motion.div
initial={{ scale: 0 }}
animate={timelineInView ? { scale: 1 } : {}}
transition={{ delay: 0.4 + i * 0.1, type: 'spring', stiffness: 400, damping: 20 }}
className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center z-10"
style={{ background: 'rgba(184,242,36,0.1)', border: '1px solid rgba(184,242,36,0.28)' }}
>
<Icon size={15} color="#b8f224" strokeWidth={1.75} />
</motion.div>

<div
className="card-dark p-5 flex-1"
style={{ cursor: 'default' }}
>
<span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#b8f224', display: 'block', marginBottom: '0.3rem' }}>
{item.time}
</span>
<h3 style={{ fontFamily: 'var(--font-jost)', fontWeight: 700, fontSize: '1rem', color: 'white', marginBottom: '0.4rem' }}>
{item.title}
</h3>
<p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.83rem', color: 'rgba(255,255,255,0.43)', lineHeight: 1.7, textWrap: 'pretty' }}>
{item.desc}
</p>
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
