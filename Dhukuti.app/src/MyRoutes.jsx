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
import AdminDashboard from "./Pages/Adminpages/AdminDashboard";
import AdminProductList from "./Pages/Adminpages/AdminProductList";
import AdminAddProduct from "./Pages/Adminpages/AdminAddProduct";
import AdminOrders from "./Pages/Adminpages/AdminOrders";
import AdminUsers from "./Pages/Adminpages/AdminUser";
import AdminRoute from "./Pages/Adminpages/AdminRoute";

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

        {/* ✅ Protected Admin Routes */}
        <Route
          path="admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        >
          <Route path="products" element={<AdminProductList />} />
          <Route path="products/add" element={<AdminAddProduct />} />

          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
