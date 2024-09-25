import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
import clsx from "clsx";
const Header = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.activeLink);
  };
  return (
    <div className={s.headerWrapper}>
      <div className={s.linksWrapper}>
        <NavLink className={buildLinkClass} to="/">
          Home
        </NavLink>
        <NavLink className={buildLinkClass} to="/movies">
          Movies
        </NavLink>
      </div>
    </div>
  );
};
export default Header;
