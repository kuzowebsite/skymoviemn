import React from "react";

const Landing = () => {
  return (
    <section className=" hero flex flex-col items-center justify-center text-center gap-2 py-14 px-4 sm:px-8 lg:px-16 lg:h-80">
      <div className="w-full sm:w-2/3 md:w-2/3 lg:w-1/2 flex flex-col gap-3">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl  text-white font-bold">
          Find Movies
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-200">
          80% Free Movie Downloads | Watch Trailers Online | Best Site for Movie
          Downloads | Ranjan
        </p>
      </div>
    </section>
  );
};

export default Landing;
