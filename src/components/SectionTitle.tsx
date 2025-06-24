import React from "react";
import styled from "styled-components";
import { motion } from 'framer-motion';
import BlurText from "./BlurText";

interface TitleProps {
  mainTitle: string;
  subTitle: string;
}

const SecTitle = styled(motion.h2)`
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

const SubSecTitle = styled(motion.span)`
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
  const handleAnimationComplete = () => {
    console.log('Section title animation completed!');
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      filter: 'blur(10px)'
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  const subtitleVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      filter: 'blur(5px)'
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <SecTitle 
      className="sec-title animated-div"
      variants={titleVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <BlurText
        text={mainTitle}
        delay={100}
        animateBy="words"
        direction="top"
        onAnimationComplete={handleAnimationComplete}
        className="main-title-blur"
        animationFrom={undefined}
        animationTo={undefined}
      />
      <SubSecTitle 
        className="sub-sec-title animated-li"
        variants={subtitleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <BlurText
          text={subTitle}
          delay={50}
          animateBy="words"
          direction="bottom"
          className="subtitle-blur"
          animationFrom={undefined}
          animationTo={undefined}
          onAnimationComplete={undefined}
        />
      </SubSecTitle>
    </SecTitle>
  );
};

export default SectionTitle;
