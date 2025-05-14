'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MetaMaskConnect } from '@/components/common/MetaMaskConnect';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants for dropdown content
  const dropdownVariants = {
    hidden: { 
      opacity: 0,
      y: -5,
      transition: {
        duration: 0.2
      }
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Animation variants for menu items (staggered children)
  const menuItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (custom) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: custom * 0.05,
        duration: 0.3
      }
    })
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            GuardianLink<span className="text-cyan-400">⚡</span>
          </div>
        </Link>
        
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-white/10 data-[state=open]:bg-purple-900/20 data-[state=open]:text-purple-300 transition-all duration-300">
                Solutions
              </NavigationMenuTrigger>
              <NavigationMenuContent className="animate-in" asChild>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={dropdownVariants}
                  className="bg-gradient-to-b from-black/95 to-purple-950/95 backdrop-blur-md rounded-lg border border-purple-500/20 shadow-lg shadow-purple-500/10"
                >
                  <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px] grid-cols-2">
                    <motion.li 
                      className="row-span-3"
                      variants={menuItemVariants}
                      custom={0}
                    >
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-900/80 to-purple-900/80 p-6 no-underline outline-none focus:shadow-md border border-white/5 hover:border-purple-500/30 transition-all duration-300 shadow-inner shadow-blue-500/10"
                          href="/disaster-response"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium text-white">
                            Disaster Response
                          </div>
                          <p className="text-sm leading-tight text-white/80">
                            AI-powered decentralized disaster aid coordination with automated fund streams
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </motion.li>
                    <motion.li
                      variants={menuItemVariants}
                      custom={1}
                    >
                      <Link href="/mental-health" legacyBehavior passHref>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:border hover:border-purple-500/20 hover:text-white focus:bg-white/10 focus:text-white">
                          <div className="text-sm font-medium leading-none">Mental Health</div>
                          <p className="line-clamp-2 text-sm leading-snug text-white/70">
                            Privacy-first mental health coaching with cultural adaptability
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </motion.li>
                    <motion.li
                      variants={menuItemVariants}
                      custom={2}
                    >
                      <Link href="#features" legacyBehavior passHref>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:border hover:border-purple-500/20 hover:text-white focus:bg-white/10 focus:text-white">
                          <div className="text-sm font-medium leading-none">ERC-7715/7710</div>
                          <p className="line-clamp-2 text-sm leading-snug text-white/70">
                            Token streams and delegations for decentralized coordination
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </motion.li>
                  </ul>
                </motion.div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/become-partner" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle({ className: "bg-transparent hover:bg-white/10" })}>
                  Partners
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="#how-it-works" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle({ className: "bg-transparent hover:bg-white/10" })}>
                  How It Works
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        <div className="flex items-center gap-4">
          <MetaMaskConnect />
          <Button 
            variant="outline" 
            className="border-purple-500 text-purple-300 hover:bg-purple-500/20 md:flex hidden"
          >
            <Link href="/disaster-response">Launch App</Link>
          </Button>
          
          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </Button>
        </div>
      </div>

      {/* Mobile Menu with Animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gradient-to-b from-black/95 to-purple-950/90 backdrop-blur-md border-b border-purple-500/20"
          >
            <motion.div 
              className="p-4 space-y-3"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.07
                  }
                }
              }}
            >
              <motion.div variants={menuItemVariants} custom={0}>
                <Link 
                  href="/disaster-response" 
                  className="block py-2 px-4 hover:bg-white/10 rounded-md border border-transparent hover:border-purple-500/20 transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Disaster Response
                </Link>
              </motion.div>
              
              <motion.div variants={menuItemVariants} custom={1}>
                <Link 
                  href="/mental-health" 
                  className="block py-2 px-4 hover:bg-white/10 rounded-md border border-transparent hover:border-purple-500/20 transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Mental Health
                </Link>
              </motion.div>
              
              <motion.div variants={menuItemVariants} custom={2}>
                <Link 
                  href="#features" 
                  className="block py-2 px-4 hover:bg-white/10 rounded-md border border-transparent hover:border-purple-500/20 transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </Link>
              </motion.div>
              
              <motion.div variants={menuItemVariants} custom={3}>
                <Link 
                  href="/become-partner" 
                  className="block py-2 px-4 hover:bg-white/10 rounded-md border border-transparent hover:border-purple-500/20 transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Partners
                </Link>
              </motion.div>
              
              <motion.div variants={menuItemVariants} custom={4}>
                <Link 
                  href="#how-it-works" 
                  className="block py-2 px-4 hover:bg-white/10 rounded-md border border-transparent hover:border-purple-500/20 transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  How It Works
                </Link>
              </motion.div>
              
              <motion.div variants={menuItemVariants} custom={5} className="pt-2">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-500/20 transition-all duration-300">
                  <Link href="/disaster-response" onClick={() => setMobileMenuOpen(false)}>
                    Launch App
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navigation;