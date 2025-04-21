import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import WhatsAppButton from '../components/ui/WhatsAppButton';
import { motion } from 'framer-motion';

const Events = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {/* Events Banner */}
        <div className="relative h-64 md:h-80 bg-cafe-darkBrown">
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center z-10">
            <motion.h1 
              className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Events & Happenings
            </motion.h1>
            <motion.div 
              className="w-24 h-1 bg-cafe-gold"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            ></motion.div>
          </div>
        </div>

        {/* Events Content Placeholder */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <p className="text-xl font-poppins text-cafe-brown">
              Our Events calendar is coming soon! Check back for updates on live music, tastings, and special events.
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Events;
