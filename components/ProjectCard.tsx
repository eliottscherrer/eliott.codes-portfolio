import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type StackItem = { node?: React.ReactNode; label?: string };

interface ProjectCardProps {
  title: string;
  description: string;
  link: string;
  cover?: string | null;
  stack?: Array<StackItem | string>;
}

export default function ProjectCard({ title, description, link, cover, stack = [] }: ProjectCardProps) {
  const projectSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const projectUrl = `/projects/${projectSlug}`;

  return (
    <SpotlightCard
      className="flex flex-col w-full p-0 bg-card/30 hover:bg-card/50 transition-colors border-border overflow-hidden group"
      spotlightColor="rgba(14, 100, 180, 0.1)"
    >
      {/* Image Section */}
      <div className="relative w-full h-64 md:h-96 overflow-hidden shrink-0">
        {cover ? (
          <>
            <Image
              src={cover}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/5 to-primary/10 border-b border-border/50" />
        )}

        {/* Tech Stack - Bottom Left of Image */}
        {stack.length > 0 && (
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 z-10">
            {stack.map((item, i) => {
               if (typeof item === 'object' && item.node) {
                 return (
                    <div key={i} className="bg-black/60 backdrop-blur-md border border-white/10 rounded-md px-2.5 py-1.5 text-xs text-white flex items-center gap-1.5 shadow-sm transition-all duration-300 hover:bg-white hover:text-black hover:border-white/20">
                        {item.node}
                    </div>
                 );
               }
               const label = typeof item === 'string' ? item : item.label;
               return (
                 <Badge key={i} variant="secondary" className="bg-black/60 backdrop-blur-md border-white/10 text-white shadow-sm transition-all duration-300 hover:bg-white hover:text-black hover:border-white/20">
                   {label}
                 </Badge>
               );
            })}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-6 md:p-8">
        <div className="flex-1">
          <h3 className="text-2xl font-bold tracking-tight mb-3 group-hover:text-primary transition-colors">{title}</h3>
          
          <p className="text-muted-foreground text-base leading-relaxed">
            {description}
          </p>
        </div>

        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out">
          <div className="overflow-hidden">
            <div className="pt-6">
              <Button asChild className="w-full md:w-auto group/btn relative overflow-hidden opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75" variant="outline" size="lg">
                  <Link href={projectUrl}>
                    <span className="relative z-10 flex items-center gap-2">
                      More information
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-primary/10 translate-y-full transition-transform duration-300 group-hover/btn:translate-y-0" />
                  </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}
