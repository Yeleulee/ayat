import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Search, Sliders, X, Map, Bed, Bath, Square, CheckCircle2, ArrowDown, ArrowUp, Heart, Building2 } from 'lucide-react';

// Define TypeScript interfaces for our data structure
interface Property {
  id: number;
  title: string;
  type: 'Apartment' | 'Villa' | 'Penthouse' | 'Townhouse';
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number; // in square meters
  location: string;
  description: string;
  image: string;
  featured: boolean;
}

const ProjectsPage: React.FC = () => {
  // Refs for animations
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [propertiesRef, propertiesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Animation controls
  const searchBarControls = useAnimation();
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  // State for filters
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 18200000]);
  const [bedroomFilter, setBedroomFilter] = useState<number | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [activeSortOption, setActiveSortOption] = useState<string>('Price: High to Low');
  const [showSortOptions, setShowSortOptions] = useState<boolean>(false);
  const [favoritedProperties, setFavoritedProperties] = useState<number[]>([]);
  const [visibleProperties, setVisibleProperties] = useState<number>(20);

  // Add state for video loading
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Check if device is mobile for optimization
  const [isMobile, setIsMobile] = useState(false);

  // Property data with high-quality images from Unsplash/Pexels
  const properties: Property[] = [
    {
      id: 1,
      title: "Serenity Heights",
      type: "Apartment",
      price: 4500000,
      bedrooms: 3,
      bathrooms: 2,
      area: 140,
      location: "Bole, Addis Ababa",
      description: "Elegant apartment with premium finishes, overlooking the city with breathtaking views.",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      featured: true
    },
    {
      id: 2,
      title: "Skyline Residences",
      type: "Penthouse",
      price: 8700000,
      bedrooms: 4,
      bathrooms: 3,
      area: 210,
      location: "Kazanchis, Addis Ababa",
      description: "Luxurious penthouse with panoramic views, private terrace, and premium amenities.",
      image: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg",
      featured: true
    },
    {
      id: 3,
      title: "Garden Villa",
      type: "Villa",
      price: 7200000,
      bedrooms: 5,
      bathrooms: 4,
      area: 350,
      location: "CMC, Addis Ababa",
      description: "Spacious villa with lush gardens, private pool, and modern design elements.",
      image: "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg",
      featured: false
    },
    {
      id: 4,
      title: "Metro Townhouse",
      type: "Townhouse",
      price: 3800000,
      bedrooms: 3,
      bathrooms: 2,
      area: 160,
      location: "Gerji, Addis Ababa",
      description: "Contemporary townhouse with smart home features and energy-efficient design.",
      image: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg",
      featured: false
    },
    {
      id: 5,
      title: "Harmony Suites",
      type: "Apartment",
      price: 5100000,
      bedrooms: 2,
      bathrooms: 2,
      area: 120,
      location: "Bole, Addis Ababa",
      description: "Boutique apartment with designer interiors and exclusive community amenities.",
      image: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg",
      featured: true
    },
    {
      id: 6,
      title: "Royal Mansion",
      type: "Villa",
      price: 9500000,
      bedrooms: 6,
      bathrooms: 5,
      area: 450,
      location: "Old Airport, Addis Ababa",
      description: "Prestigious villa with architectural excellence, home theater, and wine cellar.",
      image: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg",
      featured: true
    },
    {
      id: 7,
      title: "Urban Loft",
      type: "Apartment",
      price: 2900000,
      bedrooms: 1,
      bathrooms: 1,
      area: 85,
      location: "Piassa, Addis Ababa",
      description: "Modern loft apartment with industrial chic design in the heart of the city.",
      image: "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg",
      featured: false
    },
    {
      id: 8,
      title: "Horizon View",
      type: "Penthouse",
      price: 7800000,
      bedrooms: 3,
      bathrooms: 3,
      area: 190,
      location: "Bole, Addis Ababa",
      description: "Corner penthouse with floor-to-ceiling windows and custom Italian furnishings.",
      image: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
      featured: false
    },
    {
      id: 9,
      title: "Parkside Retreat",
      type: "Townhouse",
      price: 4200000,
      bedrooms: 4,
      bathrooms: 3,
      area: 175,
      location: "CMC, Addis Ababa",
      description: "Family townhouse adjacent to city park with private garden and outdoor kitchen.",
      image: "https://images.pexels.com/photos/1438834/pexels-photo-1438834.jpeg",
      featured: false
    },
    {
      id: 50,
      title: "Sapphire Residences",
      type: "Apartment",
      price: 6400000,
      bedrooms: 3,
      bathrooms: 2,
      area: 165,
      location: "Bole, Addis Ababa",
      description: "Luxurious apartment with high ceilings, smart home integration, and panoramic views of the city.",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      featured: true
    },
    {
      id: 51,
      title: "Crystal Manor",
      type: "Villa",
      price: 9200000,
      bedrooms: 5,
      bathrooms: 4,
      area: 410,
      location: "Old Airport, Addis Ababa",
      description: "Grand villa with crystal chandeliers, marble flooring, and expansive entertaining spaces.",
      image: "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg",
      featured: false
    },
    {
      id: 52,
      title: "Metro Apartments",
      type: "Apartment",
      price: 3900000,
      bedrooms: 2,
      bathrooms: 2,
      area: 120,
      location: "Mexico, Addis Ababa",
      description: "Urban-inspired apartments with efficient layouts and proximity to transit and shopping.",
      image: "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg",
      featured: false
    },
    {
      id: 53,
      title: "Cascade Heights",
      type: "Penthouse",
      price: 8800000,
      bedrooms: 4,
      bathrooms: 3,
      area: 220,
      location: "Kazanchis, Addis Ababa",
      description: "Multi-level penthouse with cascading terraces, jacuzzi, and 360-degree views.",
      image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
      featured: true
    },
    {
      id: 54,
      title: "Oak Valley",
      type: "Townhouse",
      price: 4400000,
      bedrooms: 3,
      bathrooms: 3,
      area: 180,
      location: "CMC, Addis Ababa",
      description: "Warm, inviting townhouse with hardwood details and mature landscaping.",
      image: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg",
      featured: false
    },
    {
      id: 55,
      title: "The Panorama",
      type: "Apartment",
      price: 5500000,
      bedrooms: 3,
      bathrooms: 2,
      area: 145,
      location: "Bole, Addis Ababa",
      description: "Corner apartment with wrap-around balcony and custom-designed interiors.",
      image: "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg",
      featured: false
    },
    {
      id: 56,
      title: "Embassy Gardens",
      type: "Villa",
      price: 11000000,
      bedrooms: 6,
      bathrooms: 5,
      area: 480,
      location: "Old Airport, Addis Ababa",
      description: "Diplomatic-style villa with security features, staff quarters, and formal gardens.",
      image: "https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg",
      featured: true
    },
    {
      id: 57,
      title: "Cube Lofts",
      type: "Apartment",
      price: 3200000,
      bedrooms: 1,
      bathrooms: 1,
      area: 90,
      location: "Piassa, Addis Ababa",
      description: "Geometric-inspired lofts with modular furniture and innovative storage solutions.",
      image: "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg",
      featured: false
    },
    {
      id: 58,
      title: "Sky Garden",
      type: "Penthouse",
      price: 9700000,
      bedrooms: 3,
      bathrooms: 4,
      area: 240,
      location: "Bole, Addis Ababa",
      description: "Penthouse oasis with rooftop vegetation, outdoor kitchen, and private elevator access.",
      image: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
      featured: false
    },
    {
      id: 59,
      title: "Parkview Terraces",
      type: "Townhouse",
      price: 4900000,
      bedrooms: 4,
      bathrooms: 3,
      area: 195,
      location: "CMC, Addis Ababa",
      description: "Multi-level terraced townhouse with direct park access and underground parking.",
      image: "https://images.pexels.com/photos/1438834/pexels-photo-1438834.jpeg",
      featured: false
    },
    {
      id: 60,
      title: "Platinum Heights",
      type: "Apartment",
      price: 6200000,
      bedrooms: 3,
      bathrooms: 2,
      area: 160,
      location: "Kazanchis, Addis Ababa",
      description: "Premium high-rise apartment with concierge service and exclusive resident amenities.",
      image: "https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg",
      featured: true
    },
    {
      id: 61,
      title: "Vineyard Estates",
      type: "Villa",
      price: 9800000,
      bedrooms: 5,
      bathrooms: 5,
      area: 440,
      location: "Entoto, Addis Ababa",
      description: "Mediterranean-inspired villa with wine cellar, tasting room, and olive garden.",
      image: "https://images.pexels.com/photos/2980955/pexels-photo-2980955.jpeg",
      featured: false
    },
    {
      id: 62,
      title: "The Minimalist",
      type: "Apartment",
      price: 3700000,
      bedrooms: 2,
      bathrooms: 1,
      area: 105,
      location: "Mexico, Addis Ababa",
      description: "Sleek, minimalist design with essential luxury features and clean aesthetic.",
      image: "https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg",
      featured: false
    },
    {
      id: 63,
      title: "Celestial Towers",
      type: "Penthouse",
      price: 10200000,
      bedrooms: 4,
      bathrooms: 4,
      area: 260,
      location: "Kazanchis, Addis Ababa",
      description: "Opulent penthouse with astronomically-inspired design, observatory, and smart lighting.",
      image: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg",
      featured: true
    },
    {
      id: 64,
      title: "Riverstone Row",
      type: "Townhouse",
      price: 4500000,
      bedrooms: 3,
      bathrooms: 3,
      area: 175,
      location: "Ayat, Addis Ababa",
      description: "Contemporary townhouse with stone accents, riverside location, and private dock.",
      image: "https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg",
      featured: false
    },
    {
      id: 65,
      title: "Urban Retreat",
      type: "Apartment",
      price: 4800000,
      bedrooms: 2,
      bathrooms: 2,
      area: 130,
      location: "Bole, Addis Ababa",
      description: "Tranquil apartment with wellness features including yoga space and meditation garden.",
      image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
      featured: false
    },
    {
      id: 66,
      title: "Heritage Mansion",
      type: "Villa",
      price: 13500000,
      bedrooms: 7,
      bathrooms: 6,
      area: 550,
      location: "Old Airport, Addis Ababa",
      description: "Historic-style mansion with modern amenities, grand staircase, and formal ballroom.",
      image: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg",
      featured: true
    },
    {
      id: 67,
      title: "Artist's Loft",
      type: "Apartment",
      price: 3400000,
      bedrooms: 1,
      bathrooms: 1,
      area: 95,
      location: "Piassa, Addis Ababa",
      description: "Creative space with abundant natural light, high ceilings, and gallery wall system.",
      image: "https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg",
      featured: false
    },
    {
      id: 68,
      title: "Crescent View",
      type: "Penthouse",
      price: 9300000,
      bedrooms: 3,
      bathrooms: 3,
      area: 230,
      location: "Bole, Addis Ababa",
      description: "Arc-shaped penthouse with dramatic curved windows and bespoke furniture throughout.",
      image: "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg",
      featured: false
    },
    {
      id: 69,
      title: "Maple Court",
      type: "Townhouse",
      price: 4200000,
      bedrooms: 3,
      bathrooms: 2,
      area: 165,
      location: "Gerji, Addis Ababa",
      description: "Warm, inviting townhouse with maple finishes, fireplaces, and reading nooks.",
      image: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg",
      featured: false
    },
    {
      id: 70,
      title: "Glass House",
      type: "Apartment",
      price: 5800000,
      bedrooms: 3,
      bathrooms: 2,
      area: 155,
      location: "Kazanchis, Addis Ababa",
      description: "Contemporary glass-walled apartment with sliding partitions and versatile living areas.",
      image: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
      featured: false
    },
    {
      id: 71,
      title: "Equestrian Estate",
      type: "Villa",
      price: 14200000,
      bedrooms: 8,
      bathrooms: 7,
      area: 620,
      location: "Entoto, Addis Ababa",
      description: "Magnificent country estate with stables, riding arena, and expansive grounds.",
      image: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg",
      featured: true
    },
    {
      id: 72,
      title: "Smart Living",
      type: "Apartment",
      price: 4100000,
      bedrooms: 2,
      bathrooms: 2,
      area: 115,
      location: "Jemo, Addis Ababa",
      description: "Cutting-edge smart apartment with voice-controlled systems and energy efficiency.",
      image: "https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg",
      featured: false
    },
    {
      id: 73,
      title: "Emperor's View",
      type: "Penthouse",
      price: 12500000,
      bedrooms: 5,
      bathrooms: 5,
      area: 300,
      location: "Bole, Addis Ababa",
      description: "Regal penthouse with palatial design, imported materials, and staff quarters.",
      image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
      featured: true
    },
    {
      id: 74,
      title: "Harmony Homes",
      type: "Townhouse",
      price: 4000000,
      bedrooms: 3,
      bathrooms: 2,
      area: 160,
      location: "CMC, Addis Ababa",
      description: "Balanced design principles create a harmonious living environment in this modern townhouse.",
      image: "https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg",
      featured: false
    },
    {
      id: 75,
      title: "Skyrise Suites",
      type: "Apartment",
      price: 5600000,
      bedrooms: 3,
      bathrooms: 2,
      area: 150,
      location: "Bole, Addis Ababa",
      description: "Upper-floor apartment with floor-to-ceiling windows and breathtaking aerial views.",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      featured: false
    },
    {
      id: 76,
      title: "Garden Paradise",
      type: "Villa",
      price: 8900000,
      bedrooms: 5,
      bathrooms: 4,
      area: 400,
      location: "Ayat, Addis Ababa",
      description: "Botanical lover's dream with greenhouse, rare plantings, and lush garden rooms.",
      image: "https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg",
      featured: false
    },
    {
      id: 77,
      title: "Industrial Chic",
      type: "Apartment",
      price: 3800000,
      bedrooms: 2,
      bathrooms: 1,
      area: 110,
      location: "Piassa, Addis Ababa",
      description: "Converted factory space with exposed brick, ductwork, and industrial-inspired fixtures.",
      image: "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg",
      featured: false
    },
    {
      id: 78,
      title: "Diamond Penthouse",
      type: "Penthouse",
      price: 9900000,
      bedrooms: 4,
      bathrooms: 4,
      area: 250,
      location: "Kazanchis, Addis Ababa",
      description: "Faceted architectural design with crystalline elements, luxe finishes, and private spa.",
      image: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
      featured: true
    },
    {
      id: 79,
      title: "Cypress Court",
      type: "Townhouse",
      price: 4600000,
      bedrooms: 4,
      bathrooms: 3,
      area: 185,
      location: "CMC, Addis Ababa",
      description: "Evergreen-lined townhouse with classic architecture and contemporary interiors.",
      image: "https://images.pexels.com/photos/1438834/pexels-photo-1438834.jpeg",
      featured: false
    },
    {
      id: 80,
      title: "Wellness Residences",
      type: "Apartment",
      price: 5100000,
      bedrooms: 2,
      bathrooms: 2,
      area: 135,
      location: "Bole, Addis Ababa",
      description: "Health-focused apartment with air purification, water filtration, and fitness studio.",
      image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
      featured: false
    },
    {
      id: 81,
      title: "Ambassador's Residence",
      type: "Villa",
      price: 12800000,
      bedrooms: 6,
      bathrooms: 6,
      area: 520,
      location: "Old Airport, Addis Ababa",
      description: "Stately villa with formal reception rooms, security features, and diplomatic pedigree.",
      image: "https://images.pexels.com/photos/2980955/pexels-photo-2980955.jpeg",
      featured: true
    },
    {
      id: 82,
      title: "Eco Apartments",
      type: "Apartment",
      price: 4300000,
      bedrooms: 2,
      bathrooms: 2,
      area: 125,
      location: "Jemo, Addis Ababa",
      description: "Sustainable building with solar power, greywater systems, and eco-friendly materials.",
      image: "https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg",
      featured: false
    },
    {
      id: 83,
      title: "Infinity Sky",
      type: "Penthouse",
      price: 11200000,
      bedrooms: 4,
      bathrooms: 4,
      area: 275,
      location: "Bole, Addis Ababa",
      description: "Boundary-pushing design with infinity pool, retractable roof, and smart glass technology.",
      image: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
      featured: true
    },
    {
      id: 84,
      title: "Urban Meadows",
      type: "Townhouse",
      price: 4350000,
      bedrooms: 3,
      bathrooms: 3,
      area: 170,
      location: "Gerji, Addis Ababa",
      description: "Nature-inspired townhouse with wildflower garden, beehives, and organic design elements.",
      image: "https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg",
      featured: false
    },
    {
      id: 85,
      title: "The Observatory",
      type: "Apartment",
      price: 5950000,
      bedrooms: 3,
      bathrooms: 2,
      area: 155,
      location: "Kazanchis, Addis Ababa",
      description: "Astronomy-inspired apartment with star-gazing deck, telescope, and celestial themes.",
      image: "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg",
      featured: false
    },
    {
      id: 86,
      title: "Sandstone Manor",
      type: "Villa",
      price: 10600000,
      bedrooms: 5,
      bathrooms: 5,
      area: 460,
      location: "Summit Area, Addis Ababa",
      description: "Desert-inspired villa with warm tones, courtyard fountain, and temperature-controlled wine room.",
      image: "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg",
      featured: false
    },
    {
      id: 87,
      title: "Artist's Studio",
      type: "Apartment",
      price: 3100000,
      bedrooms: 1,
      bathrooms: 1,
      area: 85,
      location: "Piassa, Addis Ababa",
      description: "Creative live-work space with north-facing windows, built-in easels, and art storage.",
      image: "https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg",
      featured: false
    },
    {
      id: 88,
      title: "Presidential Penthouse",
      type: "Penthouse",
      price: 15000000,
      bedrooms: 5,
      bathrooms: 5,
      area: 320,
      location: "Bole, Addis Ababa",
      description: "Ultra-luxury penthouse with helicopter access, panic room, and diplomatic-grade security.",
      image: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
      featured: true
    },
    {
      id: 89,
      title: "Bamboo Gardens",
      type: "Townhouse",
      price: 4700000,
      bedrooms: 3,
      bathrooms: 3,
      area: 180,
      location: "CMC, Addis Ababa",
      description: "Asian-inspired townhouse with bamboo features, zen garden, and minimalist design.",
      image: "https://images.pexels.com/photos/1438834/pexels-photo-1438834.jpeg",
      featured: false
    },
    {
      id: 90,
      title: "Luminous Heights",
      type: "Penthouse",
      price: 16500000,
      bedrooms: 6,
      bathrooms: 6,
      area: 380,
      location: "Bole, Addis Ababa",
      description: "The crown jewel of Addis Ababa with 360° views, private elevator, infinity pool, and smart home automation throughout every room.",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      featured: true
    },
    {
      id: 91,
      title: "Ivory Palace",
      type: "Villa",
      price: 18200000,
      bedrooms: 8,
      bathrooms: 9,
      area: 720,
      location: "Old Airport, Addis Ababa",
      description: "Ethiopia's most prestigious estate with marble floors, grand ballroom, private cinema, indoor and outdoor pools, and 24/7 security system.",
      image: "https://images.pexels.com/photos/2980955/pexels-photo-2980955.jpeg",
      featured: true
    },
    {
      id: 12,
      title: "Olive Grove Estate",
      type: "Villa",
      price: 8100000,
      bedrooms: 5,
      bathrooms: 4,
      area: 380,
      location: "Ayat, Addis Ababa",
      description: "Mediterranean-inspired villa set in mature gardens with outdoor entertaining areas and pool.",
      image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
      featured: false
    }
  ];

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Animation effects when in view
  useEffect(() => {
    if (headerInView) {
      const sequence = async () => {
        await searchBarControls.start({ opacity: 1, y: 0, transition: { duration: 0.8 } });
        if (searchButtonRef.current) {
          searchButtonRef.current.classList.add('pulse-animation');
        }
      };
      sequence();
    }
  }, [headerInView, searchBarControls]);

  // Calculate price range dynamically based on available properties
  useEffect(() => {
    if (properties && properties.length > 0) {
      const minPrice = Math.min(...properties.map(property => property.price));
      const maxPrice = Math.max(...properties.map(property => property.price));
      setPriceRange([minPrice, maxPrice]);
      console.log("Price range set to:", minPrice, maxPrice);
      console.log("Total properties:", properties.length);
    }
  }, []);

  // Toggle favorite property
  const toggleFavorite = (id: number) => {
    if (favoritedProperties.includes(id)) {
      setFavoritedProperties(favoritedProperties.filter(propId => propId !== id));
    } else {
      setFavoritedProperties([...favoritedProperties, id]);
    }
  };

  // Format price as currency
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'ETB',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Filter and sort properties based on user selection
  const filteredAndSortedProperties = useMemo(() => {
    console.log("Total properties before filtering:", properties.length);
    
    let filtered = properties.filter(property => {
      // Price filter
      if (property.price < priceRange[0] || property.price > priceRange[1]) {
        return false;
      }
      
      // Bedroom filter
      if (bedroomFilter !== null && property.bedrooms < bedroomFilter) {
        return false;
      }
      
      // Property type filter
      if (typeFilter !== null && property.type !== typeFilter) {
        return false;
      }
      
      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        return (
          property.title.toLowerCase().includes(query) ||
          property.location.toLowerCase().includes(query) ||
          property.description.toLowerCase().includes(query)
        );
      }
      
      return true;
    });

    console.log("Filtered properties count:", filtered.length);
    console.log("Price range filter:", priceRange);
    console.log("Bedroom filter:", bedroomFilter);
    console.log("Type filter:", typeFilter);
    console.log("Search query:", searchQuery);
    
    // Sort properties
    switch (activeSortOption) {
      case 'Price: High to Low':
        return filtered.sort((a, b) => b.price - a.price);
      case 'Price: Low to High':
        return filtered.sort((a, b) => a.price - b.price);
      case 'Newest':
        return filtered.sort((a, b) => b.id - a.id);
      case 'Bedrooms':
        return filtered.sort((a, b) => b.bedrooms - a.bedrooms);
      default:
        return filtered;
    }
  }, [properties, priceRange, bedroomFilter, typeFilter, searchQuery, activeSortOption]);

  // Get unique property types
  const propertyTypes = [...new Set(properties.map(property => property.type))];
  
  // Calculate price statistics
  const averagePrice = useMemo(() => {
    const sum = filteredAndSortedProperties.reduce((acc, property) => acc + property.price, 0);
    return sum / (filteredAndSortedProperties.length || 1);
  }, [filteredAndSortedProperties]);
  
  // Animation variants
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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        delay: i * 0.1,
        duration: 0.6,
        ease: [0, 0.71, 0.2, 1.01]
      }
    }),
    hover: {
      y: -12,
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const buttonHoverVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  // Function to load more properties
  const loadMoreProperties = () => {
    setVisibleProperties(prev => Math.min(prev + 20, filteredAndSortedProperties.length));
    console.log("Loading more properties, now showing:", Math.min(visibleProperties + 20, filteredAndSortedProperties.length));
  };

  // Video background fallback image
  const headerBgFallback = "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg";

  return (
    <div className="bg-gray-50 py-10 sm:py-16 md:py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header with Video Background */}
        <motion.div 
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="mb-10 sm:mb-16 md:mb-20 relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl"
        >
          {/* Video Background with responsive height */}
          <div className="relative w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/60 z-10"></div>
            
            {/* Fallback image shown until video loads or if video fails */}
            <img
              src={headerBgFallback}
              alt="Luxury Real Estate"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${videoLoaded && !videoError ? 'opacity-0' : 'opacity-100'}`}
              loading="eager"
            />
            
            {/* Video optimized for device type */}
            {!isMobile && (
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoadedData={() => setVideoLoaded(true)}
                onError={() => setVideoError(true)}
              >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-modern-house-with-pool-aerial-view-4649-large.mp4" type="video/mp4" />
              </video>
            )}
            
            {/* Header Content Overlay - responsive layout */}
            <div className="relative z-20 h-full flex flex-col justify-center items-center text-center p-4 sm:p-6 md:p-8">
              <motion.div
                variants={itemVariants}
                className="bg-black/30 backdrop-blur-sm p-5 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl max-w-xl sm:max-w-2xl md:max-w-3xl w-full"
              >
                <motion.h1 
                  variants={itemVariants}
                  className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-6 text-white leading-tight"
                >
                  Discover Your Dream Home
                </motion.h1>
                <motion.p 
                  variants={itemVariants}
                  className="text-base sm:text-lg md:text-xl text-gray-200 mx-auto mb-6 sm:mb-10"
                >
                  Browse our collection of luxury properties in Addis Ababa's most sought-after neighborhoods.
                </motion.p>
                
                {/* Search input with animation - responsive */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={searchBarControls}
                  className="relative max-w-md sm:max-w-lg md:max-w-2xl mx-auto"
                >
                  <input
                    type="text"
                    placeholder="Search by location, property name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 sm:pl-16 pr-4 py-3 sm:py-4 rounded-lg sm:rounded-xl border border-white/20 bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-md text-base sm:text-lg text-white placeholder:text-gray-300"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                    className="absolute left-3 sm:left-5 top-1/2 transform -translate-y-1/2 text-white"
                  >
                    <Search className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white"
                    >
                      <X size={18} />
                    </button>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter Section - responsive improvements */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8 sm:mb-12 bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="flex flex-col md:flex-row justify-between items-center p-4 sm:p-6">
            {/* Filter Toggle Button with animation */}
            <motion.button
              ref={searchButtonRef}
              variants={buttonHoverVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 sm:px-6 py-3 sm:py-4 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors mb-4 md:mb-0 relative w-full md:w-auto justify-center md:justify-start"
            >
              <Sliders size={18} className="text-blue-500" />
              <span className="font-medium text-blue-700">Filters</span>
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={showFilters ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                className="absolute -top-2 -right-2 w-5 h-5 bg-blue-500 rounded-full text-white text-xs flex items-center justify-center"
              >
                {bedroomFilter || typeFilter || searchQuery ? '!' : ''}
              </motion.span>
            </motion.button>
            
            {/* Price Stats Card */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl px-4 sm:px-6 py-3 flex items-center w-full md:w-auto justify-center md:justify-start">
              <div className="text-center">
                <p className="text-xs text-blue-700 font-semibold uppercase tracking-wider">Average Price</p>
                <p className="font-bold text-blue-900">{formatPrice(averagePrice)}</p>
              </div>
              <div className="h-12 w-px bg-blue-200 mx-4 sm:mx-6"></div>
              <div className="text-center">
                <p className="text-xs text-blue-700 font-semibold uppercase tracking-wider">Price Range</p>
                <p className="font-bold text-blue-900">
                  {formatPrice(Math.min(...filteredAndSortedProperties.map(p => p.price)))} - {formatPrice(Math.max(...filteredAndSortedProperties.map(p => p.price)))}
                </p>
              </div>
            </div>
          </div>

          {/* Expandable Filters with smooth animation */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="overflow-hidden bg-blue-50"
              >
                <div className="p-6 border-t border-blue-100">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Price Range Filter with animated range slider */}
                    <div className="bg-white p-5 rounded-xl shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                          <span className="text-blue-600 font-bold">₹</span>
                        </span>
                        Price Range
                      </h3>
                      
                      <div className="mb-2 flex justify-between text-sm text-gray-600">
                        <span>{formatPrice(priceRange[0])}</span>
                        <span>{formatPrice(priceRange[1])}</span>
                      </div>
                      
                      <div className="relative mb-8 mt-6">
                        {/* Custom slider track */}
                        <div className="absolute h-2 w-full bg-gray-200 rounded-full"></div>
                        <div 
                          className="absolute h-2 bg-blue-500 rounded-full" 
                          style={{ 
                            left: '0%',
                            width: `${((priceRange[1] - Math.min(...properties.map(p => p.price))) / (Math.max(...properties.map(p => p.price)) - Math.min(...properties.map(p => p.price)))) * 100}%`
                          }}
                        ></div>
                        
                        {/* Range input (actual control) */}
                        <input
                          type="range"
                          min={Math.min(...properties.map(p => p.price))}
                          max={Math.max(...properties.map(p => p.price))}
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                          className="w-full absolute appearance-none bg-transparent h-2 cursor-pointer"
                          style={{ zIndex: 2 }}
                        />
                      </div>
                      
                      {/* Current selection indicator */}
                      <div className="px-4 py-2 rounded-lg bg-blue-50 text-blue-700 text-sm font-medium">
                        Currently viewing properties up to {formatPrice(priceRange[1])}
                      </div>
                    </div>

                    {/* Bedrooms Filter with improved UI */}
                    <div className="bg-white p-5 rounded-xl shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                          <Bed size={16} className="text-blue-600" />
                        </span>
                        Bedrooms
                      </h3>
                      <div className="grid grid-cols-5 gap-2">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <motion.button
                            key={num}
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setBedroomFilter(bedroomFilter === num ? null : num)}
                            className={`py-3 rounded-lg flex flex-col items-center justify-center transition-all duration-200 ${
                              bedroomFilter === num
                                ? 'bg-blue-500 text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            <span className="font-bold text-lg">{num}+</span>
                            <span className="text-xs mt-1">
                              {bedroomFilter === num && <CheckCircle2 size={12} className="inline ml-1" />}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Property Type Filter with animated selection */}
                    <div className="bg-white p-5 rounded-xl shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                          <Building2 size={16} className="text-blue-600" />
                        </span>
                        Property Type
                      </h3>
                      <div className="space-y-2">
                        {propertyTypes.map((type) => (
                          <motion.button
                            key={type}
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setTypeFilter(typeFilter === type ? null : type)}
                            className={`w-full py-3 px-4 rounded-lg flex items-center justify-between transition-all duration-200 ${
                              typeFilter === type
                                ? 'bg-blue-500 text-white font-medium shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            <span>{type}</span>
                            {typeFilter === type && <CheckCircle2 size={16} />}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Clear Filters Button */}
                  <div className="mt-8 flex justify-end">
                    <motion.button
                      variants={buttonHoverVariants}
                      initial="rest"
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => {
                        setPriceRange([
                          Math.min(...properties.map(p => p.price)),
                          Math.max(...properties.map(p => p.price))
                        ]);
                        setBedroomFilter(null);
                        setTypeFilter(null);
                        setSearchQuery('');
                      }}
                      className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors shadow-sm"
                    >
                      Clear all filters
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Count and Sort Controls - improve responsive layout */}
        <div className="mb-6 sm:mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 font-semibold"
            >
              {filteredAndSortedProperties.length}
            </motion.div>
            <p className="text-gray-700">
              <span className="font-medium">{filteredAndSortedProperties.length}</span> properties found
              {(bedroomFilter || typeFilter || searchQuery) ? 
                <span className="text-gray-500 ml-1">with your filters</span> : ''}
            </p>
          </div>
          
          {/* Dropdown sort selector with animation */}
          <div className="relative w-full sm:w-auto">
            <motion.button
              variants={buttonHoverVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              onClick={() => setShowSortOptions(!showSortOptions)}
              className="flex items-center justify-between w-full sm:min-w-52 px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-blue-300 transition-colors"
            >
              <span className="text-gray-700">{activeSortOption}</span>
              <motion.div
                animate={{ rotate: showSortOptions ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {showSortOptions ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
              </motion.div>
            </motion.button>
            
            <AnimatePresence>
              {showSortOptions && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-10 w-full"
                >
                  {['Price: High to Low', 'Price: Low to High', 'Newest', 'Bedrooms'].map((option) => (
                    <motion.button
                      key={option}
                      whileHover={{ backgroundColor: "#f3f4f6" }}
                      onClick={() => {
                        setActiveSortOption(option);
                        setShowSortOptions(false);
                      }}
                      className={`block w-full text-left px-4 py-3 text-sm ${
                        activeSortOption === option 
                          ? 'bg-blue-50 text-blue-700 font-medium' 
                          : 'text-gray-700'
                      }`}
                    >
                      {option}
                      {activeSortOption === option && (
                        <CheckCircle2 size={14} className="inline ml-2" />
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Properties Grid - improve responsive layout */}
        <motion.div 
          ref={propertiesRef}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          {filteredAndSortedProperties.length > 0 ? (
            <>
              {filteredAndSortedProperties.slice(0, visibleProperties).map((property, index) => (
                <motion.div
                  key={property.id}
                  custom={index}
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300"
                >
                  <div className="relative">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                      className="overflow-hidden"
                    >
                      <img 
                        src={property.image} 
                        alt={property.title}
                        className="w-full h-64 object-cover transition-transform duration-500"
                      />
                    </motion.div>
                    
                    {property.featured && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white py-1 px-4 rounded-full text-xs font-semibold shadow-md">
                        Featured
                      </div>
                    )}
                    
                    {/* Favorite Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleFavorite(property.id)}
                      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md"
                    >
                      <Heart 
                        size={18} 
                        className={favoritedProperties.includes(property.id) 
                          ? "fill-red-500 text-red-500" 
                          : "text-gray-600"} 
                      />
                    </motion.button>
                    
                    {/* Price tag */}
                    <div className="absolute -bottom-5 right-4">
                      <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-2 rounded-full shadow-lg">
                        <span className="font-bold">{formatPrice(property.price)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 pt-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{property.title}</h3>
                    <div className="flex items-center mb-4 text-gray-600">
                      <Map size={16} className="mr-1 text-blue-500" />
                      <span className="text-sm">{property.location}</span>
                    </div>
                    
                    <p className="text-gray-600 mb-6 line-clamp-2">{property.description}</p>
                    
                    <div className="grid grid-cols-3 gap-2 mb-6">
                      <div className="flex flex-col items-center justify-center py-2 bg-gray-50 rounded-lg">
                        <Bed size={18} className="text-blue-500 mb-1" />
                        <span className="text-gray-800 font-medium">{property.bedrooms}</span>
                        <span className="text-xs text-gray-500">Beds</span>
                      </div>
                      <div className="flex flex-col items-center justify-center py-2 bg-gray-50 rounded-lg">
                        <Bath size={18} className="text-blue-500 mb-1" />
                        <span className="text-gray-800 font-medium">{property.bathrooms}</span>
                        <span className="text-xs text-gray-500">Baths</span>
                      </div>
                      <div className="flex flex-col items-center justify-center py-2 bg-gray-50 rounded-lg">
                        <Square size={18} className="text-blue-500 mb-1" />
                        <span className="text-gray-800 font-medium">{property.area}</span>
                        <span className="text-xs text-gray-500">m²</span>
                      </div>
                    </div>
                    
                    <motion.button 
                      variants={buttonHoverVariants}
                      initial="rest"
                      whileHover="hover"
                      whileTap="tap"
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      View Details
                    </motion.button>
                  </div>
                </motion.div>
              ))}
              
              {/* See More Button */}
              {visibleProperties < filteredAndSortedProperties.length && (
                <div className="col-span-full flex justify-center my-12">
                  <motion.button
                    variants={buttonHoverVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    onClick={loadMoreProperties}
                    className="px-10 py-4 bg-white border border-blue-300 text-blue-600 rounded-xl font-medium shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2"
                  >
                    See More Properties
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
                    </svg>
                  </motion.button>
                </div>
              )}
            </>
          ) : (
            <motion.div 
              variants={itemVariants}
              className="col-span-full py-20 flex flex-col items-center justify-center"
            >
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Search size={32} className="text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No properties found</h3>
              <p className="text-gray-600 mb-8 text-center max-w-md">
                We couldn't find any properties matching your current filters. Try adjusting your search criteria.
              </p>
              <motion.button
                variants={buttonHoverVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                onClick={() => {
                  setPriceRange([
                    Math.min(...properties.map(p => p.price)),
                    Math.max(...properties.map(p => p.price))
                  ]);
                  setBedroomFilter(null);
                  setTypeFilter(null);
                  setSearchQuery('');
                }}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full shadow-md"
              >
                Reset All Filters
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectsPage; 