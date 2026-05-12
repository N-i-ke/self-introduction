import React from "react";
import "./MySkills.css";
import {
  SiTypescript,
  SiHtml5,
  SiCss,
  SiReact,
  SiWordpress,
  SiShopify,
  SiJavascript,
  SiNextdotjs,
  SiNuxt,
  SiKubernetes,
} from "react-icons/si";
import { FaNodeJs, FaVuejs } from "react-icons/fa";
import LogoLoop, { type LogoItem } from "../LogoLoop";
import { useViewport } from "../../hooks/useViewport";

const skillLogos: LogoItem[] = [
  { node: <SiHtml5 color="#E34F26" />, title: "HTML5", ariaLabel: "HTML5" },
  { node: <SiCss color="#1572B6" />, title: "CSS3", ariaLabel: "CSS3" },
  { node: <SiJavascript color="#F7DF1E" />, title: "JavaScript", ariaLabel: "JavaScript" },
  { node: <SiReact color="#61DAFB" />, title: "React.js", ariaLabel: "React.js" },
  { node: <SiNextdotjs color="#000000" />, title: "Next.js", ariaLabel: "Next.js" },
  { node: <FaVuejs color="#4FC08D" />, title: "Vue.js", ariaLabel: "Vue.js" },
  { node: <SiNuxt color="#00DC82" />, title: "Nuxt.js", ariaLabel: "Nuxt.js" },
  { node: <SiTypescript color="#007ACC" />, title: "TypeScript", ariaLabel: "TypeScript" },
  { node: <FaNodeJs color="#339933" />, title: "Node.js", ariaLabel: "Node.js" },
  { node: <SiKubernetes color="#326CE5" />, title: "Kubernetes", ariaLabel: "Kubernetes" },
  { node: <SiWordpress color="#21759B" />, title: "WordPress", ariaLabel: "WordPress" },
  { node: <SiShopify color="#96BF48" />, title: "Shopify", ariaLabel: "Shopify" },
];

const getLogoHeight = (width: number): number => {
  if (width <= 374) return 40;
  if (width <= 480) return 48;
  if (width <= 768) return 56;
  return 72;
};

const getGap = (width: number): number => {
  if (width <= 480) return 32;
  if (width <= 768) return 40;
  return 56;
};

const MySkills: React.FC = () => {
  const { width } = useViewport();

  return (
    <div className="skill-wrap wrapper">
      <LogoLoop
        logos={skillLogos}
        speed={90}
        direction="left"
        logoHeight={getLogoHeight(width)}
        gap={getGap(width)}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="#ffffff"
        ariaLabel="My skills"
      />
    </div>
  );
};

export default MySkills;
