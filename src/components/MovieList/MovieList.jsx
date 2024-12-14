import { Link } from "react-router-dom";

export default function MovieList({ movies }) {
  return (
    <ul>
      {movies.map(({ id, title }) => (
        <li key={id}>
          <Link to={`/movies/${id}`} state="/">
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
