import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Dhukuti.png";

const Explore = () => {
  return (
    <div className="container mt-5 pt-5">
      <h1 className="text-center mb-5">Explore Our Collection</h1>
      <div className="row mt-4">
        {[
          {
            title: "Pashmina",
            description: "Soft and luxurious handcrafted pashmina.",
          },
          {
            title: "Woolen",
            description: "Warm woolen goods straight from the Himalayas.",
          },
          {
            title: "Wooden Handicraft",
            description: "Elegant wooden artwork from Nepali artisans.",
          },
          {
            title: "Ceramic Art",
            description: "Beautifully hand-painted ceramic pieces.",
          },
          {
            title: "Ceramic Art",
            description: "Beautifully hand-painted ceramic pieces.",
          },
          {
            title: "Ceramic Art",
            description: "Beautifully hand-painted ceramic pieces.",
          },
        ].map((item, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card text-white position-relative overflow-hidden border-0">
              <img
                src={logo}
                className="card-img"
                alt={item.title}
                style={{ height: "300px", objectFit: "cover" }}
              />
              <div className="card-img-overlay d-flex flex-column justify-content-end bg-dark bg-opacity-50 p-3">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.description}</p>
                <Link to="/" className="btn btn-outline-warning mt-2">
                  View Details
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
