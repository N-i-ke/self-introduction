import React from "react";

const Service: React.FC = () => {
  return (
    <div className="service-wrapper">
      <div className="service-wrap-left wrapper animated">
        <i className="fas fa-edit animated"></i>
        <h3 className="animated">Webアプリケーション開発</h3>
        <p className="animated">
          現職がWebアプリケーション開発のフロントエンドエンジニアという経歴から、React•TypeScriptを使ったWebアプリケーション開発を得意としています。
        </p>
      </div>
      <div className="service-wrap-right wrapper animated">
        <i className="fas fa-laptop-code animated"></i>
        <h3 className="animated">LP•ECサイト制作 (WordPress/Shopify)</h3>
        <p className="animated">
          スマートフォンサイト、ワードプレスを使用した更新性の高いサイト、Shopifyを使用したECサイトなど、静的なサイトから動的なサイトまで様々なサイトのコーディングを行っております。
        </p>
      </div>
    </div>
  );
};

export default Service;
