import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const projects = [
    {
      id: 1,
      title: "Kazanchis Apartments",
      description: "Luxury apartments in central Addis Ababa",
      image: {
        small: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=480",
        medium: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
        large: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
      }
    },
    {
      id: 2,
      title: "Commercial Complex",
      description: "Modern retail and office spaces",
      image: {
        small: "https://images.pexels.com/photos/256150/pexels-photo-256150.jpeg?auto=compress&cs=tinysrgb&w=480",
        medium: "https://images.pexels.com/photos/256150/pexels-photo-256150.jpeg?auto=compress&cs=tinysrgb&w=800",
        large: "https://images.pexels.com/photos/256150/pexels-photo-256150.jpeg"
      }
    },
    {
      id: 3,
      title: "Villa Community",
      description: "Exclusive residential development",
      image: {
        small: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=480",
        medium: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=800",
        large: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg"
      }
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8
      }
    }
  };

  const getResponsiveImage = (project: typeof projects[0]) => {
    if (typeof window === 'undefined') return project.image.medium;
    
    const width = window.innerWidth;
    if (width < 640) return project.image.small;
    if (width < 1024) return project.image.medium;
    return project.image.large;
  };

  return (
    <div className="py-16 sm:py-20 md:py-24 bg-gray-50">
      <motion.div 
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div 
          variants={itemVariants}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Properties</h2>
          <p className="text-gray-600 max-w-2xl mx-auto px-4">
            Discover our latest developments across Addis Ababa, setting new standards in modern living and commercial spaces.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group cursor-pointer flex flex-col h-full"
            >
              <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
                <motion.img 
                  src={getResponsiveImage(project)}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mt-2">{project.title}</h3>
                <p className="text-gray-600 mt-2">{project.description}</p>
              </div>
              <div className="mt-auto p-4 pt-0">
                <motion.div 
                  className="mt-2 inline-flex items-center text-blue-600 font-medium"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <span>View details</span>
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Projects;