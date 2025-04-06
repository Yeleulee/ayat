/**
 * Hero Component
 * 
 * A full-screen hero section with an animated image slider and interactive elements.
 * Features auto-playing slides, manual navigation, and smooth animations.
 * 
 * @component
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ChevronDown, ArrowRight } from 'lucide-react';

interface HeroProps {
  setCurrentPage: (page: 'home' | 'projects') => void;
}

const Hero: React.FC<HeroProps> = ({ setCurrentPage }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const slidesRef = useRef<HTMLDivElement>(null);
  
  // Track slide height for mobile responsiveness
  const [slideHeight, setSlideHeight] = useState('100vh');
  
  // Add state for detecting touch devices
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  // Responsive image URLs for different screen sizes
  const slideImages = [
    {
      mobile: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=480&auto=format&fit=crop&q=80",
      tablet: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=80",
      desktop: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&auto=format&fit=crop&q=80"
    },
    {
      mobile: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=480&auto=format&fit=crop&q=80",
      tablet: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&auto=format&fit=crop&q=80",
      desktop: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1920&auto=format&fit=crop&q=80"
    },
    {
      mobile: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=480&auto=format&fit=crop&q=80",
      tablet: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80",
      desktop: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&auto=format&fit=crop&q=80"
    },
    {
      mobile: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=480&auto=format&fit=crop&q=80",
      tablet: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      desktop: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&auto=format&fit=crop&q=80"
    },
    {
      mobile: "https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?w=480&auto=format&fit=crop&q=80",
      tablet: "https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?w=800&auto=format&fit=crop&q=80",
      desktop: "https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?w=1920&auto=format&fit=crop&q=80"
    },
    {
      mobile: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=480&auto=format&fit=crop&q=80",
      tablet: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&auto=format&fit=crop&q=80",
      desktop: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920&auto=format&fit=crop&q=80"
    },
    {
      mobile: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=480&auto=format&fit=crop&q=80",
      tablet: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&auto=format&fit=crop&q=80",
      desktop: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1920&auto=format&fit=crop&q=80"
    },
    {
      mobile: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=480&auto=format&fit=crop&q=80",
      tablet: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=800&auto=format&fit=crop&q=80",
      desktop: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=1920&auto=format&fit=crop&q=80"
    },
    {
      mobile: "https://images.unsplash.com/photo-1556955112-28cde3817b0a?w=480&auto=format&fit=crop&q=80",
      tablet: "https://images.unsplash.com/photo-1556955112-28cde3817b0a?w=800&auto=format&fit=crop&q=80",
      desktop: "https://images.unsplash.com/photo-1556955112-28cde3817b0a?w=1920&auto=format&fit=crop&q=80"
    },
    {
      mobile: "https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?w=480&auto=format&fit=crop&q=80",
      tablet: "https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?w=800&auto=format&fit=crop&q=80",
      desktop: "https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?w=1920&auto=format&fit=crop&q=80"
    },
    {
      mobile: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=480&auto=format&fit=crop&q=80",
      tablet: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&auto=format&fit=crop&q=80",
      desktop: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1920&auto=format&fit=crop&q=80"
    },
    {
      mobile: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=480&auto=format&fit=crop&q=80",
      tablet: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80",
      desktop: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&auto=format&fit=crop&q=80"
    },
    {
      mobile: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=480&auto=format&fit=crop&q=80",
      tablet: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&auto=format&fit=crop&q=80",
      desktop: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&auto=format&fit=crop&q=80"
    },
    {
      mobile: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=480&auto=format&fit=crop&q=80",
      tablet: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&auto=format&fit=crop&q=80",
      desktop: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=1920&auto=format&fit=crop&q=80"
    },
    {
      mobile: "https://images.unsplash.com/photo-1602343168117-bb8a12d7bc36?w=480&auto=format&fit=crop&q=80",
      tablet: "https://images.unsplash.com/photo-1602343168117-bb8a12d7bc36?w=800&auto=format&fit=crop&q=80",
      desktop: "https://images.unsplash.com/photo-1602343168117-bb8a12d7bc36?w=1920&auto=format&fit=crop&q=80"
    },
    {
      mobile: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=480&auto=format&fit=crop&q=80",
      tablet: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&auto=format&fit=crop&q=80",
      desktop: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1920&auto=format&fit=crop&q=80"
    },
    {
      mobile: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=480&auto=format&fit=crop&q=80",
      tablet: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&auto=format&fit=crop&q=80",
      desktop: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&auto=format&fit=crop&q=80"
    },
    {
      mobile: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=480&auto=format&fit=crop&q=80",
      tablet: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&auto=format&fit=crop&q=80",
      desktop: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1920&auto=format&fit=crop&q=80"
    },
    {
      mobile: "https://images.unsplash.com/photo-1558979158-65a1eaa08691?w=480&auto=format&fit=crop&q=80",
      tablet: "https://images.unsplash.com/photo-1558979158-65a1eaa08691?w=800&auto=format&fit=crop&q=80",
      desktop: "https://images.unsplash.com/photo-1558979158-65a1eaa08691?w=1920&auto=format&fit=crop&q=80"
    },
    {
      mobile: "https://images.unsplash.com/photo-1598228723793-52759bba239c?w=480&auto=format&fit=crop&q=80",
      tablet: "https://images.unsplash.com/photo-1598228723793-52759bba239c?w=800&auto=format&fit=crop&q=80",
      desktop: "https://images.unsplash.com/photo-1598228723793-52759bba239c?w=1920&auto=format&fit=crop&q=80"
    },
    {
      mobile: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=480&auto=format&fit=crop&q=80",
      tablet: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=80",
      desktop: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&auto=format&fit=crop&q=80"
    }
  ];

  // Enhanced slide titles to match new images
  const slideTitles = [
    "Modern Architecture Meets Urban Living",
    "Premium Properties in Prime Locations",
    "Redefining Luxury Real Estate",
    "Exclusive Residences For Discerning Tastes",
    "Architectural Excellence in Every Detail",
    "Urban Living Redefined",
    "Where Elegance Meets Comfort",
    "Sophisticated Design, Unparalleled Quality",
    "Your Dream Home Awaits",
    "Experience Luxury Living Today",
    "Investing in Your Perfect Future",
    "Exceptional Properties, Extraordinary Lives",
    "Find Your Place in the City",
    "Homes That Inspire",
    "The Essence of Modern Living",
    "Urban Oasis in the Heart of the City",
    "Building Dreams One Home at a Time",
    "Experience Life at the Pinnacle",
    "Where Community Meets Luxury",
    "Transforming Spaces into Homes",
    "Setting New Standards in Real Estate",
    "The Art of Living Well",
    "Creating Timeless Spaces"
  ];

  // Matching subtitles for each image
  const slideSubtitles = [
    "Experience Ethiopia's finest real estate developments with unmatched quality and service.",
    "Secure your investment in Addis Ababa's most prestigious and high-growth areas.",
    "The future of urban living designed for the modern Ethiopian lifestyle.",
    "Discover properties that reflect your unique taste and status in society.",
    "Every corner crafted with precision and attention to the finest details.",
    "Contemporary living spaces built for the rhythms of modern urban life.",
    "Homes that combine sophistication with the warmth of everyday living.",
    "Premium construction with the highest quality materials and finishes.",
    "Let us guide you to the perfect property that meets all your needs.",
    "Move into a community designed for those who appreciate the finer things.",
    "Properties that offer both lifestyle enhancement and investment potential.",
    "Living spaces that elevate everyday experiences to extraordinary moments.",
    "Strategically located properties in the heart of Addis Ababa's vibrant districts.",
    "Architectural visions that spark creativity and nurture well-being.",
    "Contemporary design meeting functional space for today's lifestyle needs.",
    "Retreat from the bustle while staying connected to urban amenities.",
    "Let's build your ideal home together, from concept to completion.",
    "Exclusive properties that offer panoramic views and premium amenities.",
    "Join neighborhoods where luxury amenities complement friendly communities.",
    "Converting buildings into personal sanctuaries that reflect your identity.",
    "Innovation and quality that sets new benchmarks in Ethiopian real estate.",
    "Properties designed for those who understand that living well is an art form.",
    "Creating spaces that remain beautiful and functional for generations."
  ];

  // Adjust slide height based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlideHeight('90vh'); // Better height for mobile
      } else {
        setSlideHeight('100vh');
      }
    };
    
    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto slide functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      if (loaded) {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slideImages.length);
      }
    }, 8000);

    return () => clearTimeout(timer);
  }, [currentSlide, slideImages.length, loaded]);

  // Mobile-specific preloading for current slide image
  useEffect(() => {
    if (isTouchDevice) {
      const img = new Image();
      img.src = getResponsiveImageUrl(currentSlide);
      img.onload = () => setLoaded(true);
    }
  }, [currentSlide, isTouchDevice]);

  // Detect touch devices
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Mark slides as loaded for non-touch devices
  useEffect(() => {
    if (!isTouchDevice) {
      setLoaded(true);
    }
  }, [isTouchDevice]);

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slideImages.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => 
      prevSlide === 0 ? slideImages.length - 1 : prevSlide - 1
    );
  };

  // Generate appropriate image URL based on screen width
  const getResponsiveImageUrl = (index: number) => {
    const imageSet = slideImages[index];
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 640) return imageSet.mobile;
      if (width < 1024) return imageSet.tablet;
      return imageSet.desktop;
    }
    return imageSet.desktop; // Default for SSR
  };

  // Variants for motion animations
  const slideVariants = {
    initial: { opacity: 0 },
    enter: { opacity: 1, transition: { duration: 1.2, ease: [0.19, 1.0, 0.22, 1.0] } },
    exit: { opacity: 0, transition: { duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0] } }
  };

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    enter: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.19, 1.0, 0.22, 1.0],
        delay: 0.4 + custom * 0.1
      }
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.6 } }
  };

  // Add smooth scroll function for the down arrow
  const scrollToProjects = () => {
    // Try to find the projects section first
    const projectsSection = document.getElementById('projects-section');
    
    if (projectsSection) {
      // Smooth scroll to the projects section if it exists
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Otherwise navigate to projects page
      setCurrentPage('projects');
      
      // Add a small delay and then scroll down a bit
      setTimeout(() => {
        window.scrollTo({
          top: window.innerHeight * 0.9,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  return (
    <div 
      className="relative bg-gray-900 overflow-hidden w-full"
      style={{ height: slideHeight }}
    >
      {/* Hide scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        html {
          scrollbar-width: none;
        }
        body::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 640px) {
          .nav-dots button {
            margin: 0 3px;
          }
        }
      `}} />
      
      {/* Slide images */}
      <div ref={slidesRef} className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={`slide-${currentSlide}`}
            variants={slideVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 z-10"></div>
            <img
              src={getResponsiveImageUrl(currentSlide)} 
              alt={`Luxury Real Estate Property: ${slideTitles[currentSlide]}`}
              className="w-full h-full object-cover"
              loading={currentSlide === 0 ? "eager" : "lazy"}
              fetchPriority={currentSlide === 0 ? "high" : "auto"}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide content - improved mobile styling */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <div key={`content-${currentSlide}`} className="py-8 sm:py-12 md:py-0 my-auto">
            <motion.h1
              custom={0}
              variants={contentVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-3 sm:mb-4 max-w-3xl leading-tight"
            >
              {slideTitles[currentSlide]}
            </motion.h1>
            <motion.p
              custom={1}
              variants={contentVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              className="text-white/90 text-base sm:text-lg md:text-xl font-light mb-8 max-w-xl leading-relaxed"
            >
              {slideSubtitles[currentSlide]}
            </motion.p>
            <motion.div
              custom={2}
              variants={contentVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage('projects')}
                className="px-6 sm:px-8 py-4 min-h-[44px] min-w-[120px] bg-white text-black text-sm sm:text-base font-medium rounded-full 
                         hover:bg-white/90 transition-all duration-300 flex items-center justify-center"
              >
                View Properties <ArrowRight className="ml-2 w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-4 min-h-[44px] min-w-[120px] bg-transparent border border-white text-white text-sm sm:text-base font-medium rounded-full 
                         hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
              >
                Learn More <ArrowRight className="ml-2 w-4 h-4" />
              </motion.button>
            </motion.div>
          </div>
        </AnimatePresence>
      </div>

      {/* Slide navigation with dots for all images - Adjusted for better positioning */}
      <div className="absolute bottom-6 sm:bottom-12 left-0 right-0 z-30 flex justify-between items-center px-4 sm:px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
        {/* Dot navigation - limited on mobile, scrollable container on desktop */}
        <div className={`flex items-center nav-dots ${isTouchDevice ? 'overflow-x-auto pb-2 hide-scrollbar' : 'space-x-1 sm:space-x-2'}`}>
          {slideImages.slice(0, isTouchDevice ? 10 : slideImages.length).map((_, index) => (
            <button
              key={`dot-${index}`}
              className={`rounded-full transition-all duration-300 mb-1 mx-1 flex-shrink-0 ${
                currentSlide === index 
                  ? "h-3 w-3 bg-white" 
                  : "h-2 w-2 bg-white/50 hover:bg-white/70"
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
          {isTouchDevice && slideImages.length > 10 && (
            <span className="text-white/70 text-xs mx-1">+{slideImages.length - 10}</span>
          )}
        </div>
        
        {/* Navigation buttons - increased size for touch friendliness */}
        <div className="flex space-x-2 sm:space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/20 backdrop-blur-sm border border-white/20 
                     flex items-center justify-center text-white hover:bg-black/30 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/20 backdrop-blur-sm border border-white/20 
                     flex items-center justify-center text-white hover:bg-black/30 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>
        </div>
      </div>

      {/* Scroll down button with animation and improved tap target */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        whileHover={{ y: 5 }}
        onClick={scrollToProjects}
        className="absolute bottom-8 sm:bottom-10 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full p-3 sm:p-4 shadow-lg z-20 min-h-[50px] min-w-[50px] flex items-center justify-center"
        aria-label="Scroll down to browse properties"
      >
        <ChevronDown size={24} strokeWidth={2.5} className="animate-bounce" />
      </motion.button>

      {/* Add global styles for hiding scrollbars while preserving functionality */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  );
};

export default Hero;