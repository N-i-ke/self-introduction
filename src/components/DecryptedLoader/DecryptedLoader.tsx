import React, { useEffect, useRef, useState } from 'react';
import DecryptedText from '../DecryptedText';
import './DecryptedLoader.css';

interface DecryptedLoaderProps {
  isLoading: boolean;
  onLoadingComplete?: () => void;
  text?: string;
}

const MIN_DISPLAY_MS = 1800;
const FADE_DURATION_MS = 600;

const DecryptedLoader: React.FC<DecryptedLoaderProps> = ({
  isLoading,
  onLoadingComplete,
  text = 'WELCOME'
}) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [minDisplayDone, setMinDisplayDone] = useState(false);
  const completedRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => setMinDisplayDone(true), MIN_DISPLAY_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (completedRef.current) return;
    if (isLoading || !minDisplayDone) return;

    completedRef.current = true;
    setFadeOut(true);
    const completeTimer = setTimeout(() => {
      onLoadingComplete?.();
    }, FADE_DURATION_MS);

    return () => clearTimeout(completeTimer);
  }, [isLoading, minDisplayDone, onLoadingComplete]);

  return (
    <div
      className={`decrypted-loader ${fadeOut ? 'fade-out' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <DecryptedText
        text={text}
        animateOn="view"
        sequential
        revealDirection="start"
        speed={70}
        useOriginalCharsOnly={false}
        parentClassName="decrypted-loader__text"
        className="decrypted-loader__char--revealed"
        encryptedClassName="decrypted-loader__char--encrypted"
      />
    </div>
  );
};

export default DecryptedLoader;
