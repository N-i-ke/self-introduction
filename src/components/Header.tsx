import React from "react";

const Header: React.FC = () => {
  return (
    <div>
      <header id="header">
        <nav id="nav">
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
        </nav>
        <div className="menu-btn">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <h1 className="site-title">N-i-ke Portfolio</h1>
        <h4 className="sub-site-title">
          クリエイティブなWeb制作をお届けします。
        </h4>
        <div id="mask"></div>
      </header>
    </div>
  );
};

export default Header;
