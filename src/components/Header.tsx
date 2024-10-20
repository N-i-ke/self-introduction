import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  text-align: center;
`;

const SiteTitle = styled.h1`
  width: 100%;
  position: absolute;
  margin: 0;
  color: #fff;
  filter: drop-shadow(1px 1px 10px #c0c0c0);
  font-size: 3.5rem;
  font-family: "Alegreya Sans SC", sans-serif;
  top: 35%;

  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
`;

const SubSiteTitle = styled.h4`
  width: 100%;
  position: absolute;
  margin: 0;
  color: #fff;
  font-family: "Alegreya Sans SC", sans-serif;
  top: 50%;
  filter: drop-shadow(1px 1px 10px #c0c0c0);

  @media screen and (max-width: 480px) {
    font-size: 0.3rem; /* モバイル用フォントサイズ */
  }
`;

const Nav = styled.nav`
  /* ここにナビゲーションのスタイルを追加することができます */
`;

const MenuButton = styled.div`
  /* メニューボタンのスタイルをここに追加 */
`;

const Mask = styled.div`
  /* マスクのスタイルをここに追加 */
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer id="header">
      <Nav id="nav">
        <ul className="nav-menu">
          <li>
            <a href="#main" className="top">
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
      <MenuButton className="menu-btn">
        <span></span>
        <span></span>
        <span></span>
      </MenuButton>
      <SiteTitle className="site-title">N-i-ke Portfolio</SiteTitle>
      <SubSiteTitle className="sub-site-title">
        クリエイティブなWeb制作をお届けします。
      </SubSiteTitle>
      <Mask id="mask"></Mask>
    </HeaderContainer>
  );
};

export default Header;
