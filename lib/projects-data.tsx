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
} from "react-icons/si";

type ProjectTranslator = (key: string) => string;

export function getProjects(t: ProjectTranslator) {
  return [
    {
      title: "PlotThoseLines",
      description: t("Projects.items.PlotThoseLines.description"),
      link: "https://github.com/eliottscherrer/PlotThoseLines",
      cover: "/projects/PlotThoseLines.webp",
      stack: [
        { icon: <SiBlazor />, label: "C# .NET Blazor" },
        { icon: <ChartCandlestick />, label: "ApexCharts" },
        { icon: <Coins />, label: "TokenInsight" },
      ],
    },
    {
      title: "PassionLecture - Frontend",
      description: t("Projects.items.PassionLectureFrontend.description"),
      link: "https://github.com/Eliott-Mathis/PassionLecture-Frontend",
      cover: "/projects/PassionLecture-Frontend.webp",
      stack: [
        { icon: <SiVuedotjs />, label: "Vue.js" },
        { icon: <SiExpress />, label: "Express.js" },
        { icon: <SiJavascript />, label: "JavaScript" },
      ],
    },
    {
      title: "DockerSwarm-Wordpress",
      description: t("Projects.items.DockerSwarmWordpress.description"),
      link: "https://github.com/eliottscherrer/DockerSwarm-Wordpress",
      cover: "/projects/DockerSwarm-Wordpress.webp",
      stack: [
        { icon: <SiDocker />, label: "Docker Swarm" },
        { icon: <SiWordpress />, label: "WordPress" },
        { icon: <SiMariadb />, label: "MariaDB" },
        { icon: <SiNginx />, label: "Nginx" },
      ],
    },
    {
      title: "PassionLecture - Backend",
      description: t("Projects.items.PassionLectureBackend.description"),
      link: "https://github.com/Eliott-Mathis/PassionLecture-Backend",
      cover: "/projects/PassionLecture-Backend.webp",
      stack: [
        { icon: <SiNodedotjs />, label: "Node.js" },
        { icon: <SiMysql />, label: "MySQL" },
        { icon: <SiDocker />, label: "Docker" },
        { icon: <SiCloudinary />, label: "Cloudinary" },
      ],
    },
  ];
}
