import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./Components/Layoutcomponent/Layout";
import Shop from "./Pages/Shop";
import Artisans from "./Pages/Artisans";
import About from "./Pages/About";
import CartPage from "./Pages/Cart";
import Login from "./AuthPage/Login";
import Register from "./AuthPage/Register";
import ScrollToTop from "./Components/ScrollToTop";

import AdminProductList from "./Pages/Adminpages/AdminProductList";
import AdminProductForm from "./Pages/AdminProductForm";
import AdminRoute from "./middleware/AdminRoute"; // ✅ middleware to protect admin pages
import AdminAddProduct from "./Pages/Adminpages/AdminAddProduct";
import AdminOrders from "./Pages/Adminpages/AdminOrders";
import OrderHistory from "./Pages/orderHistory";

const MyRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="artisans" element={<Artisans />} />
          <Route path="about" element={<About />} />
          <Route path="cart" element={<CartPage />} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/orders" element={<OrderHistory />} />

        {/* ✅ Protected Admin Routes */}
        <Route
          path="admin/products"
          element={
            <AdminRoute>
              <AdminProductList />
            </AdminRoute>
          }
        />
        <Route
          path="admin/products/add"
          element={
            <AdminRoute>
              <AdminAddProduct />
            </AdminRoute>
          }
        />
        <Route
          path="admin/products/edit/:id"
          element={
            <AdminRoute>
              <AdminProductForm />
            </AdminRoute>
          }
        />
        <Route
          path="admin/orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
