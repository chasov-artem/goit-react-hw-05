import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
// import HomePage from "./Pages/HomePage/HomePage";
// import MoviesPage from "./Pages/MoviesPage/MoviesPage";
// import NotFound from "./Pages/NotFound/NotFound";
// import MovieDetails from "./Pages/MovieDetails/MovieDetails";
// import MovieCast from "./components/MovieCast/MovieCast";
// import MovieReviews from "./components/MovieReviews/MovieReviews";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("./Pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./Pages/MoviesPage/MoviesPage"));
const NotFound = lazy(() => import("./Pages/NotFound/NotFound"));
const MovieDetails = lazy(() => import("./Pages/MovieDetails/MovieDetails"));
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("./components/MovieReviews/MovieReviews")
);
function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<h2>Loading...</h2>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
