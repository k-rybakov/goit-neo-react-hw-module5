import css from "./MovieReviews.module.css";
import { getMovieReviews } from "../../api";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const movieReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiDetails = await getMovieReviews(movieId);
        setReviews(apiDetails.results);
      } catch (err) {
        setError("Failed to fetch casts.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    movieReviews();
  }, [movieId]);

  return (
    <>
      {loading && <Loader />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {reviews.length > 0 ? (
        <ul className={css.list}>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <div className={css.author}>Author: {author}</div>
              <div>{content}</div>
            </li>
          ))}
        </ul>
      ) : (
        <div>No reviews added yed</div>
      )}
    </>
  );
}
