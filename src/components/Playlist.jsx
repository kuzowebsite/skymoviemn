
import React, { useEffect, useState } from "react";
import Card from "./Card";
import MovieCategoryName from "./MovieCategoryName";
import { toast } from "react-toastify";

const Playlist = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      // Retrieve the playlist of IDs from local storage
      const playlist = JSON.parse(localStorage.getItem("playlist")) || [];

      try {
        // Use Promise.all to fetch details for all movie IDs
        const moviePromises = playlist.map((id) =>
          fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=4c1eef5a8d388386187a3426bc2345be`
          ).then((response) => response.json())
        );

        const movieData = await Promise.all(moviePromises);
        setMovies(movieData); // Set fetched movie data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie data:", error);
        toast.error(error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);


  const removeFromWatchlist = (id) => {
    const updatedPlaylist = JSON.parse(localStorage.getItem("playlist")) || [];
    const newPlaylist = updatedPlaylist.filter((movieId) => movieId !== id);
    localStorage.setItem("playlist", JSON.stringify(newPlaylist)); // Update local storage
    setMovies(movies.filter((movie) => movie.id !== id)); // Update state to re-render
  };

  if (loading) return <p className="p-5" >Loading your playlist...</p>;

  return (
    <div className="p-5">
      {movies.length > 0 ? (
        <>
          <MovieCategoryName title={"Your Watchlist"} />
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 text-white">
            {movies.map((movie) => (
              <Card
                cancel={true}
                key={movie.id}
                movie={movie}
                onRemoveFromWatchlist={removeFromWatchlist} // Pass the function to Card
              />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center text-xl text-gray-400">
          No movies found in your watchlist.
        </div>
      )}
    </div>
  );
  
};

export default Playlist;