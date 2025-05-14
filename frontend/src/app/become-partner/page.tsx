'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Check, ArrowLeft } from 'lucide-react';

export default function BecomePartnerPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // For partner logos animation
  const containerRef = useRef<HTMLDivElement>(null);
  const containerRef2 = useRef<HTMLDivElement>(null);
  const controls1 = useAnimation();
  const controls2 = useAnimation();
  
  // Partner logos - replace with actual logos in your project
  const partners = [
    { name: 'MetaMask', logo: '/api/placeholder/150/60', darkLogo: true },
    { name: 'ALX', logo: '/api/placeholder/120/60', darkLogo: false },
    { name: 'WHO', logo: '/api/placeholder/120/60', darkLogo: false },
    { name: 'MentalHealthNIG', logo: '/public/Mental.png', darkLogo: true },
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
  
  // Set up rotating logos animation
  useEffect(() => {
    // Only run animation if not in reduced motion mode
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion && containerRef.current && containerRef2.current) {
      // First row animation
      const firstRowAnimation = async () => {
        await controls1.start({
          x: '-100%',
          transition: { duration: 25, ease: 'linear' }
        });
        controls1.set({ x: '100%' });
        firstRowAnimation();
      };
      
      // Second row animation (opposite direction)
      const secondRowAnimation = async () => {
        await controls2.start({
          x: '100%',
          transition: { duration: 30, ease: 'linear' }
        });
        controls2.set({ x: '-100%' });
        secondRowAnimation();
      };
      
      firstRowAnimation();
      secondRowAnimation();
    }
    
    return () => {
      controls1.stop();
      controls2.stop();
    };
  }, [controls1, controls2]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real implementation, you would submit the form data to your API
    // const formData = new FormData(e.target as HTMLFormElement);
    // const response = await fetch('/api/partner-application', {
    //   method: 'POST',
    //   body: formData
    // });
    
    setSubmitting(false);
    setSubmitted(true);
  };
  
  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Background gradients */}
      <div className="fixed top-1/4 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10" />
      <div className="fixed bottom-1/3 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl -z-10" />
      
      {/* Partner logos showcase */}
      <div className="relative overflow-hidden w-full pt-24 pb-6 mb-8 bg-gradient-to-b from-black to-purple-950/20">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300">
            TRUSTED BY LEADING ORGANIZATIONS
          </h2>
        </div>
        
        {/* First row of logos - left to right */}
        <div className="relative overflow-hidden w-full mb-8 h-20">
          <motion.div
            ref={containerRef}
            animate={controls1}
            initial={{ x: '100%' }}
            className="flex items-center space-x-12 absolute"
          >
            {[...partners, ...partners].map((partner, index) => (
              <div 
                key={`partner1-${index}`} 
                className={`flex-shrink-0 py-3 px-5 rounded-lg ${partner.darkLogo ? 'bg-white/5 backdrop-blur-sm' : ''} h-20 flex items-center justify-center group transition-all duration-300 hover:bg-white/10 border border-transparent hover:border-purple-500/30`}
              >
                <div className="relative w-auto h-10">
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
        </div>
        
        {/* Second row of logos - right to left */}
        <div className="relative overflow-hidden w-full h-20">
          <motion.div
            ref={containerRef2}
            animate={controls2}
            initial={{ x: '-100%' }}
            className="flex items-center space-x-12 absolute"
          >
            {[...partners2, ...partners2].map((partner, index) => (
              <div 
                key={`partner2-${index}`} 
                className={`flex-shrink-0 py-3 px-5 rounded-lg ${partner.darkLogo ? 'bg-white/5 backdrop-blur-sm' : ''} h-20 flex items-center justify-center group transition-all duration-300 hover:bg-white/10 border border-transparent hover:border-purple-500/30`}
              >
                <div className="relative w-auto h-10">
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
        </div>
        
        {/* Gradient fade effect on the sides */}
        <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
      </div>
      
      <div className="container mx-auto px-4 pt-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          {/* Back button */}
          <Button
            variant="ghost"
            className="mb-8 text-purple-300 hover:text-purple-200 hover:bg-purple-900/20"
            onClick={() => router.back()}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Button>
          
          {submitted ? (
            <SuccessMessage />
          ) : (
            <>
              <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-300 mb-4">
                  Become a GuardianLink Partner
                </h1>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                  Join our global network of organizations bringing mental health support
                  to communities during crisis situations.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-black/70 to-purple-950/50 rounded-xl border border-purple-500/30 p-8 shadow-xl backdrop-blur-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Organization Info */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-white border-b border-purple-500/30 pb-2">
                      Organization Information
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="orgName">Organization Name *</Label>
                        <Input 
                          id="orgName"
                          name="orgName"
                          required
                          placeholder="e.g., Mental Health Foundation"
                          className="bg-black/50 border-purple-500/30 text-white"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input 
                          id="website"
                          name="website"
                          type="url"
                          placeholder="https://www.example.org"
                          className="bg-black/50 border-purple-500/30 text-white"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="orgType">Organization Type *</Label>
                      <Select name="orgType" required defaultValue="">
                        <SelectTrigger className="bg-black/50 border-purple-500/30 text-white">
                          <SelectValue placeholder="Select organization type" />
                        </SelectTrigger>
                        <SelectContent className="bg-black/95 border-purple-500/30 text-white">
                          <SelectItem value="non-profit">Non-profit</SelectItem>
                          <SelectItem value="ngo">NGO</SelectItem>
                          <SelectItem value="government">Government</SelectItem>
                          <SelectItem value="healthcare">Healthcare Provider</SelectItem>
                          <SelectItem value="tech">Tech Company</SelectItem>
                          <SelectItem value="educational">Educational Institution</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {/* Contact Info */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-white border-b border-purple-500/30 pb-2">
                      Contact Information
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="contactName">Contact Name *</Label>
                        <Input 
                          id="contactName"
                          name="contactName"
                          required
                          placeholder="Full name"
                          className="bg-black/50 border-purple-500/30 text-white"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="jobTitle">Job Title *</Label>
                        <Input 
                          id="jobTitle"
                          name="jobTitle"
                          required
                          placeholder="e.g., Partnership Director"
                          className="bg-black/50 border-purple-500/30 text-white"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input 
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="name@organization.org"
                          className="bg-black/50 border-purple-500/30 text-white"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+1 (123) 456-7890"
                          className="bg-black/50 border-purple-500/30 text-white"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Partnership Info */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-white border-b border-purple-500/30 pb-2">
                      Partnership Details
                    </h2>
                    
                    <div className="space-y-2">
                      <Label htmlFor="partnershipType">Partnership Interest *</Label>
                      <Select name="partnershipType" required defaultValue="">
                        <SelectTrigger className="bg-black/50 border-purple-500/30 text-white">
                          <SelectValue placeholder="Select partnership type" />
                        </SelectTrigger>
                        <SelectContent className="bg-black/95 border-purple-500/30 text-white">
                          <SelectItem value="technical">Technical Integration</SelectItem>
                          <SelectItem value="funding">Funding Partner</SelectItem>
                          <SelectItem value="deployment">Deployment Partner</SelectItem>
                          <SelectItem value="research">Research Collaboration</SelectItem>
                          <SelectItem value="distribution">Distribution Partner</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">How do you envision the partnership? *</Label>
                      <Textarea 
                        id="message"
                        name="message"
                        required
                        placeholder="Please describe how you see your organization collaborating with GuardianLink..."
                        className="bg-black/50 border-purple-500/30 text-white min-h-32"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="region">Primary Region of Operation *</Label>
                      <Select name="region" required defaultValue="">
                        <SelectTrigger className="bg-black/50 border-purple-500/30 text-white">
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent className="bg-black/95 border-purple-500/30 text-white">
                          <SelectItem value="africa">Africa</SelectItem>
                          <SelectItem value="asia">Asia</SelectItem>
                          <SelectItem value="europe">Europe</SelectItem>
                          <SelectItem value="north-america">North America</SelectItem>
                          <SelectItem value="south-america">South America</SelectItem>
                          <SelectItem value="oceania">Oceania</SelectItem>
                          <SelectItem value="global">Global</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-700/30"
                    >
                      {submitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        'Submit Application'
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// Success message component
const SuccessMessage = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="bg-gradient-to-br from-black/70 to-purple-950/50 rounded-xl border border-purple-500/30 p-8 shadow-xl backdrop-blur-sm text-center"
  >
    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
      <Check size={30} className="text-green-400" />
    </div>
    
    <h2 className="text-2xl font-bold text-white mb-4">
      Application Submitted!
    </h2>
    
    <p className="text-gray-300 mb-6">
      Thank you for your interest in partnering with GuardianLink. Our team will review your 
      application and reach out to you within 3-5 business days.
    </p>
    
    <div className="bg-purple-900/30 rounded-lg p-4 max-w-lg mx-auto">
      <p className="text-purple-300 text-sm">
        <strong>What's next?</strong> Our partnership team will evaluate how we can collaborate 
        most effectively to bring mental health support to communities in crisis.
      </p>
    </div>
    
    <div className="mt-8">
      <Button
        onClick={() => window.location.href = '/'}
        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
      >
        Return to Home
      </Button>
    </div>
  </motion.div>
);