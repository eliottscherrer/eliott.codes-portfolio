import Lenis from "lenis";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const isPrimaryPointerClick = (event: MouseEvent) =>
  event.button === 0 &&
  !event.metaKey &&
  !event.ctrlKey &&
  !event.shiftKey &&
  !event.altKey;

const getSamePageHashFromAnchor = (anchor: HTMLAnchorElement) => {
  const href = anchor.getAttribute("href");
  if (!href || href === "#") return null;

  const parsedUrl = new URL(anchor.href, window.location.href);
  const isSamePageUrl =
    parsedUrl.origin === window.location.origin &&
    parsedUrl.pathname === window.location.pathname &&
    parsedUrl.search === window.location.search;

  if (!isSamePageUrl || !parsedUrl.hash) return null;

  return decodeURIComponent(parsedUrl.hash.slice(1));
};

const getStickyHeaderOffset = () => {
  const stickyHeader = document.querySelector("header.sticky");
  if (!(stickyHeader instanceof HTMLElement)) return 0;

  const stickyHeaderHeight = stickyHeader.getBoundingClientRect().height;
  const stickyTopOffset =
    Number.parseFloat(getComputedStyle(stickyHeader).top || "0") || 0;
  const breathingRoom = 16;

  return -(stickyHeaderHeight + stickyTopOffset + breathingRoom);
};

const clearHashFromCurrentUrl = () => {
  const cleanUrl = `${window.location.pathname}${window.location.search}`;
  window.history.replaceState(window.history.state, "", cleanUrl);
};

const scrollWithReducedMotion = (
  targetElement: HTMLElement,
  offset: number,
) => {
  const targetTop =
    targetElement.getBoundingClientRect().top + window.scrollY + offset;

  window.scrollTo({
    top: targetTop,
    behavior: "auto",
  });
};

export const createSamePageAnchorClickHandler = (lenis: Lenis) => {
  return (event: MouseEvent) => {
    if (!isPrimaryPointerClick(event)) return;

    const eventTarget = event.target;
    if (!(eventTarget instanceof Element)) return;

    const anchor = eventTarget.closest<HTMLAnchorElement>("a[href]");
    if (!anchor) return;

    const targetId = getSamePageHashFromAnchor(anchor);
    if (!targetId) return;

    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    event.preventDefault();

    const offset = getStickyHeaderOffset();
    const prefersReducedMotion =
      window.matchMedia(REDUCED_MOTION_QUERY).matches;

    if (prefersReducedMotion) {
      scrollWithReducedMotion(targetElement, offset);
    } else {
      lenis.scrollTo(targetElement, { offset });
    }

    clearHashFromCurrentUrl();
  };
};
