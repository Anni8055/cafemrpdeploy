import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faQuoteLeft, faLongArrowAltRight, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect, memo } from 'react';

// Memoized decorative element to prevent unnecessary re-renders
const DecorativeElement = memo(({ elem }: { elem: any }) => (
  <motion.div
    key={elem.id}
    className="absolute rounded-full bg-cafe-gold"
    style={{
      width: elem.size,
      height: elem.size,
      left: `${elem.x}%`,
      top: `${elem.y}%`,
      opacity: elem.opacity,
      filter: "blur(1px)"
    }}
    animate={{
      y: [0, -100, 0],
      x: [0, elem.xOffset, 0],
    }}
    transition={{
      duration: elem.duration,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
      delay: elem.delay
    }}
  />
));

// Memoized testimonial card for better performance
const TestimonialCard = memo(({ 
  testimonial, 
  isVisible 
}: { 
  testimonial: any, 
  isVisible: boolean 
}) => (
  <div className="flex flex-col md:flex-row items-center">
    <div className="relative flex-shrink-0 mb-8 md:mb-0 md:mr-10">
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-cafe-gold/30 shadow-[0_0_15px_rgba(212,175,55,0.25)]">
        <img 
          src={testimonial.image} 
          alt={testimonial.name} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      {isVisible && (
        <motion.div 
          className="absolute -top-3 -left-3 -right-3 -bottom-3 rounded-full border-2 border-cafe-gold/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      )}
    </div>
    
    <div className="flex-1">
      <div className="text-cafe-gold text-4xl md:text-5xl mb-6 opacity-60">
        <FontAwesomeIcon icon={faQuoteLeft} />
      </div>
      
      <p className="text-lg md:text-xl font-playfair text-white mb-8 leading-relaxed italic">
        "{testimonial.quote}"
      </p>
      
      <div>
        <h4 className="font-playfair font-bold text-cafe-gold text-xl mb-1">
          {testimonial.name}
        </h4>
        
        <p className="text-cafe-cream opacity-80 mb-3">
          {testimonial.role}
        </p>
        
        <div className="flex text-cafe-gold">
          {[...Array(testimonial.rating)].map((_, i) => (
            <FontAwesomeIcon key={i} icon={faStar} className="w-4 h-4 md:w-5 md:h-5 mr-1" />
          ))}
        </div>
      </div>
    </div>
  </div>
));

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check for mobile device
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  // Simpler parallax effect for better performance
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  // Auto-rotate testimonials with longer interval on mobile for better readability
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, isMobile ? 8000 : 6000);
    
    return () => clearInterval(interval);
  }, [isMobile]);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Regular Customer',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      quote: 'CafeMRP has become my go-to spot. The coffee is exceptional, and the atmosphere is so inviting. Perfect for both work days and relaxed weekends.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Food Blogger',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      quote: 'The attention to detail in every dish is remarkable. From breakfast to dinner, CafeMRP consistently delivers innovative and delicious food. Highly recommended!',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Local Resident',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
      quote: "I've tried nearly every cocktail on their menu, and each one is crafted to perfection. The bartenders are true artists who know how to make every visit special.",
      rating: 5
    },
    {
      name: 'David Thompson',
      role: 'Coffee Enthusiast',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      quote: "The espresso at CafeMRP is simply divine. I've been to coffee shops all over the world, and their brewing technique and bean selection are among the best I've experienced.",
      rating: 5
    }
  ];

  // Optimized decorative elements - reduced count and complexity for better performance
  const decorativeElements = Array.from({ length: isMobile ? 4 : 6 }, (_, i) => ({
    id: i,
    size: Math.random() * 10 + 5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    opacity: Math.random() * 0.4 + 0.1,
    delay: Math.random() * 2,
    duration: Math.random() * 8 + 12,
    xOffset: Math.random() * 40 - 20
  }));
  
  // Handle navigation
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section 
      ref={containerRef}
      className="relative py-16 md:py-24 overflow-hidden bg-cafe-darkBrown text-white"
    >
      {/* Simplified background with reduced animations */}
      <div className="absolute inset-0 opacity-20">
        {!isMobile && (
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yOSAyOUgxdjFoMjh2MjhoMVYzMGgyOHYtMUgyOVYxaC0xdjI4eiIgZmlsbD0icmdiYSgyMTIsMTc1LDU1LDAuMDUpIi8+PC9nPjwvc3ZnPg==')] opacity-30" />
        )}
        <div className="absolute inset-0 overflow-hidden opacity-40">
          {decorativeElements.map(elem => (
            <DecorativeElement key={elem.id} elem={elem} />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          style={{ y, opacity }}
        >
          <h2 className="text-3xl md:text-5xl font-playfair font-bold mb-4 text-white">
            What Our <span className="text-cafe-gold">Guests</span> Say
          </h2>
          
          <div className="relative mx-auto w-32 md:w-40 h-1.5 bg-cafe-gold mb-6 md:mb-8 rounded-full overflow-hidden">
            {!isMobile && (
              <motion.div 
                className="absolute -top-1 left-0 right-0 h-4 bg-cafe-gold blur-md opacity-30"
                animate={{ 
                  opacity: [0.2, 0.4, 0.2],
                  x: [-50, 50, -50] 
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </div>
          
          <p className="max-w-xl mx-auto text-cafe-cream text-base md:text-lg">
            Our guests' experiences speak louder than words. Here's what they have to say about their time with us.
          </p>
        </motion.div>

        {/* Simplified testimonial carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative min-h-[380px] md:min-h-[300px] bg-gradient-to-br from-cafe-brown/60 to-cafe-darkBrown/90 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10">
            {/* Only animate current testimonial */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <TestimonialCard 
                  testimonial={testimonials[activeIndex]} 
                  isVisible={true}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Simplified navigation controls */}
          <div className="flex justify-center mt-8 md:mt-10 space-x-4 md:space-x-6">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-cafe-brown/50 border border-cafe-gold/30 flex items-center justify-center text-cafe-gold hover:bg-cafe-brown/70 transition-colors"
              aria-label="Previous testimonial"
            >
              <FontAwesomeIcon icon={faLongArrowAltLeft} />
            </button>
            
            <div className="flex items-center space-x-2 md:space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'bg-cafe-gold' : 'bg-cafe-cream/30'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-cafe-brown/50 border border-cafe-gold/30 flex items-center justify-center text-cafe-gold hover:bg-cafe-brown/70 transition-colors"
              aria-label="Next testimonial"
            >
              <FontAwesomeIcon icon={faLongArrowAltRight} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
