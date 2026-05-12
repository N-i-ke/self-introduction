import React, { useEffect } from 'react';

/**
 * Component that handles viewport-related issues on mobile devices
 * - Sets the viewport meta tag
 * - Adjusts for iOS Safari 100vh issue
 * - Prevents bounce/overscroll only on specific elements
 */
const ViewportHandler: React.FC = () => {
  useEffect(() => {
    // Set viewport meta tag
    const existingViewport = document.querySelector('meta[name="viewport"]') as HTMLMetaElement | null;
    
    if (!existingViewport) {
      const viewportMeta = document.createElement('meta');
      viewportMeta.name = 'viewport';
      viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
      document.head.appendChild(viewportMeta);
      
      return () => {
        document.head.removeChild(viewportMeta);
      };
    } else {
      // Update existing viewport to allow scrolling and scaling
      existingViewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
    }
    
    // Only prevent bounce/overscroll on specific elements with .prevent-bounce class
    const handleTouchMove = (e: Event) => {
      const touchEvent = e as TouchEvent;
      const target = touchEvent.target as HTMLElement;
      if (target.closest('.prevent-bounce')) {
        touchEvent.preventDefault();
      }
    };
    
    // Only apply these settings on iOS devices
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    
    if (isIOS) {
      // Only attach the touch event handler to the specific element that shouldn't scroll
      const preventBounceElements = document.querySelectorAll('.prevent-bounce');
      preventBounceElements.forEach(el => {
        el.addEventListener('touchmove', handleTouchMove as EventListener, { passive: false });
      });
      
      // Set CSS variables for iOS-specific height
      const setIOSHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      };
      
      setIOSHeight();
      window.addEventListener('resize', setIOSHeight);
      
      return () => {
        preventBounceElements.forEach(el => {
          el.removeEventListener('touchmove', handleTouchMove as EventListener);
        });
        window.removeEventListener('resize', setIOSHeight);
      };
    }
  }, []);
  
  return null;
};

export default ViewportHandler; 