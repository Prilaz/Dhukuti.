import React from "react";
import Carousel from "../Components/HomeComponent/Carousel";
import Explore from "../Components/HomeComponent/Explore";
import Breakstep from "../Components/HomeComponent/Breakstep";

const Home = () => {
  return (
    <>
      <div className="home-container " style={{ marginTop: "5rem" }}>
        <Carousel />
      </div>
      <Explore />
      <Breakstep />
    </>
  );
};

export default Home;
