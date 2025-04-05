import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Building2, Home, Landmark, Award } from 'lucide-react';

// Custom hook for animating counting
const useCountAnimation = (end: number, duration: number = 1.5, delay: number = 0) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
    rootMargin: "-10% 0px",
  });

  useEffect(() => {
    if (inView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        // Ease out cubic for more dramatic effect at the end
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(easeOutCubic * end));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      const timeoutId = setTimeout(() => {
        setCount(0); // Reset to zero before starting animation
        animationFrame = requestAnimationFrame(animate);
      }, delay * 1000);

      return () => {
        cancelAnimationFrame(animationFrame);
        clearTimeout(timeoutId);
      };
    } else {
      setCount(0); // Reset count when out of view
    }
  }, [inView, end, duration, delay]);

  return { count, ref };
};

const Stats = () => {
  const [containerRef, containerInView] = useInView({
    triggerOnce: false,
    threshold: 0.15, // Higher threshold for earlier trigger
    rootMargin: "-5% 0px"
  });

  const { count: projectsCount, ref: projectsRef } = useCountAnimation(152, 1.5, 0);
  const { count: residentialCount, ref: residentialRef } = useCountAnimation(87, 1.5, 0.1);
  const { count: commercialCount, ref: commercialRef } = useCountAnimation(42, 1.5, 0.2);

  // Animation controls
  const headingControls = useAnimation();
  const lineControls = useAnimation();
  const statsControls = useAnimation();
  const imageControls = useAnimation();
  const quoteControls = useAnimation();

  useEffect(() => {
    if (containerInView) {
      // Start animations in parallel rather than sequence
      headingControls.start('visible');
      lineControls.start('visible');
      statsControls.start('visible');
      imageControls.start('visible');
      quoteControls.start('visible');
    } else {
      // Reset animations when out of view
      headingControls.start('hidden');
      lineControls.start('hidden');
      statsControls.start('hidden');
      imageControls.start('hidden');
      quoteControls.start('hidden');
    }
  }, [containerInView, headingControls, lineControls, statsControls, imageControls, quoteControls]);

  // Text animation variants
  const headingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8, 
        ease: [0.19, 1.0, 0.22, 1.0],
        staggerChildren: 0.05
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.19, 1.0, 0.22, 1.0] }
    }
  };

  // Split text for individual letter animations
  const headingText = "Where quality meets architecture.";
  const headingLetters = headingText.split("");

  return (
    <div id="stats" className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
    <motion.div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-16"
        >
          {/* Left Column - Stats */}
          <div>
            <motion.div 
              initial="hidden"
              animate={headingControls}
              variants={headingVariants}
              className="flex overflow-hidden"
            >
              <h2 className="text-3xl md:text-4xl font-extralight tracking-tight text-gray-900 mb-10 flex flex-wrap">
                {headingLetters.map((letter, index) => (
                  <motion.span key={index} variants={letterVariants} className="inline-block">
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </h2>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              animate={lineControls}
              variants={{
                hidden: { width: 0, opacity: 0 },
                visible: { 
                  width: "3rem",
                  opacity: 1,
                  transition: { 
                    duration: 1.2, 
                    delay: 0.3, 
                    ease: [0.19, 1.0, 0.22, 1.0] 
                  }
                }
              }}
              className="h-px bg-gray-300 mb-16"
            />
            
            <div className="space-y-16">
              {/* Projects Completed */}
              <motion.div 
                initial="hidden"
                animate={statsControls}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1,
                    y: 0,
                    transition: { 
                      duration: 0.7,
                      delay: 0,
                      ease: [0.19, 1.0, 0.22, 1.0]
                    }
                  }
                }}
                className="flex items-center group"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, backgroundColor: "#f8f8f8", boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="w-16 h-16 flex items-center justify-center border border-gray-200 rounded-full mr-6 transition-all duration-300 relative bg-white"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                  >
                    <Building2 strokeWidth={1.25} className="text-gray-700 w-6 h-6" />
                  </motion.div>
                  <motion.div 
                    className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.3, 1] }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  />
                </motion.div>
                
                <div>
                  <motion.p 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-gray-500 font-light text-xs tracking-widest uppercase mb-1"
                  >
                    Projects Completed
                  </motion.p>
                  <motion.div className="relative">
                    <motion.p 
                      ref={projectsRef}
                      className="text-5xl font-extralight text-gray-900"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.span
                        animate={{ scale: projectsCount < 152 ? [1, 1.1, 1] : 1 }}
                        transition={{ duration: 0.15, ease: "easeInOut" }}
                      >
                        {projectsCount}
                      </motion.span>
                      +
                    </motion.p>
                    <motion.div
                      className="absolute bottom-0 left-0 h-px bg-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: projectsCount === 152 ? "100%" : "0%" }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Residential Properties */}
              <motion.div 
                initial="hidden"
                animate={statsControls}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1,
                    y: 0,
                    transition: { 
                      duration: 0.7,
                      delay: 0.1,
                      ease: [0.19, 1.0, 0.22, 1.0]
                    }
                  }
                }}
                className="flex items-center group"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, backgroundColor: "#f8f8f8", boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="w-16 h-16 flex items-center justify-center border border-gray-200 rounded-full mr-6 transition-all duration-300 relative bg-white"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    <Home strokeWidth={1.25} className="text-gray-700 w-6 h-6" />
                  </motion.div>
                  <motion.div 
                    className="absolute -top-1 -right-1 w-3 h-3 bg-teal-500 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.3, 1] }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  />
                </motion.div>
                
                <div>
                  <motion.p 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="text-gray-500 font-light text-xs tracking-widest uppercase mb-1"
                  >
                    Residential Properties
                  </motion.p>
                  <motion.div className="relative">
                    <motion.p 
                      ref={residentialRef}
                      className="text-5xl font-extralight text-gray-900"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.span
                        animate={{ scale: residentialCount < 87 ? [1, 1.1, 1] : 1 }}
                        transition={{ duration: 0.15, ease: "easeInOut" }}
                      >
                        {residentialCount}
                      </motion.span>
                    </motion.p>
                    <motion.div
                      className="absolute bottom-0 left-0 h-px bg-teal-500"
                      initial={{ width: 0 }}
                      animate={{ width: residentialCount === 87 ? "100%" : "0%" }}
              transition={{ duration: 0.5, delay: 0.2 }}
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Commercial Buildings */}
              <motion.div 
                initial="hidden"
                animate={statsControls}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1,
                    y: 0,
                    transition: { 
                      duration: 0.7,
                      delay: 0.2,
                      ease: [0.19, 1.0, 0.22, 1.0]
                    }
                  }
                }}
                className="flex items-center group"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, backgroundColor: "#f8f8f8", boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="w-16 h-16 flex items-center justify-center border border-gray-200 rounded-full mr-6 transition-all duration-300 relative bg-white"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <Landmark strokeWidth={1.25} className="text-gray-700 w-6 h-6" />
                  </motion.div>
                  <motion.div 
                    className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.3, 1] }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                  />
                </motion.div>
                
                <div>
                  <motion.p 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="text-gray-500 font-light text-xs tracking-widest uppercase mb-1"
                  >
                    Commercial Buildings
                  </motion.p>
                  <motion.div className="relative">
                    <motion.p 
                      ref={commercialRef}
                      className="text-5xl font-extralight text-gray-900"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.span
                        animate={{ scale: commercialCount < 42 ? [1, 1.1, 1] : 1 }}
                        transition={{ duration: 0.15, ease: "easeInOut" }}
                      >
                        {commercialCount}
                      </motion.span>
                    </motion.p>
                    <motion.div
                      className="absolute bottom-0 left-0 h-px bg-amber-500"
                      initial={{ width: 0 }}
                      animate={{ width: commercialCount === 42 ? "100%" : "0%" }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    />
            </motion.div>
                </div>
          </motion.div>
            </div>
          </div>
          
          {/* Right Column - Image and Testimonial */}
          <motion.div 
            initial="hidden"
            animate={imageControls}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { 
                opacity: 1, 
                y: 0, 
                transition: { 
                  duration: 1.0, 
                  delay: 0.6,
                  ease: [0.19, 1.0, 0.22, 1.0]
                }
              }
            }}
            className="relative"
          >
            <div className="overflow-hidden rounded-sm">
              <motion.img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80" 
                alt="Modern Architectural Design" 
                className="w-full h-full object-cover"
                style={{ aspectRatio: "4/5" }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.2, ease: [0.19, 1.0, 0.22, 1.0] }}
              />
            </div>
            
            <motion.div 
              initial="hidden"
              animate={quoteControls}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { 
                    duration: 0.8, 
                    delay: 1.0,
                    ease: [0.19, 1.0, 0.22, 1.0]
                  }
                }
              }}
              className="absolute bottom-8 left-8 right-8"
            >
              <div className="bg-white/95 backdrop-blur-sm p-8 shadow-xl">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4, duration: 0.8 }}
                >
                  <p className="text-lg font-light text-gray-800 leading-relaxed">
                    "AYAT has transformed our vision into reality. The design is both timeless and practical, perfectly fitting our family's needs."
                  </p>
                  <p className="mt-4 text-xs uppercase tracking-widest text-gray-500 font-light">— Client Testimonial</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Stats;