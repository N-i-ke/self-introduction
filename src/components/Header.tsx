import React, { useState } from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  text-align: center;
`;

const Nav = styled.nav<{ isOpen: boolean }>`
  width: 300px;
  min-height: 100vh;
  color: #ffffff;
  z-index: 99;
  position: fixed;
  top: 0;
  left: ${(props) => (props.isOpen ? "0" : "-400px")};
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  transition: all 0.6s;
  overflow-x: hidden;
  overflow-y: auto;
  font-family: "Quicksand", sans-serif;

  ul {
    padding: 70px 0;
  }

  li {
    padding: 0 0;
    border-bottom: 1px solid #fff;

    &:first-child {
      border-top: 1px solid #fff;
    }
  }

  a {
    padding: 10px;
    color: #fff;
    text-align: center;
    display: block;
    transition: all 0.6s;

    &:hover {
      color: #1a1a1a;
      background-color: #fff;
      font-size: 1.3rem;
    }
  }
`;

const MenuButton = styled.div`
  display: block;
  position: fixed;
  top: 25px;
  right: 45px;
  z-index: 999;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.6s;

  span {
    position: absolute;
    left: 5px;
    display: block;
    width: 30px;
    height: 2px;
    border-radius: 1px;
    background-color: #fff;
    transition: all 0.6s;

    &:nth-child(1) {
      top: 9px;
    }

    &:nth-child(2) {
      top: 19px;
    }

    &:nth-child(3) {
      top: 29px;
    }
  }

  &.open span:nth-child(1) {
    transform: translateY(10px) rotate(-315deg);
  }

  &.open span:nth-child(2) {
    opacity: 0;
  }

  &.open span:nth-child(3) {
    transform: translateY(-10px) rotate(315deg);
  }
`;

const Mask = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  background-color: rgba(20, 20, 20, 0.7);
  width: 100%;
  height: 100%;
  min-height: 100vh;
  transition: all 0.6s;
`;

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <HeaderContainer id="top" className={isOpen ? "open" : ""}>
      <Nav isOpen={isOpen}>
        <ul className="nav-menu">
          <li>
            <a href="#top" className="top">
              TOP
            </a>
          </li>
          <li>
            <a href="#work" className="work">
              WORK
            </a>
          </li>
          <li>
            <a href="#about" className="about">
              ABOUT
            </a>
          </li>
          <li>
            <a href="#skill" className="skill">
              SKILLS
            </a>
          </li>
          <li>
            <a href="#service" className="service">
              SERVICE
            </a>
          </li>
          <li>
            <a href="#contact" className="contact">
              CONTACT
            </a>
          </li>
        </ul>
      </Nav>
      <MenuButton className={isOpen ? "open" : ""} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </MenuButton>
      <Mask isOpen={isOpen} onClick={closeMenu}></Mask>
    </HeaderContainer>
  );
};

export default Header;
