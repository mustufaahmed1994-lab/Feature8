'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, Paperclip, ChevronRight } from 'lucide-react';

const JOBS = [
  { id: 'project-manager', title: 'Project Manager', dept: 'Operations', type: 'On-Site', salary: null, salaryLabel: 'See Salary Pledge' },
  { id: 'acquisition-specialist', title: 'Acquisition Specialist', dept: 'Sales Team', type: 'On-Site', salary: 'PKR 80K–100K + Commission', salaryLabel: null },
  { id: 'retention-specialist', title: 'Retention Specialist', dept: 'Sales Team', type: 'On-Site', salary: 'PKR 80K–100K + Commission', salaryLabel: null },
  { id: 'devops-engineer', title: 'DevOps Engineer', dept: 'Tech', type: 'On-Site', salary: null, salaryLabel: 'See Salary Pledge' },
];

const AREAS = ['Technology', 'Sales', 'Operations', 'Marketing', 'Content & Media', 'Design', 'Other'];

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const panelVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 28, stiffness: 400 } },
  exit: { opacity: 0, y: 16, scale: 0.97, transition: { duration: 0.18 } },
};

const stepVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.22, ease: [0.25, 0.1, 0.25, 1] } },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40, transition: { duration: 0.18 } }),
};

function SuccessView({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center text-center py-10 gap-4"
    >
      <div className="w-14 h-14 rounded-full flex items-center justify-center mb-2" style={{ background: 'rgba(184,242,36,0.12)', border: '1px solid rgba(184,242,36,0.3)' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b8f224" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-jost)' }}>Application Sent</h3>
      <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 320 }}>
        We read every application personally. If there&apos;s a fit, you&apos;ll hear from us within a few days.
      </p>
      <button onClick={onClose} className="btn-lime mt-4">Close</button>
    </motion.div>
  );
}

function JobForm({ job, isGeneral, onBack, formId, action }) {
  const [fileName, setFileName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const data = new FormData(e.target);
    try {
      const res = await fetch(action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setSuccess(true);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch {
      alert('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) return <SuccessView onClose={onBack} />;

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <button onClick={onBack} className="modal-close" style={{ position: 'static', width: 32, height: 32 }}>
          <ArrowLeft size={14} />
        </button>
        {job && (
          <span className="tag-lime tag text-xs">{job.title}</span>
        )}
        {isGeneral && (
          <span className="tag-lime tag text-xs">General Application</span>
        )}
      </div>
      <p className="label mb-1">Role</p>
      <h2 className="text-2xl font-bold mb-1 text-white" style={{ fontFamily: 'var(--font-jost)' }}>Tell us about yourself.</h2>
      <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-inter)' }}>Quick intro. We read every one.</p>

      <form id={formId} action={action} method="POST" encType="multipart/form-data" onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="hidden" name="_subject" value={job ? `Application: ${job.title} at Feature8` : 'General Application at Feature8'} />
        <input type="hidden" name="_replyto" value="" />
        <input type="hidden" name="_template" value="table" />
        {job && <input type="hidden" name="role" value={job.title} />}

        <div className="grid grid-cols-2 gap-3">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" className="form-input" placeholder="Your full name" required />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-input" placeholder="you@example.com" required />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="form-group">
            <label className="form-label">Phone <span>optional</span></label>
            <input type="tel" name="phone" className="form-input" placeholder="+92 300 0000000" />
          </div>
          <div className="form-group">
            <label className="form-label">LinkedIn / Portfolio <span>optional</span></label>
            <input type="url" name="link" className="form-input" placeholder="linkedin.com/in/you" />
          </div>
        </div>

        {isGeneral && (
          <>
            <div className="form-group">
              <label className="form-label">Area of Expertise</label>
              <select name="area" className="form-input form-select" required>
                <option value="">Select area…</option>
                {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">What you&apos;re great at</label>
              <input type="text" name="skill" className="form-input" placeholder="e.g. Building scalable APIs, closing enterprise deals" required />
            </div>
          </>
        )}

        <div className="form-group">
          <label className="form-label">{isGeneral ? 'Why Feature8?' : 'Why Feature8? Why this role?'}</label>
          <textarea name={isGeneral ? 'message' : 'note'} className="form-input form-textarea" placeholder={isGeneral ? 'What draws you here and what would you want to build? Three to five sentences is fine.' : 'Keep it honest. Two to four sentences is enough.'} required rows={4} />
        </div>

        <div className="form-group">
          <label className="form-label">Resume / CV <span>optional</span></label>
          <input ref={fileRef} type="file" name="cv" accept=".pdf,.doc,.docx" style={{ display: 'none' }} onChange={e => setFileName(e.target.files[0]?.name || '')} />
          <label onClick={() => fileRef.current?.click()} className="form-file-label cursor-pointer">
            <Paperclip size={14} />
            <span>{fileName || 'Attach your CV or portfolio — PDF or Word'}</span>
          </label>
          <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)', marginTop: '0.25rem' }}>PDF or Word · Max 5MB</p>
        </div>

        <button type="submit" disabled={submitting} className="btn-lime w-full justify-center mt-2" style={{ borderRadius: 12, padding: '0.875rem', fontSize: '0.78rem' }}>
          {submitting ? 'Sending…' : 'Submit Application'}
          {!submitting && <ArrowRight size={14} />}
        </button>
      </form>
    </div>
  );
}

export default function ApplyModal({ isOpen, onClose, defaultGeneral = false }) {
  const [step, setStep] = useState(defaultGeneral ? 'general-form' : 'list');
  const [selectedJob, setSelectedJob] = useState(null);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    if (isOpen) {
      setStep(defaultGeneral ? 'general-form' : 'list');
      setSelectedJob(null);
    }
  }, [isOpen, defaultGeneral]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Lock body scroll when modal open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const goToJob = (job) => {
    setDir(1);
    setSelectedJob(job);
    setStep('job-form');
  };

  const goBack = () => {
    setDir(-1);
    setStep('list');
    setSelectedJob(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            className="modal-panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button className="modal-close" onClick={onClose} aria-label="Close">
              <X size={14} />
            </button>

            <AnimatePresence mode="wait" custom={dir}>
              {step === 'list' && (
                <motion.div key="list" custom={dir} variants={stepVariants} initial="enter" animate="center" exit="exit">
                  <p className="label mb-2">Open Positions</p>
                  <h2 className="text-2xl font-bold mb-1 text-white" style={{ fontFamily: 'var(--font-jost)' }}>Where do you fit?</h2>
                  <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-inter)' }}>
                    Select a role to apply. Salary ranges are published on our Salary Pledge page.
                  </p>
                  <div className="flex flex-col gap-2 mb-4">
                    {JOBS.map(job => (
                      <button key={job.id} className="job-item" onClick={() => goToJob(job)}>
                        <div className="text-left">
                          <div className="font-semibold text-white text-sm" style={{ fontFamily: 'var(--font-jost)' }}>{job.title}</div>
                          <div className="flex gap-2 mt-0.5">
                            <span className="tag" style={{ fontSize: '0.65rem', padding: '0.15rem 0.5rem' }}>{job.dept}</span>
                            <span className="tag" style={{ fontSize: '0.65rem', padding: '0.15rem 0.5rem' }}>{job.type}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2" style={{ color: 'rgba(184,242,36,0.9)', fontSize: '0.72rem', fontFamily: 'var(--font-jost)', fontWeight: 600, whiteSpace: 'nowrap' }}>
                          {job.salary ? (
                            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.68rem', fontFamily: 'var(--font-inter)' }}>
                              <span style={{ fontSize: '0.6rem', display: 'block', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>Monthly Range</span>
                              {job.salary}
                            </span>
                          ) : (
                            <span>{job.salaryLabel}</span>
                          )}
                          <ChevronRight size={14} style={{ color: 'rgba(184,242,36,0.6)' }} />
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 'job-form' && selectedJob && (
                <motion.div key="job-form" custom={dir} variants={stepVariants} initial="enter" animate="center" exit="exit">
                  <JobForm job={selectedJob} isGeneral={false} onBack={goBack} formId="hmForm" action="https://formspree.io/f/xvzykrwg" />
                </motion.div>
              )}

              {step === 'general-form' && (
                <motion.div key="general-form" custom={dir} variants={stepVariants} initial="enter" animate="center" exit="exit">
                  <JobForm job={null} isGeneral={true} onBack={onClose} formId="gmForm" action="https://formspree.io/f/mqejpbyg" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
