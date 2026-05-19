import React, { useRef } from "react";
import { SiQiita, SiZenn } from "react-icons/si";
import { useParallax } from "../../hooks/useParallax";
import EarthBackground from "../EarthBackground";
import { useLocale, type Locale } from "../../contexts/LocaleContext";
import "./Profile.css";

type ProfileContent = {
  historyHeading: string;
  historyItems: React.ReactNode[];
  mindHeading: string;
  mind: React.ReactNode;
  articlesHeading: string;
  articlesLead: string;
  qiitaLabel: string;
  zennLabel: string;
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
    articlesHeading: "Articles",
    articlesLead: "Qiita / Zenn で学習メモや実装記事を公開しています。",
    qiitaLabel: "Qiita @N-i-ke の記事一覧を開く",
    zennLabel: "Zenn @ken32 の記事一覧を開く",
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
    articlesHeading: "Articles",
    articlesLead: "I publish learning notes and implementation write-ups on Qiita and Zenn.",
    qiitaLabel: "Open Qiita @N-i-ke article list",
    zennLabel: "Open Zenn @ken32 article list",
  },
};

const QIITA_URL = "https://qiita.com/N-i-ke";
const ZENN_URL = "https://zenn.dev/ken32";

const Profile: React.FC = () => {
  const { locale } = useLocale();
  const current = content[locale];
  const nameRef = useRef<HTMLDivElement>(null);
  useParallax(nameRef, { yPercent: -25 });

  return (
    <div className="profile">
      <div className="icon-wrapper" ref={nameRef}>
        <h3 className="name">
          <p className="name-main">N-i-ke</p>
          <p className="name-sub">N-i-ke</p>
        </h3>
      </div>

      <div className="about-wrapper" lang={locale}>
        <EarthBackground />
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

        <h4 id="articles">
          <i className="fas fa-feather"></i>
          {current.articlesHeading}
        </h4>
        <p>{current.articlesLead}</p>
        <ul className="articles-links" aria-label={current.articlesHeading}>
          <li>
            <a
              className="articles-link articles-link--qiita cursor-target"
              href={QIITA_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={current.qiitaLabel}
            >
              <SiQiita className="articles-link__icon" aria-hidden="true" />
              <span className="articles-link__label">Qiita</span>
            </a>
          </li>
          <li>
            <a
              className="articles-link articles-link--zenn cursor-target"
              href={ZENN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={current.zennLabel}
            >
              <SiZenn className="articles-link__icon" aria-hidden="true" />
              <span className="articles-link__label">Zenn</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
