// import React from "react";
import Brands from "../Brands/Brands";
import Categories from "../Categories/Categories";
import Electronics from "../Electronics/Electronics";
import RecommendedHome from "../Recommended/RecommendedHome";
import SliderHome from "../Slider/SliderHome";

import Wrapper from "../Wrapper/Wrapper";

function Home() {
  return (
    <div className="home">
      <SliderHome />
      <Categories />
      <Wrapper />
      <RecommendedHome />
      <Brands />
      <Electronics />
    </div>
  );
}

export default Home;
