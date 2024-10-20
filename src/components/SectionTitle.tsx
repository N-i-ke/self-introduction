import React from "react";

interface TitleProps {
    mainTitle: string;
    subTitle: string;
}

const SectionTitle: React.FC<TitleProps> = ({mainTitle,subTitle}) => {
  return (
    <h2 className="sec-title animated-div">
      {mainTitle}
      <span className="sub-sec-title animated-li">{subTitle}</span>
    </h2>
  );
};

export default SectionTitle;