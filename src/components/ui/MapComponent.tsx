import { useState } from 'react';

interface MapComponentProps {
  position: [number, number];
  zoom?: number;
  popupContent?: React.ReactNode;
  className?: string;
  height?: string;
}

const MapComponent = ({
  position,
  zoom = 15,
  popupContent,
  className = '',
  height = '100%'
}: MapComponentProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  // Format location for Google Maps embed
  const lat = position[0];
  const lng = position[1];
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${lat},${lng}&zoom=${zoom}`;
  
  return (
    <div className={`w-full ${className}`} style={{ height }}>
      {!isLoaded && !hasError && (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-t-2 border-cafe-gold rounded-full animate-spin mb-3"></div>
            <p className="text-cafe-brown">Loading map...</p>
          </div>
        </div>
      )}
      
      {hasError ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg">
          <div className="text-center p-6">
            <h3 className="text-xl font-bold text-cafe-darkBrown mb-2">Map unavailable</h3>
            <p className="text-cafe-brown">We're having trouble loading the map.</p>
            <p className="text-cafe-brown mb-4">Find us at: {lat}, {lng}</p>
            <a 
              href={`https://maps.google.com/?q=${lat},${lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cafe-gold text-cafe-darkBrown px-4 py-2 rounded-md font-medium hover:bg-cafe-gold/90 transition-colors"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
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
          className={`${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 rounded-lg`}
          title="Cafe MRP Location"
        ></iframe>
      )}
      
      {/* Popup content if needed */}
      {popupContent && isLoaded && !hasError && (
        <div className="absolute bottom-4 left-4 bg-white p-3 rounded-md shadow-md max-w-xs">
          {popupContent}
        </div>
      )}
    </div>
  );
};

export default MapComponent; 