import React from "react";
import { createGlobalStyle } from "styled-components"; // styledとcreateGlobalStyleを正しくインポート
import "./App.css";
import Header from "./components/Header";
import Video from "./components/Video";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import Contact from "./components/Contact";

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
    background-color: rgba(28, 28, 28, 1);
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
  <>
    <GlobalStyle />
    <div className="App">
      <Header />
      <Video />
      <HomePage />
      <Contact />
      <Footer />
    </div>
  </>
  );
};

export default App;
