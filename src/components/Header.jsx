"use client";
import React from "react";
import Search from "./Search";
import { MdVideoLibrary } from "react-icons/md";
import { NavLink } from "react-router-dom";
import logo from "../assets/logoflix.svg";

const Header = () => {
  return (
    <div className="fixed z-50 top-0 left-0 w-full p-4 bg-teal-950 px-5  py-3 flex items-center justify-between">
      <NavLink to={`/`}>
        <div>
          <img className="h-9 lg:h-10" src={logo} alt="Rflix" />
        </div>
      </NavLink>

      <div className="flex items-center gap-4">
        <Search />
        <NavLink to={`/watchlist`}>
          <i className="text-gray-200 hover:text-white transition-colors">
            <MdVideoLibrary size={25} />
          </i>
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
