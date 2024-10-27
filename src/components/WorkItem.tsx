import React from "react";

type WorkItemProps = {
  imgSrc: string;
  imgAlt: string;
  title: string;
  description: string;
  duration: string;
  link: string;
};

const WorkItem: React.FC<WorkItemProps> = ({
  imgSrc,
  imgAlt,
  title,
  description,
  duration,
  link,
}) => (
  <li className="work-item animated-li">
    <figure>
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
    </figure>
  </li>
);

export default WorkItem;
