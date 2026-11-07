import React from "react";
import Carousel from "../components/Carousel.jsx";
import Collections from "../components/Collections.jsx";
import Category from "../components/Category.jsx";
import Trending from "../components/Trending.jsx";
import Selections from "../components/Selections.jsx";
import Story from "../components/VideoPlay";
import QualitySection from "../components/QualitySection";
import ArrivalSection from "../components/ArrivalSection";
import ExperienceSection from "../components/ExperienceSection.jsx";
import Gender from "../components/Gender.jsx";
import Footer from "../components/Footer.jsx";

const Home = () => {
  return (
    <>
      <Carousel />
      <Collections />
      <Category />
      <Trending />
      <Selections />
      <ArrivalSection />
      <Story />
      <QualitySection />
      <Gender />
      <ExperienceSection />
      <Footer />
    </>
  );
};

export default Home;
