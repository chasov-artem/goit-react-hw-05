import { Field, Formik, Form } from "formik";
import { useState } from "react";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);

  // const handleSearhSubmit = values;

  return (
    <Formik>
      <Form>
        <Field name="query"></Field>
        <button type="submit"></button>
      </Form>
    </Formik>
  );
};
export default MoviesPage;
