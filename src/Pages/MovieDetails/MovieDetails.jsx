import { Suspense, useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { fetchMovieById } from "../../services/api";
import Navigates from "../../components/Navigates/Navigates";

const MovieDetails = () => {
  const { movieId } = useParams();
  const location = useLocation();

  const goBackRef = useRef(location.state);

  const [movie, setMovie] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const data = await fetchMovieById(movieId);
      setMovie(data);
    };
    getData();
  }, [movieId]);

  if (!movie) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <Link to={goBackRef.current ?? "/movies"}>Go Back</Link>
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <div>
        <h1>
          {movie.title} ({movie.release_date?.split("-")[0]})
        </h1>
        <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
        <h3>Overview</h3>
        <p>{movie.overview}</p>
        <h3>Genres</h3>
        <p>{movie.genres.map((genre) => genre.name).join(" ")}</p>
      </div>
      <hr />
      <div>
        <Navigates />
      </div>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Outlet />
      </Suspense>
    </div>
  );
};
export default MovieDetails;
