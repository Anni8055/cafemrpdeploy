import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { memo } from 'react';

// High-quality cafe image
const HERO_IMAGE = 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';

// Cafe-themed text overlay
const HERO_TEXT = 'A perfect romantic dining experience';

// Memoized components to prevent unnecessary re-renders
const HeroText = memo(() => (
  <motion.div 
    className="absolute bottom-40 left-0 right-0 text-center z-10 overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8, delay: 0.4 }}
  >
    <motion.p 
      className="text-xl md:text-2xl italic font-playfair text-cafe-gold/90 mx-auto px-4"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {HERO_TEXT}
    </motion.p>
  </motion.div>
));

const HeroActions = memo(() => (
  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
    <Link 
      to="/menu" 
      className="bg-cafe-gold hover:bg-cafe-gold/90 text-cafe-darkBrown font-poppins font-medium px-8 py-3 rounded-md transition-colors"
    >
      View Menu
    </Link>
    <Link 
      to="/reservation" 
      className="bg-transparent border-2 border-cafe-gold text-cafe-gold hover:bg-cafe-gold/10 font-poppins font-medium px-8 py-3 rounded-md transition-colors"
    >
      Make Reservation
    </Link>
  </div>
));

const ScrollIndicator = memo(() => (
  <motion.div 
    className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
    animate={{ y: [0, 8, 0] }}
    transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 0.5 }}
  >
    <div className="w-8 h-12 border-2 border-cafe-cream rounded-full flex items-center justify-center">
      <div className="w-1.5 h-3 bg-cafe-cream rounded-full"></div>
    </div>
  </motion.div>
));

const Hero = () => {
  return (
    <div className="relative h-screen overflow-hidden will-change-transform">
      {/* Image Background */}
      <div className="absolute inset-0">
        {/* High-quality background image with lazy loading */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform-gpu"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ 
            backgroundImage: `url(${HERO_IMAGE})`,
            willChange: 'transform, opacity'
          }}
        >
          {/* Optimized overlay with animated gradient */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/85"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </motion.div>
      </div>

      {/* Hero Content */}
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-playfair font-bold text-white mb-4">
            Welcome to <span className="text-cafe-gold">CafeMRP</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-xl md:text-2xl font-poppins text-cafe-cream max-w-2xl mx-auto mb-8">
            A perfect blend of exquisite coffee, delicious cuisine, and handcrafted cocktails
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <HeroActions />
        </motion.div>

        <HeroText />
        <ScrollIndicator />
      </div>
    </div>
  );
};

export default memo(Hero);
