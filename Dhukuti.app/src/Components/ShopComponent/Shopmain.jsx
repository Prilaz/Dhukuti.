import React from "react";

import { Link } from "react-router-dom";
import products from "../../Data/Product";

const Shopmain = () => {
  return (
    <div className="row">
      {products.map((product, idx) => (
        <div className="col-md-4 mb-4" key={idx}>
          <div className="card h-100">
            <img
              src={product.image}
              className="card-img-top"
              alt={product.title}
            />
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">{product.description}</p>
              <p className="text-muted">Rs.{product.price}</p>
              <Link to="/" className="btn btn-outline-warning">
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shopmain;
