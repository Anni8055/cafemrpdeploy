
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-cafe-darkBrown text-cafe-cream">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faCoffee} className="text-cafe-gold text-2xl" />
              <span className="text-2xl font-playfair font-bold text-white">Cafe<span className="text-cafe-gold">MRP</span></span>
            </Link>
            <p className="font-poppins text-cafe-cream text-opacity-80 max-w-xs">
              A perfect blend of coffee, cuisine, and cocktails in a cozy and inviting atmosphere.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-cafe-cream hover:text-cafe-gold transition-colors">
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-cafe-cream hover:text-cafe-gold transition-colors">
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-cafe-cream hover:text-cafe-gold transition-colors">
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-playfair font-bold text-cafe-gold">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-cafe-gold transition-colors">Home</Link></li>
              <li><Link to="/menu" className="hover:text-cafe-gold transition-colors">Menu</Link></li>
              <li><Link to="/about" className="hover:text-cafe-gold transition-colors">About Us</Link></li>
              <li><Link to="/events" className="hover:text-cafe-gold transition-colors">Events</Link></li>
              <li><Link to="/contact" className="hover:text-cafe-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-playfair font-bold text-cafe-gold">Contact Us</h3>
            <address className="not-italic font-poppins">
              <p>123 Coffee Street</p>
              <p>Cafe District, CA 98765</p>
              <p className="mt-3">Phone: (123) 456-7890</p>
              <p>Email: info@cafemrp.com</p>
            </address>
            <div>
              <h4 className="text-cafe-gold font-medium mb-2">Hours</h4>
              <p>Mon-Fri: 7:00 AM - 11:00 PM</p>
              <p>Sat-Sun: 8:00 AM - 1:00 AM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-cafe-cream text-opacity-70">
          <p>&copy; {new Date().getFullYear()} CafeMRP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
