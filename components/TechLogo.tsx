import { ReactNode, cloneElement, isValidElement, SVGProps, ReactElement, useRef } from 'react';

interface TechLogoProps {
  icon: ReactNode;
  label?: string;
  brandColor?: string;
}

export default function TechLogo({ icon, label, brandColor }: TechLogoProps) {
  const iconRef = useRef<SVGSVGElement | null>(null);
  
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
    'MongoDB': '#47A248',
    'Redis': '#DC382D',
    'Docker': '#2496ED',
  };

  const color = brandColor || (label && brandColors[label]);
  
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
    
    enhancedIcon = cloneElement(iconElement, {
      ref: iconRef,
      className: `${existingClassName} transition-colors duration-300`.trim(),
      style: existingStyle,
    });
  }

  if (label) {
    return (
      <div 
        className="flex gap-2 items-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {enhancedIcon}
        <span className="text-xl">{label}</span>
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
