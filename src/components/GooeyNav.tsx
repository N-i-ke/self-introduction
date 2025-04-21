import React, { useRef, useEffect, useState } from "react";
import "./GooeyNav.css";

// 項目の型を定義
interface NavItem {
  label: string;
  href: string;
}

// コンポーネントのpropsの型を定義
interface GooeyNavProps {
  items: NavItem[];
  animationTime?: number;
  particleCount?: number;
  particleDistances?: number[];
  particleR?: number;
  timeVariance?: number;
  colors?: number[];
  initialActiveIndex?: number;
}

const GooeyNav: React.FC<GooeyNavProps> = ({
  items,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(initialActiveIndex);
  const [initialized, setInitialized] = useState<boolean>(false);

  const noise = (n: number = 1): number => n / 2 - Math.random() * n;

  const getXY = (
    distance: number,
    pointIndex: number,
    totalPoints: number
  ): [number, number] => {
    const angle =
      ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  interface Particle {
    start: [number, number];
    end: [number, number];
    time: number;
    scale: number;
    color: number;
    rotate: number;
  }

  const createParticle = (
    i: number,
    t: number,
    d: number[],
    r: number
  ): Particle => {
    let rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
    };
  };

  const makeParticles = (element: HTMLElement): void => {
    if (!element) return;
    
    const d = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty("--time", `${bubbleTime}ms`);

    // 既存のパーティクルをクリア
    const existingParticles = element.querySelectorAll(".particle");
    existingParticles.forEach((p: Element) => {
      try {
        element.removeChild(p);
      } catch (e) {
        // エラー無視
      }
    });

    // アニメーション状態をリセット
    element.classList.remove("active");
    void element.offsetWidth; // 強制的にリフロー

    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);

      setTimeout(() => {
        if (!element) return;
        
        const particle = document.createElement("span");
        const point = document.createElement("span");
        particle.classList.add("particle");
        particle.style.setProperty("--start-x", `${p.start[0]}px`);
        particle.style.setProperty("--start-y", `${p.start[1]}px`);
        particle.style.setProperty("--end-x", `${p.end[0]}px`);
        particle.style.setProperty("--end-y", `${p.end[1]}px`);
        particle.style.setProperty("--time", `${p.time}ms`);
        particle.style.setProperty("--scale", `${p.scale}`);
        particle.style.setProperty("--color", `var(--color-${p.color}, white)`);
        particle.style.setProperty("--rotate", `${p.rotate}deg`);

        point.classList.add("point");
        particle.appendChild(point);
        element.appendChild(particle);
        
        requestAnimationFrame(() => {
          element.classList.add("active");
        });
        
        setTimeout(() => {
          try {
            if (element && particle.parentNode === element) {
              element.removeChild(particle);
            }
          } catch (e) {
            // エラー無視
          }
        }, t);
      }, 30 * i); // 時間差を加えて順番に表示
    }
  };

  const updateEffectPosition = (element: HTMLElement): void => {
    if (!containerRef.current || !filterRef.current || !textRef.current || !element) return;
    
    try {
      const containerRect = containerRef.current.getBoundingClientRect();
      const pos = element.getBoundingClientRect();

      const styles = {
        left: `${pos.x - containerRect.x}px`,
        top: `${pos.y - containerRect.y}px`,
        width: `${pos.width}px`,
        height: `${pos.height}px`,
      };
      
      Object.assign(filterRef.current.style, styles);
      Object.assign(textRef.current.style, styles);
      textRef.current.innerText = element.innerText;
      
      // アニメーションをトリガー
      if (initialized) {
        makeParticles(filterRef.current);
      }
    } catch (e) {
      console.error("Error updating effect position:", e);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLLIElement>, index: number): void => {
    const liEl = e.currentTarget;
    if (activeIndex === index) return;

    setActiveIndex(index);
    updateEffectPosition(liEl);

    if (textRef.current) {
      textRef.current.classList.remove("active");
      void textRef.current.offsetWidth;
      textRef.current.classList.add("active");
    }

    if (filterRef.current) {
      makeParticles(filterRef.current);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>, index: number): void => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const liEl = e.currentTarget.parentElement as HTMLLIElement;
      if (liEl) {
        handleClick(
          { currentTarget: liEl } as React.MouseEvent<HTMLLIElement>,
          index
        );
      }
    }
  };

  // 初期化時とactiveIndexが変更されたときに実行
  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    
    // 少し遅延させてDOM要素が正しくレンダリングされるのを待つ
    const timer = setTimeout(() => {
      if (navRef.current) {
        const navItems = navRef.current.querySelectorAll("li");
        if (navItems.length > activeIndex) {
          const activeLi = navItems[activeIndex] as HTMLLIElement;
          if (activeLi) {
            updateEffectPosition(activeLi);
            
            if (textRef.current) {
              textRef.current.classList.add("active");
            }
            
            if (filterRef.current && !initialized) {
              setInitialized(true);
              makeParticles(filterRef.current);
            }
          }
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, initialized]);

  // リサイズ対応
  useEffect(() => {
    if (!containerRef.current || !navRef.current) return;
    
    const handleResize = () => {
      if (navRef.current) {
        const navItems = navRef.current.querySelectorAll("li");
        if (navItems.length > activeIndex) {
          const currentActiveLi = navItems[activeIndex] as HTMLLIElement;
          if (currentActiveLi) {
            updateEffectPosition(currentActiveLi);
          }
        }
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(containerRef.current);
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  return (
    <div className="gooey-nav-container" ref={containerRef}>
      {/* SVGフィルター - Gooeyエフェクト用 */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="gooey" />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>
      
      <nav>
        <ul ref={navRef}>
          {items.map((item, index) => (
            <li
              key={index}
              className={activeIndex === index ? "active" : ""}
              onClick={(e) => handleClick(e, index)}
            >
              <a href={item.href} onKeyDown={(e) => handleKeyDown(e, index)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <span className="effect filter" ref={filterRef} />
      <span className="effect text" ref={textRef} />
    </div>
  );
};

export default GooeyNav;