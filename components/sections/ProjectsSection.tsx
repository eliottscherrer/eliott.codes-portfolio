"use client";

import { useMemo } from "react";
import ProjectCard from "@/components/ProjectCard";
import SectionAnchorHeading from "@/components/ui/section-anchor-heading";
import { getProjects } from "@/lib/projects-data";
import { useTranslations } from "next-intl";

export default function ProjectsSection() {
  const t = useTranslations();
  const projects = useMemo(() => getProjects(t), [t]);

  return (
    <section id="projects" className="space-y-6 sm:space-y-8 ds-anchor-target">
      <SectionAnchorHeading
        anchorId="projects"
        description={t("Projects.subtitle")}
      >
        {t("Projects.title")}
      </SectionAnchorHeading>
      <div className="group/grid grid gap-5 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
}
