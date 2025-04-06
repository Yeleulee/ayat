import React, { useState } from 'react';
import { Landmark, TrendingUp, Award, DollarSign, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Investment = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });
  
  // Hover states for the investment cards
  const [hoverShare, setHoverShare] = useState(false);
  const [hoverMinimum, setHoverMinimum] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8
      }
    }
  };
  
  const benefitItems = [
    {
      icon: <CheckCircle2 size={18} className="text-green-400" />,
      text: "No service charge for existing shareholders"
    },
    {
      icon: <CheckCircle2 size={18} className="text-green-400" />,
      text: "Flexible investment options"
    },
    {
      icon: <CheckCircle2 size={18} className="text-green-400" />,
      text: "Part ownership in prime real estate"
    },
    {
      icon: <CheckCircle2 size={18} className="text-green-400" />,
      text: "Regular dividend payments"
    },
    {
      icon: <CheckCircle2 size={18} className="text-green-400" />,
      text: "Portfolio diversification opportunity"
    }
  ];

  const gradientBg = "bg-gradient-to-br from-gray-900 via-black to-gray-800";

  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className={`py-24 ${gradientBg} text-white relative overflow-hidden`}
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-blue-500 filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-purple-500 filter blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            variants={itemVariants}
            className="inline-block p-3 rounded-full bg-white/10 backdrop-blur-sm mb-6"
          >
            <Landmark className="w-8 h-8" />
          </motion.div>
          <motion.h2 
            variants={itemVariants}
            className="text-5xl font-bold mb-4"
          >
            Investment Opportunities
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            Join Ayat Share Company and become a part-owner in Ethiopia's leading real estate developer. Our unique investment structure offers accessible entry points with significant growth potential.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <motion.div 
            variants={containerVariants}
            className="md:col-span-7 space-y-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Share Price Card */}
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -5 }}
                onHoverStart={() => setHoverShare(true)}
                onHoverEnd={() => setHoverShare(false)}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/5 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 transition-opacity duration-300" 
                      style={{ opacity: hoverShare ? 0.5 : 0 }}></div>
                
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                    <DollarSign className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xl font-bold">Birr per share</div>
                    <div className="text-sm text-gray-400">Starting price</div>
                  </div>
                </div>
                
                <div className="flex items-end">
                  <span className="text-5xl font-bold text-white">100</span>
                  <span className="text-lg text-gray-400 ml-2 mb-1">ETB</span>
                </div>
                
                <motion.div 
                  className="absolute bottom-0 left-0 h-1 bg-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: hoverShare ? '100%' : '0%' }}
                  transition={{ duration: 0.5 }}
                ></motion.div>
              </motion.div>
              
              {/* Minimum Shares Card */}
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -5 }}
                onHoverStart={() => setHoverMinimum(true)}
                onHoverEnd={() => setHoverMinimum(false)}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/5 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 transition-opacity duration-300" 
                     style={{ opacity: hoverMinimum ? 0.5 : 0 }}></div>
                
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center mr-4">
                    <TrendingUp className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-xl font-bold">Minimum shares</div>
                    <div className="text-sm text-gray-400">Initial investment</div>
                  </div>
                </div>
                
                <div className="flex items-end">
                  <span className="text-5xl font-bold text-white">2.5K</span>
                  <span className="text-lg text-gray-400 ml-2 mb-1">shares</span>
                </div>
                
                <motion.div 
                  className="absolute bottom-0 left-0 h-1 bg-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: hoverMinimum ? '100%' : '0%' }}
                  transition={{ duration: 0.5 }}
                ></motion.div>
              </motion.div>
            </div>
            
            {/* Growth Potential Chart - Simplified Visualization */}
            <motion.div
              variants={itemVariants}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/5"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-yellow-400" />
                Historical Growth Rate
              </h3>
              
              <div className="h-12 bg-white/5 rounded-lg overflow-hidden relative mb-2">
                <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500 w-3/4 rounded-lg"></div>
                <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                  15% Annual Average
                </div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-400">
                <span>2018</span>
                <span>2020</span>
                <span>2022</span>
                <span>Present</span>
              </div>
            </motion.div>
            
            {/* CTA Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowContactForm(!showContactForm)}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium flex items-center justify-center group"
            >
              <span>{showContactForm ? 'Hide Request Form' : 'Request Investment Information'}</span>
              <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 transform group-hover:translate-x-1" />
            </motion.button>
            
            {/* Contact Form - Toggleable */}
            {showContactForm && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/5 overflow-hidden"
              >
                <h3 className="text-xl font-bold mb-4">Request Information</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" 
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                    <input 
                      type="email" 
                      className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" 
                      placeholder="Your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                    <input 
                      type="tel" 
                      className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" 
                      placeholder="Your phone number"
                    />
                  </div>
                  <button 
                    type="button"
                    className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium"
                  >
                    Submit Request
                  </button>
                </form>
              </motion.div>
            )}
          </motion.div>
          
          {/* Benefits Section */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-5 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          >
            <h3 className="text-2xl font-bold mb-6">Investment Benefits</h3>
            <motion.ul 
              variants={containerVariants}
              className="space-y-5"
            >
              {benefitItems.map((benefit, index) => (
                <motion.li 
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 mr-3 mt-1">{benefit.icon}</div>
                  <span className="text-gray-200">{benefit.text}</span>
                </motion.li>
              ))}
            </motion.ul>
            
            {/* Testimonial */}
            <motion.div
              variants={itemVariants}
              className="mt-8 pt-6 border-t border-white/10"
            >
              <p className="text-gray-300 italic text-sm">
                "I've been an Ayat shareholder since 2018. The returns have been exceptional, and it's gratifying to be part of Ethiopia's development."
              </p>
              <p className="text-white font-medium mt-2">— Abebe T., Investor since 2018</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Investment;