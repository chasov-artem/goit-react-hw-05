import { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { fetchMovies } from "../../services/api";
import s from "./MovieList.module.css";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  const location = useLocation();
  useEffect(() => {
    const getAllMovies = async () => {
      const data = await fetchMovies();
      setMovies(data);
    };
    getAllMovies();
  }, []);

  return (
    <div className={s.movieListWrapper}>
      <ul>
        {movies?.map((movie) => (
          <li className={s.movieItem} key={movie.id}>
            <Link to={`movies/${movie.id.toString()}`} state={location}>
              <p>{movie.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
