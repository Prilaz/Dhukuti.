import React from "react";
import Carousel from "../Components/HomeComponent/Carousel";
import Explore from "../Components/HomeComponent/Explore";
import Breakstep from "../Components/HomeComponent/Breakstep";
import DhukutiServices from "../Components/HomeComponent/Services";

const Home = () => {
  return (
    <>
      <div className="home-container " style={{ marginTop: "5rem" }}>
        <Carousel />
      </div>
      <Explore />
      <Breakstep />
      <div
        className="home-container "
        style={{
          margin: "8rem 0rem",
          padding: "5rem 0rem",
          backgroundColor: "#fff",
        }}
      >
        <DhukutiServices />
      </div>
    </>
  );
};

export default Home;
