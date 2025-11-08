"use client"

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Mail, Github, Linkedin, MapPin } from "lucide-react";

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
    </main>
  );
}


