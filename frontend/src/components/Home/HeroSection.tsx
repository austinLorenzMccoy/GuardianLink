'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation for the particles in the background
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    // Create particles
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 rounded-full bg-cyan-500/30';
      
      // Random position
      particle.style.left = `${Math.random() * containerWidth}px`;
      particle.style.top = `${Math.random() * containerHeight}px`;
      
      // Random animation
      const duration = 5 + Math.random() * 15;
      const delay = Math.random() * 5;
      
      particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
      particle.style.opacity = `${Math.random() * 0.5 + 0.1}`;
      
      container.appendChild(particle);
    }
    
    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center">
      {/* Particle container */}
      <div ref={containerRef} className="absolute inset-0 overflow-hidden">
        {/* Particles will be added here via JavaScript */}
      </div>
      
      {/* Hero content */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  Decentralized Disaster Relief And Mental Health Wellness
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                  Powered by AI
                </span>
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-xl text-gray-300 mb-8">
                GuardianLink connects disaster victims with aid organizations through automated token streams and AI coordination. We're building a more efficient, transparent, and responsive disaster relief system.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-700/30"
              >
                <Link href="/disaster-response">Launch App</Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-cyan-500 text-cyan-300 hover:bg-cyan-500/20"
              >
                <Link href="#how-it-works">Learn More</Link>
              </Button>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Globe visualization */}
            <div className="relative w-full h-[400px] md:h-[500px] bg-black/30 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 relative animate-slow-spin">
                  {/* Simulated disaster points */}
                  <div className="absolute top-1/4 right-0 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
                  <div className="absolute top-2/3 left-1/6 w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
                  <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: "1.5s" }}></div>
                  
                  {/* Aid flow lines */}
                  <div className="absolute w-full h-full">
                    <svg className="w-full h-full" viewBox="0 0 200 200">
                      <path 
                        d="M100,100 Q150,50 180,75" 
                        stroke="url(#blue-gradient)" 
                        strokeWidth="1.5"
                        fill="none" 
                        strokeDasharray="3,3"
                        className="animate-dash"
                      />
                      <path 
                        d="M100,100 Q50,150 25,125" 
                        stroke="url(#cyan-gradient)" 
                        strokeWidth="1.5" 
                        fill="none"
                        strokeDasharray="3,3"
                        className="animate-dash"
                        style={{ animationDelay: "1s" }}
                      />
                      <path 
                        d="M100,100 Q50,50 20,60" 
                        stroke="url(#purple-gradient)" 
                        strokeWidth="1.5" 
                        fill="none"
                        strokeDasharray="3,3"
                        className="animate-dash"
                        style={{ animationDelay: "0.5s" }}
                      />
                      <defs>
                        <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#60A5FA" stopOpacity="1" />
                        </linearGradient>
                        <linearGradient id="cyan-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#22D3EE" stopOpacity="1" />
                        </linearGradient>
                        <linearGradient id="purple-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#A855F7" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#A855F7" stopOpacity="1" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Floating data cards */}
              <div className="absolute top-1/4 right-1/4 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-3 shadow-xl animate-float">
                <div className="text-xs text-cyan-300 mb-1">Active Aid Stream</div>
                <div className="text-sm">Lagos Flood Relief</div>
                <div className="text-xs text-gray-400">2.5 ETH • 25 days</div>
              </div>
              
              <div className="absolute bottom-1/4 left-1/4 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-3 shadow-xl animate-float" style={{ animationDelay: "1s" }}>
                <div className="text-xs text-purple-300 mb-1">Mental Health Support</div>
                <div className="text-sm">Active Sessions: 28</div>
                <div className="text-xs text-gray-400">Privacy Protected</div>
              </div>
            </div>
            
            {/* Stats overlay */}
            <div className="absolute -bottom-5 left-0 right-0 flex justify-center">
              <div className="grid grid-cols-3 gap-4 bg-black/60 backdrop-blur-xl rounded-xl p-4 border border-white/10 shadow-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">$2.8M</div>
                  <div className="text-xs text-gray-400">Aid Distributed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">24</div>
                  <div className="text-xs text-gray-400">Active NGOs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">12K+</div>
                  <div className="text-xs text-gray-400">People Helped</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-sm text-gray-400 mb-2">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </div>
      
      {/* CSS for the animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes dash {
          to {
            stroke-dashoffset: 100;
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-dash {
          animation: dash 10s linear infinite;
        }
        
        .animate-slow-spin {
          animation: spin 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;