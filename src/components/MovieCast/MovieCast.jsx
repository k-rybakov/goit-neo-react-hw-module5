import css from "./MovieCast.module.css";
import { getMovieCredits, buildImageUrl } from "../../api";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function MovieCast() {
  const [credits, setCredits] = useState([]);
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const movieCredits = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiDetails = await getMovieCredits(movieId);
        setCredits(apiDetails.cast);
      } catch (err) {
        setError("Failed to fetch casts.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    movieCredits();
  }, [movieId]);

  return (
    <>
      {loading && <Loader />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {!loading && credits.length === 0 && <div>No casts</div>}
      {credits.length > 0 && (
        <ul className={css.list}>
          {credits.map(({ id, character, name, profile_path }) => (
            <li key={id}>
              <div className={css.image}>
                <img src={buildImageUrl(profile_path)} alt={name} />
              </div>
              <div>{name}</div>
              <div>Character: {character}</div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
