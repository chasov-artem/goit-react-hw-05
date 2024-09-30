import { Field, Formik, Form } from "formik";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { fetchSearchMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const location = useLocation();

  const initialValues = { query: "" };

  useEffect(() => {
    const getMovies = async () => {
      if (query) {
        const data = await fetchSearchMovies(query);
        setMovies(data);
      }
    };
    getMovies();
  }, [query]);

  const handleSearchSubmit = async (values) => {
    const data = await fetchSearchMovies(values.query);
    handleChangeQuery(values.query);
    setMovies(data);
  };

  const handleChangeQuery = (newQuery) => {
    if (!newQuery) {
      return setSearchParams({});
    }
    searchParams.set("query", newQuery);
    setSearchParams(searchParams);
  };

  const filteredData = useMemo(
    () =>
      movies.filter((movie) =>
        movie.title?.toLowerCase().includes(query.toLowerCase())
      ),
    [query, movies]
  );

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSearchSubmit}>
        <Form className={s.wrapper}>
          <Field
            className={s.searchInput}
            name="query"
            placeholder="Enter movie name..."
          />
          <button type="submit" className={s.btn}>
            Search
          </button>
        </Form>
      </Formik>

      {movies.length > 0 && (
        <MovieList movies={filteredData} location={location} />
      )}
    </>
  );
};

export default MoviesPage;
