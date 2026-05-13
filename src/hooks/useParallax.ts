import { RefObject, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseParallaxOptions {
  /**
   * 親要素のスクロール進行に対する移動量（%）。
   * 正の値: 下方向にずらす（背景的・遅く見える）
   * 負の値: 上方向にずらす（前景的・速く見える）
   */
  yPercent?: number;
}

export const useParallax = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  { yPercent = 20 }: UseParallaxOptions = {}
) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const tween = gsap.to(el, {
      yPercent,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [ref, yPercent]);
};
