"use client";
import { useEffect, useState } from "react";
import Card from "./Card";
import { FaDownload } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import { MdBookmarkAdded } from "react-icons/md";
import { MdBookmark } from "react-icons/md";
// import { MdBookmarkBorder } from "react-icons/md";

import { useParams } from "react-router-dom";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "./ui/skeleton";
import { getDominantColor } from "@/lib/Color";
import { getTextColorForBackground } from "@/lib/TextColor";
import MovieCategoryName from "./MovieCategoryName";
import { toast } from "react-toastify";

// import { CastSlider } from "./Cast";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);
  // const [credits, setCredits] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Track drawer state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [Bg, setBg] = useState("");
  const [textColor1, setTextColor] = useState("white"); // Default text color
  const [hasMovie, setHasMovie] = useState(false);

  const searchSuffix = "site:filmyzilla.com.by";

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("playlist").includes(id))) {
      setHasMovie(true);
    } else {
      setHasMovie(false);
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleConfirm = () => {
    if (movie?.title) {
      setDialogOpen(false);
      const searchQuery = `${movie.title} ${searchSuffix}`;
      const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
        searchQuery
      )}`;
      window.open(googleSearchUrl, "_blank");
    }
  };
  const handleCancel = () => {
    setDialogOpen(false);
  };
  const handleShare = async () => {
    if (navigator.share && movie) {
      try {
        await navigator.share({
          title: movie.title,
          text: movie.overview,
          url: window.location.href,
        });
        console.log("Movie shared successfully");
      } catch (error) {
        console.error("Error sharing movie:", error);
      }
    } else {
      toast.error("Sharing is not supported in your browser");
    }
  };

  const convertMinutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours > 0 ? `${hours}h` : ""} ${
      remainingMinutes > 0 ? `${remainingMinutes}m` : ""
    }`.trim();
  };

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const movieRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=4c1eef5a8d388386187a3426bc2345be`
        );
        const movieData = await movieRes.json();
        const imageUrl = `https://image.tmdb.org/t/p/w500/${movieData.poster_path}?not-from-cache-please`;

        getDominantColor(imageUrl)
          .then((rgb) => {
            let cl = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
            setBg(cl);
            const textColor = getTextColorForBackground(rgb);
            setTextColor(textColor);
          })
          .catch((error) => {
            toast.error("Unable to get CLR");
            console.error(error);
          });
        setMovie(movieData);

        const relatedRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/similar?api_key=4c1eef5a8d388386187a3426bc2345be`
        );
        const relatedMoviesData = await relatedRes.json();
        setRelatedMovies(relatedMoviesData.results);

        // const creditRes = await fetch(
        //   `https://api.themoviedb.org/3/movie/${id}/credits?api_key=4c1eef5a8d388386187a3426bc2345be`
        // );

        // setCredits(creditData.cast);

        const trailerRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=4c1eef5a8d388386187a3426bc2345be`
        );
        const trailerData = await trailerRes.json();
        const trailers = trailerData.results.filter(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailers.length > 0) {
          setTrailer(`https://www.youtube.com/embed/${trailers[0].key}`);
        }

        setLoading(false);
      } catch (error) {
        toast.error(error);
        console.error("Error fetching movie details:", error);
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  const handleAddPlayList = (id) => {
    const existingPlaylist = JSON.parse(localStorage.getItem("playlist")) || [];
    if (!existingPlaylist.includes(id)) {
      existingPlaylist.push(id);
      localStorage.setItem("playlist", JSON.stringify(existingPlaylist));
      setHasMovie(true);
      toast.success("Added to watchlist");
    } else {
      toast.error("Already Added");
    }
  };

  if (loading)
    return (
      <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-2 p-5 mt-14 lg:py-8 shadow-md text-white">
        <div className="relative flex justify-center items-center rounded-lg bg-cover bg-center">
          <Skeleton className="w-full h-80 rounded-lg" />
        </div>

        <div className="relative z-10 flex flex-col gap-3 col-span-2">
          <div className="flex flex-col">
            <Skeleton className="w-3/4 h-8 mb-3" />
            <Skeleton className="w-2/3 h-6" />
          </div>
          <div className="my-5 flex items-center gap-2">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="h-10 w-32 rounded-full" />
          </div>
          <div className="mt-5">
            <Skeleton className="w-3/4 h-6 mb-2" />
            <Skeleton className="w-full h-4" />
          </div>
        </div>
        <div
          style={{ background: `${Bg}` }}
          className="absolute inset-0 w-full h-full -z-5"
        ></div>
      </div>
    );

  return (
    <>
      <div
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w780/${movie.backdrop_path})`,
          backgroundSize: "cover",
          color: `${textColor1}`,
        }}
        className="relative grid grid-cols-1 lg:grid-cols-3 gap-2 p-5 mt-14 lg:py-8 shadow-md  "
      >
        <div className="relative flex justify-center items-center rounded-lg bg-cover bg-center shadow-lg">
          <img
            className=" relative z-10 lg:w-2/3 h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-lg"
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
        </div>

        <div className="relative z-10 flex flex-col gap-3 col-span-2">
          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
              {movie.title} ({movie.release_date.split("-")[0]})
            </h1>
            <p className="text-sm lg:text-base">
              {movie.original_language.toUpperCase()} |{" "}
              {movie.genres.map((genre) => genre.name).join(", ")} |{" "}
              {convertMinutesToTime(movie.runtime)}
            </p>
          </div>
          <div className="my-2 flex items-center gap-2">
            <div>
              <div
                className="w-10 h-10 rounded-full bg-zinc-50 text-zinc-900 flex items-center justify-center cursor-pointer"
                onClick={() => setDialogOpen(true)} // Open the dialog when this div is clicked
              >
                <FaDownload />
              </div>

              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Redirect</DialogTitle>
                    <DialogDescription>
                      You are being redirected to a new website. Do you want to
                      continue?
                      <span className="flex items-center justify-end mt-5 gap-2">
                        <Button onClick={handleCancel} variant="outline">
                          Cancel
                        </Button>
                        <Button onClick={handleConfirm}>Confirm</Button>
                      </span>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
            <div
              onClick={() => {
                handleAddPlayList(movie.id);
              }}
              className="w-10 h-10 rounded-full bg-zinc-50 text-zinc-900 flex items-center justify-center cursor-pointer"
            >
              {hasMovie ? <MdBookmarkAdded /> : <MdBookmark />}
            </div>
            <div
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-zinc-50 text-zinc-900 flex items-center justify-center cursor-pointer"
            >
              <FaShareAlt />
            </div>
            <div className=" h-10 px-4 gap-2 rounded-full bg-zinc-50 text-zinc-900 flex items-center justify-center cursor-pointer">
              <Drawer>
                <DrawerTrigger
                  className="flex items-center gap-2"
                  onClick={() => setIsDrawerOpen(true)} // Set drawer state when triggered
                >
                  {" "}
                  <FaPlay />
                  Play Trailer
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Watch Trailer</DrawerTitle>
                    <DrawerDescription>
                      Watch the trailer for {movie.title}
                    </DrawerDescription>
                    {isDrawerOpen && trailer ? ( // Only load iframe when drawer is open
                      <iframe
                        width="100%"
                        height="315"
                        src={`${trailer}?autoplay=1`} // Autoplay parameter added
                        title="Movie Trailer"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <p>Trailer not available.</p>
                    )}
                  </DrawerHeader>
                  <DrawerFooter>
                    <DrawerClose onClick={() => setIsDrawerOpen(false)} />
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
          <div>
            <p className="text-sm lg:text-base  italic">{movie.tagline}</p>

            <p className="font-semibold text-xl">Overview</p>
            <p className="text-base lg:text-lg  leading-relaxed">
              {movie.overview}
            </p>
          </div>

          <div>
            IMDB RATING |{" "}
            <span className="bg-zinc-50 text-zinc-900 px-2 rounded-md">
              {" "}
              {movie.vote_average}/10
            </span>
          </div>
        </div>
        <div
          style={{ background: `${Bg}`, opacity: ".9" }}
          className="absolute inset-0 w-full h-full -z-5 backdrop-blur-sm"
        ></div>
      </div>

      {/* <div className="p-5">
        {credits.length > 0 && <MovieCategoryName title={"Cast"} />}
        <CastSlider movies={credits} />
      </div> */}

      <div className="p-5">
        {relatedMovies.length > 0 && (
          <MovieCategoryName title={"Related Movies"} />
        )}
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-5 text-white">
          {relatedMovies.map((relatedMovie) => (
            <Card key={relatedMovie.id} movie={relatedMovie} />
          ))}
        </div>
      </div>
    </>
  );
}
