import React from "react";
import { NavLink } from "react-router-dom";

const MovieCategoryName = ({ title, linkTo }) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className=" border-l-4 border-yellow-400 text-md lg:text-2xl font-semibold text-white my-5 px-3">
        {title}
      </h2>
      {linkTo ? (
        <NavLink to={linkTo}>
          <button className="border border-zinc-900 py-1 px-4 rounded-full hover:bg-zinc-800">
            View all
          </button>
        </NavLink>
      ) : (
        ""
      )}
    </div>
  );
};

export default MovieCategoryName;
