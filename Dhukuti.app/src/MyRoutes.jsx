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
import AdminDashboard from "./Pages/Adminpages/AdminAddProduct";
import About from "./Pages/About";
import AdminAddProduct from "./Pages/Adminpages/AdminAddProduct";
import AdminProductList from "./Pages/Adminpages/AdminProductList";
import CartPage from "./Pages/Cart";
import AdminProductForm from "./Pages/AdminProductForm";

const MyRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/artisans" element={<Artisans />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<CartPage />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/admin/products/add" element={<AdminAddProduct />} />
          <Route path="/admin/products" element={<AdminProductList />} />

          <Route path="/admin/products/add" element={<AdminProductForm />} />
          <Route
            path="/admin/products/edit/:id"
            element={<AdminProductForm />}
          />

          {/* Add more routes as needed */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default MyRoutes;
