"use client"

import { useMemo } from "react";
import ProjectCard from '@/components/ProjectCard';
import { getProjects } from '@/lib/projects-data';
import { useTranslations } from "next-intl";

export default function ProjectsSection() {
  const t = useTranslations();
  const projects = useMemo(() => getProjects(t), [t]);

  return (
    <section id="projects" className="space-y-6 sm:space-y-8">
      <h2 className="ds-section-title">{t("Projects.title")}</h2>
      <div className="flex flex-col gap-8">
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            {...project}
          />
        ))}
      </div>
    </section>
  );
}
