'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

// Mock testimonial data
const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    location: "Lagos, Nigeria",
    avatar: "/api/placeholder/50/50",
    quote: "During the flood crisis last year, GuardianLink's mental health AI was my lifeline. It responded in Yoruba and truly understood our cultural context of communal loss.",
    rating: 5
  },
  {
    id: 2,
    name: "Raj P.",
    location: "Mumbai, India",
    avatar: "/api/placeholder/50/50",
    quote: "As a healthcare worker, I faced extreme burnout. The privacy-first approach meant I could speak freely without worrying about my career. The Hindi support made it feel personal.",
    rating: 5
  },
  {
    id: 3,
    name: "David K.",
    location: "Nairobi, Kenya",
    avatar: "/api/placeholder/50/50",
    quote: "The blockchain payment system made it accessible even when our banking systems were down during the crisis. The Swahili support was impressively natural.",
    rating: 4
  },
  {
    id: 4,
    name: "Maria J.",
    location: "London, UK",
    avatar: "/api/placeholder/50/50",
    quote: "As someone with anxiety, I appreciate that my conversations are encrypted and I control my data. The exercises suggested are evidence-based and actually helpful.",
    rating: 5
  },
  {
    id: 5,
    name: "Amina T.",
    location: "Abuja, Nigeria",
    avatar: "/api/placeholder/50/50",
    quote: "The token-based subscription made getting help affordable. I could pay weekly instead of monthly, which made a huge difference during financial uncertainty.",
    rating: 5
  }
];

// Testimonial card component
const TestimonialCard = ({ testimonial, isActive }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: isActive ? 1 : 0.5, scale: isActive ? 1 : 0.9 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-lg backdrop-blur-sm border border-purple-500/20 shadow-lg overflow-hidden p-6 ${isActive ? 'ring-2 ring-purple-500/40' : ''}`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
            <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="font-medium text-white">{testimonial.name}</h4>
            <p className="text-sm text-gray-400">{testimonial.location}</p>
          </div>
        </div>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-500"}
            />
          ))}
        </div>
      </div>
      
      <div className="relative">
        <Quote size={36} className="absolute -top-2 -left-2 text-purple-500/20" />
        <p className="text-gray-300 relative z-10 pl-4">{testimonial.quote}</p>
      </div>
    </motion.div>
  );
};

// Section title with animation
const SectionTitle = ({ title, subtitle }) => {
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

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Handle navigation
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  // Handle dot navigation
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };
  
  return (
    <div className="relative py-16 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="What Our Users Say" 
          subtitle="Testimonials" 
        />
        
        <div className="relative">
          {/* Desktop view - shows 3 cards at once */}
          <div className="hidden md:grid grid-cols-3 gap-6">
            {[
              (currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1),
              currentIndex,
              (currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)
            ].map((index, i) => (
              <TestimonialCard 
                key={testimonials[index].id} 
                testimonial={testimonials[index]} 
                isActive={i === 1}
              />
            ))}
          </div>
          
          {/* Mobile view - shows only current card */}
          <div className="md:hidden">
            <TestimonialCard 
              testimonial={testimonials[currentIndex]} 
              isActive={true}
            />
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-between absolute top-1/2 left-0 right-0 transform -translate-y-1/2 px-4 md:px-0">
            <motion.button
              onClick={handlePrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-purple-800/50 backdrop-blur-sm border border-purple-500/30 flex items-center justify-center shadow-lg text-white -ml-5 md:ml-0"
            >
              <ChevronLeft size={20} />
            </motion.button>
            
            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-purple-800/50 backdrop-blur-sm border border-purple-500/30 flex items-center justify-center shadow-lg text-white -mr-5 md:mr-0"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>
        
        {/* Dot indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-purple-500 w-6' : 'bg-purple-500/30'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;