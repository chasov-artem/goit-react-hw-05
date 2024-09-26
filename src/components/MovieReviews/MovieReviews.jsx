import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReviewsByMovieId } from "../../services/api";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchReviewsByMovieId(movieId);
      setReviews(data);
    };
    getData();
  }, [movieId]);

  if (!reviews) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <h3>Author: {review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We dont have any reviews to this movie</p>
      )}
    </div>
  );
};
export default MovieReviews;
