import MovieList from "../../components/MovieList/MovieList";
import s from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={s.pageWrapper}>
      <h1 className={s.pageTitle}>Trending Today:</h1>
      <MovieList />
    </div>
  );
};

export default HomePage;
