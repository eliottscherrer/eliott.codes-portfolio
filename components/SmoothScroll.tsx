"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { createSamePageAnchorClickHandler } from "@/lib/anchor-scroll";

const SmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    const handleAnchorClick = createSamePageAnchorClickHandler(lenis);

    // Capture phase prevents Next hash navigation from mutating the URL first.
    document.addEventListener("click", handleAnchorClick, true);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.removeEventListener("click", handleAnchorClick, true);
    };
  }, []);

  return null;
};

export default SmoothScroll;
