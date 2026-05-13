import React, { useState, useEffect } from 'react';
import GlitchText from '../GlitchText';
import DecryptedLoader from '../DecryptedLoader';
import ViewportHandler from '../ViewportHandler';
import { useViewport } from '../../hooks/useViewport';

import './Aurora.css';

const TopFv: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const { width: viewportWidth, isMobile } = useViewport();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setContentVisible(true);
  };

  const getCustomGlitchClass = () => {
    if (isMobile) {
      if (viewportWidth < 375) {
        return 'glitch-mobile-small';
      } else if (viewportWidth < 480) {
        return 'glitch-mobile-medium';
      } else {
        return 'glitch-mobile-large';
      }
    }
    return 'glitch-desktop';
  };

  const getGlitchSpeed = () => {
    return isMobile ? 1.5 : 1;
  };

  return (
    <>
      <ViewportHandler />
      <DecryptedLoader isLoading={isLoading} onLoadingComplete={handleLoadingComplete} />
      <div className={`topfv-container ${contentVisible ? 'fade-in' : 'hidden'}`}>
        <div className="portfolio-title">
          <GlitchText
            speed={getGlitchSpeed()}
            enableShadows={true}
            enableOnHover={false}
            className={getCustomGlitchClass()}
          >
            N-i-ke's Portfolio
          </GlitchText>
        </div>
      </div>
    </>
  );
};

export default TopFv;
