import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import WhatsAppButton from '../components/ui/WhatsAppButton';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {/* Contact Banner */}
        <div className="relative h-64 md:h-80 bg-cafe-darkBrown">
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center z-10">
            <motion.h1 
              className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Get In Touch
            </motion.h1>
            <motion.div 
              className="w-24 h-1 bg-cafe-gold"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            ></motion.div>
          </div>
        </div>

        {/* Contact Content */}
        <div className="py-16 bg-cafe-cream">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-playfair font-bold text-cafe-darkBrown mb-6">Contact Information</h2>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cafe-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={faMapPin} className="text-cafe-darkBrown text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-playfair font-bold text-cafe-darkBrown mb-2">Our Location</h3>
                    <p className="text-cafe-brown font-poppins">
                      123 Coffee Street<br />
                      Cafe District, CA 98765
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cafe-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={faPhone} className="text-cafe-darkBrown text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-playfair font-bold text-cafe-darkBrown mb-2">Phone</h3>
                    <p className="text-cafe-brown font-poppins">
                      (123) 456-7890<br />
                      (123) 456-7891
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cafe-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={faEnvelope} className="text-cafe-darkBrown text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-playfair font-bold text-cafe-darkBrown mb-2">Email</h3>
                    <p className="text-cafe-brown font-poppins">
                      info@cafemrp.com<br />
                      reservations@cafemrp.com
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="bg-white p-8 rounded-lg shadow-lg"
              >
                <h2 className="text-3xl font-playfair font-bold text-cafe-darkBrown mb-6">Send Us a Message</h2>
                
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-cafe-darkBrown font-poppins font-medium mb-2">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-gold"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-cafe-darkBrown font-poppins font-medium mb-2">Your Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-gold"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-cafe-darkBrown font-poppins font-medium mb-2">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-gold"
                      placeholder="Reservation Inquiry"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-cafe-darkBrown font-poppins font-medium mb-2">Your Message</label>
                    <textarea 
                      id="message" 
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-gold"
                      placeholder="Write your message here..."
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full bg-cafe-gold hover:bg-cafe-gold/90 text-cafe-darkBrown font-poppins font-medium px-8 py-3 rounded-md transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Contact;
