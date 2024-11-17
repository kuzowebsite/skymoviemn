"use client";
import React from "react";
import Search from "./Search";
import { MdVideoLibrary } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="fixed z-50 top-0 left-0 w-full p-4 bg-zinc-950/70 px-5 border-b-1 bg-opacity-50 backdrop-blur-sm  border-b border-zinc-800   py-3 flex items-center justify-between">
      <NavLink to={`/`}>
        <div>
          <h1 className="  text-zinc-50 font-semibold ">
            <span className=" px-3 py-1 bg-red-500 text-red-100 rounded-l-md">
              R
            </span>
            <span className=" ml-1 px-3 py-1 bg-zinc-50 text-zinc-900 rounded-r-md">
              Flix
            </span>
          </h1>
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
