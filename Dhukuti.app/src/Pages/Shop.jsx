import React, { useState } from "react";
import Sidebar from "../Components/ShopComponent/Sidebar";
import Shopmain from "../Components/ShopComponent/Shopmain";
import allProducts from "../Data/Product.jsx";

const Shop = () => {
  const [filters, setFilters] = useState({
    categories: [],
    price: [100, 10000],
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Filter products based on selected filters
  const filteredProducts = allProducts.filter((product) => {
    const inCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(product.category);
    const inPrice =
      product.price >= filters.price[0] && product.price <= filters.price[1];

    return inCategory && inPrice;
  });

  return (
    <div className="container-fluid mt-5 pt-5">
      <div className="row">
        <div className="col-md-3">
          <Sidebar onFilterChange={handleFilterChange} />
        </div>
        <div className="col-md-9">
          <Shopmain products={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default Shop;
