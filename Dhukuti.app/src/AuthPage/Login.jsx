import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // ✅ Named import
import logo from "../assets/Dhukuti.png";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.message || "Login failed");
      }

      const result = await response.json();

      // ✅ Save JWT token to localStorage
      localStorage.setItem("token", result.token);

      // ✅ Decode token to get user role
      const decoded = jwtDecode(result.token);
      console.log(decoded.role);
      const userRole = decoded.role;

      // ✅ Redirect based on role
      if (userRole === "admin") {
        navigate("/admin/products");
      } else {
        navigate("/"); // Home or user dashboard
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 shadow"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="text-center mb-4">
          <img src={logo} alt="Logo" width="100" />
          <h3 className="mt-3">Sign In</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-warning text-dark">
              Sign In
            </button>
          </div>
        </form>
        <p className="mt-3 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-decoration-none">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
