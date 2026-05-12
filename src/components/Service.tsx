import React from "react";
import "./Service.css";

const Service: React.FC = () => {
  return (
    <div className="service-wrapper">
      <div className="service-wrap-left wrapper">
        <i className="fas fa-edit"></i>
        <h3>Webアプリケーション開発</h3>
        <p>
          現職がWebアプリケーション開発のフロントエンドエンジニアという経歴から、React.js•Next.js•TypeScriptを使ったWebアプリケーション開発を得意としています。
        </p>
      </div>
      <div className="service-wrap-right wrapper">
        <i className="fas fa-laptop-code"></i>
        <h3>LP•ECサイト制作 (WordPress/Shopify)</h3>
        <p>
          スマートフォンサイト、ワードプレスを使用した更新性の高いサイト、Shopifyを使用したECサイトなど、静的なサイトから動的なサイトまで様々なサイトのコーディングを行っております。
        </p>
      </div>
    </div>
  );
};

export default Service;
