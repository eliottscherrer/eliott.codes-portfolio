"use client"

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

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
    </main>
  );
}


