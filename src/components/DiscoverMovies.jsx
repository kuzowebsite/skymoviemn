import React, { useState, useEffect } from "react";
import Card from "./Card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MovieCategoryName from "./MovieCategoryName";

const DiscoverMovies = () => {
  const [movies, setMovies] = useState([]);
  const [pages, setPages] = useState(1);
  const [filters, setFilters] = useState({
    sort_by: "popularity.desc",
    with_original_language: "en",
    with_genres: "28",
    page: 1,
  });

  const fetchMovies = async () => {
    const baseUrl = "https://api.themoviedb.org/3/discover/movie";
    const apiKey = import.meta.env.VITE_API_KEY;

    // Construct query parameters
    const queryString = new URLSearchParams({
      api_key: apiKey,
      ...filters,
    }).toString();

    const url = `${baseUrl}?${queryString}`;
    const response = await fetch(url);
    const data = await response.json();
    setPages(data.total_pages);
    setMovies(data.results || []);
  };

  // Fetch movies whenever filters change
  useEffect(() => {
    fetchMovies();
  }, [filters]);

  // Update filter function
  const updateFilter = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  return (
    <div className="p-4 mb-5 bg-gradient-to-r from-orange-500/20 to-red-500/20 ">
      {/* <MovieCategoryName title="Discover" /> */}
      <div className=" p-8 md:p-10 rounded-lg  text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Unable to Find
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          Try Using the Advanced Filter
        </p>
      </div>

      {/* Filter Controls */}
      <div className="grid grid-flow-col-dense lg:flex gap-2 my-3 overflow-x-auto filterscroll">
        <div>
          <Select onValueChange={(value) => updateFilter("sort_by", value)}>
            <SelectTrigger className="">
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
            onValueChange={(value) =>
              updateFilter("with_original_language", value)
            }
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
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select
            onValueChange={(value) => updateFilter("page", Number(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Page" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: pages }, (_, i) => (
                <SelectItem key={i + 1} value={String(i + 1)}>
                  {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Movie List */}
      <Swiper
        spaceBetween={7}
        slidesPerView={5}
        className="mySwiper"
        watchSlidesProgress={true}
        breakpoints={{
          320: { slidesPerView: 2.5 },
          640: { slidesPerView: 4.5 },
          768: { slidesPerView: 5.5 },
          1024: { slidesPerView: 6.5 },
        }}
      >
        {movies.map((movie, i) =>
          movie.poster_path ? (
            <SwiperSlide key={i}>
              <Card movie={movie} />
            </SwiperSlide>
          ) : null
        )}
      </Swiper>
    </div>
  );
};

export default DiscoverMovies;
