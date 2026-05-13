import React from "react";
import ElectricBorder from "../ElectricBorder";
import "./WorkItem.css";

type WorkItemProps = {
  imgSrc: string;
  imgAlt: string;
  title: string;
  description: string;
  duration: string;
  link: string;
  disabled?: boolean;
};

const WorkItem: React.FC<WorkItemProps> = ({
  imgSrc,
  imgAlt,
  title,
  description,
  duration,
  link,
  disabled = false,
}) => {
  const borderColor = disabled ? "#7a7a7a" : "#00d8ff";
  const borderSpeed = disabled ? 0.4 : 0.8;
  const borderChaos = disabled ? 0.08 : 0.18;

  return (
    <li className={`work-item ${disabled ? "disabled-item" : ""}`}>
      <ElectricBorder
        color={borderColor}
        speed={borderSpeed}
        chaos={borderChaos}
        borderRadius={10}
        className="work-item__border"
      >
        <figure>
          {disabled ? (
            <div className="disabled-link-container">
              <img src={imgSrc} alt={imgAlt} />
              <div className="disabled-overlay">
                <span>Coming Soon</span>
              </div>
              <figcaption>
                <div className="fig-inner">
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <p>制作期間: {duration}</p>
                </div>
              </figcaption>
            </div>
          ) : (
            <a href={link} target="_blank" rel="noopener noreferrer">
              <img src={imgSrc} alt={imgAlt} />
              <figcaption>
                <div className="fig-inner">
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <p>制作期間: {duration}</p>
                </div>
              </figcaption>
            </a>
          )}
        </figure>
      </ElectricBorder>
    </li>
  );
};

export default WorkItem;
