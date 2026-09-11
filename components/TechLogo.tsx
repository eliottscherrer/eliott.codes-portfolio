"use client";

import { ReactNode, cloneElement, isValidElement, ReactElement, CSSProperties, useSyncExternalStore } from 'react';
import { useTheme } from '@/components/theme-provider';
import { cn } from '@/lib/utils';

interface TechLogoProps {
  icon: ReactNode;
  label?: string;
  brandColor?: string;
  size?: 'sm' | 'md' | 'lg';
  labelSize?: 'xs' | 'sm' | 'md' | 'lg';
  forcedTheme?: 'light' | 'dark';
  className?: string;
}

type Rgb = [number, number, number];

const MIN_CONTRAST = 4.5;

const hexToRgb = (hex: string): Rgb | null => {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  if (h.length !== 6) return null;
  return [0, 2, 4].map(i => parseInt(h.substring(i, i + 2), 16)) as Rgb;
};

const channel = (v: number) => {
  const c = v / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

const luminance = ([r, g, b]: Rgb) => 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);

const contrast = (a: number, b: number) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

/**
 * Nudges a brand colour toward the theme's foreground until it reaches WCAG 4.5:1
 * against the theme's card surface, keeping the hue. Achromatic colours (black
 * logos like Express/Next.js) return undefined so the icon inherits the text colour.
 */
const readableColor = (hex: string | undefined, theme: string | undefined) => {
  if (!hex || !theme) return hex;
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  if (Math.max(...rgb) - Math.min(...rgb) < 16) return undefined;

  const dark = theme === 'dark';
  const surface = luminance(dark ? [24, 24, 27] : [252, 252, 252]);
  const toward = dark ? 255 : 0;

  for (let t = 0; t <= 1.0001; t += 0.05) {
    const mixed = rgb.map(v => Math.round(v + (toward - v) * t)) as Rgb;
    if (contrast(luminance(mixed), surface) >= MIN_CONTRAST) {
      return '#' + mixed.map(v => v.toString(16).padStart(2, '0')).join('');
    }
  }
  return undefined;
};

/**
 * Lights up (label → foreground, icon → brand colour) when hovered, or when any
 * ancestor carrying the `group/tech` class is hovered (e.g. a whole project card).
 */
export default function TechLogo({ icon, label, brandColor, size, labelSize, forcedTheme, className }: TechLogoProps) {
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  // Brand colors from Simple Icons (https://simpleicons.org/)
  const brandColors: Record<string, string> = {
    'HTML': '#E34F26',
    'CSS': '#1572B6',
    'JavaScript': '#F7DF1E',
    'Vue.js': '#4FC08D',
    'C# .NET': '#512BD4',
    'Figma': '#F24E1E',
    'Node.js': '#339933',
    'AdonisJS': '#5A45FF',
    'MariaDB': '#003545',
    'MySQL': '#f29111',
    'MongoDB': '#47A248',
    'Redis': '#DC382D',
    'Docker': '#2496ED',
    'Docker Swarm': '#2496ED',
    'WordPress': '#21759B',
    'Express.js': '#000000',
    'Nginx': '#009639',
    'Cloudinary': '#FF5C00',
    'C# .NET Blazor': '#512BD4',
    'ApexCharts': '#5a9f68',
    'TokenInsight': '#5334ab',
    'React': '#61DAFB',
    'Next.js': '#000000',
  };

  const originalColor = brandColor || (label && brandColors[label]);

  const color = mounted ? readableColor(originalColor, forcedTheme || resolvedTheme) : originalColor;

  // Clone the icon element and add transition class
  let enhancedIcon = icon;

  if (isValidElement(icon)) {
    const iconElement = icon as ReactElement<{
      className?: string;
      style?: CSSProperties;
    }>;

    const sizeClass = size === 'sm' ? 'size-3' : size === 'md' ? 'size-4' : size === 'lg' ? 'size-5' : '';

    enhancedIcon = cloneElement(iconElement, {
      className: cn(
        iconElement.props.className,
        sizeClass,
        'transition-colors duration-300',
        color && 'group-hover/tech:text-[var(--tech-color)]'
      ),
      style: {
        ...iconElement.props.style,
        ...(color ? ({ '--tech-color': color } as CSSProperties) : {}),
      },
    });
  }

  const labelClass = labelSize
    ? labelSize === 'xs'
      ? 'text-xs'
      : labelSize === 'sm'
      ? 'text-sm'
      : labelSize === 'lg'
      ? 'text-2xl'
      : 'text-base'
    : size === 'sm'
    ? 'text-sm'
    : 'text-xl';

  const rootClass = cn(
    'group/tech flex items-center transition-colors duration-300 hover:text-foreground group-hover/tech:text-foreground',
    size === 'sm' ? 'gap-1.5' : 'gap-2',
    className
  );

  if (label) {
    return (
      <div className={rootClass}>
        {enhancedIcon}
        <span className={labelClass}>{label}</span>
      </div>
    );
  }

  return <div className={rootClass}>{enhancedIcon}</div>;
}
