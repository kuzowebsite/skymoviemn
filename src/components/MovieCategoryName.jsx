import React from "react";

const MovieCategoryName = ({ title }) => {
  return (
    <h2 className=" border-l-4 border-yellow-400 text-md lg:text-xl font-semibold text-white my-5 px-3">
      {title}
    </h2>
  );
};

export default MovieCategoryName;
