# Cafe MRP

A modern cafe website featuring a responsive design, video backgrounds, and interactive elements built with React, TypeScript, and Tailwind CSS.

## Features

- Responsive design for all device sizes
- Video backgrounds with fallback images
- Interactive elements using Framer Motion
- WhatsApp floating button for easy contact
- Map integration showing the cafe location
- Menu display with filtering options
- Reservation system

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Anni8055/Cafe-MRP.git
cd Cafe-MRP
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Large Video Files

Some video files exceed GitHub's 100MB file size limit and are not included in the repository:
- luxury-cafe.mp4 (177MB)
- cafe-ambience-optimized.mp4 (162MB)
- coffee-pouring.mp4 (151MB)

The application is configured to use smaller video files that are included in the repository:
- couple-date-restaurant.mp4 (24MB)
- cafe-bar-ambience.mp4 (11MB)
- cafe-atmosphere.mp4 (2.2MB)
- cafe-ambience.mp4 (2.7MB)

If you want to use the larger, higher-quality videos, you can:
1. Download them from a shared drive or other storage
2. Place them in the `public/videos/` directory
3. Update the `HERO_VIDEO` constant in `src/components/home/Hero.tsx` if needed

## Credits

- Video backgrounds: Pexels and Unsplash
- Icons: Font Awesome
- Fonts: Google Fonts (Playfair Display and Poppins)
- Map: Google Maps API

## License

MIT License
