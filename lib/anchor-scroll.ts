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

const clearHashFromCurrentUrl = () => {
  const cleanUrl = `${window.location.pathname}${window.location.search}`;
  window.history.replaceState(window.history.state, "", cleanUrl);
};

// The landing position comes from the target's `scroll-margin-top` in both branches:
// scrollIntoView honours it natively and Lenis subtracts it itself.
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

    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) {
      targetElement.scrollIntoView({ behavior: "auto" });
    } else {
      lenis.scrollTo(targetElement);
    }

    clearHashFromCurrentUrl();
  };
};
