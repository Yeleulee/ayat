import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Star, MapPin } from 'lucide-react';

interface FeaturedProperty {
  id: number;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  description: string;
}

const FeaturedHomes: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Track loaded images
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  
  // Handle image load
  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => ({...prev, [id]: true}));
  };
  
  // Handle image error
  const handleImageError = (id: number) => {
    console.error(`Failed to load image for featured property ID: ${id}`);
    setLoadedImages(prev => ({...prev, [id]: true}));
  };

  // Featured properties with consistent high-quality Unsplash images of homes
  const featuredProperties: FeaturedProperty[] = [
    {
      id: 1,
      title: "Luxury Penthouse with Panoramic Views",
      location: "Bole, Addis Ababa",
      price: 12500000,
      bedrooms: 4,
      bathrooms: 3,
      area: 280,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&q=80&w=1080",
      description: "Experience the height of luxury living with this exclusive penthouse offering breathtaking panoramic views of the city."
    },
    {
      id: 2,
      title: "Modern Garden Villa",
      location: "CMC, Addis Ababa",
      price: 8900000,
      bedrooms: 5,
      bathrooms: 4,
      area: 420,
      image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&q=80&w=1080",
      description: "An architectural masterpiece featuring expansive gardens, open floor plans, and state-of-the-art amenities."
    },
    {
      id: 3,
      title: "Executive Townhouse",
      location: "Old Airport, Addis Ababa",
      price: 6200000,
      bedrooms: 3,
      bathrooms: 3,
      area: 210,
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&q=80&w=1080",
      description: "Perfect for the modern professional, this townhouse combines elegant design with practical living spaces."
    },
    {
      id: 4,
      title: "Elegant Family Home",
      location: "Summit, Addis Ababa",
      price: 9800000,
      bedrooms: 5,
      bathrooms: 4,
      area: 380,
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&q=80&w=1080",
      description: "Magnificent family residence with spacious rooms, beautifully landscaped garden, and modern amenities for comfortable living."
    },
    {
      id: 5,
      title: "Contemporary Lakeside Villa",
      location: "Entoto, Addis Ababa",
      price: 14500000,
      bedrooms: 6,
      bathrooms: 5,
      area: 520,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&q=80&w=1080",
      description: "Stunning waterfront property with floor-to-ceiling windows, private dock, and panoramic views of the natural surroundings."
    },
    {
      id: 6,
      title: "Urban Luxury Apartment",
      location: "Kazanchis, Addis Ababa",
      price: 7200000,
      bedrooms: 3,
      bathrooms: 2,
      area: 175,
      image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&q=80&w=1080",
      description: "Sophisticated city apartment with designer finishes, integrated smart home technology, and exclusive access to premium amenities."
    }
  ];

  // Format price as currency
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'ETB',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Animation variants
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <section className="py-16 sm:py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-12 sm:mb-16 text-center">
          <span className="inline-block mb-4 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
            Featured Properties
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Most Exclusive Offerings
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Discover handpicked luxury homes that represent the pinnacle of real estate in Addis Ababa
          </p>
        </div>
        
        {/* Featured properties grid */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredProperties.map((property) => (
            <motion.div
              key={property.id}
              variants={itemVariants}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 h-full flex flex-col"
            >
              {/* Property image with consistent aspect ratio */}
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* Loading placeholder */}
                <div 
                  className={`absolute inset-0 bg-gray-200 transition-opacity duration-500 ${loadedImages[property.id] ? 'opacity-0' : 'opacity-100'}`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="animate-spin h-10 w-10 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                </div>
                
                {/* Featured badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="flex items-center bg-yellow-400 text-yellow-900 px-3 py-1.5 rounded-full text-xs font-semibold shadow-md">
                    <Star size={14} className="mr-1 fill-yellow-900" />
                    Featured
                  </div>
                </div>
                
                {/* Property image */}
                <img
                  src={property.image}
                  alt={`${property.title} - ${property.location}`}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${loadedImages[property.id] ? 'opacity-100' : 'opacity-0'}`}
                  loading="lazy"
                  onLoad={() => handleImageLoad(property.id)}
                  onError={() => handleImageError(property.id)}
                />
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-gray-500 mb-2">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">{property.location}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{property.title}</h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2">{property.description}</p>
                
                {/* Property details */}
                <div className="flex justify-between items-center py-3 border-t border-gray-100 mb-4 mt-auto">
                  <div className="text-center">
                    <span className="block text-gray-900 font-semibold">{property.bedrooms}</span>
                    <span className="text-xs text-gray-500">Bedrooms</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-gray-900 font-semibold">{property.bathrooms}</span>
                    <span className="text-xs text-gray-500">Bathrooms</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-gray-900 font-semibold">{property.area}m²</span>
                    <span className="text-xs text-gray-500">Area</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-blue-600 font-bold text-xl">
                    {formatPrice(property.price)}
                  </div>
                  
                  <motion.button
                    variants={buttonVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-blue-50 hover:bg-blue-100 transition-colors"
                  >
                    <ArrowRight size={20} className="text-blue-600" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* View All button */}
        <div className="mt-12 text-center">
          <motion.button
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            className="inline-flex items-center justify-center px-8 py-3 min-h-[44px] bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-md"
          >
            View All Properties
            <ArrowRight size={18} className="ml-2" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedHomes; 