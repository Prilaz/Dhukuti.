import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme, IconButton, Fab, Zoom } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";
import logo from "../../assets/Dhukuti.png";

const Footer = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [showScroll, setShowScroll] = useState(false);

  const handleScroll = () => {
    setShowScroll(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <footer
        className={`pt-5 pb-4 mt-5 ${
          isDark ? "bg-dark text-light" : "bg-light text-dark"
        }`}
      >
        <div className="container">
          <div className="row text-center text-md-start">
            {/* Logo and About */}
            <div className="col-md-4 mb-4">
              <Link to="/" className="d-flex align-items-center mb-3">
                <img
                  src={logo}
                  alt="Dhukuti Logo"
                  style={{ height: "60px" }}
                  className="me-2"
                />
                <span className="fs-5 fw-bold text-warning"></span>
              </Link>
              <p className="small">
                Discover Nepal’s finest handmade treasures crafted by skilled
                artisans.
              </p>
              {/* Social Media */}
              <div className="mt-3">
                <a
                  href="https://facebook.com"
                  className="me-3 text-reset"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="bi bi-facebook fs-5"></i>
                </a>
                <a
                  href="https://instagram.com"
                  className="me-3 text-reset"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="bi bi-instagram fs-5"></i>
                </a>
                <a
                  href="https://twitter.com"
                  className="me-3 text-reset"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="bi bi-twitter fs-5"></i>
                </a>
                <a
                  href="https://youtube.com"
                  className="text-reset"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="bi bi-youtube fs-5"></i>
                </a>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="col-md-4 mb-4">
              <h6 className="fw-bold mb-3">Quick Links</h6>
              <ul className="list-unstyled">
                <li>
                  <Link to="/" className="text-decoration-none text-reset">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/shop" className="text-decoration-none text-reset">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link
                    to="/artisans"
                    className="text-decoration-none text-reset"
                  >
                    Artisans
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-decoration-none text-reset">
                    About
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="col-md-4 mb-4">
              <h6 className="fw-bold mb-3">Contact</h6>
              <p className="mb-1">
                <i className="bi bi-geo-alt me-2"></i> Kathmandu, Nepal
              </p>
              <p className="mb-1">
                <i className="bi bi-envelope me-2"></i> support@dhukuti.com
              </p>
              <p>
                <i className="bi bi-phone me-2"></i> +977 9800000000
              </p>
            </div>
          </div>

          <hr />
          <div className="text-center small">
            &copy; {new Date().getFullYear()} Dhukuti. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <Zoom in={showScroll}>
        <Fab
          onClick={scrollToTop}
          size="small"
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            bgcolor: isDark ? "#555" : "white",
            color: isDark ? "white" : "black",
            boxShadow: 3,
            ":hover": {
              bgcolor: isDark ? "#666" : "#f0f0f0",
            },
          }}
          aria-label="scroll back to top"
        >
          <KeyboardArrowUp />
        </Fab>
      </Zoom>
    </>
  );
};

export default Footer;
