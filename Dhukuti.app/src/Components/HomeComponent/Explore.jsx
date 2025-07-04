import React from "react";
import { Link } from "react-router-dom";
import Pashmina from "../../assets/Pashmina.png";
import Woolen from "../../assets/Woolen.png";
import Wooden from "../../assets/Wooden2.png";
import ceramic from "../../assets/Ceramic.png";
import thangka from "../../assets/thangka.png";
import statues from "../../assets/Statues.png";

const Explore = () => {
  return (
    <div className="container mt-5 pt-5">
      <h1
        className="text-center "
        style={{
          marginBottom: "80px",
          fontFamily: "Georgia, serif",
          fontWeight: "bold",
        }}
      >
        Explore Our Collection
      </h1>
      <div className="row mt-4">
        {[
          {
            title: "Pashmina",
            description: "Soft and luxurious handcrafted pashmina.",
            src: Pashmina,
            to: "/shop?category=Pashmina",
          },
          {
            title: "Woolen",
            description: "Warm woolen goods straight from the Himalayas.",
            src: Woolen,
            to: "/shop?category=Woolen",
          },
          {
            title: "Wooden Handicrafts",
            description: "Elegant wooden artwork from Nepali artisans.",
            src: Wooden,
            to: "/shop?category=Wooden",
          },
          {
            title: "Ceramic",
            description: "Beautifully crafted ceramic pieces.",
            src: ceramic,
            to: "/shop?category=Ceramic",
          },
          {
            title: "Thangka Art",
            description: "Beautifully hand-painted thangka paintings.",
            src: thangka,
            to: "/shop?category=Thangka Art",
          },
          {
            title: "Statues",
            description: "Intricate statues representing Nepali culture.",
            src: statues,
            to: "/shop?category=Statues",
          },
        ].map((item, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card explore-card text-white position-relative overflow-hidden border-0 ">
              <img
                src={item.src}
                className="card-img"
                alt={item.title}
                style={{ height: "300px", objectFit: "cover" }}
              />
              <div className="card-img-overlay d-flex flex-column justify-content-end bg-dark bg-opacity-50 p-3">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.description}</p>
                <Link
                  to={`/shop?category=${item.title}`}
                  className="btn btn-outline-warning mt-2"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
