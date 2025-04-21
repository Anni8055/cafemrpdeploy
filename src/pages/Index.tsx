import { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import MenuHighlights from '../components/home/MenuHighlights';
import Testimonials from '../components/home/Testimonials';
import Contact from '../components/home/Contact';
import Instagram from '../components/home/Instagram';
import WhatsAppButton from '../components/ui/WhatsAppButton';

const Index = () => {
  useEffect(() => {
    const handleImageError = (event: Event) => {
      const imgElement = event.target as HTMLImageElement;
      imgElement.src = '/placeholder.svg';
      imgElement.alt = 'Image placeholder';
    };

    document.addEventListener('error', handleImageError, true);
    
    return () => {
      document.removeEventListener('error', handleImageError, true);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <MenuHighlights />
        <Testimonials />
        <Contact />
        <Instagram />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
