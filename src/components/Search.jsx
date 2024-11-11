
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";


export default function Search() {
  const [open, setOpen] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [query, setQuery] = React.useState("");

  // Fetch movies with the fetch API
  const fetchMovies = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=4c1eef5a8d388386187a3426bc2345be&query=${encodeURIComponent(
          query
        )}`
      );

      if (!response.ok) {
        toast.error("Something went wrong");
      }

      const data = await response.json();
      setSuggestions(data.results || []);
    } catch (error) {
      toast.error(error);
      console.error("Error fetching movies:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    fetchMovies(newQuery);
  };

  // Keyboard shortcut to toggle dialog
  React.useEffect(() => {
    const down = (e) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prevOpen) => !prevOpen);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      {/* Dialog with Trigger Inside */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div
            onClick={() => setOpen(true)}
            className=" hover:bg-zinc-800 w-full lg:w-80 cursor-pointer rounded-md border border-zinc-800 bg-zinc-900 p-1 flex items-center justify-between"
          >
            <p className="ml-3 text-sm text-zinc-400">Search movies...</p>
            <p className="text-sm text-muted-foreground flex items-center">
              <kbd className="pointer-events-none inline-flex select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                <span className="text-xs">⌘</span>J
              </kbd>
            </p>
          </div>
        </DialogTrigger>

        {/* Autocomplete Dialog */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Movie Search</DialogTitle>
            <DialogDescription>Type to search for a movie</DialogDescription>
          </DialogHeader>
          <Input
            type="text"
            placeholder="Type a movie name..."
            value={query}
            onChange={handleInputChange}
            className="w-full mt-2 mb-4"
          />

          {suggestions.length === 0 ? (
            <p className="text-center text-gray-500">No results found.</p>
          ) : (
            <div className="mt-2 max-h-60 overflow-y-auto">
              {suggestions.map((movie) => {
                const posterUrl = movie.poster_path
                  ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` // Poster image URL
                  : "https://via.placeholder.com/92"; // Default image if no poster

                const releaseYear = movie.release_date
                  ? new Date(movie.release_date).getFullYear() // Extract year from release date
                  : "N/A";

                return (
                  <NavLink
                    to={`/movie/${movie.id}`}
                    key={movie.id}
                    className="p-1 mt-1 hover:bg-zinc-900 cursor-pointer flex items-center  rounded-md"
                    onClick={() => {
                      console.log("Selected movie:", movie.title);
                      setOpen(false); // Close dialog on selection
                    }}
                  >
                    <img
                      src={posterUrl}
                      alt={movie.title}
                      className="w-12 h-18 object-cover rounded-md mr-2"
                    />
                    <div>
                      <p className="text-sm">{movie.title}</p>
                      <p className="text-xs text-gray-500">{releaseYear}</p>
                    </div>
                  </NavLink>
                );
              })}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}