'use client';

import {  useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Brain, 
  Globe, 
  Lock, 
  CreditCard, 
  ChevronRight, 
  Heart, 
  Network
} from 'lucide-react';

// Single feature card component
const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  gradient 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
  gradient: string;
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
      className={`${gradient} rounded-lg backdrop-blur-sm border border-purple-500/20 shadow-lg overflow-hidden`}
    >
      <div className="p-6">
        <Icon className="w-8 h-8 text-white mb-4" />
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
};

// Section title with animation
const SectionTitle = ({ 
  title, 
  subtitle 
}: { 
  title: string; 
  subtitle: string;
}) => {
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true });
  
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
  const titleLetters = title.split("");
  
  return (
    <div className="text-center mb-16">
      <motion.span
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-block py-1 px-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full text-sm text-purple-300 border border-purple-500/30 mb-4"
      >
        {subtitle}
      </motion.span>
      
      <motion.h2 
        ref={titleRef}
        variants={titleVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="text-3xl md:text-4xl font-bold mb-8 overflow-hidden bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-300"
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
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <div className="relative py-16 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Privacy-First Mental Health Technology" 
          subtitle="Advanced Features" 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Main features */}
          <FeatureCard 
            icon={Brain}
            title="AI-Powered Coaching"
            description="Our Gaia AI model provides personalized mental health support during crisis periods, offering coping strategies tailored to your needs."
            gradient="bg-gradient-to-r from-purple-600 to-indigo-600"
          />
          
          <FeatureCard 
            icon={Globe}
            title="Multilingual Support"
            description="Our AI coach adapts to your language and cultural context, currently supporting English, Swahili, Hindi, and Yoruba."
            gradient="bg-gradient-to-r from-blue-600 to-cyan-600"
          />
          
          <FeatureCard 
            icon={Lock}
            title="End-to-End Encryption"
            description="All conversations are encrypted and stored on IPFS. Only you have the keys to access your chat history, ensuring complete privacy."
            gradient="bg-gradient-to-r from-indigo-600 to-purple-600"
          />
          
          <FeatureCard 
            icon={CreditCard}
            title="Tokenized Sessions"
            description="Subscribe via ERC-7715 token streams for seamless micropayments. Set up automatic payments to access continuous mental health support."
            gradient="bg-gradient-to-r from-cyan-600 to-blue-600"
          />
          
          <FeatureCard 
            icon={Heart}
            title="Culturally Adaptive"
            description="Our AI understands cultural nuances and local expressions, providing more relevant support based on your background and region."
            gradient="bg-gradient-to-r from-pink-600 to-purple-600"
          />
          
          <FeatureCard 
            icon={Network}
            title="Decentralized Architecture"
            description="Built on blockchain technology to ensure high availability during crisis periods, even when traditional infrastructure is compromised."
            gradient="bg-gradient-to-r from-blue-600 to-indigo-600"
          />
        </div>
        
        {/* Learn more button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg shadow-lg shadow-purple-500/20 flex items-center transition-all duration-300"
          >
            Learn More About Our Technology
            <ChevronRight className="ml-2" size={18} />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturesSection;