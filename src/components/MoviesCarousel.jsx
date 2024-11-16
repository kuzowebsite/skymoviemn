import React, { useEffect, useState } from "react";
import { MovieSkeleton } from "./MovieSkeletion";
import { Carousel } from "./Carousel";
import MovieCategoryName from "./MovieCategoryName";
import { toast } from "react-toastify";

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
    const apiKey = import.meta.env.VITE_API_KEY;

    if (!apiKey) {
      console.error("API Key is missing. Ensure VITE_API_KEY is defined.");
      toast.error("API Key is missing. Please contact support.");
      setLoading(false);
      return;
    }

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
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3${url}?api_key=${apiKey}`
          );
          if (!response.ok) {
            throw new Error(`Failed to fetch ${key} movies`);
          }
          const data = await response.json();
          return { key, data: data.results || [] };
        } catch (err) {
          console.error(`Error fetching ${key} movies:`, err);
          toast.error(`Error fetching ${key} movies.`);
          return { key, data: [] }; // Return an empty array on error
        }
      });

      const movieData = await Promise.all(fetchPromises);
      const newMovies = movieData.reduce((acc, { key, data }) => {
        acc[key] = data;
        return acc;
      }, {});

      setMovies(newMovies);
    } catch (error) {
      console.error("Error fetching movie data:", error);
      toast.error("Error fetching movie data. Please try again.");
    } finally {
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
          {Object.entries(movies).map(([key, movieList]) => (
            <div key={key}>
              <MovieCategoryName title={key.replace(/^\w/, (c) => c.toUpperCase())} />
              {movieList.length > 0 ? (
                <Carousel movies={movieList} />
              ) : (
                <p>No {key} movies available.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
