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
      {disabled ? (
        <div className="disabled-link-container">
          <img src={imgSrc} alt={imgAlt} />
          <div className="disabled-overlay">
            <span>
              Coming Soon
            </span>
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
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
        >
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
  </li>
);

export default WorkItem;
