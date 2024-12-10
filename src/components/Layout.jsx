import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

const Layout = () => {
  return (
    <div className="layout-container">
      <Header />
      <div className="content mt-[50px]">
        <Outlet />
      </div>
      <Navigation />
      <Footer />
    </div>
  );
};

export default Layout;
