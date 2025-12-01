import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import { Badge } from '@/components/ui/badge';
import { useTranslations } from 'next-intl';

type StackItem = { node?: React.ReactNode; label?: string };

interface ProjectCardProps {
  title: string;
  description: string;
  link: string;
  cover?: string | null;
  stack?: Array<StackItem | string>;
}

export default function ProjectCard({ title, description, link, cover, stack = [] }: ProjectCardProps) {
  const t = useTranslations('Projects');
  const isExternal = link.startsWith('http');

  return (
    <Link
      href={link}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="block w-full group outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
    >
      <SpotlightCard
        className="flex flex-col w-full h-full p-0 bg-card/40 hover:bg-card/60 transition-all duration-500 border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 overflow-hidden"
        spotlightColor="rgba(14, 100, 180, 0.15)"
      >
        {/* Image Section */}
        <div className="relative w-full h-64 md:h-96 overflow-hidden shrink-0">
          {cover ? (
            <>
              <Image
                src={cover}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-60" />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/5 to-primary/10 border-b border-black/10 dark:border-white/10" />
          )}

          {/* Tech Stack */}
          {stack.length > 0 && (
            <div className="absolute bottom-3 left-4 right-4 flex flex-wrap gap-2 z-10">
              {stack.map((item, i) => {
                if (typeof item === 'object' && item.node) {
                  return (
                    <div key={i} className="bg-black/40 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-full px-3 py-2 text-xs text-white/90 flex items-center gap-1.5 shadow-sm transition-all duration-300 group-hover:bg-black/60 group-hover:border-black/10 dark:group-hover:border-white/20">
                      {item.node}
                    </div>
                  );
                }
                const label = typeof item === 'string' ? item : item.label;
                return (
                  <Badge key={i} variant="secondary" className="bg-black/40 backdrop-blur-md border border-black/10 dark:border-white/10 text-white/90 rounded-full px-3 py-1 shadow-sm transition-all duration-300 group-hover:bg-black/60 group-hover:border-black/10 dark:group-hover:border-white/20">
                    {label}
                  </Badge>
                );
              })}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-1 p-6 relative">
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                {title}
              </h3>
            </div>
            
            <p className="text-muted-foreground text-base leading-relaxed mb-6 line-clamp-3">
              {description}
            </p>
          </div>

          {/* CTA Button */}
          <div className="mt-auto">
            <div className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary/10 text-primary font-medium text-sm border border-primary/20 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(14,100,180,0.3)] w-full sm:w-auto">
              {t('viewProject')}
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </SpotlightCard>
    </Link>
  );
}
