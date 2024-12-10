import React, { useState, useEffect } from "react";
import Card from "./Card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const DiscoverMovies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    sort_by: "popularity.desc",
    with_original_language: "en",
    with_genres: "28",
  });

  const fetchMovies = async (pageToFetch) => {
    if (isLoading) return;

    setIsLoading(true);
    const baseUrl = "https://api.themoviedb.org/3/discover/movie";
    const apiKey = import.meta.env.VITE_API_KEY;

    const queryString = new URLSearchParams({
      api_key: apiKey,
      page: pageToFetch,
      ...filters,
    }).toString();

    const url = `${baseUrl}?${queryString}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
      setHasMore(pageToFetch < data.total_pages);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Reset movies and fetch the first page whenever filters change
    setMovies([]);
    setPage(1);
    setHasMore(true);
    fetchMovies(1);
  }, [filters]);

  const updateFilter = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const loadMoreMovies = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(nextPage);
  };

  return (
    <div className="p-4  bg-gradient-to-r from-cyan-900/20 to-purple-900/20 ">
      <div className="p-5 rounded-lg text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Discover Movies
        </h1>
      </div>

      {/* Filter Controls */}
      <div className="flex gap-2 my-3 ">
        <div>
          <Select onValueChange={(value) => updateFilter("sort_by", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity.desc">Most Popular</SelectItem>
              <SelectItem value="popularity.asc">Least Popular</SelectItem>
              <SelectItem value="release_date.desc">Newest Releases</SelectItem>
              <SelectItem value="release_date.asc">Oldest Releases</SelectItem>
              <SelectItem value="original_title.asc">Title (A-Z)</SelectItem>
              <SelectItem value="original_title.desc">Title (Z-A)</SelectItem>
              <SelectItem value="vote_count.desc">Highest Rated</SelectItem>
              <SelectItem value="vote_count.asc">Lowest Rated</SelectItem>
              <SelectItem value="revenue.desc">Highest Revenue</SelectItem>
              <SelectItem value="revenue.asc">Lowest Revenue</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select
            onValueChange={(value) => updateFilter("with_original_language", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">Hindi</SelectItem>
              <SelectItem value="te">Telugu</SelectItem>
              <SelectItem value="ta">Tamil</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
              <SelectItem value="it">Italian</SelectItem>
              <SelectItem value="pt">Portuguese</SelectItem>
              <SelectItem value="ru">Russian</SelectItem>
              <SelectItem value="ja">Japanese</SelectItem>
              <SelectItem value="ko">Korean</SelectItem>
              <SelectItem value="zh">Chinese</SelectItem>
              <SelectItem value="ar">Arabic</SelectItem>
              <SelectItem value="pl">Polish</SelectItem>
              <SelectItem value="tr">Turkish</SelectItem>
              <SelectItem value="id">Indonesian</SelectItem>
              <SelectItem value="nl">Dutch</SelectItem>
              <SelectItem value="sv">Swedish</SelectItem>
              <SelectItem value="th">Thai</SelectItem>
              {/* Add other languages */}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select onValueChange={(value) => updateFilter("with_genres", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Genres" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="28">Action</SelectItem>
              <SelectItem value="12">Adventure</SelectItem>
              <SelectItem value="16">Animation</SelectItem>
              <SelectItem value="35">Comedy</SelectItem>
              <SelectItem value="80">Crime</SelectItem>
              <SelectItem value="99">Documentary</SelectItem>
              <SelectItem value="18">Drama</SelectItem>
              <SelectItem value="10751">Family</SelectItem>
              <SelectItem value="14">Fantasy</SelectItem>
              <SelectItem value="36">History</SelectItem>
              <SelectItem value="27">Horror</SelectItem>
              <SelectItem value="10402">Music</SelectItem>
              <SelectItem value="9648">Mystery</SelectItem>
              <SelectItem value="10749">Romance</SelectItem>
              <SelectItem value="878">Science Fiction</SelectItem>
              <SelectItem value="10770">TV Movie</SelectItem>
              <SelectItem value="53">Thriller</SelectItem>
              <SelectItem value="10752">War</SelectItem>
              <SelectItem value="37">Western</SelectItem>
              {/* Add other genres */}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Movie List */}
      <div className="grid grid-cols-4  lg:grid-cols-10 gap-2">
        {movies.map((movie, i) => (
          <Card key={i} movie={movie} />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center mt-4">
          <button
            className="px-4 py-2 bg-gradient-to-r from-amber-900/40 to-red-900/40 border text-white rounded  disabled:opacity-50"
            onClick={loadMoreMovies}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      {!hasMore && (
        <p className="text-center text-white mt-4">No more movies to display.</p>
      )}
    </div>
  );
};

export default DiscoverMovies;
