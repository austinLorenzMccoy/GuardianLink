'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const PartnersSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Logos rotation animation based on scroll
  const xPositionFirst = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const xPositionSecond = useTransform(scrollYProgress, [0, 1], [100, -100]);
  
  // Partner logos - replace with actual logos in your project
  const partners = [
    { name: 'MetaMask', logo: '/api/placeholder/150/60', darkLogo: true },
    { name: 'ALX', logo: '/api/placeholder/120/60', darkLogo: false },
    { name: 'WHO', logo: '/api/placeholder/120/60', darkLogo: false },
    { name: 'MentalHealthNIG', logo: '/api/placeholder/180/60', darkLogo: true },
    { name: 'IPFS', logo: '/api/placeholder/100/60', darkLogo: false },
    { name: 'Polygon', logo: '/api/placeholder/150/60', darkLogo: true },
  ];
  
  const partners2 = [
    { name: 'Gaia AI', logo: '/api/placeholder/140/60', darkLogo: false },
    { name: 'EthGlobal', logo: '/api/placeholder/150/60', darkLogo: true },
    { name: 'Consensys', logo: '/api/placeholder/170/60', darkLogo: false },
    { name: 'UN Crisis Response', logo: '/api/placeholder/200/60', darkLogo: true },
    { name: 'TherapyDAO', logo: '/api/placeholder/150/60', darkLogo: false },
  ];
  
  // Animation variants for text reveal
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
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
  const titleText = "Trusted by Global Partners";
  const titleLetters = titleText.split("");
  
  return (
    <section 
      id="partners" 
      ref={sectionRef} 
      className="py-16 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="inline-block py-1 px-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full text-sm text-purple-300 border border-purple-500/30 mb-4"
          >
            Global Collaboration
          </motion.span>
          
          <motion.h2 
            variants={titleVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-3xl md:text-4xl font-bold mb-4 overflow-hidden bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-300"
          >
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
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            Working with leading organizations worldwide to provide accessible 
            mental health support during crisis situations.
          </motion.p>
        </div>
        
        {/* Logos section with horizontal scroll animation */}
        <div className="relative overflow-hidden mb-16">
          {/* First row of logos moving left to right */}
          <motion.div 
            style={{ x: xPositionFirst }}
            className="flex space-x-12 mb-10 items-center"
          >
            {partners.map((partner, index) => (
              <div 
                key={`partner1-${index}`} 
                className={`flex-shrink-0 py-4 px-6 rounded-lg ${partner.darkLogo ? 'bg-white/5 backdrop-blur-sm' : ''} h-24 flex items-center justify-center group transition-all duration-300 hover:bg-white/10 border border-transparent hover:border-purple-500/30`}
              >
                <div className="relative w-auto h-12">
                  <Image 
                    src={partner.logo} 
                    alt={partner.name} 
                    width={150}
                    height={60}
                    className="object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </motion.div>
          
          {/* Second row of logos moving right to left */}
          <motion.div 
            style={{ x: xPositionSecond }}
            className="flex space-x-12 items-center"
          >
            {partners2.map((partner, index) => (
              <div 
                key={`partner2-${index}`} 
                className={`flex-shrink-0 py-4 px-6 rounded-lg ${partner.darkLogo ? 'bg-white/5 backdrop-blur-sm' : ''} h-24 flex items-center justify-center group transition-all duration-300 hover:bg-white/10 border border-transparent hover:border-purple-500/30`}
              >
                <div className="relative w-auto h-12">
                  <Image 
                    src={partner.logo} 
                    alt={partner.name} 
                    width={150}
                    height={60}
                    className="object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </motion.div>
          
          {/* Gradient fade effect on the sides */}
          <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
          <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
        </div>
        
        {/* CTA section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-br from-black/70 to-purple-950/50 rounded-xl backdrop-blur-sm border border-purple-500/30 shadow-xl p-8 md:p-12 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-300">
              Join Our Mission
            </h3>
            
            <p className="text-gray-300 mb-8">
              Partner with GuardianLink to make mental health support accessible during crises.
              Together, we can help communities worldwide recover and build resilience.
            </p>
            
            <Link href="/become-partner">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-700/30 px-8"
              >
                Become a Partner
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;