'use client';
import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, MapPin, Briefcase, ArrowRight, Clock } from 'lucide-react';
import ApplyModal from './ApplyModal';

const JOBS = [
{ id: 'project-manager', title: 'Project Manager', dept: 'Operations', type: 'On-Site', location: 'Karachi', salary: null, salaryLabel: 'See Salary Pledge', tags: ['Operations'], description: 'Own the delivery. Keep teams aligned, timelines honest, and clients confident. You bridge strategy and execution.' },
{ id: 'acquisition-specialist', title: 'Acquisition Specialist', dept: 'Sales Team', type: 'On-Site', location: 'Karachi', salary: 'PKR 80K–100K + Commission', tags: ['Sales'], description: 'Find the right clients, start the right conversations. You are the first impression Feature8 makes on the market.' },
{ id: 'retention-specialist', title: 'Retention Specialist', dept: 'Sales Team', type: 'On-Site', location: 'Karachi', salary: 'PKR 80K–100K + Commission', tags: ['Sales'], description: 'Keep clients coming back. Build relationships that compound. Turn results into long-term partnerships.' },
{ id: 'devops-engineer', title: 'DevOps Engineer', dept: 'Tech', type: 'On-Site', location: 'Karachi', salary: null, salaryLabel: 'See Salary Pledge', tags: ['Tech'], description: 'Build and maintain the infrastructure that keeps everything running. Cloud, reliability and deployment are your domain.' },
];

const FILTERS = ['All', 'Tech', 'Sales', 'Operations'];

const PROCESS = [
{ num: '01', title: 'Apply', desc: 'Fill out the form. We read every application personally.' },
{ num: '02', title: 'Screening', desc: 'A short call to understand your background and goals.' },
{ num: '03', title: 'Task or Interview', desc: 'Role-specific assessment or in-depth conversation.' },
{ num: '04', title: 'Decision', desc: 'Honest feedback either way, within a week.' },
];

export default function Careers() {
const [filter, setFilter] = useState('All');
const [modalOpen, setModalOpen] = useState(false);
const [generalModal, setGeneralModal] = useState(false);
const ref = useRef(null);
const inView = useInView(ref, { once: true, margin: '-80px' });
const processRef = useRef(null);
const processInView = useInView(processRef, { once: true, margin: '-60px' });
const filtered = filter === 'All' ? JOBS : JOBS.filter(j => j.tags.includes(filter));

return (
<>
<section className="section-pad" style={{ background: '#080808' }}>
<div className="max-w-screen-xl mx-auto px-6 md:px-12">
<motion.div ref={ref} initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-12">
<p className="label mb-3">Open Roles</p>
<div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
<h2 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.05, color: 'white', maxWidth: 500 }}>Find Your Place at Feature8.</h2>
<button onClick={() => { setGeneralModal(true); setModalOpen(true); }} className="btn-outline self-start md:self-auto"><span>Submit General Application</span><ArrowUpRight size={13} /></button>
</div>
</motion.div>

{/* Filter tabs */}
<motion.div initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.15 }} className="flex gap-2 mb-8 flex-wrap">
{FILTERS.map(f => (
<button key={f} onClick={() => setFilter(f)}
style={{ fontFamily: 'var(--font-jost)', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.06em', padding: '0.45rem 1rem', borderRadius: 9999, border: filter === f ? '1px solid rgba(184,242,36,0.5)' : '1px solid rgba(255,255,255,0.1)', background: filter === f ? 'rgba(184,242,36,0.12)' : 'transparent', color: filter === f ? '#b8f224' : 'rgba(255,255,255,0.45)', cursor: 'pointer', transition: 'all 0.2s' }}>
{f}
</button>
))}
</motion.div>

{/* Job listings */}
<div className="flex flex-col gap-3 mb-20">
{filtered.map((job, i) => (
<motion.div key={job.id} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }} className="card-dark p-5 md:p-6">
<div className="flex items-start justify-between gap-4">
<div className="flex-1 min-w-0">
<div className="flex flex-wrap items-center gap-2 mb-2">
<h3 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)', color: 'white', letterSpacing: '-0.01em' }}>{job.title}</h3>
</div>
<div className="flex flex-wrap items-center gap-2 mb-3">
<span className="tag" style={{ fontSize: '0.65rem' }}>{job.dept}</span>
<span className="tag" style={{ fontSize: '0.65rem' }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}><MapPin size={9} style={{ opacity: 0.6 }} />{job.location}</span></span>
<span className="tag" style={{ fontSize: '0.65rem' }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}><Briefcase size={9} style={{ opacity: 0.6 }} />{job.type}</span></span>
</div>
<p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.83rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.65 }}>{job.description}</p>
</div>
<div className="flex flex-col items-end gap-3 flex-shrink-0">
{job.salary ? (
<div className="text-right">
<p style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '0.2rem' }}>Monthly</p>
<p style={{ fontFamily: 'var(--font-jost)', fontWeight: 700, fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>{job.salary}</p>
</div>
) : (
<span style={{ fontFamily: 'var(--font-jost)', fontWeight: 600, fontSize: '0.75rem', color: '#b8f224' }}>{job.salaryLabel}</span>
)}
<button onClick={() => { setGeneralModal(false); setModalOpen(true); }}
style={{ fontFamily: 'var(--font-jost)', fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.07em', textTransform: 'uppercase', padding: '0.45rem 0.9rem', borderRadius: 9999, background: 'rgba(184,242,36,0.12)', border: '1px solid rgba(184,242,36,0.35)', color: '#b8f224', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
onMouseEnter={e => { e.currentTarget.style.background = 'rgba(184,242,36,0.2)'; }}
onMouseLeave={e => { e.currentTarget.style.background = 'rgba(184,242,36,0.12)'; }}>
Apply <ArrowRight size={11} />
</button>
</div>
</div>
</motion.div>
))}
</div>

{/* How We Hire */}
<motion.div ref={processRef} initial={{ opacity: 0, y: 25 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
<p className="label mb-8">How We Hire</p>

{/* How We Hire image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10 rounded-2xl overflow-hidden"
            style={{ height: 280, position: 'relative' }}
          >
            <img src="/Image 3.png" alt="How We Hire" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, rgba(8,8,8,0.7), transparent)' }} />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
{PROCESS.map((step, i) => (
<motion.div
key={i}
initial={{ opacity: 0, y: 20 }}
animate={processInView ? { opacity: 1, y: 0 } : {}}
transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
className="card-dark p-5"
>
<span style={{ fontFamily: 'var(--font-jost)', fontWeight: 800, fontSize: '0.65rem', letterSpacing: '0.1em', color: '#b8f224', display: 'block', marginBottom: '0.75rem' }}>{step.num}</span>
<h4 style={{ fontFamily: 'var(--font-jost)', fontWeight: 700, fontSize: '0.95rem', color: 'white', marginBottom: '0.4rem' }}>{step.title}</h4>
<p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.65 }}>{step.desc}</p>
</motion.div>
))}
</div>
</motion.div>
</div>
</section>
<ApplyModal isOpen={modalOpen} onClose={() => { setModalOpen(false); setGeneralModal(false); }} defaultGeneral={generalModal} />
</>
);
}
