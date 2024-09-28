import { Field, Formik, Form } from "formik";
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchSearchMovies } from "../../services/api";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

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
    <h3>Loading...</h3>;
  }

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSearhSubmit}>
        <Form>
          <Field name="query" placeholder="Enter movie name..."></Field>
          <button type="submit">Search</button>
        </Form>
      </Formik>

      {movies.length > 0 && (
        <ul>
          {filteredData?.map((movie) => (
            <li key={movie.id}>
              <Link to={`${movie.id.toString()}`}>
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
