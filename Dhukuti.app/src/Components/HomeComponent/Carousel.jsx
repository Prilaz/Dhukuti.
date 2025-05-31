import React from "react";
import C1 from "../../assets/C1.png";
import C2 from "../../assets/C2.png";
import Wooden from "../../assets/Wooden2.png";

const MyCarousel = () => {
  return (
    <div
      id="carouselDark"
      className="carousel carousel-dark slide"
      data-bs-ride="carousel"
    >
      {/* Indicators */}
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselDark"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselDark"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselDark"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>

      {/* Carousel Items */}
      <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval="5000">
          <img src={C1} className="d-block w-100 carousel-img" alt="Slide 1" />
          <div className="carousel-caption d-none d-md-block">
            <h5>First Slide</h5>
            <p>Beautiful craftsmanship from Nepal.</p>
          </div>
        </div>
        <div className="carousel-item" data-bs-interval="5000">
          <img src={C2} className="d-block w-100 carousel-img" alt="Slide 2" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Second Slide</h5>
            <p>Timeless art passed down through generations.</p>
          </div>
        </div>
        <div className="carousel-item" data-bs-interval="5000">
          <img
            src={Wooden}
            className="d-block w-100 carousel-img"
            alt="Slide 3"
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Third Slide</h5>
            <p>Explore unique wooden handicrafts.</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselDark"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselDark"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default MyCarousel;
