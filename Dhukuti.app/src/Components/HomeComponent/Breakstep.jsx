import React from "react";
import mask from "../../assets/mask.png"; // Adjust the path as necessary

const Breakstep = () => {
  return (
    <div className="container mt-5 pt-5">
      <div className="row align-items-center mt-5 pt-5">
        <div className="col-md-6 text-center mb-4 mb-md-0">
          <img
            src={mask}
            alt="Dhukuti Logo"
            className="img-fluid"
            style={{ maxHeight: "300px" }}
          />
        </div>

        <div className="col-md-6 text-center text-md-start">
          <h1 className="mb-4 text-red-500">Get 10% Off on FIRST PURCHASE</h1>
          <p className="lead">
            Discover the richness of Nepali handcrafted heritage — from Pashmina
            and Woolen goods to Wooden Artistry.
          </p>
          <button className="btn btn-outline-warning mt-3">Join Now</button>
        </div>
      </div>
    </div>
  );
};

export default Breakstep;
