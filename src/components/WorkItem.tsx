import React from "react";

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
}) => (
  <li className={`work-item animated-li ${disabled ? 'disabled-item' : ''}`}>
    <figure>
      <a 
        href={disabled ? "#" : link} 
        target={disabled ? "_self" : "_blank"} 
        rel="noopener noreferrer"
        className={disabled ? "disabled-link" : ""}
      >
        <img src={imgSrc} alt={imgAlt} />
        {disabled && (
          <div className="disabled-overlay">
            <span>
              Coming Soon
            </span>
          </div>
        )}
        <figcaption>
          <div className="fig-inner">
            <h3>{title}</h3>
            <p>{description}</p>
            <p>制作期間: {duration}</p>
          </div>
        </figcaption>
      </a>
    </figure>
  </li>
);

export default WorkItem;
