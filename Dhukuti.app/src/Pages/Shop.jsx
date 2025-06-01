import React from "react";
import Sidebar from "../Components/ShopComponent/Sidebar";
import Shopmain from "../Components/ShopComponent/Shopmain";

const Shop = () => {
  return (
    <>
      <div className="container-fluid mt-5 pt-5">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <Shopmain />
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
