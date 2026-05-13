import React from "react";
import { createGlobalStyle } from "styled-components"; // styledとcreateGlobalStyleを正しくインポート
import "./App.css";
import Header from "./components/Header";
import TopFv from "./components/TopFv";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import TargetCursor from "./components/TargetCursor";
import SiteBackground from "./components/SiteBackground";
import SmoothScrollProvider from "./components/SmoothScrollProvider";
import { LocaleProvider } from "./contexts/LocaleContext";

// グローバルスタイルを作成
const GlobalStyle = createGlobalStyle`
  @charset "UTF-8";
  html {
    font-size: 100%;
  }
  .App{
    overflow-x: hidden;
  }
  body {
    font-size: 0.9rem;
    line-height: 1.7;
    margin: 0;
    color: #f6f6e9;
    background-color: transparent;
  }
  .wrapper {
    box-sizing:border-box;
    background-color:#fff;
    box-shadow:0 0 8px 4px #999;
  }
  a {
    text-decoration: none;
  }
  img {
    max-width: 100%;
  }
  li {
    list-style: none;
  }
`;

const App: React.FC = () => {
  return (
  <LocaleProvider>
    <SmoothScrollProvider>
      <GlobalStyle />
      <SiteBackground />
      <TargetCursor targetSelector=".cursor-target" />
      <div className="App">
        <Header />
        <TopFv />
        <HomePage />
        <Contact />
        <Footer />
      </div>
    </SmoothScrollProvider>
  </LocaleProvider>
  );
};

export default App;
