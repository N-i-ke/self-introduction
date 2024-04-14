import React from 'react'

function Header() {
  return (
    <div>
      <header id="header">
        <nav id="nav">
          <ul class="nav-menu">
            <li>
              <a href="#main" class="top">
                TOP
              </a>
            </li>
            <li>
              <a href="#work" class="work">
                WORK
              </a>
            </li>
            <li>
              <a href="#about" class="about">
                ABOUT
              </a>
            </li>
            <li>
              <a href="#skill" class="skill">
                SKILLS
              </a>
            </li>
            <li>
              <a href="#service" class="service">
                SERVICE
              </a>
            </li>
            <li>
              <a href="#contact" class="contact">
                CONTACT
              </a>
            </li>
          </ul>
        </nav>
        <div class="menu-btn">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <h1 class="site-title">NIK Portfolio</h1>
        <h4 class="sub-site-title">クリエイティブなWeb制作をお届けします。</h4>
        <div id="mask"></div>
      </header>
    </div>
  );
}

export default Header