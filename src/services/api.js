import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const API_KEY = "7f30159afbe6f74179f787af9d177c50";

export const fetchMovies = async () => {
  const { data } = await axios.get(`/movie/popular?api_key=${API_KEY}`);
  return data.results;
};
