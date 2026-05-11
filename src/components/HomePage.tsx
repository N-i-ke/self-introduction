import React from "react";
import SectionTitle from "./SectionTitle";
import WorkItem from "./WorkItem";
import Profile from "./Profile";
import MySkills from "./MySkills";
import Service from "./Service";
import { works } from "../data/works";

const HomePage = () => {
  return (
    <main id="main">
      {/* work */}
      <section id="work">
        <SectionTitle mainTitle="Works" subTitle="My Works" />
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
