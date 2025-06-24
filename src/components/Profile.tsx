import React from "react";

const Profile: React.FC = () => {
  return (
    <div className="profile">
      <div className="icon-wrapper">
        <h3 className="name animated">
          <p className="name-main">N-i-ke</p>
          <p className="name-sub">N-i-ke</p>
        </h3>
      </div>
      <div className="about-wrapper">
        <h4 className="animated">
          <i className="fas fa-chess-king"></i>
          Personal History
        </h4>
        <p className="animated">
          <i className="fa-regular fa-dot-circle"></i>
          東京育ち、東京在住
          <br />
          <i className="fa-regular fa-dot-circle"></i>
          都内のShopify専門制作会社でフロントエンドエンジニアとして勤務したのちに、Webアプリケーション開発のフロントエンドエンジニアに転身
          <br />
          <i className="fa-regular fa-dot-circle"></i>
          Shopifyを使ったECサイトやLP・コーポレートサイトなどのWebサイト制作を経験後、現在は主にReact.js・Next.js・Vue.js・TypeScriptを使ったフロントエンド開発に取り組む
          <br />
        </p>
        <h4 className="animated">
          <i className="fas fa-chess-queen"></i>
          Mind
        </h4>
        <p className="animated">
          技術力向上に日々努力しておりますが、第一に双方すれ違いのない円滑なコミュニケーションを大事に活動しております。
          業務においては「レスの速さ」を大切にしております。急なデザインの変更や修正なども、その都度しっかりと対応できるように心がけております。
        </p>
      </div>
    </div>
  );
};

export default Profile;
