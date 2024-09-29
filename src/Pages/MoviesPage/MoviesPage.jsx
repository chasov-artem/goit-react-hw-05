import { Field, Formik, Form } from "formik";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { fetchSearchMovies } from "../../services/api";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const initialValues = { query: "" };

  const location = useLocation();

  useEffect(() => {
    const getMovies = async () => {
      if (query) {
        const data = await fetchSearchMovies(query);
        setMovies(data);
      }
    };
    getMovies();
  }, [query]);

  const handleSearhSubmit = async (values) => {
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

  if (!movies) {
    <h2>Loading...</h2>;
  }

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSearhSubmit}>
        <Form className={s.wrapper}>
          <Field
            className={s.searchInput}
            name="query"
            placeholder="Enter movie name..."
          ></Field>
          <button type="submit" className={s.btn}>
            Search
          </button>
        </Form>
      </Formik>

      {movies.length > 0 && (
        <ul>
          {filteredData?.map((movie) => (
            <li key={movie.id}>
              <Link to={`${movie.id.toString()}`} state={location}>
                <p>{movie.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
export default MoviesPage;
