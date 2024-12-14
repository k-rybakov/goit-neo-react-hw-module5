import { searchMovies } from "../../api";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!query) {
          return;
        }
        const apiResult = await searchMovies(query);
        setMovies(apiResult.results);
      } catch (err) {
        setError("Failed to fetch movies.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [query]);

  const submitHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const query = form.elements.query.value.trim();

    if (!query) {
      toast.error("PLease enter search term");
      return;
    }

    setSearchParams({ query });
    form.reset();
  };

  return (
    <div>
      <Toaster position="top-right" />
      <form onSubmit={submitHandler}>
        <input type="text" name="query" placeholder="Search movie" />
        <button type="submit">Search</button>
      </form>

      {loading && <Loader />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <MovieList movies={movies} />
    </div>
  );
}
