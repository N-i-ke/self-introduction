import type { CSSProperties, MouseEventHandler } from "react";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./BubbleMenu.css";

export type BubbleMenuItem = {
  label: string;
  href: string;
  ariaLabel?: string;
  rotation?: number;
  hoverStyles?: {
    bgColor?: string;
    textColor?: string;
  };
};

export type BubbleMenuProps = {
  isOpen: boolean;
  items: BubbleMenuItem[];
  onItemClick?: (item: BubbleMenuItem) => void;
  menuBg?: string;
  menuContentColor?: string;
  animationEase?: string;
  animationDuration?: number;
  staggerDelay?: number;
};

const BubbleMenu: React.FC<BubbleMenuProps> = ({
  isOpen,
  items,
  onItemClick,
  menuBg = "rgba(14, 8, 8, 0.92)",
  menuContentColor = "#cfeaff",
  animationEase = "back.out(1.5)",
  animationDuration = 0.5,
  staggerDelay = 0.1,
}) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLAnchorElement[]>([]);
  const labelRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (isOpen) setShowOverlay(true);
  }, [isOpen]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const bubbles = bubblesRef.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);
    if (!overlay || !bubbles.length) return;

    if (isOpen) {
      gsap.set(overlay, { display: "flex" });
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.set(bubbles, { scale: 0, transformOrigin: "50% 50%" });
      gsap.set(labels, { y: 24, autoAlpha: 0 });

      bubbles.forEach((bubble, i) => {
        const delay = i * staggerDelay + gsap.utils.random(-0.05, 0.05);
        const tl = gsap.timeline({ delay });
        tl.to(bubble, { scale: 1, duration: animationDuration, ease: animationEase });
        if (labels[i]) {
          tl.to(
            labels[i],
            { y: 0, autoAlpha: 1, duration: animationDuration, ease: "power3.out" },
            `-=${animationDuration * 0.9}`,
          );
        }
      });
    } else if (showOverlay) {
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.to(labels, { y: 24, autoAlpha: 0, duration: 0.2, ease: "power3.in" });
      gsap.to(bubbles, {
        scale: 0,
        duration: 0.2,
        ease: "power3.in",
        onComplete: () => {
          gsap.set(overlay, { display: "none" });
          setShowOverlay(false);
        },
      });
    }
  }, [isOpen, showOverlay, animationEase, animationDuration, staggerDelay, items]);

  useEffect(() => {
    const handleResize = () => {
      if (!isOpen) return;
      const bubbles = bubblesRef.current.filter(Boolean);
      const isDesktop = window.innerWidth >= 900;
      bubbles.forEach((bubble, i) => {
        const item = items[i];
        if (bubble && item) {
          const rotation = isDesktop ? item.rotation ?? 0 : 0;
          gsap.set(bubble, { rotation });
        }
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, items]);

  if (!showOverlay) return null;

  const handleClick = (item: BubbleMenuItem): MouseEventHandler<HTMLAnchorElement> =>
    () => {
      onItemClick?.(item);
    };

  return (
    <div
      ref={overlayRef}
      className="bubble-menu-items fixed"
      aria-hidden={!isOpen}
    >
      <div className="bubble-menu-backdrop" aria-hidden="true" />
      <ul className="pill-list" role="menu" aria-label="Menu links">
        {items.map((item, idx) => (
          <li key={item.href} role="none" className="pill-col">
            <a
              role="menuitem"
              href={item.href}
              aria-label={item.ariaLabel || item.label}
              className="pill-link cursor-target"
              onClick={handleClick(item)}
              style={
                {
                  "--item-rot": `${item.rotation ?? 0}deg`,
                  "--pill-bg": menuBg,
                  "--pill-color": menuContentColor,
                  "--hover-bg": item.hoverStyles?.bgColor || "rgba(0, 216, 255, 0.18)",
                  "--hover-color": item.hoverStyles?.textColor || "#ffffff",
                } as CSSProperties
              }
              ref={(el) => {
                if (el) bubblesRef.current[idx] = el;
              }}
            >
              <span
                className="pill-label"
                ref={(el) => {
                  if (el) labelRefs.current[idx] = el;
                }}
              >
                {item.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BubbleMenu;
