import React, { useEffect, useState } from "react";
import Sidebar from "../Components/ShopComponent/Sidebar";
import Shopmain from "../Components/ShopComponent/Shopmain";
import allProducts from "../Data/Product.jsx";
import { useLocation } from "react-router-dom";

const Shop = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const initialCategory = query.get("category");

  const [filters, setFilters] = useState({
    categories: initialCategory ? [initialCategory] : [],
    price: [100, 10000],
  });

  useEffect(() => {
    // If category changes from URL (on navigation)
    if (initialCategory && !filters.categories.includes(initialCategory)) {
      setFilters((prev) => ({
        ...prev,
        categories: [initialCategory],
      }));
    }
  }, [initialCategory]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

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
          <Sidebar
            onFilterChange={handleFilterChange}
            initialCategories={filters.categories}
          />
        </div>
        <div className="col-md-9 ">
          <Shopmain products={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default Shop;
