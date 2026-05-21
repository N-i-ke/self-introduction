import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaGithub } from "react-icons/fa";
import BubbleMenu, { type BubbleMenuItem } from "../BubbleMenu";
import { useLocale, type Locale } from "../../contexts/LocaleContext";
import { trackOutboundClick } from "../../lib/analytics";
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

const MenuButton = styled.button`
  appearance: none;
  border: 1px solid rgba(0, 216, 255, 0.45);
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
  padding: 0;
  flex-shrink: 0;

  span {
    position: absolute;
    left: 50%;
    display: block;
    width: 20px;
    height: 2px;
    border-radius: 1px;
    background-color: #cfeaff;
    transform: translate(-50%, 0);
    transition: transform 0.25s ease, opacity 0.2s ease, background-color 0.2s ease;

    &:nth-child(1) {
      top: calc(50% - 7px);
    }

    &:nth-child(2) {
      top: calc(50% - 1px);
    }

    &:nth-child(3) {
      top: calc(50% + 5px);
    }
  }

  &:hover {
    border-color: rgba(0, 216, 255, 0.85);
    background-color: rgba(0, 216, 255, 0.12);
    box-shadow: 0 0 12px rgba(0, 216, 255, 0.4);
    transform: translateY(-1px);

    span {
      background-color: #00d8ff;
    }
  }

  &.open span:nth-child(1) {
    transform: translate(-50%, 6px) rotate(45deg);
  }

  &.open span:nth-child(2) {
    opacity: 0;
  }

  &.open span:nth-child(3) {
    transform: translate(-50%, -6px) rotate(-45deg);
  }

  &:focus-visible {
    outline: 2px solid #00d8ff;
    outline-offset: 2px;
  }

  @media screen and (max-width: 374px) {
    width: 36px;
    height: 36px;
  }
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

const MENU_ITEMS: BubbleMenuItem[] = [
  {
    label: "TOP",
    href: "#top",
    ariaLabel: "Scroll to top",
    rotation: -8,
    hoverStyles: { bgColor: "rgba(0, 216, 255, 0.22)", textColor: "#ffffff" },
  },
  {
    label: "WORK",
    href: "#work",
    ariaLabel: "Scroll to work",
    rotation: 8,
    hoverStyles: { bgColor: "rgba(0, 216, 255, 0.22)", textColor: "#ffffff" },
  },
  {
    label: "ABOUT",
    href: "#about",
    ariaLabel: "Scroll to about",
    rotation: 8,
    hoverStyles: { bgColor: "rgba(0, 216, 255, 0.22)", textColor: "#ffffff" },
  },
  {
    label: "ARTICLES",
    href: "#articles",
    ariaLabel: "Scroll to articles",
    rotation: -8,
    hoverStyles: { bgColor: "rgba(0, 216, 255, 0.22)", textColor: "#ffffff" },
  },
  {
    label: "SKILLS",
    href: "#skill",
    ariaLabel: "Scroll to skills",
    rotation: 8,
    hoverStyles: { bgColor: "rgba(0, 216, 255, 0.22)", textColor: "#ffffff" },
  },
  {
    label: "SERVICE",
    href: "#service",
    ariaLabel: "Scroll to service",
    rotation: 8,
    hoverStyles: { bgColor: "rgba(0, 216, 255, 0.22)", textColor: "#ffffff" },
  },
  {
    label: "CONTACT",
    href: "#contact",
    ariaLabel: "Scroll to contact",
    rotation: -8,
    hoverStyles: { bgColor: "rgba(0, 216, 255, 0.22)", textColor: "#ffffff" },
  },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { locale, setLocale } = useLocale();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <HeaderContainer id="top" className={isOpen ? "open" : ""}>
      <Bar>
        <Brand href="#top" className="cursor-target" aria-label="Back to top" onClick={closeMenu}>
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
            onClick={() =>
              trackOutboundClick({ service: "github", location: "header", url: REPO_URL })
            }
          >
            <FaGithub size={18} aria-hidden="true" />
          </GitHubIconLink>
          <MenuButton
            type="button"
            className={`cursor-target${isOpen ? " open" : ""}`}
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="bubble-menu-overlay"
          >
            <span />
            <span />
            <span />
          </MenuButton>
        </RightCluster>
      </Bar>

      <BubbleMenu isOpen={isOpen} items={MENU_ITEMS} onItemClick={closeMenu} />
    </HeaderContainer>
  );
};

export default Header;
