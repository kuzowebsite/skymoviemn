import React, { useEffect, useState } from "react";
import { MovieSkeleton } from "./MovieSkeletion";
import { Carousel } from "./Carousel";
import MovieCategoryName from "./MovieCategoryName";
import { toast } from "react-toastify";

const fetchWithTimeout = async (url, options = {}, timeout = 15000) => {
  return Promise.race([
    fetch(url, options),
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

  const [year, setYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const apiKey = import.meta.env.VITE_API_KEY;

    if (!apiKey) {
      const errorMessage =
        "API Key is missing. Ensure VITE_API_KEY is defined.";
      console.error(errorMessage);
      toast.error(errorMessage);
      setError(errorMessage);
      setLoading(false);
      return;
    }

    const endpoints = [
    
      {
        key: "Top Hindi Action Movies",
        url: `/discover/movie?api_key=${apiKey}&with_original_language=hi&with_genres=28&primary_release_year=${year}`,
      },
  
      {
        key: "Top Tamil Action Movies",
        url: `/discover/movie?api_key=${apiKey}&with_original_language=te&with_genres=28&primary_release_year=${year}`,
      },
      {
        key: "Highest Rated Hindi Movies",
        url: `/discover/movie?api_key=${apiKey}&with_original_language=hi&region=IN&sort_by=vote_average.desc&vote_count.gte=100`,
      },
      {
        key: "Sci-Fi Movies",
        url: `/discover/movie?api_key=${apiKey}&with_genres=878&primary_release_year=${year}`,
      },
      {
        key: "Trending Movies Today",
        url: `/trending/movie/day`,
      },
      {
        key: "Most Popular Movies",
        url: `/movie/popular`,
      },
      {
        key: "Top Rated Movies Globally",
        url: `/movie/top_rated`,
      },
      {
        key: "Upcoming Movie Releases",
        url: `/movie/upcoming`,
      },
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
        <div className="container mx-auto px-4 py-10 ">
          {Object.entries(movies).map(([key, movieList]) => (
            <div className="border-b border-zinc-800 pb-4" key={key}>
              <MovieCategoryName
                title={key.replace(/^\w/, (c) => c.toUpperCase())}
                linkTo={`/movies/${key}`}
              />
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
