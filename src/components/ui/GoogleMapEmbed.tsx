import React from 'react';

interface GoogleMapEmbedProps {
  location: {
    address?: string;
    query?: string;
    lat?: number;
    lng?: number;
  };
  height?: string | number;
  width?: string | number;
  className?: string;
  zoom?: number;
  title?: string;
}

const GoogleMapEmbed = ({
  location,
  height = 450,
  width = '100%',
  className = '',
  zoom = 15,
  title = 'Location Map'
}: GoogleMapEmbedProps) => {
  // Determine the map URL based on provided location info
  const getMapUrl = () => {
    if (location.query) {
      // If a specific query is provided, use that directly
      return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3361.9!2d-122.4!3d37.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM0!5e0!3m2!1sen!2sus!4v1683240000000!5m2!1sen!2sus&q=${encodeURIComponent(location.query)}&z=${zoom}`;
    } else if (location.lat && location.lng) {
      // If lat/lng are provided, use them
      return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3361.9!2d${location.lng}!3d${location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM0!5e0!3m2!1sen!2sus!4v1683240000000!5m2!1sen!2sus&z=${zoom}`;
    } else if (location.address) {
      // If only address is provided, encode it as a query
      return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3361.9!2d-122.4!3d37.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM0!5e0!3m2!1sen!2sus!4v1683240000000!5m2!1sen!2sus&q=${encodeURIComponent(location.address)}&z=${zoom}`;
    }
    
    // Default fallback
    return 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3361.9!2d-122.4!3d37.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM0!5e0!3m2!1sen!2sus!4v1683240000000!5m2!1sen!2sus';
  };

  return (
    <iframe
      title={title}
      src={getMapUrl()}
      width={width}
      height={height}
      className={`rounded-lg shadow-lg border-0 ${className}`}
      allowFullScreen={true}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
};

export default GoogleMapEmbed; 