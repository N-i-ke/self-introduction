import React from "react";
import styled from "styled-components";

interface TitleProps {
  mainTitle: string;
  subTitle: string;
}

const SecTitle = styled.h2`
  text-align: center;
  font-size: 7rem;
  color: #83ffe630;
  position: relative;
  letter-spacing: 5px;
  font-weight: 900;

  @media screen and (max-width: 600px) {
    font-size: 4rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 4rem;
  }
`;

const SubSecTitle = styled.span`
  display: block;
  font-size: 2.5rem;
  color: #ffffff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media screen and (max-width: 600px) {
    font-size: 1.4rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

const SectionTitle: React.FC<TitleProps> = ({ mainTitle, subTitle }) => {
  return (
    <SecTitle className="sec-title animated-div">
      {mainTitle}
      <SubSecTitle className="sub-sec-title animated-li">
        {subTitle}
      </SubSecTitle>
    </SecTitle>
  );
};

export default SectionTitle;
