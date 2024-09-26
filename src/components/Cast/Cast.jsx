import { useEffect, useState } from "react";
import { fetchCastByMovieId } from "../../services/api";
import { useParams } from "react-router-dom";

const Cast = () => {
  const { movieId } = useParams();
  const [actors, setActors] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchCastByMovieId(movieId);
      setActors(data);
    };
    getData();
  }, [movieId]);

  return (
    <div>
      <ul>
        {actors.map((actor) => (
          <li key={actor.id}>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
              />
            </div>
            <div>
              <p>Name: {actor.name}</p>
              <p>Character: {actor.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Cast;
