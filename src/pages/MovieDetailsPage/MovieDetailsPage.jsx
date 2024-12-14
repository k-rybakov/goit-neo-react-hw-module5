import css from "./MovieDetailsPage.module.css";
import { useLocation, useParams, Link, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMovieDetails, buildImageUrl } from "../../api";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function MovieDetailsPage() {
  const location = useLocation();
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [details, setDetails] = useState({});
  const backLinkHref = location.state ?? "/";

  useEffect(() => {
    const movieDetails = async () => {
      try {
        const apiDetails = await getMovieDetails(movieId);
        setDetails(apiDetails);
      } catch (err) {
        setError("Failed to fetch details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    movieDetails();
  }, [movieId]);

  const genres = details.genres
    ? details.genres.map((g) => g.name).join(", ")
    : "";
  const imgUrl = details.backdrop_path
    ? buildImageUrl(details.backdrop_path)
    : "";

  return (
    <>
      {loading && <Loader />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {details && (
        <div>
          <Link to={backLinkHref}>&larr; Go back</Link>
          <div className={css.details}>
            <div className={css.image}>
              <img src={imgUrl} alt={details.title} />
            </div>
            <div className={css.description}>
              <h3>{details.title}</h3>
              <div>User Score: {details.vote_count} %</div>
              <h4>Overview</h4>
              <div>{details.overview}</div>
              <h4>Genres</h4>
              <div>{genres}</div>
            </div>
          </div>
          <hr />
          <div>Additional information</div>
          <ul>
            <li>
              <Link to="cast">Cast</Link>
            </li>
            <li>
              <Link to="reviews">Reviews</Link>
            </li>
          </ul>
          <hr />
          <Outlet />
        </div>
      )}
    </>
  );
}
