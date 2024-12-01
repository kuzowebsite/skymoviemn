import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiArrowRightLine } from "react-icons/ri";

const Landing = () => {
  const [id, setId] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=4c1eef5a8d388386187a3426bc2345be&with_original_language=hi&region=IN`;
  const navigate = useNavigate();

  const redirect = () => {
    navigate(`/movie/${id}`);
  };

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const movie = data.results[0];
      setId(movie.id);
    })
    .catch((error) => console.error("Error fetching movie data:", error));

  return (
    <section className="relative hero flex flex-col items-center justify-center text-center gap-2 py-14 px-4 sm:px-8 lg:px-16 lg:h-80 relative">
      <div className="w-full sm:w-2/3 md:w-2/3 lg:w-1/2 flex flex-col gap-3 z-20">
        <h1 className="text-5xl sm:text-6xl  lg:text-8xl  text-teal-50 font-bold bg-gradient-to-r from-rose-100 to-green-100 bg-clip-text text-transparent">
          Find Movies
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-400 ">
          80% Free Movie Downloads | Watch Trailers Online | Best Site for Movie
          Downloads | Ranjan
        </p>
      </div>

      <button
        onClick={redirect}
        className="bg-white px-4 py-2 rounded-md text-black flex items-center mt-7  gap-1"
      >
        Latest Movie
        <RiArrowRightLine className=" mt-[2px]" />
      </button>
      <div className="absolute bottom-0 w-full h-5 bg-zinc-950/60"></div>
    </section>
  );
};

export default Landing;
