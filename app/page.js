'use client';
import { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Values from './components/Values';
import Manifesto from './components/Manifesto';
import ManifestoCTA from './components/ManifestoCTA';
import Culture from './components/Culture';
import Life from './components/Life';
import Careers from './components/Careers';
import SalaryPledge from './components/SalaryPledge';
import Services from './components/Services';
import Footer from './components/Footer';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  // Custom cursor — dot + ring
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const cursorGlowRef = useRef(null);

  useEffect(() => {
    let animId;
    let targetX = -300, targetY = -300;
    let currentX = -300, currentY = -300;
    let ringX = -300, ringY = -300;

    const handleMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.left = targetX + 'px';
        dotRef.current.style.top = targetY + 'px';
      }
      // Ring follows with lag
      ringX += (targetX - ringX) * 0.12;
      ringY += (targetY - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ringX + 'px';
        ringRef.current.style.top = ringY + 'px';
      }
      // Glow follows very slowly
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.left = currentX + 'px';
        cursorGlowRef.current.style.top = currentY + 'px';
      }
      animId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    animId = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <main style={{ background: '#080808', overflowX: 'hidden' }}>

      {/* Scroll progress — left edge lime bar */}
      <div style={{ position: 'fixed', left: 0, top: 0, width: 3, height: '100%', zIndex: 9999, pointerEvents: 'none' }}>
        <motion.div style={{ width: '100%', height: '100%', scaleY, background: 'linear-gradient(to bottom, #b8f224, rgba(184,242,36,0.2))', transformOrigin: 'top', borderRadius: '0 2px 2px 0' }} />
      </div>

      {/* Custom cursor dot */}
      <div ref={dotRef} className="cursor-dot" />

      {/* Custom cursor ring */}
      <div ref={ringRef} className="cursor-ring" />

      {/* Ambient cursor glow */}
      <div ref={cursorGlowRef} className="cursor-glow" />

      <Navbar />

      <Hero />

      <Stats />
      <Values />

      <section id="manifesto">
        <Manifesto />
        <ManifestoCTA />
      </section>

      <section id="culture">
        <Culture />
      </section>

      <section id="life">
        <Life />
      </section>

      <section id="careers">
        <Careers />
      </section>

      <section id="salary-pledge">
        <SalaryPledge />
      </section>

      <section id="services">
        <Services />
      </section>

      <Footer />
    </main>
  );
}
