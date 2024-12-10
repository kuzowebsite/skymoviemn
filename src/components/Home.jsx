import React from "react";
import Landing from "./Landing";
import MovieCarousel from "./MoviesCarousel";
import DiscoverMovies from "./DiscoverMovies";

const Home = () => {
  return (
    <>
      <Landing />
      <MovieCarousel />
      <DiscoverMovies/>
    </>
  );
};
export default Home;
