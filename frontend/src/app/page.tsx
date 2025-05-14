'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MetaMaskConnect } from '@/components/common/MetaMaskConnect';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import HeroSection from '../components/Home/HeroSection';
import FeaturesSection from '../components/Home/FeaturesSection';
import PartnersSection from '../components/Home/PartnersSection';
import HowItWorksSection from '../components/Home/HowItWorksSection';
import FooterSection from '../components/Home/FooterSection';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-blue-950 text-white">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 -left-20 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-20 right-1/4 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>
      
      {/* Navbar */}
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
                <NavigationMenuTrigger className="bg-transparent hover:bg-white/10">Solutions</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px] grid-cols-2">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-900/80 to-purple-900/80 p-6 no-underline outline-none focus:shadow-md"
                          href="/disaster-response" passHref
                        >
                          <div className="mb-2 mt-4 text-lg font-medium text-white">
                            Disaster Response
                          </div>
                          <p className="text-sm leading-tight text-white/80">
                            AI-powered decentralized disaster aid coordination with automated fund streams
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <Link href="/mental-health" legacyBehavior passHref>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white">
                          <div className="text-sm font-medium leading-none">Mental Health</div>
                          <p className="line-clamp-2 text-sm leading-snug text-white/70">
                            Privacy-first mental health coaching with cultural adaptability
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link href="#features" legacyBehavior passHref>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white">
                          <div className="text-sm font-medium leading-none">ERC-7715/7710</div>
                          <p className="line-clamp-2 text-sm leading-snug text-white/70">
                            Token streams and delegations for decentralized coordination
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
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
            <Button variant="outline" className="border-purple-500 text-purple-300 hover:bg-purple-500/20 md:flex hidden">
              <Link href="/disaster-response">Launch App</Link>
            </Button>
            
            {/* Mobile menu button - would implement a drawer menu in a real app */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PartnersSection />
      </main>

      <FooterSection />
    </div>
  );
}