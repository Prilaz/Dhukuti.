import React from "react";
import Carousel from "../Components/HomeComponent/Carousel";
import Explore from "../Components/HomeComponent/Explore";

const Home = () => {
  return (
    <>
      <div className="home-container " style={{ marginTop: "6rem" }}>
        <Carousel />
      </div>
      <Explore />
    </>
  );
};

export default Home;
