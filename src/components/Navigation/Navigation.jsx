import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

export default function Navigation() {
  const linkClass = ({ isActive }) => clsx(css.link, isActive && css.active);
  return (
    <nav>
      <NavLink to="/" className={linkClass}>
        Home
      </NavLink>
      <NavLink to="/movies" className={linkClass}>
        Movies
      </NavLink>
      <hr />
    </nav>
  );
}
