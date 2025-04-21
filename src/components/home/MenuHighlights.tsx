import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faUtensils, faBeer, faStar, faFire, faHeart } from '@fortawesome/free-solid-svg-icons';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';

const MenuHighlights = () => {
  const [activeCategory, setActiveCategory] = useState('coffee');
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [rotationValues, setRotationValues] = useState<Array<{x: number, y: number}>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // For parallax effect - using fewer motion values to reduce overhead
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // For background animation - using more moderate transform values
  const backgroundX = useTransform(mouseX, [-300, 300], [5, -5]);
  const backgroundY = useTransform(mouseY, [-300, 300], [5, -5]);

  // Handle mouse movement with debouncing to improve performance
  useEffect(() => {
    let frameId: number;
    let lastUpdate = 0;
    const updateInterval = 50; // ms - throttle mouse events

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastUpdate < updateInterval) return;
      
      lastUpdate = now;
      cancelAnimationFrame(frameId);
      
      frameId = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const relativeX = (e.clientX - centerX) / (rect.width / 2);
        const relativeY = (e.clientY - centerY) / (rect.height / 2);
        
        mouseX.set(relativeX * 200); // Reduced multiplier for better performance
        mouseY.set(relativeY * 200);
      });
    };
    
    // Initialize rotation values for each card
    const menuItemsCount = menuItems[activeCategory as keyof typeof menuItems].length;
    const newRotationValues = Array(menuItemsCount).fill(0).map(() => ({
      x: Math.random() * 5 - 2.5,
      y: Math.random() * 5 - 2.5
    }));
    setRotationValues(newRotationValues);
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, [activeCategory]);

  // Backgrounds for different categories
  const categoryBackgrounds = {
    coffee: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    food: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    drinks: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80'
  };

  const categories = [
    { id: 'coffee', name: 'Coffee', icon: faCoffee },
    { id: 'food', name: 'Food', icon: faUtensils },
    { id: 'drinks', name: 'Cocktails', icon: faBeer }
  ];

  const menuItems = {
    coffee: [
      {
        name: 'Signature Espresso',
        description: 'Our house blend with notes of chocolate and caramel',
        price: '₹375',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
      },
      {
        name: 'Caramel Macchiato',
        description: 'Espresso with steamed milk and caramel drizzle',
        price: '₹450',
        image: 'https://images.unsplash.com/photo-1534687941688-651ccaafbff8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
      },
      {
        name: 'Pour Over',
        description: 'Single-origin beans prepared with precision',
        price: '₹415',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
      },
      {
        name: 'Cold Brew',
        description: 'Slow-steeped for 24 hours, smooth and refreshing',
        price: '₹450',
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80'
      }
    ],
    food: [
      {
        name: 'Avocado Toast',
        description: 'Sourdough bread with avocado, cherry tomatoes, and microgreens',
        price: '₹995',
        image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80'
      },
      {
        name: 'Eggs Benedict',
        description: 'Poached eggs on English muffin with hollandaise sauce',
        price: '₹1,195',
        image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
      },
      {
        name: 'Truffle Pasta',
        description: 'Fresh fettuccine with wild mushrooms and truffle oil',
        price: '₹1,325',
        image: 'https://images.unsplash.com/photo-1633436374961-09b92742047b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
      },
      {
        name: 'Grilled Salmon',
        description: 'With seasonal vegetables and lemon herb sauce',
        price: '₹1,825',
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
      }
    ],
    drinks: [
      {
        name: 'Espresso Martini',
        description: 'Vodka, coffee liqueur, and fresh espresso',
        price: '₹1,075',
        image: 'https://images.unsplash.com/photo-1556679343-c1c1a5733de4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80'
      },
      {
        name: 'Golden Hour',
        description: 'Bourbon, honey, lemon, and ginger beer',
        price: '₹1,150',
        image: 'https://images.unsplash.com/photo-1587223962930-cb7f31384c19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
      },
      {
        name: 'Berry Bliss',
        description: 'Gin, muddled berries, and elderflower liqueur',
        price: '₹1,250',
        image: 'https://images.unsplash.com/photo-1607446045710-d5a8b2906202?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80'
      },
      {
        name: 'Smoky Old Fashioned',
        description: 'Smoked bourbon, bitters, and orange peel',
        price: '₹1,325',
        image: 'https://images.unsplash.com/photo-1560512823-829485a72212?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
      },
      {
        name: 'Café Negroni',
        description: 'Gin, Campari, sweet vermouth with coffee infusion',
        price: '₹1,250',
        image: 'https://images.unsplash.com/photo-1525373698358-041e3a460346?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80'
      },
      {
        name: 'Spiced Mojito',
        description: 'White rum, fresh mint, lime, cinnamon and star anise',
        price: '₹1,195',
        image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80'
      }
    ]
  };

  // Simplified variants - fewer properties and optimized transitions
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.08, // reduced delay between items
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -10,
      scale: 1.03,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3
      }
    }
  };

  // Animation for category buttons - simplified
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  // Optimized floating elements - fewer elements
  const floatingElements = Array.from({ length: 2 }).map((_, i) => ({
    delay: i * 0.7,
    duration: 15 + i * 5,
    size: 100 + Math.random() * 100,
    y: 150 + Math.random() * 300,
    x: 150 + Math.random() * 700,
    color: activeCategory === 'coffee' 
        ? 'rgba(101, 67, 33, 0.12)' 
        : activeCategory === 'food'
        ? 'rgba(133, 100, 4, 0.12)'
        : 'rgba(128, 0, 32, 0.12)'
  }));

  return (
    <section className="py-24 relative overflow-hidden" ref={containerRef}>
      {/* Background with reduced animation complexity */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-fixed z-0 transition-all duration-1000" 
        style={{ 
          backgroundImage: `url("${categoryBackgrounds[activeCategory as keyof typeof categoryBackgrounds]}")`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          x: backgroundX,
          y: backgroundY
        }}
        transition={{ type: 'tween' }} // Using a simpler transition type
        >
        {/* Simple overlay without complex animations */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/75 to-black/80"></div>
        
        {/* Reduced number of floating elements */}
        {floatingElements.map((el, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full blur-3xl opacity-20"
            style={{
              width: el.size,
              height: el.size,
              backgroundColor: el.color,
              top: el.y,
              left: el.x,
            }}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: el.duration,
              repeat: Infinity,
              delay: el.delay,
              ease: "linear" // Using simpler easing
            }}
          />
        ))}
        
        {/* Simplified grid pattern with reduced opacity */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOFYyYzcuNzMyIDAgMTQgNi4yNjggMTQgMTRoMnptMTgtMTh2MmMtNy43MzIgMC0xNCA2LjI2OC0xNCAxNGgyYzAtOS45NC04LjA2LTE4LTE4LTE4eiIgZmlsbD0icmdiYSgyMDAsIDIwMCwgMjAwLCAwLjAzKSIvPjxwYXRoIGQ9Ik0zMCA0djJjLTcuNzMyIDAtMTQgNi4yNjgtMTQgMTRoLTJjMC05Ljk0IDguMDYtMTggMTgtMThoLTJ6TTYgMzZoMmM3LjczMiAwIDE0IDYuMjY4IDE0IDE0di0yYzAtOS45NC04LjA2LTE4LTE4LTE4aC0yek00MiAxOGgtMmMwIDcuNzMyLTYuMjY4IDE0LTE0IDE0djJjOS45NCAwIDE4LTguMDYgMTgtMThIMzZ6IiBmaWxsPSJyZ2JhKDIwMCwgMjAwLCAyMDAsIDAuMDMpIi8+PHBhdGggZD0iTTU0IDU0di0yYy03LjczMiAwLTE0LTYuMjY4LTE0LTE0aC0yYzAgOS45NCA4LjA2IDE4IDE4IDE4aC0yem0tMTgtMThIMzZjMCA3LjczMi02LjI2OCAxNC0xNCAxNHYyYzkuOTQgMCAxOC04LjA2IDE4LTE4aC0yek0xOCA1NHYtMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNGgtMmMwIDkuOTQgOC4wNiAxOCAxOCAxOGgtMnoiIGZpbGw9InJnYmEoMjAwLCAyMDAsIDIwMCwgMC4wMykiLz48L2c+PC9zdmc+')]
          opacity-20 mix-blend-soft-light"></div>
      </motion.div>
      
      {/* Content with optimized styling */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 
            className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4"
            style={{ textShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)" }}
          >
            Menu Highlights
          </h2>
          
          {/* Simple divider without complex animations */}
          <div 
            className="mx-auto h-0.5 w-32 bg-gradient-to-r from-transparent via-cafe-gold to-transparent mb-6"
          ></div>
          
          <p 
            className="max-w-2xl mx-auto text-cafe-cream/90 font-poppins"
          >
            Explore our curated selection of specialty coffee, delicious cuisine, and craft cocktails.
          </p>
        </div>

        {/* Category Selection - Optimized effects */}
        <div className="flex justify-center mb-16">
          <div 
            className="flex space-x-3 md:space-x-8 p-2 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 shadow-lg"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className={`flex items-center gap-2 px-5 py-3 rounded-lg transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-cafe-gold/90 to-cafe-gold/80 text-cafe-darkBrown shadow-md'
                    : 'bg-white/5 text-cafe-cream hover:bg-white/10 hover:text-white'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                <FontAwesomeIcon icon={category.icon} className={activeCategory === category.id ? 'text-cafe-darkBrown' : 'text-cafe-gold/80'} />
                <span className="font-poppins font-medium">{category.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid - Optimized cards with fewer animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          <AnimatePresence mode="wait">
            {menuItems[activeCategory as keyof typeof menuItems].map((item, index) => (
              <motion.div
                key={`${activeCategory}-${index}`}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover="hover"
                viewport={{ once: true }}
                className="group relative rounded-xl overflow-hidden backdrop-blur-md border border-white/20 transform transition-all duration-300 shadow-lg"
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Simplified card layout */}
                <div className="relative h-64 overflow-hidden">
                  {/* Main image with simplified effects */}
                  <div
                    className="absolute inset-0 z-0"
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Simple overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-90"></div>
                  
                  {/* Price tag with simplified design */}
                  <div 
                    className="absolute top-4 right-4 z-30"
                  >
                    <div className="flex flex-col items-center justify-center w-16 h-16 bg-cafe-darkBrown/80 backdrop-blur-md rounded-full border-2 border-cafe-gold/80 shadow-lg">
                      <span className="font-poppins font-bold text-cafe-gold text-sm">{item.price}</span>
                    </div>
                  </div>
                  
                  {/* Hot selling item indicator with simplified animation */}
                  {(index === 0) && (
                    <div 
                      className="absolute top-4 left-4 z-30 flex items-center gap-1 bg-cafe-burgundy/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-lg"
                    >
                      <FontAwesomeIcon icon={faFire} className="text-white text-xs" />
                      <span className="text-white text-xs font-medium">Hot</span>
                    </div>
                  )}
                </div>
                
                {/* Content area with simplified glass effect */}
                <div 
                  className="relative p-6 bg-gradient-to-b from-black/80 to-black/60 backdrop-blur-sm"
                >
                  {/* Featured badge with simplified design */}
                  {index === 0 && (
                    <div 
                      className="absolute -top-5 left-6 bg-cafe-gold/90 px-3 py-1 rounded-md shadow-md overflow-hidden"
                    >
                      <div className="flex items-center gap-1 relative z-10">
                        <FontAwesomeIcon icon={faStar} className="text-cafe-darkBrown text-xs" />
                        <span className="text-cafe-darkBrown text-xs font-bold">FEATURED</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Item name */}
                  <h3 
                    className="text-xl font-playfair font-bold text-white mb-3"
                  >
                    {item.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-cafe-cream/90 font-poppins text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                  
                  {/* Button with simplified hover effect */}
                  <motion.button
                    className="relative overflow-hidden w-full bg-gradient-to-r from-cafe-gold/90 to-cafe-gold/80 text-cafe-darkBrown py-3 rounded-lg font-poppins font-medium text-sm transition-all duration-300 shadow-md"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 inline-flex items-center justify-center gap-2">
                      Order Now
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </span>
                    
                    {/* Simplified shine effect */}
                    {hoveredItem === index && (
                      <div 
                        className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shine"
                      />
                    )}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* "View Full Menu" button with simplified effect */}
        <div className="text-center mt-16">
          <motion.button 
            className="bg-white hover:bg-cafe-cream text-cafe-darkBrown font-poppins font-medium px-10 py-4 rounded-full transition-all duration-300 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            View Full Menu
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default MenuHighlights;
