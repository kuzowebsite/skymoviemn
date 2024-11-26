import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "./Card";
import MovieCategoryName from "./MovieCategoryName";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const MoviesPage = () => {
  const { url } = useParams();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageUrl, setPageUrl] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());

  const apiKey = import.meta.env.VITE_API_KEY;

  const endpoints = [
    {
      key: "Latest Hindi Movie Releases",
      url: `/discover/movie?api_key=${apiKey}&with_original_language=hi&region=IN&primary_release_year=${year}`,
    },
    {
      key: "Top Hindi Action Movies",
      url: `/discover/movie?api_key=${apiKey}&with_original_language=hi&with_genres=28`,
    },
    {
      key: "Latest Tamil Movie Releases",
      url: `/discover/movie?api_key=${apiKey}&with_original_language=te&primary_release_year=${year}`,
    },
    {
      key: "Top Tamil Action Movies",
      url: `/discover/movie?api_key=${apiKey}&with_original_language=te&with_genres=28`,
    },
    {
      key: "Highest Rated Hindi Movies",
      url: `/discover/movie?api_key=${apiKey}&with_original_language=hi&region=IN&sort_by=vote_average.desc&vote_count.gte=100`,
    },
    {
      key: "Trending Movies Today",
      url: `/trending/movie/day?api_key=${apiKey}`,
    },
    {
      key: "Most Popular Movies",
      url: `/movie/popular?api_key=${apiKey}`,
    },
    {
      key: "Top Rated Movies Globally",
      url: `/movie/top_rated?api_key=${apiKey}`,
    },
    {
      key: "Upcoming Movie Releases",
      url: `/movie/upcoming?api_key=${apiKey}`,
    },
  ];

  // Dynamically fetch the URL for the selected endpoint
  const getLinkTo = () => {
    const endpoint = endpoints.find((e) => e.key === url);
    return endpoint ? endpoint.url : `/movies/${url.toLowerCase().replace(/\s+/g, "-")}`;
  };

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3${pageUrl}&page=${page}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();
      setMovies(data.results || []);
      setTotalPages(data.total_pages || 1);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const link = getLinkTo();
    if (link) {
      setPageUrl(link);
    }
  }, [url, year]); // Include year in dependency to recalculate URLs when it changes

  useEffect(() => {
    if (pageUrl) {
      fetchMovies();
    }
  }, [pageUrl, page]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="p-4">
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <MovieCategoryName title={url} />
      <div className="grid grid-cols-4 lg:grid-cols-5 gap-2 text-white">
        {movies.length > 0
          ? movies.map((movie) => <Card key={movie.id} movie={movie} />)
          : !loading && <p>No movies found.</p>}
      </div>

      <div style={{ marginTop: "20px" }}>
        <Pagination>
          <PaginationPrevious
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1 || loading}
          >
            Previous
          </PaginationPrevious>
          <PaginationContent>
            {/* Always show the first page */}
            <PaginationItem isActive={page === 1}>
              <PaginationLink onClick={() => handlePageChange(1)}>
                1
              </PaginationLink>
            </PaginationItem>

            {/* Add ellipsis if needed */}
            {page > 3 && totalPages > 5 && <PaginationEllipsis />}

            {/* Show a range of pages around the current page */}
            {Array.from({ length: 5 }, (_, index) => {
              const currentPage = page - 2 + index;
              if (currentPage > 1 && currentPage < totalPages) {
                return (
                  <PaginationItem
                    key={currentPage}
                    isActive={currentPage === page}
                  >
                    <PaginationLink
                      onClick={() => handlePageChange(currentPage)}
                    >
                      {currentPage}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
              return null;
            })}

            {/* Add ellipsis if needed */}
            {page < totalPages - 2 && totalPages > 5 && <PaginationEllipsis />}

            {/* Always show the last page */}
            {totalPages > 1 && (
              <PaginationItem isActive={page === totalPages}>
                <PaginationLink onClick={() => handlePageChange(totalPages)}>
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}
          </PaginationContent>
          <PaginationNext
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages || loading}
          >
            Next
          </PaginationNext>
        </Pagination>
      </div>
    </div>
  );
};

export default MoviesPage;
