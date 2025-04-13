import React, { useEffect, useState } from 'react';
import './AuroraLoader.css';

interface AuroraLoaderProps {
  isLoading: boolean;
  onLoadingComplete?: () => void;
}

const AuroraLoader: React.FC<AuroraLoaderProps> = ({ isLoading, onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      // Complete the progress bar when loading is done
      setProgress(100);
      
      // Delay hiding the loader for smooth transition
      const timeout = setTimeout(() => {
        setVisible(false);
        if (onLoadingComplete) onLoadingComplete();
      }, 600);
      
      return () => clearTimeout(timeout);
    }
    
    // Simulate loading progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      // Slow down progress as it approaches 90%
      const increment = Math.max(1, 10 * (1 - currentProgress / 100));
      currentProgress = Math.min(90, currentProgress + increment);
      setProgress(currentProgress);
      
      if (currentProgress >= 90 && !isLoading) {
        clearInterval(interval);
        setProgress(100);
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [isLoading, onLoadingComplete]);

  if (!visible) return null;

  return (
    <div className={`aurora-loader ${progress >= 100 ? 'fade-out' : ''}`}>
      <div className="loader-inner">
        <div className="loader-text">Loading</div>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <div className="loader-dots">
          <span className="dot" style={{ animationDelay: '0s' }}></span>
          <span className="dot" style={{ animationDelay: '0.2s' }}></span>
          <span className="dot" style={{ animationDelay: '0.4s' }}></span>
        </div>
      </div>
    </div>
  );
};

export default AuroraLoader; 