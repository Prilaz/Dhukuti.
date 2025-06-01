import React from "react";

const Sidebar = () => {
  return (
    <div className="sidebar p-4 bg-light h-100 position-sticky top-0">
      <h5 className="mb-4">Filter Products</h5>

      {/* Category Filter */}
      <div className="mb-4">
        <h6>Category</h6>
        <div>
          <input type="checkbox" /> Pashmina
        </div>
        <div>
          <input type="checkbox" /> Woolen
        </div>
        <div>
          <input type="checkbox" /> Wooden
        </div>
        <div>
          <input type="checkbox" /> Ceramic
        </div>
        <div>
          <input type="checkbox" /> Thangka
        </div>
        <div>
          <input type="checkbox" /> Statues
        </div>
      </div>

      {/* Price Filter */}
      <div className="mb-4">
        <h6>Price Range</h6>
        <input type="range" min="0" max="500" className="form-range" />
        <div className="d-flex justify-content-between">
          <span>$0</span>
          <span>$500</span>
        </div>
      </div>

      {/* Sort */}
      <div className="mb-4">
        <h6>Sort By</h6>
        <select className="form-select">
          <option value="latest">Latest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default Sidebar;
