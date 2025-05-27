import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { Box, useTheme } from "@mui/material";

const Nav = () => {
  const theme = useTheme();
  const notificationCount = 5;

  const isDark = theme.palette.mode === "dark";
  const textColor = isDark ? "text-light" : "text-dark";
  const bgColor = isDark ? "bg-dark" : "bg-white";

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <nav
        className={`navbar navbar-expand-lg ${bgColor} shadow-sm py-2 px-3 fixed-top`}
      >
        <div className="container-fluid d-flex align-items-center">
          {/* Logo */}
          <Link to="/" className="navbar-brand text-base fw-semibold">
            <i className="bi bi-linkedin fs-1 text-primary" />
          </Link>

          {/* Search Bar */}
          <form className="d-flex flex-grow-1 mx-3" role="search">
            <div className="input-group">
              <input
                className={`form-control rounded-pill border-secondary ${
                  isDark ? "bg-dark text-light" : ""
                }`}
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </div>
          </form>

          {/* Toggle Button for Mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span
              className="navbar-toggler-icon"
              sx={{
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
              }}
            ></span>
          </button>

          {/* Navbar Items */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto align-items-center gap-3">
              {[
                { to: "/", icon: "house-door-fill", label: "Home" },
                { to: "/mynetwork", icon: "people-fill", label: "My Network" },
                { to: "/Job", icon: "briefcase-fill", label: "Jobs" },
                {
                  to: "/messages",
                  icon: "chat-left-text-fill",
                  label: "Messaging",
                },
              ].map(({ to, icon, label }) => (
                <li className="nav-item" key={to}>
                  <Link
                    to={to}
                    className={`nav-link ${textColor} fw-semibold d-flex flex-column align-items-center nav-hover`}
                  >
                    <i className={`bi bi-${icon} fs-5`}></i>
                    {label}
                  </Link>
                </li>
              ))}

              {/* Notifications */}
              <li className="nav-item position-relative">
                <Link
                  to="/notifications"
                  className={`nav-link ${textColor} fw-semibold d-flex flex-column align-items-center nav-hover`}
                >
                  <i className="bi bi-bell-fill fs-5 position-relative">
                    {notificationCount > 0 && (
                      <span className="badge bg-danger notification-badge">
                        {notificationCount}
                      </span>
                    )}
                  </i>
                  Notifications
                </Link>
              </li>

              {/* Profile Dropdown */}
              <li className="nav-item dropdown">
                <button
                  className={`nav-link dropdown-toggle ${textColor} fw-semibold d-flex flex-column align-items-center nav-hover`}
                  data-bs-toggle="dropdown"
                >
                  <i className="bi bi-person-circle fs-5"></i>
                  Me
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="#" className="dropdown-item">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="dropdown-item">
                      Settings
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link to="/login" className="dropdown-item">
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Business Dropdown */}
              <li className="nav-item dropdown">
                <button
                  className={`nav-link dropdown-toggle ${textColor} fw-semibold d-flex flex-column align-items-center nav-hover`}
                  data-bs-toggle="dropdown"
                >
                  <i className="bi bi-grid-3x3-gap-fill fs-5"></i>
                  For Business
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="#" className="dropdown-item">
                      Business Services
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="dropdown-item">
                      Advertise
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link to="#" className="dropdown-item">
                      More
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Premium Offer */}
              <li className="nav-item">
                <Link
                  to="#"
                  className={`nav-link text-primary fw-bold nav-hover`}
                >
                  Try Premium for $0
                </Link>
              </li>
            </ul>
          </div>

          {/* Theme Toggle Button */}
          <div>
            <ToggleThemeButton />
          </div>
        </div>
      </nav>
    </Box>
  );
};

export default Nav;
