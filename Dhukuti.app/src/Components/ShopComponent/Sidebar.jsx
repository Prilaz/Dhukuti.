import React, { useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  Slider,
  Divider,
} from "@mui/material";

const categories = [
  "Pashmina",
  "Woolen",
  "Wooden",
  "Ceramic",
  "Thanka Art",
  "Brass Statue",
];

const Sidebar = ({ onFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([500, 5000]);

  const handleCategoryChange = (category) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updated);
    onFilterChange?.({ categories: updated, price: priceRange });
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    onFilterChange?.({ categories: selectedCategories, price: newValue });
  };

  return (
    <Box
      sx={{
        p: 3,
        borderRight: "1px solid #e0e0e0",
        height: "100vh",
        position: "sticky",
        top: 0,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>

      <Divider sx={{ mb: 2 }} />

      {/* Categories */}
      <Typography variant="subtitle1" gutterBottom>
        Categories
      </Typography>
      <FormGroup>
        {categories.map((category) => (
          <FormControlLabel
            key={category}
            control={
              <Checkbox
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
            }
            label={category}
          />
        ))}
      </FormGroup>

      <Divider sx={{ my: 3 }} />

      {/* Price */}
      <Typography variant="subtitle1" gutterBottom>
        Price Range (Rs)
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        Rs {priceRange[0].toLocaleString()} - Rs{" "}
        {priceRange[1].toLocaleString()}
      </Typography>
      <Slider
        value={priceRange}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        min={100}
        max={10000}
        step={100}
      />
    </Box>
  );
};

export default Sidebar;
