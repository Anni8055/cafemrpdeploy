import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin, faPhone, faEnvelope, faClock } from '@fortawesome/free-solid-svg-icons';
import { memo, useState } from 'react';

// Simple fallback component for map errors
const MapFallback = ({ address }: { address: string }) => (
  <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg">
    <div className="text-center p-6">
      <h3 className="text-xl font-bold text-cafe-darkBrown mb-2">Map unavailable</h3>
      <p className="text-cafe-brown">We're having trouble loading the map.</p>
      <p className="text-cafe-brown mb-4">Find us at: {address}</p>
      <a 
        href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-cafe-gold text-cafe-darkBrown px-4 py-2 rounded-md font-medium hover:bg-cafe-gold/90 transition-colors"
      >
        Open in Google Maps
      </a>
    </div>
  </div>
);

// Memoized contact info item for better performance
const ContactItem = memo(({ icon, title, children }: { icon: any, title: string, children: React.ReactNode }) => (
  <div className="flex items-start space-x-4">
    <div className="w-10 h-10 md:w-12 md:h-12 bg-cafe-gold rounded-full flex items-center justify-center flex-shrink-0">
      <FontAwesomeIcon icon={icon} className="text-cafe-darkBrown text-lg md:text-xl" />
    </div>
    <div>
      <h3 className="text-lg md:text-xl font-playfair font-bold text-cafe-darkBrown mb-2">{title}</h3>
      <div className="text-cafe-brown font-poppins text-sm md:text-base">
        {children}
      </div>
    </div>
  </div>
));

// Simplified map component that uses an iframe to Google Maps
const CafeMap = ({ address, className = '' }: { address: string, className?: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  // Format address for Google Maps embed
  const encodedAddress = encodeURIComponent(address);
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodedAddress}&zoom=16`;
  
  return (
    <div className={`w-full h-full ${className}`}>
      {!isLoaded && !hasError && (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-t-2 border-cafe-gold rounded-full animate-spin mb-3"></div>
            <p className="text-cafe-brown">Loading map...</p>
          </div>
        </div>
      )}
      
      {hasError ? (
        <MapFallback address={address} />
      ) : (
        <iframe
          src={mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0, borderRadius: '0.5rem' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          title="Cafe MRP Location"
        ></iframe>
      )}
    </div>
  );
};

const Contact = () => {
  // Cafe location information - Updated to Connaught Place, New Delhi
  const cafeLocation = {
    address: "Cafe MRP, N-16, Outer Circle, Connaught Place, New Delhi, India",
    lat: 28.6332,
    lng: 77.2194
  };
  
  return (
    <section className="py-16 md:py-20 bg-cafe-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-playfair font-bold text-cafe-darkBrown mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Visit Us
          </motion.h2>
          <motion.div 
            className="mx-auto w-24 h-1 bg-cafe-gold mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          ></motion.div>
          <motion.p 
            className="max-w-2xl mx-auto text-cafe-brown font-poppins"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            We'd love to see you! Drop by our location in Connaught Place or get in touch to book a reservation.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Map with error handling */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full h-64 md:h-96 bg-gray-200 rounded-lg overflow-hidden shadow-md"
          >
            <CafeMap address={cafeLocation.address} />
          </motion.div>

          {/* Contact Info - Optimized with memoized components */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6 md:space-y-8"
          >
            <ContactItem icon={faMapPin} title="Our Location">
              N-16, Outer Circle<br />
              Connaught Place, New Delhi, India
            </ContactItem>
            
            <ContactItem icon={faClock} title="Opening Hours">
              Monday - Friday: 7:00 AM - 11:00 PM<br />
              Weekends: 8:00 AM - 1:00 AM
            </ContactItem>
            
            <ContactItem icon={faPhone} title="Phone">
              +91 (11) 4567-8901<br />
              +91 (11) 4567-8902
            </ContactItem>
            
            <ContactItem icon={faEnvelope} title="Email">
              info@cafemrp.com<br />
              reservations@cafemrp.com
            </ContactItem>
            
            <motion.button 
              className="bg-cafe-darkBrown hover:bg-black text-white font-poppins font-medium px-6 py-3 rounded-md transition-colors w-full md:w-auto mt-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Make a Reservation
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
