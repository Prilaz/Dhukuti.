import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./Components/Layoutcomponent/Layout";
import Shop from "./Pages/Shop";
import Artisans from "./Pages/Artisans";
import "./App.css";
import Login from "./AuthPage/Login";
import Register from "./AuthPage/Register";
import ScrollToTop from "./Components/ScrollToTop";
import AdminDashboard from "./Pages/Admin";

const MyRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/artisans" element={<Artisans />} />"
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Add more routes as needed */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default MyRoutes;
