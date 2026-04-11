import TechLogo from '@/components/TechLogo';
import { Coins, ChartCandlestick } from "lucide-react";
import {
  SiBlazor,
  SiVuedotjs,
  SiExpress,
  SiJavascript,
  SiDocker,
  SiWordpress,
  SiMariadb,
  SiNginx,
  SiNodedotjs,
  SiMysql,
  SiCloudinary,
} from 'react-icons/si';

export function getProjects(t: any) {
  return [
    {
      title: "PlotThoseLines",
      description: t("Projects.items.PlotThoseLines.description"),
      link: "https://github.com/eliottscherrer/PlotThoseLines",
      cover: "/projects/PlotThoseLines.webp",
      stack: [
        { node: <TechLogo icon={<SiBlazor />} label="C# .NET Blazor" size="lg" labelSize="sm" forcedTheme="dark" /> },
        { node: <TechLogo icon={<ChartCandlestick />} label="ApexCharts" size="lg" labelSize="sm" forcedTheme="dark" /> },
        { node: <TechLogo icon={<Coins />} label="TokenInsight" size="lg" labelSize="sm" forcedTheme="dark" /> },
      ],
    },
    {
      title: "PassionLecture - Frontend",
      description: t("Projects.items.PassionLectureFrontend.description"),
      link: "https://github.com/Eliott-Mathis/PassionLecture-Frontend",
      cover: "/projects/PassionLecture-Frontend.webp",
      stack: [
        { node: <TechLogo icon={<SiVuedotjs />} label="Vue.js" size="lg" labelSize="sm" forcedTheme="dark" /> },
        { node: <TechLogo icon={<SiExpress />} label="Express.js" size="lg" labelSize="sm" forcedTheme="dark" /> },
        { node: <TechLogo icon={<SiJavascript />} label="JavaScript" size="lg" labelSize="sm" forcedTheme="dark" /> },
      ],
    },
    {
      title: "DockerSwarm-Wordpress",
      description: t("Projects.items.DockerSwarmWordpress.description"),
      link: "https://github.com/eliottscherrer/DockerSwarm-Wordpress",
      cover: "/projects/DockerSwarm-Wordpress.webp",
      stack: [
        { node: <TechLogo icon={<SiDocker />} label="Docker Swarm" size="lg" labelSize="sm" forcedTheme="dark" /> },
        { node: <TechLogo icon={<SiWordpress />} label="WordPress" size="lg" labelSize="sm" forcedTheme="dark" /> },
        { node: <TechLogo icon={<SiMariadb />} label="MariaDB" size="lg" labelSize="sm" forcedTheme="dark" /> },
        { node: <TechLogo icon={<SiNginx />} label="Nginx" size="lg" labelSize="sm" forcedTheme="dark" /> },
      ],
    },
    {
      title: "PassionLecture - Backend",
      description: t("Projects.items.PassionLectureBackend.description"),
      link: "https://github.com/Eliott-Mathis/PassionLecture-Backend",
      cover: "/projects/PassionLecture-Backend.webp",
      stack: [
        { node: <TechLogo icon={<SiNodedotjs />} label="Node.js" size="lg" labelSize="sm" forcedTheme="dark" /> },
        { node: <TechLogo icon={<SiMysql />} label="MySQL" size="lg" labelSize="sm" forcedTheme="dark" /> },
        { node: <TechLogo icon={<SiDocker />} label="Docker" size="lg" labelSize="sm" forcedTheme="dark" /> },
        { node: <TechLogo icon={<SiCloudinary />} label="Cloudinary" size="lg" labelSize="sm" forcedTheme="dark" /> },
      ],
    },
  ];
}
