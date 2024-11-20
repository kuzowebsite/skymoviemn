import React, { useEffect, useState } from "react";
import { MovieSkeleton } from "./MovieSkeletion";
import { Carousel } from "./Carousel";
import MovieCategoryName from "./MovieCategoryName";
import { toast } from "react-toastify";

const fetchWithTimeout = async (url, options = {}, timeout = 10000) => {
  const bearerToken = import.meta.env.VITE_TMDB_BEARER_TOKEN;
  if (!bearerToken) {
    throw new Error("Bearer token is missing. Ensure VITE_TMDB_BEARER_TOKEN is defined.");
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${bearerToken}`,
    Accept: "application/json",
  };

  return Promise.race([
    fetch(url, { ...options, headers }),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeout)
    ),
  ]);
};

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
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const apiKey = import.meta.env.VITE_API_KEY;
     console.log(apiKey)
    if (!apiKey) {
      const errorMessage = "API Key is missing. Ensure VITE_API_KEY is defined.";
      console.error(errorMessage);
      toast.error(errorMessage);
      setError(errorMessage);
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
          const response = await fetchWithTimeout(
            `https://api.themoviedb.org/3${url}?api_key=${apiKey}`,
            {},
            10000
          );

          if (!response.ok) {
            const errorMessage = `Failed to fetch ${key} movies: ${response.statusText}`;
            console.error(errorMessage);
            toast.error(`Error fetching ${key} movies.`);
            throw new Error(errorMessage);
          }

          const data = await response.json();
          return { key, data: data.results || [] };
        } catch (err) {
          console.error(`Error fetching ${key} movies:`, err);
          toast.error(err.message || `Error fetching ${key} movies.`);
          return { key, data: [] };
        }
      });

      const movieData = await Promise.all(fetchPromises);
      const newMovies = movieData.reduce((acc, { key, data }) => {
        acc[key] = data;
        return acc;
      }, {});

      setMovies(newMovies);
    } catch (globalError) {
      const errorMessage = "Error fetching movie data. Please try again.";
      console.error(errorMessage, globalError);
      toast.error(errorMessage);
      setError(errorMessage);
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
      ) : error ? (
        <div className="container mx-auto px-4 py-10">
          <p className="text-red-500 text-center">{error}</p>
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
