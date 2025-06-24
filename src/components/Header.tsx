import React, { useState } from "react";
import styled from "styled-components";
import GooeyNav from './GooeyNav';
import './Header.css';

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
  transition: all 0.15s;
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
    color: #fff !important;
    text-align: center;
    display: block;
    transition: all 0.15s;

    &:hover {
      color: #fff !important;
      background-color: rgba(255, 255, 255, 0.2);
      font-size: 1.3rem;
      text-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
    }
  }
`;

const MenuButton = styled.div`
  display: block;
  position: fixed;
  top: 25px;
  right: 25px;
  z-index: 999;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.15s;

  span {
    position: absolute;
    left: 5px;
    display: block;
    width: 30px;
    height: 2px;
    border-radius: 1px;
    background-color: #fff;
    transition: all 0.15s;

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
  transition: all 0.15s;
`;

const GooeyNavWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: rgba(14, 8, 8, 0.8);
  backdrop-filter: blur(5px);
`;

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Nav items for GooeyNav
  const items = [
    { label: "TOP", href: "#top" },
    { label: "WORK", href: "#work" },
    { label: "ABOUT", href: "#about" },
    { label: "SKILLS", href: "#skill" },
    { label: "SERVICE", href: "#service" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <HeaderContainer id="top" className={isOpen ? "open" : ""}>
      {/* Mobile menu (hidden on desktop) */}
      <div className="mobile-menu">
        <Nav isOpen={isOpen}>
          <ul className="nav-menu">
            <li>
              <a href="#top" className="top" onClick={closeMenu}>
                TOP
              </a>
            </li>
            <li>
              <a href="#work" className="work" onClick={closeMenu}>
                WORK
              </a>
            </li>
            <li>
              <a href="#about" className="about" onClick={closeMenu}>
                ABOUT
              </a>
            </li>
            <li>
              <a href="#skill" className="skill" onClick={closeMenu}>
                SKILLS
              </a>
            </li>
            <li>
              <a href="#service" className="service" onClick={closeMenu}>
                SERVICE
              </a>
            </li>
            <li>
              <a href="#contact" className="contact" onClick={closeMenu}>
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
      </div>

      {/* Desktop GooeyNav menu */}
      <GooeyNavWrapper className="desktop-menu">
        <GooeyNav
          items={items}
          particleCount={4}
          animationTime={100}
          timeVariance={50}
        />
      </GooeyNavWrapper>
    </HeaderContainer>
  );
};

export default Header;
