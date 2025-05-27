import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Box, useTheme, IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

const Nav = ({ toggleTheme }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const isDark = theme.palette.mode === "dark";

  // Mock data
  const cartItemCount = 0;

  const navItems = [
    { to: "/", icon: "house-door", label: "Home" },
    { to: "/shop", icon: "shop", label: "Shop" },
    { to: "/artisans", icon: "people", label: "Artisans" },
    { to: "/about", icon: "info-circle", label: "About" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <Box
      component="nav"
      sx={{
        "& .navbar": {
          minHeight: "80px",
          padding: "1rem 0",
        },
        "& .nav-link": {
          fontSize: "1.1rem",
          padding: "0.8rem 1.2rem",
        },
      }}
    >
      <div
        className={`navbar navbar-expand-lg ${
          isDark ? "bg-dark" : "bg-light"
        } shadow-sm py-2 fixed-top`}
      >
        <div className="container-fluid position-relative d-flex align-items-center justify-content-between">
          {/* Left: Logo */}
          <Link
            to="/"
            className="navbar-brand fw-bold fs-4 d-flex align-items-center me-3"
          >
            <span className="text-warning">Dhukuti</span>
            <span className="text-muted">.</span>
          </Link>

          {/* Center: Navigation */}
          <div
            className="position-absolute start-50 translate-middle-x d-none d-lg-block"
            style={{ zIndex: 1 }}
          >
            <ul className="navbar-nav flex-row align-items-center gap-3">
              {navItems.map((item) => (
                <li className="nav-item" key={item.to}>
                  <Link
                    to={item.to}
                    className="nav-link d-flex align-items-center"
                  >
                    <i className={`bi bi-${item.icon} me-1`}></i>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Search and Actions */}
          <div className="d-flex align-items-center ms-auto">
            {/* Search Form */}
            <form className="d-flex me-3" onSubmit={handleSearch}>
              <div className="input-group">
                <input
                  className={`form-control ${
                    isDark ? "bg-dark text-light border-secondary" : ""
                  }`}
                  type="search"
                  placeholder="Search handmade treasures..."
                  aria-label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  className={`btn ${
                    isDark ? "btn-outline-light" : "btn-outline-dark"
                  }`}
                  type="submit"
                >
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </form>

            {/* Theme Toggle */}
            <IconButton
              sx={{ mr: 2, color: isDark ? "white" : "inherit" }}
              onClick={toggleTheme}
              aria-label="toggle theme"
            >
              {isDark ? <Brightness7 /> : <Brightness4 />}
            </IconButton>

            {/* Cart */}
            <Link
              to="/cart"
              className="btn btn-link position-relative me-3 p-0"
            >
              <i className="bi bi-cart3 fs-5"></i>
              {cartItemCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Login */}
            <Link to="/login" className="btn btn-outline-primary">
              Login
            </Link>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Nav;
