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
import { useViewport } from "../../hooks/useViewport";

const getIconSize = (width: number): number => {
  if (width <= 374) return 40;
  if (width <= 480) return 52;
  if (width <= 768) return 64;
  return 80;
};

const MySkills: React.FC = () => {
  const { width } = useViewport();
  const size = getIconSize(width);

  return (
    <div className="skill-wrap wrapper">
      <div className="skill-item">
        <SiHtml5 size={size} color="#E34F26" title="HTML5" />
        <h4>HTML</h4>
      </div>
      <div className="skill-item">
        <SiCss size={size} color="#1572B6" title="CSS3" />
        <h4>CSS</h4>
      </div>
      <div className="skill-item">
        <SiJavascript size={size} color="#F7DF1E" title="JavaScript" />
        <h4>JavaScript</h4>
      </div>
      <div className="skill-item">
        <SiReact size={size} color="#61DAFB" title="React" />
        <h4>React.js</h4>
      </div>
      <div className="skill-item">
        <SiNextdotjs size={size} color="#000000" title="Next.js" />
        <h4>Next.js</h4>
      </div>
      <div className="skill-item">
        <FaVuejs size={size} color="#4FC08D" title="Vue.js" />
        <h4>Vue.js</h4>
      </div>
      <div className="skill-item">
        <SiNuxt size={size} color="#00DC82" title="Nuxt.js" />
        <h4>Nuxt.js</h4>
      </div>
      <div className="skill-item">
        <SiTypescript size={size} color="#007ACC" title="TypeScript" />
        <h4>TypeScript</h4>
      </div>
      <div className="skill-item">
        <FaNodeJs size={size} color="#339933" title="Node.js" />
        <h4>Node.js</h4>
      </div>
      <div className="skill-item">
        <SiKubernetes size={size} color="#326CE5" title="Kubernetes" />
        <h4>Kubernetes</h4>
      </div>
      <div className="skill-item">
        <SiWordpress size={size} color="#21759B" title="WordPress" />
        <h4>WordPress</h4>
      </div>
      <div className="skill-item">
        <SiShopify size={size} color="#96BF48" title="Shopify" />
        <h4>Shopify</h4>
      </div>
    </div>
  );
};

export default MySkills;
