import React from "react";
import { NavLink } from "react-router-dom";
import { LiaAngleRightSolid } from "react-icons/lia";

const MovieCategoryName = ({ title, linkTo }) => {
  return (
    <div className="flex items-center justify-between mt-3">
      <h2 className=" text-md lg:text-xl font-semibold text-white my-2  bg-gradient-to-l from-zinc-900 to-zinc-950 pr-3 rounded-r-full">
        {title}
      </h2>
      {linkTo ? (
        <NavLink to={linkTo}>
          <button className="py-1 px-2 rounded-full hover:bg-zinc-800 text-sm lg:text-md flex items-center gap-[1px]  bg-gradient-to-b from-zinc-900 to-black">
            View all
            <LiaAngleRightSolid size={15} />
          </button>
        </NavLink>
      ) : (
        ""
      )}
    </div>
  );
};

export default MovieCategoryName;
