import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  // Luxury house background image from Pexels
  const bgImageUrl = "https://images.pexels.com/photos/2506990/pexels-photo-2506990.jpeg";

  return (
    <motion.footer
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className="relative text-white py-24"
      style={{
        backgroundImage: `url(${bgImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60 z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Heading and CTA - Left side (5 columns) */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-5 space-y-8"
          >
            <h2 className="text-5xl font-light leading-tight">
              Making Luxury Living Effortless
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-white text-white text-lg font-light 
                       rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Book Visit
            </motion.button>
          </motion.div>

          {/* Footer Links - Right side (7 columns) */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            {/* Pages Links */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold mb-2">Pages</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Info Links */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold mb-2">Info</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Other Doc
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold mb-2">Social</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <Instagram className="w-5 h-5" /> Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <Facebook className="w-5 h-5" /> Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <Twitter className="w-5 h-5" /> Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <Linkedin className="w-5 h-5" /> Linkedin
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom - Copyright */}
        <motion.div 
          variants={itemVariants}
          className="pt-8 border-t border-white/20 text-sm text-gray-300 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="flex items-center">
            {/* Ayat Logo - SVG version for better quality */}
            <svg 
              width="120" 
              height="60" 
              viewBox="0 0 800 600" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="mb-2 md:mb-0"
            >
              {/* House roof */}
              <path d="M512 260L400 170L288 260L252 230L400 110L548 230L512 260Z" fill="white" stroke="white" strokeWidth="2"/>
              
              {/* House windows */}
              <rect x="370" y="365" width="60" height="60" stroke="white" strokeWidth="2" fill="none"/>
              <rect x="440" y="365" width="60" height="60" stroke="white" strokeWidth="2" fill="none"/>
              <rect x="370" y="435" width="60" height="60" stroke="white" strokeWidth="2" fill="none"/>
              <rect x="440" y="435" width="60" height="60" stroke="white" strokeWidth="2" fill="none"/>
              
              {/* AYAT text */}
              <path d="M296 520L236 520L200 440L164 520L104 520L170 380L230 380L296 520Z" fill="white"/>
              <path d="M332 520L332 380L392 380L392 440L452 440L452 380L512 380L512 520L452 520L452 480L392 480L392 520L332 520Z" fill="white"/>
              <path d="M664 520L604 520L568 440L532 520L472 520L538 380L598 380L664 520Z" fill="white"/>
              <path d="M680 520L680 380L800 380L800 420L740 420L740 435L780 435L780 470L740 470L740 480L800 480L800 520L680 520Z" fill="white"/>
              
              {/* REAL ESTATE text */}
              <path d="M240 570L240 540L300 540L300 550L280 550L280 570L240 570Z" fill="white"/>
              <path d="M310 570L310 540L370 540L370 550L330 550L330 560L360 560L360 570L310 570Z" fill="white"/>
              <path d="M380 570L380 540L440 540L440 550L400 550L400 550L430 570L380 570Z" fill="white"/>
              <path d="M450 570L450 540L510 540L510 570L450 570Z" fill="white"/>
              
              <path d="M530 570L530 540L590 540L590 550L550 550L550 560L580 560L580 570L530 570Z" fill="white"/>
              <path d="M600 570L600 550L620 550L620 540L650 540L650 550L670 550L670 570L600 570Z" fill="white"/>
              <path d="M680 570L680 540L740 540L740 550L710 550L710 550L730 570L680 570Z" fill="white"/>
              <path d="M750 570L750 540L810 540L810 550L770 550L770 560L800 560L800 570L750 570Z" fill="white"/>
            </svg>
            <span className="ml-2 hidden md:inline">All rights reserved</span>
          </div>
          <p className="mt-2 md:mt-0">Luxury Real Estate Development since 1996</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;