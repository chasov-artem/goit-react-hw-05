import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const API_KEY = "7f30159afbe6f74179f787af9d177c50";

export const fetchMovies = async () => {
  const { data } = await axios.get(`/movie/popular?api_key=${API_KEY}`);
  return data.results;
};

export const fetchMovieById = async (movieId) => {
  const { data } = await axios.get(`/movie/${movieId}?api_key=${API_KEY}`);
  return data;
};

export const fetchCastByMovieId = async (movieId) => {
  const { data } = await axios.get(
    `/movie/${movieId}/credits?api_key=${API_KEY}`
  );
  return data.cast;
};

export const fetchReviewsByMovieId = async (movieId) => {
  const { data } = await axios.get(
    `/movie/${movieId}/reviews?api_key=${API_KEY}`
  );
  return data.results;
};

export const fetchSearchMovies = async () => {
  const { data } = await axios.get(`/movie?api_key=${API_KEY}&query=${query}`);
  return data.results;
};
