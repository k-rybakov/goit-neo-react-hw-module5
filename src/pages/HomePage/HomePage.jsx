import { getTodayTrendyMovies } from "../../api";
import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function HomePage() {
  const [trendyMovies, setTrendyMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendyMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const movies = await getTodayTrendyMovies();
        setTrendyMovies(movies.results);
      } catch (err) {
        setError("Failed to fetch trendy movies.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendyMovies();
  }, []);

  return (
    <>
      {loading && <Loader />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {trendyMovies.length > 0 && <MovieList movies={trendyMovies} />}
    </>
  );
}
