import React, { useEffect } from 'react';

/**
 * Component that handles viewport-related issues on mobile devices
 * - Sets the viewport meta tag
 * - Adjusts for iOS Safari 100vh issue
 * - Prevents bounce/overscroll
 */
const ViewportHandler: React.FC = () => {
  useEffect(() => {
    // Set viewport meta tag
    const existingViewport = document.querySelector('meta[name="viewport"]');
    
    if (!existingViewport) {
      const viewportMeta = document.createElement('meta');
      viewportMeta.name = 'viewport';
      viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
      document.head.appendChild(viewportMeta);
      
      return () => {
        document.head.removeChild(viewportMeta);
      };
    }
    
    // Handle iOS touch events to prevent bounce/overscroll
    const handleTouchMove = (e: TouchEvent) => {
      // Allow scrolling on elements that need to scroll
      if ((e.target as HTMLElement).closest('.scrollable')) {
        return;
      }
      
      // Prevent default for everything else to avoid bounce/overscroll
      e.preventDefault();
    };
    
    // Only apply these settings on iOS devices
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    
    if (isIOS) {
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      
      // Set CSS variables for iOS-specific height
      const setIOSHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      };
      
      setIOSHeight();
      window.addEventListener('resize', setIOSHeight);
      
      return () => {
        document.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('resize', setIOSHeight);
      };
    }
  }, []);
  
  return null;
};

export default ViewportHandler; 