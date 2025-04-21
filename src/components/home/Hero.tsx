import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState, memo, useCallback } from 'react';

// Single optimized video source
const VIDEO_SOURCE = '/videos/couple-date-restaurant.mp4';

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isUserInteracted, setIsUserInteracted] = useState(false);
  
  // Memoize event handlers to reduce re-renders
  const handleLoad = useCallback(() => {
    setIsVideoLoaded(true);
  }, []);
  
  const handleError = useCallback(() => {
    console.error(`Error loading video: ${VIDEO_SOURCE}`);
    setVideoError(true);
  }, []);
  
  const handleInteraction = useCallback(() => {
    if (!isUserInteracted && videoRef.current) {
      setIsUserInteracted(true);
      videoRef.current.play().catch(err => {
        console.error("Couldn't play video after interaction:", err);
      });
    }
  }, [isUserInteracted]);
  
  // Handle user interaction to enable autoplay on iOS - optimized to run less frequently
  useEffect(() => {
    if (isUserInteracted) return; // Skip if already interacted
    
    // Use passive event listeners for better performance
    window.addEventListener('click', handleInteraction, { passive: true });
    window.addEventListener('touchstart', handleInteraction, { passive: true });

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [isUserInteracted, handleInteraction]);

  // Handle video loading - simplified for single video
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    
    // Reset states
    setIsVideoLoaded(false);
    setVideoError(false);
    
    // Apply optimized video settings
    videoElement.muted = true;
    videoElement.loop = true;
    videoElement.playsInline = true;
    videoElement.preload = "auto";
    videoElement.src = VIDEO_SOURCE;
    
    // Add event listeners
    videoElement.addEventListener('loadeddata', handleLoad);
    videoElement.addEventListener('error', handleError);
    
    // Start loading
    videoElement.load();
    
    // Attempt autoplay
    const playPromise = videoElement.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay was prevented, will wait for user interaction
        console.log('Autoplay prevented, waiting for user interaction');
      });
    }
    
    return () => {
      videoElement.removeEventListener('loadeddata', handleLoad);
      videoElement.removeEventListener('error', handleError);
      
      // Cleanup
      if (videoElement.src) {
        videoElement.pause();
        videoElement.src = '';
        videoElement.load();
      }
    };
  }, [handleLoad, handleError]);

  return (
    <div className="relative h-screen overflow-hidden will-change-transform">
      {/* Video Background with Fallback Image */}
      <div className="absolute inset-0">
        {/* Fallback image while video loads */}
        {!isVideoLoaded && (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: "url('/hero-bg.jpg')", 
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            aria-hidden="true"
          ></div>
        )}
        
        {/* Video background - optimized loading */}
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transform-gpu will-change-opacity transition-opacity duration-500 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
          poster="/hero-bg.jpg"
          aria-label="Romantic cafe atmosphere video"
        >
          Your browser does not support the video tag.
        </video>
        
        {/* Optimized overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/85"></div>
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
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <HeroActions />
        </motion.div>

        {/* Scroll Down Indicator - memoized */}
        <ScrollIndicator />
      </div>
    </div>
  );
};

export default memo(Hero);
