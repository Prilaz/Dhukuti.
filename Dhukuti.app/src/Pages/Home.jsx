import React from "react";
import Carousel from "../Components/HomeComponent/Carousel";
import Explore from "../Components/HomeComponent/Explore";
import Breakstep from "../Components/HomeComponent/Breakstep";
import DhukutiServices from "../Components/HomeComponent/Services";

const Home = () => {
  return (
    <>
      <div
        className="home-container "
        style={{
          marginTop: "5rem",

          backgroundColor: "	#FFFFFF",
        }}
      >
        <Carousel />
      </div>
      <div className="home-container mt-0">
        <Explore />
      </div>
      <div>
        <Breakstep />
      </div>
      <div>
        <DhukutiServices />
      </div>
    </>
  );
};

export default Home;
