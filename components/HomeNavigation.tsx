"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion, useSpring } from "motion/react";

import LanguageSwitcher from "@/components/LanguageSwitcher";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Button } from "@/components/ui/button";

const SECTION_IDS = ["experience", "projects", "contact"] as const;
type SectionId = (typeof SECTION_IDS)[number];

// Scroll events keep arriving while Lenis animates; this is how long after the last one
// a click-triggered scroll counts as finished.
const SCROLL_SETTLE_MS = 150;
// Glide between links: firm, one small overshoot.
const GLIDE_SPRING = { stiffness: 380, damping: 32 };
// Press: deliberately underdamped so the release pops back with a bounce.
const PRESS_SPRING = { stiffness: 340, damping: 16 };
// Held press squashes the pill: compress on Y, widen a touch on X.
const HELD_SQUASH = { x: 1.04, y: 0.88 };
// Presses shorter than this read as a tap: one kick instead of a held squash.
const HOLD_MS = 120;
const LABEL_POP = {
  keyframes: [{ scale: 1 }, { scale: 1.06 }, { scale: 1 }],
  ms: 240,
};

export default function HomeNavigation() {
  const t = useTranslations();
  const tc = useTranslations("Common");
  const locale = useLocale();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  // The pill follows the hovered (or focused) link and falls back to the active section.
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const highlighted = hoveredSection ?? activeSection;
  // Clicking a link pins the active section to its target until the scroll settles, so the
  // pill doesn't visit every section the page scrolls past on the way.
  const pinRef = useRef<(id: SectionId) => void>(() => {});

  // One pill, moved and resized to the highlighted link. Animating real x/width (not a
  // layout projection) keeps the corners crisp and can't flicker between two elements.
  const linkRefs = useRef<Partial<Record<SectionId, HTMLAnchorElement>>>({});
  const pillX = useSpring(0, GLIDE_SPRING);
  const pillWidth = useSpring(0, GLIDE_SPRING);
  const pillOpacity = useSpring(0, { stiffness: 400, damping: 40 });
  const pillScaleX = useSpring(1, PRESS_SPRING);
  const pillScaleY = useSpring(1, PRESS_SPRING);
  const pressedAt = useRef(0);

  useLayoutEffect(() => {
    const link = highlighted
      ? linkRefs.current[highlighted as SectionId]
      : undefined;
    if (!link) {
      // Retract: fade out while collapsing a little.
      pillOpacity.set(0);
      pillScaleY.set(0.8);
      return;
    }
    // Appear in place (with a small pop) when the pill was hidden; glide when visible.
    const wasHidden = pillOpacity.get() < 0.01;
    (wasHidden ? pillX.jump : pillX.set).call(pillX, link.offsetLeft);
    (wasHidden ? pillWidth.jump : pillWidth.set).call(
      pillWidth,
      link.offsetWidth,
    );
    if (wasHidden) pillScaleY.jump(0.8);
    pillScaleY.set(1);
    pillOpacity.set(1);
  }, [highlighted, locale, pillX, pillWidth, pillOpacity, pillScaleY]);

  const squash = () => {
    pillScaleX.set(HELD_SQUASH.x);
    pillScaleY.set(HELD_SQUASH.y);
  };
  const release = () => {
    pillScaleX.set(1);
    pillScaleY.set(1);
  };
  // A tap never had time to settle into the squash, so start it from there and let it pop.
  const kick = () => {
    pillScaleX.jump(HELD_SQUASH.x);
    pillScaleY.jump(HELD_SQUASH.y);
    release();
  };
  const popLabel = (link: HTMLAnchorElement) => {
    link.querySelector("span")?.animate(LABEL_POP.keyframes, {
      duration: LABEL_POP.ms,
      easing: "ease-out",
    });
  };

  const onPointerDown = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.button !== 0) return;
    pressedAt.current = performance.now();
    squash();
  };
  const onPointerUp = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.button !== 0) return;
    if (performance.now() - pressedAt.current < HOLD_MS) kick();
    else release();
    popLabel(event.currentTarget);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLAnchorElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      kick();
      popLabel(event.currentTarget);
    }
  };

  useEffect(() => {
    const sections = SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    let frame = 0;
    let pinned: SectionId | null = null;
    let settleTimer = 0;

    const update = () => {
      frame = 0;
      if (pinned) {
        setActiveSection(pinned);
        return;
      }
      // A section becomes active once its top reaches where anchor links scroll it to
      // (its scroll-margin-top), with a little slack so a click always lands "inside".
      const line =
        Number.parseFloat(getComputedStyle(sections[0]).scrollMarginTop) + 24;
      const current = sections
        .filter((el) => el.getBoundingClientRect().top <= line)
        .at(-1);
      // Contact is short and may never reach the line, so the page bottom counts as contact.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      setActiveSection(atBottom ? "contact" : (current?.id ?? null));
    };
    const releasePin = () => {
      pinned = null;
      update();
    };
    const armSettle = () => {
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(releasePin, SCROLL_SETTLE_MS);
    };
    const onScroll = () => {
      if (pinned) armSettle();
      if (!frame) frame = requestAnimationFrame(update);
    };
    pinRef.current = (id) => {
      pinned = id;
      setActiveSection(id);
      armSettle();
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settleTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const navItems: { id: SectionId; label: string }[] = [
    { id: "experience", label: t("Navigation.journey") },
    { id: "projects", label: t("Navigation.projects") },
  ];

  const switcherControlClass =
    "ds-focus-ring border-0 !border-transparent rounded-md text-foreground !bg-transparent !backdrop-blur-none shadow-none hover:!bg-black/5 hover:text-foreground dark:hover:!bg-white/10 disabled:opacity-100 disabled:pointer-events-none";

  return (
    <header className="sticky top-3 z-30 mb-10 sm:mb-12 md:mb-16 -mx-2 sm:-mx-3 md:-mx-4 lg:-mx-10 isolate">
      <div className="ds-surface-card rounded-xl md:rounded-2xl p-2 md:p-2.5 backdrop-blur-xl transform-gpu">
        <div className="flex items-center justify-between gap-2 sm:gap-3 md:gap-4">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="text-sm md:text-base font-medium ml-3 tracking-tight ds-focus-ring rounded-sm"
            >
              eliott.codes
            </Link>
          </div>
          <div className="flex gap-1.5 sm:gap-2 md:gap-2.5 items-center">
            <AnimatedThemeToggler
              aria-label={tc("toggleTheme")}
              className={`${switcherControlClass} size-9 md:size-10 flex items-center justify-center transition-colors [&_svg]:h-4 [&_svg]:w-4`}
            />
            <LanguageSwitcher
              className={`${switcherControlClass} size-9 md:size-10`}
            />
            <div className="relative hidden sm:flex items-center gap-2 md:gap-2.5">
              <motion.span
                aria-hidden="true"
                style={{
                  x: pillX,
                  width: pillWidth,
                  opacity: pillOpacity,
                  scaleX: pillScaleX,
                  scaleY: pillScaleY,
                }}
                className="absolute inset-y-0 left-0 rounded-md bg-black/5 dark:bg-white/10"
              />
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  asChild
                  // The sliding pill is the hover state, so no static hover background here.
                  className="px-3.5 md:px-4 h-9 md:h-10 border-0 bg-transparent hover:!bg-transparent dark:hover:!bg-transparent hover:text-foreground"
                >
                  <Link
                    ref={(el) => {
                      linkRefs.current[item.id] = el ?? undefined;
                    }}
                    href={`#${item.id}`}
                    aria-current={
                      activeSection === item.id ? "location" : undefined
                    }
                    className="relative text-foreground"
                    onClick={() => pinRef.current(item.id)}
                    onMouseEnter={() => setHoveredSection(item.id)}
                    onMouseLeave={() => setHoveredSection(null)}
                    onFocus={() => setHoveredSection(item.id)}
                    onBlur={() => setHoveredSection(null)}
                    onPointerDown={onPointerDown}
                    onPointerUp={onPointerUp}
                    onPointerCancel={release}
                    onKeyDown={onKeyDown}
                  >
                    <span className="inline-block">{item.label}</span>
                  </Link>
                </Button>
              ))}
            </div>
            <Button
              asChild
              className="text-sm md:text-[0.95rem] px-4 md:px-5 h-9 md:h-10"
            >
              <Link
                href="#contact"
                aria-current={
                  activeSection === "contact" ? "location" : undefined
                }
                onClick={() => pinRef.current("contact")}
              >
                {t("Navigation.contact")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
