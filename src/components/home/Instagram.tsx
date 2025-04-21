import { useState, useRef, useEffect, useMemo, memo } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

// Memoized loading skeleton component
const LoadingSkeleton = memo(() => (
  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading" />
  </div>
));

// Memoized Instagram grid item component
const InstagramGridItem = memo(({ image, index, hoveredIndex, setHoveredIndex, isLoaded, onLoad }: {
  image: any;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
  isLoaded: boolean;
  onLoad: () => void;
}) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.3,
      }
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "50px" }}
      className="relative rounded-xl overflow-hidden shadow-md bg-white/95 transform-gpu"
      style={{
        gridRow: `span ${Math.ceil(image.height * 8)}`,
        height: `${280 * image.height}px`
      }}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {!isLoaded && <LoadingSkeleton />}
      
      <div className="relative h-full">
        <img 
          src={image.url}
          alt={`Instagram post ${index + 1}`}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          decoding="async"
          onLoad={onLoad}
        />
        
        {hoveredIndex === index && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col justify-end"
          >
            <p className="text-white text-sm font-poppins mb-2 line-clamp-2">{image.caption}</p>
            <div className="flex space-x-3">
              <div className="flex items-center text-white text-xs">
                <span>❤️ {image.likes}</span>
              </div>
              <div className="flex items-center text-white text-xs">
                <span>💬 {image.comments}</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
});

const Instagram = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
  
  // Optimized motion values with reduced sensitivity
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const backgroundX = useTransform(mouseX, [-100, 100], [2, -2]);
  const backgroundY = useTransform(mouseY, [-100, 100], [2, -2]);

  // Memoized images data
  const images = useMemo(() => [
    {
      url: 'https://images.unsplash.com/photo-1517231925375-bf2cb42917a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      likes: '243',
      comments: '18',
      caption: 'Morning coffee ritual ☕ #CafeMRP',
      height: 1.2
    },
    {
      url: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      likes: '186',
      comments: '12',
      caption: 'Weekend brunch goals 🥐 #FoodieHeaven',
      height: 1
    },
    {
      url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      likes: '304',
      comments: '23',
      caption: 'New cocktails just launched! 🍸 #HappyHour',
      height: 1.5
    },
    {
      url: 'https://images.unsplash.com/photo-1631234764568-996fab371596?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      likes: '217',
      comments: '19',
      caption: 'Live music night was amazing! 🎵 #CafeVibes',
      height: 1.3
    },
    {
      url: 'https://images.unsplash.com/photo-1518057111178-44a106bad636?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      likes: '279',
      comments: '21',
      caption: 'Perfect latte art every time ✨ #BaristaMagic',
      height: 1.1
    },
    {
      url: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      likes: '192',
      comments: '14',
      caption: 'Dessert heaven has arrived 🍰 #SweetTreats',
      height: 1
    },
  ], []);

  // Initialize image loading state
  useEffect(() => {
    setImagesLoaded(new Array(images.length).fill(false));
  }, [images.length]);

  // Optimized image loaded handler
  const handleImageLoaded = (index: number) => {
    setImagesLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  // Optimized mouse movement handler with debouncing
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
        
        mouseX.set(relativeX * 25);
        mouseY.set(relativeY * 25);
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

  return (
    <section className="py-16 relative overflow-hidden bg-gradient-to-b from-cafe-darkBrown/5 to-cafe-cream/50">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-cafe-darkBrown flex items-center justify-center mb-4">
            <FontAwesomeIcon icon={faInstagram} className="text-cafe-burgundy mr-4" />
            Follow Us On Instagram
          </h2>
          
          <p className="text-cafe-brown font-poppins text-xl mb-4">
            <span className="bg-gradient-to-r from-cafe-gold/80 to-cafe-burgundy/80 
                         bg-clip-text text-transparent font-semibold">@cafemrp</span>
          </p>
          
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-cafe-gold to-transparent mx-auto" />
        </motion.div>
        
        <motion.div 
          ref={containerRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 auto-rows-auto transform-gpu"
          style={{
            transform: `translate(${backgroundX.get()}px, ${backgroundY.get()}px)`,
          }}
        >
          {images.map((image, index) => (
            <InstagramGridItem
              key={index}
              image={image}
              index={index}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              isLoaded={imagesLoaded[index]}
              onLoad={() => handleImageLoaded(index)}
            />
          ))}
        </motion.div>
        
        <div className="text-center mt-10">
          <motion.button 
            onClick={() => window.open('https://www.instagram.com/', '_blank')}
            className="inline-block bg-gradient-to-r from-cafe-burgundy to-cafe-gold text-white px-8 py-3 rounded-full font-poppins font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Follow @CafeMRP
          </motion.button>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-64 h-64 bg-cafe-gold/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cafe-burgundy/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
      </div>
    </section>
  );
};

export default memo(Instagram);

// Add this to your global CSS
const styles = `
@keyframes skeleton-loading {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.skeleton-loading {
  animation: skeleton-loading 1.5s infinite;
}
`;
