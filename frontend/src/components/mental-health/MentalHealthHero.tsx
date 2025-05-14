'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface MentalHealthHeroProps {
  showScrollPrompt: boolean;
}

const MentalHealthHero: React.FC<MentalHealthHeroProps> = ({ showScrollPrompt }) => {
  const controls = useAnimation();
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true });
  
  // Start animations when in view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  // Text animation variants
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };
  
  const letterVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };
  
  // Split text for letter animation
  const titleText = "Privacy-First Mental Health Support";
  const titleLetters = titleText.split("");
  
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center items-center pt-20 pb-20 relative">
      {/* Main content */}
      <div className="container mx-auto px-4 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-block mb-6"
        >
          <span className="py-1 px-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full text-sm text-cyan-300 border border-cyan-500/30">
            AI-Powered | Culturally Adaptive | Secure
          </span>
        </motion.div>
        
        <motion.h1 
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight overflow-hidden"
          variants={titleVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="overflow-hidden py-2">
            {titleLetters.map((letter, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="inline-block"
                style={{ display: letter === " " ? "inline" : "inline-block" }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>
          <div className="overflow-hidden">
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 block mt-2"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
            >
              When You Need It Most
            </motion.span>
          </div>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2 }}
          className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto"
        >
          GuardianLink provides accessible mental health support during crises, 
          with AI coaching that understands your cultural context and language, 
          all while protecting your privacy through encryption.
        </motion.p>
        
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.2 }}
        >
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-700/30 px-8"
          >
            <Link href="#journey">Try Demo</Link>
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-cyan-500 text-cyan-300 hover:bg-cyan-500/20 px-8"
          >
            <Link href="#features">Learn More</Link>
          </Button>
        </motion.div>
      </div>
      
      {/* Brain visualization with pulse effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute right-10 md:right-20 top-1/2 transform -translate-y-1/2 hidden md:block"
      >
        <div className="relative w-64 h-64">
          {/* Brain silhouette */}
          <svg
            width="250"
            height="250"
            viewBox="0 0 250 250"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0"
          >
            <motion.path
              d="M125 25C80 25 40 65 40 110C40 155 80 195 125 195C170 195 210 155 210 110C210 65 170 25 125 25Z"
              stroke="url(#brain-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="transparent"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, delay: 2.5, ease: "easeInOut" }}
            />
            {/* Brain details */}
            <motion.path
              d="M125 40C125 40 110 55 110 70C110 85 125 100 125 115C125 130 110 145 110 160C110 175 125 190 125 190"
              stroke="url(#brain-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="3 3"
              fill="transparent"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, delay: 3, ease: "easeInOut" }}
            />
            <motion.path
              d="M65 90C65 90 95 75 125 75C155 75 185 90 185 90"
              stroke="url(#brain-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="transparent"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 3.2, ease: "easeInOut" }}
            />
            <motion.path
              d="M65 130C65 130 95 145 125 145C155 145 185 130 185 130"
              stroke="url(#brain-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="transparent"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 3.4, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="brain-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A78BFA" />
                <stop offset="100%" stopColor="#22D3EE" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Pulse effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-purple-500/10"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Neural network nodes */}
          {[...Array(8)].map((_, index) => {
            const angle = (index / 8) * Math.PI * 2;
            const x = Math.cos(angle) * 110 + 125;
            const y = Math.sin(angle) * 110 + 125;
            
            return (
              <motion.div
                key={index}
                className="absolute w-3 h-3 bg-purple-500 rounded-full"
                style={{ left: x, top: y }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 3 + index * 0.1, duration: 0.5 }}
              >
                <motion.div
                  className="absolute inset-0 bg-purple-500 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 0, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            );
          })}

          {/* Neural connections */}
          {[...Array(5)].map((_, index) => {
            const startAngle = (index / 5) * Math.PI * 2;
            const endAngle = ((index + 2) / 5) * Math.PI * 2;
            const startX = Math.cos(startAngle) * 110 + 125;
            const startY = Math.sin(startAngle) * 110 + 125;
            const endX = Math.cos(endAngle) * 110 + 125;
            const endY = Math.sin(endAngle) * 110 + 125;
            
            return (
              <svg
                key={`line-${index}`}
                className="absolute inset-0 pointer-events-none"
                width="250"
                height="250"
              >
                <motion.line
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  stroke="url(#brain-gradient)"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ delay: 4 + index * 0.2, duration: 1 }}
                />
              </svg>
            );
          })}
        </div>
      </motion.div>
      
      {/* Scroll indicator */}
      <AnimatedScrollPrompt show={showScrollPrompt} />
    </section>
  );
};

// Animated scroll prompt component
const AnimatedScrollPrompt = ({ show }: { show: boolean }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: show ? 1 : 0 }}
    transition={{ duration: 0.3 }}
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
  >
    <span className="text-sm text-gray-400 mb-2">Scroll to explore</span>
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </motion.div>
  </motion.div>
);

export default MentalHealthHero;