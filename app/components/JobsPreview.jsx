'use client'

const jobs = [
  { title: 'Project Manager', dept: 'OPERATIONS', location: 'KARACHI', type: 'ON-SITE' },
  { title: 'Acquisition Specialist', dept: 'SALES TEAM', location: 'KARACHI', type: 'ON-SITE' },
  { title: 'Retention Specialist', dept: 'SALES TEAM', location: 'KARACHI', type: 'ON-SITE' },
  { title: 'DevOps Engineer', dept: 'TECH', location: 'KARACHI', type: 'ON-SITE' },
]

export default function JobsPreview() {
  return (
    <section className="relative z-10 py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 reveal">
          <div>
            <div className="section-label">ALL OPEN ROLES</div>
            <h2 className="section-title text-[clamp(2rem,5vw,4rem)]">Come Build<br />With Us.</h2>
          </div>
          <a href="#careers" className="btn-outline self-start">See All Roles →</a>
        </div>
        <div className="divide-y divide-white/5">
          {jobs.map((job, i) => (
            <a key={i} href="#careers"
              className="job-card flex flex-col sm:flex-row sm:items-center justify-between py-5 gap-3 border border-transparent hover:px-4 rounded-xl group">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <span className="text-[9px] tracking-[0.2em] uppercase text-lime-400 border border-lime-400/30 px-2 py-1 rounded-full w-fit">
                  {job.dept}
                </span>
                <span className="font-display font-extrabold text-xl text-cream group-hover:text-lime-400 transition-colors">
                  {job.title}
                </span>
              </div>
              <div className="flex gap-3 text-[10px] tracking-[0.15em] uppercase text-cream/40">
                <span>{job.location}</span><span>·</span><span>{job.type}</span>
                <span className="text-lime-400 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
