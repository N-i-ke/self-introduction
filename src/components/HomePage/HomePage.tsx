import SectionTitle from "../SectionTitle";
import WorkItem from "../WorkItem";
import ScrollStack, { ScrollStackItem } from "../ScrollStack";
import Profile from "../Profile";
import MySkills from "../MySkills";
import Service from "../Service";
import { works, type Work } from "../../data/works";
import { useLocale, type Locale } from "../../contexts/LocaleContext";
import { useViewport } from "../../hooks/useViewport";

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

const SCROLL_STACK_PROPS = {
  useWindowScroll: true as const,
  itemDistance: 120,
  itemStackDistance: 28,
  stackPosition: "22%",
  scaleEndPosition: "12%",
  baseScale: 0.88,
};

const renderWorkItem = (work: Work) => (
  <ScrollStackItem key={work.title} itemClassName="work-stack-card">
    <WorkItem {...work} />
  </ScrollStackItem>
);

const HomePage = () => {
  const { locale } = useLocale();
  const t = subtitles[locale];
  const { isMobile } = useViewport();

  const half = Math.ceil(works.length / 2);
  const leftWorks = works.slice(0, half);
  const rightWorks = works.slice(half);

  return (
    <main id="main">
      {/* work */}
      <section id="work">
        <SectionTitle mainTitle="Works" subTitle={t.work} />
        <div className="work-wrapper">
          {isMobile ? (
            <ScrollStack className="work-stack" {...SCROLL_STACK_PROPS}>
              {works.map(renderWorkItem)}
            </ScrollStack>
          ) : (
            <div className="work-stacks-grid">
              <ScrollStack className="work-stack" {...SCROLL_STACK_PROPS}>
                {leftWorks.map(renderWorkItem)}
              </ScrollStack>
              <ScrollStack className="work-stack" {...SCROLL_STACK_PROPS}>
                {rightWorks.map(renderWorkItem)}
              </ScrollStack>
            </div>
          )}
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
