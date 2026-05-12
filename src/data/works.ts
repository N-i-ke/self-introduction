import Sneaker from "../Image/sneaker.png";
import Flower from "../Image/ohana.png";
import WorksImg from "../Image/works.png";
import Building from "../Image/kensetu.png";
import BathSalt from "../Image/kunaipu.png";
import Engress from "../Image/Engress.png";
import Kadan from "../Image/kadan.png";
import Sousaku from "../Image/sousaku.png";
import Your from "../Image/your.png";

export type Work = {
  imgSrc: string;
  imgAlt: string;
  title: string;
  description: string;
  duration: string;
  link: string;
  disabled?: boolean;
};

export const works: Work[] = [
  {
    imgSrc: Sneaker,
    imgAlt: "sneaker",
    title: "動画付きカルーセル",
    description: "カルーセルグリッドレイアウト",
    duration: "2日",
    link: "https://sneaker-beta.vercel.app/",
  },
  {
    imgSrc: Flower,
    imgAlt: "flower",
    title: "スクロールイベントのWebサイト",
    description: "ギャラリーサイト/スクロールイベント",
    duration: "3日",
    link: "https://flower-two-tau.vercel.app/",
  },
  {
    imgSrc: WorksImg,
    imgAlt: "work",
    title: "シンプルなサイトのWordPress構築",
    description: "カスタム投稿タイプ、問い合わせフォームなど",
    duration: "3日",
    link: "https://simple-site-black.vercel.app/",
  },
  {
    imgSrc: Building,
    imgAlt: "building",
    title: "建設会社のWebサイト",
    description: "シンプルな配置を意識しました",
    duration: "2日",
    link: "https://building-kappa.vercel.app/",
  },
  {
    imgSrc: BathSalt,
    imgAlt: "bathsalt",
    title: "一般的なLPサイト",
    description: "黄色がベースの爽やかなサイト",
    duration: "2日",
    link: "https://kneipp.vercel.app/",
  },
  {
    imgSrc: Engress,
    imgAlt: "Engress",
    title: "TOEFL英語学習コーポレートサイト",
    description: "WordPressで構築しました",
    duration: "16日",
    link: "/self-introduction/Engress/index.html",
    disabled: true,
  },
  {
    imgSrc: Kadan,
    imgAlt: "Kadan",
    title: "旅館型Webサイト",
    description: "モーダル/マップ埋め込みetc",
    duration: "16日",
    link: "/self-introduction/Kadan/html/index.html",
    disabled: true,
  },
  {
    imgSrc: Sousaku,
    imgAlt: "Sousaku",
    title: "和風なWebサイト模写",
    description: "縦書きレイアウト",
    duration: "1日",
    link: "https://sousaku.vercel.app/",
  },
  {
    imgSrc: Your,
    imgAlt: "YourCoding",
    title: "モダンなデザインのWebサイトの模写",
    description: "アコーディオン、フェードインetc",
    duration: "12日",
    link: "https://your-six.vercel.app/",
  },
];
