import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Box,
  useTheme,
  IconButton,
  Tooltip,
  Paper,
  ClickAwayListener,
  Typography,
} from "@mui/material";
import { AccountCircle, Brightness4, Brightness7 } from "@mui/icons-material";
import { jwtDecode } from "jwt-decode"; // Correct default import

import logo from "../../assets/Dhukuti.png";

const Nav = ({ toggleTheme }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const navigate = useNavigate();
  const location = useLocation();
  const collapseRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // State to toggle profile card visibility
  const [showProfileCard, setShowProfileCard] = useState(false);
  const profileRef = useRef(null);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded);
        setUserData(decoded.user || decoded);
        setIsLoggedIn(true);
      } catch {
        setUserData(null);
        setIsLoggedIn(false);
      }
    } else {
      setUserData(null);
      setIsLoggedIn(false);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserData(null);
    setShowProfileCard(false);
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const closeNavbar = () => {
    const collapseEl = collapseRef.current;
    if (collapseEl?.classList.contains("show")) {
      const bsCollapse = new window.bootstrap.Collapse(collapseEl, {
        toggle: false,
      });
      bsCollapse.hide();
    }
  };

  const navItems = [
    { to: "/", icon: "house-door", label: "Home" },
    { to: "/shop", icon: "shop", label: "Shop" },
    { to: "/artisans", icon: "people", label: "Artisans" },
    { to: "/about", icon: "info-circle", label: "About" },
  ];

  const cartItemCount = 0; // TODO: Replace with actual cart count from context

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
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Logo */}
          <Link to="/" className="navbar-brand d-flex align-items-center me-4">
            <img
              src={logo}
              alt="Dhukuti Logo"
              style={{
                height: "50px",
                width: "auto",
                marginTop: "10px",
                marginLeft: "20px",
              }}
              className="me-2"
            />
          </Link>

          {/* Toggle button for mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar content */}
          <div
            className="collapse navbar-collapse"
            id="mainNavbar"
            ref={collapseRef}
          >
            {/* Left nav links */}
            <ul className="navbar-nav mx-lg-auto gap-lg-4 text-center ms-3 me-auto mb-2 mb-lg-0 d-flex align-items-center gap-2">
              {navItems.map((item) => (
                <li className="nav-item" key={item.to}>
                  <Link
                    to={item.to}
                    className="nav-link d-flex align-items-center"
                    aria-current="page"
                    onClick={closeNavbar}
                  >
                    <i className={`bi bi-${item.icon} me-2`}></i>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Search, Theme, Cart, Profile */}
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

            <div className="d-flex align-items-center position-relative">
              {/* Theme toggle */}
              <IconButton
                sx={{ mr: 2, color: isDark ? "white" : "inherit" }}
                onClick={toggleTheme}
                aria-label="toggle theme"
              >
                {isDark ? <Brightness7 /> : <Brightness4 />}
              </IconButton>

              {/* Cart link */}
              <Link
                to="/cart"
                className="btn btn-link position-relative me-3 p-0"
                onClick={closeNavbar}
              >
                <i className="bi bi-cart3 fs-5 text-warning "></i>
                {cartItemCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {/* Profile icon button with toggle card */}
              {isLoggedIn && userData ? (
                <ClickAwayListener
                  onClickAway={() => setShowProfileCard(false)}
                >
                  <Box sx={{ position: "relative" }}>
                    <Tooltip title="Account">
                      <IconButton
                        onClick={() => setShowProfileCard((prev) => !prev)}
                        sx={{ color: isDark ? "white" : "black" }}
                        aria-haspopup="true"
                        aria-expanded={showProfileCard ? "true" : undefined}
                        aria-label="User account"
                      >
                        <AccountCircle fontSize="large" />
                      </IconButton>
                    </Tooltip>

                    {showProfileCard && (
                      <Paper
                        elevation={3}
                        sx={{
                          position: "absolute",
                          top: "60px",
                          right: 0,
                          width: 220,
                          bgcolor: isDark ? "#333" : "#fff",
                          color: isDark ? "#fff" : "#000",
                          borderRadius: 2,
                          p: 2,
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                          zIndex: 9999,
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          noWrap
                        >
                          {userData?.name || "User"}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }} noWrap>
                          {userData?.email || ""}
                        </Typography>
                        <Link
                          to="/profile"
                          className="text-decoration-none"
                          onClick={() => {
                            setShowProfileCard(false);
                            closeNavbar();
                          }}
                        />
                        <Box
                          component="button"
                          onClick={handleLogout}
                          sx={{
                            cursor: "pointer",
                            color: isDark ? "#f44336" : "#d32f2f",
                            background: "transparent",
                            border: "none",
                            p: 0,
                            fontWeight: "bold",
                            "&:hover": {
                              textDecoration: "underline",
                            },
                          }}
                        >
                          Logout
                        </Box>
                      </Paper>
                    )}
                  </Box>
                </ClickAwayListener>
              ) : (
                <Tooltip title="Account">
                  <IconButton
                    onClick={() => navigate("/login")}
                    sx={{ color: isDark ? "white" : "black" }}
                    aria-label="Login"
                  >
                    <AccountCircle fontSize="large" />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Nav;
