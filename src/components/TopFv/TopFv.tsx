import React, { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import GlitchText from '../GlitchText';
import DecryptedLoader from '../DecryptedLoader';
import ViewportHandler from '../ViewportHandler';
import LiquidChrome from '../LiquidChrome';
import { useViewport } from '../../hooks/useViewport';
import { useLocale, type Locale } from '../../contexts/LocaleContext';

import './Aurora.css';

type CtaContent = {
  newLabel: string;
  badgeText: string;
  primary: string;
  secondary: string;
};

const ctaContent: Record<Locale, CtaContent> = {
  ja: {
    newLabel: 'NEW',
    badgeText: 'Articles 公開中',
    primary: '実績を見る',
    secondary: '自己紹介を読む',
  },
  en: {
    newLabel: 'NEW',
    badgeText: 'Articles Available',
    primary: 'View Works',
    secondary: 'Learn more',
  },
};

const TopFv: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const { width: viewportWidth, isMobile } = useViewport();
  const { locale } = useLocale();
  const cta = ctaContent[locale];

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
      {/* LiquidChrome 背景は .topfv-container (opacity fade) の外側に置く。
          中に入れると DecryptedLoader が消えた直後に Aurora が一瞬見え、
          その後 fade-in で LiquidChrome が現れる時差が生じる。 */}
      <div className="topfv-liquid-bg" aria-hidden="true">
        <LiquidChrome
          baseColor={[0.1, 0.1, 0.1]}
          speed={0.2}
          amplitude={0.5}
          frequencyX={3}
          frequencyY={2}
          interactive
        />
      </div>
      <div className={`topfv-container ${contentVisible ? 'fade-in' : 'hidden'}`}>
        <div className="portfolio-title">
          <a
            href="#articles"
            className="topfv-cta-badge cursor-target"
            aria-label={`${cta.newLabel} ${cta.badgeText}`}
          >
            <span className="topfv-cta-badge__new">{cta.newLabel}</span>
            <span className="topfv-cta-badge__text">{cta.badgeText}</span>
            <FaArrowRight className="topfv-cta-badge__arrow" aria-hidden="true" />
          </a>

          <GlitchText
            speed={getGlitchSpeed()}
            enableShadows={true}
            enableOnHover={false}
            className={getCustomGlitchClass()}
          >
            N-i-ke's Portfolio
          </GlitchText>

          <div className="topfv-cta-buttons">
            <a
              href="#work"
              className="topfv-cta-btn topfv-cta-btn--primary cursor-target"
            >
              <span>{cta.primary}</span>
              <FaArrowRight aria-hidden="true" />
            </a>
            <a
              href="#about"
              className="topfv-cta-btn topfv-cta-btn--secondary cursor-target"
            >
              {cta.secondary}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopFv;
