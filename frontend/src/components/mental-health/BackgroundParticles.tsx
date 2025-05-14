'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface BackgroundParticlesProps {
  progress: MotionValue<number>;
}

const BackgroundParticles: React.FC<BackgroundParticlesProps> = ({ progress }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  
  // Use fewer particles and lighter animations
  const particleSize = useTransform(progress, [0, 1], [1, 2]);
  const particleSpeed = useTransform(progress, [0, 0.5, 1], [0.3, 0.8, 0.3]);
  const particleOpacity = useTransform(progress, [0, 0.5, 1], [0.12, 0.25, 0.15]);
  
  // Reduced density and fixed values for better performance
  const particleDensity = useTransform(progress, [0, 0.5, 1], [15, 25, 18]);
  
  // Canvas animation with performance optimizations
  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleReducedMotionChange = () => setIsReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleReducedMotionChange);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;
    
    // Set canvas to full screen with device pixel ratio awareness
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    
    resizeCanvas();
    
    // Throttled resize handler
    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(resizeCanvas, 200);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Simplified particle class for better performance
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      
      constructor(x: number, y: number, size: number, speedX: number, speedY: number, color: string) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
      }
      
      update(width: number, height: number) {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Wrap around edges instead of bouncing (more efficient)
        if (this.x < 0) this.x = width;
        else if (this.x > width) this.x = 0;
        
        if (this.y < 0) this.y = height;
        else if (this.y > height) this.y = 0;
      }
    }
    
    // Use a fixed array size for particles
    const particles: Particle[] = [];
    let connectionLines: {x1: number, y1: number, x2: number, y2: number, opacity: number}[] = [];
    
    // Generate particles with reduced density
    const generateParticles = (density: number, size: number, speed: number, opacity: number) => {
      particles.length = 0; // Clear existing particles
      
      // Calculate particle count based on screen size with a maximum limit
      const screenArea = window.innerWidth * window.innerHeight;
      const baseCount = Math.floor(screenArea / (10000 / density));
      const count = Math.min(baseCount, 100); // Cap at 100 particles max
      
      for (let i = 0; i < count; i++) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const actualSize = (Math.random() * size) + 0.5;
        
        // Reduced speed variance
        const speedX = (Math.random() - 0.5) * speed * 0.8;
        const speedY = (Math.random() - 0.5) * speed * 0.8;
        
        // Simplified color calculation - use pre-calculated colors
        const colorIndex = Math.floor(Math.random() * 3);
        const colors = [
          `rgba(130, 60, 200, ${opacity})`,
          `rgba(100, 70, 180, ${opacity})`,
          `rgba(80, 90, 220, ${opacity})`
        ];
        
        particles.push(new Particle(x, y, actualSize, speedX, speedY, colors[colorIndex]));
      }
    };
    
    // Initial generation with reduced values
    generateParticles(
      particleDensity.get(), 
      particleSize.get(), 
      particleSpeed.get(), 
      particleOpacity.get()
    );
    
    // Update particles only when values change significantly
    let lastSize = particleSize.get();
    let lastSpeed = particleSpeed.get();
    let lastOpacity = particleOpacity.get();
    let lastDensity = particleDensity.get();
    
    const unsubscribeSize = particleSize.onChange(size => {
      if (Math.abs(size - lastSize) > 0.2) {
        particles.forEach(p => p.size = (Math.random() * size) + 0.5);
        lastSize = size;
      }
    });
    
    const unsubscribeSpeed = particleSpeed.onChange(speed => {
      if (Math.abs(speed - lastSpeed) > 0.1) {
        particles.forEach(p => {
          p.speedX = (Math.random() - 0.5) * speed * 0.8;
          p.speedY = (Math.random() - 0.5) * speed * 0.8;
        });
        lastSpeed = speed;
      }
    });
    
    const unsubscribeOpacity = particleOpacity.onChange(opacity => {
      if (Math.abs(opacity - lastOpacity) > 0.05) {
        const colors = [
          `rgba(130, 60, 200, ${opacity})`,
          `rgba(100, 70, 180, ${opacity})`,
          `rgba(80, 90, 220, ${opacity})`
        ];
        
        particles.forEach((p, i) => {
          p.color = colors[i % 3];
        });
        lastOpacity = opacity;
      }
    });
    
    const unsubscribeDensity = particleDensity.onChange(density => {
      if (Math.abs(density - lastDensity) > 3) {
        generateParticles(
          density, 
          particleSize.get(), 
          particleSpeed.get(), 
          particleOpacity.get()
        );
        lastDensity = density;
      }
    });
    
    // Pre-calculate connection lines (more efficient)
    const updateConnectionLines = () => {
      const maxDistance = 100; // Reduced max distance
      connectionLines = [];
      
      // Only check a subset of particles for connections
      const step = particles.length > 50 ? 2 : 1; // Skip every other particle if we have many
      
      for (let i = 0; i < particles.length; i += step) {
        for (let j = i + 1; j < particles.length; j += step) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            connectionLines.push({
              x1: particles[i].x,
              y1: particles[i].y,
              x2: particles[j].x,
              y2: particles[j].y,
              opacity: 0.15 * (1 - distance / maxDistance)
            });
            
            // Limit number of connections
            if (connectionLines.length > 150) break;
          }
        }
        
        // Limit number of connections
        if (connectionLines.length > 150) break;
      }
    };
    
    // Animation frame request ID for cleanup
    let animationId: number;
    
    // Main animation loop with throttling
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      // Update particle positions
      particles.forEach(particle => {
        particle.update(window.innerWidth, window.innerHeight);
        
        // Draw particles
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
      
      // Only update connection lines every few frames
      if (performance.now() % 3 === 0 && !isReducedMotion) {
        updateConnectionLines();
      }
      
      // Draw connection lines
      if (!isReducedMotion) {
        connectionLines.forEach(line => {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(130, 100, 200, ${line.opacity})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(line.x1, line.y1);
          ctx.lineTo(line.x2, line.y2);
          ctx.stroke();
        });
      }
      
      // Request next frame
      animationId = requestAnimationFrame(animate);
    };
    
    // Start animation
    if (!isReducedMotion) {
      animationId = requestAnimationFrame(animate);
    } else {
      // For reduced motion, just draw static particles without animation
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
    }
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', handleReducedMotionChange);
      unsubscribeSize();
      unsubscribeSpeed();
      unsubscribeOpacity();
      unsubscribeDensity();
    };
  }, [particleSize, particleSpeed, particleOpacity, particleDensity, isReducedMotion]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-5 pointer-events-none"
    />
  );
};

export default BackgroundParticles;