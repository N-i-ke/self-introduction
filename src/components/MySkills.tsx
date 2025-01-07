import React from "react";
import {
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiSass,
  SiReact,
  SiPhp,
  SiWordpress,
  SiShopify,
  SiJavascript,
  SiNextdotjs,
  SiFlutter,
} from "react-icons/si";

const MySkills: React.FC = () => {
  return (
    <div className="skill-wrap wrapper animated">
      <div className="skill-item animated-div">
        <SiHtml5 size={80} color="#E34F26" title="HTML5" />
        <h4>HTML</h4>
      </div>
      <div className="skill-item animated-div">
        <SiCss3 size={80} color="#1572B6" title="CSS3" />
        <h4>CSS</h4>
      </div>
      <div className="skill-item animated-div">
        <SiSass size={80} color="#CC6699" title="SASS" />
        <h4>SASS</h4>
      </div>
      <div className="skill-item animated-div">
        <SiJavascript size={80} color="#F7DF1E" title="JavaScript" />
        <h4>JavaScript</h4>
      </div>
      <div className="skill-item animated-div">
        <SiPhp size={80} color="#777BB4" title="PHP" />
        <h4>PHP</h4>
      </div>
      <div className="skill-item animated-div">
        <SiReact size={80} color="#61DAFB" title="React" />
        <h4>React.js</h4>
      </div>
      <div className="skill-item animated-div">
        <SiNextdotjs size={80} color="#000000" title="React" />
        <h4>Next.js</h4>
      </div>
      <div className="skill-item animated-div">
        <SiTypescript size={80} color="#007ACC" />
        <h4>TypeScript</h4>
      </div>
      <div className="skill-item animated-div">
        <SiFlutter size={80} color="#007ACC" />
        <h4>Flutter</h4>
      </div>
      <div className="skill-item animated-div">
        <SiWordpress size={80} color="#21759B" title="WordPress" />
        <h4>WordPress</h4>
      </div>
      <div className="skill-item animated-div">
        <SiShopify size={80} color="#96BF48" title="Shopify" />
        <h4>Shopify</h4>
      </div>
    </div>
  );
};

export default MySkills;
