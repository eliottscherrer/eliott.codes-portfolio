export const AnimatedLinkedin = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-4"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle
      cx="4"
      cy="4"
      r="2"
      className="origin-center transition-all duration-500 group-hover:rotate-[360deg]"
    />
  </svg>
);

export const AnimatedGithub = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-4"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path
      d="M8.7 18c-4.51 2-5-2-7-2"
      className="github-tail origin-[9px_18px]"
      onAnimationEnd={(e) => {
        if (e.animationName === "wag") {
          (e.currentTarget as SVGPathElement).classList.remove("is-wagging");
        }
      }}
    />
  </svg>
);

export const AnimatedMail = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-4 overflow-visible"
  >
    <path d="M22 6V18A2 2 0 0 1 20 20H4A2 2 0 0 1 2 18V6" />
    <path
      d="M22 6A2 2 0 0 0 20 4H4A2 2 0 0 0 2 6"
      className="transition-opacity duration-300 ease-out group-hover:opacity-0"
    />
    <defs>
      <clipPath id="mail-doc-clip">
        <path d="M0 0h24v8l-12 5.7L0 8Z" />
      </clipPath>
    </defs>
    <g clipPath="url(#mail-doc-clip)">
      <g className="opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:-translate-y-0.25">
        <path d="M6 14V7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v7" />
      </g>
    </g>
    <path
      d="M22 6V4 M2 6V4"
      className="opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
    />
    <path
      d="M22 7 L12 12.7 L2 7"
      className="[transform-box:view-box] [transform-origin:12px_5px] [transform:rotateX(0deg)] transition-transform duration-300 ease-out group-hover:[transform:rotateX(180deg)]"
    />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export const triggerGithubWag = (target: EventTarget & Element) => {
  // If target contains the SVG (like a button wrapping the icon)
  let tail = target.querySelector<SVGPathElement>(".github-tail");
  // If the target is the SVG itself or inside it
  if (!tail) {
    const parentSvg = target.closest("svg");
    tail = parentSvg?.querySelector(".github-tail") || null;
  }
  // Fallback to searching the whole document if we are given something else, but constrained wrapper preferred
  if (!tail) tail = document.querySelector(".github-tail");

  if (tail && !tail.classList.contains("is-wagging")) {
    tail.classList.add("is-wagging");
  }
};
