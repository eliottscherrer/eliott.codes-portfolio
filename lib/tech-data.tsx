import TechLogo from "@/components/TechLogo";
import {
  SiHtml5,
  SiNodedotjs,
  SiVuedotjs,
  SiMariadb,
  SiMongodb,
  SiRedis,
  SiFigma,
  SiDocker,
  SiNextdotjs,
  SiReact,
} from "react-icons/si";
import { FaCss3Alt } from "react-icons/fa6";

import { DiDotnet } from "react-icons/di";

export const frontendTech = [
  {
    node: <TechLogo icon={<SiHtml5 />} label="HTML" />,
    title: "HTML5",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    node: <TechLogo icon={<FaCss3Alt />} label="CSS" />,
    title: "CSS3",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    node: <TechLogo icon={<SiReact />} label="React" />,
    title: "React",
    href: "https://reactjs.org",
  },
  {
    node: <TechLogo icon={<SiVuedotjs />} label="Vue.js" />,
    title: "Vue.js",
    href: "https://vuejs.org",
  },
  {
    node: <TechLogo icon={<DiDotnet />} label="C# .NET" />,
    title: "C# .NET",
    href: "https://docs.microsoft.com/en-us/dotnet/csharp/",
  },
  {
    node: <TechLogo icon={<SiNextdotjs />} label="Next.js" />,
    title: "Next.js",
    href: "https://nextjs.org",
  },
];

export const backendTech = [
  {
    node: <TechLogo icon={<SiNodedotjs />} label="Node.js" />,
    title: "Node.js",
    href: "https://nodejs.org",
  },
  {
    node: <TechLogo icon={<SiMariadb />} label="MariaDB" />,
    title: "MariaDB",
    href: "https://mariadb.org",
  },
  {
    node: <TechLogo icon={<SiMongodb />} label="MongoDB" />,
    title: "MongoDB",
    href: "https://www.mongodb.com",
  },
  {
    node: <TechLogo icon={<SiRedis />} label="Redis" />,
    title: "Redis",
    href: "https://redis.io",
  },
  {
    node: <TechLogo icon={<SiDocker />} label="Docker" />,
    title: "Docker",
    href: "https://www.docker.com",
  },
  {
    node: <TechLogo icon={<SiFigma />} label="Figma" />,
    title: "Figma",
    href: "https://www.figma.com",
  },
];
