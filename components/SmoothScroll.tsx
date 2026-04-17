"use client";

import { useEffect } from "react";
import Lenis from "lenis";

const SmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Handle anchor link clicks with a dynamic offset based on sticky header size
    const handleAnchorClick = (e: Event) => {
      const clickTarget = e.target as HTMLElement | null;
      const anchor = clickTarget?.closest(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;

      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href.length <= 1) return;

      e.preventDefault();

      try {
        const targetElement = document.querySelector(
          href,
        ) as HTMLElement | null;
        if (!targetElement) return;

        const stickyHeader = document.querySelector(
          "header.sticky",
        ) as HTMLElement | null;
        const stickyHeaderHeight =
          stickyHeader?.getBoundingClientRect().height ?? 0;
        const stickyTopOffset = stickyHeader
          ? Number.parseFloat(getComputedStyle(stickyHeader).top || "0") || 0
          : 0;
        const breathingRoom = 16;
        const offset = -(stickyHeaderHeight + stickyTopOffset + breathingRoom);

        lenis.scrollTo(targetElement, { offset });
      } catch {
        console.warn(`Invalid selector: ${href}`);
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      lenis.destroy();
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return null;
};

export default SmoothScroll;
