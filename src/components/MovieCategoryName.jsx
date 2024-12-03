import React from "react";
import { NavLink } from "react-router-dom";
import { LiaAngleRightSolid } from "react-icons/lia";

const MovieCategoryName = ({ title, linkTo }) => {
  return (
    <div className="flex items-center justify-between mt-5">
      <h2 className=" text-md lg:text-xl font-semibold text-white my-2">
        {title}
      </h2>
      {linkTo ? (
        <NavLink to={linkTo}>
          <button className="border border-zinc-800 py-1 px-2 rounded-full hover:bg-zinc-800 text-sm lg:text-md flex items-center gap-[1px]">
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
