import React from "react";
import { Link } from "react-router-dom";

import p1 from "../../assets/p1.png";
import p2 from "../../assets/p2.png";
import p3 from "../../assets/p3.png";
import p4 from "../../assets/p4.png";
import p5 from "../../assets/p5.png";

const MyCarousel = () => {
  const slides = [
    {
      image: p1,
      title: "Explore Unique Nepali Handicrafts",
      description: "Discover the beauty of handcrafted art.",
      buttonText: "Shop Now",
      link: "/shop",
    },
    {
      image: p2,
      title: " Find Your Perfect Handmade Creamic Piece",
      description: " Crafted with love and tradition.",
      buttonText: "Shop Now",
      link: "/shop",
    },
    {
      image: p3,
      title: "Thangka Art: A Journey Through Culture",
      description: " Experience the spiritual essence of Nepal.",
      buttonText: "Shop Now",
      link: "/shop",
    },
    {
      image: p4,
      title: "Explore Unique Wooden Handicrafts",
      description: "Elegance and tradition carved into every design.",
      buttonText: "Shop Now",
      link: "/shop",
    },
    {
      image: p5,
      title: "Statues: A Touch of Nepali Heritage",
      description: " Intricate craftsmanship that tells a story.",
      buttonText: "Shop Now",
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
              style={{ height: "70vh", objectFit: "cover" }}
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
