'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Values from './components/Values';
import Manifesto from './components/Manifesto';
import ManifestoCTA from './components/ManifestoCTA';
import Culture from './components/Culture';
import Life from './components/Life';
import Services from './components/Services';
import Careers from './components/Careers';
import SalaryPledge from './components/SalaryPledge';
import Footer from './components/Footer';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  const [cursor, setCursor] = useState({ x: -300, y: -300 });
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
      {/* Scroll progress — left edge */}
      <div className="scroll-progress" style={{ zIndex: 9999, pointerEvents: 'none' }}>
        <motion.div className="scroll-progress-bar" style={{ scaleY, height: '100%' }} />
      </div>

      {/* Cursor glow */}
      <div
        ref={cursorRef}
        className="cursor-glow"
        style={{ position: 'fixed', pointerEvents: 'none', zIndex: 1 }}
      />

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
      <section id="services">
        <Services />
      </section>
      <section id="careers">
        <Careers />
      </section>
      <section id="salary-pledge">
        <SalaryPledge />
      </section>
      <Footer />
    </main>
  );
}
