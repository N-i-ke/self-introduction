import SectionTitle from "../SectionTitle";
import WorkItem from "../WorkItem";
import Profile from "../Profile";
import MySkills from "../MySkills";
import Service from "../Service";
import { works } from "../../data/works";
import { useLocale, type Locale } from "../../contexts/LocaleContext";

const subtitles: Record<Locale, Record<"work" | "about" | "skill" | "service", string>> = {
  ja: {
    work: "実績一覧",
    about: "私について",
    skill: "保有スキル",
    service: "提供できること",
  },
  en: {
    work: "My Works",
    about: "About",
    skill: "My Skills",
    service: "My Service",
  },
};

const HomePage = () => {
  const { locale } = useLocale();
  const t = subtitles[locale];

  return (
    <main id="main">
      {/* work */}
      <section id="work">
        <SectionTitle mainTitle="Works" subTitle={t.work} />
        <div className="work-wrapper">
          <ul>
            {works.map((work) => (
              <WorkItem key={work.title} {...work} />
            ))}
          </ul>
        </div>
      </section>
      {/* about */}
      <section id="about">
        <SectionTitle mainTitle="About" subTitle={t.about} />
        <Profile />
      </section>
      {/* image-sec */}
      <div className="image-sec"></div>
      <section id="skill">
        <SectionTitle mainTitle="Skills" subTitle={t.skill} />
        <MySkills />
      </section>
      {/* service */}
      <section id="service">
        <SectionTitle mainTitle="Service" subTitle={t.service} />
        <Service />
      </section>
    </main>
  );
};

export default HomePage;
