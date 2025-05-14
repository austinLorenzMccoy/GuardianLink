'use client';

import { useEffect, useState, useRef } from 'react';
import { useScroll, useTransform, useSpring } from 'framer-motion';
import { motion } from 'framer-motion';
import BackgroundParticles from '@/components/mental-health/BackgroundParticles';
import MentalHealthHero from '@/components/mental-health/MentalHealthHero';
import MentalHealthJourney from '@/components/mental-health/MentalHealthJourney';
import FeaturesSection from '../../components/mental-health/FeaturesSection';
import Navigation from '@/components/common/Navigation';
import ScrollProgress from '../../components/common/scrollProgress';
import FooterSection from '../../components/Home/FooterSection';
import TestimonialsSection from '../../components/mental-health/TestimonialsSection';
import CTA from '../../components/mental-health/CTA';

export default function MentalHealthPage() {
  // Removed unused state variable
  const [showScrollPrompt, setShowScrollPrompt] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll progress for animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Smoother scroll progress for better animation
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30, 
    restDelta: 0.001 
  });

  // Hide scroll prompt on scroll and detect active section
  useEffect(() => {
    const handleScroll = () => {
      // Hide scroll prompt once user scrolls
      if (window.scrollY > 100) {
        setShowScrollPrompt(false);
      } else {
        setShowScrollPrompt(true);
      }
      
      // We no longer need to track active section since it's not being used
      // If you need this functionality in the future, you can re-implement it
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic background gradient based on scroll position
  const backgroundColor = useTransform(
    smoothProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [
      "linear-gradient(to bottom, #000000, #1a1033)",
      "linear-gradient(to bottom, #1a1033, #281443)",
      "linear-gradient(to bottom, #281443, #32174d)",
      "linear-gradient(to bottom, #32174d, #421e66)",
      "linear-gradient(to bottom, #421e66, #3b1a5c)",
      "linear-gradient(to bottom, #3b1a5c, #1a1033)"
    ]
  );

  return (
    <div ref={containerRef} className="min-h-screen text-white relative">
      {/* Dynamic background gradient */}
      <motion.div 
        className="fixed inset-0 -z-10" 
        style={{ background: backgroundColor }}
      />
      
      {/* Animated background particles */}
      <BackgroundParticles progress={smoothProgress} />
      
      {/* Fixed navigation - Using your existing Navigation component */}
      <Navigation />
      
      {/* Scroll progress indicator - Using your provided ScrollProgress component */}
      <ScrollProgress progress={smoothProgress} />
      
      <main className="relative z-10">
        {/* Hero section with animated prompt */}
        <section id="hero">
          <MentalHealthHero showScrollPrompt={showScrollPrompt} />
        </section>
        
        {/* Mental health journey section */}
        <section id="journey">
          <MentalHealthJourney />
        </section>
        
        {/* Features grid */}
        <section id="features">
          <FeaturesSection />
        </section>
        
        {/* Testimonials */}
        <section id="testimonials">
          <TestimonialsSection />
        </section>
        
        {/* Call to action */}
        <section id="cta">
          <CTA />
        </section>
      </main>
      
      {/* Using your existing Footer component */}
      <FooterSection />
    </div>
  );
}