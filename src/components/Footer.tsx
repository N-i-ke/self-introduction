import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  text-align: center;
  background-color: rgba(28, 28, 28, 1);
  color: #fff;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;

  .footer {
    display: inline-block;
    vertical-align: middle;
    font-family: "Quicksand", sans-serif;
  }

  .btn-sns {
    font-size: 5rem;
    letter-spacing: 0;
    color: #fff;
    margin: 0;
  }

  p {
    text-align: center;
  }

  i {
    transition: all 0.5s;

    &:hover {
      color: #1da1f2;
      transform: rotate(25deg);
      transition: all 0.5s;
    }
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer id="footer">
      <p className="footer">&copy;2024 N-i-ke All Right Reserved.</p>
    </FooterContainer>
  );
};

export default Footer;
