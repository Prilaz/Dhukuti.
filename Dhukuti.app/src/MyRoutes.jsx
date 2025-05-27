import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./Components/Layoutcomponent/Layout";
import Shop from "./Pages/Shop";

const MyRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/shop" element={<Shop />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default MyRoutes;
