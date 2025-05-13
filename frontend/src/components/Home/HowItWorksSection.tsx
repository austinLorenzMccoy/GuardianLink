'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const HowItWorksSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  
  return (
    <section ref={containerRef} id="how-it-works" className="py-20 relative min-h-[80vh] flex items-center">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-500/5 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl"></div>
        </div>
      </div>
      
      <motion.div style={{ opacity, scale }} className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              How GuardianLink Works
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            Our platform connects those in need with those who can help through a secure, transparent, and efficient system.
          </motion.p>
        </div>
        
        <Tabs defaultValue="ngos" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 h-auto bg-black/20 backdrop-blur-md border border-white/10 rounded-lg p-1">
            <TabsTrigger 
              value="ngos" 
              className="py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white data-[state=active]:shadow-none text-gray-400"
            >
              For NGOs & Aid Organizations
            </TabsTrigger>
            <TabsTrigger 
              value="communities" 
              className="py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-emerald-500/20 data-[state=active]:text-white data-[state=active]:shadow-none text-gray-400"
            >
              For Affected Communities
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-8">
            <TabsContent value="ngos" className="mt-0">
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="bg-black/30 border-white/10 backdrop-blur-sm overflow-hidden">
                  <CardContent className="p-6">
                    <div className="rounded-full bg-purple-500/20 w-12 h-12 flex items-center justify-center mb-4">
                      <span className="text-xl font-bold">1</span>
                    </div>
                    <h3 className="text-lg font-medium mb-2 text-white">Connect & Verify</h3>
                    <p className="text-gray-400 text-sm">
                      NGOs connect their MetaMask wallet and complete verification to establish trust and transparency.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-black/30 border-white/10 backdrop-blur-sm overflow-hidden">
                  <CardContent className="p-6">
                    <div className="rounded-full bg-purple-500/20 w-12 h-12 flex items-center justify-center mb-4">
                      <span className="text-xl font-bold">2</span>
                    </div>
                    <h3 className="text-lg font-medium mb-2 text-white">Create Aid Streams</h3>
                    <p className="text-gray-400 text-sm">
                      Set up ERC-7715 aid streams specifying what resources will be provided, how much, and for how long.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-black/30 border-white/10 backdrop-blur-sm overflow-hidden">
                  <CardContent className="p-6">
                    <div className="rounded-full bg-purple-500/20 w-12 h-12 flex items-center justify-center mb-4">
                      <span className="text-xl font-bold">3</span>
                    </div>
                    <h3 className="text-lg font-medium mb-2 text-white">Delegate to AI</h3>
                    <p className="text-gray-400 text-sm">
                      Optionally delegate ERC-7710 permissions to our Gaia AI to automate fund releases based on verified needs.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-8 text-center">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  <Link href="/disaster-response">Register Your Organization</Link>
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="communities" className="mt-0">
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="bg-black/30 border-white/10 backdrop-blur-sm overflow-hidden">
                  <CardContent className="p-6">
                    <div className="rounded-full bg-cyan-500/20 w-12 h-12 flex items-center justify-center mb-4">
                      <span className="text-xl font-bold">1</span>
                    </div>
                    <h3 className="text-lg font-medium mb-2 text-white">Signal Emergency Needs</h3>
                    <p className="text-gray-400 text-sm">
                      Communities can report disasters and specific needs through our mobile-friendly interface.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-black/30 border-white/10 backdrop-blur-sm overflow-hidden">
                  <CardContent className="p-6">
                    <div className="rounded-full bg-cyan-500/20 w-12 h-12 flex items-center justify-center mb-4">
                      <span className="text-xl font-bold">2</span>
                    </div>
                    <h3 className="text-lg font-medium mb-2 text-white">Receive Aid</h3>
                    <p className="text-gray-400 text-sm">
                      Once verified, aid is directed to your community with real-time tracking of resources and delivery.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-black/30 border-white/10 backdrop-blur-sm overflow-hidden">
                  <CardContent className="p-6">
                    <div className="rounded-full bg-cyan-500/20 w-12 h-12 flex items-center justify-center mb-4">
                      <span className="text-xl font-bold">3</span>
                    </div>
                    <h3 className="text-lg font-medium mb-2 text-white">Access Mental Health Support</h3>
                    <p className="text-gray-400 text-sm">
                      Use our AI-powered mental health module for culturally adaptive support in your native language.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-8 text-center">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-700 hover:to-emerald-700 text-white"
                >
                  <Link href="/mental-health">Access Support</Link>
                </Button>
              </div>
            </TabsContent>
          </div>
        </Tabs>
        
        {/* Tech integration illustration */}
        <div className="mt-20 relative">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold mb-2">Powered By Cutting-Edge Technology</h3>
            <p className="text-gray-400">Our platform integrates multiple technologies for a seamless experience</p>
          </div>
          
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl blur-xl"></div>
            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-black/40 backdrop-blur-md rounded-xl border border-white/10">
              <div className="text-center p-4">
                <div className="h-12 w-12 mx-auto mb-3 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="url(#metamask-gradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h16a2 2 0 0 1 1.2.4"/><path d="M2 10h20"/><path d="M12 14v4"/><path d="M12 14h4"/><path d="M12 14h-4"/><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18"/></svg>
                </div>
                <h4 className="text-white font-medium">MetaMask SDK</h4>
                <p className="text-xs text-gray-400 mt-1">Wallet & Delegation</p>
              </div>
              
              <div className="text-center p-4">
                <div className="h-12 w-12 mx-auto mb-3 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="url(#polygon-gradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" x2="9" y1="3" y2="18"/><line x1="15" x2="15" y1="6" y2="21"/></svg>
                </div>
                <h4 className="text-white font-medium">Polygon Mumbai</h4>
                <p className="text-xs text-gray-400 mt-1">Testnet Contracts</p>
              </div>
              
              <div className="text-center p-4">
                <div className="h-12 w-12 mx-auto mb-3 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="url(#gaia-gradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/><path d="M9 9h.01"/><path d="M15 9h.01"/><path d="M8 13h8a4 4 0 1 1-8 0Z"/></svg>
                </div>
                <h4 className="text-white font-medium">Gaia AI</h4>
                <p className="text-xs text-gray-400 mt-1">Disaster & Mental Health</p>
              </div>
              
              <div className="text-center p-4">
                <div className="h-12 w-12 mx-auto mb-3 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="url(#nextjs-gradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12a10 10 0 1 0 20 0 10 10 0 1 0-20 0"/><path d="M12 2v20"/><path d="M2 12h20"/><path d="M12 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M12 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M18 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/></svg>
                </div>
                <h4 className="text-white font-medium">Next.js + Tailwind</h4>
                <p className="text-xs text-gray-400 mt-1">Frontend Framework</p>
              </div>
            </div>
            
            {/* Gradient definitions */}
            <svg width="0" height="0">
              <defs>
                <linearGradient id="metamask-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F6851B" />
                  <stop offset="100%" stopColor="#E2761B" />
                </linearGradient>
                <linearGradient id="polygon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#9F71EC" />
                  <stop offset="100%" stopColor="#7950DD" />
                </linearGradient>
                <linearGradient id="gaia-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="100%" stopColor="#4ADE80" />
                </linearGradient>
                <linearGradient id="nextjs-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#AAAAAA" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HowItWorksSection;