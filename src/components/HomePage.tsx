import React from "react";
import SectionTitle from "./SectionTitle";
import WorkItem from "./WorkItem";
import Profile from "./Profile";
import MySkills from "./MySkills";
import Service from "./Service";
import Sneaker from "../Image/sneaker.png";
import Flower from "../Image/ohana.png";
import Work from "../Image/works.png";
import Building from "../Image/kensetu.png";
import BathSalt from "../Image/kunaipu.png";
import Engress from "../Image/Engress.png";
import Kadan from "../Image/kadan.png";
import Sousaku from "../Image/sousaku.png";
import Your from "../Image/your.png";

const HomePage = () => {
  return (
    <main id="main">
      {/* work */}
      <section id="work">
        <SectionTitle mainTitle="Works" subTitle="My Works" />
        <div className="work-wrapper">
          <ul>
            <WorkItem
              imgSrc={Sneaker}
              imgAlt="sneaker"
              title="動画付きカルーセル"
              description="カルーセルグリッドレイアウト"
              duration="2日"
              link="../Works/sneaker.html"
            />
            <WorkItem
              imgSrc={Flower}
              imgAlt="flower"
              title="スクロールイベントのWebサイト"
              description="ギャラリーサイト/スクロールイベント"
              duration="3日"
              link="/"
            />
            <WorkItem
              imgSrc={Work}
              imgAlt="work"
              title="シンプルなサイトのWordPress構築"
              description="カスタム投稿タイプ、問い合わせフォームなど"
              duration="3日"
              link="/"
            />
            <WorkItem
              imgSrc={Building}
              imgAlt="building"
              title="建設会社のWebサイト"
              description="シンプルな配置を意識しました"
              duration="2日"
              link="/"
            />
            <WorkItem
              imgSrc={BathSalt}
              imgAlt="bathsalt"
              title="一般的なLPサイト"
              description="黄色がベースの爽やかなサイト"
              duration="2日"
              link="/"
            />
            <WorkItem
              imgSrc={Engress}
              imgAlt="Engress"
              title="TOEFL英語学習コーポレートサイト"
              description="WordPressで構築しました"
              duration="16日"
              link="/"
            />
            <WorkItem
              imgSrc={Kadan}
              imgAlt="Kadan"
              title="旅館型Webサイト"
              description="モーダル/マップ埋め込みetc"
              duration="16日"
              link="/"
            />
            <WorkItem
              imgSrc={Sousaku}
              imgAlt="Sousaku"
              title="和風なWebサイト模写"
              description="縦書きレイアウト"
              duration="1日"
              link="/"
            />
            <WorkItem
              imgSrc={Your}
              imgAlt="YourCoding"
              title="モダンなデザインのWebサイトの模写"
              description="アコーディオン、フェードインetc"
              duration="12日"
              link="/"
            />
          </ul>
        </div>
      </section>
      {/* about */}
      <section id="about">
        <SectionTitle mainTitle="About" subTitle="About" />
        <Profile />
      </section>
      {/* image-sec */}
      <div className="image-sec"></div>
      <section id="skill">
        <SectionTitle mainTitle="Skills" subTitle="My Skills" />
        <MySkills />
      </section>
      {/* service */}
      <section id="service">
        <SectionTitle mainTitle="Service" subTitle="My Service" />
        <Service />
      </section>
    </main>
  );
};

export default HomePage;
