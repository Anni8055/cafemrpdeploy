import { useEffect, useState, memo } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for marker icons in Leaflet with webpack/vite
const iconRetinaUrl = '/marker-icon-2x.png';
const iconUrl = '/marker-icon.png';
const shadowUrl = '/marker-shadow.png';

interface MapComponentProps {
  position: [number, number];
  zoom?: number;
  popupContent?: React.ReactNode;
  className?: string;
  height?: string;
}

// Lazy loading wrapper with memo for better performance
const MapComponent = memo(({
  position,
  zoom = 15,
  popupContent,
  className = '',
  height = '100%'
}: MapComponentProps) => {
  const [isClient, setIsClient] = useState(false);
  const [Map, setMap] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Fix Leaflet default icon issue once when component loads
    if (!L.Icon.Default.imagePath) {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      
      L.Icon.Default.mergeOptions({
        iconRetinaUrl,
        iconUrl,
        shadowUrl,
      });
    }
    
    // Dynamically import Leaflet components on client-side only
    let isActive = true; // Flag for preventing state updates if component unmounts
    
    const loadMap = async () => {
      try {
        setLoading(true);
        // Use dynamic import with specific named imports for smaller bundle
        const { MapContainer, TileLayer, Marker, Popup } = await import('react-leaflet');
        
        if (isActive) {
          setMap({ MapContainer, TileLayer, Marker, Popup });
          setIsClient(true);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error loading map components:', error);
        if (isActive) {
          setError(error as Error);
          setLoading(false);
        }
      }
    };
    
    // Add a small delay to prevent blocking the main thread during page load
    const timeoutId = setTimeout(() => {
      loadMap();
    }, 100);
    
    return () => {
      isActive = false;
      clearTimeout(timeoutId);
    };
  }, []);

  if (error) {
    return (
      <div 
        className={`w-full ${height} bg-gray-100 flex items-center justify-center rounded-lg ${className}`}
        style={{ height }}
      >
        <div className="text-center p-4">
          <p className="text-cafe-brown font-poppins">Unable to load map.</p>
        </div>
      </div>
    );
  }

  if (!isClient || !Map || loading) {
    return (
      <div 
        className={`w-full bg-gray-200 flex items-center justify-center rounded-lg ${className}`}
        style={{ height }}
      >
        <div className="flex flex-col items-center">
          <div className="w-6 h-6 border-t-2 border-cafe-gold rounded-full animate-spin mb-2"></div>
          <p className="text-cafe-brown font-poppins text-sm">Loading map...</p>
        </div>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup } = Map;

  // Use performance-optimized map settings for mobile devices
  const isMobile = window.innerWidth < 768;
  const actualZoom = isMobile ? Math.max(zoom - 1, 10) : zoom; // Slightly zoomed out on mobile
  
  return (
    <MapContainer 
      center={position} 
      zoom={actualZoom} 
      style={{ height, width: '100%' }}
      zoomControl={!isMobile} // Hide zoom controls on mobile to save space
      attributionControl={!isMobile}
      scrollWheelZoom={false} // Disable scroll wheel zoom to prevent page scrolling issues
      dragging={true}
      className={`rounded-lg ${className}`}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        tileSize={256}
        maxZoom={18}
      />
      <Marker position={position}>
        {popupContent && <Popup>{popupContent}</Popup>}
      </Marker>
    </MapContainer>
  );
});

export default MapComponent; 