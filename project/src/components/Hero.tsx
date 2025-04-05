/**
 * Hero Component
 * 
 * A full-screen hero section with an animated image slider and interactive elements.
 * Features auto-playing slides, manual navigation, and smooth animations.
 * 
 * @component
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideImage {
  url: string;
  title: string;
  alt: string;
}

interface HeroProps {
  setCurrentPage?: (page: 'home' | 'projects') => void;
}

const Hero: React.FC<HeroProps> = ({ setCurrentPage }) => {
  // State management for slider
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [direction, setDirection] = useState<number>(1);

  // High-quality curated images for the slider
  const images: SlideImage[] = [
    {
      url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      title: "Modern Architecture",
      alt: "Modern glass building with geometric patterns"
    },
    {
      url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      title: "Luxury Living",
      alt: "Luxurious apartment interior with contemporary design"
    },
    {
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      title: "Premium Villas",
      alt: "Elegant villa with modern architecture and pool"
    },
    {
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      title: "Elegant Homes",
      alt: "Contemporary home with minimalist design"
    },
    {
      url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      title: "Contemporary Design",
      alt: "Modern architectural masterpiece with clean lines"
    },
    {
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      title: "Urban Living",
      alt: "Urban apartment complex with modern amenities"
    },
    {
      url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      title: "Modern Comfort",
      alt: "Comfortable modern living space with natural light"
    },
    {
      url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      title: "Stylish Interiors",
      alt: "Stylishly designed interior with premium finishes"
    },
    {
      url: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      title: "Exclusive Properties",
      alt: "Exclusive property with stunning architecture"
    }
  ];

  // Auto-play functionality with cleanup
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length]);

  // Navigation handlers with memoization
  const handlePrevious = useCallback(() => {
    setIsAutoPlaying(false);
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  const handleNext = useCallback(() => {
    setIsAutoPlaying(false);
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const handleDotClick = useCallback((index: number) => {
    setIsAutoPlaying(false);
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  // Smooth scroll handler
  const handleScrollClick = useCallback(() => {
    const statsSection = document.getElementById('stats');
    if (statsSection) {
      // Enhanced smooth scroll with spring-like effect
      window.scrollTo({
        top: statsSection.offsetTop,
        behavior: 'smooth'
      });
      
      // Add a subtle highlight animation to the target section
      statsSection.classList.add('scroll-highlight');
      setTimeout(() => {
        statsSection.classList.remove('scroll-highlight');
      }, 1500);
    }
  }, []);

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark">
      {/* Image Slider (Full Background) */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div 
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50 z-10"></div>
          <img 
            src={images[currentIndex].url}
            alt={images[currentIndex].alt}
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-10 right-10 z-20 flex justify-center items-center">
        <div className="flex items-center gap-6 px-8 py-4 bg-black/20 backdrop-blur-sm rounded-full">
          {/* Previous Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrevious}
            className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 
                     text-white hover:bg-white/20 transition-all duration-300 flex-shrink-0"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          
          {/* Slide Indicators */}
          <div className="flex gap-2">
            {images.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-6 bg-white' : 'w-2 bg-white/50'
                }`}
                whileHover={{ scale: 1.2 }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 
                     text-white hover:bg-white/20 transition-all duration-300 flex-shrink-0"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-4xl"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-balance text-shadow-lg mb-8 text-white"
          >
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: 1.2,
                delay: 0.7
              }}
              className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight block"
            >
              Building Dreams
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 1.2,
                delay: 1.0,
                type: "spring",
                stiffness: 100 
              }}
              className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight block mt-1 md:mt-2"
            >
              Since 1996
            </motion.span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="text-gray-300 mb-12 max-w-2xl font-light text-balance text-lg md:text-xl tracking-wide"
          >
            Ethiopia's premier real estate developer, delivering exceptional homes and commercial properties.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.25)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage && setCurrentPage('projects')}
              className="group px-8 py-4 bg-white/20 backdrop-blur-sm text-lg font-light rounded-full 
                       transition-all duration-300 relative overflow-hidden"
            >
              <motion.span className="relative z-10 flex items-center justify-center">
                View Properties 
                <motion.svg 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </motion.svg>
              </motion.span>
              <motion.div 
                className="absolute inset-0 w-0 bg-white/10"
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.05, borderColor: "rgba(255, 255, 255, 0.8)" }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 border-2 border-white/60 text-white text-lg font-light 
                       rounded-full transition-all duration-300 relative overflow-hidden"
            >
              <motion.span className="relative z-10">
                Learn More
              </motion.span>
              <motion.div 
                className="absolute inset-0 w-0 bg-white/10"
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Removed text, better positioned */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.button
          onClick={handleScrollClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-5 rounded-full bg-white/15 border border-white/40 backdrop-blur-[10px] 
                   shadow-xl transition-all duration-300 hover:bg-white/25"
          style={{
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          }}
          aria-label="Scroll to next section"
        >
          <motion.div
            animate={{ 
              y: [0, 8, 0],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ChevronDown className="w-7 h-7 text-white" />
          </motion.div>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Hero;