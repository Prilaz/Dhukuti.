import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Components/ShopComponent/Sidebar";
import Shopmain from "../Components/ShopComponent/Shopmain";
import { useLocation } from "react-router-dom";

const Shop = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const initialCategory = query.get("category");

  const [filters, setFilters] = useState({
    categories: [],
    price: [500, 5000],
  });

  const [products, setProducts] = useState([]); // full products fetched
  const [filteredProducts, setFilteredProducts] = useState([]); // filtered products

  // Fetch products from backend once on mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  // Update filter categories if URL param changes
  useEffect(() => {
    if (initialCategory && !filters.categories.includes(initialCategory)) {
      setFilters((prev) => ({
        ...prev,
        categories: [initialCategory],
      }));
    }
  }, [initialCategory]);

  // When products or filters change, compute filtered products
  useEffect(() => {
    const filtered = products.filter((product) => {
      const inCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(product.category);

      const inPrice =
        product.price >= filters.price[0] && product.price <= filters.price[1];

      return inCategory && inPrice;
    });

    setFilteredProducts(filtered);
  }, [products, filters]);

  const handleFilterChange = ({ categories, price }) => {
    setFilters({ categories, price });
  };

  return (
    <div className="container-fluid mt-5 pt-5">
      <div className="row">
        <div className="col-md-3">
          <Sidebar
            onFilterChange={handleFilterChange}
            initialCategories={filters.categories}
          />
        </div>
        <div className="col-md-9">
          <Shopmain products={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default Shop;
