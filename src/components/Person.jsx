import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Carousel } from "./Carousel";
import MovieCategoryName from "./MovieCategoryName";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const Person = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [combined, setCombined] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  const apiKey = import.meta.env.VITE_API_KEY;


  const calculateAge = (birthDate) => {
    const birthDateObj = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }

    return age;
  };


  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        const [personRes, combinedRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}`),
          fetch(
            `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${apiKey}`
          ),
        ]);

        const personData = await personRes.json();
        const combinedData = await combinedRes.json();
        console.log(personData);
        setPerson(personData);
        setCombined(combinedData.cast);
        // console.log(combinedData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error(`Error: ${error.message}`);
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id, apiKey]);

  if (loading) {
    return <Loader color={"gray"} loading={true} size={20} />
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!person) {
    return <div>No person data available.</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[300px_auto] gap-5 p-5 lg:py-8 bg-gradient-to-l from-zinc-900 to-black ">
        <div>
          <img
            src={`https://image.tmdb.org/t/p/original/${person.profile_path}`}
            alt={person.name}
            className="w-full rounded"
          />
        </div>
        <div className="flex flex-col gap-2 items-start">
          <div
            onClick={goBack}
            className="flex items-center  gap-2 cursor-pointer  "
          >
            <MdArrowBack />
            Back To Main
          </div>
          <h1 className="text-2xl font-bold">{person.name}</h1>
          <p className="text-base lg:text-lg leading-relaxed overflow-auto max-h-80">
            {person.biography}
          </p>

          <p>
            <strong>Born:</strong> {person.birthday}  ({calculateAge(person.birthday)} Years)
             {person.place_of_birth && ` in ${person.place_of_birth} `}
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <MovieCategoryName title={"Known For"} />
        <Carousel movies={combined.length ? combined : []} />
      </div>
    </>
  );
};

export default Person;
