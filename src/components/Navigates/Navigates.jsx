import { NavLink } from "react-router-dom";
import s from "./Navigates.module.css";
import clsx from "clsx";

const Navigates = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.activeLink);
  };
  return (
    <div className={s.linksWrapper}>
      <NavLink className={buildLinkClass} to="cast">
        Cast
      </NavLink>
      <NavLink className={buildLinkClass} to="reviews">
        Reviews
      </NavLink>
    </div>
  );
};
export default Navigates;
