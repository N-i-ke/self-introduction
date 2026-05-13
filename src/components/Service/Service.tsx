import React from "react";
import { useLocale, type Locale } from "../../contexts/LocaleContext";
import "./Service.css";

type ServiceCard = {
  heading: string;
  body: string;
};

type ServiceCopy = {
  left: ServiceCard;
  right: ServiceCard;
};

const copy: Record<Locale, ServiceCopy> = {
  ja: {
    left: {
      heading: "Webアプリケーション開発",
      body: "現職がWebアプリケーション開発のフロントエンドエンジニアという経歴から、React.js・Next.js・TypeScriptを使ったWebアプリケーション開発を得意としています。",
    },
    right: {
      heading: "LP・ECサイト制作 (WordPress/Shopify)",
      body: "スマートフォンサイト、WordPress を使った更新性の高いサイト、Shopify を使った EC サイトなど、静的なサイトから動的なサイトまで様々なサイトのコーディングを行っております。",
    },
  },
  en: {
    left: {
      heading: "Web Application Development",
      body: "Working as a front-end engineer in web application development, I specialize in building modern web apps with React.js, Next.js, and TypeScript.",
    },
    right: {
      heading: "Landing Pages & EC Sites (WordPress / Shopify)",
      body: "I handle a wide range of coding work — from responsive mobile sites and content-rich WordPress builds to Shopify-based EC sites — covering both static and dynamic implementations.",
    },
  },
};

const Service: React.FC = () => {
  const { locale } = useLocale();
  const c = copy[locale];

  return (
    <div className="service-wrapper" lang={locale}>
      <div className="service-wrap-left wrapper">
        <i className="fas fa-edit"></i>
        <h3>{c.left.heading}</h3>
        <p>{c.left.body}</p>
      </div>
      <div className="service-wrap-right wrapper">
        <i className="fas fa-laptop-code"></i>
        <h3>{c.right.heading}</h3>
        <p>{c.right.body}</p>
      </div>
    </div>
  );
};

export default Service;
