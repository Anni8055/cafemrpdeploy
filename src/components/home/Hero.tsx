import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

// Selected video for the hero section
const HERO_VIDEO = '/videos/couple-date-restaurant.mp4';

// Cafe-themed text overlay
const HERO_TEXT = 'A perfect romantic dining experience';

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isUserInteracted, setIsUserInteracted] = useState(false);
  
  // Handle user interaction to enable autoplay on iOS
  useEffect(() => {
    const handleInteraction = () => {
      if (!isUserInteracted && videoRef.current) {
        setIsUserInteracted(true);
        videoRef.current.play().catch(err => {
          console.error("Couldn't play video after interaction:", err);
        });
      }
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [isUserInteracted]);

  // Handle video loading
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      // Reset error state when trying a new video
      setVideoError(false);
      setIsVideoLoaded(false);
      
      const handleLoad = () => {
        setIsVideoLoaded(true);
      };
      
      const handleError = () => {
        console.error(`Error loading video: ${HERO_VIDEO}`);
        setVideoError(true);
      };
      
      videoElement.addEventListener('loadeddata', handleLoad);
      videoElement.addEventListener('error', handleError);
      
      // Mute the video to allow autoplay
      videoElement.muted = true;
      
      // Set video playback options for better performance
      videoElement.loop = true; // Enable looping
      videoElement.playsInline = true;
      videoElement.disablePictureInPicture = true;
      
      // Preload attribute for optimization
      videoElement.preload = "metadata";
      
      // Start playing if user has interacted with the page
      if (isUserInteracted) {
        videoElement.play().catch(err => {
          console.error("Couldn't play video:", err);
        });
      }
      
      return () => {
        videoElement.removeEventListener('loadeddata', handleLoad);
        videoElement.removeEventListener('error', handleError);
      };
    }
  }, [isUserInteracted]);

  return (
    <div className="relative h-screen overflow-hidden">
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
          ></div>
        )}
        
        {/* Video background */}
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Enhanced darker overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/85"></div>
      </div>

      {/* Video Text Overlay */}
      <motion.div 
        className="absolute bottom-40 left-0 right-0 text-center z-10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVideoLoaded ? 1 : 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <motion.p 
          className="text-xl md:text-2xl italic font-playfair text-cafe-gold/90 mx-auto px-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {HERO_TEXT}
        </motion.p>
      </motion.div>

      {/* Hero Content */}
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl font-playfair font-bold text-white mb-4">
            Welcome to <span className="text-cafe-gold">CafeMRP</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-xl md:text-2xl font-poppins text-cafe-cream max-w-2xl mx-auto mb-8">
            A perfect blend of exquisite coffee, delicious cuisine, and handcrafted cocktails
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
        >
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
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-8 h-12 border-2 border-cafe-cream rounded-full flex items-center justify-center">
            <div className="w-1.5 h-3 bg-cafe-cream rounded-full animate-bounce"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
