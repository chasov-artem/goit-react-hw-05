import { useEffect, useState } from "react";
import { fetchMovies } from "../../services/api";
import { Link, useLocation } from "react-router-dom";

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
    <div>
      <ul>
        {movies?.map((movie) => (
          <li key={movie.id}>
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
