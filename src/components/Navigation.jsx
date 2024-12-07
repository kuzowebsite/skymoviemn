import React, { useState, useEffect } from "react";
import { GoHome, GoHeart } from "react-icons/go";
import { NavLink } from "react-router-dom";
import Search from "./Search";

const Navigation = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 rounded-t-lg border border-inherit bottom-0 left-1/2 bg-black/60 backdrop-blur-lg overflow-hidden transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="grid grid-cols-3 items-center w-full h-full justify-center">
        <NavLink to="/" className="inline h-full">
          <div className="flex items-center justify-center gap-1 flex-col hover:bg-slate-900 h-full cursor-pointer">
            <GoHome size={25} />
            <span className="text-xs text-slate-400">Home</span>
          </div>
        </NavLink>

        <div className="flex items-center justify-center gap-1 flex-col hover:bg-slate-900 h-full cursor-pointer">
          <Search />
          <span className="text-xs text-slate-400">Search</span>
        </div>

        <NavLink to="/watchlist" className="inline h-full">
          <div className="flex items-center justify-center gap-1 flex-col hover:bg-slate-900 h-full cursor-pointer">
            <GoHeart size={25} />
            <span className="text-xs text-slate-400">Favorite</span>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Navigation;
