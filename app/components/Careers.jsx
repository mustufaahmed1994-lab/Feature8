'use client'
import { useState } from 'react'

const steps = [
  { num:"01", title:"Apply", desc:"Send your CV and a short note about why this role. No cover letter template. Just tell us what you care about.", time:"Day 1 to 3" },
  { num:"02", title:"Intro Call", desc:"30 minutes with a team lead. We will walk you through the role. You ask the questions you actually need answered.", time:"30 mins · Day 5 to 7" },
  { num:"03", title:"Work Sample", desc:"A short, relevant task. Not a free project. 2 to 3 hours. We review seriously and give feedback regardless of outcome.", time:"2 to 3 hrs · Day 10 to 14" },
  { num:"04", title:"Decision", desc:"A final conversation. Offer or honest feedback. Timeline from application to offer: 2 to 3 weeks maximum.", time:"Day 14 to 21" },
]

const roles = [
  { dept: "Operations", deptSlug: "operations", title: "Project Manager", location: "Karachi", type: "On-Site", employment: "Full-Time", desc: "You guide projects from conception to completion. Own the lifecycle. If it ships on time and to spec, that is on you.", salary: "See Salary Pledge" },
  { dept: "Sales Team", deptSlug: "sales", title: "Acquisition Specialist", location: "Karachi", type: "On-Site", employment: "Full-Time", desc: "You convert leads into buyers. Design funnels, run outbound campaigns and optimize conversion. Revenue is the metric.", salary: "PKR 80K–100K + Commission" },
  { dept: "Sales Team", deptSlug: "sales", title: "Retention Specialist", location: "Karachi", type: "On-Site", employment: "Full-Time", desc: "Minimize churn. Maximize loyalty. Identify at-risk clients, resolve issues, drive renewals and upsells. Retention is the compounding variable.", salary: "PKR 80K–100K + Commission" },
  { dept: "Tech", deptSlug: "tech", title: "DevOps Engineer", location: "Karachi", type: "On-Site", employment: "Full-Time", desc: "Bridge development and operations. Automate everything, harden systems, accelerate delivery. CI/CD, infrastructure, monitoring.", salary: "See Salary Pledge" },
]

const filters = ["All", "Tech", "Design", "Product", "Sales & BD", "Operations"]

export default function Careers() {
  const [activeFilter, setActiveFilter] = useState("All")
  const filtered = activeFilter === "All" ? roles : roles.filter(r => r.dept.toLowerCase().includes(activeFilter.toLowerCase()) || r.deptSlug.toLowerCase().includes(activeFilter.toLowerCase()))

  return (
    <div className="relative z-10 py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-24">
        <div className="reveal">
          <div className="section-label">OPEN ROLES</div>
          <h2 className="section-title text-[clamp(3rem,7vw,7rem)]">Come Build<br />With Us.</h2>
          <p className="text-cream/50 mt-6 max-w-xl text-lg leading-relaxed">
            Four roles open right now. All on-site, all in Karachi.
          </p>
        </div>

        <div className="reveal">
          <div className="mb-8">
            <h3 className="font-display font-extrabold text-2xl text-cream mb-2">How Hiring Works</h3>
            <p className="text-cream/40 text-sm">No mystery. No six rounds.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map(s => (
              <div key={s.num} className="card-dark p-6">
                <div className="text-lime-400 font-display font-extrabold text-3xl mb-4">Step {s.num}</div>
                <h4 className="font-display font-extrabold text-lg text-cream mb-3">{s.title}</h4>
                <p className="text-cream/50 text-sm leading-relaxed mb-4">{s.desc}</p>
                <div className="text-cream/25 text-xs tracking-[0.1em]">{s.time}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h3 className="font-display font-extrabold text-2xl text-cream">{filtered.length} Open Roles</h3>
              <p className="text-cream/30 text-xs mt-1">Updated May 2025</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map(f => (
                <button key={f} onClick={() => setActiveFilter(f)}
                  className={`text-xs tracking-[0.1em] uppercase px-4 py-2 rounded-full border transition-colors duration-150 ${activeFilter === f ? 'bg-lime-400 text-dark-900 border-lime-400' : 'border-white/10 text-cream/50 hover:border-lime-400/50 hover:text-cream'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            {filtered.length === 0 && (
              <div className="card-dark p-8 text-center text-cream/30">No roles in this department right now.</div>
            )}
            {filtered.map((role, i) => (
              <div key={i} className="job-card card-dark p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="text-[9px] tracking-[0.2em] uppercase text-lime-400 border border-lime-400/30 px-2 py-1 rounded-full">{role.dept}</span>
                      <div className="flex gap-2 text-[9px] tracking-[0.15em] uppercase text-cream/30">
                        <span>{role.location}</span>
                        <span>{role.type}</span>
                        <span>{role.employment}</span>
                      </div>
                    </div>
                    <h4 className="font-display font-extrabold text-2xl text-cream mb-3">{role.title}</h4>
                    <p className="text-cream/50 text-sm leading-relaxed max-w-2xl">{role.desc}</p>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-3">
                    <div className="text-xs text-cream/30">Monthly Range</div>
                    <div className="text-cream font-semibold text-sm">{role.salary}</div>
                    <a href={`mailto:careers@feature8.com?subject=Application: ${role.title}`}
                      className="btn-primary text-xs py-2 px-5 mt-2">Apply ↗</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-cream/25 text-xs mt-6">
            All applications go to careers@feature8.com. You will get a response.
          </p>
        </div>

        <div className="card-dark p-12 md:p-16 rounded-3xl text-center">
          <h3 className="font-display font-extrabold text-[clamp(2rem,5vw,4rem)] text-cream mb-4">
            We&apos;re Growing.<br />Come Anyway.
          </h3>
          <p className="text-cream/50 max-w-lg mx-auto mb-8 leading-relaxed">
            If you are exceptional at something and think you belong here, send us an email. No open role needed.
          </p>
          <a href="mailto:careers@feature8.com?subject=General Application" className="btn-primary">
            Send a General Application ↗
          </a>
        </div>
      </div>
    </div>
  )
}
