import React, { useState } from "react";
import { MdMovieFilter } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [id, setId] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=4c1eef5a8d388386187a3426bc2345be&with_original_language=hi&region=IN`;
  const navigate = useNavigate();

  const redirect = () => { navigate(`/movie/${id}`)};

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const movie = data.results[0]; // Get the first movie
      const backdropUrl = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;
      setId(movie.id);
      // Update Hero Section
      document.querySelector(
        ".hero"
      ).style.backgroundImage = `url(${backdropUrl})`;
    })
    .catch((error) => console.error("Error fetching movie data:", error));

  return (
    <section className=" relative hero flex flex-col items-center justify-center text-center gap-2 py-14 px-4 sm:px-8 lg:px-16 lg:h-80 ">
      <div className="w-full sm:w-2/3 md:w-2/3 lg:w-1/2 flex flex-col gap-3 z-20">
        <h1 className="text-5xl sm:text-6xl  lg:text-8xl  text-teal-50 font-bold bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
          Find Movies
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-200 ">
          80% Free Movie Downloads | Watch Trailers Online | Best Site for Movie
          Downloads | Ranjan
        </p>
      </div>
      <button
        onClick={redirect}
        className=" text-md bg-yellow-400 relative z-20 py-2 font-semibold px-4 mt-2 text-zinc-900 rounded-full lg:text-xl flex items-center gap-2"
      >
        <MdMovieFilter />
        Trending Now
      </button>
      <div className="absolute inset-0 bg-yellow-950/80 z-10"></div>
    </section>
  );
};

export default Landing;
