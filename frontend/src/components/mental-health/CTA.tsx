'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Shield, CreditCard, MessageSquare } from 'lucide-react';
import Link from 'next/link';

const CTA = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  return (
    <div ref={sectionRef} className="relative py-20 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/0 via-purple-900/10 to-purple-900/5 -z-10" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-purple-500/5 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 rounded-xl backdrop-blur-sm border border-purple-500/30 shadow-xl overflow-hidden"
        >
          <div className="relative p-8 md:p-12">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full translate-y-1/3 -translate-x-1/3 blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 md:pr-8 text-center md:text-left">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300"
                >
                  Start Your Mental Health Journey Today
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto md:mx-0"
                >
                  Access personalized mental health support with our privacy-first AI coach. 
                  Get started in minutes with MetaMask wallet integration and flexible subscription options.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-wrap justify-center md:justify-start gap-4 mb-8 md:mb-0"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg shadow-lg shadow-purple-600/20 flex items-center"
                  >
                    Connect Wallet
                    <Shield className="ml-2" size={18} />
                  </motion.button>
                  
                  <Link href="#journey" className="inline-block">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-transparent border border-purple-500 text-purple-300 hover:bg-purple-900/30 font-medium rounded-lg flex items-center"
                    >
                      Learn More
                      <ArrowRight className="ml-2" size={18} />
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
              
              <div className="md:w-1/3 mt-8 md:mt-0">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-lg border border-purple-500/30 p-6 shadow-lg"
                >
                  <h3 className="font-bold text-xl mb-4 text-white">Getting Started</h3>
                  
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="bg-purple-600/20 p-2 rounded mr-3 mt-1">
                        <Shield size={18} className="text-purple-300" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Connect MetaMask</h4>
                        <p className="text-gray-400 text-sm">Secure and private access with your existing wallet</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="bg-purple-600/20 p-2 rounded mr-3 mt-1">
                        <CreditCard size={18} className="text-purple-300" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Choose Subscription</h4>
                        <p className="text-gray-400 text-sm">Flexible payment with ERC-7715 token streams</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="bg-purple-600/20 p-2 rounded mr-3 mt-1">
                        <MessageSquare size={18} className="text-purple-300" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Start Chatting</h4>
                        <p className="text-gray-400 text-sm">Immediate access to your AI mental health coach</p>
                      </div>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CTA;