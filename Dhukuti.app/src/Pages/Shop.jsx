import React, { useState } from "react";
import {
  useMediaQuery,
  IconButton,
  Typography,
  Drawer,
  Box,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Sidebar from "../Components/ShopComponent/Sidebar";
import Shopmain from "../Components/ShopComponent/Shopmain";
import allProducts from "../Data/Product.jsx";

const Shop = () => {
  const [filters, setFilters] = useState({
    categories: [],
    price: [100, 10000],
  });

  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");

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
        {/* Filter button for mobile */}
        {isMobile && (
          <Box
            className="col-12 mb-3"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            px={2}
          >
            <Typography variant="h6">Filter</Typography>
            <IconButton onClick={() => setDrawerOpen(true)} color="primary">
              <FilterAltIcon />
            </IconButton>
          </Box>
        )}

        {/* Sidebar on desktop */}
        {!isMobile && (
          <div className="col-md-3">
            <Sidebar onFilterChange={handleFilterChange} />
          </div>
        )}

        {/* Drawer for mobile filter */}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{ sx: { width: "80%" } }}
        >
          <Box p={2} pt={4}>
            <Sidebar onFilterChange={handleFilterChange} />
          </Box>
        </Drawer>

        <div className={isMobile ? "col-12" : "col-md-9"}>
          <Shopmain products={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default Shop;
