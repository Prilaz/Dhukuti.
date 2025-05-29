import React from "react";

const Explore = () => {
  return (
    <>
      <div className="container mt-5 pt-5">
        <h1 className="text-center mb-4">Explore Our Collection</h1>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card">
              <img
                src="https://via.placeholder.com/300"
                className="card-img-top"
                alt="Product 1"
              />
              <div className="card-body">
                <h5 className="card-title">Product 1</h5>
                <p className="card-text">Description of Product 1.</p>
                <a href="#" className="btn btn-primary">
                  View Details
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <img
                src="https://via.placeholder.com/300"
                className="card-img-top"
                alt="Product 2"
              />
              <div className="card-body">
                <h5 className="card-title">Product 2</h5>
                <p className="card-text">Description of Product 2.</p>
                <a href="#" className="btn btn-primary">
                  View Details
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <img
                src="https://via.placeholder.com/300"
                className="card-img-top"
                alt="Product 3"
              />
              <div className="card-body">
                <h5 className="card-title">Product 3</h5>
                <p className="card-text">Description of Product 3.</p>
                <a href="#" className="btn btn-primary">
                  View Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* <-- This was missing */}
    </>
  );
};

export default Explore;
