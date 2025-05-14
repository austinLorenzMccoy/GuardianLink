'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Shield, 
  MessageSquare, 
  Key, 
  CreditCard, 
  RefreshCw, 
  ChevronRight,
  Brain,
  Globe,
  Lock
} from 'lucide-react';
import MentalHealthChatbot from './MentalHealthChatbot';

// Journey step component
const JourneyStep = ({ icon: Icon, title, description, isLast = false, active = false }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  return (
    <div className="flex items-start" ref={ref}>
      <motion.div 
        className="flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <motion.div 
          className={`p-3 rounded-full flex items-center justify-center ${
            active 
              ? "bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-600/20" 
              : "bg-purple-900/30 border border-purple-500/30"
          }`}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          <Icon className={`${active ? "text-white" : "text-purple-300"}`} size={24} />
        </motion.div>
        
        {/* Connecting line if not the last item */}
        {!isLast && (
          <motion.div 
            className="w-0.5 h-16 bg-gradient-to-b from-purple-500/50 to-blue-500/30 mt-2"
            initial={{ height: 0 }}
            animate={isInView ? { height: 64 } : { height: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />
        )}
      </motion.div>
      
      <motion.div 
        className="ml-4 pb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className={`font-medium text-lg ${active ? "text-white" : "text-gray-200"}`}>
          {title}
        </h3>
        <p className={`mt-1 ${active ? "text-gray-200" : "text-gray-400"}`}>
          {description}
        </p>
      </motion.div>
    </div>
  );
};

const MentalHealthJourney = () => {
  const [showChat, setShowChat] = useState(false);
  const [activeStep, setActiveStep] = useState(2); // Default to the "Chat with Gaia AI" step
  
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true });
  
  // Animation for the brain visualization
  const brainCirclesPositions = [
    { x: 60, y: 30 },
    { x: 120, y: 20 },
    { x: 180, y: 40 },
    { x: 210, y: 90 },
    { x: 180, y: 140 },
    { x: 120, y: 160 },
    { x: 60, y: 130 },
    { x: 30, y: 80 },
  ];
  
  // Animation for the text reveal effect
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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
  const titleText = "Your Mental Health Support Journey";
  const titleLetters = titleText.split("");
  
  return (
    <div className="relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block py-1 px-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full text-sm text-purple-300 border border-purple-500/30 mb-4"
          >
            AI-Powered | Culturally Adaptive | Secure
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
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            GuardianLink provides accessible mental health support with AI coaching that understands your cultural context and language, all while protecting your privacy through encryption and blockchain technology.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:order-2">
            {showChat ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 p-6 rounded-lg backdrop-blur-sm border border-purple-500/20 shadow-lg shadow-purple-500/5 h-[600px]"
              >
                <MentalHealthChatbot />
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="h-[600px] w-full relative rounded-lg overflow-hidden bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/20 shadow-lg shadow-purple-500/5 flex flex-col items-center justify-center p-8"
              >
                {/* Brain visualization */}
                <div className="relative w-72 h-72 mb-6">
                  {/* Brain outer circle */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                  >
                    <svg
                      width="290"
                      height="290"
                      viewBox="0 0 290 290"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                      <motion.path
                        d="M145 30C90 30 40 80 40 135C40 190 90 240 145 240C200 240 250 190 250 135C250 80 200 30 145 30Z"
                        stroke="url(#brain-gradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="transparent"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                      />
                      {/* Brain details */}
                      <motion.path
                        d="M145 50C145 50 125 70 125 90C125 110 145 130 145 150C145 170 125 190 125 215C125 240 145 255 145 255"
                        stroke="url(#brain-gradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray="4 4"
                        fill="transparent"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 3, delay: 0.3, ease: "easeInOut" }}
                      />
                      <motion.path
                        d="M75 105C75 105 110 88 145 88C180 88 215 105 215 105"
                        stroke="url(#brain-gradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="transparent"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 0.6, ease: "easeInOut" }}
                      />
                      <motion.path
                        d="M75 165C75 165 110 182 145 182C180 182 215 165 215 165"
                        stroke="url(#brain-gradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="transparent"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 0.9, ease: "easeInOut" }}
                      />
                      <defs>
                        <linearGradient id="brain-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#A78BFA" />
                          <stop offset="100%" stopColor="#22D3EE" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </motion.div>
                  
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
                  {brainCirclesPositions.map((pos, index) => (
                    <motion.div
                      key={index}
                      className="absolute w-3 h-3 bg-purple-500 rounded-full"
                      style={{ left: pos.x, top: pos.y }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
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
                  ))}
                  
                  {/* Neural connections */}
                  {[0, 1, 2, 3, 4].map((index) => {
                    const startIdx = index;
                    const endIdx = (index + 2) % brainCirclesPositions.length;
                    const start = brainCirclesPositions[startIdx];
                    const end = brainCirclesPositions[endIdx];
                    
                    return (
                      <svg
                        key={`line-${index}`}
                        className="absolute inset-0 pointer-events-none"
                        width="290"
                        height="290"
                      >
                        <motion.line
                          x1={start.x}
                          y1={start.y}
                          x2={end.x}
                          y2={end.y}
                          stroke="url(#brain-gradient)"
                          strokeWidth="1"
                          strokeDasharray="3 3"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 0.6 }}
                          transition={{ delay: 2 + index * 0.2, duration: 1 }}
                        />
                      </svg>
                    );
                  })}
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300">
                  AI Mental Health Coach
                </h3>
                <p className="text-gray-300 text-center mb-8">
                  Experience our privacy-first mental health chatbot with multicultural and multilingual capabilities.
                </p>
                <motion.button
                  onClick={() => setShowChat(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg shadow-lg shadow-purple-500/20 flex items-center transition-all duration-300"
                >
                  <MessageSquare className="mr-2" size={18} />
                  Launch Demo
                </motion.button>
              </motion.div>
            )}
          </div>
          
          <div className="space-y-6 lg:pr-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 p-6 rounded-lg backdrop-blur-sm border border-purple-500/20 shadow-lg shadow-purple-500/5 mb-8">
                <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300">
                  How It Works
                </h3>
                
                <div className="mt-6">
                  <JourneyStep 
                    icon={Shield}
                    title="Connect Your Wallet"
                    description="Securely connect your MetaMask wallet to access the platform while maintaining full control of your identity."
                    active={activeStep === 0}
                  />
                  
                  <JourneyStep 
                    icon={CreditCard}
                    title="Subscribe with ERC-7715"
                    description="Set up an automatic token stream (e.g., 0.1 ETH/week) to access continuous mental health support."
                    active={activeStep === 1}
                  />
                  
                  <JourneyStep 
                    icon={MessageSquare}
                    title="Chat with Gaia AI"
                    description="Connect with our culturally adaptive AI that responds in your preferred language and understands local contexts."
                    active={activeStep === 2}
                  />
                  
                  <JourneyStep 
                    icon={Key}
                    title="Private by Design"
                    description="All conversations are encrypted and stored on IPFS. Only you have the keys to access your chat history."
                    active={activeStep === 3}
                  />
                  
                  <JourneyStep 
                    icon={RefreshCw}
                    title="Continuous Support"
                    description="The AI learns from your interactions to provide increasingly personalized support as your subscription continues."
                    isLast={true}
                    active={activeStep === 4}
                  />
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 p-6 rounded-lg backdrop-blur-sm border border-purple-500/20 shadow-lg shadow-purple-500/5">
                <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300">
                  Key Features
                </h3>
                
                <div className="grid grid-cols-1 gap-4 mt-4">
                  <div className="flex items-start">
                    <div className="bg-purple-900/30 p-2 rounded-lg mr-3">
                      <Globe className="text-purple-300" size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Multilingual Support</h4>
                      <p className="text-gray-400 text-sm">AI coach adapts to your language and cultural context (English, Swahili, Hindi, Yoruba)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-purple-900/30 p-2 rounded-lg mr-3">
                      <Brain className="text-purple-300" size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">AI-Powered Coaching</h4>
                      <p className="text-gray-400 text-sm">Powered by Gaia AI for personalized mental health support during crises</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-purple-900/30 p-2 rounded-lg mr-3">
                      <Lock className="text-purple-300" size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">End-to-End Encryption</h4>
                      <p className="text-gray-400 text-sm">All conversations are encrypted and stored on IPFS for maximum privacy</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-purple-900/30 p-2 rounded-lg mr-3">
                      <CreditCard className="text-purple-300" size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Tokenized Sessions</h4>
                      <p className="text-gray-400 text-sm">Subscribe via ERC-7715 token streams for seamless payment and access</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6"
            >
              <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-6 rounded-lg shadow-sm border border-purple-500/30">
                <div className="flex flex-col sm:flex-row items-center">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-full p-3 sm:mr-4 mb-4 sm:mb-0 shadow-lg shadow-purple-600/20">
                    <MessageSquare className="text-white" size={24} />
                  </div>
                  <div className="text-center sm:text-left mb-4 sm:mb-0">
                    <h3 className="font-medium text-white">Ready to start your journey?</h3>
                    <p className="text-gray-300 mt-1">Connect your wallet and begin your first session today.</p>
                  </div>
                  <motion.button 
                    onClick={() => setShowChat(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="sm:ml-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2 px-4 rounded-md flex items-center shadow-lg shadow-purple-600/20"
                  >
                    <span>Try Demo</span>
                    <ChevronRight size={16} className="ml-1" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentalHealthJourney;