import React from "react";
import { Link } from "react-router-dom";
import C1 from "../../assets/C1.png";
import C2 from "../../assets/C2.png";
import Wooden from "../../assets/Wooden2.png";
import W from "../../assets/W.png";
import p1 from "../../assets/p1.jpg";

const MyCarousel = () => {
  const slides = [
    {
      image: C1,
      title: "Beautiful Craftsmanship from Nepal",
      description: "Discover unique handmade pieces rooted in rich tradition.",
      buttonText: "Explore Collection",
      link: "/shop",
    },
    {
      image: C2,
      title: "Timeless Art Passed Through Generations",
      description: "Each item tells a story of heritage and skill.",
      buttonText: "Shop Now",
      link: "/shop",
    },
    {
      image: Wooden,
      title: "Explore Unique Wooden Handicrafts",
      description: "Elegance and tradition carved into every design.",
      buttonText: "View Products",
      link: "/shop",
    },
    {
      image: W,
      title: "Explore Unique Wooden Handicrafts",
      description: "Elegance and tradition carved into every design.",
      buttonText: "View Products",
      link: "/shop",
    },
    {
      image: p1,
      title: "Explore Unique Wooden Handicrafts",
      description: "Elegance and tradition carved into every design.",
      buttonText: "View Products",
      link: "/shop",
    },
  ];

  return (
    <div
      id="carouselDark"
      className="carousel carousel-dark slide"
      data-bs-ride="carousel"
    >
      {/* Indicators */}
      <div className="carousel-indicators">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            data-bs-target="#carouselDark"
            data-bs-slide-to={i}
            className={i === 0 ? "active" : ""}
            aria-label={`Slide ${i + 1}`}
          ></button>
        ))}
      </div>

      {/* Slides */}
      <div className="carousel-inner">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`carousel-item ${i === 0 ? "active" : ""}`}
            data-bs-interval="5000"
          >
            <img
              src={slide.image}
              className="d-block w-100 carousel-img"
              alt={`Slide ${i + 1}`}
              style={{ height: "65vh", objectFit: "cover" }}
            />
            <div
              className="carousel-caption d-none d-md-block"
              style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <h2 style={{ color: "white", fontWeight: "bold" }}>
                {slide.title}
              </h2>
              <p style={{ color: "#eee", fontSize: "1.1rem" }}>
                {slide.description}
              </p>
              <Link
                to={slide.link}
                className="btn btn-warning mt-2 px-4 py-2"
                style={{ fontWeight: "600", borderRadius: "30px" }}
              >
                {slide.buttonText}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselDark"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselDark"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default MyCarousel;
