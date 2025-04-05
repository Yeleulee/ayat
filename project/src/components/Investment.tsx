import React from 'react';
import { Landmark } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Investment = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

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

  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className="py-24 bg-black text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariants}>
            <Landmark className="w-12 h-12 mb-6" />
            <h2 className="text-4xl font-bold mb-6">Investment Opportunities</h2>
            <p className="text-gray-300 mb-8">
              Join Ayat Share Company and become a part-owner in Ethiopia's leading real estate developer. Our unique investment structure offers accessible entry points with significant growth potential.
            </p>
            <motion.div 
              variants={containerVariants}
              className="space-y-4"
            >
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="flex items-center"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4">
                  <span className="font-bold">100</span>
                </div>
                <div>
                  <div className="font-medium">Birr per share</div>
                  <div className="text-sm text-gray-400">Starting price</div>
                </div>
              </motion.div>
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="flex items-center"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4">
                  <span className="font-bold">2.5K</span>
                </div>
                <div>
                  <div className="font-medium">Minimum shares</div>
                  <div className="text-sm text-gray-400">Initial investment</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-white/10 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6">Investment Benefits</h3>
            <motion.ul 
              variants={containerVariants}
              className="space-y-4"
            >
              {[
                "No service charge for existing shareholders",
                "Flexible investment options",
                "Part ownership in prime real estate",
                "Regular dividend payments"
              ].map((benefit, index) => (
                <motion.li 
                  key={index}
                  variants={itemVariants}
                  className="flex items-center"
                >
                  <div className="w-2 h-2 bg-white rounded-full mr-4"></div>
                  <span>{benefit}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Investment;