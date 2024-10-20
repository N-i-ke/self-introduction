import React from "react";

const Service: React.FC = () => {
  return (
    <div className="service-wrapper">
      <div className="service-wrap-left wrapper animated">
        <i className="fas fa-edit animated"></i>
        <h3 className="animated">コーポレートサイト制作</h3>
        <p className="animated">
          会社のイメージを重視しながら会社概要やお知らせの掲載、所在地地図の設置などに対応いたします。
        </p>
      </div>
      <div className="service-wrap-right wrapper animated">
        <i className="fas fa-laptop-code animated"></i>
        <h3 className="animated">コーディング•WP構築</h3>
        <p className="animated">
          スマートフォンサイト、ワードプレスを使用した更新性の高いサイト、Javascriptを使用した動きのあるサイトなど、様々なサイトのコーディングを行っております。
        </p>
      </div>
    </div>
  );
};

export default Service;
