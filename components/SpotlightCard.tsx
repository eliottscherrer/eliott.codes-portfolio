import React, { useRef, useState } from "react";

import { cn } from "@/lib/utils";

// One pixel band hugging the card's edge, used for both the border and its glow.
// The mask stays in a style object: tailwind's arbitrary values mangle the commas.
const RING = "pointer-events-none absolute inset-0 rounded-[inherit] p-px";
const RING_MASK: React.CSSProperties = {
  WebkitMask:
    "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
  WebkitMaskComposite: "xor",
  mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
  maskComposite: "exclude",
};

interface Position {
  x: number;
  y: number;
}

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.25)",
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState<number>(0);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!divRef.current || isFocused) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(0.6);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(0.6);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group/spot relative overflow-hidden rounded-2xl bg-[var(--surface-glass)] backdrop-blur-xl transform-gpu transition-colors duration-500 hover:bg-[var(--surface-elevated)]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      {/* The border is drawn here rather than with a real one, so the glow can sit in the
          same one pixel band. Two adjacent rings would antialias into a doubled edge. */}
      <div
        className={cn(
          RING,
          "bg-[var(--surface-border)] transition-colors duration-500 group-hover/spot:bg-foreground/20",
        )}
        style={RING_MASK}
      />
      <div
        className={cn(
          RING,
          "opacity-0 transition-opacity duration-500 ease-in-out",
        )}
        style={{
          ...RING_MASK,
          opacity,
          background: `radial-gradient(180px circle at ${position.x}px ${position.y}px, var(--spotlight-border), transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
};

export default SpotlightCard;
