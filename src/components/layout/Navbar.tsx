
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-cafe-darkBrown bg-opacity-95 shadow-lg py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faCoffee} className="text-cafe-gold text-2xl" />
          <span className="text-2xl font-playfair font-bold text-white">Cafe<span className="text-cafe-gold">MRP</span></span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/menu">Menu</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-cafe-cream hover:text-cafe-gold transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} className="text-2xl" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-cafe-darkBrown bg-opacity-95 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</MobileNavLink>
            <MobileNavLink to="/menu" onClick={() => setIsMenuOpen(false)}>Menu</MobileNavLink>
            <MobileNavLink to="/about" onClick={() => setIsMenuOpen(false)}>About</MobileNavLink>
            <MobileNavLink to="/events" onClick={() => setIsMenuOpen(false)}>Events</MobileNavLink>
            <MobileNavLink to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</MobileNavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link 
    to={to} 
    className="text-cafe-cream hover:text-cafe-gold font-poppins font-medium transition-colors"
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, children, onClick }: { to: string; children: React.ReactNode; onClick: () => void }) => (
  <Link 
    to={to} 
    className="text-cafe-cream hover:text-cafe-gold font-poppins font-medium text-lg block py-2 transition-colors"
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Navbar;
