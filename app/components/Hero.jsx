'use client'
import { motion } from 'framer-motion'

const meta = [
  { label: 'INDUSTRY', value: 'TECH · INFO · MEDIA' },
  { label: 'BASE', value: 'KARACHI, PAKISTAN' },
  { label: 'STATUS', value: 'HIRING NOW' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 hero-gradient">
      <motion.div
        initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute top-20 left-6 text-[10px] tracking-[0.25em] uppercase text-cream/30">
        KARACHI, PAKISTAN · EST. 2025
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="mb-6">
        <h1 className="font-display font-extrabold text-[clamp(5rem,18vw,16rem)] leading-none tracking-tighter text-cream">
          Feature<span className="text-lime-400">⁸</span>
        </h1>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="font-sans text-[clamp(1.1rem,2.5vw,1.8rem)] text-cream/60 tracking-wide mb-12">
        Work Worth Waking Up For.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="flex flex-wrap justify-center gap-8 border-t border-white/10 pt-8">
        {meta.map(m => (
          <div key={m.label} className="text-center">
            <div className="text-[9px] tracking-[0.2em] uppercase text-cream/30 mb-1">{m.label}</div>
            <div className="text-xs tracking-[0.1em] text-cream/70">{m.value}</div>
          </div>
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[9px] tracking-[0.25em] uppercase text-cream/20">SCROLL</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-lime-400/60 to-transparent" />
      </motion.div>
    </section>
  )
}
