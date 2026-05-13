import React, { useState } from "react";
import styled from "styled-components";
import { FaGithub } from "react-icons/fa";
import GooeyNav from "../GooeyNav";
import { useLocale, type Locale } from "../../contexts/LocaleContext";
import "./Header.css";

const REPO_URL = "https://github.com/N-i-ke/self-introduction";

const HeaderContainer = styled.header`
  text-align: center;
  font-family: "Quicksand", sans-serif;
`;

const Bar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 clamp(16px, 3vw, 32px);
  background-color: rgba(14, 8, 8, 0.55);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-sizing: border-box;
  border-bottom: 1px solid rgba(0, 216, 255, 0.18);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.35), 0 1px 12px rgba(0, 216, 255, 0.12);
  color: #fff;
`;

const Brand = styled.a`
  font-family: "Courier New", "Menlo", monospace;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: #ffffff !important;
  text-decoration: none;
  text-transform: uppercase;
  text-shadow: 0 0 12px rgba(0, 216, 255, 0.35);
  white-space: nowrap;
  transition: text-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    text-shadow: 0 0 16px rgba(0, 216, 255, 0.6);
    transform: translateY(-1px);
  }
`;

const NavCenter = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  min-width: 0;
`;

const RightCluster = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;

  @media screen and (max-width: 480px) {
    gap: 8px;
  }
`;

const GitHubIconLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(0, 216, 255, 0.45);
  color: #cfeaff;
  background-color: rgba(0, 0, 0, 0.25);
  text-decoration: none;
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
  flex-shrink: 0;

  &:hover {
    color: #00d8ff;
    border-color: rgba(0, 216, 255, 0.85);
    background-color: rgba(0, 216, 255, 0.12);
    box-shadow: 0 0 12px rgba(0, 216, 255, 0.4);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid #00d8ff;
    outline-offset: 2px;
  }

  @media screen and (max-width: 374px) {
    width: 32px;
    height: 32px;
  }
`;

const LangToggleWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  border: 1px solid rgba(0, 216, 255, 0.45);
  border-radius: 999px;
  padding: 3px;
  background-color: rgba(0, 0, 0, 0.25);
`;

const LangButton = styled.button<{ $active: boolean }>`
  appearance: none;
  border: none;
  cursor: pointer;
  font-family: "Courier New", "Menlo", monospace;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  padding: 6px 12px;
  min-width: 44px;
  min-height: 30px;
  border-radius: 999px;
  background-color: ${({ $active }) => ($active ? "#00d8ff" : "transparent")};
  color: ${({ $active }) => ($active ? "#0b0b0b" : "#cfeaff")};
  transition: background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
  box-shadow: ${({ $active }) => ($active ? "0 0 10px rgba(0, 216, 255, 0.55)" : "none")};

  &:hover {
    color: ${({ $active }) => ($active ? "#0b0b0b" : "#ffffff")};
    background-color: ${({ $active }) =>
      $active ? "#00d8ff" : "rgba(0, 216, 255, 0.12)"};
  }

  &:focus-visible {
    outline: 2px solid #00d8ff;
    outline-offset: 2px;
  }
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
  background-color: rgba(14, 8, 8, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: all 0.2s ease;
  overflow-x: hidden;
  overflow-y: auto;
  font-family: "Quicksand", sans-serif;
  display: flex;
  flex-direction: column;

  ul {
    padding: 80px 0 24px;
    margin: 0;
  }

  li {
    padding: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.18);

    &:first-child {
      border-top: 1px solid rgba(255, 255, 255, 0.18);
    }
  }

  a {
    padding: 16px;
    min-height: 44px;
    color: #fff !important;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s;
    letter-spacing: 0.12em;

    &:hover {
      color: #fff !important;
      background-color: rgba(0, 216, 255, 0.15);
      text-shadow: 0 0 8px rgba(0, 216, 255, 0.8);
    }
  }
`;

const DrawerLangSection = styled.div`
  margin-top: auto;
  padding: 24px 16px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const DrawerCloseButton = styled.button`
  appearance: none;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s ease, border-color 0.15s ease, transform 0.15s ease;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 18px;
    height: 2px;
    background-color: #fff;
    border-radius: 1px;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }

  &:hover {
    background-color: rgba(0, 216, 255, 0.15);
    border-color: rgba(0, 216, 255, 0.55);
    transform: rotate(90deg);
  }

  &:focus-visible {
    outline: 2px solid #00d8ff;
    outline-offset: 2px;
  }
`;

const DrawerLangLabel = styled.span`
  font-family: "Courier New", "Menlo", monospace;
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  color: rgba(207, 234, 255, 0.7);
  text-transform: uppercase;
`;

const MenuButton = styled.button`
  appearance: none;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.15s;
  padding: 0;

  span {
    position: absolute;
    left: 7px;
    display: block;
    width: 30px;
    height: 2px;
    border-radius: 1px;
    background-color: #fff;
    transition: all 0.15s;

    &:nth-child(1) {
      top: 14px;
    }

    &:nth-child(2) {
      top: 22px;
    }

    &:nth-child(3) {
      top: 30px;
    }
  }

  &.open span:nth-child(1) {
    transform: translateY(8px) rotate(-315deg);
  }

  &.open span:nth-child(2) {
    opacity: 0;
  }

  &.open span:nth-child(3) {
    transform: translateY(-8px) rotate(315deg);
  }

  &:focus-visible {
    outline: 2px solid #00d8ff;
    outline-offset: 2px;
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

interface LangToggleProps {
  locale: Locale;
  onChange: (next: Locale) => void;
  className?: string;
}

const LangToggle: React.FC<LangToggleProps> = ({ locale, onChange, className }) => (
  <LangToggleWrapper className={className} role="group" aria-label="Language">
    <LangButton
      type="button"
      className="cursor-target"
      $active={locale === "ja"}
      aria-pressed={locale === "ja"}
      onClick={() => onChange("ja")}
    >
      JA
    </LangButton>
    <LangButton
      type="button"
      className="cursor-target"
      $active={locale === "en"}
      aria-pressed={locale === "en"}
      onClick={() => onChange("en")}
    >
      EN
    </LangButton>
  </LangToggleWrapper>
);

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { locale, setLocale } = useLocale();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

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
      {/* Desktop top bar */}
      <Bar className="header-bar header-bar--desktop">
        <Brand href="#top" className="cursor-target" aria-label="Back to top">
          N-I-KE
        </Brand>
        <NavCenter>
          <GooeyNav items={items} particleCount={4} animationTime={100} timeVariance={50} />
        </NavCenter>
        <RightCluster>
          <LangToggle locale={locale} onChange={setLocale} />
          <GitHubIconLink
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-target"
            aria-label="View source on GitHub"
          >
            <FaGithub size={18} aria-hidden="true" />
          </GitHubIconLink>
        </RightCluster>
      </Bar>

      {/* Mobile top bar */}
      <Bar className="header-bar header-bar--mobile">
        <Brand href="#top" className="cursor-target" aria-label="Back to top">
          N-I-KE
        </Brand>
        <RightCluster>
          <LangToggle locale={locale} onChange={setLocale} />
          <GitHubIconLink
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-target"
            aria-label="View source on GitHub"
          >
            <FaGithub size={18} aria-hidden="true" />
          </GitHubIconLink>
          <MenuButton
            type="button"
            className={isOpen ? "open" : ""}
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <span />
            <span />
            <span />
          </MenuButton>
        </RightCluster>
      </Bar>

      {/* Mobile drawer */}
      <div className="header-drawer">
        <Nav isOpen={isOpen} aria-hidden={!isOpen}>
          <DrawerCloseButton
            type="button"
            className="cursor-target"
            onClick={closeMenu}
            aria-label="Close menu"
          />
          <ul className="nav-menu">
            {items.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={item.href.slice(1)} onClick={closeMenu}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <DrawerLangSection>
            <DrawerLangLabel>Language</DrawerLangLabel>
            <LangToggle locale={locale} onChange={setLocale} />
          </DrawerLangSection>
        </Nav>
        <Mask isOpen={isOpen} onClick={closeMenu} />
      </div>
    </HeaderContainer>
  );
};

export default Header;
