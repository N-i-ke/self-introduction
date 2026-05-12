import React, { useState } from "react";
import "./Profile.css";

type Locale = "ja" | "en";

type ProfileContent = {
  historyHeading: string;
  historyItems: React.ReactNode[];
  mindHeading: string;
  mind: React.ReactNode;
};

const content: Record<Locale, ProfileContent> = {
  ja: {
    historyHeading: "Personal History",
    historyItems: [
      "東京育ち、東京在住",
      "都内のShopify専門制作会社でフロントエンドエンジニアとして勤務したのちに、Webアプリケーション開発のフロントエンドエンジニアに転身",
      "Shopifyを使ったECサイトやLP・コーポレートサイトなどのWebサイト制作を経験後、現在は主にReact.js・Next.js・Vue.js・TypeScriptを使ったフロントエンド開発に取り組む",
    ],
    mindHeading: "Mind",
    mind: (
      <>
        技術力向上に日々努力しておりますが、第一に双方すれ違いのない円滑なコミュニケーションを大事に活動しております。
        業務においては「レスの速さ」を大切にしております。急なデザインの変更や修正なども、その都度しっかりと対応できるように心がけております。
      </>
    ),
  },
  en: {
    historyHeading: "Personal History",
    historyItems: [
      "Born and raised in Tokyo, currently based in Tokyo.",
      "Worked as a front-end engineer at a Shopify-focused web production agency in Tokyo, then moved to a front-end engineer role in web application development.",
      "After building Shopify-based EC sites, landing pages, and corporate websites, I now focus mainly on front-end development with React.js, Next.js, Vue.js, and TypeScript.",
    ],
    mindHeading: "Working Style",
    mind: (
      <>
        I work hard every day to improve my technical skills, but above all, I value smooth, well-aligned communication.
        In my work I place a high priority on the speed of response, and I make sure to handle sudden design changes
        and revisions promptly and reliably.
      </>
    ),
  },
};

const Profile: React.FC = () => {
  const [locale, setLocale] = useState<Locale>("ja");
  const current = content[locale];

  return (
    <div className="profile">
      <div className="icon-wrapper">
        <h3 className="name">
          <p className="name-main">N-i-ke</p>
          <p className="name-sub">N-i-ke</p>
        </h3>
      </div>

      <div className="profile-lang-tabs" role="tablist" aria-label="Language">
        <button
          type="button"
          role="tab"
          aria-selected={locale === "ja"}
          className={`profile-lang-tab cursor-target ${locale === "ja" ? "is-active" : ""}`}
          onClick={() => setLocale("ja")}
        >
          JA
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={locale === "en"}
          className={`profile-lang-tab cursor-target ${locale === "en" ? "is-active" : ""}`}
          onClick={() => setLocale("en")}
        >
          EN
        </button>
      </div>

      <div className="about-wrapper" lang={locale}>
        <h4>
          <i className="fas fa-chess-king"></i>
          {current.historyHeading}
        </h4>
        <p>
          {current.historyItems.map((item, index) => (
            <React.Fragment key={index}>
              <i className="fa-regular fa-dot-circle"></i>
              {item}
              <br />
            </React.Fragment>
          ))}
        </p>
        <h4>
          <i className="fas fa-chess-queen"></i>
          {current.mindHeading}
        </h4>
        <p>{current.mind}</p>
      </div>
    </div>
  );
};

export default Profile;
