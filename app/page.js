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
  const cursorRef = useRef(null);

  useEffect(() => {
    let animId;
    let targetX = -300, targetY = -300;
    let currentX = -300, currentY = -300;

    const handleMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      if (cursorRef.current) {
        cursorRef.current.style.left = currentX + 'px';
        cursorRef.current.style.top = currentY + 'px';
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
      {/* Scroll progress left edge */}
      <div style={{ position: 'fixed', left: 0, top: 0, width: 3, height: '100%', zIndex: 9999, pointerEvents: 'none' }}>
        <motion.div
          style={{
            width: '100%',
            height: '100%',
            scaleY,
            background: 'linear-gradient(to bottom, #b8f224, rgba(184,242,36,0.2))',
            transformOrigin: 'top',
            borderRadius: '0 2px 2px 0',
          }}
        />
      </div>

      {/* Cursor glow */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          width: 350,
          height: 350,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184,242,36,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
          transform: 'translate(-50%, -50%)',
        }}
      />

      <Navbar />

      {/* Hero */}
      <Hero />

      {/* Stats + Values (intro context — no nav anchor needed) */}
      <Stats />
      <Values />

      {/* Page sections in nav order: Manifesto > Culture > Life > Careers > Salary Pledge > Services */}
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
