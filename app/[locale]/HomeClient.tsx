"use client"

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Github, Linkedin, MapPin, Coins, ChartCandlestick } from "lucide-react";
import SplitText from "@/components/SplitText";
import Plasma from "@/components/Plasma";
import GradualBlur from "@/components/GradualBlur";
import { useEffect, useRef } from "react";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import Footer from "@/components/Footer"

import LogoLoop from '@/components/LogoLoop';
import TechLogo from '@/components/TechLogo';
import ProjectCard from '@/components/ProjectCard';
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiNodedotjs,
  SiVuedotjs,
  SiAdonisjs,
  SiMariadb,
  SiMongodb,
  SiRedis,
  SiFigma,
  SiDocker,
  SiExpress,
  SiWordpress,
  SiNginx,
  SiCloudinary,
  SiBlazor,
  SiMysql,
  SiNextdotjs,
  SiReact,
} from 'react-icons/si';
import { DiDotnet } from "react-icons/di";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";

// Frontend & Languages
const frontendTech = [
  { node: <TechLogo icon={<SiHtml5 />} label="HTML" />, title: "HTML5", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { node: <TechLogo icon={<SiCss3 />} label="CSS" />, title: "CSS3", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { node: <TechLogo icon={<SiReact />} label="React" />, title: "React", href: "https://reactjs.org" },
  { node: <TechLogo icon={<SiVuedotjs />} label="Vue.js" />, title: "Vue.js", href: "https://vuejs.org" },
  { node: <TechLogo icon={<DiDotnet />} label="C# .NET" />, title: "C# .NET", href: "https://docs.microsoft.com/en-us/dotnet/csharp/" },
  { node: <TechLogo icon={<SiNextdotjs />} label="Next.js" />, title: "Next.js", href: "https://nextjs.org" },
];

// Backend & Tools
const backendTech = [
  { node: <TechLogo icon={<SiNodedotjs />} label="Node.js" />, title: "Node.js", href: "https://nodejs.org" },
  { node: <TechLogo icon={<SiMariadb />} label="MariaDB" />, title: "MariaDB", href: "https://mariadb.org" },
  { node: <TechLogo icon={<SiMongodb />} label="MongoDB" />, title: "MongoDB", href: "https://www.mongodb.com" },
  { node: <TechLogo icon={<SiRedis />} label="Redis" />, title: "Redis", href: "https://redis.io" },
  { node: <TechLogo icon={<SiDocker />} label="Docker" />, title: "Docker", href: "https://www.docker.com" },
  { node: <TechLogo icon={<SiFigma />} label="Figma" />, title: "Figma", href: "https://www.figma.com" },
];

export default function HomeClient({ locale }: { locale?: string }) {
  const t = useTranslations();
  const waveRef = useRef<HTMLSpanElement | null>(null);

  // Trigger initial wave once on mount
  useEffect(() => {
    const el = waveRef.current;
    if (el && !el.classList.contains("is-waving")) {
      el.classList.add("is-waving");
    }
  }, []);

  const projects = [
    {
      title: "PlotThoseLines",
      description: t("Projects.items.PlotThoseLines.description"),
      link: "https://github.com/eliottscherrer/PlotThoseLines",
      cover: "/projects/PlotThoseLines.webp",
      stack: [
        { node: <TechLogo icon={<SiBlazor />} label="C# .NET Blazor" size="lg" labelSize="sm" /> },
        { node: <TechLogo icon={<ChartCandlestick />} label="ApexCharts" size="lg" labelSize="sm" /> },
        { node: <TechLogo icon={<Coins />} label="TokenInsight" size="lg" labelSize="sm" /> },
      ],
    },
    {
      title: "PassionLecture - Frontend",
      description: t("Projects.items.PassionLectureFrontend.description"),
      link: "https://github.com/Eliott-Mathis/PassionLecture-Frontend",
      cover: "/projects/PassionLecture-Frontend.webp",
      stack: [
        { node: <TechLogo icon={<SiVuedotjs />} label="Vue.js" size="lg" labelSize="sm" /> },
        { node: <TechLogo icon={<SiExpress />} label="Express.js" size="lg" labelSize="sm" /> },
        { node: <TechLogo icon={<SiJavascript />} label="JavaScript" size="lg" labelSize="sm" /> },
      ],
    },
    {
      title: "DockerSwarm-Wordpress",
      description: t("Projects.items.DockerSwarmWordpress.description"),
      link: "https://github.com/eliottscherrer/DockerSwarm-Wordpress",
      cover: "/projects/DockerSwarm-Wordpress.webp",
      stack: [
        { node: <TechLogo icon={<SiDocker />} label="Docker Swarm" size="lg" labelSize="sm" /> },
        { node: <TechLogo icon={<SiWordpress />} label="WordPress" size="lg" labelSize="sm" /> },
        { node: <TechLogo icon={<SiMariadb />} label="MariaDB" size="lg" labelSize="sm" /> },
        { node: <TechLogo icon={<SiNginx />} label="Nginx" size="lg" labelSize="sm" /> },
      ],
    },
    {
      title: "PassionLecture - Backend",
      description: t("Projects.items.PassionLectureBackend.description"),
      link: "https://github.com/Eliott-Mathis/PassionLecture-Backend",
      cover: "/projects/PassionLecture-Backend.webp",
      stack: [
        { node: <TechLogo icon={<SiNodedotjs />} label="Node.js" size="lg" labelSize="sm" /> },
        { node: <TechLogo icon={<SiMysql />} label="MySQL" size="lg" labelSize="sm" /> },
        { node: <TechLogo icon={<SiDocker />} label="Docker" size="lg" labelSize="sm" /> },
        { node: <TechLogo icon={<SiCloudinary />} label="Cloudinary" size="lg" labelSize="sm" /> },
      ],
    },
  ];

  const age = new Date(Date.now() - new Date('2006-11-20').getTime()).getUTCFullYear() - 1970;

  return (
    <>
      {/* Background */}
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: -1 
      }}>
        { /* a4d3ff */}
        {<Plasma 
          color="#0e64b4" 
          speed={0.4}
          direction="forward"
          scale={2}
          opacity={0.3}
          mouseInteractive={false}
        />}
      </div>

      <main className="min-h-screen mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12 md:py-16 relative">
        {/* Navigation */}
        <header className="flex items-center justify-between mb-8 sm:mb-12 md:mb-16">
          <div className="flex items-center gap-2">
            <a href="/" className="text-sm font-medium">eliott.codes</a>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <AnimatedThemeToggler className="bg-transparent hover:bg-accent rounded-md w-8 h-8 flex items-center justify-center transition-colors [&_svg]:h-4 [&_svg]:w-4" />
            <LanguageSwitcher />
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <a href="#projects">{t("Navigation.projects")}</a>
            </Button>
            <Button asChild className="text-xs sm:text-sm px-3 sm:px-4">
              <a href="#contact">{t("Navigation.contact")}</a>
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
            { /* Animated Title */}
            <div id="title" className="flex items-baseline">
              <span
                className="text-4xl md:text-5xl font-bold wave-emoji"
                ref={waveRef}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  if (!el.classList.contains("is-waving")) {
                    el.classList.add("is-waving");
                  }
                }}
                onAnimationEnd={(e) => {
                  // Only react to the wave animation on this element
                  if (e.animationName === "wave") {
                    (e.currentTarget as HTMLElement).classList.remove("is-waving");
                  }
                }}
              >
                👋
              </span>
              <SplitText
                text=" Eliott Scherrer"
                className="text-4xl md:text-5xl font-bold"
                delay={70}
                duration={2}
                ease="elastic.out(1, 0.3)"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
              />
            </div>
            {/* Social Links */}
            <div className="flex flex-row gap-2 sm:gap-3">
              <Button variant="secondary" size="icon" aria-label="LinkedIn" className="bg-background/10 dark:bg-input/30 hover:dark:bg-input/50 backdrop-blur-sm border !border-border dark:!border-input" asChild>
                <a href="https://www.linkedin.com/in/eliottscherrer/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="size-4" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </Button>
              <Button variant="secondary" size="icon" aria-label="GitHub" className="bg-background/10 dark:bg-input/30 hover:dark:bg-input/50 backdrop-blur-sm border !border-border dark:!border-input" asChild>
                <a href="https://github.com/eliottscherrer" target="_blank" rel="noopener noreferrer">
                  <Github className="size-4" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
              <Button variant="secondary" size="icon" aria-label="Email" className="bg-background/10 dark:bg-input/30 hover:dark:bg-input/50 backdrop-blur-sm border !border-border dark:!border-input" asChild>
                <a href="mailto:contact@eliott.codes">
                  <Mail className="size-4" />
                  <span className="sr-only">Email</span>
                </a>
              </Button>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl flex items-center gap-1.5 text-sm sm:text-base">
            <MapPin className="size-4 flex-shrink-0" />
            {t("Hero.location")}
          </p>
          <p className="max-w-2xl text-base sm:text-lg leading-relaxed">
            {t("Hero.description", { age })}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href="#projects">{t("Hero.viewProjects")}</a>
            </Button>
            <Button variant="outline" asChild size="lg" className="w-full sm:w-auto">
              <a href="#contact">{t("Hero.getInTouch")}</a>
            </Button>
          </div>
        </section>

        <div className="mt-12 sm:mt-16 space-y-4 sm:space-y-6">
          { /* Fade out using alpha mask */ }
          <div style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black clamp(24px, 8%, 120px), black calc(100% - clamp(24px, 8%, 120px)), transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black clamp(24px, 8%, 120px), black calc(100% - clamp(24px, 8%, 120px)), transparent 100%)'
          }}>
            <LogoLoop
              logos={frontendTech}
              speed={30}
              direction="right"
              logoHeight={32}
              gap={40}
              pauseOnHover
              scaleOnHover
              ariaLabel="Frontend technologies"
            />
          </div>
          { /* Fade out using alpha mask */ }
          <div style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black clamp(24px, 8%, 120px), black calc(100% - clamp(24px, 8%, 120px)), transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black clamp(24px, 8%, 120px), black calc(100% - clamp(24px, 8%, 120px)), transparent 100%)'
          }}>
            <LogoLoop
              logos={backendTech}
              speed={30}
              direction="left"
              logoHeight={32}
              gap={40}
              pauseOnHover
              scaleOnHover
              ariaLabel="Backend technologies and tools"
            />
          </div>
        </div>

        <Separator className="my-12 sm:my-16" />

        {/* Projects Section */}
        <section id="projects" className="space-y-6 sm:space-y-8">
          <h2 className="text-2xl sm:text-3xl font-semibold">{t("Projects.title")}</h2>
          <div className="flex flex-col gap-8">
            {projects.map((project) => (
              <ProjectCard
                key={project.title}
                {...project}
              />
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="space-y-4 mt-20 sm:mt-24">
          <h2 className="text-2xl sm:text-3xl font-semibold">{t("Contact.title")}</h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            {t.rich("Contact.emailText", {
              email: (chunks) => <a className="underline" href="mailto:contact@eliott.codes">{chunks}</a>
            })}
          </p>
        </section>

        <GradualBlur
          target="page"
          position="bottom"
          height="6rem"
          strength={2}
          divCount={5}
          curve="bezier"
          exponential={true}
          opacity={1}
        />
      </main>

      <Footer />
    </>
  );
}

