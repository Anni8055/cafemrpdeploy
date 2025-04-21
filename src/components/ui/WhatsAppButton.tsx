import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  position?: 'bottom-right' | 'bottom-left';
  showOnMobile?: boolean;
}

const WhatsAppButton = ({
  phoneNumber = "12345678901", // Default value to prevent undefined errors
  message = "Hello! I'd like to know more about CafeMRP",
  position = 'bottom-right',
  showOnMobile = true
}: WhatsAppButtonProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Handle responsive behavior and check if button was previously closed
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Add scroll detection to show button after scrolling down a bit
    const handleScroll = () => {
      const wasClosed = sessionStorage.getItem('whatsapp_closed') === 'true';
      
      // Don't show if user closed it in this session
      if (wasClosed) return;
      
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    
    checkMobile();
    handleScroll();
    
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Show tooltip shortly after button appears
  useEffect(() => {
    if (showButton && !isMobile) {
      const tooltipTimer = setTimeout(() => {
        setShowTooltip(true);
        // Hide tooltip after a few seconds
        setTimeout(() => setShowTooltip(false), 5000);
      }, 2000);
      
      return () => clearTimeout(tooltipTimer);
    }
  }, [showButton, isMobile]);

  const positionClass = position === 'bottom-right' 
    ? 'right-4 md:right-8' 
    : 'left-4 md:left-8';

  // Compose WhatsApp URL with phone number and message
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;

  // Only show on mobile if specified
  if (isMobile && !showOnMobile) return null;

  return (
    <AnimatePresence mode="sync">
      {showButton && (
        <motion.div
          className={`fixed z-50 bottom-4 md:bottom-8 ${positionClass} flex items-center`}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Main Button */}
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white shadow-lg 
                        hover:bg-green-600 transition-colors ${!isExpanded ? 'whatsapp-button-animation' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
            onClick={() => {
              // Track click event if gtag is available
              if (typeof window.gtag === 'function') {
                window.gtag('event', 'whatsapp_click', {
                  event_category: 'engagement',
                  event_label: 'WhatsApp Button'
                });
              }
            }}
            aria-label="Chat on WhatsApp"
          >
            <FontAwesomeIcon icon={faWhatsapp} className="text-2xl" />
            
            {/* Notification Dot */}
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
          </motion.a>
          
          {/* Tooltip - moved outside nested AnimatePresence */}
          {(showTooltip || isExpanded) && !isMobile && (
            <motion.div
              className="absolute bottom-full mb-2 bg-white text-gray-800 rounded-lg shadow-lg py-2 px-4 text-sm font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              style={{ 
                right: position === 'bottom-right' ? 0 : 'auto',
                left: position === 'bottom-left' ? 0 : 'auto',
                filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.1))'
              }}
            >
              Chat with us on WhatsApp
              <div 
                className="absolute w-4 h-4 bg-white transform rotate-45"
                style={{ 
                  bottom: '-6px',
                  right: position === 'bottom-right' ? '16px' : 'auto',
                  left: position === 'bottom-left' ? '16px' : 'auto',
                }}
              ></div>
            </motion.div>
          )}
          
          {/* Close Button - only on mobile */}
          {isMobile && (
            <motion.button
              className="absolute -top-3 -right-3 bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-md border border-gray-200"
              onClick={(e) => {
                e.preventDefault(); 
                setShowButton(false);
                // Store in session storage to remember the user closed it
                sessionStorage.setItem('whatsapp_closed', 'true');
              }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close WhatsApp button"
            >
              <FontAwesomeIcon icon={faXmark} className="text-xs text-gray-600" />
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Add window.gtag type definition
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default WhatsAppButton;
