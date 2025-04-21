// Image optimization utility functions

// Function to generate srcset for responsive images
export const generateSrcSet = (url: string): string => {
  const sizes = [300, 600, 900, 1200];
  const params = new URLSearchParams(url.split('?')[1] || '');
  
  return sizes
    .map(size => {
      params.set('w', size.toString());
      const baseUrl = url.split('?')[0];
      return `${baseUrl}?${params.toString()} ${size}w`;
    })
    .join(', ');
};

// Function to determine image dimensions based on viewport
export const getImageDimensions = (containerWidth: number): { width: number; height: number } => {
  const aspectRatio = 4 / 3;
  const width = Math.min(containerWidth, 1200);
  const height = width / aspectRatio;
  
  return { width, height };
};

// Function to generate blur hash placeholder
export const getBlurDataURL = async (url: string): Promise<string> => {
  try {
    const params = new URLSearchParams(url.split('?')[1] || '');
    params.set('w', '50');
    params.set('blur', '50');
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?${params.toString()}`;
  } catch (error) {
    console.error('Error generating blur hash:', error);
    return '';
  }
};

// Function to preload critical images
export const preloadCriticalImages = (urls: string[]): void => {
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
};

// Function to lazy load images with Intersection Observer
export const setupLazyLoading = (
  imageSelector: string,
  onIntersect: (entry: IntersectionObserverEntry) => void
): void => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          onIntersect(entry);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: '50px',
      threshold: 0.1
    }
  );

  document.querySelectorAll(imageSelector).forEach(img => {
    observer.observe(img);
  });
}; 