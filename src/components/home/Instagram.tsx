import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

const Instagram = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
  
  // For parallax effect - using throttled values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // For background animation - reduced movement
  const backgroundX = useTransform(mouseX, [-100, 100], [3, -3]);
  const backgroundY = useTransform(mouseY, [-100, 100], [3, -3]);

  // Images with optimized data structure
  const images = useMemo(() => [
    {
      url: 'https://images.unsplash.com/photo-1517231925375-bf2cb42917a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      likes: '243',
      comments: '18',
      caption: 'Morning coffee ritual ☕ #CafeMRP',
      height: 1.2 // Relative height for masonry layout
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

  // Image loaded handler
  const handleImageLoaded = (index: number) => {
    setImagesLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  // Throttled mouse movement handler
  useEffect(() => {
    let frameId: number;
    let lastUpdate = 0;
    const throttleInterval = 50; // ms between updates
    
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastUpdate < throttleInterval) return;
      lastUpdate = now;
      
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate mouse position relative to center
        const relativeX = (e.clientX - centerX) / (rect.width / 2);
        const relativeY = (e.clientY - centerY) / (rect.height / 2);
        
        mouseX.set(relativeX * 50); // Reduced sensitivity for better performance
        mouseY.set(relativeY * 50);
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  // Simplified animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -5,
      scale: 1.03,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  // Optimized background elements - fewer with simpler animations
  const floatingOrbs = useMemo(() => Array.from({ length: 3 }).map((_, i) => ({
    delay: i * 0.7,
    duration: 15 + i * 5,
    size: 80 + Math.random() * 120,
    y: 150 + Math.random() * 300,
    x: 150 + Math.random() * 700,
    color: i % 2 === 0 ? 'rgba(212, 175, 55, 0.15)' : 'rgba(128, 0, 32, 0.1)'
  })), []);

  return (
    <section className="py-16 relative overflow-hidden bg-gradient-to-b from-cafe-darkBrown/5 to-cafe-cream/50 border-t border-b border-cafe-gold/10" ref={containerRef}>
      {/* Optimized background elements */}
      <div 
        className="absolute inset-0 overflow-hidden z-0"
        style={{ 
          transform: `translate(${backgroundX.get()}px, ${backgroundY.get()}px)`,
          transition: 'transform 0.5s ease-out'
        }}
      >
        {floatingOrbs.map((orb, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full blur-3xl opacity-20"
            style={{
              width: orb.size,
              height: orb.size,
              backgroundColor: orb.color,
              top: orb.y,
              left: orb.x,
            }}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              delay: orb.delay,
              ease: "linear"
            }}
          />
        ))}
        
        {/* Subtle grid pattern with reduced opacity */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOFYyYzcuNzMyIDAgMTQgNi4yNjggMTQgMTRoMnptMTgtMTh2MmMtNy43MzIgMC0xNCA2LjI2OC0xNCAxNGgyYzAtOS45NC04LjA2LTE4LTE4LTE4eiIgZmlsbD0icmdiYSgxMDAsIDExNiwgMTM5LCAwLjAzKSIvPjxwYXRoIGQ9Ik0zMCA0djJjLTcuNzMyIDAtMTQgNi4yNjgtMTQgMTRoLTJjMC05Ljk0IDguMDYtMTggMTgtMThoLTJ6TTYgMzZoMmM3LjczMiAwIDE0IDYuMjY4IDE0IDE0di0yYzAtOS45NC04LjA2LTE4LTE4LTE4aC0yek00MiAxOGgtMmMwIDcuNzMyLTYuMjY4IDE0LTE0IDE0djJjOS45NCAwIDE4LTguMDYgMTgtMThIMzZ6IiBmaWxsPSJyZ2JhKDEwMCwgMTE2LCAxMzksIDAuMDMpIi8+PHBhdGggZD0iTTU0IDU0di0yYy03LjczMiAwLTE0LTYuMjY4LTE0LTE0aC0yYzAgOS45NCA4LjA2IDE4IDE4IDE4aC0yem0tMTgtMThIMzZjMCA3LjczMi02LjI2OCAxNC0xNCAxNHYyYzkuOTQgMCAxOC04LjA2IDE4LTE4aC0yek0xOCA1NHYtMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNGgtMmMwIDkuOTQgOC4wNiAxOCAxOCAxOGgtMnoiIGZpbGw9InJnYmEoMTAwLCAxMTYsIDEzOSwgMC4wMykiLz48L2c+PC9zdmc+')]
          opacity-30 mix-blend-soft-light"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className="text-center mb-12 relative"
        >
          {/* Simplified title */}
          <h2 
            className="text-3xl md:text-5xl font-playfair font-bold text-cafe-darkBrown flex items-center justify-center mb-4"
            style={{
              textShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)"
            }}
          >
            <FontAwesomeIcon icon={faInstagram} className="text-cafe-burgundy mr-4" />
            Follow Us On Instagram
          </h2>

          {/* Instagram handle */}
          <p 
            className="text-cafe-brown font-poppins text-xl mb-4 inline-block"
          >
            <span className="bg-gradient-to-r from-cafe-gold/80 to-cafe-burgundy/80 
                          bg-clip-text text-transparent font-semibold">@cafemrp</span>
          </p>
          
          {/* Simple divider */}
          <div 
            className="w-24 h-0.5 bg-gradient-to-r from-transparent via-cafe-gold to-transparent mx-auto"
          />
        </div>
        
        {/* Masonry-style grid for more interesting layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-5 auto-rows-auto">
          {images.map((image, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, margin: "100px" }} // Increased margin for earlier loading
              style={{
                gridRow: `span ${Math.ceil(image.height * 8)}`, // dynamic row span based on image height
                height: `${280 * image.height}px` // dynamic height
              }}
              className="group relative rounded-xl overflow-hidden shadow-md bg-white/95 will-change-transform"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Loading placeholder */}
              {!imagesLoaded[index] && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse z-10 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-cafe-gold/30 border-t-cafe-gold rounded-full animate-spin"></div>
                </div>
              )}
              
              {/* Card content */}
              <div className="relative h-full overflow-hidden">
                {/* Main image with optimized loading */}
                <img 
                  src={image.url} 
                  alt={`Instagram post ${index + 1}`}
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    imagesLoaded[index] ? 'opacity-100' : 'opacity-0'
                  } ${hoveredIndex === index ? 'scale-105' : 'scale-100'}`}
                  loading="lazy"
                  onLoad={() => handleImageLoaded(index)}
                />
                
                {/* Optimized overlay with info */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4 transition-opacity duration-300 ${
                    hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <p className="text-white text-sm font-poppins mb-2 line-clamp-2">{image.caption}</p>
                  <div className="flex space-x-3 mt-1">
                    <div className="flex items-center text-white text-xs">
                      <svg className="w-4 h-4 mr-1 fill-current text-red-500" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      {image.likes}
                    </div>
                    <div className="flex items-center text-white text-xs">
                      <svg className="w-4 h-4 mr-1 fill-current text-white" viewBox="0 0 24 24">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"/>
                      </svg>
                      {image.comments}
                    </div>
                  </div>
                </div>
                
                {/* Instagram Button - simplified */}
                <div 
                  className={`absolute top-4 right-4 bg-white rounded-full p-2.5 shadow-md border border-white/40 transition-all duration-300 transform ${
                    hoveredIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`}
                >
                  <FontAwesomeIcon icon={faInstagram} className="text-cafe-burgundy text-lg" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Instagram button - simplified animation */}
        <div className="text-center mt-10">
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-cafe-burgundy to-cafe-gold text-white px-8 py-3 rounded-full font-poppins font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
          >
            View Our Instagram
          </a>
        </div>
      </div>
    </section>
  );
};

export default Instagram;
