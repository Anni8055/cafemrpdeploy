import { useState, useRef, useEffect, memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faUtensils, faBeer, faStar, faFire, faHeart } from '@fortawesome/free-solid-svg-icons';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';

// Memoized category button component
const CategoryButton = memo(({ 
  category, 
  isActive, 
  onClick 
}: { 
  category: { id: string; name: string; icon: any; }; 
  isActive: boolean; 
  onClick: () => void; 
}) => (
  <motion.button
    onClick={onClick}
    className={`px-6 py-3 rounded-full flex items-center space-x-2 transition-colors ${
      isActive 
        ? 'bg-cafe-gold text-cafe-darkBrown' 
        : 'bg-white/10 text-white hover:bg-white/20'
    }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
  >
    <FontAwesomeIcon icon={category.icon} />
    <span>{category.name}</span>
  </motion.button>
));

// Memoized menu item component
const MenuItem = memo(({ 
  item, 
  index, 
  isHovered,
  onHover,
  rotationValue 
}: { 
  item: any; 
  index: number; 
  isHovered: boolean;
  onHover: (index: number | null) => void;
  rotationValue: { x: number; y: number; }
}) => (
  <motion.div
    custom={index}
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    whileHover="hover"
    className="relative rounded-xl overflow-hidden shadow-lg bg-white/95"
    onHoverStart={() => onHover(index)}
    onHoverEnd={() => onHover(null)}
    style={{
      transformStyle: 'preserve-3d',
      perspective: 1000,
      rotateX: rotationValue.x,
      rotateY: rotationValue.y
    }}
  >
    <div className="relative h-48 md:h-64">
      <img 
        src={item.image} 
        alt={item.name}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      {isHovered && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </div>
    
    <div className="p-4">
      <h3 className="text-xl font-playfair font-bold text-cafe-darkBrown mb-2">{item.name}</h3>
      <p className="text-cafe-brown text-sm mb-3">{item.description}</p>
      <p className="text-lg font-semibold text-cafe-gold">{item.price}</p>
    </div>
  </motion.div>
));

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
      ease: "easeOut"
    }
  }),
  hover: {
    y: -5,
    transition: {
      duration: 0.2
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};

const MenuHighlights = () => {
  const [activeCategory, setActiveCategory] = useState('coffee');
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [rotationValues, setRotationValues] = useState<Array<{x: number, y: number}>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useSmoothScroll();
  
  // For parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const backgroundX = useTransform(mouseX, [-300, 300], [5, -5]);
  const backgroundY = useTransform(mouseY, [-300, 300], [5, -5]);

  // Optimized mouse movement handler with RAF
  useEffect(() => {
    let rafId: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const relativeX = (e.clientX - centerX) / (rect.width / 2);
        const relativeY = (e.clientY - centerY) / (rect.height / 2);
        
        mouseX.set(relativeX * 100);
        mouseY.set(relativeY * 100);
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [mouseX, mouseY]);

  // Initialize rotation values
  useEffect(() => {
    const menuItemsCount = menuItems[activeCategory as keyof typeof menuItems].length;
    const newRotationValues = Array(menuItemsCount).fill(0).map(() => ({
      x: Math.random() * 3 - 1.5,
      y: Math.random() * 3 - 1.5
    }));
    setRotationValues(newRotationValues);
  }, [activeCategory]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    const element = document.getElementById('menu-items');
    if (element) {
      scrollTo(element, { offset: 80, duration: 600 });
    }
  };

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

  return (
    <section className="py-24 relative overflow-hidden" ref={containerRef}>
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-fixed z-0"
        style={{ 
          backgroundImage: `url("${categoryBackgrounds[activeCategory as keyof typeof categoryBackgrounds]}")`,
          x: backgroundX,
          y: backgroundY
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/75 to-black/80"></div>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl md:text-5xl font-playfair font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Menu
          </motion.h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <CategoryButton
                key={category.id}
                category={category}
                isActive={activeCategory === category.id}
                onClick={() => handleCategoryChange(category.id)}
              />
            ))}
          </div>
        </div>

        <div id="menu-items" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="wait">
            {menuItems[activeCategory as keyof typeof menuItems].map((item, index) => (
              <MenuItem
                key={`${activeCategory}-${index}`}
                item={item}
                index={index}
                isHovered={hoveredItem === index}
                onHover={setHoveredItem}
                rotationValue={rotationValues[index] || { x: 0, y: 0 }}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default memo(MenuHighlights);
