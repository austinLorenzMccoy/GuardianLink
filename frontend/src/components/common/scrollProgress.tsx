'use client';

import { motion, MotionValue } from 'framer-motion';

interface ScrollProgressProps {
  progress: MotionValue<number>;
}

const ScrollProgress: React.FC<ScrollProgressProps> = ({ progress }) => {
  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 z-50 origin-left"
      style={{ scaleX: progress }}
    />
  );
};

export default ScrollProgress;