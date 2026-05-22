'use client'

import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Values from './components/Values'
import PhotoGrid from './components/PhotoGrid'
import JobsPreview from './components/JobsPreview'
import ManifestoCTA from './components/ManifestoCTA'
import Manifesto from './components/Manifesto'
import Culture from './components/Culture'
import Life from './components/Life'
import Careers from './components/Careers'
import SalaryPledge from './components/SalaryPledge'
import Services from './components/Services'
import Footer from './components/Footer'
import ParticleCanvas from './components/ParticleCanvas'

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <main className="relative">
      <ParticleCanvas />
      <Navbar />
      <div className="relative z-10">
        <section id="home"><Hero /></section>
        <Stats />
        <Values />
        <PhotoGrid />
        <JobsPreview />
        <ManifestoCTA />
        <section id="manifesto"><Manifesto /></section>
        <section id="culture"><Culture /></section>
        <section id="life"><Life /></section>
        <section id="careers"><Careers /></section>
        <section id="salary-pledge"><SalaryPledge /></section>
        <section id="services"><Services /></section>
        <Footer />
      </div>
    </main>
  )
}
