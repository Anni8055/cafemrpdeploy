import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin, faPhone, faEnvelope, faClock } from '@fortawesome/free-solid-svg-icons';
import MapComponent from '../ui/MapComponent';
import { memo } from 'react';

// Memoized contact info item for better performance
const ContactItem = memo(({ icon, title, children }: { icon: any, title: string, children: React.ReactNode }) => (
  <motion.div 
    className="flex items-start space-x-4"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <div className="w-10 h-10 md:w-12 md:h-12 bg-cafe-gold rounded-full flex items-center justify-center flex-shrink-0">
      <FontAwesomeIcon icon={icon} className="text-cafe-darkBrown text-lg md:text-xl" />
    </div>
    <div>
      <h3 className="text-lg md:text-xl font-playfair font-bold text-cafe-darkBrown mb-2">{title}</h3>
      <div className="text-cafe-brown font-poppins text-sm md:text-base">
        {children}
      </div>
    </div>
  </motion.div>
));

// Memoized section title component
const SectionTitle = memo(() => (
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
));

// Memoized map component wrapper
const MapSection = memo(({ cafeLocation }: { cafeLocation: { address: string, lat: number, lng: number } }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className="w-full h-64 md:h-96 bg-gray-200 rounded-lg overflow-hidden shadow-md"
  >
    <MapComponent 
      position={[cafeLocation.lat, cafeLocation.lng]}
      zoom={15}
      height="100%"
      popupContent={<div className="p-2"><strong>CafeMRP</strong><br />{cafeLocation.address}</div>}
    />
  </motion.div>
));

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
        <SectionTitle />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <MapSection cafeLocation={cafeLocation} />

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

export default memo(Contact);
