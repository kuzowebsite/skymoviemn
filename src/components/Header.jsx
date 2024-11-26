"use client";
import React from "react";
import Search from "./Search";
import { MdVideoLibrary } from "react-icons/md";
import { NavLink } from "react-router-dom";
import logo from "../assets/logoflix.svg";

const Header = () => {
  return (
    <div className=" justify-normal lg:justify-between gap-4 fixed z-50 top-0 left-0 w-full bg-zinc-950/80 backdrop-blur-sm  px-5  py-1 flex items-center  border-b border-slate-50/10 h-[50px]">
      <NavLink to={`/`}>
        <div>
          <img className="h-9 py-1" src={logo} alt="Rflix" />
        </div>
      </NavLink>

      <div className="flex items-center gap-4 justify-end w-full">
        <Search />
        <NavLink to={`/watchlist`}>
          <i className="text-gray-200 hover:text-white transition-colors">
            <MdVideoLibrary size={20} />
          </i>
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
