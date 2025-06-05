import React, { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  Slider,
  Divider,
  Drawer,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { Tune } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const categories = [
  "Pashmina",
  "Woolen",
  "Wooden Handicrafts",
  "Ceramic",
  "Thangka Art",
  "Statue",
];

const SIDEBAR_WIDTH = 360;

const SidebarContent = ({
  selectedCategories,
  handleCategoryChange,
  priceRange,
  handlePriceChange,
}) => (
  <Box sx={{ p: 3, width: SIDEBAR_WIDTH }}>
    <Typography variant="h6" gutterBottom>
      Filters
    </Typography>

    <Divider sx={{ mb: 2 }} />

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

    <Typography variant="subtitle1" gutterBottom>
      Price Range (Rs)
    </Typography>
    <Typography variant="body2" sx={{ mb: 1 }}>
      Rs {priceRange[0].toLocaleString()} - Rs {priceRange[1].toLocaleString()}
    </Typography>
    <Slider
      value={priceRange}
      onChange={handlePriceChange}
      valueLabelDisplay="auto"
      min={100}
      max={10000}
      step={100}
      sx={{
        color: "#ffc107",
        "& .MuiSlider-thumb": {
          backgroundColor: "#ffc107",
        },
        "& .MuiSlider-track": {
          backgroundColor: "#ffc107",
        },
        "& .MuiSlider-rail": {
          backgroundColor: "#eee",
        },
      }}
    />
  </Box>
);

const Sidebar = ({ onFilterChange, initialCategories = [] }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [selectedCategories, setSelectedCategories] =
    useState(initialCategories);
  const [priceRange, setPriceRange] = useState([500, 5000]);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setSelectedCategories(initialCategories);
  }, [initialCategories]);

  useEffect(() => {
    onFilterChange?.({ categories: selectedCategories, price: priceRange });
  }, [selectedCategories, priceRange]);

  const handleCategoryChange = (category) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updated);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      {isMobile ? (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 2,
              py: 1.5,
              backgroundColor: "#f5f5f5",
              borderBottom: "1px solid #ddd",
            }}
          >
            <Typography variant="h6">Filter</Typography>
            <IconButton onClick={toggleDrawer}>
              <Tune />
            </IconButton>
          </Box>

          <Drawer
            anchor="left"
            open={mobileOpen}
            onClose={toggleDrawer}
            ModalProps={{ keepMounted: true }}
          >
            <SidebarContent
              selectedCategories={selectedCategories}
              handleCategoryChange={handleCategoryChange}
              priceRange={priceRange}
              handlePriceChange={handlePriceChange}
            />
          </Drawer>
        </>
      ) : (
        <Box
          sx={{
            p: 3,
            borderRight: "1px solid #e0e0e0",
            height: "100vh",
            position: "sticky",
            top: 0,
            width: SIDEBAR_WIDTH,
          }}
        >
          <SidebarContent
            selectedCategories={selectedCategories}
            handleCategoryChange={handleCategoryChange}
            priceRange={priceRange}
            handlePriceChange={handlePriceChange}
          />
        </Box>
      )}
    </>
  );
};

export default Sidebar;
