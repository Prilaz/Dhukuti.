import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./Components/Layoutcomponent/Layout";
import Shop from "./Pages/Shop";
import Artisans from "./Pages/Artisans";

const MyRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/artisans" element={<Artisans />} />"
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default MyRoutes;
