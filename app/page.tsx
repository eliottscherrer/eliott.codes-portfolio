"use client"

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Mail, Github, Linkedin, MapPin } from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";

const projects = [
  {
    title: "Portfolio Website",
    description: "Personal site built with Next.js and shadcn/ui.",
    link: "#",
  },
  {
    title: "UI Experiments",
    description: "Small UI prototypes and animations.",
    link: "#",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen mx-auto max-w-4xl px-6 py-16">
      {/* Navigation */}
      <header className="flex items-center justify-between mb-16">
        <div className="flex items-center gap-2">
          <a href="/" className="text-sm font-medium">eliott.codes</a>
        </div>
        <div className="flex gap-3">
          <ThemeToggle />
          <Button variant="ghost" asChild>
            <a href="#projects">Projects</a>
          </Button>
          <Button asChild>
            <a href="#contact">Contact</a>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-bold">👋 Eliott Scherrer</h1>
          {/* Social Links */}
          <div className="flex flex-row gap-3">
            <Button variant="secondary" size="icon" aria-label="LinkedIn" asChild>
              <a href="https://www.linkedin.com/in/eliottscherrer/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="size-4" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
            <Button variant="secondary" size="icon" aria-label="GitHub" asChild>
              <a href="https://github.com/eliottscherrer" target="_blank" rel="noopener noreferrer">
                <Github className="size-4" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button variant="secondary" size="icon" aria-label="Email" asChild>
              <a href="mailto:contact@eliott.codes">
                <Mail className="size-4" />
                <span className="sr-only">Email</span>
              </a>
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground max-w-2xl flex items-center gap-1.5">
          <MapPin className="size-4" />
          Lausanne, Switzerland
        </p>
        <p className="max-w-2xl text-lg leading-relaxed">
          Student at ETML studying software and web development, with an interest in cybersecurity.
        </p>
        <div className="flex gap-4">
          <Button asChild size="lg">
            <a href="#projects">View projects</a>
          </Button>
          <Button variant="outline" asChild size="lg">
            <a href="#contact">Get in touch</a>
          </Button>
        </div>
      </section>

      <Separator className="my-16" />

      {/* Projects Section */}
      <section id="projects" className="space-y-8">
        <h2 className="text-3xl font-semibold">Projects</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <SpotlightCard 
              key={project.title} 
              className="flex flex-col justify-between min-h-[200px]"
              spotlightColor="rgba(164, 211, 255, 0.15)"
            >
              <div>
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
              </div>
              <div className="space-y-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                <Button variant="ghost" className="px-0" asChild>
                  <a href={project.link}>View →</a>
                </Button>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>
    </main>
  );
}


