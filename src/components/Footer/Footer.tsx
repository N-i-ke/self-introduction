import React from "react";
import styled from "styled-components";
import { FaGithub } from "react-icons/fa";

const REPO_URL = "https://github.com/N-i-ke/self-introduction";

const FooterContainer = styled.footer`
  text-align: center;
  background-color: rgba(28, 28, 28, 1);
  color: #fff;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-family: "Quicksand", sans-serif;

  .footer-copy {
    margin: 0;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.7);
  }

  .github-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #ffffff;
    text-decoration: none;
    border: 1px solid rgba(0, 216, 255, 0.45);
    background-color: rgba(0, 0, 0, 0.25);
    border-radius: 999px;
    padding: 8px 18px;
    font-family: "Courier New", "Menlo", monospace;
    font-size: 0.8rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
    min-height: 36px;
  }

  .github-link:hover {
    color: #00d8ff;
    border-color: rgba(0, 216, 255, 0.85);
    background-color: rgba(0, 216, 255, 0.08);
    box-shadow: 0 0 12px rgba(0, 216, 255, 0.35);
  }

  .github-link:focus-visible {
    outline: 2px solid #00d8ff;
    outline-offset: 2px;
  }

  .github-link svg {
    flex-shrink: 0;
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer id="footer">
      <a
        href={REPO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="github-link cursor-target"
        aria-label="View source on GitHub"
      >
        <FaGithub size={18} aria-hidden="true" />
        <span>View on GitHub</span>
      </a>
      <p className="footer-copy">&copy;2026 N-i-ke All Right Reserved.</p>
    </FooterContainer>
  );
};

export default Footer;
