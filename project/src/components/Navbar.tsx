import React, { useState, useEffect } from 'react';
import { X, ArrowUpRight, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Update menuItems to include a type for special handling
interface MenuItem {
  name: string;
  href: string;
  isPageSwitch?: boolean;
}

const menuItems: MenuItem[] = [
  { name: 'Home', href: '#home' },
  { name: 'Properties', href: '#properties', isPageSwitch: true },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' }
];

interface NavbarProps {
  currentPage: 'home' | 'projects';
  setCurrentPage: (page: 'home' | 'projects') => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    handleResize();
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMenuClick = (item: MenuItem) => {
    // Handle page switching
    if (item.isPageSwitch) {
      setCurrentPage('projects');
      setIsOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // If on projects page and clicking Home, switch to home page
    if (currentPage === 'projects' && item.name === 'Home') {
      setCurrentPage('home');
      setIsOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Normal scroll to section behavior (only on home page)
    if (currentPage === 'home') {
      const targetId = item.href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
    
    setIsOpen(false);
  };

  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.3
      }
    },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    })
  };

  return (
    <>
      <motion.nav 
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled ? 'bg-white/90 backdrop-blur-sm shadow-sm' : ''
        }`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex justify-between items-center h-16 md:h-20 lg:h-24">
            <motion.a
              onClick={() => {
                setCurrentPage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="cursor-pointer group"
            >
              {/* Responsive logo size */}
              <svg width="120" height="50" viewBox="0 0 512 160" fill="none" className="w-auto h-8 sm:h-10 md:h-12 lg:h-14">
                <path d="M250 10L370 130H130L250 10Z" stroke="currentColor" strokeWidth="3"/>
                <path d="M225 50L275 100H175L225 50Z" stroke="currentColor" strokeWidth="3"/>
                <path d="M175 130L125 40L75 130H175Z" stroke="currentColor" strokeWidth="3"/>
                <path d="M325 130L275 40L225 130H325Z" stroke="currentColor" strokeWidth="3"/>
                <path d="M425 130L375 40L325 130H425Z" stroke="currentColor" strokeWidth="3"/>
                <path d="M375 130H475V80H425V40H475" stroke="currentColor" strokeWidth="3"/>
                <text x="155" y="160" fontFamily="sans-serif" fontSize="24" fontWeight="300" fill="currentColor">REAL ESTATE</text>
              </svg>
            </motion.a>

            <motion.button
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="relative group min-w-[var(--min-touch-target)] min-h-[var(--min-touch-target)] flex items-center justify-center"
              aria-label="Open menu"
            >
              <div className="flex items-center justify-center border border-gray-300 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full">
                <Menu className="w-5 h-5 sm:hidden" />
                <div className="hidden sm:flex flex-col gap-1.5 mr-2">
                  <span className="w-5 h-px bg-gray-800 block group-hover:w-6 transition-all duration-300"></span>
                  <span className="w-6 h-px bg-gray-800 block"></span>
                  <span className="w-5 h-px bg-gray-800 block group-hover:w-6 transition-all duration-300"></span>
                </div>
                <span className="text-sm tracking-widest font-light pr-1 hidden sm:inline">MENU</span>
              </div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            className="fixed inset-0 bg-white z-50 flex items-center justify-center overflow-auto"
          >
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-black p-2 group 
                         min-w-[var(--min-touch-target)] min-h-[var(--min-touch-target)] 
                         flex items-center justify-center"
              aria-label="Close menu"
              whileHover={{ scale: 1.1, rotate: 90 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <X size={24} />
            </motion.button>

            <div className="text-center w-full p-6">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  custom={index}
                  variants={menuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="mb-4 sm:mb-6 md:mb-8 relative"
                  onHoverStart={() => setHoveredItem(item.name)}
                  onHoverEnd={() => setHoveredItem(null)}
                >
                  <motion.a
                    onClick={() => handleMenuClick(item)}
                    className="text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light block py-3 sm:py-2 cursor-pointer relative z-10"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.name}
                    
                    {hoveredItem === item.name && (
                      <motion.span 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block ml-3"
                      >
                        <ArrowUpRight size={26} className="text-gray-400" />
                      </motion.span>
                    )}
                  </motion.a>
                  
                  {hoveredItem === item.name && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      className="h-px bg-gray-200 absolute bottom-0 left-0"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-4 sm:bottom-8 text-center text-gray-400 px-4 flex flex-col items-center w-full"
            >
              <svg width="120" height="120" viewBox="0 0 512 160" fill="none" className="mb-3 w-auto h-8 sm:h-12 opacity-60">
                <path d="M250 10L370 130H130L250 10Z" stroke="currentColor" strokeWidth="3"/>
                <path d="M225 50L275 100H175L225 50Z" stroke="currentColor" strokeWidth="3"/>
                <path d="M175 130L125 40L75 130H175Z" stroke="currentColor" strokeWidth="3"/>
                <path d="M325 130L275 40L225 130H325Z" stroke="currentColor" strokeWidth="3"/>
                <path d="M425 130L375 40L325 130H425Z" stroke="currentColor" strokeWidth="3"/>
                <path d="M375 130H475V80H425V40H475" stroke="currentColor" strokeWidth="3"/>
                <text x="155" y="160" fontFamily="sans-serif" fontSize="24" fontWeight="300" fill="currentColor">REAL ESTATE</text>
              </svg>
              <span className="text-xs sm:text-sm">Building Dreams Since 1996</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;