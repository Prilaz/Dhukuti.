import React from "react";
import logo from "../../assets/Dhukuti.png";

const Breakstep = () => {
  return (
    <div className="container mt-5 pt-5">
      <div className="row align-items-center mt-5 pt-5">
        <div className="col-md-6 text-center mb-4 mb-md-0">
          <img
            src={logo}
            alt="Dhukuti Logo"
            className="img-fluid"
            style={{ maxHeight: "300px" }}
          />
        </div>

        <div className="col-md-6 text-center text-md-start">
          <h1 className="mb-4">Explore Our Collection</h1>
          <p className="lead">
            Discover the richness of Nepali handcrafted heritage — from Pashmina
            and Woolen goods to Wooden Artistry.
          </p>
          <button className="btn btn-outline-warning mt-3">Shop Now</button>
        </div>
      </div>
    </div>
  );
};

export default Breakstep;
