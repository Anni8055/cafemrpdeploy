import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import WhatsAppButton from '../components/ui/WhatsAppButton';
import { motion } from 'framer-motion';

const Reservation = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {/* Reservation Banner */}
        <div className="relative h-64 md:h-80 bg-cafe-darkBrown">
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center z-10">
            <motion.h1 
              className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Make a Reservation
            </motion.h1>
            <motion.div 
              className="w-24 h-1 bg-cafe-gold"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            ></motion.div>
          </div>
        </div>

        {/* Reservation Form */}
        <div className="py-16 bg-cafe-cream">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-playfair font-bold text-cafe-darkBrown mb-6">Book Your Table</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-cafe-darkBrown font-poppins font-medium mb-2">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-gold"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-cafe-darkBrown font-poppins font-medium mb-2">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-gold"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-cafe-darkBrown font-poppins font-medium mb-2">Phone</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-gold"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="guests" className="block text-cafe-darkBrown font-poppins font-medium mb-2">Number of Guests</label>
                    <select 
                      id="guests" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-gold"
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 People</option>
                      <option value="3">3 People</option>
                      <option value="4">4 People</option>
                      <option value="5">5 People</option>
                      <option value="6">6 People</option>
                      <option value="7+">7+ People</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="date" className="block text-cafe-darkBrown font-poppins font-medium mb-2">Date</label>
                    <input 
                      type="date" 
                      id="date" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-gold"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="time" className="block text-cafe-darkBrown font-poppins font-medium mb-2">Time</label>
                    <select 
                      id="time" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-gold"
                    >
                      <option value="11:00">11:00 AM</option>
                      <option value="11:30">11:30 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="12:30">12:30 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="13:30">1:30 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="18:00">6:00 PM</option>
                      <option value="18:30">6:30 PM</option>
                      <option value="19:00">7:00 PM</option>
                      <option value="19:30">7:30 PM</option>
                      <option value="20:00">8:00 PM</option>
                      <option value="20:30">8:30 PM</option>
                      <option value="21:00">9:00 PM</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="special-requests" className="block text-cafe-darkBrown font-poppins font-medium mb-2">Special Requests</label>
                  <textarea 
                    id="special-requests" 
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-gold"
                    placeholder="Any special requests or dietary requirements..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-cafe-gold hover:bg-cafe-gold/90 text-cafe-darkBrown font-poppins font-medium px-8 py-3 rounded-md transition-colors"
                >
                  Book Now
                </button>
                
                <p className="text-sm text-gray-500 text-center">
                  Reservations should be made at least 24 hours in advance. For same-day reservations, please call us directly.
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Reservation;
