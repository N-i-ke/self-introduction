import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

export type Viewport = {
  width: number;
  isMobile: boolean;
};

export const useViewport = (): Viewport => {
  const [viewport, setViewport] = useState<Viewport>(() => ({
    width: typeof window === "undefined" ? 0 : window.innerWidth,
    isMobile:
      typeof window !== "undefined" && window.innerWidth <= MOBILE_BREAKPOINT,
  }));

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      setViewport({ width, isMobile: width <= MOBILE_BREAKPOINT });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return viewport;
};
