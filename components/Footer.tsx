"use client"

import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto mb-14">
      <Separator className="mb-8" />
      
      <div className="max-w-4xl mx-auto px-6 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">eliott.codes</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Building digital experiences with passion and precision.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <a 
                href="#projects" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
              >
                Projects
              </a>
              <a 
                href="#contact" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
              >
                Contact
              </a>
              <a 
                href="mailto:contact@eliott.codes" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
              >
                Email
              </a>
            </nav>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Connect</h4>
            <div className="flex gap-2">
              <Button 
                variant="secondary" 
                size="icon" 
                aria-label="GitHub"
                className="bg-background/10 dark:bg-input/30 hover:dark:bg-input/50 backdrop-blur-sm border !border-border dark:!border-input"
                asChild
              >
                <a href="https://github.com/eliottscherrer" target="_blank" rel="noopener noreferrer">
                  <Github className="size-4" />
                </a>
              </Button>
              <Button 
                variant="secondary" 
                size="icon" 
                aria-label="LinkedIn"
                className="bg-background/10 dark:bg-input/30 hover:dark:bg-input/50 backdrop-blur-sm border !border-border dark:!border-input"
                asChild
              >
                <a href="https://www.linkedin.com/in/eliottscherrer/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="size-4" />
                </a>
              </Button>
              <Button 
                variant="secondary" 
                size="icon" 
                aria-label="Email"
                className="bg-background/10 dark:bg-input/30 hover:dark:bg-input/50 backdrop-blur-sm border !border-border dark:!border-input"
                asChild
              >
                <a href="mailto:contact@eliott.codes">
                  <Mail className="size-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p className="flex items-center gap-1.5">
              © {currentYear} Eliott Scherrer. All rights reserved.
            </p>
            <p className="flex items-center gap-1.5">
              Made with <Heart className="size-3.5 fill-current text-blue-500" /> in Switzerland
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
