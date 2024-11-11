"use client";

import React, { useEffect, useState } from "react";
import { MovieSkeleton } from "./MovieSkeletion";
import { Carousel } from "./Carousel";
import MovieCategoryName from "./MovieCategoryName";

export default function MovieCarousel() {
  const [movies, setMovies] = useState({
    popular: [],
    topRated: [],
    upcoming: [],
    nowPlaying: [],
    discover: [],
    trending: [],
  });

  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const apiKey = "4c1eef5a8d388386187a3426bc2345be";
    const endpoints = [
      { key: "popular", url: `/movie/popular` },
      { key: "topRated", url: `/movie/top_rated` },
      { key: "upcoming", url: `/movie/upcoming` },
      { key: "nowPlaying", url: `/movie/now_playing` },
      { key: "discover", url: `/discover/movie` },
      { key: "trending", url: `/trending/movie/day` },
    ];

    try {
      const fetchPromises = endpoints.map(async ({ key, url }) => {
        const response = await fetch(
          `https://api.themoviedb.org/3${url}?api_key=${apiKey}`
        );
        const data = await response.json();
        return { key, data: data.results };
      });

      const movieData = await Promise.all(fetchPromises);
      const newMovies = movieData.reduce((acc, { key, data }) => {
        acc[key] = data;
        return acc;
      }, {});

      setMovies(newMovies);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movie data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="px-4 py-10">
          <MovieSkeleton />
        </div>
      ) : (
        <div className="container mx-auto px-4 py-10">
          <MovieCategoryName title={"Trending"} />
          <Carousel movies={movies.trending} />

          <MovieCategoryName title={"Popular"} />
          <Carousel movies={movies.popular} />

          <MovieCategoryName title={"Now Playing"} />
          <Carousel movies={movies.nowPlaying} />

          <MovieCategoryName title={"Top Rated"} />
          <Carousel movies={movies.topRated} />

          <MovieCategoryName title={"Upcoming"} />
          <Carousel movies={movies.upcoming} />

          <MovieCategoryName title={"Discover"} />
          <Carousel movies={movies.discover} />
        </div>
      )}
    </div>
  );
}