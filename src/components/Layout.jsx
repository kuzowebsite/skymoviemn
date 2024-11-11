import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="mt-14">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
