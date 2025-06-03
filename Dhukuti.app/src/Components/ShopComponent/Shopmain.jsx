import React from "react";
import ProductCard from "../../Data/ProductCard";

const Shopmain = ({ products }) => {
  return (
    <div className="row">
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))
      )}
    </div>
  );
};

export default Shopmain;
