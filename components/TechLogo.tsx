"use client";

import { ReactNode, cloneElement, isValidElement, SVGProps, ReactElement, useRef, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

interface TechLogoProps {
  icon: ReactNode;
  label?: string;
  brandColor?: string;
  size?: 'sm' | 'md' | 'lg';
  labelSize?: 'sm' | 'md' | 'lg';
  forcedTheme?: 'light' | 'dark';
}

export default function TechLogo({ icon, label, brandColor, size, labelSize, forcedTheme }: TechLogoProps) {
  const iconRef = useRef<SVGSVGElement | null>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
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

  const getAdjustedColor = (c: string | undefined, theme: string | undefined) => {
    if (!c || !theme) return c;
    
    let hex = c.replace('#', '');
    
    if (hex.length === 3) {
      hex = hex.split('').map(char => char + char).join('');
    }

    if (hex.length !== 6) return c;
    
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    if (theme === 'dark') {
      // If color is too dark on dark background, make it white
      if (luminance < 0.2) return '#FFFFFF';
    } else if (theme === 'light') {
      // If color is too light on light background, make it black
      if (luminance > 0.85) return '#000000';
    }
    
    return c;
  };

  const color = mounted ? getAdjustedColor(originalColor, forcedTheme || resolvedTheme) : originalColor;
  
  const handleMouseEnter = () => {
    if (color && iconRef.current) {
      iconRef.current.style.color = color;
    }
  };

  const handleMouseLeave = () => {
    if (iconRef.current) {
      iconRef.current.style.color = '';
    }
  };
  
  // Clone the icon element and add ref + transition class
  let enhancedIcon = icon;
  
  if (isValidElement(icon)) {
    const iconElement = icon as ReactElement<any>;
    const existingClassName = iconElement.props.className || '';
    const existingStyle = iconElement.props.style || {};
    
      const sizeClass = size === 'sm' ? 'size-3' : size === 'md' ? 'size-4' : size === 'lg' ? 'size-5' : '';

      enhancedIcon = cloneElement(iconElement, {
        ref: iconRef,
        className: `${existingClassName} ${sizeClass} transition-colors duration-300`.trim(),
        style: existingStyle,
      });
  }

  const labelClass = labelSize
    ? labelSize === 'sm'
      ? 'text-sm'
      : labelSize === 'lg'
      ? 'text-2xl'
      : 'text-base'
    : size === 'sm'
    ? 'text-sm'
    : 'text-xl';

  if (label) {
    return (
      <div 
        className="flex gap-2 items-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {enhancedIcon}
        <span className={labelClass}>{label}</span>
      </div>
    );
  }
  
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {enhancedIcon}
    </div>
  );
}
