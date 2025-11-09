import { ReactNode } from 'react';

interface TechLogoProps {
  icon: ReactNode;
  label?: string;
}

export default function TechLogo({ icon, label }: TechLogoProps) {
  if (label) {
    return (
      <div className="flex gap-2 items-center">
        {icon}
        <span className="text-xl">{label}</span>
      </div>
    );
  }
  return <>{icon}</>;
}
