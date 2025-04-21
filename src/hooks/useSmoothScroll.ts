import { useCallback, useEffect, useRef } from 'react';

interface ScrollOptions {
  smooth?: boolean;
  offset?: number;
  duration?: number;
  easing?: 'linear' | 'easeInQuad' | 'easeOutQuad' | 'easeInOutQuad';
}

const easingFunctions = {
  linear: (t: number): number => t,
  easeInQuad: (t: number): number => t * t,
  easeOutQuad: (t: number): number => t * (2 - t),
  easeInOutQuad: (t: number): number => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
};

export const useSmoothScroll = () => {
  const frameRef = useRef<number>();
  const startTimeRef = useRef<number>(0);
  const scrollingRef = useRef<boolean>(false);

  const getTargetPosition = useCallback((element: HTMLElement, offset: number = 0) => {
    const elementRect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return elementRect.top + scrollTop - offset;
  }, []);

  const cancelScroll = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      scrollingRef.current = false;
    }
  }, []);

  const scrollTo = useCallback((element: HTMLElement | null, options: ScrollOptions = {}) => {
    if (!element) return;

    const {
      smooth = true,
      offset = 0,
      duration = 800,
      easing = 'easeInOutQuad'
    } = options;

    // Cancel any ongoing scroll animation
    cancelScroll();

    const start = window.pageYOffset;
    const targetPosition = getTargetPosition(element, offset);
    
    if (!smooth) {
      window.scrollTo({
        top: targetPosition,
        behavior: 'auto'
      });
      return;
    }

    const easingFunction = easingFunctions[easing];
    scrollingRef.current = true;

    const animateScroll = (currentTime: number) => {
      if (!startTimeRef.current) startTimeRef.current = currentTime;
      
      const timeElapsed = currentTime - startTimeRef.current;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easingFunction(progress);
      
      const currentPosition = start + (targetPosition - start) * easedProgress;
      window.scrollTo(0, currentPosition);

      if (timeElapsed < duration && scrollingRef.current) {
        frameRef.current = requestAnimationFrame(animateScroll);
      } else {
        // Ensure we hit the exact target position
        window.scrollTo(0, targetPosition);
        scrollingRef.current = false;
        startTimeRef.current = 0;
      }
    };

    frameRef.current = requestAnimationFrame(animateScroll);

    // Return cleanup function
    return cancelScroll;
  }, [cancelScroll, getTargetPosition]);

  // Handle user interaction during scroll
  useEffect(() => {
    const handleUserInteraction = () => {
      if (scrollingRef.current) {
        cancelScroll();
      }
    };

    // Stop scrolling animation if user interacts
    window.addEventListener('wheel', handleUserInteraction, { passive: true });
    window.addEventListener('touchstart', handleUserInteraction, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [cancelScroll]);

  // Scroll to hash on page load with debounce
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const timeoutId = setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          scrollTo(element as HTMLElement, { offset: 100 });
        }
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [scrollTo]);

  // Intercept anchor clicks for smooth scrolling
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (
        anchor && 
        anchor.hash && 
        anchor.href.includes(window.location.pathname) &&
        !anchor.hasAttribute('data-no-smooth-scroll')
      ) {
        e.preventDefault();
        const element = document.querySelector(anchor.hash);
        if (element) {
          scrollTo(element as HTMLElement, { offset: 100 });
          // Update URL without triggering scroll
          window.history.pushState(null, '', anchor.hash);
        }
      }
    };

    window.addEventListener('click', handleClick, { passive: false });
    return () => window.removeEventListener('click', handleClick);
  }, [scrollTo]);

  return { scrollTo, cancelScroll };
}; 