import React, { useState, useEffect } from 'react';
import './AuroraLoader.css';

interface AuroraLoaderProps {
  isLoading: boolean;
  onLoadingComplete?: () => void;
}

const AuroraLoader: React.FC<AuroraLoaderProps> = ({ isLoading, onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (isLoading) {
      // Simulated progress animation
      let currentProgress = 0;
      const interval = setInterval(() => {
        // Slow down progress as it approaches 100%
        const increment = Math.max(1, 10 * (1 - currentProgress / 100));
        currentProgress = Math.min(99, currentProgress + increment);
        setProgress(currentProgress);
        
        if (currentProgress >= 99 && !isLoading) {
          clearInterval(interval);
          setProgress(100);
        }
      }, 100);
      
      return () => clearInterval(interval);
    } else {
      // Simulate final loading complete
      setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            if (onLoadingComplete) onLoadingComplete();
          }, 500);
        }, 500);
      }, 300);
    }
  }, [isLoading, onLoadingComplete]);

  return (
    <div className={`aurora-loader ${fadeOut ? 'fade-out' : ''}`}>
      <div className="loader-content">
        <div className="loader-spinner"></div>
        <div className="loader-text">Loading</div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="progress-text">{progress}%</div>
      </div>
    </div>
  );
};

export default AuroraLoader; 