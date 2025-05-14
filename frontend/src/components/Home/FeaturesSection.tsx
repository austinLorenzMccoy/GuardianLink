'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  delay: number;
  badge?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon, 
  gradient, 
  delay,
  badge
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } }
      }}
    >
      <Card className="bg-black/30 border-white/10 backdrop-blur-sm h-full overflow-hidden group hover:border-purple-500/50 transition-all duration-300 relative">
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${gradient}`}></div>
        <CardHeader>
          <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-br from-purple-500/20 to-blue-500/20 text-white">
            {icon}
          </div>
          <CardTitle className="text-xl text-white group-hover:text-purple-300 transition-colors duration-300">
            {title}
          </CardTitle>
          {badge && (
            <Badge variant="outline" className="ml-2 text-xs border-cyan-500 text-cyan-400">
              {badge}
            </Badge>
          )}
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-400">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Revolutionizing Disaster Relief
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            Through a powerful combination of blockchain, AI, and decentralized coordination, we&apos;re building a more efficient and transparent disaster response system.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            title="ERC-7715 Aid Streams"
            description="NGOs create tokenized aid bundles that automatically stream funds when IoT sensors and satellite data confirm delivery, ensuring transparency and efficiency."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            }
            gradient="bg-gradient-to-br from-blue-500 to-cyan-500"
            delay={0}
            badge="ERC-7715"
          />
          
          <FeatureCard
            title="AI Delegation Protocol"
            description="MetaMask Delegation allows NGOs to delegate ERC-7710 permissions to Gaia AI, enabling automated decision-making based on real-time disaster data."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v8M4.93 10.93l1.41 1.41M20.14 12.14l-1.42 1.42M12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/></svg>
            }
            gradient="bg-gradient-to-br from-purple-500 to-pink-500"
            delay={0.1}
            badge="ERC-7710"
          />
          
          <FeatureCard
            title="Crisis Dashboard"
            description="Interactive map visualization showing active disasters and aid stream status with real-time updates on fund allocation and impact."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg>
            }
            gradient="bg-gradient-to-br from-cyan-500 to-blue-500"
            delay={0.2}
          />
          
          <FeatureCard
            title="Mental Health Support"
            description="AI-powered mental health coaching with cultural adaptability, providing support in local languages like Swahili, Yoruba, and Hindi."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 7V5H6v2"/><path d="M18 13v-2H6v2"/><path d="M18 19v-2H6v2"/><path d="M8 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/><path d="M16 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/><path d="M8 17a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/></svg>
            }
            gradient="bg-gradient-to-br from-green-500 to-emerald-500"
            delay={0.3}
          />
          
          <FeatureCard
            title="Privacy-First Design"
            description="Encrypted chat logs stored on IPFS ensure user privacy and data security, particularly important for sensitive mental health conversations."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            }
            gradient="bg-gradient-to-br from-indigo-500 to-purple-500"
            delay={0.4}
          />
          
          <FeatureCard
            title="Transparent Auditing"
            description="All aid transactions are recorded on the blockchain, creating a transparent, immutable record of fund allocation and utilization."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7h-3a2 2 0 0 0-2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.69.9H18a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"/><path d="M9 14v-3"/><path d="M12 14v-1"/><path d="M15 14v-3"/></svg>
            }
            gradient="bg-gradient-to-br from-amber-500 to-orange-500"
            delay={0.5}
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;