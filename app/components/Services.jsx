'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, BarChart3, Video, Globe, Cpu, Palette, Building2, ShoppingBag, GraduationCap, ArrowUpRight, Image as ImageIcon } from 'lucide-react';

const SERVICES = [
{ icon: Code2, title: 'Product Development', desc: 'We build software products that solve real problems. From MVPs to full-scale platforms, we own the outcome, not just the output.', tags: ['Web Apps', 'Mobile', 'SaaS'] },
{ icon: BarChart3, title: 'Digital Growth', desc: 'Acquisition, retention, and conversion engineered not guessed. We build growth systems that compound.', tags: ['SEO', 'Paid Media', 'CRO'] },
{ icon: Video, title: 'Content Operations', desc: 'High-quality content at scale. Strategy, production, and distribution handled end to end.', tags: ['Video', 'Editorial', 'Social'] },
{ icon: Cpu, title: 'Infrastructure and DevOps', desc: 'Reliable, scalable, and secure. We architect and manage the systems that keep products running.', tags: ['Cloud', 'CI/CD', 'Security'] },
{ icon: Globe, title: 'Market Expansion', desc: 'Enter new markets with a plan. We handle the research, positioning, and go-to-market execution.', tags: ['Strategy', 'Partnerships', 'GTM'] },
{ icon: Palette, title: 'Brand Development', desc: 'From identity to voice we build brands that people remember. Strategy, design, and positioning that holds together across every touchpoint.', tags: ['Identity', 'Strategy', 'Design'] },
];

const MARKETS = [
{ icon: Building2, name: 'Enterprise', desc: 'Large organisations with complex digital needs', cta: 'Get in touch' },
{ icon: ShoppingBag, name: 'SME', desc: 'Growing businesses ready to scale their online presence', cta: 'Get in touch' },
{ icon: GraduationCap, name: 'Institutions', desc: 'Educational and non-profit organisations', cta: 'Get in touch' },
];

export default function Services() {
const ref = useRef(null);
const inView = useInView(ref, { once: true, margin: '-80px' });
const gridRef = useRef(null);
const gridInView = useInView(gridRef, { once: true, margin: '-60px' });
const imgRef = useRef(null);
const imgInView = useInView(imgRef, { once: true, margin: '-60px' });

return (
<section className="section-pad" style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
<div className="max-w-screen-xl mx-auto px-6 md:px-12">

{/* Header */}
<motion.div ref={ref} initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-14">
<p className="label mb-3">What We Do</p>
<div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
<h2 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.05, color: 'white', maxWidth: 500 }}>Six Things We<br />Do Exceptionally Well.</h2>
<p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)', maxWidth: 380, lineHeight: 1.7 }}>We don&apos;t try to do everything. We go deep on what we&apos;re good at and find the right people to deliver it.</p>
</div>
</motion.div>

{/* Services grid */}
<div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
{SERVICES.map((s, i) => {
const Icon = s.icon;
return (
<motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={gridInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }} className="card-dark p-6 flex flex-col gap-5">
<div className="flex items-start justify-between">
<div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(184,242,36,0.08)', border: '1px solid rgba(184,242,36,0.18)' }}>
<Icon size={18} color="#b8f224" strokeWidth={1.6} />
</div>
<div className="flex flex-wrap gap-1 justify-end max-w-32">
{s.tags.map(t => (<span key={t} className="tag" style={{ fontSize: '0.6rem', padding: '0.15rem 0.5rem' }}>{t}</span>))}
</div>
</div>
<div>
<h3 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: '1.2rem', color: 'white', marginBottom: '0.6rem', letterSpacing: '-0.01em' }}>{s.title}</h3>
<p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.83rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>{s.desc}</p>
</div>
</motion.div>
);
})}
</div>

{/* Work showcase image placeholder */}
<motion.div
ref={imgRef}
initial={{ opacity: 0, y: 20 }}
animate={gridInView ? { opacity: 1, y: 0 } : {}}
transition={{ duration: 0.55, delay: 0.45 }}
className="mb-14 rounded-2xl overflow-hidden"
style={{ height: 300, background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
>
<div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(184,242,36,0.03) 0%, rgba(0,0,0,0) 50%, rgba(0,200,155,0.02) 100%)' }} />
<div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%', background: 'linear-gradient(to top, rgba(10,10,10,0.6), transparent)' }} />
<div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
<ImageIcon size={28} color="rgba(184,242,36,0.22)" strokeWidth={1.2} style={{ margin: '0 auto 0.8rem' }} />
<p style={{ fontFamily: 'var(--font-jost)', fontSize: '0.63rem', fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.14)' }}>Work Showcase Coming Soon</p>
</div>
</motion.div>

{/* Markets section */}
<motion.div initial={{ opacity: 0, y: 20 }} animate={gridInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.55 }}>
<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
<p className="label">Markets We Serve</p>
<p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.35)', maxWidth: 360, lineHeight: 1.65 }}>
We work across sectors. Our approach adapts to your context and the craft stays the same.
</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
{MARKETS.map((m, i) => {
const Icon = m.icon;
return (
<a key={i} href="mailto:careers@feature8.com"
className="card-dark p-5 flex items-center gap-4 group"
style={{ textDecoration: 'none', transition: 'all 0.2s' }}>
<div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(184,242,36,0.06)', border: '1px solid rgba(184,242,36,0.15)', transition: 'all 0.2s' }}>
<Icon size={17} color="#b8f224" strokeWidth={1.6} />
</div>
<div className="flex-1">
<p style={{ fontFamily: 'var(--font-jost)', fontWeight: 700, fontSize: '0.95rem', color: 'white', marginBottom: '0.2rem' }}>{m.name}</p>
<p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.38)' }}>{m.desc}</p>
</div>
<ArrowUpRight size={14} color="rgba(184,242,36,0.5)" className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
</a>
);
})}
</div>
</motion.div>
</div>
</section>
);
}
