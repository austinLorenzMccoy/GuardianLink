'use client';

import { motion } from 'framer-motion';

// Mock partner logos
const partners = [
  {
    name: 'MetaMask',
    logo: (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 212 189" fill="none">
        <g clipPath="url(#clip0_1_70)">
          <path d="M201.874 0L118.323 58.0685L133.229 26.3959L201.874 0Z" fill="#E2761B" stroke="#E2761B" strokeWidth="0.100208" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10.0638 0L93.0323 58.5747L78.7717 26.3959L10.0638 0Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.100208" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M172.698 135.298L151.154 166.46L197.318 178.227L210.6 135.804L172.698 135.298Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.100208" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M1.4469 135.804L14.6823 178.227L60.8461 166.46L39.3024 135.298L1.4469 135.804Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.100208" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M58.5323 83.0687L45.8031 101.225L91.5615 103.082L90.0677 54.3657L58.5323 83.0687Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.100208" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M153.406 83.0688L121.465 53.8595L120.323 103.082L166.031 101.225L153.406 83.0688Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.100208" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M60.8461 166.46L88.8303 153.907L64.9323 136.107L60.8461 166.46Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.100208" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M123.108 153.907L151.154 166.46L147.006 136.107L123.108 153.907Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.100208" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        <defs>
          <clipPath id="clip0_1_70">
            <rect width="212" height="189" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    ),
    description: 'Wallet & Delegation SDK',
  },
  {
    name: 'Polygon',
    logo: (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 38 33" fill="none">
        <path d="M25.7435 13.1786C25.2539 12.9042 24.6347 12.9042 24.0683 13.1786L19.6381 15.8055L16.6649 17.3863L12.2347 20.0131C11.7451 20.2875 11.1259 20.2875 10.5594 20.0131L7.15348 18.0211C6.66391 17.7466 6.32293 17.1978 6.32293 16.6489V12.7377C6.32293 12.1889 6.60675 11.64 7.15348 11.3656L10.5122 9.37358C11.0018 9.09914 11.621 9.09914 12.1875 9.37358L15.5462 11.3656C16.0358 11.64 16.3767 12.1889 16.3767 12.7377V15.3653L19.3499 13.7296V11.102C19.3499 10.5532 19.0661 10.0043 18.5194 9.72987L12.2347 6.09338C11.7451 5.81894 11.1259 5.81894 10.5594 6.09338L4.13201 9.72987C3.58528 10.0043 3.30145 10.5532 3.30145 11.102V18.2842C3.30145 18.833 3.58528 19.3818 4.13201 19.6563L10.5594 23.2928C11.0489 23.5672 11.6682 23.5672 12.2347 23.2928L16.6649 20.7108L19.6381 19.1301L24.0683 16.548C24.5579 16.2736 25.1771 16.2736 25.7435 16.548L29.1023 18.54C29.5918 18.8145 29.9328 19.3633 29.9328 19.9122V23.8233C29.9328 24.3722 29.649 24.921 29.1023 25.1955L25.7435 27.1874C25.2539 27.4619 24.6347 27.4619 24.0683 27.1874L20.7095 25.1955C20.22 24.921 19.879 24.3722 19.879 23.8233V21.1958L16.9058 22.8315V25.459C16.9058 26.0079 17.1896 26.5567 17.7364 26.8312L24.1638 30.4677C24.6533 30.7421 25.2726 30.7421 25.839 30.4677L32.2664 26.8312C32.756 26.5567 33.097 26.0079 33.097 25.459V18.2768C33.097 17.728 32.8131 17.1791 32.2664 16.9047L25.7435 13.1786Z" fill="#8247E5"/>
      </svg>
    ),
    description: 'Testnet Infrastructure',
  },
  {
    name: 'IPFS',
    logo: (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 9v6"></path>
        <path d="M10 9v6"></path>
        <path d="M8 7h8a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z"></path>
        <path d="m6 5 4-2 4 2"></path>
      </svg>
    ),
    description: 'Encrypted Data Storage',
  },
  {
    name: 'Gaia AI',
    logo: (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v8"></path>
        <path d="m4.93 10.93 1.41 1.41"></path>
        <path d="M2 18h2"></path>
        <path d="M20 18h2"></path>
        <path d="m19.07 10.93-1.41 1.41"></path>
        <path d="M22 22H2"></path>
        <path d="M16 6 8 14"></path>
        <path d="m16 14-2-2-6-6"></path>
        <path d="m8 6 8 8"></path>
      </svg>
    ),
    description: 'Disaster & Mental Health AI',
  },
  {
    name: 'Vercel',
    logo: (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
        <path fill="currentColor" d="m12 2 10 18H2L12 2z"/>
      </svg>
    ),
    description: 'Hosting & Deployment',
  },
  {
    name: 'Red Cross',
    logo: (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/>
        <path d="M12 8v8"/>
        <path d="M8 12h8"/>
      </svg>
    ),
    description: 'NGO Partnership',
  },
];

const PartnersSection = () => {
  return (
    <section id="partners" className="py-20 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/20 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Our Partners & Integrations
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            We're collaborating with leading organizations and technologies to build a more efficient disaster response ecosystem.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-md border border-white/10 mb-4 text-white hover:text-cyan-400 transition-colors duration-300 group">
                <div className="transform group-hover:scale-110 transition-transform duration-300">
                  {partner.logo}
                </div>
              </div>
              <h3 className="text-white font-medium text-center mb-1">{partner.name}</h3>
              <p className="text-gray-400 text-xs text-center">{partner.description}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold mb-2">Become a Partner</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join us in our mission to revolutionize disaster response and mental health support globally.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="p-6 bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-md rounded-xl border border-white/10">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h4 className="text-xl font-bold mb-4">Partner Benefits</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">✓</span>
                      <span className="text-gray-300">Access to disaster response ecosystem</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">✓</span>
                      <span className="text-gray-300">Integrate with ERC-7715/7710 protocols</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">✓</span>
                      <span className="text-gray-300">Collaborate on AI-driven solutions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">✓</span>
                      <span className="text-gray-300">Be part of global impact initiatives</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <div className="bg-black/40 p-6 rounded-lg backdrop-blur-md border border-white/10">
                    <h4 className="text-xl font-bold mb-4">Contact Us</h4>
                    <p className="text-gray-400 mb-4">
                      Interested in becoming a partner? Reach out to our team.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-md text-white font-medium"
                    >
                      Partnership Inquiry
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;